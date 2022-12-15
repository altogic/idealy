import React from 'react';
import { Plus } from '@/components/icons';
import Link from 'next/link';
import CompanyAvatar from './CompanyAvatar';
import { generateUrl } from '../utils';

export default function CompanyButton({ icon, company, label, ...props }) {
  return (
    <Link
      href={
        company ? generateUrl('dashboard', company.subdomain) : generateUrl('create-new-company')
      }
      {...props}>
      <a className="group inline-flex flex-col items-center justify-center transform transition ease-linear duration-150 hover:scale-105 hover:drop-shadow-xl company-button">
        {label ? (
          <div className="inline-flex items-center justify-center w-[88px] h-[88px] mb-4 rounded-full overflow-hidden border border-slate-500 transition ease-linear duration-150 group-hover:border-indigo-700">
            <Plus className="w-6 h-6 text-slate-900" />
          </div>
        ) : (
          <div className="inline-flex items-center justify-center w-[88px] h-[88px] mb-4 rounded-lg overflow-hidden transition ease-linear duration-150 group-hover:border-indigo-700">
            <CompanyAvatar
              logoUrl={company?.logoUrl}
              name={company?.name}
              className="text-2xl"
              size="w-[88px] h-[88px]"
            />
          </div>
        )}
        <p className="flex flex-col items-center justify-center gap-1">
          <span className="text-slate-700 text-base font-semibold tracking-sm">
            {company?.name || label}
          </span>
          <span className="text-slate-700 text-sm tracking-sm">{company?.role}</span>
        </p>
      </a>
    </Link>
  );
}
