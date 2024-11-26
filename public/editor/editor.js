import React from 'react';
import { createRoot } from 'react-dom/client';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Strike from '@tiptap/extension-strike';
import TextStyle from '@tiptap/extension-text-style';
import FontFamily from '@tiptap/extension-font-family';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';

const Editor = () => {
  // Initialize the editor with robust extensions
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: true, // Enable undo/redo
        heading: { levels: [1, 2, 3] }, // Limit heading levels
      }),
      Underline, // Support for underline
      Strike, // Support for strikethrough
      TextStyle, // Inline text styles
      FontFamily.configure({ types: ['textStyle'] }), // Font family dropdown
      Image, // Image insertion
      Link.configure({ openOnClick: true }), // Links with clickable behavior
      Placeholder.configure({ placeholder: 'Start typing...' }), // Placeholder text
    ],
    content: '<p>Start typing...</p>', // Initial content
    autofocus: true, // Automatically focus the editor
  });

  if (!editor) return null;

  // Toolbar button handlers
  const addImage = () => {
    const url = prompt('Enter the image URL');
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  const addLink = () => {
    const url = prompt('Enter the URL');
    if (url) editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  const clearFormatting = () => {
    editor.chain().focus().clearNodes().unsetAllMarks().run();
  };

  return (
    <div>
      {/* Toolbar */}
      <div className="toolbar">
        {/* Font Dropdown Group */}
        <div className="group">
          <select onChange={(e) => editor.chain().focus().setFontFamily(e.target.value).run()}>
            <option value="Arial">Arial</option>
            <option value="Georgia">Georgia</option>
            <option value="Times New Roman">Times New Roman</option>
          </select>
        </div>

        {/* Formatting Buttons Group */}
        <div className="group">
          <button onClick={() => editor.chain().focus().toggleBold().run()}>B</button>
          <button onClick={() => editor.chain().focus().toggleItalic().run()}>
            <i>I</i>
          </button>
          <button onClick={() => editor.chain().focus().toggleUnderline().run()}>
            <u>U</u>
          </button>
        </div>

        {/* Action Buttons Group */}
        <div className="group">
          <button onClick={addLink}>
            <i className="fas fa-link"></i>
          </button>
          <button onClick={addImage}>
            <i className="fas fa-image"></i>
          </button>
          <button onClick={clearFormatting}>
            <i className="fas fa-eraser"></i>
          </button>
        </div>
      </div>

      {/* Editor Content */}
      <EditorContent className="editor-content" editor={editor} />
    </div>
  );
};

// Floating Command Bar Component
const CommandBar = () => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      console.log(`AI Command Triggered: ${e.target.value}`);
      e.target.value = '';
      document.getElementById('command-bar').style.display = 'none';
    }
  };

  return (
    <div id="command-bar" style={{ display: 'none' }}>
      <input
        id="command-input"
        type="text"
        placeholder="Type a command..."
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

// Main App Component
const App = () => {
  React.useEffect(() => {
    const handleShortcut = (e) => {
      if (e.metaKey && e.key === 'l') {
        e.preventDefault();
        const commandBar = document.getElementById('command-bar');
        commandBar.style.display = commandBar.style.display === 'none' ? 'block' : 'none';
      }
    };
    document.addEventListener('keydown', handleShortcut);
    return () => document.removeEventListener('keydown', handleShortcut);
  }, []);

  return (
    <div>
      <Editor />
      <CommandBar />
    </div>
  );
};

// Render the App
const root = createRoot(document.getElementById('app'));
root.render(<App />);
