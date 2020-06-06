import express, { response } from "express";
import knex from "./database/connection";
// controllers
import StationController from "./controllers/StationController";

const routes = express.Router();

// instances
const stationController = new StationController();

routes.get("/materials", async (req, res) => {
  const materials = await knex("materials").select("*");
  const serializedItems = materials.map((material) => ({
    ...material,
    image_url: `http://localhost:3333/uploads/${material.image}`,
  }));
  return res.json(serializedItems);
});

routes.post("/stations", stationController.create);

export default routes;
