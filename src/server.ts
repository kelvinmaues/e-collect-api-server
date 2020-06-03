import express from "express";

const app = express();

const users = ["Karina", "Ruth", "Ivone", "Ícaro"];

app.get("/users", (req, res) => {
  const { search } = req.query;

  const filteredUsers = search
    ? users.filter((user) => user.includes(String(search)))
    : users;
  console.log("Listagem de usuários");
  res.json(filteredUsers);
});

app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const user = users[Number(id)];
  return res.json(user);
});

app.post("/users", (req, res) => {
  const user = {
    name: "Kelvin",
    email: "kgmdeveloper@gmail.com",
  };
  return res.json(user);
});

app.listen(3333);
