import React, { useState, useRef, useEffect } from 'react';
import Button from './Button';
import Icon from '../AppIcon';
import { generateResponse } from '../../lib/gemini';

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Hi! I\'m your WorkflowGene assistant. I can help you learn about our automation platform, pricing, features, and more. What would you like to know?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async (e) => {
    e?.preventDefault();
    if (!inputMessage?.trim() || isTyping) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage?.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const response = await generateResponse(userMessage?.content);
      
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: response?.success ? response?.message : response?.error,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: 'Sorry, I encountered an error. Please try again or contact our support team at support@workflowgene.cloud',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const quickQuestions = [
    'What is WorkflowGene Cloud?',
    'How much does it cost?',
    'What integrations are available?',
    'How do I get started?',
    'Is it secure and compliant?'
  ];

  const handleQuickQuestion = (question) => {
    setInputMessage(question);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const formatTime = (timestamp) => {
    return timestamp?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 bg-primary text-white rounded-full shadow-organic-lg hover:shadow-organic-xl transition-all duration-genetic-normal flex items-center justify-center group"
          aria-label="Open AI Assistant"
        >
          {isOpen ? (
            <Icon name="X" size={24} />
          ) : (
            <Icon name="MessageCircle" size={24} className="group-hover:scale-110 transition-transform duration-genetic-normal" />
          )}
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] h-[500px] bg-card border border-border rounded-genetic-lg shadow-organic-xl z-50 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-primary text-white rounded-t-genetic-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Icon name="Bot" size={16} />
              </div>
              <div>
                <h3 className="font-semibold">WorkflowGene Assistant</h3>
                <p className="text-xs text-white/80">Powered by AI</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 hover:bg-white/20 rounded-genetic-md flex items-center justify-center transition-colors duration-genetic-normal"
            >
              <Icon name="X" size={16} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages?.map((message) => (
              <div
                key={message?.id}
                className={`flex ${message?.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-genetic-lg ${
                    message?.type === 'user'
                      ? 'bg-primary text-white'
                      : 'bg-surface text-text-primary border border-border'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {message?.content}
                  </p>
                  <p className={`text-xs mt-2 ${
                    message?.type === 'user' ? 'text-white/70' : 'text-text-secondary'
                  }`}>
                    {formatTime(message?.timestamp)}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-surface border border-border p-3 rounded-genetic-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages?.length === 1 && (
            <div className="p-4 border-t border-border">
              <p className="text-xs text-text-secondary mb-3">Quick questions:</p>
              <div className="flex flex-wrap gap-2">
                {quickQuestions?.slice(0, 3)?.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(question)}
                    className="text-xs bg-surface hover:bg-muted text-text-secondary hover:text-text-primary px-3 py-1 rounded-full transition-colors duration-genetic-normal"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-border">
            <form onSubmit={handleSendMessage} className="flex space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e?.target?.value)}
                placeholder="Ask me anything about WorkflowGene..."
                className="flex-1 px-3 py-2 border border-border rounded-genetic-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                disabled={isTyping}
              />
              <Button
                type="submit"
                variant="default"
                size="sm"
                disabled={!inputMessage?.trim() || isTyping}
                iconName="Send"
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatbot;