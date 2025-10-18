import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function Header() {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold font-heading text-primary">БизнесПлан.рф</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              О нас
            </Link>
            <Link 
              to="/business-plans" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/business-plans') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Бизнес-план
            </Link>
            <Link 
              to="/knowledge-base" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/knowledge-base') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              База знаний
            </Link>
          </nav>

          <div className="flex items-center space-x-3">
            <Link to="/login">
              <Button variant="ghost" className="hidden sm:inline-flex">
                Войти
              </Button>
            </Link>
            <Link to="/register">
              <Button>
                Зарегистрироваться
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
