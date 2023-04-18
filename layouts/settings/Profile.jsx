import Button from '@/components/Button';
import Divider from '@/components/Divider';
import { Danger } from '@/components/icons';
import InfoModal from '@/components/InfoModal';
import SectionTitle from '@/components/SectionTitle';
import { authActions } from '@/redux/auth/authSlice';
import { generateUrl } from '@/utils/index';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@/layouts/settings/Profile/Avatar';
import ChangeEmail from './Profile/ChangeEmail';
import ChangePassword from './Profile/ChangePassword';
import PersonalInformation from './Profile/PersonalInformation';

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
    setDeleteProfile(false);
  };

  return (
    <>
      <div className="pb-4 mb-10 lg:mb-11 border-b border-slate-200 dark:border-aa-600 purple:border-pt-800">
        <SectionTitle
          sectionTitle="Profile Settings"
          sectionDescription="Manage your personal account settings."
          big
        />
      </div>
      <div className="max-w-lg">
        <PersonalInformation user={user} />
        <Divider className="my-8" />
        <Avatar user={user} />
        <Divider className="my-8" />
        {user?.provider === 'altogic' && (
          <>
            <ChangeEmail user={user} />
            <Divider className="my-8" />
            <ChangePassword />
            <Divider className="my-8" />
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
      <InfoModal
        show={deleteProfile}
        onClose={() => setDeleteProfile(!deleteProfile)}
        cancelOnClick={() => setDeleteProfile(!deleteProfile)}
        onConfirm={deleteProfileHandler}
        icon={<Danger className="w-6 h-6 icon-red" />}
        title="Delete Profile"
        description="Are you sure you want to delete your profile? This action will delete all data associated with owned companies and remove you from the membership of all other companies."
        confirmText="Delete Profile"
        confirmColor="red"
        canCancel
      />
    </>
  );
}
