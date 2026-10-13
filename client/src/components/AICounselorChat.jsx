import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  RefreshCw 
} from 'lucide-react';

const SUGGESTED_PROMPTS = [
  "How should I prepare for technical placement interviews?",
  "What high-impact mini-project should I build for AI & Data Science?",
  "What is the average fresher package (LPA) for this role?",
  "What are the most valuable certifications for recruiters?",
  "How do I close my high-priority skill gaps quickly?"
];

export default function AICounselorChat({ 
  student, 
  messages, 
  onSendMessage, 
  isLoading 
}) {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim() && !isLoading) {
      onSendMessage(inputText.trim());
      setInputText('');
    }
  };

  const handlePromptClick = (prompt) => {
    if (!isLoading) {
      onSendMessage(prompt);
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl shadow-xl flex flex-col h-[650px] overflow-hidden">
      {/* Chat Header */}
      <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-950/80 border border-indigo-800/80 flex items-center justify-center text-indigo-400 shadow-inner">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-bold text-sm text-white">24/7 AI Career Mentor & Counselor</h3>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>
            <p className="text-xs text-slate-400">Context-grounded guidance for {student?.department || 'Student'}</p>
          </div>
        </div>

        <div className="hidden sm:flex items-center space-x-1 text-xs text-indigo-400 bg-indigo-950/80 border border-indigo-800/80 px-2.5 py-1 rounded-lg font-medium">
          <Sparkles className="w-3.5 h-3.5 mr-1 text-indigo-400" />
          <span>Continuous Mentorship</span>
        </div>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950/70">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
            <Bot className="w-12 h-12 text-indigo-400 mb-3 opacity-60" />
            <p className="text-sm font-bold text-white">Welcome to your AI Career Guidance Session!</p>
            <p className="text-xs text-slate-400 max-w-sm mt-1">
              Ask any question about your curriculum, technical skill gaps, interview roadmaps, or placement packages.
            </p>
          </div>
        ) : (
          messages.map((msg, index) => {
            const isBot = msg.sender === 'assistant';

            return (
              <div
                key={msg.id || index}
                className={`flex items-start space-x-2.5 ${isBot ? 'justify-start' : 'justify-end'}`}
              >
                {isBot && (
                  <div className="w-7 h-7 rounded-lg bg-indigo-950/80 text-indigo-400 border border-indigo-800/80 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                    isBot
                      ? 'bg-slate-800/90 text-slate-200 border border-slate-700/80 rounded-tl-none shadow-md'
                      : 'bg-indigo-600 text-white rounded-tr-none shadow-md'
                  }`}
                >
                  <div className="whitespace-pre-line">
                    {msg.message}
                  </div>
                  <div className={`text-[10px] mt-1.5 opacity-60 ${isBot ? 'text-slate-400' : 'text-indigo-200'} text-right`}>
                    {new Date(msg.timestamp || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>

                {!isBot && (
                  <div className="w-7 h-7 rounded-lg bg-slate-700 text-slate-200 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })
        )}

        {isLoading && (
          <div className="flex items-start space-x-2.5">
            <div className="w-7 h-7 rounded-lg bg-indigo-950/80 text-indigo-400 border border-indigo-800/80 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-slate-800/90 border border-slate-700 rounded-2xl rounded-tl-none px-4 py-3 text-xs text-slate-300 flex items-center space-x-2 shadow-md">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-indigo-400" />
              <span>Analyzing profile and generating personalized advice...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Question Chips */}
      <div className="px-4 py-2.5 bg-slate-900 border-t border-slate-800 flex items-center space-x-2 overflow-x-auto scrollbar-none">
        <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold shrink-0">Prompts:</span>
        {SUGGESTED_PROMPTS.map((prompt, pIdx) => (
          <button
            key={pIdx}
            type="button"
            onClick={() => handlePromptClick(prompt)}
            className="text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 hover:border-slate-600 px-3 py-1 rounded-full whitespace-nowrap transition-colors shrink-0 font-medium"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <form onSubmit={handleSubmit} className="p-3 bg-slate-900 border-t border-slate-800 flex items-center space-x-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask your AI Career Counselor anything (e.g. 'How do I prepare for technical rounds?')..."
          className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={!inputText.trim() || isLoading}
          className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white p-2.5 rounded-xl shadow-md transition-colors"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
