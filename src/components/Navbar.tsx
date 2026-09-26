import React, { useState } from 'react';
import { Scale, ShieldCheck, Key, AlertTriangle, FileText, Info } from 'lucide-react';

interface NavbarProps {
  apiKey: string;
  setApiKey: (key: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ apiKey, setApiKey, activeTab, setActiveTab }) => {
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [tempKey, setTempKey] = useState(apiKey);

  const tabs = [
    { id: 'simplify', label: '1. Simplifying Complex Documents', icon: FileText },
    { id: 'compare', label: '2. Comparing Contracts & Policies', icon: Scale },
    { id: 'risks', label: '3. Highlighting Obligations & Risks', icon: AlertTriangle },
    { id: 'chat', label: '4. Answering Document Questions', icon: Info },
    { id: 'prep', label: '5. Actionable Summaries & Lawyer Prep', icon: ShieldCheck },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-slate-900 border-b border-slate-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo & Identity */}
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('simplify')}>
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-md shadow-blue-500/30">
                <Scale className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-lg tracking-tight">AI for Legal Assistance & Access</span>
                  <span className="bg-blue-500/20 text-blue-300 text-xs px-2 py-0.5 rounded-full font-medium border border-blue-400/30">
                    JurisEase AI
                  </span>
                </div>
                <p className="text-xs text-slate-400 hidden sm:block">Empowering Access to Legal Documents, Plain-English Simplification & Rights</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowKeyModal(true)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                  apiKey
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20'
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                }`}
                title="Configure Gemini API Key (Optional - Smart Fallback included)"
                aria-label="Configure Gemini GenAI API Key"
              >
                <Key className="w-3.5 h-3.5" />
                <span>{apiKey ? 'Gemini API Connected' : 'Connect Gemini (Optional)'}</span>
              </button>

              <div className="hidden lg:flex items-center space-x-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs px-3 py-1.5 rounded-lg">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span>Information Only — Not Formal Legal Advice</span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex space-x-1 overflow-x-auto py-2 scrollbar-none" aria-label="Main Navigation">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                  aria-selected={isActive}
                  role="tab"
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* API Key Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 text-white shadow-2xl">
            <h3 className="text-lg font-bold flex items-center space-x-2 mb-2">
              <Key className="w-5 h-5 text-blue-400" />
              <span>Google Gemini API Key</span>
            </h3>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              JurisEase AI operates seamlessly out-of-the-box using built-in legal intelligence. Optionally input your Gemini 1.5/2.0 API key for live dynamic AI inference. Your key never leaves your browser.
            </p>
            <input
              type="password"
              placeholder="AIzaSy..."
              value={tempKey}
              onChange={(e) => setTempKey(e.target.value)}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 mb-4"
              aria-label="Gemini API Key Input"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => {
                  setTempKey('');
                  setApiKey('');
                  setShowKeyModal(false);
                }}
                className="px-3 py-1.5 text-xs text-slate-400 hover:text-white transition-colors"
              >
                Clear Key
              </button>
              <button
                onClick={() => {
                  setApiKey(tempKey);
                  setShowKeyModal(false);
                }}
                className="px-4 py-1.5 text-xs bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
