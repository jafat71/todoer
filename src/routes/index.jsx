/* eslint-disable react/prop-types */
import { createBrowserRouter, RouterProvider, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import KanbanBoard from '@/pages/KanbanBoard';
import NewKanbanBoard from '@/pages/NewKanbanBoard';
import OnBoard from '../pages/OnBoard';
import UserHome from '@/pages/UserHome';
import Auth from '@/pages/Auth';
import { useUserContext } from '@/contexts/UserContext/UserContext';
import Footer from '@/components/custom/Footer/Footer';
import Navbar from '@/components/custom/Header/Navbar';
import SettingsPage from '@/pages/SettingsPage';
import LoadingScreen from '@/components/ui/loading-screen';

const RootLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = () => {
      navigate('/auth');
    };

    window.addEventListener('user-logged-out', handleLogout);
    return () => {
      window.removeEventListener('user-logged-out', handleLogout);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

const AuthGuard = ({ children }) => {
  const { isLogged, isLoading } = useUserContext();
  const location = useLocation();
  
  if (isLoading) {
    return <LoadingScreen />;
  }
  
  if (!isLogged) {
    // Guardamos la ubicación actual para redirigir después del login
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }
  
  return children;
};

const PublicRouteGuard = ({ children }) => {
  const { isLogged, isLoading } = useUserContext();
  const location = useLocation();
  
  if (isLoading) {
    return <LoadingScreen />;
  }
  
  if (isLogged) {
    // Redirigimos al home o a la página anterior si existe
    const from = location.state?.from?.pathname || '/home';
    return <Navigate to={from} replace />;
  }
  
  return children;
};

// Router configuration
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <PublicRouteGuard>
            <OnBoard />
          </PublicRouteGuard>
        ),
      },
      {
        path: 'auth',
        element: (
          <PublicRouteGuard>
            <Auth />
          </PublicRouteGuard>
        ),
      },
      {
        path: 'home',
        element: (
          <AuthGuard>
            <UserHome />
          </AuthGuard>
        ),
      },
      {
        path: 'newboard',
        element: (
          <AuthGuard>
            <NewKanbanBoard />
          </AuthGuard>
        ),
      },
      {
        path: 'kanban/:id',
        element: (
          <AuthGuard>
            <KanbanBoard />
          </AuthGuard>
        ),
      },
      {
        path: 'settings',
        element: (
          <AuthGuard>
            <SettingsPage />
          </AuthGuard>
        ),
      },
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
