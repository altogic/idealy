import Avatar from '@/components/Avatar';
import Button from '@/components/Button';
import EmptyState from '@/components/EmptyState';
import SectionTitle from '@/components/SectionTitle';
import useNotification from '@/hooks/useNotification';
import { companyActions } from '@/redux/company/companySlice';
import { useDispatch, useSelector } from 'react-redux';
import { Check, Close } from '@/components/icons';

export default function RequestAccess() {
  const dispatch = useDispatch();
  const accessRequests = useSelector((state) => state.company.accessRequests);
  const company = useSelector((state) => state.company.company);
  const sendNotification = useNotification();
  return (
    <div>
      <div className="pb-4 mb-10 lg:mb-11 border-b border-slate-200 dark:border-aa-600 purple:border-pt-800">
        <SectionTitle
          sectionTitle="Request Access"
          sectionDescription="Access requests for your company."
          big
        />
      </div>
      <div className="max-w-2xl">
        {accessRequests.length > 0 ? (
          <div className="flex flex-col gap-4">
            {accessRequests.map((request) => (
              <div
                className="group flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white dark:bg-aa-900 purple:bg-pt-1000 p-4 transition hover:bg-slate-50 dark:hover:bg-aa-700 purple:hover:bg-pt-600"
                key={request._id}>
                <div className="flex items-center gap-3 max-w-[250px] w-full">
                  <Avatar
                    className="flex-shrink-0 w-[50px] h-[50px] rounded-full"
                    src={request?.user.profilePicture}
                    alt={request.user.name}
                  />

                  <h6
                    className="max-w-[188px] text-slate-700 dark:text-aa-200 purple:text-pt-200 text-base font-medium tracking-sm truncate"
                    title={request?.user.name}>
                    {request?.user.name}
                  </h6>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    text="Approve"
                    icon={<Check className="w-4 h-4 icon-slate" />}
                    variant="indigo"
                    size="sm"
                    height="8"
                    onClick={() =>
                      dispatch(
                        companyActions.approveCompanyAccessRequest({
                          companyId: company._id,
                          user: request.user._id,
                          id: request._id,
                          companyName: company.name,
                          userEmail: request.user.email,
                          onSuccess: () => {
                            sendNotification({
                              targetUser: request.user._id,
                              message: `Your access request for  <b>${company.name}</b> has been approved.`,
                              type: 'accountApproval',
                              url: '/public-view'
                            });
                          }
                        })
                      )
                    }
                  />
                  <Button
                    type="button"
                    text="Reject"
                    icon={<Close className="w-4 h-4 icon-slate" />}
                    variant="red"
                    size="sm"
                    height="8"
                    onClick={() =>
                      dispatch(
                        companyActions.rejectCompanyAccessRequest({
                          id: request._id,
                          user: request.user._id,
                          onSuccess: () => {
                            sendNotification({
                              targetUser: request.user._id,
                              message: `Your access request for <b>${company.name}</b> has been rejected.`,
                              type: 'accountApproval',
                              url: '/public-view'
                            });
                          }
                        })
                      )
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState title="No Request" description="You dot not have any request for access." />
        )}
      </div>
    </div>
  );
}
