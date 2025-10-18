import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function Home() {
  return (
    <div className="animate-fade-in">
      <section className="bg-gradient-to-br from-primary/10 via-secondary/5 to-background py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold font-heading text-primary leading-tight">
                Создайте свой бизнес-план бесплатно
              </h1>
              <p className="text-xl text-muted-foreground">
                Бесплатный конструктор бизнес-плана доступен в личном кабинете. 
                Данные конфиденциальны. Более 250 примеров на вкладке «Бизнес-план».
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <Button size="lg" className="w-full sm:w-auto text-lg px-8">
                    Начать бесплатно
                  </Button>
                </Link>
                <Link to="/business-plans">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8">
                    Посмотреть примеры
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary to-secondary/50 p-1">
                <div className="w-full h-full rounded-xl bg-white flex items-center justify-center">
                  <Icon name="FileText" size={200} className="text-primary/20" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold font-heading text-center mb-12">
            Почему выбирают нас?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow animate-scale-in">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Icon name="Lock" size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold font-heading mb-2">Конфиденциально</h3>
                <p className="text-muted-foreground">
                  Ваши данные надёжно защищены и доступны только вам в личном кабинете
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow animate-scale-in" style={{ animationDelay: '100ms' }}>
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Icon name="Zap" size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold font-heading mb-2">Просто и быстро</h3>
                <p className="text-muted-foreground">
                  Интуитивный конструктор позволяет создать бизнес-план за несколько минут
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow animate-scale-in" style={{ animationDelay: '200ms' }}>
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Icon name="BookOpen" size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold font-heading mb-2">250+ примеров</h3>
                <p className="text-muted-foreground">
                  Используйте готовые шаблоны бизнес-планов для разных отраслей
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold font-heading mb-6">
            Готовы начать?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Зарегистрируйтесь бесплатно и получите доступ к конструктору бизнес-планов прямо сейчас
          </p>
          <Link to="/register">
            <Button size="lg" className="text-lg px-8">
              Создать аккаунт
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
