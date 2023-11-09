import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://upfcvvoukhocxktubwtu.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVwZmN2dm91a2hvY3hrdHVid3R1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTYzMjQyMjksImV4cCI6MjAxMTkwMDIyOX0.UN61o4W2PWwm4fIVT3r39a9vsFnNHHUP-64M134v610";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
