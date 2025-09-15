import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Video, 
  Sparkles, 
  ArrowRight, 
  CheckCircle,
  PlayCircle,
  Zap,
  Users,
  Shield
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Landing() {
  const features = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "AI-генерация видео",
      description: "Создавайте профессиональные видео из текстового описания за минуты"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Мгновенный результат",
      description: "Получайте готовые видео в высоком качестве без долгого ожидания"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Для всех задач",
      description: "Реклама, контент для соцсетей, презентации и многое другое"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Безопасность данных",
      description: "Ваши промпты и видео надёжно защищены на российских серверах"
    }
  ];

  const plans = [
    {
      name: "Starter",
      price: "990",
      credits: "10",
      description: "Для знакомства с платформой",
      features: [
        "10 кредитов для генерации",
        "HD качество видео",
        "Базовая поддержка",
        "Хранение 30 дней"
      ]
    },
    {
      name: "Pro",
      price: "2990",
      credits: "50",
      description: "Для регулярного использования",
      features: [
        "50 кредитов для генерации",
        "4K качество видео",
        "Приоритетная поддержка",
        "Хранение 90 дней",
        "Пакетная генерация"
      ],
      popular: true
    },
    {
      name: "Studio",
      price: "7990",
      credits: "150",
      description: "Для профессионалов",
      features: [
        "150 кредитов для генерации",
        "4K качество + эффекты",
        "Персональный менеджер",
        "Безлимитное хранение",
        "API доступ",
        "Кастомные модели"
      ]
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Опишите идею",
      description: "Расскажите, какое видео хотите создать. Наш ИИ поможет улучшить промпт."
    },
    {
      number: "02", 
      title: "Выберите количество",
      description: "Сгенерируйте от 1 до 3 вариантов видео одновременно для лучшего выбора."
    },
    {
      number: "03",
      title: "Получите результат",
      description: "Скачайте готовые видео в высоком качестве и используйте где угодно."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Навигация */}
      <header className="border-b border-border-light bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <Video className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-text-primary">VEO Factory</span>
            </div>
            
            <div className="flex items-center gap-4">
              <Link to="/auth/login">
                <Button variant="ghost" className="text-text-secondary hover:text-text-primary">
                  Войти
                </Button>
              </Link>
              <Link to="/auth/register">
                <Button className="gradient-primary gradient-primary-hover">
                  Попробовать бесплатно
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Герой */}
      <section className="pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <Badge className="bg-primary/10 text-primary border-primary/20" variant="outline">
              Новая эра создания контента
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold text-text-primary leading-tight">
              Создавайте видео{" "}
              <span className="text-gradient">будущего</span>
            </h1>
            
            <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
              Профессиональные видео из текста с помощью передовых AI-технологий. 
              Быстро, качественно, на русском языке.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/auth/register">
                <Button size="lg" className="gradient-primary gradient-primary-hover shadow-glow h-14 px-8 text-lg">
                  <PlayCircle className="w-5 h-5 mr-2" />
                  Начать создавать
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg">
                Смотреть примеры
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Как это работает */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-text-primary mb-4">
              Как это работает
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Три простых шага до профессионального видео
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <Card key={index} className="p-8 text-center space-y-4 border-border-light hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto text-2xl font-bold text-white">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-text-primary">
                  {step.title}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {step.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Возможности */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-text-primary mb-4">
              Возможности платформы
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Всё необходимое для создания качественного видеоконтента
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 space-y-4 border-border-light hover:border-primary/20 transition-colors group">
                <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center text-white group-hover:shadow-glow transition-shadow">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-text-primary">
                  {feature.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Тарифы */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-text-primary mb-4">
              Выберите тариф
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Прозрачные цены без скрытых платежей
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <Card key={index} className={`p-8 space-y-6 border-border-light relative ${
                plan.popular ? 'border-primary shadow-glow' : ''
              }`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 gradient-primary text-white">
                    Популярный
                  </Badge>
                )}
                
                <div className="text-center space-y-2">
                  <h3 className="text-2xl font-bold text-text-primary">{plan.name}</h3>
                  <p className="text-text-secondary">{plan.description}</p>
                  <div className="space-y-1">
                    <div className="text-4xl font-bold text-text-primary">
                      {plan.price}₽
                    </div>
                    <div className="text-sm text-text-muted">
                      {plan.credits} кредитов
                    </div>
                  </div>
                </div>
                
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-success mt-0.5 shrink-0" />
                      <span className="text-sm text-text-secondary">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link to="/auth/register" className="block">
                  <Button 
                    className={`w-full ${plan.popular ? 'gradient-primary gradient-primary-hover' : ''}`}
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    Выбрать тариф
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card className="p-12 gradient-primary text-white relative overflow-hidden">
            <div className="relative z-10 space-y-6">
              <h2 className="text-4xl font-bold">
                Готовы создать своё первое видео?
              </h2>
              <p className="text-xl opacity-90 max-w-2xl mx-auto">
                Присоединяйтесь к тысячам создателей контента, которые уже используют VEO Factory
              </p>
              <Link to="/auth/register">
                <Button size="lg" variant="secondary" className="h-14 px-8 text-lg">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Начать бесплатно
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
            
            {/* Декоративные элементы */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
          </Card>
        </div>
      </section>

      {/* Футер */}
      <footer className="border-t border-border-light bg-card py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <Video className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-text-primary">VEO Factory</span>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-text-secondary">
              <a href="#" className="hover:text-text-primary transition-colors">
                Поддержка
              </a>
              <a href="#" className="hover:text-text-primary transition-colors">
                Документация
              </a>
              <a href="#" className="hover:text-text-primary transition-colors">
                Политика конфиденциальности
              </a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-border-light text-center text-sm text-text-muted">
            © 2024 VEO Factory. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}