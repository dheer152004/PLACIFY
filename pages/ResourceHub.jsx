import React from "react";
import "./ResourceHub.css";

const exercises = [
  { title: "Meditation Exercise", link: "https://www.headspace.com/meditation", type: "exercise" },
  { title: "Breathing Exercise", link: "https://www.healthline.com/health/breathing-exercise", type: "exercise" },
  { title: "Yoga for Stress", link: "https://www.yogajournal.com/practice/yoga-for-stress/", type: "exercise" },
];

const blogs = [
  { title: "Managing Stress During Exams", link: "https://www.psychologytoday.com/us/basics/stress", type: "blog" },
  { title: "Interview Anxiety Tips", link: "https://www.themuse.com/advice/interview-anxiety", type: "blog" },
  { title: "Mindfulness Techniques", link: "https://www.mindful.org/mindfulness-how-to-do-it/", type: "blog" },
];

const quotes = [
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "Your limitation—it’s only your imagination.", author: "Anonymous" },
  { text: "Push yourself, because no one else is going to do it for you.", author: "Anonymous" },
  { text: "Difficulties in life don’t come to destroy you, but to help you realize your hidden potential.", author: "Anonymous" },
];

export default function ResourceHub() {
  return (
    <div className="resource-wrapper">
      <h1 className="resource-title">📚 Release Stress and Reconnect</h1>
      <p className="resource-subtitle">
        Find exercises and articles to reduce stress and boost focus during exams and interviews.
      </p>

      <div className="resource-section">
        <h2>🧘 Exercises</h2>
        <div className="resource-grid">
          {exercises.map((item, index) => (
            <a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="resource-card exercise-card"
            >
              <h3>{item.title}</h3>
              <p>Click to access the exercise</p>
            </a>
          ))}
        </div>
      </div>

      <div className="resource-section">
        <h2>📝 Blogs & Articles</h2>
        <div className="resource-grid">
          {blogs.map((item, index) => (
            <a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="resource-card blog-card"
            >
              <h3>{item.title}</h3>
              <p>Click to read the blog</p>
            </a>
          ))}
        </div>
      </div>

      {/* 🌟 Emotional Support & Motivation Section */}
      <div className="resource-section">
        <h2>💡 Emotional Support & Motivation</h2>
        <div className="quotes-grid">
          {quotes.map((q, idx) => (
            <div key={idx} className="quote-card">
              <p className="quote-text">“{q.text}”</p>
              <p className="quote-author">— {q.author}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
