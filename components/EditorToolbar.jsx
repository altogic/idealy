/* eslint-disable jsx-a11y/control-has-associated-label */
import ideaService from '@/services/idea';
import localStorageUtil from '@/utils/localStorageUtil';
import 'quill-mention/dist/quill.mention.css';

async function suggestPeople(searchTerm) {
  const { data } = await ideaService.searchCompanyMembers(
    localStorageUtil.get('companyId'),
    searchTerm
  );
  const { users, members } = data;
  return [
    ...members.map((member) => ({
      id: `${member._id}-true`,
      value: member.name,
      isRegistered: true,
      name: member.name,
      email: member.email,
      profilePicture: member.profilePicture
    })),
    ...users.map((user) => ({
      id: `${user._id}-false`,
      value: user.name,
      isRegistered: false,
      name: user.name,
      email: user.email,
      profilePicture: user.avatar
    }))
  ];
}

export const modules = {
  toolbar: {
    container: '#toolbar'
  },
  mention: {
    allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
    mentionDenotationChars: ['@', '#'],
    dataAttributes: ['id', 'value', 'link', 'email', 'profilePicture', 'name', 'isRegistered'],
    async source(searchTerm, renderList) {
      if (searchTerm.length === 0) {
        renderList([], false);
      }
      if (searchTerm.length > 0) {
        const matchedPeople = await suggestPeople(searchTerm);
        renderList(matchedPeople);
      }
    },
    onSelect(item, insertItem) {
      insertItem(item);
    },
    renderItem(item) {
      const name = item.name.split(' ');
      return `
       <div class="mention-suggestion">
      ${
        item.profilePicture
          ? `<img
            src=${item.profilePicture}
            alt=${item.name}
            class="mention-avatar"
          />`
          : name &&
            `<div class="mention-default-avatar">
              <span class="mention-avatar-name">
                ${name[0]?.charAt(0).toUpperCase()} 
                ${name.length > 1 ? name[name.length - 1]?.charAt(0).toUpperCase() : ''}
              </span>
            </div>`
      }
      <span class="mention-name">
        ${item.name}
      </span>
      
    </div>
      `;
    }
  },
  history: {
    delay: 500,
    maxStack: 100,
    userOnly: true
  }
};

// Formats objects for setting up the Quill editor
export const formats = ['bold', 'italic', 'underline', 'strike', 'link', 'mention'];

// Quill Toolbar component
export default function EditorToolbar({ children, className }) {
  return (
    <div id="toolbar" className={`ql-toolbar ql-snow ${className}`}>
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
