import React, { useState } from 'react';
import SectionTitle from '@/components/SectionTitle';
import Button from '@/components/Button';
import Toggle from '@/components/Toggle';
import ConfirmDeleteModal from '@/components/ConfirmDeleteModal';
import { Trash } from '@/components/icons';
import { useDispatch, useSelector } from 'react-redux';
import { companyActions } from '@/redux/company/companySlice';
import Router from 'next/router';
import realtimeService from '@/utils/realtime';

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
  return (
    <div>
      <div className="pb-4 mb-11 border-b border-slate-200">
        <SectionTitle
          sectionTitle="Miscellaneous"
          sectionDescription="Other company settings."
          big
        />
      </div>
      <div className="max-w-2xl divide-y divide-slate-200">
        <div className="divide-y divide-slate-200">
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
        {/* <div className="flex items-center justify-between gap-4 py-14">
          <div>
            <h2 className="text-slate-800 text-base font-semibold tracking-sm">Import Ideas</h2>
            <p className="text-slate-500 text-sm">
              Kick-start your board by importing the{' '}
              <span className="text-indigo-700 font-medium">Starter Template.</span>
            </p>
          </div>
          <Button text="Import template" variant="blank" />
        </div> */}
        {company?.role === 'Owner' && (
          <div className="py-14 divide-y divide-slate-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-6">
              <div>
                <h2 className="text-slate-800 text-base font-semibold tracking-sm">
                  Delete all ideas
                </h2>
                <p className="text-slate-500 text-sm">
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
                <h2 className="text-slate-800 text-base font-semibold tracking-sm">
                  Delete company
                </h2>
                <p className="text-slate-500 text-sm">
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
      <ConfirmDeleteModal
        show={deleteCompanyConfirm}
        onClose={() => setDeleteCompanyConfirm(!deleteCompanyConfirm)}
        cancelOnClick={() => setDeleteCompanyConfirm(!deleteCompanyConfirm)}
        deleteOnClick={() => {
          setDeleteCompanyConfirm(!deleteCompanyConfirm);
          dispatch(
            companyActions.deleteCompany({
              companyId: company._id,
              onSuccess: (companies) => {
                try {
                  realtimeService.sendMessage(company._id, 'company-message', {
                    type: 'company-deleted',
                    sender: user._id,
                    companyId: company._id,
                    companyName: company.name
                  });
                  console.log(companies);
                  if (companies.length > 1) {
                    Router.push('/admin/select-company');
                  } else if (companies.length === 1) {
                    dispatch(companyActions.selectCompany(companies[0]));
                    Router.push('/admin/dashboard');
                  } else {
                    Router.push('/admin/create-company');
                  }
                } catch (e) {
                  console.log(e);
                }
              }
            })
          );
        }}
        icon={<Trash className="w-6 h-6 text-red-600" />}
        title="Delete company"
        description="Are you sure you want to delete this company? This action cannot be undone."
        companyName={company.name}
      />
    </div>
  );
}
