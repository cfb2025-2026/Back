// supabaseClient.ts
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// Load .env file
dotenv.config();

// Get environment variables
const supabaseUrl = process.env.SUPABASE_DB_URL;
const supabaseKey = process.env.SUPABASE_DB_API_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Missing SUPABASE_DB_URL or SUPABASE_DB_API_KEY in .env file",
  );
}

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
