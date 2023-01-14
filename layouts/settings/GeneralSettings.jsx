import SectionTitle from '@/components/SectionTitle';
import CompanyLogo from './GeneralSettings/CompanyLogo';
import CompanyName from './GeneralSettings/CompanyName';
import CompanyFavicon from './GeneralSettings/CompanyFavicon';
import CompanyDisplay from './GeneralSettings/CompanyDisplay';
import CompanySiteNavigation from './GeneralSettings/CompanySiteNavigation';

export default function GeneralFunctions() {
  return (
    <>
      <div className="pb-4 mb-11 border-b border-slate-200 dark:border-aa-600 purple:border-pt-600">
        <SectionTitle
          sectionTitle="General Settings"
          sectionDescription="Manage your company settings."
          big
        />
      </div>
      <div className="max-w-[510px]">
        <CompanyLogo />
        <hr className="my-8 border-slate-200 dark:border-aa-600 purple:border-pt-600" />
        <CompanyName />
        <hr className="my-8 border-slate-200 dark:border-aa-600 purple:border-pt-600" />
        <CompanyDisplay />
        <hr className="my-8 border-slate-200 dark:border-aa-600 purple:border-pt-600" />
        <CompanyFavicon />
        <hr className="my-8 border-slate-200 dark:border-aa-600 purple:border-pt-600" />
        <CompanySiteNavigation />
      </div>
    </>
  );
}
