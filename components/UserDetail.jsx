import { companyActions } from '@/redux/company/companySlice';
import { ROLE } from 'constants';
import _ from 'lodash';
import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { realtime } from '@/utils/altogic';
import Button from './Button';
import Divider from './Divider';
import InfoModal from './InfoModal';
import RoleListBox from './RoleListBox';
import { Danger } from './icons';
import BaseListBox from './BaseListBox';

function InfoCard({ title, description }) {
  return (
    <div className="text-sm font-medium tracking-sm">
      <h6 className="text-slate-400 dark:text-aa-200 purple:text-pt-200 mb-1">{title}</h6>
      <p className="text-slate-800 dark:text-aa-400 purple:text-pt-400">{description}</p>
    </div>
  );
}
export default function UserDetail({ user }) {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(ROLE?.[0].name);
  const [isDelete, setIsDelete] = useState(false);
  const [segments, setSegments] = useState(null);
  const company = useSelector((state) => state.company.company);

  useEffect(() => {
    if (user && !!user.userId) {
      const role = ROLE.find((role) => role.name === user?.member?.role);
      setSelected(role.name);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      setSegments(user?.segment);
    }
  }, [user]);

  return (
    <>
      <div className="px-6 py-8">
        <div className="space-y-4">
          <h2 className="text-slate-800 dark:text-aa-200 purple:text-pt-200 text-base font-semibold tracking-sm">
            User Detail
          </h2>
          {!!user?.userId && (
            <div>
              <span className="inline-block text-slate-900 mb-1.5  dark:text-aa-200 purple:text-pt-200">
                Role
              </span>
              <RoleListBox
                roleSelected={selected}
                setRoleSelected={setSelected}
                onRoleChange={(role) => {
                  dispatch(
                    companyActions.updateCompanyMemberRole({
                      id: user?.member?._id,
                      email: user?.email,
                      role,
                      isRegistered: true,
                      companyId: company._id
                    })
                  );
                  realtime.send(user.userId, 'update-role', {
                    type: 'update-role',
                    role,
                    id: user?.member?._id,
                    companyId: company._id
                  });
                }}
              />
            </div>
          )}
          <div>
            <span className="inline-block text-slate-900 mb-1.5  dark:text-aa-200 purple:text-pt-200">
              User Segment
            </span>
            <BaseListBox
              value={segments}
              label={segments?.name}
              onChange={(value) => {
                setSegments(value);
                dispatch(
                  companyActions.updateCompanyUser({
                    _id: user?._id,
                    segment: value?._id
                  })
                );
              }}
              field="name"
              type="status"
              options={company?.userSegments}
              size="xxl"
              onReset={() => {
                setSegments(null);
                dispatch(
                  companyActions.updateCompanyUser({
                    _id: user?._id,
                    segment: null
                  })
                );
              }}
            />
          </div>
          {user?.provider && (
            <InfoCard title="Account Created" description={_.startCase(user?.provider)} />
          )}
          <InfoCard title="Email" description={user?.email} />
          <InfoCard title="Post" description={user?.ideaCount} />
          <InfoCard title="Comments" description={user?.commentCount} />
          <InfoCard title="Votes" description={user?.voteCount} />
          <InfoCard
            title="Joined"
            description={DateTime.fromISO(user?.createdAt)
              .setLocale('en')
              .toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY)}
          />
          <InfoCard
            title="Last Activity"
            description={DateTime.fromISO(user?.lastActivityAt)
              .setLocale('en')
              .toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY)}
          />

          <Divider className="my-8" />

          <Button
            type="button"
            text="Delete User"
            variant="indigo"
            size="sm"
            onClick={() => setIsDelete(!isDelete)}
            fullWidth
          />
        </div>
      </div>
      {/* Delete Modal */}
      <InfoModal
        show={isDelete}
        onClose={() => setIsDelete(!isDelete)}
        cancelOnClick={() => setIsDelete(!isDelete)}
        onConfirm={() => {
          dispatch(companyActions.deleteCompanyUser(user));
          setIsDelete(!isDelete);
          if (user?.member?._id) {
            realtime.send(user.userId, 'delete-membership', {
              companyId: company._id,
              userId: user.userId,
              companyName: company.name,
              name: user.name,
              id: user?.member?._id,
              isRegistered: true
            });
          } else {
            realtime.send(user.email, 'delete-company-user', {
              companyId: company._id,
              companyName: company.name,
              user
            });
          }
        }}
        icon={<Danger className="w-6 h-6 icon-red" />}
        title="Delete User"
        description="Are you sure you want to delete this user? This action cannot be undone."
        confirmText="Delete"
        confirmColor="red"
        canCancel
      />
    </>
  );
}
