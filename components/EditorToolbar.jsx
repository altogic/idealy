import { Bold, Italic, Underline, Strike, Link, Undo, Redo } from './icons';

// Undo and redo functions for Custom Toolbar
function undoChange() {
  this.quill.history.undo();
}
function redoChange() {
  this.quill.history.redo();
}

// Modules object for setting up the Quill editor
export const modules = {
  toolbar: {
    container: '#toolbar',
    handlers: {
      undo: undoChange,
      redo: redoChange
    }
  },
  history: {
    delay: 500,
    maxStack: 100,
    userOnly: true
  }
};

// Formats objects for setting up the Quill editor
export const formats = ['bold', 'italic', 'underline', 'strike', 'link'];

// Quill Toolbar component
export default function EditorToolbar() {
  return (
    <div id="toolbar" className="ql-toolbar ql-snow">
      <span className="ql-formats">
        <button type="button" className="ql-bold">
          <Bold />
        </button>
        <button type="button" className="ql-italic">
          <Italic />
        </button>
        <button type="button" className="ql-underline">
          <Underline />
        </button>
        <button type="button" className="ql-strike">
          <Strike />
        </button>
        <button type="button" className="ql-link">
          <Link />
        </button>
        <button type="button" className="ql-undo">
          <Undo />
        </button>
        <button type="button" className="ql-redo">
          <Redo />
        </button>
      </span>
    </div>
  );
}
