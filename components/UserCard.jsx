import { toggleFeedBackDetailModal } from '@/redux/general/generalSlice';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from './Avatar';
import Button from './Button';

export default function UserCard({ name, profilePicture, email, className, style, id }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const company = useSelector((state) => state.company.company);
  const feedBackDetailModal = useSelector((state) => state.general.feedBackDetailModal);
  return (
    <div
      id={id}
      className={`user-card z-50 absolute hidden items-center justify-center text-left gap-4 p-4 bg-white border border-gray-200 rounded-lg dark:bg-aa-900 purple:bg-pt-1000 dark:border-aa-600 purple:border-pt-800 ${className}`}
      style={style}>
      <Avatar src={profilePicture} alt={name} />
      <div className="flex flex-col">
        <h5 className="text-sm text-slate-900 dark:text-aa-200 purple:text-pt-200">{name}</h5>
        <span className="text-xs text-slate-500 dark:text-aa-200 purple:text-pt-200">{email}</span>
      </div>

      {company?.role && company?.role !== 'Guest' && email && (
        <Button
          text="View Profile"
          variant="indigo"
          size="xs"
          onClick={() => {
            console.log('clicked', feedBackDetailModal);
            if (feedBackDetailModal) dispatch(toggleFeedBackDetailModal());
            router.push(`/users?email=${email}`);
          }}
        />
      )}
    </div>
  );
}
