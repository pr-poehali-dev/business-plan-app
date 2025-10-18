import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { store } from './store';
import { useAppDispatch } from './store/hooks';
import { setUser } from './store/slices/authSlice';
import HeaderMUI from './components/HeaderMUI';
import FooterMUI from './components/FooterMUI';
import Home from './pages/Home';
import BusinessPlans from './pages/BusinessPlans';
import KnowledgeBase from './pages/KnowledgeBase';
import LoginMUI from './pages/LoginMUI';
import RegisterMUI from './pages/RegisterMUI';
import DashboardMUI from './pages/DashboardMUI';
import NotFound from './pages/NotFound';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0EA5E9',
    },
    secondary: {
      main: '#33C3F0',
    },
  },
  typography: {
    fontFamily: 'Open Sans, sans-serif',
    h1: { fontFamily: 'Montserrat, sans-serif' },
    h2: { fontFamily: 'Montserrat, sans-serif' },
    h3: { fontFamily: 'Montserrat, sans-serif' },
    h4: { fontFamily: 'Montserrat, sans-serif' },
    h5: { fontFamily: 'Montserrat, sans-serif' },
    h6: { fontFamily: 'Montserrat, sans-serif' },
  },
});

function AppContent() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      dispatch(setUser(JSON.parse(userData)));
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <HeaderMUI />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/business-plans" element={<BusinessPlans />} />
            <Route path="/knowledge-base" element={<KnowledgeBase />} />
            <Route path="/login" element={<LoginMUI />} />
            <Route path="/register" element={<RegisterMUI />} />
            <Route path="/dashboard" element={<DashboardMUI />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <FooterMUI />
      </div>
    </BrowserRouter>
  );
}

const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppContent />
    </ThemeProvider>
  </Provider>
);

export default App;
