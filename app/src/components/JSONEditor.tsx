import React, { useState, useRef } from 'react';
import Editor from '@monaco-editor/react';

interface JSONEditorProps {
  initialValue: string;
  onChange: (value: string) => void;
  onValidationChange: (isValid: boolean, error?: string) => void;
}

export const JSONEditor: React.FC<JSONEditorProps> = ({ 
  initialValue, 
  onChange,
  onValidationChange 
}) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string | null>(null);
  const editorRef = useRef<any>(null);

  const handleEditorChange = (newValue: string | undefined) => {
    const val = newValue || '';
    setValue(val);
    onChange(val);

    // Validate JSON
    try {
      JSON.parse(val);
      setError(null);
      onValidationChange(true);
    } catch (e) {
      const errorMsg = e instanceof Error ? e.message : 'Invalid JSON';
      setError(errorMsg);
      onValidationChange(false, errorMsg);
    }
  };

  const handleEditorMount = (editor: any) => {
    editorRef.current = editor;
  };

  return (
    <div className="json-editor">
      <Editor
        height="500px"
        defaultLanguage="json"
        value={value}
        onChange={handleEditorChange}
        onMount={handleEditorMount}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          roundedSelection: false,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          wordWrap: 'on',
        }}
      />
      {error && (
        <div className="validation-error">
          <strong>⚠️ Validation Error:</strong> {error}
        </div>
      )}
      <div className="editor-info">
        Lines: {value.split('\n').length} | Characters: {value.length}
      </div>
    </div>
  );
};
