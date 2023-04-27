import React from 'react';
import { ROLE } from 'constants';
import BaseListBox from './BaseListBox';

export default function RoleListBox({ roleSelected, setRoleSelected, onRoleChange }) {
  const onChange = (selected) => {
    setRoleSelected(selected.name);
    if (onRoleChange) onRoleChange(selected.name);
  };
  return (
    <BaseListBox
      value={roleSelected}
      label={roleSelected}
      onChange={onChange}
      field="name"
      options={roleSelected.isGuest ? ROLE : ROLE.filter((role) => !role.isGuest)}
    />
  );
}
