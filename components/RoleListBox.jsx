import React from 'react';
import { ROLE } from 'constants';
import BaseListBox from './BaseListBox';

export default function RoleListBox({ roleSelected, setRoleSelected }) {
  const onChange = (selected) => {
    setRoleSelected(selected.name);
  };
  return (
    <BaseListBox
      value={roleSelected}
      label={roleSelected}
      onChange={onChange}
      field="name"
      options={ROLE}
    />
  );
}
