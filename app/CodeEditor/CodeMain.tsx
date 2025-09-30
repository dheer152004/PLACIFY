"use client";

import { useState, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { Output } from './components/Output';
import { LanguageSelector } from './components/LanguageSelector';
import { executeCode } from './api';
import { cn } from '@/lib/utils';

type SupportedLanguage = 'python' | 'javascript' | 'java' | 'cpp';

interface LanguageInfo {
  id: SupportedLanguage;
  name: string;
  version: string;
}

interface CodeEditorProps {
  questionData: {
    id: string;
    title: string;
    starterCode: Record<SupportedLanguage, string>;
  };
}

const SUPPORTED_LANGUAGES: LanguageInfo[] = [
  { id: 'javascript', name: 'JavaScript', version: 'ES6' },
  { id: 'python', name: 'Python', version: '3.10' },
  { id: 'java', name: 'Java', version: '15' },
  { id: 'cpp', name: 'C++', version: '17' }
];

export default function CodeEditor({ questionData }: CodeEditorProps) {
  const editorRef = useRef<any>(null);
  const [language, setLanguage] = useState<LanguageInfo>(SUPPORTED_LANGUAGES[0]);
  const [theme, setTheme] = useState<'vs-dark' | 'light'>('vs-dark');

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
    // Set initial value based on selected language
    const starterCode = questionData.starterCode[language.id] || '// Start coding here';
    editor.setValue(starterCode);
  };

  // Update editor content when language changes
  const handleLanguageChange = (newLang: LanguageInfo) => {
    setLanguage(newLang);
    if (editorRef.current) {
      const starterCode = questionData.starterCode[newLang.id] || '// Start coding here';
      editorRef.current.setValue(starterCode);
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <div className="flex-1 flex flex-col">
        <div className="border-b p-4 flex items-center justify-between bg-card">
          <LanguageSelector
            languages={SUPPORTED_LANGUAGES}
            selectedLanguage={language}
            onLanguageChange={handleLanguageChange}
          />
          <button
            onClick={() => setTheme(theme === 'vs-dark' ? 'light' : 'vs-dark')}
            className={cn(
              "px-3 py-1.5 rounded-md transition-colors",
              theme === 'vs-dark' 
                ? "bg-white text-black hover:bg-gray-100" 
                : "bg-gray-800 text-white hover:bg-gray-700"
            )}
          >
            {theme === 'vs-dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
        
        <div className="flex-1 rounded-4xl  ">
          <Editor
            height="100%"
            defaultLanguage={language.id}
            defaultValue={questionData.starterCode[language.id]}
            language={language.id}
            theme={theme}
            onMount={handleEditorDidMount}
            options={{
              minimap: { enabled: true },
              fontSize: 16,
              lineNumbers: 'on',
              roundedSelection: true,
              scrollBeyondLastLine: false,
              readOnly: false,
              automaticLayout: true,
            }}
          />
        </div>
      </div>
      
      <Output 
        editorRef={editorRef}
        language={language.id}
        executeCode={executeCode}
      />
    </div>
  );
}