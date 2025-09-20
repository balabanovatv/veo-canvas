import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function App() {
  useEffect(() => {
    (async () => {
      const email = 'твоя@почта.com';

      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: window.location.origin }
      });
      if (error) return console.error('OTP error:', error.message);

      console.log('Magic link sent. Open the email and click the link.');
      supabase.auth.onAuthStateChange(async (_evt, session) => {
        if (session?.access_token) {
          console.log('JWT:', session.access_token.slice(0, 24) + '...');
        }
      });
    })();
  }, []);

  return <div>VEO Canvas</div>;
}
