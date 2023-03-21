import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import useSaveGuestInformation from '@/hooks/useSaveGuestInformation';
import Button from './Button';
import GuestForm from './GuestForm';
import Modal from './Modal';

export default function GuestFormModal({
  title,
  onSubmit,
  open,
  onClose,
  showLoginLink,
  saveLocal,
  error
}) {
  const schema = yup.object().shape({
    guestName: yup.string().required('Name is required'),
    guestEmail: yup.string().email('Email is invalid').required('Email is required'),
    avatar: yup.string().url(),
    privacyPolicyVote: yup.boolean().oneOf([true], 'You must accept the privacy policy')
  });
  const guestInfo = useSelector((state) => state.auth.guestInfo);
  const loading = useSelector((state) => state.company.isLoading);
  const saveGuestInformation = useSaveGuestInformation(saveLocal);
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });
  const submit = (data) => {
    onSubmit(data);
    saveGuestInformation({
      email: data.guestEmail,
      name: data.guestName,
      avatar: data.avatar,
      onSuccess: () => {
        onClose();
        reset();
      }
    });
  };
  const userAvatarLink = useSelector((state) => state.file.fileLink);

  useEffect(() => {
    if (Symbol.iterator in Object(error)) {
      error.forEach((err) => {
        if (err.code === 'user_exist') {
          setError('guestEmail', {
            type: 'manual',
            message: err.message
          });
        }
      });
    }
  }, [error]);

  useEffect(() => {
    if (userAvatarLink) {
      setValue('avatar', userAvatarLink);
    }
  }, [userAvatarLink]);

  useEffect(() => {
    if (guestInfo) {
      setValue('guestName', guestInfo.name);
      setValue('guestEmail', guestInfo.email);
      setValue('avatar', guestInfo.avatar);
    }
  }, [guestInfo]);

  return (
    <Modal show={open} onClose={() => onClose()}>
      <h1 className="mb-8 text-lg md:text-xl lg:text-2xl font-bold leading-none tracking-tight text-gray-900 dark:text-aa-200 purple:text-pt-200 text-center">
        {title}
      </h1>

      <form onSubmit={handleSubmit(submit)} className="px-8">
        <GuestForm register={register} errors={errors} checkBoxName="privacyPolicyVote" vertical />
        <div className="flex justify-end gap-2 my-8">
          <Button
            type="button"
            text="Cancel"
            variant="blank"
            onClick={() => {
              onClose();
              reset();
            }}
          />
          <Button type="submit" variant="indigo" text="Submit" loading={loading} />
        </div>
        {showLoginLink && (
          <div className="text-center text-sm text-slate-800 dark:text-aa-200 purple:text-pt-200 tracking-sm">
            Already have an account?{' '}
            <Link href="/login">
              <a className="text-indigo-700 dark:text-aa-200 purple:text-pt-200 ml-2">Login</a>
            </Link>
          </div>
        )}
      </form>
    </Modal>
  );
}
