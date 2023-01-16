import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '@/redux/auth/authSlice';
import cn from 'classnames';
import SectionTitle from '@/components/SectionTitle';
import SettingsActionCard from '@/components/SettingsActionCard';
import EmptyState from '@/components/EmptyState';

export default function SavedFilter() {
  const dispatch = useDispatch();
  const _user = useSelector((state) => state.auth.user);
  const [user, setUser] = useState();

  useEffect(() => {
    if (_user) {
      setUser(_user);
    }
  }, [_user]);

  return (
    <>
      <div className="pb-4 mb-11 border-b border-slate-200 dark:border-aa-600 purple:border-pt-800">
        <SectionTitle
          sectionTitle="Saved Filters"
          sectionDescription="You can delete or rename your saved filters."
          big
        />
      </div>
      <div className={cn(user?.savedFilters?.length > 0 ? `max-w-lg` : `max-w-full`)}>
        {user?.savedFilters?.length > 0 ? (
          <div>
            {user?.savedFilters?.map((filter) => (
              <SettingsActionCard
                key={filter._id}
                id={filter._id}
                title={filter.name}
                modalTitle="Delete Filter"
                modalDescription="Are you sure you want to delete this filter? This action cannot be undone."
                deleteAction={() =>
                  dispatch(
                    authActions.removeFilters({
                      filter: filter._id
                    })
                  )
                }
                editAction={authActions.updateSavedFilters}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No data found"
            description="You do not have any saved filters yet. To save a new filter, you can use the admin/moderator view of the Feedback panel. "
          />
        )}
      </div>
    </>
  );
}
