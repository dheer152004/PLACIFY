"use client";

import { useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import type { OnMount } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "../constants";
import Output from "./Output";

type SupportedLanguage = keyof typeof CODE_SNIPPETS;

const CodeEditor = () => {
  const editorRef = useRef<any>(null);
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState<SupportedLanguage>("javascript");

  const onMount: OnMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (newLanguage: SupportedLanguage) => {
    setLanguage(newLanguage);
    setValue(CODE_SNIPPETS[newLanguage]);
  };

  return (
    <div className="container mx-auto">
      <div className="flex gap-4">
        <div className="w-1/2">
          <LanguageSelector language={language} onSelect={onSelect} />
          <div className="mt-4 border rounded-lg overflow-hidden">
            <Editor
              options={{
                minimap: {
                  enabled: false,
                },
                fontSize: 16,
              }}
              height="60vh"
              theme="vs-dark"
              language={language}
              defaultValue={CODE_SNIPPETS[language]}
              onMount={onMount}
              onChange={(value) => setValue(value || "")}
            />
          </div>
        </div>
        <div className="w-1/2">
          <Output editorRef={editorRef} language={language} />
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;