// FILE PATH: frontend/src/pages/EmotionSupport.jsx

import { Link } from 'react-router-dom';

function EmotionSupport() {
  return (
    <>
      <section className='hero'>
        <h1>Emotion Support</h1>
        <p>
          Interviews are important but not as important as you.
        </p>
        <Link to='/' className='cta-button'>
          Back to Home
        </Link>
      </section>

      <section className='features'>
        <h2>Why Choose Emotion Support?</h2>
        <div className='features-grid'>
          <div className='feature-card'>
            <div className='feature-icon'>💬</div>
            <Link to='/VoiceNotes' className='text-green-700 hover:underline'>
               <h3> Safe Space to Reflect</h3>
              </Link>
            <p>
              Share your thoughts and feelings without judgment. Your AI companion listens and supports you with empathy.
            </p>
          </div>
          <div className='feature-card'>
            <div className='feature-icon'>🌱</div>
            <Link to = "/MoodCheckIn " className='text-green-700 hover:underline'>
            <h3>This Is How You Feel</h3>
            </Link>
            <p>
              Build resilience and positivity with small steps toward mental well-being every day.
            </p>
          </div>
          <div className='feature-card'>
            <div className='feature-icon'>🌙</div>
            <Link to="/ResourceHub" className='text-green-700 hover:underline'>
            <h3>Relax A Little</h3>
            </Link>
            <p>
              Whether it’s day or night, you’ll always find support and encouragement whenever you need it.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default EmotionSupport;
