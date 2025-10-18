import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

interface BusinessPlan {
  id: number;
  title: string;
  category: string;
  investment: string;
  payback: string;
  description: string;
  details: string;
}

const businessPlans: BusinessPlan[] = [
  {
    id: 1,
    title: 'Кофейня',
    category: 'Общепит',
    investment: '1.5-2 млн ₽',
    payback: '12-18 мес',
    description: 'Небольшая кофейня в центре города с собственной обжаркой',
    details: 'Бизнес-план включает анализ рынка, расчёт инвестиций на оборудование и аренду, прогноз выручки и стратегию продвижения. Окупаемость 12-18 месяцев при среднем чеке 250 рублей.'
  },
  {
    id: 2,
    title: 'Онлайн-школа',
    category: 'Образование',
    investment: '300-500 тыс ₽',
    payback: '6-9 мес',
    description: 'Платформа для онлайн-обучения по востребованным навыкам',
    details: 'Минимальные вложения в создание образовательной платформы. Основные расходы - разработка курсов, маркетинг и техническая поддержка. Модель подписки обеспечивает стабильный доход.'
  },
  {
    id: 3,
    title: 'Фитнес-клуб',
    category: 'Спорт',
    investment: '5-8 млн ₽',
    payback: '24-36 мес',
    description: 'Современный фитнес-клуб с групповыми и персональными тренировками',
    details: 'Полный бизнес-план фитнес-клуба площадью 300-500 кв.м. Включает расчёт оборудования, зарплат персонала, аренды и коммунальных платежей. Анализ конкурентов и стратегия привлечения клиентов.'
  },
  {
    id: 4,
    title: 'Детский сад',
    category: 'Образование',
    investment: '3-5 млн ₽',
    payback: '18-24 мес',
    description: 'Частный детский сад на 50-70 детей',
    details: 'Бизнес-план частного детского сада с лицензированием. Расчёт помещения, игрового оборудования, питания и зарплат воспитателей. Юридические аспекты и требования СанПиН.'
  },
  {
    id: 5,
    title: 'Доставка еды',
    category: 'Общепит',
    investment: '800 тыс - 1.2 млн ₽',
    payback: '9-12 мес',
    description: 'Сервис доставки готовой еды и полуфабрикатов',
    details: 'Бизнес-модель доставки еды с собственной кухней-производством. Калькуляция себестоимости блюд, логистика, интеграция с агрегаторами. Маркетинговая стратегия и масштабирование.'
  },
  {
    id: 6,
    title: 'Салон красоты',
    category: 'Услуги',
    investment: '1.2-2 млн ₽',
    payback: '12-15 мес',
    description: 'Салон красоты с комплексом услуг: парикмахерская, маникюр, косметология',
    details: 'Детальный план открытия салона красоты. Расчёт оборудования, материалов, аренды и зарплат мастеров. Ценообразование услуг и стратегия удержания клиентов.'
  },
  {
    id: 7,
    title: 'Производство мебели',
    category: 'Производство',
    investment: '4-6 млн ₽',
    payback: '24-30 мес',
    description: 'Цех по производству корпусной мебели на заказ',
    details: 'Бизнес-план мебельного производства. Расчёт оборудования, сырья, аренды цеха. Каналы сбыта, работа с дизайнерами и строительными компаниями. Ценообразование и маржинальность.'
  },
  {
    id: 8,
    title: 'Автомойка',
    category: 'Услуги',
    investment: '2-3 млн ₽',
    payback: '15-20 мес',
    description: 'Автомойка самообслуживания с дополнительными услугами',
    details: 'План автомойки с расчётом оборудования, водоснабжения и очистки. Анализ проходимости локации, ценообразование, дополнительные услуги (химчистка, полировка). Сезонность бизнеса.'
  },
  {
    id: 9,
    title: 'Пекарня',
    category: 'Общепит',
    investment: '1.8-2.5 млн ₽',
    payback: '12-16 мес',
    description: 'Пекарня-кондитерская с продажей на вынос',
    details: 'Бизнес-план пекарни с собственным производством. Расчёт печей, холодильного оборудования, сырья. Ассортиментная матрица, себестоимость продукции, каналы сбыта (розница, опт, HoReCa).'
  },
  {
    id: 10,
    title: 'IT-стартап',
    category: 'Технологии',
    investment: '500 тыс - 1 млн ₽',
    payback: '12-24 мес',
    description: 'Разработка мобильного приложения для решения бытовых задач',
    details: 'План запуска IT-продукта: MVP разработка, тестирование гипотез, привлечение инвестиций. Юнит-экономика, метрики роста, монетизация. Стратегия выхода на рынок и масштабирования.'
  }
];

export default function BusinessPlans() {
  const [selectedPlan, setSelectedPlan] = useState<BusinessPlan | null>(null);

  return (
    <div className="py-12 animate-fade-in">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-primary mb-4">
            Готовые бизнес-планы вашего будущего бизнеса
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Более 250 примеров бизнес-планов для различных отраслей. Выберите подходящий шаблон и адаптируйте под свой проект.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {businessPlans.map((plan, index) => (
            <Card 
              key={plan.id} 
              className="hover:shadow-xl transition-all cursor-pointer group animate-scale-in"
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={() => setSelectedPlan(plan)}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                  <Icon name="Briefcase" size={24} className="text-primary" />
                </div>
                <h3 className="text-lg font-bold font-heading">{plan.title}</h3>
                <p className="text-sm text-primary">{plan.category}</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Icon name="DollarSign" size={16} className="text-muted-foreground" />
                    <span className="text-muted-foreground">Инвестиции:</span>
                    <span className="font-semibold">{plan.investment}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="TrendingUp" size={16} className="text-muted-foreground" />
                    <span className="text-muted-foreground">Окупаемость:</span>
                    <span className="font-semibold">{plan.payback}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
                  Подробнее
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedPlan} onOpenChange={() => setSelectedPlan(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-heading">{selectedPlan?.title}</DialogTitle>
            <DialogDescription className="text-base">
              <span className="text-primary font-semibold">{selectedPlan?.category}</span>
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <p className="text-muted-foreground">{selectedPlan?.description}</p>
            
            <div className="grid grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Инвестиции</p>
                <p className="font-semibold text-lg">{selectedPlan?.investment}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Окупаемость</p>
                <p className="font-semibold text-lg">{selectedPlan?.payback}</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Описание бизнес-плана:</h4>
              <p className="text-muted-foreground">{selectedPlan?.details}</p>
            </div>
            
            <div className="flex gap-3 pt-4">
              <Button className="flex-1">Использовать шаблон</Button>
              <Button variant="outline" onClick={() => setSelectedPlan(null)}>Закрыть</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
