'use client';
import { useBalance } from '@/hooks/useBalance';
import { BalanceWidget } from '@/components/balance-widget';

export default function Index() {
  const { balance, loading, error } = useBalance();
  return (
    <div className="flex min-h-screen items-start bg-background">
      <main className="flex-1 p-6">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">VEO Factory</h1>
          <BalanceWidget balance={balance} />
        </header>
        <section className="rounded-2xl border p-6">
          {loading && <div>Загружаю баланс…</div>}
          {error && <div className="text-red-500">Ошибка: {error}</div>}
          {!loading && !error && <div>Ваш баланс: {balance} кредитов</div>}
        </section>
      </main>
    </div>
  );
}
