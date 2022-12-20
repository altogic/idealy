import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fileActions } from '@/redux/file/fileSlice';
import { authActions } from '@/redux/auth/authSlice';
import { ClipLoader } from 'react-spinners';
import SectionTitle from '@/components/SectionTitle';
import Button from '@/components/Button';
import Avatar from '@/components/Avatar';

export default function AvatarLayout({ user }) {
  const userAvatarLink = useSelector((state) => state.file.fileLink);
  const loading = useSelector((state) => state.file.isLoading);
  const loadingUser = useSelector((state) => state.auth.isLoading);

  const dispatch = useDispatch();
  const [fileLink, setFileLink] = useState();
  const [didMount, setDidMount] = useState(false);
  const [updatePhotoLoading, setUpdatePhotoLoading] = useState();
  const uploadPhotoHandler = (e) => {
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
          name: user?.name.replace(' ', '_').toLowerCase(),
          existingFile: user?.profilePicture
        })
      );
    };
  };

  const deletePhotoHandler = () => {
    setFileLink(null);
    dispatch(fileActions.deleteUserAvatar(user._id));
  };

  useEffect(() => {
    if (didMount && userAvatarLink) {
      setUpdatePhotoLoading(true);
      dispatch(
        authActions.updateUserProfile({
          _id: user._id,
          profilePicture: userAvatarLink
        })
      );
    }
  }, [userAvatarLink]);

  useEffect(() => {
    setDidMount(true);
  }, []);

  useEffect(() => {
    if (!loadingUser) {
      setUpdatePhotoLoading(false);
    }
  }, [loadingUser]);

  return (
    <>
      <div className="pb-6 lg:pb-4 mb-6 lg:mb-11 border-b border-slate-200">
        <SectionTitle
          sectionTitle="Profile Picture"
          sectionDescription="Update your profile picture."
        />
      </div>
      <div className="flex gap-6 mb-6">
        {loading || updatePhotoLoading ? (
          <div className="flex items-center justify-center">
            <ClipLoader loading={loading || updatePhotoLoading} color="#4338ca" size={30} />
          </div>
        ) : (
          <Avatar src={fileLink || user?.profilePicture} alt={user?.name} />
        )}
      </div>
      <div className="flex items-center gap-3">
        {user?.profilePicture && (
          <Button onClick={deletePhotoHandler} type="button" text="Delete" variant="red" />
        )}
        <Button onClick={uploadPhotoHandler} type="button" text="Upload" variant="indigo" />
      </div>
    </>
  );
}
