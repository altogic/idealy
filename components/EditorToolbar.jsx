/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import FileService from '@/services/file';

const uploadImage = async (file) => {
  const { data } = await FileService.uploadFile(file, file.name);
  return data.publicPath;
};

function imageHandler() {
  const input = document.createElement('input');

  input.setAttribute('type', 'file');
  input.setAttribute('accept', 'image/*');
  input.click();

  input.onchange = async () => {
    const file = input.files[0];
    const range = this.quill.getSelection();
    const position = range ? range.index : 0;
    this.quill.insertText(position, 'Uploading Image. Please wait...', {
      size: '2rem'
    });
    const res = await uploadImage(file);

    this.quill.insertEmbed(range.index, 'image', res);
    this.quill.deleteText(position + 1, 31);
  };
}

export const modules = {
  clipboard: {
    matchVisual: false
  },
  toolbar: {
    container: '#toolbar',
    handlers: {
      image: imageHandler
    }
  },
  history: {
    delay: 500,
    maxStack: 100,
    userOnly: true
  }
};

export const formats = ['bold', 'italic', 'underline', 'align', 'strike', 'image'];

export default function EditorToolbar() {
  return (
    <div id="toolbar" className="border-none absolute bottom-0 right-0 z-50">
      <span className="ql-formats">
        <button type="button" tabIndex={-1} className="ql-bold" />
        <button type="button" tabIndex={-1} className="ql-italic" />
        <button type="button" tabIndex={-1} className="ql-underline" />
        <button type="button" tabIndex={-1} className="ql-strike" />
        <button type="button" tabIndex={-1} className="ql-image" />
      </span>
    </div>
  );
}
