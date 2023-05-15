import React, { useEffect, useState } from 'react';
import BaseListBox from '@/components/BaseListBox';
import SectionTitle from '@/components/SectionTitle';
import { companyActions } from '@/redux/company/companySlice';
import { PRIORITY_TYPES } from 'constants';
import { useDispatch, useSelector } from 'react-redux';

export default function CompanyPriority() {
  const dispatch = useDispatch();
  const company = useSelector((state) => state.company.company);
  const [prioritySelected, setPrioritySelected] = useState(
    PRIORITY_TYPES.find((type) => type.value === company.priorityType)
  );

  const updateCompanyPriority = (fieldName, value) => {
    dispatch(
      companyActions.updateCompany({
        _id: company._id,
        [fieldName]: value
      })
    );
  };
  useEffect(() => {
    setPrioritySelected(PRIORITY_TYPES.find((type) => type.value === company.priorityType));
  }, [company?.priorityType]);
  return (
    <>
      <div className="pb-4 mb-8 border-b border-slate-200 dark:border-aa-600 purple:border-pt-800">
        <SectionTitle
          sectionTitle="Idea Prioritization"
          sectionDescription="Update your company idea prioritization."
        />
      </div>
      <BaseListBox
        value={prioritySelected}
        onChange={(selected) => {
          setPrioritySelected(selected);
          updateCompanyPriority('priorityType', selected);
        }}
        label={prioritySelected?.name}
        options={PRIORITY_TYPES}
        valueField="value"
        field="name"
        size="full"
      />
    </>
  );
}
