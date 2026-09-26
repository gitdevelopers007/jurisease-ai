import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { AccessibilityToolbar } from './components/AccessibilityToolbar';
import { DocumentSimplifier } from './components/DocumentSimplifier';
import { ContractComparator } from './components/ContractComparator';
import { RiskScanner } from './components/RiskScanner';
import { LegalQAAssistant } from './components/LegalQAAssistant';
import { LawyerPrepGenerator } from './components/LawyerPrepGenerator';
import { SAMPLE_LEGAL_DOCS } from './data/sampleLegalDocs';
import { ShieldAlert, Sparkles, Scale, BookOpen } from 'lucide-react';

export function App() {
  const [apiKey, setApiKey] = useState('');
  const [activeTab, setActiveTab] = useState('simplify');
  const [documentText, setDocumentText] = useState(SAMPLE_LEGAL_DOCS[0].content);

  // Accessibility state
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xl'>('normal');
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const fontSizeClass =
    fontSize === 'xl' ? 'text-lg' : fontSize === 'large' ? 'text-base' : 'text-sm';

  return (
    <div className={`min-h-screen flex flex-col ${isHighContrast ? 'contrast-125' : ''} ${fontSizeClass}`}>
      {/* Accessibility Toolbar */}
      <AccessibilityToolbar
        fontSize={fontSize}
        setFontSize={setFontSize}
        isHighContrast={isHighContrast}
        setIsHighContrast={setIsHighContrast}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />

      {/* Main Navigation Header */}
      <Navbar
        apiKey={apiKey}
        setApiKey={setApiKey}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content Area */}
      <main id="main-content" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8" role="main">
        {/* Mandatory Legal & Ethical Notice Banner */}
        <div
          role="alert"
          className="mb-6 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-amber-900 dark:text-amber-200 flex items-start space-x-3 text-xs leading-relaxed"
        >
          <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="font-semibold">LEGAL CLARITY & INFORMATION ADVISORY:</strong> JurisEase AI is an educational and document-navigation assistive technology powered by generative AI. It is designed to enhance accessibility to complex legal texts, but does not provide formal legal representation, legal advice, or establish an attorney-client relationship. If facing critical litigation or signing substantial contracts, always verify terms with a licensed legal practitioner.
          </div>
        </div>

        {/* Dynamic Tab Switcher */}
        {activeTab === 'simplify' && (
          <DocumentSimplifier
            documentText={documentText}
            setDocumentText={setDocumentText}
            apiKey={apiKey}
          />
        )}

        {activeTab === 'compare' && (
          <ContractComparator apiKey={apiKey} />
        )}

        {activeTab === 'risks' && (
          <RiskScanner documentText={documentText} />
        )}

        {activeTab === 'chat' && (
          <LegalQAAssistant documentText={documentText} apiKey={apiKey} />
        )}

        {activeTab === 'prep' && (
          <LawyerPrepGenerator documentText={documentText} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-6 mt-12 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Scale className="w-4 h-4 text-blue-600" />
            <span className="font-semibold text-slate-800 dark:text-slate-200">JurisEase AI</span>
            <span>— AI for Legal Assistance & Universal Access</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>WCAG 2.1 AA Compliant</span>
            <span>•</span>
            <span>Zero-Data Retention Privacy</span>
            <span>•</span>
            <span>MIT License</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
