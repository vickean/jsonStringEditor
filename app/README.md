# JSON String Editor

A powerful web-based tool for parsing, editing, and managing JSON strings with a professional code editor interface.

## 🚀 Features

### Core Functionality
- **Parse JSON Strings**: Load JSON strings wrapped in quotes with proper unescaping of special characters (`\"`, `\n`, `\t`, etc.)
- **Monaco Editor Integration**: Professional code editing experience with the same editor used in VS Code
- **Syntax Highlighting**: Full JSON syntax highlighting with color-coded keys, strings, numbers, booleans, and punctuation
- **Real-time Validation**: Instant JSON validation with error messages and line indicators
- **Auto-formatting**: Beautiful JSON formatting with proper indentation and line breaks

### Editor Features
- **IntelliSense**: JSON schema validation and autocomplete
- **Line Numbers**: Easy navigation with line numbering
- **Tab Support**: Proper tab handling for nested structures
- **Word Wrap**: Readable long strings with automatic word wrapping
- **Dark Theme**: Eye-friendly dark theme optimized for extended editing sessions

### Tab Views
1. **Editor Tab**: Full-featured Monaco editor for editing formatted JSON
2. **JSON String Tab**: Read-only view of the escaped JSON string with one-click copy to clipboard

### File Operations
- **File Picker**: Load JSON strings from local files using native file system API
- **Paste Support**: Directly paste JSON strings into the editor
- **Direct File Save**: Save changes back to the original file (Chrome/Edge with File System Access API)
- **Download Fallback**: Download edited file if direct save is not supported
- **Export JSON**: Export as properly formatted JSON file

### Additional Features
- **Reset Functionality**: Revert to original content with confirmation
- **Dirty State Tracking**: Visual indication of unsaved changes
- **Character & Line Count**: Live statistics display
- **Responsive Design**: Works on various screen sizes

## 🛠️ Tech Stack

- **React 19.2** - UI framework
- **TypeScript** - Type safety
- **Vite 7.2** - Build tool and dev server
- **Monaco Editor** - Professional code editor
- **File System Access API** - Direct file editing in modern browsers

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🎯 Use Cases

- Edit configuration files stored as escaped JSON strings
- Manage campaign configurations and email templates
- Debug JSON strings from APIs or logs
- Convert between JSON string format and readable JSON
- Quick JSON validation and formatting

## 🌐 Browser Compatibility

- **Full support**: Chrome 86+, Edge 86+ (includes File System Access API)
- **Partial support**: Firefox, Safari (download fallback for saving)

## 📝 License

MIT

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
