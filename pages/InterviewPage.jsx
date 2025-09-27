// FILE PATH: frontend/src/pages/InterviewPage.jsx
// This is the final code for your main AI Chat Page.

import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { askQuestion, addUserMessage, getHistory, reset } from '../features/interview/interviewSlice';
import ChatHistorySidebar from '../components/ChatHistorySidebar';

function InterviewPage() {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { conversation, isLoading, isError, message: errorMessage } = useSelector(
    (state) => state.interview
  );

  const chatWindowRef = useRef(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
        // When the page loads, get the user's chat history
        dispatch(getHistory());
    }
    
    if (isError) {
        console.log(errorMessage);
    }

    // This return function will run when the component is unmounted (e.g., when logging out)
    return () => {
        dispatch(reset());
    }
  }, [user, navigate, isError, errorMessage, dispatch]);

  // This second useEffect handles scrolling after the conversation updates
  useEffect(() => {
    if (chatWindowRef.current) {
        chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [conversation]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const formattedHistory = conversation.map(msg => ({
      role: msg.role === 'ai' ? 'model' : 'user',
      parts: [{ text: msg.text }]
    }));
    
    dispatch(addUserMessage(message));
    dispatch(askQuestion({ 
      question: message,
      history: formattedHistory
    }));
    
    setMessage('');
  };

  return (
    <div className="page-with-sidebar"> 
      <ChatHistorySidebar />
      
      <div className="interview-container">
        <div className="chat-window" ref={chatWindowRef}>
          {conversation.map((entry, index) => (
            <div key={index} className={`chat-bubble ${entry.role}`}>
              <p>{entry.text}</p>
            </div>
          ))}
          {isLoading && (
              <div className="chat-bubble ai">
                  <p><i>AI is thinking...</i></p>
              </div>
          )}
        </div>
        <div className="chat-input-area">
          <form onSubmit={onSubmit}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask a question or type your answer..."
              required
              disabled={isLoading}
            />
            <button type="submit" className="btn" disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Send'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default InterviewPage;
