import { Request, Response } from "express";
import knex from "../database/connection";

export default class MaterialController {
  async index(req: Request, res: Response) {
    const materials = await knex("materials").select("*");
    const serializedItems = materials.map((material) => ({
      ...material,
      image_url: `http://localhost:3333/uploads/${material.image}`,
    }));
    return res.json(serializedItems);
  }
}
