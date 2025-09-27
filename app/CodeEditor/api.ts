import axios from 'axios';

const PISTON_API_URL = 'https://emkc.org/api/v2/piston/execute';

export const executeCode = async (language: string, code: string) => {
  try {
    const response = await axios.post(PISTON_API_URL, {
      language,
      version: getLanguageVersion(language),
      files: [
        {
          name: getFileName(language),
          content: code,
        },
      ],
    });

    return response.data;
  } catch (error: any) {
    console.error('Code execution error:', error);
    throw new Error(error.response?.data?.message || 'Failed to execute code');
  }
};

const getLanguageVersion = (language: string): string => {
  const versions: Record<string, string> = {
    javascript: '18.15.0',
    python: '3.10.0',
    java: '15.0.2',
    cpp: '10.2.0',
  };
  return versions[language] || '0';
};

const getFileName = (language: string): string => {
  const fileNames: Record<string, string> = {
    javascript: 'main.js',
    python: 'main.py',
    java: 'Main.java',
    cpp: 'main.cpp',
  };
  return fileNames[language] || 'main.txt';
};