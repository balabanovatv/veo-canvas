'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export function useBalance() {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) { setBalance(0); return; }
        const { data, error } = await supabase
          .from('credits')
          .select('balance')
          .eq('user_id', user.id)
          .single();
        if (error) throw error;
        if (alive) setBalance(data?.balance ?? 0);
      } catch (e:any) {
        if (alive) setError(e.message ?? 'Failed to load balance');
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  return { balance, loading, error };
}