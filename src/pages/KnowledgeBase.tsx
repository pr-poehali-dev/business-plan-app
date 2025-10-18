import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

export default function KnowledgeBase() {
  return (
    <div className="py-12 animate-fade-in">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-heading text-primary mb-4">
              База знаний
            </h1>
            <p className="text-xl text-muted-foreground">
              Полезная информация о создании и развитии бизнеса
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <Icon name="BookOpen" size={24} className="text-primary" />
                </div>
                <CardTitle className="font-heading">Гайды</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Пошаговые инструкции по созданию бизнес-плана
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <Icon name="Video" size={24} className="text-primary" />
                </div>
                <CardTitle className="font-heading">Видео</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Обучающие материалы от экспертов
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <Icon name="FileText" size={24} className="text-primary" />
                </div>
                <CardTitle className="font-heading">Статьи</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Экспертные материалы о бизнесе
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="font-heading text-2xl">Часто задаваемые вопросы</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left">
                    Как создать бизнес-план?
                  </AccordionTrigger>
                  <AccordionContent>
                    Зарегистрируйтесь на платформе, выберите шаблон из готовых примеров или создайте план с нуля. 
                    Заполните все необходимые разделы: описание бизнеса, анализ рынка, маркетинговую стратегию и финансовый план.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left">
                    Сколько стоит использование сервиса?
                  </AccordionTrigger>
                  <AccordionContent>
                    Базовый функционал абсолютно бесплатный. Вы можете создавать неограниченное количество бизнес-планов 
                    и использовать все готовые шаблоны без оплаты.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left">
                    Какие разделы должны быть в бизнес-плане?
                  </AccordionTrigger>
                  <AccordionContent>
                    Стандартный бизнес-план включает: резюме проекта, описание продукта/услуги, анализ рынка и конкурентов, 
                    маркетинговую стратегию, производственный план, организационную структуру, финансовый план с расчётами 
                    инвестиций и окупаемости, анализ рисков.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left">
                    Можно ли экспортировать бизнес-план?
                  </AccordionTrigger>
                  <AccordionContent>
                    Да, готовый бизнес-план можно экспортировать в форматах PDF и Word для печати или отправки инвесторам. 
                    Функция экспорта доступна в личном кабинете.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-left">
                    Как рассчитать финансовую модель?
                  </AccordionTrigger>
                  <AccordionContent>
                    Платформа предоставляет готовые калькуляторы для расчёта инвестиций, операционных расходов, выручки и прибыли. 
                    Вам нужно только указать исходные данные, а система автоматически построит финансовую модель с прогнозами 
                    на 3-5 лет.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6">
                  <AccordionTrigger className="text-left">
                    Безопасны ли мои данные?
                  </AccordionTrigger>
                  <AccordionContent>
                    Все данные хранятся в зашифрованном виде и доступны только вам. Мы не передаём информацию третьим лицам 
                    и соблюдаем законодательство о защите персональных данных.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
