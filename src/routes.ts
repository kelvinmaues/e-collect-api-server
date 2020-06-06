import express from "express";
// controllers
import StationController from "./controllers/StationController";
import MaterialController from "./controllers/MaterialController";

const routes = express.Router();

// instances
const stationController = new StationController();
const materialController = new MaterialController();

// material routes
routes.get("/materials", materialController.index);

// station routes
routes.post("/stations", stationController.create);
routes.get("/stations/:id", stationController.show);

/**
 * Pattern to Class Controller/Model Methods to CRUD
 * index() => list some data
 * show() => get a specific data
 * update() => update a data
 * delete() => delete a data
 */

export default routes;
