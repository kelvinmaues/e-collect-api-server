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
routes.get("/stations", stationController.index);
routes.post("/stations", stationController.create);
routes.get("/stations/:id", stationController.show);

/**
 * Pattern to Class Controller/Model Methods to CRUD
 * index() => list some data
 * show() => get a specific data
 * update() => update a data
 * delete() => delete a data
 */

 /** How to use?
  * req.body = Used to pass data to create or delete something
  * req.params = Used to return a specific data
  * req.query = Used to search data that's not specific
  */

export default routes;
