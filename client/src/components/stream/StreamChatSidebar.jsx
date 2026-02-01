import { X } from "lucide-react";

const StreamChatSidebar = ({ children, onClose }) => {
  return (
    <div className="stream-chat-sidebar">
      <div className="stream-chat-sidebar-header">
        <h3 className="stream-chat-sidebar-title">Live Chat</h3>
        <button
          onClick={onClose}
          className="stream-chat-close-btn"
          aria-label="Close chat"
        >
          <X className="size-5" />
        </button>
      </div>
      <div className="stream-chat-sidebar-content">{children}</div>
    </div>
  );
};

export default StreamChatSidebar;
