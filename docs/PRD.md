# Product Requirements Document (PRD)
## JSON String Editor

---

### 1. Executive Summary

**Product Name:** JSON String Editor

**Version:** 1.0

**Date:** November 21, 2025

**Author:** Product Team

**Purpose:** A web-based React application that enables users to parse, edit, and save JSON strings stored in text files. The application addresses the challenge of working with stringified JSON data (JSON as a string rather than a formatted object) by providing a user-friendly interface for visualization and modification.

---

### 2. Product Overview

#### 2.1 Problem Statement
Developers and data analysts often encounter JSON data stored as escaped strings in configuration files, logs, or data exports. Editing these strings directly is error-prone due to:
- Escaped characters making the content hard to read
- Lack of syntax highlighting and validation
- Risk of introducing formatting errors
- No structured view of nested data

#### 2.2 Solution
A React-based web application that:
1. Parses JSON strings into formatted, readable JSON objects
2. Displays the data in an interactive, editable tree structure
3. Validates changes in real-time
4. Saves modifications back to the original file format (escaped JSON string)

#### 2.3 Target Users
- Software developers working with configuration files
- Data engineers managing JSON-based data pipelines
- QA engineers testing API responses
- DevOps engineers managing environment configurations
- Anyone working with campaign or email template configurations (like the sample data)

---

### 3. Goals and Objectives

#### 3.1 Primary Goals
1. **Usability**: Make JSON string editing intuitive and error-free
2. **Accuracy**: Ensure data integrity during parse, edit, and save operations
3. **Efficiency**: Reduce time spent manually editing escaped JSON strings
4. **Reliability**: Provide robust error handling and validation

#### 3.2 Success Metrics
- Users can successfully parse and edit JSON strings without errors
- Zero data loss during save operations
- Reduced editing time compared to manual text editing
- Positive user feedback on interface intuitiveness

---

### 4. User Stories

#### 4.1 Core User Stories

**US-001: Load and Parse JSON String**
- **As a** developer
- **I want to** load a JSON string from a file
- **So that** I can view its contents in a readable format

**Acceptance Criteria:**
- User can select or paste a JSON string
- System parses the string and displays formatted JSON
- Error messages appear if the string is invalid JSON
- Original file content is preserved

**US-002: Edit JSON Data**
- **As a** user
- **I want to** edit values, add new fields, and delete existing fields
- **So that** I can modify the configuration without syntax errors

**Acceptance Criteria:**
- User can edit primitive values (strings, numbers, booleans)
- User can add new key-value pairs
- User can delete existing fields
- User can expand/collapse nested objects and arrays
- Changes are validated in real-time

**US-003: Save Modified JSON**
- **As a** user
- **I want to** save my changes back to the original file format
- **So that** the updated configuration can be used by other systems

**Acceptance Criteria:**
- Modified JSON is converted back to an escaped string
- Original file is updated with new content
- User receives confirmation of successful save
- Option to download the updated content

**US-004: Validate JSON Structure**
- **As a** user
- **I want to** see validation errors immediately
- **So that** I can fix issues before saving

**Acceptance Criteria:**
- Real-time validation of JSON structure
- Clear error messages with line/field information
- Visual indicators for invalid fields
- Ability to undo changes

**US-005: View Complex Data Structures**
- **As a** user working with nested JSON
- **I want to** navigate through complex object hierarchies
- **So that** I can understand and modify deeply nested data

**Acceptance Criteria:**
- Tree view with expand/collapse functionality
- Breadcrumb navigation for current path
- Search functionality to find specific keys or values
- Visual distinction between objects, arrays, and primitives

---

### 5. Functional Requirements

#### 5.1 JSON Parser Module
- **FR-001**: Parse escaped JSON strings into JavaScript objects
- **FR-002**: Handle nested objects and arrays
- **FR-003**: Preserve data types (string, number, boolean, null)
- **FR-004**: Detect and report parsing errors with specific error messages
- **FR-005**: Support large JSON files (up to 10MB)

#### 5.2 Editor Interface
- **FR-006**: Display JSON in a tree/hierarchical view
- **FR-007**: Allow inline editing of values
- **FR-008**: Support adding new key-value pairs
- **FR-009**: Support deleting fields with confirmation
- **FR-010**: Expand/collapse nodes for nested structures
- **FR-011**: Show data types for each value
- **FR-012**: Provide undo/redo functionality (up to 50 actions)

#### 5.3 Validation Engine
- **FR-013**: Validate JSON syntax in real-time
- **FR-014**: Validate data types based on context
- **FR-015**: Check for duplicate keys at the same level
- **FR-016**: Highlight invalid or problematic entries
- **FR-017**: Provide detailed error messages with suggestions

#### 5.4 Save/Export Module
- **FR-018**: Convert edited JSON back to escaped string format
- **FR-019**: Save to the original file location
- **FR-020**: Provide download option for edited content
- **FR-021**: Confirm successful save with visual feedback
- **FR-022**: Handle save errors gracefully with retry option

