/* eslint-disable react/prop-types */
// src/routes/index.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import KanbanBoard from '@/pages/KanbanBoard';
import NewKanbanBoard from '@/pages/NewKanbanBoard';
import OnBoard from '../pages/OnBoard';
import UserHome from '@/pages/UserHome';
import Auth from '@/pages/Auth';
import { useUserContext } from '@/contexts/UserContext/UserContext';

const ProtectedRoute = ({ children }) => {
    const { isLogged } = useUserContext();
    
    if (!isLogged) {
        return <Navigate to="/" replace />;
    }

    return children;
};

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<OnBoard />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/home" element={
                    <ProtectedRoute>
                        <UserHome />
                    </ProtectedRoute>
                } />
                <Route path="/newboard" element={
                    <ProtectedRoute>
                        <NewKanbanBoard />
                    </ProtectedRoute>
                } />
                <Route path="/kanban/:id" element={
                    <ProtectedRoute>
                        <KanbanBoard />
                    </ProtectedRoute>
                } />
            </Routes>
        </Router>
    );
}

export default AppRouter;
