import { useEffect, useState, Fragment } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Draggable } from 'react-beautiful-dnd';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { Menu, Transition } from '@headlessui/react';
import { SketchPicker } from 'react-color';
import { Pen, Trash, Danger, Star, Eye, EyeSlash } from '@/components/icons';
import Button from './Button';
import InfoModal from './InfoModal';
import Input from './Input';
import { Tooltip, TooltipTrigger, TooltipContent } from './Tooltip';

export default function SettingsActionCard({
  id,
  title,
  modalTitle,
  modalDescription,
  description,
  topics,
  colorCircle,
  deleteAction,
  colorHex,
  property,
  editAction,
  canDnd,
  index,
  isHideUpdate,
  isColorModalOpen,
  setActiveIndex,
  activeIndex,
  onEdit,
  isPublic
}) {
  const [isDelete, setIsDelete] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState();

  const [colorPicker, setColorPicker] = useState();
  const dispatch = useDispatch();
  const schema = yup.object().shape({
    name: yup.string().required('Name is required')
  });
  const {
    register,
    setFocus,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const handleEdit = (value, fieldName) => {
    if (value.trim() !== '' && value.length < 50) {
      dispatch(
        editAction({
          id,
          property,
          update: { [fieldName]: value }
        })
      );
      setName(value);
    }
    setIsEdit(false);
  };

  useEffect(() => {
    if (isEdit) {
      setFocus('name');
      setValue('name', name);
    }
  }, [isEdit]);

  useEffect(() => {
    setColorPicker(colorHex);
  }, [colorHex]);
  useEffect(() => {
    if (title) {
      setName(title);
    }
  }, [title]);
  function handleOnBodyClick(e) {
    if (e.target.id !== 'name' && e.target.id !== 'description') {
      if (setActiveIndex) {
        setActiveIndex(-1);
      }
      setIsEdit(false);
    }
  }
  useEffect(() => {
    document.addEventListener('click', (e) => handleOnBodyClick(e));
    return () => {
      document.removeEventListener('click', (e) => handleOnBodyClick(e));
    };
  }, []);

  const handleChangeComplete = (color) => {
    dispatch(
      editAction({
        id,
        property,
        fieldName: 'color',
        value: color.hex
      })
    );
  };

  const getContent = (provided) => (
    <div
      className="group flex items-center justify-between gap-4 bg-white dark:bg-aa-900 purple:bg-pt-1000 hover:bg-slate-50 dark:hover:bg-aa-700 purple:hover:bg-pt-900 h-[76px] rounded-lg "
      ref={!isColorModalOpen && canDnd ? provided.innerRef : null}
      {...provided?.draggableProps}
      {...provided?.dragHandleProps}
      style={{
        ...provided?.draggableProps?.style,
        cursor: !isColorModalOpen && canDnd ? 'grab' : 'default'
      }}>
      <div className="flex justify-between gap-4 w-full h-full p-4">
        <div className="flex items-center gap-3 w-full h-full">
          <div>
            {!topics && colorCircle && (
              <>
                <button
                  type="button"
                  className="inline-flex items-center justify-center w-7 h-7 bg-slate-50 border border-b border-slate-200 dark:border-aa-600 purple:border-pt-800 rounded-lg transition ease-linear duration-200 hover:bg-slate-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveIndex(activeIndex === index ? -1 : index);
                  }}>
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="block overflow-hidden pointer-events-none w-5 h-5">
                    <path
                      fill={colorPicker}
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8 11.5C9.933 11.5 11.5 9.933 11.5 8C11.5 6.067 9.933 4.5 8 4.5C6.067 4.5 4.5 6.067 4.5 8C4.5 9.933 6.067 11.5 8 11.5ZM8 13C10.7614 13 13 10.7614 13 8C13 5.23858 10.7614 3 8 3C5.23858 3 3 5.23858 3 8C3 10.7614 5.23858 13 8 13Z"
                    />
                  </svg>
                </button>
                <Transition
                  appear
                  show={isColorModalOpen}
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95">
                  <Menu as="div" className="relative z-10">
                    <Menu.Item>
                      <div className="absolute top-2 md:-left-20 overflow-y-auto drop-shadow-lg border border-slate-200">
                        <SketchPicker
                          id="colorPicker"
                          color={colorPicker}
                          onChangeComplete={handleChangeComplete}
                          onChange={(color) => setColorPicker(color.hex)}
                        />
                      </div>
                    </Menu.Item>
                  </Menu>
                </Transition>
              </>
            )}
            {topics && (
              <Star className="w-5 h-5 text-slate-300 dark:text-aa-200 purple:text-pt-200" />
            )}
          </div>

          {isEdit ? (
            <form className="flex flex-col w-full">
              <Input
                type="text"
                id="name"
                name="name"
                error={errors.name}
                register={register('name')}
                className="bg-transparent p-0 w-full text-slate-700 dark:text-aa-200 purple:text-pt-200 text-sm lg:text-base tracking-sm border-0 focus:outline-none focus:ring-0"
                onBlur={(e) => {
                  handleEdit(e.target.value, 'name');
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleEdit(e.target.value, 'name');
                  }
                }}
              />
            </form>
          ) : (
            <div className="flex items-center gap-4">
              {onEdit && (
                <div>
                  {isPublic ? (
                    <Tooltip>
                      <TooltipTrigger>
                        <Eye className="w-5 h-5 icon" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-slate-700 dark:text-aa-200 purple:text-pt-200 text-sm">
                          Public Roadmap
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    <Tooltip>
                      <TooltipTrigger>
                        <EyeSlash className="w-5 h-5 icon" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-slate-700 dark:text-aa-200 purple:text-pt-200 text-sm">
                          Private Roadmap
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </div>
              )}
              <div>
                <h6
                  className="max-w-[200px] lg:max-w-[500px] text-slate-700 dark:text-aa-200 purple:text-pt-200 text-sm lg:text-base tracking-sm truncate"
                  title={name}>
                  {name}
                </h6>
                {description && (
                  <p className="text-slate-500 mt-2 text-sm tracking-sm" title={description}>
                    {description}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
        {!isHideUpdate && (
          <div className="flex items-center justify-between gap-2 lg:gap-4 transition opacity-0 group-hover:opacity-100">
            <Button
              type="button"
              icon={
                <Pen className="w-5 h-5 icon transition hover:text-slate-600 dark:hover:text-aa-500 purple:hover:text-pt-500" />
              }
              variant="icon"
              onClick={(e) => {
                if (!onEdit) {
                  setIsEdit(!isEdit);
                } else {
                  onEdit();
                }
                e.stopPropagation();
              }}
            />
            <Button
              type="button"
              icon={
                <Trash className="w-5 h-5 icon transition hover:text-slate-600 dark:hover:text-aa-500 purple:hover:text-pt-500" />
              }
              variant="icon"
              onClick={() => setIsDelete(!isDelete)}
            />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div>
      {canDnd ? (
        <Draggable draggableId={id} index={index}>
          {(provided) => getContent(provided)}
        </Draggable>
      ) : (
        getContent()
      )}

      {/* Delete Modal */}
      <InfoModal
        show={isDelete}
        onClose={() => setIsDelete(!isDelete)}
        cancelOnClick={() => setIsDelete(!isDelete)}
        onConfirm={deleteAction}
        icon={<Danger className="w-6 h-6 icon-red" />}
        title={modalTitle}
        description={modalDescription}
        confirmText="Delete"
        confirmColor="red"
        canCancel
      />
    </div>
  );
}