#### 5.5 Additional Features
- **FR-023**: Search functionality to find keys or values
- **FR-024**: Copy individual values or entire sections
- **FR-025**: Format/prettify JSON view
- **FR-026**: Toggle between tree view and raw JSON view
- **FR-027**: Import from clipboard
- **FR-028**: Dark/light theme support

---

### 6. Non-Functional Requirements

#### 6.1 Performance
- **NFR-001**: Parse JSON strings under 5MB in less than 2 seconds
- **NFR-002**: Respond to user edits within 100ms
- **NFR-003**: Save operations complete within 3 seconds
- **NFR-004**: Support up to 10,000 nested levels (practical limit)

#### 6.2 Usability
- **NFR-005**: Intuitive interface requiring minimal training
- **NFR-006**: Responsive design for desktop screens (1920x1080 to 1280x720)
- **NFR-007**: Keyboard shortcuts for common operations
- **NFR-008**: Accessible UI (WCAG 2.1 Level A compliance)

#### 6.3 Reliability
- **NFR-009**: Auto-save functionality every 30 seconds (optional)
- **NFR-010**: Data recovery in case of browser crash
- **NFR-011**: 99% uptime for hosted version
- **NFR-012**: No data loss during save operations

#### 6.4 Security
- **NFR-013**: Local file operations only (no data sent to external servers)
- **NFR-014**: Input sanitization to prevent XSS attacks
- **NFR-015**: No persistence of sensitive data in browser storage without user consent

#### 6.5 Maintainability
- **NFR-016**: Modular code architecture
- **NFR-017**: Comprehensive unit tests (>80% coverage)
- **NFR-018**: Clear documentation for developers
- **NFR-019**: TypeScript for type safety

---

### 7. Technical Requirements

#### 7.1 Technology Stack
- **Frontend Framework**: React 18+
- **Build Tool**: Vite
- **Language**: TypeScript
- **State Management**: React Context API or Zustand
- **Styling**: Tailwind CSS or styled-components
- **JSON Editor Component**: Custom or react-json-view / jsoneditor-react
- **Testing**: Vitest + React Testing Library
- **Linting**: ESLint + Prettier

#### 7.2 System Architecture

```
┌─────────────────────────────────────────────┐
│          User Interface Layer               │
│  ┌────────────┐  ┌──────────┐  ┌─────────┐ │
│  │ File Input │  │  Editor  │  │ Toolbar │ │
│  └────────────┘  └──────────┘  └─────────┘ │
└─────────────────────────────────────────────┘
                    │
┌─────────────────────────────────────────────┐
│         Application Logic Layer             │
│  ┌────────────┐  ┌──────────┐  ┌─────────┐ │
│  │   Parser   │  │Validator │  │ Saver   │ │
│  └────────────┘  └──────────┘  └─────────┘ │
└─────────────────────────────────────────────┘
                    │
┌─────────────────────────────────────────────┐
│            Data Layer                       │
│  ┌────────────┐  ┌──────────┐              │
│  │   State    │  │  Cache   │              │
│  └────────────┘  └──────────┘              │
└─────────────────────────────────────────────┘
```

#### 7.3 Key Components

1. **FileInput Component**
   - File selection/upload
   - Clipboard paste support
   - Drag-and-drop functionality

2. **JSONParser Service**
   - String unescaping
   - JSON.parse wrapper with error handling
   - Data validation

3. **Editor Component**
   - Tree view renderer
   - Inline editing controls
   - Add/delete controls
   - Expand/collapse logic

4. **Validator Service**
   - JSON schema validation
   - Type checking
   - Duplicate key detection

5. **SaveManager Component**
   - JSON stringification
   - String escaping
   - File write/download
   - Save state management

6. **Toolbar Component**
   - Action buttons (Save, Reset, Export)
   - Search input
   - View toggle
   - Theme toggle

#### 7.4 Data Flow

```
User loads file → Parse JSON string → Display in tree view
                                              ↓
User edits data → Validate changes → Update state
                                              ↓
User clicks save → Stringify JSON → Escape string → Save to file
```

---

### 8. User Interface Design

#### 8.1 Layout Structure

```
┌────────────────────────────────────────────────────────────┐
│  JSON String Editor                          [Theme Toggle] │
├────────────────────────────────────────────────────────────┤
│  [Load File] [Paste] [Save] [Export] [Reset]    [Search 🔍]│
├────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Tree View                                            │  │
│  │ ▼ mbsb013                                           │  │
│  │   ▼ CCEmails [Array(2)]                            │  │
│  │     · 0: "selvarani@jirnexu.com"                   │  │
│  │     · 1: "terence.tan@jirnexu.com"                 │  │
│  │   · emailBodyHtml: "Hi, <br /><br />..."   [Edit]  │  │
│  │   · emailSubject: "[MBSB013]..."           [Edit]  │  │
│  │   · recipientEmail: "james.chu@..."        [Edit]  │  │
│  │   · zipPassword: "83f7f3ax"                [Edit]  │  │
│  │ ▶ alli010                                           │  │
│  │ ▶ alli019                                           │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  Status: Ready | 10 objects | Last saved: 2 mins ago       │
└────────────────────────────────────────────────────────────┘
```

