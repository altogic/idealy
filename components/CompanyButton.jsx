import React from 'react';
import { companyActions } from '@/redux/company/companySlice';
import Router from 'next/router';
import { useDispatch } from 'react-redux';
import { Plus } from '@/components/icons';
import CompanyAvatar from './CompanyAvatar';

export default function CompanyButton({ icon, company, label, ...props }) {
  const dispatch = useDispatch();

  const handleCompanyClick = () => {
    if (company) {
      dispatch(companyActions.selectCompany(company));
      Router.push('/admin/dashboard');
    } else {
      Router.push('/admin/create-new-company');
    }
  };
  return (
    <button
      onClick={handleCompanyClick}
      type="button"
      className="group inline-flex flex-col items-center justify-center transform transition ease-linear duration-150 hover:scale-105 hover:drop-shadow-xl company-button"
      {...props}>
      {label && (
        <div className="inline-flex items-center justify-center w-[88px] h-[88px] mb-4 rounded-full overflow-hidden border border-slate-500 transition ease-linear duration-150 group-hover:border-indigo-700">
          <Plus className="w-6 h-6 text-slate-900" />
        </div>
      )}
      {!label && (
        <div className="inline-flex items-center justify-center w-[88px] h-[88px] mb-4 rounded-lg overflow-hidden transition ease-linear duration-150 group-hover:border-indigo-700">
          <CompanyAvatar
            logoUrl={company?.logoUrl}
            name={company?.name}
            className="w-[88px] h-[88px] text-2xl "
          />
        </div>
      )}
      <p className="flex flex-col items-center justify-center gap-1">
        <span className="text-slate-700 text-base font-semibold tracking-sm">
          {company?.name || label}
        </span>
        <span className="text-slate-700 text-sm tracking-sm">{company?.role}</span>
      </p>
    </button>
  );
}
