import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-heading font-bold text-lg mb-3">БизнесПлан.рф</h3>
            <p className="text-sm text-muted-foreground">
              Бесплатный сервис по созданию бизнес-планов
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3">Навигация</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-primary transition-colors">О нас</Link></li>
              <li><Link to="/business-plans" className="hover:text-primary transition-colors">Бизнес-план</Link></li>
              <li><Link to="/knowledge-base" className="hover:text-primary transition-colors">База знаний</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3">Личный кабинет</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/login" className="hover:text-primary transition-colors">Войти</Link></li>
              <li><Link to="/register" className="hover:text-primary transition-colors">Зарегистрироваться</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© 2024 БизнесПлан.рф. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}
