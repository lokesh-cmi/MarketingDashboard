'use client';

import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Loader2, Bot, User, TrendingUp, Search, BarChart3, Globe } from 'lucide-react';
import { useDateRange } from '@/contexts/DateRangeContext';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  chartData?: any;
  chartType?: 'line' | 'bar' | 'area';
  timestamp: Date;
}

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

const suggestedQuestions = [
  { icon: TrendingUp, text: "What are my top keywords in SEMrush?" },
  { icon: Search, text: "Show me Google Analytics traffic for last month" },
  { icon: BarChart3, text: "How are my LinkedIn ads performing?" },
  { icon: Globe, text: "What's my Google Search Console CTR?" },
];

export default function AIAssistant({ isOpen, onClose }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { dateRange } = useDateRange();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Welcome message
      setMessages([{
        id: '1',
        role: 'assistant',
        content: "👋 Hi! I'm your Marketing Analytics Assistant. I can help you analyze your data across all platforms. What would you like to know?",
        timestamp: new Date(),
      }]);
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          dateRange,
          conversationHistory: messages.slice(-5), // Last 5 messages for context
        }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message,
        chartData: data.chartData,
        chartType: data.chartType,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm sorry, I encountered an error processing your request. Please try again.",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
  };

  const renderChart = (message: Message) => {
    if (!message.chartData) return null;

    return (
      <div className="mt-3 bg-gray-50 rounded-lg p-4">
        <ResponsiveContainer width="100%" height={250}>
          {message.chartType === 'bar' ? (
            <BarChart data={message.chartData}>
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#9333ea" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#ec4899" stopOpacity={0.8}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="url(#colorGradient)" />
            </BarChart>
          ) : (
            <LineChart data={message.chartData}>
              <defs>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="5%" stopColor="#9333ea" stopOpacity={1}/>
                  <stop offset="95%" stopColor="#ec4899" stopOpacity={1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="url(#lineGradient)" strokeWidth={3} />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-4xl h-[85vh] mx-4 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
              <Bot size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold">AI Marketing Assistant</h2>
              <p className="text-sm text-purple-100">Analyzing data for: {dateRange}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <Bot size={18} className="text-white" />
                </div>
              )}
              <div
                className={`max-w-[70%] rounded-2xl p-4 ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 text-white'
                    : 'bg-white border border-gray-200 text-gray-900'
                }`}
              >
                <div className="whitespace-pre-wrap">{message.content}</div>
                {renderChart(message)}
                <div className={`text-xs mt-2 ${message.role === 'user' ? 'text-purple-100' : 'text-gray-500'}`}>
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
              {message.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                  <User size={18} className="text-gray-600" />
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                <Bot size={18} className="text-white" />
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl p-4">
                <Loader2 className="animate-spin text-purple-600" size={20} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Questions */}
        {messages.length === 1 && (
          <div className="px-6 py-3 bg-white border-t border-gray-200">
            <p className="text-xs text-gray-500 mb-2">Suggested questions:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((question, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSuggestedQuestion(question.text)}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-700 transition-colors"
                >
                  <question.icon size={14} />
                  {question.text}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-6 bg-white border-t border-gray-200">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything about your marketing data..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 hover:from-purple-700 hover:via-pink-600 hover:to-purple-700 text-white rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
