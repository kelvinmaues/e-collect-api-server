import express from "express";
// routes
import routes from "./routes";

const app = express();

app.use(express.json());

// Set routes
app.use(routes);

app.listen(3333);
