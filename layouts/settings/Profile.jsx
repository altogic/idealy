import { useState, useEffect } from 'react';
import SectionTitle from '@/components/SectionTitle';
import Button from '@/components/Button';
import DeleteModal from '@/components/DeleteModal';
import { Danger } from '@/components/icons';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '@/redux/auth/authSlice';
import { deleteCookie } from 'cookies-next';
import { generateUrl } from '@/utils/index';
import PersonalInformation from './Profile/PersonalInformation';
import ChangeEmail from './Profile/ChangeEmail';
import ChangePassword from './Profile/ChangePassword';
import Avatar from './Profile/Avatar';

export default function Profile() {
  const _user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [deleteProfile, setDeleteProfile] = useState(false);
  const [user, setUser] = useState();
  const router = useRouter();
  useEffect(() => {
    if (_user) {
      setUser(_user);
    }
  }, [_user]);
  const deleteProfileHandler = () => {
    dispatch(
      authActions.deleteProfile({
        onSuccess: () => {
          setDeleteProfile(!deleteProfile);
          deleteCookie('invitation-token');
          router.push(generateUrl('login'));
        }
      })
    );
  };

  return (
    <>
      <div className="pb-4 mb-10 lg:mb-11 border-b border-slate-200 dark:border-aa-600 purple:border-pt-600">
        <SectionTitle
          sectionTitle="Profile Settings"
          sectionDescription="Manage your personal account settings."
          big
        />
      </div>
      <div className="max-w-lg">
        <PersonalInformation user={user} />
        <hr className="my-6 lg:my-8 border-slate-200 dark:border-aa-600 purple:border-pt-600" />
        <Avatar user={user} />
        <hr className="my-6 lg:my-8 border-slate-200 dark:border-aa-600 purple:border-pt-600" />
        {user?.provider === 'altogic' && (
          <>
            <ChangeEmail user={user} />
            <hr className="my-6 lg:my-8 border-slate-200 dark:border-aa-600 purple:border-pt-600" />
            <ChangePassword />
            <hr className="my-6 lg:my-8 border-slate-200 dark:border-aa-600 purple:border-pt-600" />
          </>
        )}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-slate-50 dark:bg-aa-600 purple:bg-pt-800 p-6 rounded-lg">
          <div>
            <SectionTitle
              sectionTitle="Delete my profile"
              sectionDescription="You can delete all your user profile data."
            />
          </div>
          <Button
            type="button"
            text="Delete profile"
            variant="red"
            onClick={() => setDeleteProfile(!deleteProfile)}
          />
        </div>
      </div>
      {/* Delete Modal */}
      <DeleteModal
        show={deleteProfile}
        onClose={() => setDeleteProfile(!deleteProfile)}
        cancelOnClick={() => setDeleteProfile(!deleteProfile)}
        deleteOnClick={deleteProfileHandler}
        icon={<Danger className="w-6 h-6 text-red-600" />}
        title="Delete Profile"
        description="Are you sure you want to delete your profile? This action will delete all data associated with owned companies and remove you from the membership of all other companies."
      />
    </>
  );
}
