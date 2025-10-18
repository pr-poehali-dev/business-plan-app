import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';

export default function HeaderMUI() {
  const location = useLocation();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <AppBar position="sticky" sx={{ bgcolor: 'white', color: 'primary.main', boxShadow: 1 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h5"
            component={Link}
            to="/"
            sx={{
              mr: 4,
              fontWeight: 700,
              color: 'primary.main',
              textDecoration: 'none',
              fontFamily: 'Montserrat, sans-serif'
            }}
          >
            БизнесПлан.рф
          </Typography>
          
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 4 }}>
            <Button
              component={Link}
              to="/"
              sx={{
                color: isActive('/') ? 'primary.main' : 'text.secondary',
                fontWeight: isActive('/') ? 600 : 400
              }}
            >
              О нас
            </Button>
            <Button
              component={Link}
              to="/business-plans"
              sx={{
                color: isActive('/business-plans') ? 'primary.main' : 'text.secondary',
                fontWeight: isActive('/business-plans') ? 600 : 400
              }}
            >
              Бизнес-план
            </Button>
            <Button
              component={Link}
              to="/knowledge-base"
              sx={{
                color: isActive('/knowledge-base') ? 'primary.main' : 'text.secondary',
                fontWeight: isActive('/knowledge-base') ? 600 : 400
              }}
            >
              База знаний
            </Button>
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            {isAuthenticated ? (
              <Button
                component={Link}
                to="/dashboard"
                variant="contained"
              >
                Личный кабинет
              </Button>
            ) : (
              <>
                <Button
                  component={Link}
                  to="/login"
                  sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
                >
                  Войти
                </Button>
                <Button
                  component={Link}
                  to="/register"
                  variant="contained"
                >
                  Зарегистрироваться
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
