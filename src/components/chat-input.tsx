import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { sendPromptToN8N } from '@/lib/n8n-api';

interface ChatInputProps {
  onSubmit: (text: string) => void;
  isLoading?: boolean;
  placeholder?: string;
  className?: string;
}

export function ChatInput({ 
  onSubmit, 
  isLoading = false, 
  placeholder = "Опишите видео, которое хотите создать...",
  className 
}: ChatInputProps) {
  const [text, setText] = useState("");
  const maxLength = 3500;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && !isLoading) {
      onSubmit(text.trim());
      
      // Отправляем промпт в n8n webhook
      try {
        console.log('🚀 Отправляем в n8n:', text.trim());
        const result = await sendPromptToN8N(text.trim(), `dialogue-${Date.now()}`);
        console.log('✅ Результат n8n:', result);
      } catch (error) {
        console.error('❌ Ошибка n8n:', error);
      }
      
      setText("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const isOverLimit = text.length > maxLength;
  const charactersLeft = maxLength - text.length;

  return (
    <div className={cn("w-full space-y-4", className)}>
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
            disabled={isLoading}
          />
          
          <div className="absolute bottom-3 right-3 flex items-center gap-2">
            <span className={cn(
              "text-xs font-medium",
              isOverLimit ? "text-error" : charactersLeft < 100 ? "text-warning" : "text-text-muted"
            )}>
              {charactersLeft < 0 ? `+${Math.abs(charactersLeft)}` : charactersLeft}
            </span>
            
            <Button
              type="submit"
              size="sm"
              disabled={!text.trim() || isLoading || isOverLimit}
              className="gradient-primary gradient-primary-hover h-8 w-8 p-0 shrink-0"
            >
              {isLoading ? (
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