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
  ...props
}) {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.company.isLoading);
  const company = useSelector((state) => state.company.company);
  const [isPublic, setIsPublic] = useState(false);
  const createRoadMapSchema = new yup.ObjectSchema({
    name: yup.string().required('Roadmap name is required'),
    description: yup.string().required('Roadmap description is required'),
    isPublic: yup.boolean()
  });
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(createRoadMapSchema)
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
    } else {
      dispatch(
        companyActions.addItemToCompanySubLists({
          fieldName: 'roadmaps',
          value
        })
      );
    }
    reset();
    setEditedRoadmap(null);
    cancelOnClick();
  };
  useEffect(() => {
    if (editedRoadmap) {
      setValue('name', editedRoadmap.name);
      setValue('description', editedRoadmap.description);
      setValue('isPublic', editedRoadmap.isPublic);
      setIsPublic(editedRoadmap.isPublic);
    }
  }, [editedRoadmap]);

  return (
    <Modal open={show} onClose={cancelOnClick} {...props}>
      <div className="absolute top-8 right-8">
        <Button
          variant="icon"
          icon={<Close className="w-6 h-6 text-slate-500 dark:text-aa-300 purple:text-pt-300" />}
          onClick={cancelOnClick}
        />
      </div>
      <div className="mb-5">
        <span className="inline-flex items-center justify-center flex-shrink-0 w-12 h-12 bg-green-100 rounded-full ring-8 ring-green-50">
          <ThreeStar className="w-6 h-6 text-green-600 dark:text-aa-300 purple:text-pt-300" />
        </span>
      </div>
      <div className="mb-5 space-y-2">
        <h2 className="text-slate-800 text-lg font-medium tracking-sm">Create new roadmap</h2>
        <p className="text-slate-500 text-sm tracking-sm">Please enter a name for this roadmap.</p>
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
          <Button onClick={cancelOnClick} text="Cancel" variant="blank" {...props} />
          <Button type="submit" variant="indigo" loading={loading} text="Submit" {...props} />
        </div>
      </form>
    </Modal>
  );
}
