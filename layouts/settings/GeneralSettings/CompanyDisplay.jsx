import BaseListBox from '@/components/BaseListBox';
import SectionTitle from '@/components/SectionTitle';
import { companyActions } from '@/redux/company/companySlice';
import { DISPLAY_COMPANY_ASSETS } from 'constants';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function CompanyDisplay() {
  const dispatch = useDispatch();
  const company = useSelector((state) => state.company.company);
  const [displaySelected, setDisplaySelected] = useState(
    DISPLAY_COMPANY_ASSETS[company.showCompanyName ? 0 : 1]
  );

  const updateCompanyDisplay = (fieldName, value) => {
    dispatch(
      companyActions.updateCompany({
        _id: company._id,
        [fieldName]: value
      })
    );
  };
  useEffect(() => {
    setDisplaySelected(DISPLAY_COMPANY_ASSETS[company.showCompanyName ? 0 : 1]);
  }, [company]);

  return (
    <>
      <div className="pb-4 mb-8 border-b border-slate-200 dark:border-aa-600 purple:border-pt-800">
        <SectionTitle
          sectionTitle="Company Display"
          sectionDescription="Update your company display assets."
        />
      </div>
      <BaseListBox
        value={displaySelected}
        onChange={(selected) => {
          setDisplaySelected(selected);
          updateCompanyDisplay('showCompanyName', selected === 'Show logo & company name');
        }}
        label={displaySelected}
        options={DISPLAY_COMPANY_ASSETS}
        size="full"
      />
    </>
  );
}
