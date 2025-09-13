import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Coins, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface BalanceWidgetProps {
  balance: number;
  onTopUp?: () => void;
  className?: string;
}

export function BalanceWidget({ balance, onTopUp, className }: BalanceWidgetProps) {
  const isLowBalance = balance < 5;
  
  return (
    <Card className={cn(
      "p-3 flex items-center gap-3 bg-card border-border",
      className
    )}>
      <div className="flex items-center gap-2">
        <div className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center",
          isLowBalance ? "bg-warning-light" : "bg-primary/10"
        )}>
          <Coins className={cn(
            "w-4 h-4",
            isLowBalance ? "text-warning" : "text-primary"
          )} />
        </div>
        
        <div>
          <p className="text-xs text-text-muted">Баланс</p>
          <p className={cn(
            "font-semibold",
            isLowBalance ? "text-warning" : "text-text-primary"
          )}>
            {balance} кредитов
          </p>
        </div>
      </div>
      
      {isLowBalance && onTopUp && (
        <Button
          variant="outline"
          size="sm"
          onClick={onTopUp}
          className="ml-auto h-8 px-3 text-xs border-primary/20 text-primary hover:bg-primary/5"
        >
          <Plus className="w-3 h-3 mr-1" />
          Пополнить
        </Button>
      )}
    </Card>
  );
}