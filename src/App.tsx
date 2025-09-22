import { useEffect } from 'react';
import { supabase } from './lib/supabase';

export default function App() {
  useEffect(() => {
    (async () => {
      const email = 'ТВОЙ_EMAIL';
      const password = 'ТВОЙ_ПАРОЛЬ';

      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        console.error('Login error:', error.message);
        return;
      }

      const { data: { session } } = await supabase.auth.getSession();
      console.log('JWT:', session?.access_token?.slice(0, 24) + '...');
    })();
  }, []);

  return <div>VEO Canvas</div>;
}
