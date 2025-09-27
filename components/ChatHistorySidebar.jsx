import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHistory, reset } from '../features/interview/interviewSlice';

function ChatHistorySidebar() {
  const dispatch = useDispatch();
  const { conversation } = useSelector((state) => state.interview);

  useEffect(() => {
    // Fetch the history when the component loads
    dispatch(getHistory());
  }, [dispatch]);

  const onNewChat = () => {
    // Dispatch the reset action to start a fresh conversation
    dispatch(reset());
  };

  // This is a placeholder for loading a specific chat later
  const onLoadChat = () => {
    alert('Loading specific chats will be a future feature!');
  };

  // A simple way to get a title for a conversation
  const getTitle = (chat) => {
    if (chat && chat.length > 1) {
      // Return the user's first message as the title
      return chat[1].text.substring(0, 30) + '...';
    }
    return 'New Chat';
  };

  return (
    <aside className="chat-history-sidebar">
      <h3>Chat History</h3>
      <div className="history-list">
        {/* We will replace this with a list of separate chats later */}
        {/* For now, it shows the current chat */}
        <div className="history-item" onClick={onLoadChat}>
          <p>{getTitle(conversation)}</p>
        </div>
      </div>
      <button className="btn btn-block" onClick={onNewChat}>
        Start New Chat
      </button>
    </aside>
  );
}

export default ChatHistorySidebar;
