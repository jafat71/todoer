// src/routes/index.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import KanbanBoard from '@/pages/KanbanBoard';
const AppRouter = () => {
  return (
    <Router >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kanban" element={<KanbanBoard />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
