/* eslint-disable jsx-a11y/control-has-associated-label */

// Modules object for setting up the Quill editor
export const modules = {
  toolbar: {
    container: '#toolbar'
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
export default function EditorToolbar({ children }) {
  return (
    <div id="toolbar">
      <span className="ql-formats">
        <button type="button" className="ql-bold" />
        <button type="button" className="ql-italic" />
        <button type="button" className="ql-underline" />
        <button type="button" className="ql-strike" />
        <button type="button" className="ql-link" />
        {children}
      </span>
    </div>
  );
}
