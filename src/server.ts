import express from "express";

const app = express();

app.get("/users", (req, res) => {
  console.log("Listagem de usuários");
  res.json(["Karina", "Ruth", "Ivone", "Ícaro"]);
});

app.listen(3333);
