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
      link: member.name,
      isRegistered: true
    })),
    ...users.map((user) => ({
      id: `${user._id}-false`,
      value: user.name,
      link: user.name,
      isRegistered: false
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
    async source(searchTerm, renderList) {
      if (searchTerm.length === 0) {
        renderList([], false);
      }
      const matchedPeople = await suggestPeople(searchTerm);
      renderList(matchedPeople);
    },
    onSelect(item, insertItem) {
      insertItem(item);
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
