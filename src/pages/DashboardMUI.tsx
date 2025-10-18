import { useEffect, useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Container, Typography, Button, Card, CardContent, CardActions, Grid, Box,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, Alert, List, ListItem,
  ListItemText, IconButton, Paper
} from '@mui/material';
import { Add as AddIcon, Logout as LogoutIcon, ChevronRight as ChevronRightIcon } from '@mui/icons-material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout } from '@/store/slices/authSlice';
import { fetchBusinessPlans, createBusinessPlan } from '@/store/slices/businessPlansSlice';

const validationSchema = Yup.object({
  title: Yup.string().required('Название обязательно'),
  category: Yup.string(),
  description: Yup.string(),
  investment: Yup.string(),
  payback: Yup.string()
});

export default function DashboardMUI() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { plans, isLoading } = useAppSelector((state) => state.businessPlans);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }
    const parsedUser = JSON.parse(userData);
    if (parsedUser.id) {
      dispatch(fetchBusinessPlans(parsedUser.id));
    }
  }, [dispatch, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const handleCreatePlan = async (values: any, { resetForm }: any) => {
    if (!user?.id) return;
    
    try {
      await dispatch(createBusinessPlan({ userId: user.id, plan: values })).unwrap();
      setIsDialogOpen(false);
      resetForm();
      setCreateError(null);
    } catch (error) {
      setCreateError(error instanceof Error ? error.message : 'Ошибка создания плана');
    }
  };

  if (!user) return null;

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h3" fontFamily="Montserrat, sans-serif" fontWeight={700} color="primary">
            Добро пожаловать, {user.name}!
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {user.email}
          </Typography>
        </Box>
        <Button
          variant="outlined"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
        >
          Выйти
        </Button>
      </Box>

      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', cursor: 'pointer', '&:hover': { boxShadow: 6 } }} onClick={() => setIsDialogOpen(true)}>
            <CardContent>
              <Box sx={{ width: 48, height: 48, borderRadius: '50%', bgcolor: 'primary.light', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                <AddIcon color="primary" />
              </Box>
              <Typography variant="h5" fontFamily="Montserrat, sans-serif" fontWeight={700} mb={1}>
                Создать бизнес-план
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Начните работу над новым проектом с нуля или используйте готовый шаблон
              </Typography>
            </CardContent>
            <CardActions>
              <Button fullWidth variant="contained">
                Создать новый план
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h5" fontFamily="Montserrat, sans-serif" fontWeight={700} mb={1}>
                Мои проекты
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {isLoading ? 'Загрузка...' : `У вас ${plans.length} ${plans.length === 1 ? 'бизнес-план' : 'бизнес-планов'}`}
              </Typography>
            </CardContent>
            <CardActions>
              <Button fullWidth variant="outlined" component={RouterLink} to="/business-plans">
                Посмотреть шаблоны
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      {plans.length > 0 && (
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h5" fontFamily="Montserrat, sans-serif" fontWeight={700} mb={2}>
            Ваши бизнес-планы
          </Typography>
          <List>
            {plans.map((plan) => (
              <ListItem
                key={plan.id}
                sx={{
                  border: 1,
                  borderColor: 'divider',
                  borderRadius: 1,
                  mb: 1,
                  '&:hover': { bgcolor: 'action.hover' }
                }}
                secondaryAction={
                  <IconButton edge="end">
                    <ChevronRightIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={plan.title}
                  secondary={
                    <>
                      {plan.category && <span>{plan.category}</span>}
                      {plan.investment && <span> • {plan.investment}</span>}
                      {plan.payback && <span> • {plan.payback}</span>}
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}

      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Typography variant="h5" fontFamily="Montserrat, sans-serif" fontWeight={700}>
            Создать новый бизнес-план
          </Typography>
        </DialogTitle>
        <Formik
          initialValues={{ title: '', category: '', description: '', investment: '', payback: '' }}
          validationSchema={validationSchema}
          onSubmit={handleCreatePlan}
        >
          {({ errors, touched, values, handleChange, handleBlur, isSubmitting }) => (
            <Form>
              <DialogContent>
                {createError && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {createError}
                  </Alert>
                )}
                
                <Field
                  as={TextField}
                  fullWidth
                  name="title"
                  label="Название бизнес-плана *"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.title && Boolean(errors.title)}
                  helperText={touched.title && errors.title}
                  margin="normal"
                />

                <Field
                  as={TextField}
                  fullWidth
                  name="category"
                  label="Категория"
                  value={values.category}
                  onChange={handleChange}
                  margin="normal"
                />

                <Field
                  as={TextField}
                  fullWidth
                  name="description"
                  label="Описание"
                  multiline
                  rows={3}
                  value={values.description}
                  onChange={handleChange}
                  margin="normal"
                />

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Field
                      as={TextField}
                      fullWidth
                      name="investment"
                      label="Инвестиции"
                      value={values.investment}
                      onChange={handleChange}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      as={TextField}
                      fullWidth
                      name="payback"
                      label="Окупаемость"
                      value={values.payback}
                      onChange={handleChange}
                      margin="normal"
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions sx={{ p: 3 }}>
                <Button onClick={() => setIsDialogOpen(false)}>
                  Отмена
                </Button>
                <Button type="submit" variant="contained" disabled={isSubmitting}>
                  {isSubmitting ? 'Создание...' : 'Создать'}
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </Container>
  );
}
