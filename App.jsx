// FILE PATH: frontend/src/App.jsx
// This is the main application file with the new CSS Grid layout.

import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import InterviewPage from './pages/InterviewPage';
import StudyRoom from './pages/StudyRoom';
import EmotionSupport from './pages/EmotionSupport';
import VoiceNotes from './pages/VoiceNotes';
import MoodCheckIn from './pages/MoodCheckIn';
import ResourceHub from './pages/ResourceHub';

function App() {
  return (
    // This new 'app-layout' div uses CSS Grid to structure our page
    <div className='app-layout'>
      <div className='background-gradient'></div>
      <Header />
      
      {/* This 'main-content' area will hold all our page content */}
      <main className='main-content'>
        <div className='container'>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/interview' element={<InterviewPage />} />
            <Route path='/studyroom' element={<StudyRoom />} />
            <Route path='/emotionsupport' element={<EmotionSupport />} />
            <Route path='/voicenotes' element={<VoiceNotes />} />
            <Route path='/moodcheckin' element={<MoodCheckIn />} />
            <Route path='/resourcehub' element={<ResourceHub />} />

          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
