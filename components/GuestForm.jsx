import { fileActions } from '@/redux/file/fileSlice';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import Avatar from './Avatar';
import Divider from './Divider';
import Input from './Input';

export default function GuestForm({ register, errors, vertical }) {
  const dispatch = useDispatch();
  const guestInfo = useSelector((state) => state.auth.guestInfo);
  const loading = useSelector((state) => state.file.isLoading);
  const [fileLink, setFileLink] = useState();

  const handleUploadAvatar = (e) => {
    e.stopPropagation();
    const fileInput = document.createElement('input');

    fileInput.setAttribute('type', 'file');
    fileInput.setAttribute('accept', 'image/*');
    fileInput.click();

    fileInput.onchange = async () => {
      const file = fileInput.files[0];
      setFileLink(URL.createObjectURL(file));
      dispatch(
        fileActions.uploadFileRequest({
          file,
          name: guestInfo?.email,
          existingFile: guestInfo?.avatar
        })
      );
    };
  };

  return (
    <>
      <div className={`flex gap-4 ${vertical ? 'flex-col' : 'max-h-[46px]'} my-4 relative`}>
        {!vertical && (
          <span className="inline-block text-slate-600 dark:text-aa-100 purple:text-pt-100 text-base tracking-sm whitespace-nowrap m-auto">
            Your details
          </span>
        )}
        {vertical && (
          <button type="button" className="m-auto mb-4" onClick={handleUploadAvatar}>
            {loading ? (
              <div className="flex items-center justify-center">
                <ClipLoader loading={loading} color="#312E81" size={30} />
              </div>
            ) : (
              <Avatar
                src={fileLink || guestInfo?.avatar}
                alt={guestInfo?.name}
                size="w-20 h-20"
                fontSize="text-4xl"
              />
            )}
          </button>
        )}
        <Input
          type="text"
          name="guestName"
          id="guestName"
          placeholder="Name"
          register={register('guestName')}
          error={errors.guestName}
        />
        <Input
          type="text"
          name="guestEmail"
          id="guestEmail"
          register={register('guestEmail')}
          error={errors.guestEmail}
          placeholder="Email"
        />
      </div>
      <div className="flex items-center mt-10">
        <Input
          id="privacyPolicy"
          aria-describedby="privacyPolicy"
          name="privacyPolicy"
          type="checkbox"
          register={register('privacyPolicy')}
          error={errors.privacyPolicy}
          label="I consent to my information being stored and used according to the Privacy Policy."
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:focus:aa-indigo-500 purple:focus:ring-pt-500 dark:bg-aa-800 purple:bg-pt-800 checked:bg-aa-600 checked:purple:bg-pt-600 "
        />
      </div>
      {!vertical && <Divider className="my-8" />}
    </>
  );
}
