import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';

const supabaseUrl = "https://xejdiwkgsdeolkhimrbl.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhlamRpd2tnc2Rlb2xraGltcmJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTczOTM3ODYsImV4cCI6MjA3Mjk2OTc4Nn0.kP2FgEZ9SQshLHeq6RtQvsItIUhu0g1TvJqnOH8HWiE";

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});