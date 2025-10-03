import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Edit3, Video, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface PromptPreviewProps {
  prompt: string;
  onEdit?: (newPrompt: string) => void;
  onGenerate?: (quantity: number) => void;
  isGenerating?: boolean;
  userBalance?: number;
  className?: string;
}

export function PromptPreview({ 
  prompt, 
  onEdit, 
  onGenerate, 
  isGenerating = false,
  userBalance = 0,
  className 
}: PromptPreviewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPrompt, setEditedPrompt] = useState(prompt);

  const handleSaveEdit = () => {
    onEdit?.(editedPrompt);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedPrompt(prompt);
    setIsEditing(false);
  };

  const handleGenerate = (quantity: number) => {
    if (userBalance >= quantity) {
      onGenerate?.(quantity);
    }
  };

  const canGenerate = (quantity: number) => userBalance >= quantity && !isGenerating;

  return (
    <Card className={cn("p-6 space-y-4", className)}>
      {/* Заголовок */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-text-primary">Готовый промпт</h3>
        </div>
        
        {!isEditing && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(true)}
            className="h-8 px-3 text-xs"
          >
            <Edit3 className="w-3 h-3 mr-1" />
            Редактировать
          </Button>
        )}
      </div>

      {/* Промпт */}
      <div className="space-y-3">
        {isEditing ? (
          <div className="space-y-3">
            <Textarea
              value={editedPrompt}
              onChange={(e) => setEditedPrompt(e.target.value)}
              className="min-h-[120px] border-input-border focus:border-primary/50"
              placeholder="Отредактируйте промпт..."
            />
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                onClick={handleSaveEdit}
                className="gradient-primary gradient-primary-hover"
              >
                Сохранить
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCancelEdit}
              >
                Отмена
              </Button>
            </div>
          </div>
        ) : (
          <div className="relative space-y-3">
            <div className="p-4 bg-background border border-border-light rounded-lg">
              <p className="text-sm text-text-primary leading-relaxed whitespace-pre-wrap">
                {prompt}
              </p>
            </div>
            <div className="flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="gap-2"
              >
                <Edit3 className="w-4 h-4" />
                Редактировать промпт
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Кнопки генерации */}
      {!isEditing && (
        <div className="space-y-3">
          <div className="text-xs text-text-muted">
            Выберите количество видео для генерации:
          </div>
          
          <div className="flex items-center gap-3">
            {[1, 2, 3].map((quantity) => (
              <Button
                key={quantity}
                onClick={() => handleGenerate(quantity)}
                disabled={!canGenerate(quantity)}
                className={cn(
                  "flex-1 h-12 gradient-primary gradient-primary-hover",
                  "disabled:opacity-50 disabled:cursor-not-allowed"
                )}
              >
                <Video className="w-4 h-4 mr-2" />
                {quantity} видео
                {quantity > 1 && (
                  <Badge variant="secondary" className="ml-2 bg-white/20 text-white text-xs">
                    -{quantity}
                  </Badge>
                )}
              </Button>
            ))}
          </div>
          
          {userBalance < 3 && (
            <div className="text-xs text-warning text-center">
              {userBalance === 0 
                ? "Недостаточно кредитов для генерации"
                : `Доступно: ${userBalance} кредитов`
              }
            </div>
          )}
        </div>
      )}
    </Card>
  );
}