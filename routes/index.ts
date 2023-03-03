import express from "express";
import scripts from "./scripts";
import classify from "./classify";
import organize from "./organize";
import auth from "./auth";
const api: express.Application = express();

api.use("/scripts", scripts);
api.use("/classify", classify);
api.use("/organize", organize);
api.use("/auth", auth);

export default api;
