
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://nyxzmbrodwwrbdfocdyl.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im55eHptYnJvZHd3cmJkZm9jZHlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1NTEzMjcsImV4cCI6MjA1OTEyNzMyN30.n6ybPoGx-gks54URQf2nXfoVtZa5iwrNUled0q9t80E";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

// Create a single supabase client for the entire app
export const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY, 
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      storage: localStorage
    }
  }
);
