import { ChevronLeft, ChevronRight } from '@/components/icons';
import { companyActions } from '@/redux/company/companySlice';
import cn from 'classnames';
import { SUBDOMAIN_REGEX } from 'constants';
import _ from 'lodash';
import Router from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generateUrl } from '../utils';
import Button from './Button';

export default function Wizard({ children, activePageIndex, setActivePageIndex, userIp }) {
  const pages = React.Children.toArray(children);
  const currentPage = pages[activePageIndex];
  const companyWillBeCreated = useSelector((state) => state.company.companyWillBeCreated);
  const subdomain = useSelector((state) => state.company.subdomain);
  const companyNameLoading = useSelector((state) => state.company.companyNameLoading);
  const subdomainLoading = useSelector((state) => state.company.subdomainLoading);
  const error = useSelector((state) => state.company.error);
  const idea = useSelector((state) => state.company.idea);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.company.isLoading);
  const companies = useSelector((state) => state.company.companies);

  const submitCompany = () => {
    if (error.length || subdomainLoading || companyNameLoading) {
      return;
    }
    dispatch(
      companyActions.createCompany({
        userId: user._id,
        userIp,
        onSuccess: (company) => Router.push(generateUrl('public-view', company.subdomain))
      })
    );
  };

  const nextPage = () => {
    if (error.length || subdomainLoading || companyNameLoading) {
      return;
    }
    if (activePageIndex === 0 && !companyWillBeCreated) {
      dispatch(
        companyActions.setCompanyError({
          field: 'companyName',
          message: 'Company name is required'
        })
      );
      return;
    }
    if (activePageIndex === 0 && !subdomain) {
      dispatch(
        companyActions.setCompanyError({
          field: 'subdomain',
          message:
            'Subdomain can only contain lowercase letters and numbers and must be between 3 and 20 characters long'
        })
      );
      return;
    }
    if (!SUBDOMAIN_REGEX.test(subdomain)) {
      dispatch(
        companyActions.setCompanyError({
          field: 'subdomain',
          message: 'Subdomain can only contain lowercase letters and numbers'
        })
      );
      return;
    }
    if (activePageIndex === 1 && !idea) {
      dispatch(companyActions.setCompanyError({ field: 'idea', message: 'Idea is required' }));
      return;
    }
    if (
      (activePageIndex === 0 && companyWillBeCreated && subdomain) ||
      (activePageIndex === 1 && idea) ||
      activePageIndex > 1
    ) {
      setActivePageIndex((index) => (index === 5 ? 5 : index + 1));
    }

    if (activePageIndex >= 3) {
      submitCompany();
    }
  };

  const prevPage = () => {
    setActivePageIndex((index) => index - 1);
  };
  const handleCancel = () => {
    if (companies.length > 0) {
      Router.push('/select-company');
    } else {
      Router.back();
    }
  };

  return (
    <div className="w-full bg-slate-100 px-4 py-10 md:p-[72px] rounded-2xl">
      <div>
        {activePageIndex <= 3 ? currentPage : pages[3]}
        {activePageIndex >= 0 ? (
          <Button
            type="button"
            loading={loading}
            className={cn(
              `flex items-center justify-center w-full bg-indigo-700 text-white px-4 py-3 my-6 text-base font-medium tracking-sm border border-indigo-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2`
            )}
            onClick={nextPage}
            text={activePageIndex >= 3 ? `Submit` : `Continue`}
          />
        ) : null}
      </div>
      <div
        className={cn(
          `flex items-center w-full`,
          activePageIndex > 0 ? 'justify-between' : 'justify-center'
        )}>
        {activePageIndex === 0 && companies?.length ? (
          <button
            type="button"
            className="inline-flex items-center text-slate-500"
            onClick={handleCancel}>
            <ChevronLeft className="w-6 h-6" />
            Cancel
          </button>
        ) : null}
        {activePageIndex > 0 ? (
          <button
            type="button"
            className="inline-flex items-center text-slate-500"
            onClick={prevPage}
            disabled={_.isNil(companyWillBeCreated)}>
            <ChevronLeft className="w-6 h-6" />
            Back
          </button>
        ) : null}
        {activePageIndex > 0 && activePageIndex < 3 ? (
          <button
            type="button"
            className="inline-flex items-center text-slate-500"
            onClick={submitCompany}>
            Skip now
            <ChevronRight className="w-6 h-6" />
          </button>
        ) : null}
      </div>
    </div>
  );
}
