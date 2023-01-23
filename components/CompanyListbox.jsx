import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { companyActions } from '@/redux/company/companySlice';
import BaseListBox from './BaseListBox';

export default function CompanyListbox({
  title,
  setValue,
  value,
  options,
  label,
  actionType,
  fieldName
}) {
  const company = useSelector((state) => state.company.company);
  const dispatch = useDispatch();
  const onChange = (value) => {
    setValue(value);
    dispatch(
      companyActions.updateCompany({
        _id: company._id,
        [actionType]: {
          [fieldName]: value
        }
      })
    );
  };
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4">
      <span className="text-slate-800 dark:text-aa-100 purple:text-pt-100 text-sm font-medium tracking-sm">
        {title}
      </span>
      <BaseListBox value={value} onChange={onChange} label={label} options={options} size="xl" />
    </div>
  );
}
