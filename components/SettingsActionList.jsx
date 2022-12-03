import React from 'react';
import { companyActions } from '@/redux/company/companySlice';
import SettingsActionCard from './SettingsActionCard';

export default function SettingsActionList({
  items,
  property,
  topics,
  modalTitle,
  modalDescription,
  onDelete,
  isHideUpdate
}) {
  return items.map((item, index) => (
    <SettingsActionCard
      key={item._id}
      id={item._id}
      title={item.name}
      modalTitle={modalTitle}
      modalDescription={modalDescription}
      deleteAction={() => onDelete(item)}
      colorCircle
      colorHex={item.color}
      editAction={companyActions.updateCompanySubLists}
      property={property}
      index={index}
      topics={topics}
      isHideUpdate={isHideUpdate}
      canDnd
    />
  ));
}
