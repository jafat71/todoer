// src/routes/index.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import KanbanBoard from '@/pages/KanbanBoard';
import NewKanbanBoard from '@/pages/NewKanbanBoard';
const AppRouter = () => {
  return (
    <Router >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kanban/:id" element={<KanbanBoard />} />
        <Route path="/create" element={<NewKanbanBoard />} />

      </Routes>
    </Router>
  );
}

export default AppRouter;
