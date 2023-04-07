import { companyActions } from '@/redux/company/companySlice';
import { realtime } from '@/utils/altogic';
import cn from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useNotification from '@/hooks/useNotification';
import Avatar from './Avatar';
import Button from './Button';
import { CircleUser, Danger, Trash } from './icons';
import InfoModal from './InfoModal';
import RoleListBox from './RoleListBox';

export default function TeamRole({ avatar, name, email, status, role, isRegistered, id, userId }) {
  const [isDelete, setIsDelete] = useState(false);
  const [selected, setSelected] = useState(role);
  const company = useSelector((state) => state.company.company);
  const loading = useSelector((state) => state.company.isLoading);
  const isSent = useRef(false);
  const user = useSelector((state) => state.auth.user);
  const sendNotification = useNotification();
  const dispatch = useDispatch();
  const handleDelete = () => {
    setIsDelete(!isDelete);
    if (isRegistered) {
      dispatch(companyActions.deleteCompanyMember({ userId, email, companyId: company._id }));
      if (status !== 'Declined') {
        realtime.send(userId, 'delete-membership', {
          companyId: company._id,
          userId,
          companyName: company.name,
          name,
          id,
          isRegistered
        });
        sendNotification({
          message: `You have been removed from <b>${company?.name}</b>`,
          targetUser: userId,
          type: 'deleteMembership'
        });
      }
    } else {
      dispatch(
        companyActions.deleteUnregisteredMember({ id, email: name, companyId: company._id })
      );
    }
    realtime.send(company._id, 'delete-member', {
      companyId: company._id,
      userId,
      isRegistered,
      id,
      name
    });
    realtime.send(company._id, 'update-member', {
      type: 'update-member',
      role,
      id,
      companyId: company._id,
      isRegistered,
      userId,
      companyName: company.name
    });
  };
  const handleRoleChange = (role) => {
    setSelected(role);
    if (isRegistered) {
      dispatch(
        companyActions.updateCompanyMemberRole({
          id,
          email,
          role,
          isRegistered,
          companyId: company._id
        })
      );
      realtime.send(userId, 'update-role', {
        type: 'update-role',
        role,
        id,
        companyId: company._id
      });
      sendNotification({
        message: `Your role has been changed to <b>${role}</b> in <b>${company?.name}</b>`,
        targetUser: userId,
        type: 'updateRole',
        url: '/public-view'
      });
    } else {
      dispatch(
        companyActions.updateCompanyMemberRole({
          id,
          role,
          email: name,
          isRegistered,
          companyId: company._id
        })
      );
    }

    realtime.send(company._id, 'update-member', {
      type: 'update-member',
      role,
      id,
      companyId: company._id,
      isRegistered,
      userId,
      companyName: company.name
    });
  };
  useEffect(() => {
    if (role) {
      setSelected(role);
    }
  }, [role]);
  useEffect(() => {
    if (isSent.current) {
      isSent.current = false;
    }
  }, [loading]);

  return (
    <>
      <div className="group flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white dark:bg-aa-900 purple:bg-pt-1000 p-4 transition hover:bg-slate-50 dark:hover:bg-aa-700 purple:hover:bg-pt-600">
        <div className="flex items-center gap-3 max-w-[250px] w-full">
          {isRegistered ? (
            <Avatar
              className="flex-shrink-0 w-[50px] h-[50px] rounded-full"
              src={avatar}
              alt={name}
            />
          ) : (
            <CircleUser className="flex-shrink-0 w-[50px] h-[50px] rounded-full text-slate-400" />
          )}
          <div className={cn(email ? 'space-y-1' : '')}>
            <h6
              className="max-w-[188px] text-slate-700 dark:text-aa-200 purple:text-pt-200 text-base font-medium tracking-sm truncate"
              title={name}>
              {name}
            </h6>
            {email && (
              <p
                className="max-w-[188px] text-slate-400 dark:text-aa-300 purple:text-pt-300 text-sm tracking-sm truncate"
                title={email}>
                {email}
              </p>
            )}
            {status === 'Pending' && (
              <Button
                type="button"
                variant="text"
                text="Resend Invitation"
                size="xs"
                height="8"
                onClick={() => {
                  isSent.current = true;
                  dispatch(
                    companyActions.resendInvite({ email: email || name, companyId: company._id })
                  );
                }}
                loading={loading && isSent.current}
              />
            )}
          </div>
        </div>
        {status && (
          <div className="text-slate-400 dark:text-aa-300 purple:text-pt-300 text-sm tracking-sm lg:text-center">
            {status}
          </div>
        )}
        <div className="flex items-center gap-4">
          <RoleListBox roleSelected={selected} setRoleSelected={handleRoleChange} />

          {(email !== user?.email && role !== company?.role) || company?.role === 'Owner' ? (
            <Button
              type="button"
              icon={
                <Trash className="w-5 h-5 text-slate-500 dark:text-aa-400 purple:text-pt-400 transition hover:text-red-500 dark:hover:text-red-500 purple:hover:text-red-500" />
              }
              variant="icon"
              onClick={() => setIsDelete(!isDelete)}
            />
          ) : (
            <span className="w-5 h-5 py-2.5 px-4" />
          )}
        </div>
      </div>
      {/* Delete Modal */}
      <InfoModal
        show={isDelete}
        onClose={() => setIsDelete(!isDelete)}
        cancelOnClick={() => setIsDelete(!isDelete)}
        onConfirm={handleDelete}
        icon={<Danger className="w-6 h-6 text-red-600" />}
        title="Delete Team Member"
        description="Are you sure you want to delete this team member? This action cannot be undone."
        confirmText="Delete Member"
        confirmColor="red"
        canCancel
      />
    </>
  );
}
