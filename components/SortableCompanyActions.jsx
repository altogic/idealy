import React, { useEffect, useState } from 'react';
import { companyActions } from '@/redux/company/companySlice';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import SettingsActionList from './SettingsActionList';

export default function SortableCompanyActions({
  property,
  topics,
  onDelete,
  modalTitle,
  modalDescription
}) {
  const dispatch = useDispatch();
  const [items, setItems] = useState();
  const [isHideUpdate, setIsHideUpdate] = useState(false);
  const company = useSelector((state) => state.company.company);

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };
  useEffect(() => {
    if (company && property) {
      dispatch(
        companyActions.getCompanyProperties({
          companyId: company._id,
          fieldName: property
        })
      );
    }
  }, [property]);

  useEffect(() => {
    if (company[property]) {
      setItems(company[property]);
    }
  }, [company]);
  return (
    <DragDropContext
      onDragEnd={(result) => {
        const reorderedList = reorder(items, result.source.index, result.destination.index);
        setItems(reorderedList);
        dispatch(
          companyActions.updateCompanySubListsOrder({
            property,
            role: company?.role,
            value: reorderedList.map((item, index) => ({ ...item, order: index + 1 }))
          })
        );
        setIsHideUpdate(false);
      }}
      onDragUpdate={() => setIsHideUpdate(!isHideUpdate)}>
      <Droppable droppableId="ActiveTodos">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <SettingsActionList
              items={items}
              topics={topics}
              onDelete={onDelete}
              property={property}
              modalTitle={modalTitle}
              modalDescription={modalDescription}
              isHideUpdate={isHideUpdate}
            />

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
