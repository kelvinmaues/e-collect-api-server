import express from "express";
import path from "path";
import cors from "cors";

// routes
import routes from "./routes";

const app = express();

app.use(cors());
app.use(express.json());

// Set routes
app.use(routes);

// Public files
app.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads")));

app.listen(3333);
