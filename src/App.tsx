import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function App() {
  useEffect(() => {
    (async () => {
      const email = 'твоя@почта.com';

      const { error } = await supabase.auth.signInWithPassword({
  email: 'твой_email',
  password: 'твой_пароль',
});
if (error) console.error(error.message);

const { data:{ session } } = await supabase.auth.getSession();
console.log('JWT:', session?.access_token?.slice(0,24)+'...');
        }
      });
    })();
  }, []);

  return <div>VEO Canvas</div>;
}
