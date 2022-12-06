import React, { useEffect, useState } from 'react';
import { companyActions } from '@/redux/company/companySlice';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import SettingsActionList from './SettingsActionList';

export default function SortableCompanyActions({
  items,
  property,
  topics,
  modalTitle,
  modalDescription,
  onDelete
}) {
  const dispatch = useDispatch();
  const [first, setFirst] = useState(items);
  const [isHideUpdate, setIsHideUpdate] = useState(false);
  const company = useSelector((state) => state.company.company);

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  useEffect(() => {
    if (items) {
      const temp = [...items];
      setFirst(temp.sort((a, b) => a.order - b.order));
    }
  }, [items]);
  return (
    <DragDropContext
      onDragEnd={(result) => {
        const reorderedList = reorder(first, result.source.index, result.destination.index);
        setFirst(reorderedList);
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
              items={first}
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
