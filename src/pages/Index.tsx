'use client';
import { useBalance } from '@/hooks/useBalance';
import { BalanceWidget } from '@/components/balance-widget';

const Index = () => {
  const { balance, loading } = useBalance();
  return (
    <div className="flex min-h-screen items-start bg-background">
      <main className="flex-1 p-6">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">VEO Factory</h1>
          <BalanceWidget balance={balance ?? 0} />
        </header>
        <section className="rounded-2xl border p-6">
          {loading ? 'Загружаю баланс…' : `Ваш баланс: ${balance ?? 0} кредитов`}
        </section>
      </main>
    </div>
  );
};

export default Index;
