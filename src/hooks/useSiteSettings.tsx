import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export function useSiteSetting<T>(key: string, fallback: T): { data: T; loading: boolean; refetch: () => void } {
  const [data, setData] = useState<T>(fallback);
  const [loading, setLoading] = useState(true);

  const fetchSetting = async () => {
    try {
      const { data: row, error } = await supabase
        .from("site_settings" as any)
        .select("value")
        .eq("key", key)
        .maybeSingle();

      if (!error && row) {
        setData((row as any).value as T);
      }
    } catch (e) {
      console.error(`Error fetching setting ${key}:`, e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSetting(); }, [key]);

  return { data, loading, refetch: fetchSetting };
}

export async function updateSiteSetting(key: string, value: any) {
  const { error } = await (supabase as any)
    .from("site_settings")
    .update({ value })
    .eq("key", key);
  
  if (error) throw error;
}
