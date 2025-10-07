import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChatInput } from "@/components/chat-input";
import { PromptPreview } from "@/components/prompt-preview";
import { RenderBar } from "@/components/render-bar";
import { BalanceWidget } from "@/components/balance-widget";
import { useBalance } from "@/hooks/useBalance";
import { useJobRealtime } from "@/hooks/useJobRealtime";
import {
  Video,
  Sparkles,
  Menu,
  Home,
  History,
  CreditCard,
  User,
  Plus,
  MessageSquare,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { sendPromptToN8N, approvePrompt } from "@/lib/n8n-api";

// Моковые данные для демонстрации
const mockJobs = [
  {
    id: "1",
    dialogue_uuid: "uuid-1",
    quantity: 2,
    status: "done" as const,
    created_at: "2024-01-15T10:30:00Z",
    finished_at: "2024-01-15T10:35:00Z",
    files: [
      {
        id: "f1",
        file_url: "/videos/example1.mp4",
        thumb_url: "https://picsum.photos/400/225?random=1",
        duration: 45,
        size: 15728640,
      },
      {
        id: "f2",
        file_url: "/videos/example2.mp4",
        thumb_url: "https://picsum.photos/400/225?random=2",
        duration: 30,
        size: 12582912,
      },
    ],
  },
  {
    id: "2",
    dialogue_uuid: "uuid-2",
    quantity: 1,
    status: "running" as const,
    created_at: "2024-01-15T11:00:00Z",
  },
  {
    id: "3",
    dialogue_uuid: "uuid-3",
    quantity: 1,
    status: "queued" as const,
    created_at: "2024-01-15T11:05:00Z",
  },
  {
    id: "4",
    dialogue_uuid: "uuid-4",
    quantity: 1,
    status: "error" as const,
    error: "Ошибка генерации: недостаточно GPU ресурсов",
    created_at: "2024-01-15T09:45:00Z",
  },
];

export default function Dashboard() {
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [improvedPrompt, setImprovedPrompt] = useState("");
  const [isImproving, setIsImproving] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPromptPreview, setShowPromptPreview] = useState(false);
  const [jobs, setJobs] = useState(mockJobs);
  const { balance: userBalance } = useBalance();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentJobId, setCurrentJobId] = useState<string | null>(null);
  const [currentJobStatus, setCurrentJobStatus] = useState<string | null>(null);

  // --- анти-дабл на уровне страницы + единый uuid для одного диалога ---
  const inFlightRef = useRef(false);
  const dialogueUuidRef = useRef<string | null>(null);

  const navigate = useNavigate();
  const { toast } = useToast();

  // Защита маршрута: редирект на логин, если нет сессии
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) navigate("/auth/login");
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate("/auth/login");
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  // Realtime subscription for job status updates
  useJobRealtime(currentJobId, (newStatus) => {
    console.log("📡 Job status updated via Realtime:", newStatus);
    setCurrentJobStatus(newStatus);
    
    if (newStatus === "pending_approval") {
      setShowPromptPreview(true);
    } else if (newStatus === "done" || newStatus === "completed") {
      toast({
        title: "Генерация завершена",
        description: "Видео готово!",
      });
    } else if (newStatus === "error") {
      toast({
        title: "Ошибка генерации",
        description: "Произошла ошибка при генерации видео",
        variant: "destructive",
      });
    }
  });

  // основной обработчик отправки из ChatInput
  const handleImprovePrompt = async (text: string) => {
    if (inFlightRef.current) return; // анти-дабл
    inFlightRef.current = true;

    setIsImproving(true);
    setCurrentPrompt(text);

    try {
      // генерим и переиспользуем один dialogue_uuid на диалог
      if (!dialogueUuidRef.current) {
        dialogueUuidRef.current = crypto.randomUUID();
      }
      const dialogue_uuid = dialogueUuidRef.current;

      // один вызов в n8n
      const result = await sendPromptToN8N(text, dialogue_uuid);
      console.log("✅ Результат n8n:", result);

      // Унифицируем jobId: берем что пришло (job_id | id | dialogue_uuid)
      const jobId: string =
        String(result?.job_id ?? result?.id ?? result?.dialogue_uuid ?? dialogue_uuid);

      setCurrentJobId(jobId);

      // сразу показываем превью (берём prompt из ответа n8n)
      setImprovedPrompt(result.prompt ?? "");

      // показываем экран превью
      setShowPromptPreview(true);
    } catch (error) {
      console.error("❌ Ошибка n8n:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось отправить запрос",
        variant: "destructive",
      });
    } finally {
      setIsImproving(false);
      inFlightRef.current = false;
    }
  };

  const handleEditPrompt = (newPrompt: string) => {
    setImprovedPrompt(newPrompt);
    toast({
      title: "Промпт обновлён",
      description: "Изменения сохранены",
    });
  };

  const handleGenerate = async (quantity: number) => {
    if (!currentJobId) return;

    if ((userBalance ?? 0) < quantity) {
      toast({
        title: "Недостаточно кредитов",
        description: "Пополните баланс для продолжения",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      await approvePrompt(currentJobId, quantity);

      toast({
        title: "Генерация запущена",
        description: `Создаём ${quantity} видео. Это займёт несколько минут.`,
      });
    } catch (error) {
      console.error("Ошибка одобрения:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось запустить генерацию",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRefreshJob = (jobId: string) => {
    // В реальном приложении здесь был бы API вызов
    console.log(`Refreshing job ${jobId}`);
  };

  const handleDownloadFile = (fileUrl: string, fileName: string) => {
    toast({
      title: "Скачивание",
      description: `Загружаем ${fileName}...`,
    });
  };

  const handlePlayFile = (fileUrl: string) => {
    toast({
      title: "Открытие видео",
      description: "Видеоплеер откроется в новом окне",
    });
  };

  const handleTopUp = () => {
    navigate("/app/billing");
  };

  const sidebarItems = [
    { icon: Home, label: "Главный чат", path: "/app", active: true },
    { icon: Plus, label: "Создать новый чат", path: "/app/new" },
    { icon: History, label: "История", path: "/app/history" },
    { icon: CreditCard, label: "Биллинг", path: "/app/billing" },
    { icon: User, label: "Аккаунт", path: "/app/account" },
  ];

  return (
    <div className="h-screen flex bg-background">
      {/* Сайдбар */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-16"
        } transition-all duration-300 border-r border-border-light bg-card flex flex-col`}
      >
        {/* Лого */}
        <div className="p-4 border-b border-border-light">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center shrink-0">
              <Video className="w-5 h-5 text-white" />
            </div>
            {sidebarOpen && (
              <span className="font-bold text-text-primary">VEO Factory</span>
            )}
          </div>
        </div>

        {/* Навигация */}
        <nav className="flex-1 p-4 space-y-2">
          {sidebarItems.map((item) => (
            <Button
              key={item.path}
              variant={item.active ? "default" : "ghost"}
              className={`w-full justify-start ${!sidebarOpen && "px-3"} ${
                item.active ? "gradient-primary gradient-primary-hover" : ""
              }`}
              onClick={() => navigate(item.path)}
            >
              <item.icon className={`w-4 h-4 ${sidebarOpen ? "mr-3" : ""}`} />
              {sidebarOpen && item.label}
            </Button>
          ))}
        </nav>

        {/* Баланс */}
        {sidebarOpen && (
          <div className="p-4 border-t border-border-light">
            <BalanceWidget balance={userBalance ?? 0} onTopUp={handleTopUp} />
          </div>
        )}
      </div>

      {/* Основная область */}
      <div className="flex-1 flex">
        {/* Центральная панель */}
        <div className="flex-1 flex flex-col">
          {/* Хедер */}
          <header className="h-16 border-b border-border-light bg-white/80 backdrop-blur-sm flex items-center justify-between px-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="w-8 h-8 p-0"
            >
              <Menu className="w-4 h-4" />
            </Button>

            {!sidebarOpen && (
              <BalanceWidget
                balance={userBalance ?? 0}
                onTopUp={handleTopUp}
                className="ml-auto"
              />
            )}
          </header>

          {/* Контент */}
          <main className="flex-1 p-6 overflow-y-auto">
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Приветствие */}
              {!showPromptPreview && (
                <div className="text-center space-y-6 py-12">
                  <div className="space-y-4">
                    <h1 className="text-5xl font-bold text-text-primary">
                      Здравствуйте, чем я могу{" "}
                      <span className="text-gradient">вам помочь?</span>
                    </h1>
                    <p className="text-xl text-text-secondary max-w-2xl mx-auto">
                      Опишите видео, которое хотите создать, и я помогу составить
                      идеальный промпт для AI-генерации
                    </p>
                  </div>
                </div>
              )}

              {/* Ввод промпта */}
              {!showPromptPreview && (
                <ChatInput
                  onSubmit={handleImprovePrompt}
                  isLoading={isImproving}
                  placeholder="Опишите видео, которое хотите создать..."
                />
              )}

              {/* Индикатор улучшения */}
              {isImproving && (
                <Card className="p-6 text-center">
                  <div className="flex items-center justify-center gap-3 text-primary">
                    <Sparkles className="w-5 h-5 animate-pulse" />
                    <span className="font-medium">ИИ улучшает ваш промпт...</span>
                  </div>
                </Card>
              )}

              {/* Превью промпта */}
              {showPromptPreview && improvedPrompt && (
                <PromptPreview
                  prompt={improvedPrompt}
                  onEdit={handleEditPrompt}
                  onGenerate={handleGenerate}
                  isGenerating={isGenerating}
                  userBalance={userBalance}
                />
              )}

              {/* Кнопка нового чата */}
              {showPromptPreview && (
                <div className="text-center">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowPromptPreview(false);
                      setCurrentPrompt("");
                      setImprovedPrompt("");
                      setCurrentJobId(null);
                      // новый диалог — новый uuid
                      dialogueUuidRef.current = null;
                    }}
                    className="gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Создать новый чат
                  </Button>
                </div>
              )}
            </div>
          </main>
        </div>

        {/* Render Bar */}
        <div className="w-96 border-l border-border-light bg-card p-6 custom-scrollbar">
          <RenderBar
            jobs={jobs}
            onRefreshJob={handleRefreshJob}
            onDownloadFile={handleDownloadFile}
            onPlayFile={handlePlayFile}
          />
        </div>
      </div>
    </div>
  );
}
