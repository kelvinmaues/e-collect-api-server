import express from "express";
import path from "path";
// routes
import routes from "./routes";

const app = express();

app.use(express.json());

// Set routes
app.use(routes);

// Public files
app.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads")));

app.listen(3333);
