import Knex from "knex";

export async function seed(knex: Knex) {
  await knex("materials").insert([
    {
      name: "Lâmpadas",
      image: "lampadas.svg",
      isActive: true,
    },
    {
      name: "Pilhas e Baterias",
      image: "pilhas_baterias.svg",
      isActive: true,
    },
    {
      name: "Papéis e Papelão",
      image: "papeis_papelao.svg",
      isActive: true,
    },
    {
      name: "Resíduos Eletrônicos",
      image: "eletronicos.svg",
      isActive: true,
    },
    {
      name: "Resíduos Orgânicos",
      image: "organicos.svg",
      isActive: true,
    },
    {
      name: "Óleo de Cozinha",
      image: "oleo.svg",
      isActive: true,
    },
  ]);
}
