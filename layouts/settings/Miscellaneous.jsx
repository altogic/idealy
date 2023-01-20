import React, { useEffect, useState } from 'react';
import SectionTitle from '@/components/SectionTitle';
import Button from '@/components/Button';
import Toggle from '@/components/Toggle';
import { Trash } from '@/components/icons';
import { useDispatch, useSelector } from 'react-redux';
import { companyActions } from '@/redux/company/companySlice';
import Router from 'next/router';
import { realtime } from '@/utils/altogic';
import { generateUrl } from '@/utils/index';
import CompanyDeleteModal from '@/components/CompanyDeleteModal';

export default function Miscellaneous() {
  const [deleteCompanyConfirm, setDeleteCompanyConfirm] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const company = useSelector((state) => state.company.company);
  const deleteIdeaLoading = useSelector((state) => state.company.deleteIdeaLoading);
  const dispatch = useDispatch();
  const [disableCommentReactions, setDisableCommentReactions] = useState(
    company.miscellaneous.disableCommentReactions
  );
  const [disableAnnouncementReactions, setDisableAnnouncementReactions] = useState(
    company.miscellaneous.disableAnnouncementReactions
  );
  const updateCompanyInfo = (fieldName, value) => {
    dispatch(
      companyActions.updateCompany({
        _id: company._id,
        miscellaneous: {
          [fieldName]: value
        }
      })
    );
  };
  useEffect(() => {
    if (company) {
      setDisableCommentReactions(company.miscellaneous.disableCommentReactions);
      setDisableAnnouncementReactions(company.miscellaneous.disableAnnouncementReactions);
    }
  }, [company]);
  return (
    <div>
      <div className="pb-4 mb-10 lg:mb-11 border-b border-slate-200 dark:border-aa-600 purple:border-pt-800">
        <SectionTitle
          sectionTitle="Miscellaneous"
          sectionDescription="Other company settings."
          big
        />
      </div>
      <div className="max-w-2xl divide-y divide-slate-200 dark:divide-aa-600 purple:divide-pt-600">
        <div className="divide-y divide-slate-200 dark:divide-aa-600 purple:divide-pt-600">
          <div className="pb-6">
            <SectionTitle sectionTitle="Company settings" />
          </div>
          <div className="py-6">
            <Toggle
              title="Disable Announcements reactions"
              description
              descriptionText="Turn off reactions on Announcements"
              enabled={disableAnnouncementReactions}
              onChange={() => {
                setDisableAnnouncementReactions(!disableAnnouncementReactions);
                updateCompanyInfo('disableAnnouncementReactions', !disableAnnouncementReactions);
              }}
            />
          </div>
          <div className="py-6">
            <Toggle
              title="Disable comment reactions"
              description
              descriptionText="Turn off reactions on comments"
              enabled={disableCommentReactions}
              onChange={() => {
                setDisableCommentReactions(!disableCommentReactions);
                updateCompanyInfo('disableCommentReactions', !disableCommentReactions);
              }}
            />
          </div>
        </div>
        {company?.role === 'Owner' && (
          <div className="py-14 divide-y divide-slate-200 dark:divide-aa-600 purple:divide-pt-600">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-6">
              <div>
                <h2 className="text-slate-800 dark:text-aa-100 purple:text-pt-100 text-base font-semibold tracking-sm">
                  Delete all ideas
                </h2>
                <p className="text-slate-500 dark:text-aa-300 purple:text-pt-300 text-sm">
                  Once you delete Ideas, there is no going back. Please be certain.
                </p>
              </div>
              <Button
                text="Delete all ideas"
                variant="blankRed"
                loading={deleteIdeaLoading}
                onClick={() => dispatch(companyActions.deleteAllIdeas(company._id))}
              />
            </div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-6">
              <div>
                <h2 className="text-slate-800 dark:text-aa-100 purple:text-pt-100 text-base font-semibold tracking-sm">
                  Delete company
                </h2>
                <p className="text-slate-500 dark:text-aa-300 purple:text-pt-300 text-sm">
                  Including all Ideas and Announcements. This cannot be undone.
                </p>
              </div>
              <Button
                text="Delete company"
                variant="blankRed"
                onClick={() => setDeleteCompanyConfirm(!deleteCompanyConfirm)}
              />
            </div>
          </div>
        )}
      </div>
      <CompanyDeleteModal
        show={deleteCompanyConfirm}
        onClose={() => setDeleteCompanyConfirm(!deleteCompanyConfirm)}
        cancelOnClick={() => setDeleteCompanyConfirm(!deleteCompanyConfirm)}
        deleteOnClick={() => {
          setDeleteCompanyConfirm(!deleteCompanyConfirm);
          dispatch(
            companyActions.deleteCompany({
              companyId: company._id,
              onSuccess: (companies) => {
                realtime.send(company._id, 'company-deleted', {
                  sender: user._id,
                  companyId: company._id,
                  companyName: company.name
                });

                if (companies.length > 1) {
                  Router.push(generateUrl('select-company'));
                } else if (companies.length === 1) {
                  Router.push(generateUrl('dashboard', company.subdomain));
                } else {
                  Router.push(generateUrl('create-new-company'));
                }
              }
            })
          );
        }}
        icon={<Trash className="w-6 h-6 text-red-600 dark:text-red-700 purple:text-red-700" />}
        title="Delete company"
        description="Are you sure you want to delete this company? This action cannot be undone."
        companyName={company.name}
      />
    </div>
  );
}
