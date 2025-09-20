import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';

function App() {
  useEffect(() => {
    (async () => {
      // ЗАМИНИ на свой email и пароль
      const email = "test@example.com";
      const password = "StrongPass123";

      // Пытаемся войти
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        console.error("Login error:", error.message);
        return;
      }

      // Получаем сессию и токен
      const { data: { session } } = await supabase.auth.getSession();
      console.log("JWT:", session?.access_token?.slice(0, 20) + "...");
    })();
  }, []);

  return <div>VEO Canvas</div>;
}

export default App;
