import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://camzsdrsgodfdwykkvug.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhbXpzZHJzZ29kZmR3eWtrdnVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUwMzQxNTgsImV4cCI6MjA5MDYxMDE1OH0.odFR4VRT7ohxsmCkZis-dJWv70qT0Gt8ykutSYXiA3U";

export const supabase = createClient(supabaseUrl, supabaseKey);
