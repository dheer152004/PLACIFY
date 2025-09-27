import { Link } from 'react-router-dom';

function HomePage() {
  const reviews = [
    {
      name: "Riya Sharma",
      role: "Student",
      review: "Placify helped me practice interviews with real-time feedback. I felt more confident and prepared!",
    },
    {
      name: "Amit Verma",
      role: "Graduate",
      review: "The Study Room feature is amazing. Personalized tips and emotion analysis really made a difference.",
    },
    {
      name: "Sneha Kapoor",
      role: "Job Seeker",
      review: "AI Interviews section gave me insights I never got elsewhere. My performance improved a lot.",
    },
  ];

  return (
    <>
      <section className='hero'>
        <div className="hero-title">
          <h1>PLACIFY</h1>
          <span className="grad-cap">🎓</span>
        </div>
        <h2>The Power To Place You Ahead</h2>
        <p>
          Placify empowers you with interview preparation, real-time analytics, and personalized learning tools to help you ace your interviews and grow your career.
        </p>
        <Link to='/login' className='cta-button'>
          Get Started
        </Link>
      </section>


      <section className='features'>
        <h2>WHAT IS THERE IN PLACIFY?</h2>
        <div className='features-grid'>
          <div className='feature-card'>
            <div className='feature-icon'>🎯</div>
            <Link to="/EmotionSupport" className='text-green-700 hover:underline'>
              <h3>Emotion Support</h3>
            </Link>
            <p>
              Practice with real-time feedback and analysis to boost your confidence and skills for every interview scenario.
            </p>
          </div>
          <div className='feature-card'>
            <div className='feature-icon'>🤖</div>
            <Link to="/StudyRoom" className='text-green-700 hover:underline'>
              <h3>Study Room</h3>
            </Link>
            <p>
              Get personalized coaching with advanced emotion recognition and insight-driven tips tailored just for you.
            </p>
          </div>
          
          <a href="http://localhost:3000" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className='feature-card' style={{ cursor: 'pointer' }}>
              <div className='feature-icon'>📊</div>
              <h3>AI Interviews</h3>
              <p>
                Monitor your interview skills with detailed analytics and actionable advice to keep improving.
              </p>
            </div>
          </a>

        </div>
      </section>

      {/* Mock Reviews Section */}
      <section className='reviews'>
        <h2>What Our Users Say</h2>
        <div className='reviews-grid'>
          {reviews.map((rev, idx) => (
            <div key={idx} className='review-card'>
              <p className='review-text'>" {rev.review} "</p>
              <p className='reviewer-name'>— {rev.name}, {rev.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Us Section */}
      <section className='contact-us'>
        <h2 align='center'>Contact Us</h2>
        <div className='contact-cards'>
          <div className='contact-card'>
            <span className='contact-icon'>📧</span>
            <p>Email</p>
            <p className='contact-info'>support@placify.com</p>
          </div>
          <div className='contact-card'>
            <span className='contact-icon'>📞</span>
            <p>Phone</p>
            <p className='contact-info'>+91 98765 43210</p>
          </div>
          <div className='contact-card'>
            <span className='contact-icon'>🌐</span>
            <p>Website</p>
            <p className='contact-info'>www.placify.com</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
