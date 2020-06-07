import { Request, Response } from "express";
import knex from "../database/connection";

export default class StationController {
  async index(req: Request, resp: Response) {
    const { city, state, materials } = req.query;

    const parsedMaterials = String(materials)
      .split(",")
      .map((material) => Number(material.trim()));

    const stations = await knex("stations")
      .join(
        "stations_materials",
        "stations.id",
        "=",
        "stations_materials.station_id"
      )
      .whereIn("stations_materials.material_id", parsedMaterials)
      .where("city", String(city))
      .where("state", String(state))
      .distinct()
      .select("stations.*");

    return resp.json(stations);
  }

  async show(req: Request, resp: Response) {
    const { id } = req.params;

    const station = await knex("stations").where("id", id).first();

    if (!station) {
      return resp.status(400).json({ error: "Station not found" });
    }

    const materials = await knex("materials")
      .join(
        "stations_materials",
        "materials.id",
        "=",
        "stations_materials.material_id"
      )
      .where("stations_materials.station_id", id)
      .select("materials.name");

    return resp.json({ ...station, materials });
  }

  async create(req: Request, resp: Response) {
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
    const station_url =
      "https://images.unsplash.com/photo-1578916171728-46686eac8d58?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60";
    const station = {
      image: station_url,
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
    };

    const insertedIds = await trx("stations").insert(station);

    const stationId = insertedIds[0];

    const stationMaterials = materials.map((materialId: number) => ({
      material_id: materialId,
      station_id: stationId,
    }));

    await trx("stations_materials").insert(stationMaterials);

    await trx.commit();

    return resp.json({ id: stationId, ...station });
  }
}
