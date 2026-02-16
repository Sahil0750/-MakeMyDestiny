import React, { useState, useRef, useEffect } from 'react';
import { sendMessage } from '../../services/chatbotService';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! I'm your travel assistant. How can I help you today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const quickReplies = [
    { id: 1, text: '📍 Show Destinations', query: 'show me available destinations' },
    { id: 2, text: '💰 Check Prices', query: 'what are the prices' },
    { id: 3, text: '📅 How to Book', query: 'how do I book a trip' },
    { id: 4, text: '❌ Cancellation Policy', query: 'what is the cancellation policy' },
    { id: 5, text: '🏔️ Jharkhand Places', query: 'tell me about Jharkhand destinations' },
    { id: 6, text: '🎫 Group Discounts', query: 'do you have group discounts' }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (messageText = input) => {
    if (!messageText.trim()) return;

    const userMessage = { text: messageText, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await sendMessage(messageText);
      const botMessage = { text: res.data.botResponse, sender: 'bot' };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = { text: 'Sorry, I encountered an error. Please try again.', sender: 'bot' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickReply = (query) => {
    handleSend(query);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <div className={`chatbot-container ${isOpen ? 'open' : ''}`}>
        <div className="chatbot-header">
          <h3>🤖 Travel Assistant</h3>
          <button onClick={() => setIsOpen(false)} className="close-btn" aria-label="Close chat">✕</button>
        </div>
        
        <div className="chatbot-messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={`message ${msg.sender}`}>
              <div className="message-bubble">{msg.text}</div>
            </div>
          ))}
          {loading && <div className="message bot"><div className="message-bubble typing">Typing<span className="dots">...</span></div></div>}
          <div ref={messagesEndRef} />
        </div>

        <div className="quick-replies">
          {quickReplies.map(reply => (
            <button
              key={reply.id}
              onClick={() => handleQuickReply(reply.query)}
              className="quick-reply-btn"
              disabled={loading}
            >
              {reply.text}
            </button>
          ))}
        </div>

        <div className="chatbot-input">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            disabled={loading}
          />
          <button onClick={() => handleSend()} disabled={loading || !input.trim()}>
            Send
          </button>
        </div>
      </div>

      {!isOpen && (
        <button className="chatbot-toggle" onClick={() => setIsOpen(true)} aria-label="Open chat">
          💬
        </button>
      )}
    </>
  );
};

export default Chatbot;
