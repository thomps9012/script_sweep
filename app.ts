import express from "express";
import bodyParser from "body-parser";
import api from "./routes";
import cors from "cors";
const app: express.Application = express();
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", api);
export default app;
