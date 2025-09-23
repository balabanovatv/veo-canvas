import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSubmit: (text: string) => Promise<void> | void; // сеть вызываем снаружи
  isLoading?: boolean;
  placeholder?: string;
  className?: string;
}

export function ChatInput({
  onSubmit,
  isLoading = false,
  placeholder = "Опишите видео, которое хотите создать...",
  className,
}: ChatInputProps) {
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const lockRef = useRef(false); // защита от дабл-кликов
  const maxLength = 3500;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      formRef.current?.requestSubmit(); // один путь отправки
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = text.trim();
    if (!value || isLoading || sending || lockRef.current) return;

    lockRef.current = true;
    setSending(true);
    try {
      await onSubmit(value);   // ⬅️ только вызываем внешний обработчик
      setText("");
    } finally {
      setSending(false);
      lockRef.current = false;
    }
  };

  const isOverLimit = text.length > maxLength;
  const charactersLeft = maxLength - text.length;

  return (
    <div className={cn("w-full space-y-4", className)}>
      <form ref={formRef} onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={cn(
              "min-h-[120px] resize-none pr-20 border-input-border focus:border-primary/50 focus:ring-primary/20",
              "text-base placeholder:text-text-muted",
              isOverLimit && "border-error focus:border-error focus:ring-error/20"
            )}
            disabled={isLoading || sending}
          />

          <div className="absolute bottom-3 right-3 flex items-center gap-2">
            <span
              className={cn(
                "text-xs font-medium",
                isOverLimit
                  ? "text-error"
                  : charactersLeft < 100
                  ? "text-warning"
                  : "text-text-muted"
              )}
            >
              {charactersLeft < 0
                ? `+${Math.abs(charactersLeft)}`
                : charactersLeft}
            </span>

            <Button
              type="submit"
              size="sm"
              disabled={!text.trim() || isOverLimit || isLoading || sending}
              className="gradient-primary gradient-primary-hover h-8 w-8 p-0 shrink-0"
            >
              {isLoading || sending ? (
                <Sparkles className="w-4 h-4 animate-pulse" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </form>

      {isOverLimit && (
        <p className="text-sm text-error">
          Превышена максимальная длина промпта на {Math.abs(charactersLeft)} символов
        </p>
      )}
    </div>
  );
}
