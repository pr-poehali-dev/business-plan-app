import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface User {
  name: string;
  email: string;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(userData));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="py-12 animate-fade-in">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold font-heading text-primary mb-2">
                Добро пожаловать, {user.name}!
              </h1>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              Выйти
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <Icon name="Plus" size={24} className="text-primary" />
                </div>
                <CardTitle className="font-heading">Создать бизнес-план</CardTitle>
                <CardDescription>
                  Начните работу над новым проектом с нуля или используйте готовый шаблон
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">
                  Создать новый план
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <Icon name="FileText" size={24} className="text-primary" />
                </div>
                <CardTitle className="font-heading">Мои проекты</CardTitle>
                <CardDescription>
                  У вас пока нет сохранённых бизнес-планов
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Посмотреть шаблоны
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="font-heading">Быстрый старт</CardTitle>
              <CardDescription>
                Следуйте этим шагам для создания эффективного бизнес-плана
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Выберите отрасль и тип бизнеса</h3>
                    <p className="text-sm text-muted-foreground">
                      Определитесь с направлением вашего бизнеса и выберите подходящий шаблон
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Заполните основные разделы</h3>
                    <p className="text-sm text-muted-foreground">
                      Опишите продукт, целевую аудиторию, конкурентов и стратегию развития
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Рассчитайте финансовую модель</h3>
                    <p className="text-sm text-muted-foreground">
                      Укажите инвестиции, операционные расходы и прогнозируемую выручку
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Скачайте готовый план</h3>
                    <p className="text-sm text-muted-foreground">
                      Экспортируйте документ в PDF или Word для презентации инвесторам
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
