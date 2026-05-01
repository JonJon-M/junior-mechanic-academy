import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useProgress } from './hooks/useProgress';
import Navbar from './components/ui/Navbar';
import HomePage from './pages/HomePage';
import ModulesPage from './pages/ModulesPage';
import ModulePage from './pages/ModulePage';
import ActivitiesPage from './pages/ActivitiesPage';
import RewardsPage from './pages/RewardsPage';

export default function App() {
  const {
    profile,
    updateName,
    updateAvatar,
    completeLesson,
    completeModule,
    submitQuiz,
    completeWorkshop,
    completeDiagnosis,
    addToLeaderboard,
  } = useProgress();

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-garage-darker">
        <Navbar profile={profile} />
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                profile={profile}
                onUpdateName={updateName}
                onUpdateAvatar={updateAvatar}
              />
            }
          />
          <Route path="/modules" element={<ModulesPage profile={profile} />} />
          <Route
            path="/module/:moduleId"
            element={
              <ModulePage
                profile={profile}
                onCompleteLesson={completeLesson}
                onCompleteModule={completeModule}
                onSubmitQuiz={submitQuiz}
              />
            }
          />
          <Route
            path="/activities"
            element={
              <ActivitiesPage
                profile={profile}
                onCompleteWorkshop={completeWorkshop}
                onCompleteDiagnosis={completeDiagnosis}
                onSubmitQuiz={submitQuiz}
              />
            }
          />
          <Route
            path="/rewards"
            element={
              <RewardsPage
                profile={profile}
                onAddToLeaderboard={addToLeaderboard}
              />
            }
          />
          <Route
            path="/leaderboard"
            element={
              <RewardsPage
                profile={profile}
                onAddToLeaderboard={addToLeaderboard}
              />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
