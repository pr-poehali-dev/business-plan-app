import { Box, Container, Typography, Grid, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';

export default function FooterMUI() {
  return (
    <Box sx={{ bgcolor: 'grey.50', borderTop: 1, borderColor: 'divider', py: 6, mt: 'auto' }}>
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" fontWeight={700} mb={1} fontFamily="Montserrat, sans-serif">
              БизнесПлан.рф
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Бесплатный сервис по созданию бизнес-планов
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" fontWeight={600} mb={2}>
              Навигация
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <MuiLink component={Link} to="/" color="text.secondary" underline="hover">
                О нас
              </MuiLink>
              <MuiLink component={Link} to="/business-plans" color="text.secondary" underline="hover">
                Бизнес-план
              </MuiLink>
              <MuiLink component={Link} to="/knowledge-base" color="text.secondary" underline="hover">
                База знаний
              </MuiLink>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" fontWeight={600} mb={2}>
              Личный кабинет
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <MuiLink component={Link} to="/login" color="text.secondary" underline="hover">
                Войти
              </MuiLink>
              <MuiLink component={Link} to="/register" color="text.secondary" underline="hover">
                Зарегистрироваться
              </MuiLink>
            </Box>
          </Grid>
        </Grid>
        
        <Box sx={{ mt: 6, pt: 3, borderTop: 1, borderColor: 'divider', textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            © 2024 БизнесПлан.рф. Все права защищены.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
