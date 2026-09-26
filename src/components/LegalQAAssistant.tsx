import React, { useState } from 'react';
import { ChatMessage } from '../types/legal';
import { askDocumentQuestionWithAI } from '../services/geminiLegalService';
import { MessageSquare, Send, Sparkles, AlertCircle, Bookmark, Bot, User } from 'lucide-react';

interface LegalQAAssistantProps {
  documentText: string;
  apiKey: string;
}

export const LegalQAAssistant: React.FC<LegalQAAssistantProps> = ({ documentText, apiKey }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'assistant',
      text: 'Hello! I am your JurisEase Legal Intelligence Assistant. Ask me anything about your loaded document — such as your obligations, termination clauses, hidden fees, or dispute procedures.',
      timestamp: 'Just now',
      suggestedQuestions: [
        'Can they fire me without notice or severance?',
        'Can I work on my own side project or open-source software?',
        'Does the landlord have the right to enter without notice?',
        'What happens if I need to cancel or break the contract early?'
      ]
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (textToSend: string) => {
    const q = textToSend.trim();
    if (!q) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setLoading(true);

    try {
      const assistantMsg = await askDocumentQuestionWithAI(q, documentText, messages, apiKey);
      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm flex flex-col h-[700px] overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <span>Grounded Legal Q&A Assistant</span>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-semibold">
                Context-Grounded
              </span>
            </h2>
            <p className="text-xs text-slate-500">Every response is strictly cited against your document</p>
          </div>
        </div>

        <div className="hidden sm:flex items-center space-x-1.5 text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 px-2.5 py-1 rounded-lg">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>Informational Assistance Only</span>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start space-x-3 ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
              msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
            }`}>
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div className={`max-w-[80%] space-y-2`}>
              <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-tr-none'
                  : 'bg-slate-100 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 rounded-tl-none border border-slate-200/60 dark:border-slate-700/60'
              }`}>
                <p className="whitespace-pre-wrap">{msg.text}</p>
                <div className={`text-[10px] mt-2 ${msg.sender === 'user' ? 'text-blue-200' : 'text-slate-400'}`}>
                  {msg.timestamp}
                </div>
              </div>

              {/* Citations */}
              {msg.citations && msg.citations.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center space-x-1">
                    <Bookmark className="w-3 h-3 text-blue-500" />
                    <span>Document Citations:</span>
                  </div>
                  {msg.citations.map((cite, i) => (
                    <div key={i} className="text-xs bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/40 p-2.5 rounded-lg text-slate-700 dark:text-slate-300">
                      <div className="font-semibold text-blue-700 dark:text-blue-400">{cite.clauseId}: {cite.title}</div>
                      <div className="font-mono text-[11px] text-slate-600 dark:text-slate-400 mt-1 italic">&ldquo;{cite.excerpt}&rdquo;</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Suggested Questions */}
              {msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
                <div className="pt-2 flex flex-wrap gap-1.5">
                  {msg.suggestedQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(q)}
                      className="text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-full transition-colors cursor-pointer text-left"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center space-x-2 text-slate-400 text-xs py-2">
            <Sparkles className="w-4 h-4 animate-spin text-blue-500" />
            <span>Analyzing contract context with GenAI...</span>
          </div>
        )}
      </div>

      {/* Input Field */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(inputText);
          }}
          className="flex items-center space-x-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask a question about this contract (e.g., 'What are my termination penalties?')..."
            className="flex-1 px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || loading}
            className="p-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white rounded-xl shadow-md transition-colors cursor-pointer"
            aria-label="Send question"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
