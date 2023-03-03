import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
dotenv.config();
const { DB_URL, DB_KEY } = process.env;
const database = createClient(DB_URL as string, DB_KEY as string);

export default database;
