import BaseListBox from '@/components/BaseListBox';
import InfoModal from '@/components/InfoModal';
import SectionTitle from '@/components/SectionTitle';
import Toggle from '@/components/Toggle';
import { companyActions } from '@/redux/company/companySlice';
import { COMPANY_VISIBILITY } from 'constants';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Email } from '@/components/icons';
import { ideaActions } from '@/redux/ideas/ideaSlice';

export default function Privacy() {
  const dispatch = useDispatch();
  const company = useSelector((state) => state.company.company);
  const [companySelected, setCompanySelected] = useState(
    COMPANY_VISIBILITY[company.privacy.isPublic ? 0 : 1]
  );
  const [userApproval, setUserApproval] = useState(company.privacy.userApproval);
  const [ideaApproval, setIdeaApproval] = useState(company.privacy.ideaApproval);
  const [ideaApproveModal, setIdeaApproveModal] = useState(false);
  useEffect(() => {
    setCompanySelected(COMPANY_VISIBILITY[company.privacy.isPublic ? 0 : 1]);
    setUserApproval(company.privacy.userApproval);
    setIdeaApproval(company.privacy.ideaApproval);
  }, [company]);
  const updateCompanyPrivacy = (fieldName, value) => {
    dispatch(
      companyActions.updateCompany({
        _id: company._id,
        privacy: {
          [fieldName]: value
        }
      })
    );
  };
  return (
    <div>
      <div className="pb-4 mb-10 lg:mb-11 border-b border-slate-200 dark:border-aa-600 purple:border-pt-800">
        <SectionTitle
          sectionTitle="Privacy"
          sectionDescription="Fine tune who has access to your company."
          big
        />
      </div>
      <div className="max-w-2xl">
        <div className="divide-y divide-slate-200 dark:divide-aa-600 purple:divide-pt-600">
          <div className="pb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <SectionTitle
                sectionTitle="Company visibility"
                sectionDescription="Select who sees your Ideas board, Roadmap and Announcements."
              />
              <BaseListBox
                value={companySelected}
                onChange={(selected) => {
                  setCompanySelected(selected);
                  updateCompanyPrivacy('isPublic', selected === 'Public');
                }}
                label={companySelected}
                options={COMPANY_VISIBILITY}
              />
            </div>
          </div>
          <div className="py-6">
            <Toggle
              title="User approval"
              description
              descriptionText="Approve users before they gain access to your board."
              enabled={userApproval}
              onChange={() => {
                setUserApproval(!userApproval);
                updateCompanyPrivacy('userApproval', !userApproval);
              }}
            />
          </div>
          <div className="py-6">
            <Toggle
              title="Idea approval"
              description
              descriptionText="Stop Ideas from going live on your board until you approve them."
              enabled={ideaApproval}
              onChange={() => {
                if (!ideaApproval) {
                  setIdeaApproveModal(true);
                } else {
                  setIdeaApproval(!ideaApproval);
                  updateCompanyPrivacy('ideaApproval', !ideaApproval);
                }
              }}
            />
          </div>
          {/* <div className="py-6">
            <Toggle
              title="Disable search engine indexing (Beta)"
              description
              descriptionText="Stop search engines indexing your content."
              value={companyPrivacy.disableSearchEngineIndexing}
            />
          </div> */}
        </div>
      </div>
      <InfoModal
        show={ideaApproveModal}
        title="Idea Approval"
        description="this change will approve all ideas pending approval."
        onConfirm={() => {
          setIdeaApproval(!ideaApproval);
          updateCompanyPrivacy('ideaApproval', !ideaApproval);
          dispatch(ideaActions.approveAllIdeas({ companyId: company._id }));
          setIdeaApproveModal(false);
        }}
        onClose={() => setIdeaApproveModal(false)}
        cancelOnClick={() => setIdeaApproveModal(false)}
        icon={<Email className="w-6 h-6 text-indigo-600" />}
        confirmColor="indigo"
        canCancel
      />
    </div>
  );
}
