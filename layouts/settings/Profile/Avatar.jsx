import Avatar from '@/components/Avatar';
import Button from '@/components/Button';
import SectionTitle from '@/components/SectionTitle';
import { authActions } from '@/redux/auth/authSlice';
import { fileActions } from '@/redux/file/fileSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
      dispatch(
        authActions.updateUserProfile({
          _id: user._id,
          profilePicture: userAvatarLink
        })
      );
    }
  }, [userAvatarLink]);

  useEffect(() => {
    if (user?.profilePicture) {
      dispatch(fileActions.clearFileLink());
      setUpdatePhotoLoading(false);
    }
  }, [user?.profilePicture]);

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
      <div className="pb-6 lg:pb-4 mb-6 lg:mb-11 border-b border-slate-200 dark:border-aa-600 purple:border-pt-800">
        <SectionTitle
          sectionTitle="Profile Picture"
          sectionDescription="Update your profile picture."
        />
      </div>
      <div className="flex gap-6 mb-6">
        <Avatar src={fileLink || user?.profilePicture} alt={user?.name} />
      </div>
      <div className="flex items-center gap-3">
        {user?.profilePicture && (
          <Button onClick={deletePhotoHandler} type="button" text="Delete" variant="red" />
        )}
        <Button
          onClick={uploadPhotoHandler}
          type="button"
          text="Upload"
          variant="indigo"
          loading={loading || updatePhotoLoading}
        />
      </div>
    </>
  );
}
