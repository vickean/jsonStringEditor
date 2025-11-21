import React, { useRef } from 'react';

interface FileInputProps {
  onFileLoad: (content: string, fileHandle?: FileSystemFileHandle, fileName?: string) => void;
  onPaste: (content: string) => void;
}

export const FileInput: React.FC<FileInputProps> = ({ onFileLoad, onPaste }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      onFileLoad(text, undefined, file.name);
    } catch (error) {
      console.error('Error reading file:', error);
      alert('Failed to read file');
    }
  };

  const handleFileSystemPicker = async () => {
    try {
      // Check if File System Access API is supported
      if ('showOpenFilePicker' in window) {
        const [fileHandle] = await (window as any).showOpenFilePicker({
          types: [
            {
              description: 'Text and JSON files',
              accept: {
                'text/plain': ['.txt'],
                'application/json': ['.json'],
              },
            },
          ],
          multiple: false,
        });

        const file = await fileHandle.getFile();
        const text = await file.text();
        onFileLoad(text, fileHandle, file.name);
      } else {
        // Fallback to traditional file input
        fileInputRef.current?.click();
      }
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        console.error('Error opening file:', error);
        alert('Failed to open file');
      }
    }
  };

  const handlePaste = () => {
    const text = textareaRef.current?.value || '';
    if (text.trim()) {
      onPaste(text);
      if (textareaRef.current) {
        textareaRef.current.value = '';
      }
    }
  };

  return (
    <div className="file-input-container">
      <div className="file-input-group">
        <input
          ref={fileInputRef}
          type="file"
          accept=".txt,.json"
          onChange={handleFileChange}
          style={{ display: 'none' }}
          id="file-input"
        />
        <button onClick={handleFileSystemPicker} className="btn btn-primary">
          📁 Open File
        </button>
      </div>
      
      <div className="paste-group">
        <textarea
          ref={textareaRef}
          placeholder="Or paste JSON string here..."
          rows={3}
          className="paste-textarea"
        />
        <button onClick={handlePaste} className="btn btn-secondary">
          📋 Parse Pasted Content
        </button>
      </div>
    </div>
  );
};
