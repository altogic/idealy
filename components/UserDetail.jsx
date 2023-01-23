import { ROLE } from 'constants';
import { useState } from 'react';
import Button from './Button';
import { Danger } from './icons';
import InfoModal from './InfoModal';
import RoleListBox from './RoleListBox';
import Divider from './Divider';

function InfoCard({ title, description }) {
  return (
    <div className="text-sm font-medium tracking-sm">
      <h6 className="text-slate-400 mb-1">{title}</h6>
      <p className="text-slate-800">{description}</p>
    </div>
  );
}

export default function UserDetail() {
  const [selected, setSelected] = useState(ROLE[0]);
  const [isDelete, setIsDelete] = useState(false);

  return (
    <>
      <div>
        <div className="space-y-4">
          <h2 className="text-slate-800 text-base font-semibold tracking-sm">User Detail</h2>
          <div>
            <span className="inline-block text-slate-900 mb-1.5">Role</span>
            <RoleListBox roleSelected={selected} setRoleSelected={setSelected} />
          </div>
          <InfoCard title="Account Created" description="Unknown" />
          <InfoCard title="Email" description="sayhi@hithemes.io" />
          <InfoCard title="Post" description="12345" />
          <InfoCard title="Comments" description="1234567" />
          <InfoCard title="Votes" description="234132423" />
          <InfoCard title="User ID" description="1" />
          <InfoCard title="Last Activity" description="A week ago" />
          <InfoCard title="Browser" description="Chrome" />
          <InfoCard title="OS" description="OS X 10.15.4 65-bit" />
          <Divider />

          <div className="grid grid-cols-2 gap-4">
            <Button
              type="button"
              text="Delete & Ban User"
              variant="blank"
              size="sm"
              onClick={() => setIsDelete(!isDelete)}
            />
            <Button
              type="button"
              text="Delete User"
              variant="indigo"
              size="sm"
              onClick={() => setIsDelete(!isDelete)}
            />
          </div>
        </div>
      </div>
      {/* Delete Modal */}
      <InfoModal
        show={isDelete}
        onClose={() => setIsDelete(!isDelete)}
        cancelOnClick={() => setIsDelete(!isDelete)}
        onConfirm={() => setIsDelete(!isDelete)}
        icon={<Danger className="w-6 h-6 text-red-600" />}
        title="Delete post"
        description="Are you sure you want to delete this post? This action cannot be undone."
        confirmText="Delete"
        confirmColor="red"
        canCancel
      />
    </>
  );
}
