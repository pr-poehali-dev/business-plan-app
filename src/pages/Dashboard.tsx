import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { api, type BusinessPlan } from '@/lib/api';

interface User {
  id: number;
  name: string;
  email: string;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [plans, setPlans] = useState<BusinessPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [newPlan, setNewPlan] = useState({
    title: '',
    category: '',
    description: '',
    investment: '',
    payback: ''
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }
    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    loadPlans(parsedUser.id);
  }, [navigate]);

  const loadPlans = async (userId: number) => {
    try {
      const response = await api.businessPlans.getAll(userId);
      setPlans(response.plans);
    } catch (error) {
      toast({
        title: 'Ошибка загрузки',
        description: 'Не удалось загрузить бизнес-планы',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreatePlan = async () => {
    if (!user || !newPlan.title) {
      toast({
        title: 'Ошибка',
        description: 'Укажите название бизнес-плана',
        variant: 'destructive'
      });
      return;
    }

    setIsCreating(true);
    try {
      await api.businessPlans.create(user.id, newPlan);
      toast({
        title: 'Успешно',
        description: 'Бизнес-план создан!'
      });
      setIsCreateDialogOpen(false);
      setNewPlan({ title: '', category: '', description: '', investment: '', payback: '' });
      loadPlans(user.id);
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: error instanceof Error ? error.message : 'Не удалось создать план',
        variant: 'destructive'
      });
    } finally {
      setIsCreating(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="py-12 animate-fade-in">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
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
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setIsCreateDialogOpen(true)}>
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
                  {isLoading ? 'Загрузка...' : `У вас ${plans.length} ${plans.length === 1 ? 'бизнес-план' : 'бизнес-планов'}`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/business-plans">
                  <Button variant="outline" className="w-full">
                    Посмотреть шаблоны
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {plans.length > 0 && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="font-heading">Ваши бизнес-планы</CardTitle>
                <CardDescription>Нажмите на план для редактирования</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {plans.map((plan) => (
                    <div
                      key={plan.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors cursor-pointer"
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold">{plan.title}</h3>
                        <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                          {plan.category && <span>{plan.category}</span>}
                          {plan.investment && <span>• {plan.investment}</span>}
                          {plan.payback && <span>• {plan.payback}</span>}
                        </div>
                      </div>
                      <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

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

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-heading">Создать новый бизнес-план</DialogTitle>
            <DialogDescription>
              Заполните основную информацию о вашем проекте
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Название бизнес-плана *</Label>
              <Input
                id="title"
                placeholder="Например: Кофейня в центре города"
                value={newPlan.title}
                onChange={(e) => setNewPlan({ ...newPlan, title: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Категория</Label>
              <Input
                id="category"
                placeholder="Например: Общепит"
                value={newPlan.category}
                onChange={(e) => setNewPlan({ ...newPlan, category: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Описание</Label>
              <Textarea
                id="description"
                placeholder="Краткое описание вашего бизнеса"
                value={newPlan.description}
                onChange={(e) => setNewPlan({ ...newPlan, description: e.target.value })}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="investment">Инвестиции</Label>
                <Input
                  id="investment"
                  placeholder="Например: 1-2 млн ₽"
                  value={newPlan.investment}
                  onChange={(e) => setNewPlan({ ...newPlan, investment: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="payback">Окупаемость</Label>
                <Input
                  id="payback"
                  placeholder="Например: 12-18 мес"
                  value={newPlan.payback}
                  onChange={(e) => setNewPlan({ ...newPlan, payback: e.target.value })}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Отмена
            </Button>
            <Button onClick={handleCreatePlan} disabled={isCreating}>
              {isCreating ? 'Создание...' : 'Создать'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
