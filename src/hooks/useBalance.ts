'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export function useBalance() {
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setLoading(false); return; }
      const { data } = await supabase
        .from('credits').select('balance').eq('user_id', user.id).single();
      if (mounted) setBalance(data?.balance ?? 0);
      setLoading(false);
    })();
    return () => { mounted = false; };
  }, []);

  return { balance, loading };
}