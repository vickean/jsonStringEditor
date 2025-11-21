import React from 'react';

interface ToolbarProps {
  onSave: () => void;
  onExport: () => void;
  onReset: () => void;
  isDirty: boolean;
  lastSaved?: Date;
  isValid: boolean;
  fileName?: string;
  canSaveToFile: boolean;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  onSave,
  onExport,
  onReset,
  isDirty,
  lastSaved,
  isValid,
  fileName,
  canSaveToFile,
}) => {
  const formatLastSaved = (date?: Date): string => {
    if (!date) return 'Never';
    
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)} mins ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    return date.toLocaleString();
  };

  return (
    <div className="toolbar">
      <div className="toolbar-actions">
        <button 
          onClick={onSave} 
          className="btn btn-primary"
          disabled={!isDirty || !isValid}
          title={canSaveToFile ? `Save changes to ${fileName || 'file'}` : 'Save changes (downloads file)'}
        >
          💾 {canSaveToFile ? 'Save' : 'Save As'}
        </button>
        <button 
          onClick={onExport} 
          className="btn btn-secondary"
          disabled={!isValid}
          title="Download as JSON file"
        >
          📥 Export
        </button>
        <button 
          onClick={onReset} 
          className="btn btn-danger"
          disabled={!isDirty}
          title="Reset to original"
        >
          ↺ Reset
        </button>
      </div>
      
      <div className="toolbar-status">
        {fileName && <span className="status-text">📄 {fileName}</span>}
        {isDirty && <span className="status-badge status-modified">Modified</span>}
        {!isValid && <span className="status-badge status-error">Invalid JSON</span>}
        <span className="status-text">Last saved: {formatLastSaved(lastSaved)}</span>
      </div>
    </div>
  );
};
