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
  const topicList = useSelector((state) => state.company.topics);
  const statuses = useSelector((state) => state.company.statuses);
  const categories = useSelector((state) => state.company.categories);
  const [isDragEnd, setIsDragEnd] = useState();
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
    if (topicList || statuses || categories) {
      if (property === 'topics') {
        setItems(topicList);
      } else if (property === 'statuses') {
        setItems(statuses);
      } else if (property === 'categories') {
        setItems(categories);
      }
    }
  }, [topicList, statuses, categories]);

  useEffect(() => {
    if (items && isDragEnd) {
      const temp = [...items];
      dispatch(
        companyActions.updateCompanySubListsOrder({
          property,
          value: temp.map((item, index) => ({ ...item, order: index + 1 }))
        })
      );
    }
  }, [items, isDragEnd]);

  const onDragEnd = (result, items, setItems) => {
    if (result.destination) {
      const newItems = [...items];
      const [removed] = newItems.splice(result.source.index, 1);
      newItems?.splice(result.destination.index, 0, removed);
      setItems(newItems);
    }
    setIsHideUpdate(false);
    setIsDragEnd(true);
  };
  return (
    <DragDropContext
      onDragEnd={(result) => onDragEnd(result, items, setItems)}
      onDragUpdate={() => setIsHideUpdate(!isHideUpdate)}
      onDragStart={() => setIsDragEnd(false)}>
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
