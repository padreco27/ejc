import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL ?? "";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_ANON_KEY ?? "";

export const hasSupabase = Boolean(supabaseUrl && supabaseKey);

export const supabaseAdmin: SupabaseClient | null = hasSupabase
  ? createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })
  : null;

if (!hasSupabase) {
  console.warn(
    "Supabase is not configured. The application will use local JSON fallback for data storage."
  );
}
