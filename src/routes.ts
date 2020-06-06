import express, { response } from "express";
import knex from "./database/connection";

const routes = express.Router();

routes.get("/materials", async (req, res) => {
  const materials = await knex("materials").select("*");
  const serializedItems = materials.map((material) => ({
    ...material,
    image_url: `http://localhost:3333/uploads/${material.image}`,
  }));
  return res.json(serializedItems);
});

export default routes;
