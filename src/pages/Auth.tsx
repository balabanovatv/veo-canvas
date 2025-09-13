import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Video, Mail, Lock, User, ArrowLeft, CheckCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export default function Auth() {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const navigate = useNavigate();
  const { toast } = useToast();

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: ""
  });

  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [forgotForm, setForgotForm] = useState({
    email: ""
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Симуляция входа
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Добро пожаловать!",
      description: "Вы успешно вошли в систему"
    });
    
    navigate("/app");
    setIsLoading(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (registerForm.password !== registerForm.confirmPassword) {
      toast({
        title: "Ошибка",
        description: "Пароли не совпадают",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    // Симуляция регистрации
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Регистрация успешна!",
      description: "Добро пожаловать в VEO Factory"
    });
    
    navigate("/app");
    setIsLoading(false);
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Симуляция восстановления
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Письмо отправлено",
      description: "Проверьте почту для восстановления пароля"
    });
    
    setActiveTab("login");
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Левая панель */}
      <div className="hidden lg:flex lg:w-1/2 gradient-primary relative overflow-hidden">
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Video className="w-6 h-6" />
              </div>
              <span className="text-2xl font-bold">VEO Factory</span>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-4xl font-bold leading-tight">
                Создавайте видео будущего с помощью ИИ
              </h1>
              <p className="text-xl opacity-90 leading-relaxed">
                Превращайте идеи в профессиональные видео за минуты. 
                Без опыта в видеопроизводстве.
              </p>
            </div>

            <div className="space-y-4">
              {[
                "🚀 Генерация за 2-5 минут",
                "🎬 Профессиональное качество",
                "🇷🇺 Полная поддержка русского языка",
                "🔒 Безопасность данных"
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 opacity-80" />
                  <span className="opacity-90">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Декоративные элементы */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24"></div>
      </div>

      {/* Правая панель */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 lg:px-16">
        <div className="w-full max-w-md mx-auto">
          {/* Кнопка назад */}
          <div className="mb-8">
            <Link to="/">
              <Button variant="ghost" className="gap-2 p-0 h-auto text-text-secondary hover:text-text-primary">
                <ArrowLeft className="w-4 h-4" />
                На главную
              </Button>
            </Link>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            {/* Заголовки */}
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-text-primary">
                {activeTab === "login" && "Вход в аккаунт"}
                {activeTab === "register" && "Создать аккаунт"}
                {activeTab === "forgot" && "Восстановление"}
              </h2>
              <p className="text-text-secondary">
                {activeTab === "login" && "Добро пожаловать обратно!"}
                {activeTab === "register" && "Присоединяйтесь к VEO Factory"}
                {activeTab === "forgot" && "Восстановите доступ к аккаунту"}
              </p>
            </div>

            {/* Табы навигации */}
            {activeTab !== "forgot" && (
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Вход</TabsTrigger>
                <TabsTrigger value="register">Регистрация</TabsTrigger>
              </TabsList>
            )}

            {/* Форма входа */}
            <TabsContent value="login" className="space-y-4">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-muted" />
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="your@email.com"
                      className="pl-10"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm(prev => ({...prev, email: e.target.value}))}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-password">Пароль</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-muted" />
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm(prev => ({...prev, password: e.target.value}))}
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full gradient-primary gradient-primary-hover"
                  disabled={isLoading}
                >
                  {isLoading ? "Входим..." : "Войти"}
                </Button>

                <div className="text-center">
                  <Button
                    type="button"
                    variant="link"
                    className="text-text-muted hover:text-primary"
                    onClick={() => setActiveTab("forgot")}
                  >
                    Забыли пароль?
                  </Button>
                </div>
              </form>
            </TabsContent>

            {/* Форма регистрации */}
            <TabsContent value="register" className="space-y-4">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="register-name">Имя</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-muted" />
                    <Input
                      id="register-name"
                      type="text"
                      placeholder="Ваше имя"
                      className="pl-10"
                      value={registerForm.name}
                      onChange={(e) => setRegisterForm(prev => ({...prev, name: e.target.value}))}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-muted" />
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="your@email.com"
                      className="pl-10"
                      value={registerForm.email}
                      onChange={(e) => setRegisterForm(prev => ({...prev, email: e.target.value}))}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-password">Пароль</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-muted" />
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10"
                      value={registerForm.password}
                      onChange={(e) => setRegisterForm(prev => ({...prev, password: e.target.value}))}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-confirm">Подтвердите пароль</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-muted" />
                    <Input
                      id="register-confirm"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10"
                      value={registerForm.confirmPassword}
                      onChange={(e) => setRegisterForm(prev => ({...prev, confirmPassword: e.target.value}))}
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full gradient-primary gradient-primary-hover"
                  disabled={isLoading}
                >
                  {isLoading ? "Создаём аккаунт..." : "Создать аккаунт"}
                </Button>
              </form>
            </TabsContent>

            {/* Форма восстановления */}
            <TabsContent value="forgot" className="space-y-4">
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="forgot-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-muted" />
                    <Input
                      id="forgot-email"
                      type="email"
                      placeholder="your@email.com"
                      className="pl-10"
                      value={forgotForm.email}
                      onChange={(e) => setForgotForm(prev => ({...prev, email: e.target.value}))}
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full gradient-primary gradient-primary-hover"
                  disabled={isLoading}
                >
                  {isLoading ? "Отправляем..." : "Восстановить пароль"}
                </Button>

                <div className="text-center">
                  <Button
                    type="button"
                    variant="link"
                    className="text-text-muted hover:text-primary"
                    onClick={() => setActiveTab("login")}
                  >
                    Вернуться к входу
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}