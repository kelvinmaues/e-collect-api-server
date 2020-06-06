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

routes.post("/stations", async (req, resp) => {
  const {
    name,
    email,
    whatsapp,
    latitude,
    longitude,
    street,
    neighborhood,
    zipcode,
    complement,
    city,
    state,
    materials,
  } = req.body;

  const trx = await knex.transaction();

  const insertedIds = await trx("stations").insert({
    image: "img-fale",
    name,
    email,
    whatsapp,
    latitude,
    longitude,
    street,
    neighborhood,
    zipcode,
    complement,
    city,
    state,
    isActive: true,
  });

  const stationId = insertedIds[0];

  const stationMaterials = materials.map((materialId: number) => ({
    material_id: materialId,
    station_id: stationId,
  }));

  await trx("stations_materials").insert(stationMaterials);

  return resp.json({ success: true });
});

export default routes;
