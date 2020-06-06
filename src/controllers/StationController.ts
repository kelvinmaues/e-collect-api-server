import { Request, Response } from "express";
import knex from "../database/connection";

export default class StationController {
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