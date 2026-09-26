import React, { useState } from 'react';
import { Eye, Sun, Moon, Volume2, Type, Accessibility } from 'lucide-react';

interface AccessibilityToolbarProps {
  fontSize: 'normal' | 'large' | 'xl';
  setFontSize: (size: 'normal' | 'large' | 'xl') => void;
  isHighContrast: boolean;
  setIsHighContrast: (val: boolean) => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
}

export const AccessibilityToolbar: React.FC<AccessibilityToolbarProps> = ({
  fontSize,
  setFontSize,
  isHighContrast,
  setIsHighContrast,
  isDarkMode,
  setIsDarkMode,
}) => {
  const [speaking, setSpeaking] = useState(false);

  const toggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert('Text-to-speech is not supported in this browser.');
      return;
    }

    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    } else {
      const activeText = document.querySelector('main')?.textContent || 'JurisEase AI Legal Assistance Platform';
      const utterance = new SpeechSynthesisUtterance(activeText.slice(0, 1000));
      utterance.onend = () => setSpeaking(false);
      utterance.onerror = () => setSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setSpeaking(true);
    }
  };

  return (
    <div
      role="region"
      aria-label="Accessibility controls"
      className="bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 py-1.5 px-4 text-xs flex flex-wrap items-center justify-between gap-2"
    >
      <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300 font-medium">
        <Accessibility className="w-4 h-4 text-blue-600 dark:text-blue-400" />
        <span>Accessibility Suite (WCAG 2.1 AA)</span>
      </div>

      <div className="flex items-center space-x-2">
        {/* Font Sizing */}
        <div className="flex items-center bg-white dark:bg-slate-900 rounded-lg p-0.5 border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setFontSize('normal')}
            className={`px-2 py-0.5 rounded text-[11px] font-semibold ${fontSize === 'normal' ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-300'}`}
            aria-label="Normal text size"
          >
            A
          </button>
          <button
            onClick={() => setFontSize('large')}
            className={`px-2 py-0.5 rounded text-[13px] font-semibold ${fontSize === 'large' ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-300'}`}
            aria-label="Large text size"
          >
            A+
          </button>
          <button
            onClick={() => setFontSize('xl')}
            className={`px-2 py-0.5 rounded text-[15px] font-semibold ${fontSize === 'xl' ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-300'}`}
            aria-label="Extra large text size"
          >
            A++
          </button>
        </div>

        {/* High Contrast */}
        <button
          onClick={() => setIsHighContrast(!isHighContrast)}
          className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg border font-medium transition-colors ${
            isHighContrast
              ? 'bg-amber-400 text-black border-amber-500 font-bold'
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
          }`}
          aria-label="Toggle high contrast mode"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>{isHighContrast ? 'High Contrast ON' : 'Contrast'}</span>
        </button>

        {/* Dark / Light Toggle */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
          aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDarkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-slate-600" />}
          <span>{isDarkMode ? 'Light' : 'Dark'}</span>
        </button>

        {/* Text-to-Speech */}
        <button
          onClick={toggleSpeech}
          className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg border transition-colors ${
            speaking
              ? 'bg-rose-600 text-white border-rose-700 animate-pulse'
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
          }`}
          aria-label="Read active document page aloud"
        >
          <Volume2 className="w-3.5 h-3.5" />
          <span>{speaking ? 'Stop Speech' : 'Listen'}</span>
        </button>
      </div>
    </div>
  );
};
