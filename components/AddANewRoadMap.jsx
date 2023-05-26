import { companyActions } from '@/redux/company/companySlice';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { useState, useEffect } from 'react';
import Button from './Button';
import { Close, ThreeStar } from './icons';
import Input from './Input';
import Modal from './Modal';
import SwitchInput from './Switch';
import TextArea from './TextArea';

export default function AddANewRoadMap({
  show,
  cancelOnClick,
  editedRoadmap,
  setEditedRoadmap,
  onAdd,
  ...props
}) {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.company.isLoading);
  const company = useSelector((state) => state.company.company);
  const [isPublic, setIsPublic] = useState(false);
  const createRoadMapSchema = new yup.ObjectSchema({
    name: yup
      .string()
      .max(32, 'Roadmap name must be less than 32 characters')
      .required('Roadmap name is required'),
    description: yup.string(),
    isPublic: yup.boolean()
  });
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(createRoadMapSchema),
    mode: 'all'
  });
  const addRoadmap = (value) => {
    if (editedRoadmap) {
      dispatch(
        companyActions.updateCompanySubLists({
          id: editedRoadmap?._id,
          property: 'roadmaps',
          update: value,
          role: company?.role
        })
      );
      setEditedRoadmap(null);
    } else {
      dispatch(
        companyActions.addItemToCompanySubLists({
          fieldName: 'roadmaps',
          value,
          onSuccess: (data) => {
            onAdd(data);
          }
        })
      );
    }
    reset();
    setIsPublic(false);
    cancelOnClick();
  };

  function handleClose() {
    reset();
    setIsPublic(false);
    cancelOnClick();
  }
  useEffect(() => {
    if (editedRoadmap) {
      setValue('name', editedRoadmap.name);
      setValue('description', editedRoadmap.description);
      setValue('isPublic', editedRoadmap.isPublic);
      setIsPublic(editedRoadmap.isPublic);
    }
  }, [editedRoadmap]);

  return (
    <Modal open={show} onClose={() => handleClose()} {...props}>
      <div className="absolute top-8 right-8">
        <Button variant="icon" icon={<Close className="w-6 h-6 icon" />} onClick={cancelOnClick} />
      </div>
      <div className="mb-5">
        <span className="inline-flex items-center justify-center flex-shrink-0 w-12 h-12 bg-green-100 rounded-full ring-8 ring-green-50">
          <ThreeStar className="w-6 h-6 icon-green" />
        </span>
      </div>
      <div className="mb-5 space-y-2">
        <h2 className="text-slate-800 dark:text-aa-200 purple:text-pt-200 text-lg font-medium tracking-sm">
          Create new roadmap
        </h2>
        <p className="text-slate-500 dark:text-aa-200 purple:text-pt-200 text-sm tracking-sm">
          Please enter a name for this roadmap.
        </p>
      </div>
      <form onSubmit={handleSubmit(addRoadmap)}>
        <div className="mb-8 space-y-5">
          <Input
            type="text"
            label="Roadmap name"
            name="name"
            id="name"
            placeholder="e.g. Roadmap 1"
            register={register('name')}
            error={errors.name}
          />
          <TextArea
            type="text"
            label="Description"
            name="description"
            id="description"
            error={errors.description}
            register={register('description')}
            placeholder="e.g. New feedback"
            rows={4}
          />
          <SwitchInput
            text="Make this roadmap public"
            name="isPublic"
            id="isPublic"
            checked={isPublic}
            onChange={(value) => {
              setIsPublic(value);
              setValue('isPublic', value);
            }}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Button onClick={() => handleClose()} text="Cancel" variant="blank" {...props} />
          <Button type="submit" variant="indigo" loading={loading} text="Submit" {...props} />
        </div>
      </form>
    </Modal>
  );
}
