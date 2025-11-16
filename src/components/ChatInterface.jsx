import React, { useState, useEffect, useRef } from 'react';
import './ChatInterface.css';

const ChatInterface = ({ onMessageSent, messages, isTyping }) => {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onMessageSent(inputValue);
      setInputValue('');
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="chat-interface" role="region" aria-label="Chat conversation">
      <div className="chat-header">
        <div className="chat-header-content">
          <div className="ai-avatar" aria-hidden="true">🤖</div>
          <div>
            <h2 className="chat-title">AI Study Buddy</h2>
            <p className="chat-subtitle">Your personalized learning companion</p>
          </div>
        </div>
      </div>

      <div className="messages-container" aria-live="polite" aria-atomic="false">
        {messages.length === 0 && (
          <div className="welcome-message">
            <div className="welcome-icon" aria-hidden="true">👋</div>
            <h3>Welcome to AI Study Buddy!</h3>
            <p>I'm here to help you learn and grow. Ask me anything about mathematics, science, history, or language!</p>
          </div>
        )}
        
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.sender}`}
            role="article"
            aria-label={`${message.sender === 'user' ? 'You' : 'AI Study Buddy'} said`}
          >
            <div className="message-avatar" aria-hidden="true">
              {message.sender === 'user' ? '👤' : '🤖'}
            </div>
            <div className="message-content">
              <div className="message-text">{message.text}</div>
              <div className="message-time" aria-label={`Sent at ${message.timestamp}`}>
                {message.timestamp}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="message ai typing-indicator" aria-live="polite" aria-label="AI is typing">
            <div className="message-avatar" aria-hidden="true">🤖</div>
            <div className="message-content">
              <div className="typing-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <form className="chat-input-container" onSubmit={handleSubmit}>
        <label htmlFor="chat-input" className="sr-only">
          Type your message
        </label>
        <textarea
          id="chat-input"
          ref={inputRef}
          className="chat-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask me anything about your studies..."
          aria-label="Message input"
          rows="1"
          disabled={isTyping}
        />
        <button
          type="submit"
          className="send-button"
          disabled={!inputValue.trim() || isTyping}
          aria-label="Send message"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </form>
    </div>
  );
};

export default ChatInterface;
