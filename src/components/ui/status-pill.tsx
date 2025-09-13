import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

type JobStatus = 'queued' | 'running' | 'done' | 'error';

interface StatusPillProps {
  status: JobStatus;
  className?: string;
}

const statusConfig = {
  queued: {
    label: 'В очереди',
    className: 'bg-warning-light text-warning border-warning/20',
    icon: null,
  },
  running: {
    label: 'Генерируется',
    className: 'bg-primary/10 text-primary border-primary/20',
    icon: <Loader2 className="w-3 h-3 animate-spin" />,
  },
  done: {
    label: 'Готово',
    className: 'bg-success-light text-success border-success/20',
    icon: null,
  },
  error: {
    label: 'Ошибка',
    className: 'bg-error-light text-error border-error/20',
    icon: null,
  },
};

export function StatusPill({ status, className }: StatusPillProps) {
  const config = statusConfig[status];
  
  return (
    <div className={cn(
      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border",
      config.className,
      className
    )}>
      {config.icon}
      <span>{config.label}</span>
    </div>
  );
}