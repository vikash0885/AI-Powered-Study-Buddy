import { useState, useEffect, useRef } from 'react';
import './ChatWidget.css';
import { chatAPI } from '../services/api';
import ChatMessage from './ChatMessage';

function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hi there! I\'m your Study Buddy. How can I help you today?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMsg = { role: 'user', content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        try {
            // Using a generic conversation for the widget
            const response = await chatAPI.sendMessage(null, input);
            setMessages(prev => [...prev, { role: 'assistant', content: response.aiResponse }]);
        } catch (error) {
            console.error('Widget Chat Error:', error);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: 'Sorry, I encountered an error. Please make sure you are logged in.'
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`chat-widget ${isOpen ? 'open' : ''}`}>
            {isOpen && (
                <div className="chat-window">
                    <div className="chat-header">
                        <h3>Study Buddy Chat</h3>
                        <button className="close-btn" onClick={() => setIsOpen(false)}>×</button>
                    </div>
                    <div className="chat-messages">
                        {messages.map((msg, index) => (
                            <ChatMessage key={index} message={msg} />
                        ))}
                        {isLoading && (
                            <div className="typing-indicator">
                                <span></span><span></span><span></span>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                    <form className="chat-input" onSubmit={handleSend}>
                        <input
                            type="text"
                            placeholder="Ask me anything..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <button type="submit" disabled={isLoading}>Send</button>
                    </form>
                </div>
            )}
            <button className="widget-toggle" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? '↓' : '💬'}
            </button>
        </div>
    );
}

export default ChatWidget;
