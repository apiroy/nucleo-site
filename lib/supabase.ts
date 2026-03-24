import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Usamos el Service Role Key para saltar las políticas de RLS 
// ya que esto es una operación de servidor (Edge Function).
export const supabase = createClient(supabaseUrl, supabaseServiceKey);
