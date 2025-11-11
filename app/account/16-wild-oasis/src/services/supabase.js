import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://orkawusudrxhsvrnilpu.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ya2F3dXN1ZHJ4aHN2cm5pbHB1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY1NTg5MjIsImV4cCI6MjA3MjEzNDkyMn0.mprXH4oe33m5ei1AKD_DgueDAlKnWFJpOAALzq2G3VI";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
