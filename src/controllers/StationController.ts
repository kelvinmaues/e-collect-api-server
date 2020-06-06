import { Request, Response } from "express";
import knex from "../database/connection";

export default class StationController {
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
    const station = {
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
    };

    const insertedIds = await trx("stations").insert(station);

    const stationId = insertedIds[0];

    const stationMaterials = materials.map((materialId: number) => ({
      material_id: materialId,
      station_id: stationId,
    }));

    await trx("stations_materials").insert(stationMaterials);

    return resp.json({ id: stationId, ...station });
  }
}
