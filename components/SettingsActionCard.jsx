import { useEffect, useState, Fragment } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Draggable } from 'react-beautiful-dnd';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { Menu, Transition } from '@headlessui/react';
import { SketchPicker } from 'react-color';
import { Pen, Trash, Danger, Star } from '@/components/icons';
import Button from './Button';
import DeleteModal from './DeleteModal';
import Input from './Input';

export default function SettingsActionCard({
  id,
  title,
  roadMapDescription,
  modalTitle,
  modalDescription,
  topics,
  colorCircle,
  deleteAction,
  colorHex,
  property,
  editAction,
  canDnd,
  index,
  isHideUpdate
}) {
  const [isDelete, setIsDelete] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isColorModalOpen, setIsColorModalOpen] = useState(false);
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [colorPicker, setColorPicker] = useState();
  const dispatch = useDispatch();
  const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    description: yup.string().required('Description is required')
  });
  const {
    register,
    setFocus,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const handleEdit = (value, fieldName, canCloseInput) => {
    if (value.trim() !== '') {
      dispatch(
        editAction({
          id,
          property,
          fieldName,
          value
        })
      );
      if (fieldName === 'name') {
        setName(value);
      } else {
        setDescription(value);
      }
    }
    if (canCloseInput) {
      setIsEdit(false);
    }
  };

  useEffect(() => {
    if (isEdit) {
      setFocus('name');
      setValue('name', name);
      setValue('description', description);
    }
  }, [isEdit]);

  useEffect(() => {
    setColorPicker(colorHex);
  }, [colorHex]);
  useEffect(() => {
    if (title) {
      setName(title);
    }
    if (roadMapDescription) {
      setDescription(roadMapDescription);
    }
  }, [title, roadMapDescription]);
  const handleOnBodyClick = (e) => {
    if (e.target.id !== 'name' && e.target.id !== 'description') {
      setIsColorModalOpen(false);
      setIsEdit(false);
    }
  };
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
      className="group flex items-center justify-between gap-4 hover:bg-slate-50 h-[76px] rounded-lg "
      ref={!isColorModalOpen ? provided.innerRef : null}
      {...provided?.draggableProps}
      {...provided?.dragHandleProps}
      style={{
        ...provided?.draggableProps?.style,
        cursor: !isColorModalOpen ? 'grab' : 'default'
      }}>
      <div className="flex justify-between gap-4 w-full h-full p-4">
        <div className="flex items-center gap-3 w-full h-full">
          {!topics && colorCircle && (
            <div>
              <button
                type="button"
                className="p-4"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsColorModalOpen(!isColorModalOpen);
                }}>
                <svg className="h-2.5 w-2.5" fill={colorPicker} viewBox="0 0 8 8">
                  <circle cx={4} cy={4} r={3} />
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
                    <div className="absolute top-2 -left-20 overflow-y-auto drop-shadow-lg border border-slate-200">
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
            </div>
          )}
          {topics && <Star className="w-5 h-5 text-slate-300" />}

          {isEdit ? (
            <form className="flex flex-col">
              <Input
                type="name"
                id="name"
                name="name"
                error={errors.name}
                register={register('name')}
                className="bg-transparent text-slate-700 text-sm lg:text-base tracking-sm border-0 focus:outline-none focus:ring-0"
                onBlur={(e) => {
                  handleEdit(e.target.value, 'name', !roadMapDescription);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleEdit(e.target.value, 'name', true);
                  }
                }}
              />
              {roadMapDescription && (
                <Input
                  type="description"
                  id="description"
                  name="name"
                  error={errors.description}
                  register={register('description')}
                  className="bg-transparent text-slate-700 tracking-sm border-0 focus:outline-none focus:ring-0 mt-2"
                  onBlur={(e) => {
                    handleEdit(e.target.value, 'description', false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleEdit(e.target.value, 'description', true);
                    }
                  }}
                />
              )}
            </form>
          ) : (
            <div className="flex flex-col">
              <h6
                className="max-w-[200px] lg:max-w-xs text-slate-700 text-sm lg:text-base tracking-sm truncate"
                title={name}>
                {name}
              </h6>
              {roadMapDescription && (
                <p className="text-slate-500 mt-2 text-sm tracking-sm" title={description}>
                  {description}
                </p>
              )}
            </div>
          )}
        </div>
        {!isHideUpdate && (
          <div className="flex items-center justify-between gap-2 lg:gap-4 transition opacity-0 group-hover:opacity-100">
            <Button
              type="button"
              icon={<Pen className="w-5 h-5 text-slate-500" />}
              variant="icon"
              onClick={(e) => {
                e.stopPropagation();
                setIsEdit(!isEdit);
              }}
            />
            <Button
              type="button"
              icon={<Trash className="w-5 h-5 text-slate-500" />}
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
      <DeleteModal
        show={isDelete}
        onClose={() => setIsDelete(!isDelete)}
        cancelOnClick={() => setIsDelete(!isDelete)}
        deleteOnClick={deleteAction}
        icon={<Danger className="w-6 h-6 text-red-600" />}
        title={modalTitle}
        description={modalDescription}
      />
    </div>
  );
}
