import { MessageCircle } from "lucide-react";

const StreamChatToggle = ({ onClick, unreadCount = 0 }) => {
  return (
    <button
      onClick={onClick}
      className="stream-chat-toggle-btn"
      aria-label="Toggle chat"
    >
      <MessageCircle className="size-6" />
      {unreadCount > 0 && (
        <span className="stream-chat-badge">{unreadCount}</span>
      )}
    </button>
  );
};

export default StreamChatToggle;
