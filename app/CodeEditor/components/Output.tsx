"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Copy, Timer, RefreshCw, Maximize2, Minimize2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface OutputSection {
  type: 'compilation' | 'runtime' | 'error' | 'status';
  content: string[];
  timestamp: string;
}

interface OutputProps {
  editorRef: { current: any };
  language: string;
  executeCode: (language: string, code: string) => Promise<any>;
}

export function Output({ editorRef, language, executeCode }: OutputProps) {
  const [output, setOutput] = useState<OutputSection[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [executionTime, setExecutionTime] = useState<number | null>(null);

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString();
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Output copied to clipboard");
    } catch (err) {
      toast.error("Failed to copy output");
    }
  };

  const runCode = async () => {
    const sourceCode = editorRef.current?.getValue();
    if (!sourceCode) {
      toast.error("Please enter some code first");
      return;
    }

    try {
      setIsLoading(true);
      setIsError(false);
      const startTime = performance.now();
      
      const result = await executeCode(language, sourceCode);
      const endTime = performance.now();
      setExecutionTime(endTime - startTime);

      const outputSections: OutputSection[] = [];
      const timestamp = getCurrentTime();

      // Compilation phase
      if (result.compile?.stdout || result.compile?.stderr) {
        if (result.compile.stdout) {
          outputSections.push({
            type: 'compilation',
            content: result.compile.stdout.split('\n'),
            timestamp
          });
        }
        if (result.compile.stderr) {
          outputSections.push({
            type: 'error',
            content: result.compile.stderr.split('\n'),
            timestamp
          });
          setIsError(true);
        }
      }

      // Runtime phase
      if (result.run?.stdout) {
        outputSections.push({
          type: 'runtime',
          content: result.run.stdout.split('\n'),
          timestamp
        });
      }
      if (result.run?.stderr) {
        outputSections.push({
          type: 'error',
          content: result.run.stderr.split('\n'),
          timestamp
        });
        setIsError(true);
      }

      // Status section
      const exitCode = result.run?.code ?? null;
      const statusMessages = [];
      
      if (exitCode !== null) {
        statusMessages.push(`Exit Code: ${exitCode}`);
      }
      if (outputSections.length === 0) {
        statusMessages.push('No output generated. Make sure your code includes print/console.log statements.');
      }

      outputSections.push({
        type: 'status',
        content: statusMessages,
        timestamp
      });

      setOutput(outputSections);

      // Show appropriate toast
      if (!isError && exitCode === 0) {
        toast.success(result.run?.stdout ? "Code executed successfully!" : "Code executed successfully (no output)");
      }
    } catch (error) {
      console.error('Code execution error:', error);
      toast.error("Failed to execute code");
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const renderOutputSection = (section: OutputSection, index: number) => {
    const getHeaderColor = () => {
      switch (section.type) {
        case 'compilation': return 'text-blue-600';
        case 'runtime': return 'text-green-700';
        case 'error': return 'text-red-500';
        case 'status': return 'text-gray-700';
        default: return '';
      }
    };

    const getHeaderText = () => {
      switch (section.type) {
        case 'compilation': return 'Compilation Output';
        case 'runtime': return 'Program Output';
        case 'error': return section.content[0].includes('compilation') ? 'Compilation Error' : 'Runtime Error';
        case 'status': return 'Execution Status';
        default: return '';
      }
    };

    return (
      <div key={index} className="mb-4 last:mb-0">
        <div className="flex items-center justify-between mb-1">
          <span className={cn("font-semibold", getHeaderColor())}>
            {getHeaderText()}
          </span>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Timer className="w-4 h-4" />
            <span>{section.timestamp}</span>
            <button
              onClick={() => copyToClipboard(section.content.join('\n'))}
              className="p-1 hover:bg-gray-100 rounded"
              title="Copy output"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className={cn(
          "p-2 rounded font-mono text-sm whitespace-pre-wrap",
          section.type === 'error' && 'bg-red-50 text-red-700',
          section.type === 'runtime' && 'bg-green-50 text-green-900',
          section.type === 'status' && 'bg-gray-50 text-gray-900',
          section.type === 'compilation' && 'bg-blue-50 text-blue-900'
        )}>
          {section.content.join('\n')}
        </div>
      </div>
    );
  };

  return (
    <div className={cn(
      "flex flex-col",
      isFullscreen ? "fixed inset-0 z-50 bg-black" : "w-1/2"
    )}>
      <div className="flex items-center justify-between mb-2 ml-2">
        <div className="flex items-center gap-2 ml-2 mt-2">
          <span className="text-lg font-semibold">Output</span>
          {executionTime && (
            <span className="text-sm text-gray-500">
              ({(executionTime / 1000).toFixed(2)}s)
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            className="p-1 hover:bg-gray-600 rounded ml-2 mr-2 mt-1.5"
            onClick={() => setIsFullscreen(!isFullscreen)}
            title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {isFullscreen ? (
              <Minimize2 className="w-4 h-4" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
      
      <div className="flex items-center gap-2 mb-4">
        <button
          className={cn(
            "px-5 py-2 rounded-md flex items-center gap-2 transition-all ml-2.5",
            isLoading
              ? "bg-gray-100 text-gray-500 cursor-not-allowed"
              : "bg-green-500 text-white hover:bg-green-800"
          )}
          disabled={isLoading}
          onClick={runCode}
        >
          <RefreshCw className={cn(
            "w-4 h-4",
            isLoading && "animate-spin"
          )} />
          {isLoading ? 'Running...' : 'Run Code'}
        </button>
        <div className="text-sm text-gray-500">
          {/* Press F5 or Ctrl+Enter to run */}
        </div>
      </div>

      <div className={cn(
        "flex-1 overflow-auto rounded-md border ml-2 mr-2",
        isError ? "border-red-200" : "border-gray-200"
      )}>
        <div className="p-4">
          {output
            ? output.map((section, i) => renderOutputSection(section, i))
            : (
              <div className="text-gray-500 italic">
                Click "Run Code" or press F5 to see the output here
              </div>
            )}
        </div>
      </div>
    </div>
  );
}