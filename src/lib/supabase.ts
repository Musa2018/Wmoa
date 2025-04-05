import { createClient } from "@supabase/supabase-js";
import type { Database } from "../types/supabase";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. Please ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set.",
  );
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Helper function to check database connection
export const checkDatabaseConnection = async () => {
  try {
    const { data, error } = await supabase
      .from("crops")
      .select("count")
      .limit(1);
    if (error) throw error;
    console.log("Database connection successful");
    return { success: true };
  } catch (error) {
    console.error("Database connection failed:", error);
    return { success: false, error };
  }
};
