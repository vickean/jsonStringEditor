import { useState } from 'react';
import './App.css';
import { FileInput } from './components/FileInput';
import { JSONEditor } from './components/JSONEditor';
import { Toolbar } from './components/Toolbar';
import { parseJSONString, stringifyToJSONString, formatJSON } from './utils/jsonParser';
import type { JSONValue, EditorState } from './types';

function App() {
  const [editorState, setEditorState] = useState<EditorState>({
    originalString: '',
    parsedData: null,
    isDirty: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [formattedJSON, setFormattedJSON] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'editor' | 'string'>('editor');

  const handleFileLoad = (content: string, fileHandle?: FileSystemFileHandle, fileName?: string) => {
    const result = parseJSONString(content);
    
    if (result.isValid && result.data !== null) {
      const formatted = formatJSON(result.data, 2);
      setFormattedJSON(formatted);
      setEditorState({
        originalString: content,
        parsedData: result.data,
        isDirty: false,
        lastSaved: new Date(),
        fileHandle,
        fileName,
      });
      setError(null);
      setIsValid(true);
    } else {
      setError(result.error || 'Failed to parse JSON');
      setFormattedJSON(content);
      setEditorState({
        originalString: content,
        parsedData: null,
        isDirty: false,
        fileHandle,
        fileName,
      });
      setIsValid(false);
    }
  };

  const handleEditorChange = (newValue: string) => {
    setFormattedJSON(newValue);
    setEditorState(prev => ({
      ...prev,
      isDirty: true,
    }));
  };

  const handleValidationChange = (valid: boolean, validationError?: string) => {
    setIsValid(valid);
    if (!valid && validationError) {
      setError(validationError);
    } else {
      setError(null);
      // Update parsed data when valid
      try {
        const parsed = JSON.parse(formattedJSON);
        setEditorState(prev => ({
          ...prev,
          parsedData: parsed,
        }));
      } catch (e) {
        // Error already handled by validation
      }
    }
  };

  const handleSave = async () => {
    if (!isValid) {
      alert('Cannot save: JSON is invalid');
      return;
    }

    try {
      // Parse the formatted JSON to ensure it's valid
      const parsed = JSON.parse(formattedJSON);
      const jsonString = stringifyToJSONString(parsed);
      
      // If we have a file handle, try to save directly to the file
      if (editorState.fileHandle && 'createWritable' in editorState.fileHandle) {
        try {
          const writable = await editorState.fileHandle.createWritable();
          await writable.write(jsonString);
          await writable.close();

          setEditorState(prev => ({
            ...prev,
            originalString: jsonString,
            isDirty: false,
            lastSaved: new Date(),
          }));

          alert('File saved successfully!');
          return;
        } catch (error) {
          console.error('Error saving to file:', error);
          // Fall through to download method
        }
      }
      
      // Fallback: Create a blob and download
      const blob = new Blob([jsonString], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = editorState.fileName || 'edited-config.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setEditorState(prev => ({
        ...prev,
        originalString: jsonString,
        isDirty: false,
        lastSaved: new Date(),
      }));

      alert('File downloaded successfully!');
    } catch (error) {
      alert('Failed to save file: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  };

  const handleExport = () => {
    if (!isValid) {
      alert('Cannot export: JSON is invalid');
      return;
    }

    try {
      const blob = new Blob([formattedJSON], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'exported-data.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      alert('Failed to export: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  };

  const handleReset = () => {
    if (confirm('Reset all changes? This cannot be undone.')) {
      const result = parseJSONString(editorState.originalString);
      if (result.isValid && result.data !== null) {
        const formatted = formatJSON(result.data, 2);
        setFormattedJSON(formatted);
        setEditorState(prev => ({
          ...prev,
          parsedData: result.data,
          isDirty: false,
        }));
        setError(null);
        setIsValid(true);
      }
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>JSON String Editor</h1>
        <p className="subtitle">Parse, edit, and save JSON strings with ease</p>
      </header>

      <main className="app-main">
        {!editorState.parsedData ? (
          <div className="welcome-section">
            <FileInput onFileLoad={handleFileLoad} onPaste={handleFileLoad} />
            {error && (
              <div className="error-message">
                <strong>Error:</strong> {error}
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="tabs">
              <button 
                className={`tab ${activeTab === 'editor' ? 'active' : ''}`}
                onClick={() => setActiveTab('editor')}
              >
                Editor
              </button>
              <button 
                className={`tab ${activeTab === 'string' ? 'active' : ''}`}
                onClick={() => setActiveTab('string')}
              >
                JSON String
              </button>
            </div>

            {activeTab === 'editor' ? (
              <>
                <Toolbar
                  onSave={handleSave}
                  onExport={handleExport}
                  onReset={handleReset}
                  isDirty={editorState.isDirty}
                  lastSaved={editorState.lastSaved}
                  isValid={isValid}
                  fileName={editorState.fileName}
                  canSaveToFile={!!editorState.fileHandle}
                />
                <div className="editor-container">
                  <JSONEditor
                    initialValue={formattedJSON}
                    onChange={handleEditorChange}
                    onValidationChange={handleValidationChange}
                  />
                </div>
              </>
            ) : (
              <div className="string-view">
                <div className="string-view-header">
                  <h3>Escaped JSON String (Read-only)</h3>
                  <button 
                    className="copy-button"
                    onClick={() => {
                      try {
                        const parsed = JSON.parse(formattedJSON);
                        const stringified = stringifyToJSONString(parsed);
                        navigator.clipboard.writeText(stringified);
                        alert('Copied to clipboard!');
                      } catch (e) {
                        alert('Cannot copy: JSON is invalid');
                      }
                    }}
                  >
                    📋 Copy to Clipboard
                  </button>
                </div>
                <textarea
                  className="string-textarea"
                  value={isValid ? stringifyToJSONString(JSON.parse(formattedJSON)) : 'Invalid JSON - fix errors in Editor tab'}
                  readOnly
                  spellCheck={false}
                />
              </div>
            )}
          </>
        )}
      </main>

      <footer className="app-footer">
        <p>JSON String Editor v1.0 | Built with React + TypeScript</p>
      </footer>
    </div>
  );
}

export default App;
