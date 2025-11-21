import React, { useState } from 'react';
import type { JSONValue, JSONObject, JSONArray } from '../types';

interface JSONTreeViewProps {
  data: JSONValue;
  onUpdate: (path: string[], newValue: JSONValue) => void;
  onDelete: (path: string[]) => void;
}

export const JSONTreeView: React.FC<JSONTreeViewProps> = ({ 
  data, 
  onUpdate, 
  onDelete,
}) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [editing, setEditing] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>('');

  const toggleExpanded = (pathKey: string) => {
    setExpanded(prev => ({ ...prev, [pathKey]: !prev[pathKey] }));
  };

  const startEdit = (pathKey: string, value: JSONValue) => {
    setEditing(pathKey);
    setEditValue(typeof value === 'string' ? value : JSON.stringify(value));
  };

  const saveEdit = (currentPath: string[]) => {
    try {
      // Try to parse as JSON first, but if it's a simple string, use it directly
      let newValue: JSONValue;
      try {
        newValue = JSON.parse(editValue);
      } catch {
        // If parse fails, treat as string
        newValue = editValue;
      }
      onUpdate(currentPath, newValue);
      setEditing(null);
    } catch (error) {
      alert('Invalid value');
    }
  };

  const cancelEdit = () => {
    setEditing(null);
    setEditValue('');
  };

  const handleDelete = (currentPath: string[]) => {
    const pathString = currentPath.join(' > ');
    if (confirm(`Delete "${pathString}"?`)) {
      onDelete(currentPath);
    }
  };

  const renderValue = (key: string, value: JSONValue, currentPath: string[]): React.ReactNode => {
    const pathKey = currentPath.join('.');
    const isExpanded = expanded[pathKey] ?? true;
    const fullPath = [...currentPath];

    if (value === null) {
      return (
        <div className="tree-item" key={pathKey}>
          <span className="tree-key">{key}:</span>
          <span className="tree-value tree-null">null</span>
          <button onClick={() => startEdit(pathKey, value)} className="btn-edit" type="button">✏️</button>
          <button onClick={() => handleDelete(fullPath)} className="btn-delete" type="button">🗑️</button>
        </div>
      );
    }

    if (typeof value === 'object') {
      const isArray = Array.isArray(value);
      const entries = isArray 
        ? (value as JSONArray).map((v, i) => [String(i), v] as [string, JSONValue])
        : Object.entries(value as JSONObject);
      const isEmpty = entries.length === 0;

      return (
        <div className="tree-item" key={pathKey}>
          <span 
            className="tree-toggle" 
            onClick={() => toggleExpanded(pathKey)}
          >
            {isExpanded ? '▼' : '▶'}
          </span>
          <span className="tree-key">{key}:</span>
          <span className="tree-type">
            {isArray ? `Array(${entries.length})` : `Object`}
          </span>
          <button onClick={() => handleDelete(fullPath)} className="btn-delete" type="button">🗑️</button>
          
          {isExpanded && !isEmpty && (
            <div className="tree-children">
              {entries.map(([k, v]) => renderValue(k, v, [...currentPath, k]))}
            </div>
          )}
          {isExpanded && isEmpty && (
            <div className="tree-children tree-empty">Empty {isArray ? 'array' : 'object'}</div>
          )}
        </div>
      );
    }

    // Primitive values
    if (editing === pathKey) {
      return (
        <div className="tree-item tree-editing" key={pathKey}>
          <span className="tree-key">{key}:</span>
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="tree-input"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                saveEdit(fullPath);
              } else if (e.key === 'Escape') {
                cancelEdit();
              }
            }}
          />
          <button onClick={() => saveEdit(fullPath)} className="btn-save" type="button">✓</button>
          <button onClick={cancelEdit} className="btn-cancel" type="button">✗</button>
        </div>
      );
    }

    const valueClass = `tree-value tree-${typeof value}`;
    const displayValue = typeof value === 'string' ? `"${value}"` : String(value);

    return (
      <div className="tree-item" key={pathKey}>
        <span className="tree-key">{key}:</span>
        <span className={valueClass}>{displayValue}</span>
        <button 
          onClick={() => {
            console.log('Edit clicked for:', key, pathKey);
            startEdit(pathKey, value);
          }} 
          className="btn-edit" 
          type="button"
          style={{ display: 'inline-block', visibility: 'visible' }}
        >
          ✏️ Edit
        </button>
        <button 
          onClick={() => {
            console.log('Delete clicked for:', key);
            handleDelete(fullPath);
          }} 
          className="btn-delete" 
          type="button"
          style={{ display: 'inline-block', visibility: 'visible' }}
        >
          🗑️ Delete
        </button>
      </div>
    );
  };

  if (data === null) {
    return <div className="tree-null">null</div>;
  }

  if (typeof data !== 'object') {
    return <div className={`tree-value tree-${typeof data}`}>{JSON.stringify(data)}</div>;
  }

  const isArray = Array.isArray(data);
  const entries = isArray 
    ? (data as JSONArray).map((v, i) => [String(i), v] as [string, JSONValue])
    : Object.entries(data as JSONObject);

  return (
    <div className="tree-root">
      <div className="tree-header">
        {isArray ? `Array(${entries.length})` : `Object with ${entries.length} keys`}
      </div>
      <div className="tree-content">
        {entries.map(([key, value]) => renderValue(key, value, [key]))}
      </div>
    </div>
  );
};