#### 8.2 Key UI Features
- **Color Coding**: Different colors for objects (blue), arrays (green), strings (orange), numbers (purple)
- **Icons**: Clear icons for add, delete, expand, collapse actions
- **Tooltips**: Helpful tooltips on hover
- **Status Bar**: Real-time feedback on operations
- **Modal Dialogs**: Confirmations for destructive actions

#### 8.3 Responsive Behavior
- Minimum width: 1024px (desktop-first approach)
- Sidebar collapses for smaller screens
- Toolbar items stack on narrow displays

---

### 9. Edge Cases and Error Handling

#### 9.1 Invalid JSON String
- **Scenario**: User loads a file with invalid JSON
- **Handling**: Display error message with specific issue and line number
- **Recovery**: Allow user to edit raw string and retry parsing

#### 9.2 Large Files
- **Scenario**: User loads a JSON string >10MB
- **Handling**: Show warning, offer to proceed with caution
- **Recovery**: Implement pagination or virtualization

#### 9.3 Circular References
- **Scenario**: JSON contains circular references (rare but possible)
- **Handling**: Detect and show error message
- **Recovery**: Prevent saving invalid structure

#### 9.4 Special Characters
- **Scenario**: JSON contains unusual Unicode characters or escape sequences
- **Handling**: Preserve exact character encoding
- **Recovery**: Display warning if characters may cause issues

#### 9.5 Save Failures
- **Scenario**: File cannot be saved due to permissions or disk issues
- **Handling**: Show error dialog with detailed message
- **Recovery**: Offer download option as alternative

---

### 10. Development Phases

#### Phase 1: MVP (Weeks 1-2)
- Basic file loading and parsing
- Simple tree view display
- Basic inline editing
- Save functionality
- Error handling for invalid JSON

#### Phase 2: Enhanced Editing (Week 3)
- Add/delete fields
- Array manipulation
- Undo/redo functionality
- Improved validation

#### Phase 3: Polish & Features (Week 4)
- Search functionality
- Keyboard shortcuts
- Theme support
- Performance optimization
- Comprehensive testing

#### Phase 4: Advanced Features (Future)
- JSON schema validation
- Comparison tool (diff view)
- Bulk operations
- Import/export multiple formats
- Collaboration features

---

### 11. Testing Strategy

#### 11.1 Unit Tests
- Parser functions (valid and invalid inputs)
- Validator logic
- State management
- String escape/unescape functions

#### 11.2 Integration Tests
- Complete parse-edit-save workflow
- File upload and download
- Error recovery flows

#### 11.3 E2E Tests
- User journey from file load to save
- Edge cases with real-world data
- Cross-browser compatibility

#### 11.4 Manual Testing
- Usability testing with target users
- Accessibility testing
- Performance testing with large files

---

### 12. Success Criteria

The product will be considered successful when:

1. **Functionality**: Users can parse, edit, and save JSON strings without data loss
2. **Usability**: 90% of users can complete core tasks without instructions
3. **Performance**: Handles JSON strings up to 5MB smoothly
4. **Reliability**: Zero critical bugs in production after 2 weeks
5. **Adoption**: Positive feedback from initial user group (>4/5 rating)

---

### 13. Future Enhancements

- **Version Control**: Track changes and revert to previous versions
- **Collaboration**: Multi-user editing with conflict resolution
- **API Integration**: Direct integration with APIs to fetch/push JSON
- **Templates**: Save and apply common JSON templates
- **Batch Processing**: Edit multiple files simultaneously
- **Schema Validation**: Validate against JSON Schema definitions
- **Export Formats**: Export to CSV, YAML, XML
- **Plugins**: Allow custom validators and formatters

---

### 14. Risks and Mitigations

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Large file performance issues | High | Medium | Implement virtualization, warn users about file size |
| Browser compatibility | Medium | Low | Use standard APIs, test on major browsers |
| Data loss during save | High | Low | Implement auto-save, backup before save |
| Complex nested structures causing UI issues | Medium | Medium | Set reasonable nesting limits, provide raw view option |
| Security vulnerabilities (XSS) | High | Low | Sanitize all inputs, use React's built-in escaping |

---

### 15. Appendix

#### A. Sample Data Structure
The application will handle JSON strings like the one in `sample.txt`, which contains:
- Campaign configurations (mbsb013, alli010, etc.)
- Email templates with HTML content
- Nested objects and arrays
- Special characters requiring escaping

#### B. Glossary
- **JSON String**: A string representation of JSON data, with escaped quotes and special characters
- **Tree View**: Hierarchical display of nested data structures
- **Inline Editing**: Editing values directly within the tree view
- **Escape Sequence**: Special character representations (e.g., `\"` for quotes)

#### C. References
- JSON Specification: https://www.json.org/
- React Documentation: https://react.dev/
- TypeScript Handbook: https://www.typescriptlang.org/docs/

---

**Document Control**

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | Nov 21, 2025 | Product Team | Initial release |

---

**Approval**

This PRD requires approval from:
- [ ] Product Manager
- [ ] Technical Lead
- [ ] UX Designer
- [ ] Stakeholders

---
