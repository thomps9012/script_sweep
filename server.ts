import app from "./app";
import * as dotenv from "dotenv";
dotenv.config();
const { PORT } = process.env;
const port: number = 3000;

app.listen(PORT ? PORT : port, () => {
  console.log(`Server now live @ http://localhost:${PORT ? PORT : port}`);
});
