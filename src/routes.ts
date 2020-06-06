import express, { response } from "express";
import knex from "./database/connection";
// controllers
import StationController from "./controllers/StationController";
import MaterialController from "./controllers/MaterialController";

const routes = express.Router();

// instances
const stationController = new StationController();
const materialController = new MaterialController();

routes.get("/materials", materialController.index);

routes.post("/stations", stationController.create);

export default routes;
