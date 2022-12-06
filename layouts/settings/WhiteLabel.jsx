import React, { useState } from 'react';
import SectionTitle from '@/components/SectionTitle';
import Toggle from '@/components/Toggle';
import { useDispatch, useSelector } from 'react-redux';
import { companyActions } from '@/redux/company/companySlice';

export default function WhiteLabel() {
  const dispatch = useDispatch();
  const company = useSelector((state) => state.company.company);

  const [canCreateCompany, setCanCreateCompany] = useState(!company.whiteLabel.canCreateCompany);
  const [isHideBanner, setIsHideBanner] = useState(company.whiteLabel.isHideBanner);

  const updateCompanyWhiteLabel = (fieldName, value) => {
    dispatch(
      companyActions.updateCompanyProperties({
        id: company.whiteLabel._id,
        property: 'whiteLabel',
        fieldName,
        value
      })
    );
  };
  return (
    <div>
      <div className="pb-4 mb-10 lg:mb-11 border-b border-slate-200">
        <SectionTitle
          sectionTitle="White Label"
          sectionDescription="Personalize Frill to be your own."
          big
        />
      </div>
      <div className="max-w-2xl">
        <div className="bg-slate-100 text-slate-500 py-6 px-8 text-sm font-semibold tracking-sm rounded-lg">
          White Labelling features are a paid Add-on.{' '}
          <a href="#" className="text-indigo-700">
            Compare plans
          </a>
        </div>
        <h2 className="text-slate-800 py-6 text-xl font-semibold tracking-md border-b border-slate-200">
          White Labeling settings
        </h2>
        <div className="py-6 border-b border-slate-200">
          <Toggle
            title={`Powered by ${process.env.appName}`}
            description
            descriptionText={`Hide 'Powered by ${process.env.url}' banner`}
            enabled={isHideBanner}
            onChange={() => {
              setIsHideBanner(!isHideBanner);
              updateCompanyWhiteLabel('isHideBanner', !isHideBanner);
            }}
          />
        </div>
        <div className="py-6 border-b border-slate-200">
          <Toggle
            title="Create a company"
            description
            descriptionText="Remove the  'Create a company' link from the member menu"
            enabled={canCreateCompany}
            onChange={() => {
              setCanCreateCompany(!canCreateCompany);
              updateCompanyWhiteLabel('canCreateCompany', canCreateCompany);
            }}
          />
        </div>
      </div>
    </div>
  );
}
