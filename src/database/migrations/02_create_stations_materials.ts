import Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("stations_materials", (table) => {
    table.increments("id").primary();
    table
      .integer("station_id")
      .notNullable()
      .references("id")
      .inTable("stations");
    table
      .integer("material_id")
      .notNullable()
      .references("id")
      .inTable("materials");
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("stations_materials");
}
