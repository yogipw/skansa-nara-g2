import { Navigate, Route, Routes } from 'react-router-dom';
import LandingPage from '../features/game/pages/LandingPage.jsx';
import PlayPage from '../features/game/pages/PlayPage.jsx';
import ResultPage from '../features/game/pages/ResultPage.jsx';
import AdminLoginPage from '../features/admin/pages/AdminLoginPage.jsx';
import AdminDashboardPage from '../features/admin/pages/AdminDashboardPage.jsx';
import ChapterManagerPage from '../features/admin/pages/ChapterManagerPage.jsx';
import QuestionManagerPage from '../features/admin/pages/QuestionManagerPage.jsx';
import ResultListPage from '../features/admin/pages/ResultListPage.jsx';
import ResultDetailPage from '../features/admin/pages/ResultDetailPage.jsx';
import MiniGameManagerPage from '../features/admin/pages/MiniGameManagerPage.jsx';
import ProtectedRoute from '../features/auth/components/ProtectedRoute.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/play" element={<PlayPage />} />
      <Route path="/result/:sessionId" element={<ResultPage />} />
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="/admin/chapters" element={<ChapterManagerPage />} />
        <Route path="/admin/questions" element={<QuestionManagerPage />} />
        <Route path="/admin/results" element={<ResultListPage />} />
        <Route path="/admin/results/:sessionId" element={<ResultDetailPage />} />
        <Route path="/admin/minigames" element={<MiniGameManagerPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
