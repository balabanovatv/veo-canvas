import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { sendPromptToN8N } from "@/lib/n8n-api";

interface ChatInputProps {
  onSubmit: (text: string) => void;   // только обнови UI/историю, НЕ дергай тут сеть
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
  const [sending, setSending] = useState(false); // локальный флаг "идет отправка"
  const uuidRef = useRef<string | null>(null);   // один uuid на одну отправку
  const maxLength = 3500;

  const actuallySend = async (prompt: string) => {
    // генерим uuid ОДИН раз и переиспользуем, пока запрос не завершится
    const uuid = uuidRef.current ?? crypto.randomUUID();
    uuidRef.current = uuid;

    const result = await sendPromptToN8N(prompt, uuid);
    return result;
  };

  const handleSubmit = async (e: React.FormEvent | React.KeyboardEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    if (isLoading || sending) return;      // защита от повторной отправки

    setSending(true);
    try {
      // 1) обновляем UI (история и т.п.) — без сетевых вызовов
      onSubmit(text.trim());

      // 2) реальная отправка в n8n с одним uuid
      //    если parent сам дергает сеть — убери эту строку и оставь только onSubmit()
      console.log("🚀 Отправляем в n8n:", text.trim());
      const res = await actuallySend(text.trim());
      console.log("✅ Результат n8n:", res);

      // успех — очищаем поле и сбрасываем uuid, чтобы следующая отправка получила новый
      setText("");
      uuidRef.current = null;
    } catch (err) {
      console.error("❌ Ошибка n8n:", err);
      // uuid НЕ сбрасываем — чтобы можно было повторить ту же попытку из кода, если захочешь
    } finally {
      setSending(false);
    }
  };

  // Enter без Shift — отправка. Мы ПРЕДОТВРАЩАЕМ дефолт, поэтому form onSubmit не дублируется
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const isOverLimit = text.length > maxLength;
  const charactersLeft = maxLength - text.length;

  return (
    <div className={cn("w-full space-y-4", className)}>
      {/* оставляем onSubmit, чтобы клик по кнопке отправлял форму ровно ОДИН раз */}
      <form onSubmit={handleSubmit} className="relative">
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
