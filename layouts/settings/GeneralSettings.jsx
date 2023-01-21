import SectionTitle from '@/components/SectionTitle';
import Divider from '@/components/Divider';
import CompanyLogo from './GeneralSettings/CompanyLogo';
import CompanyName from './GeneralSettings/CompanyName';
import CompanyFavicon from './GeneralSettings/CompanyFavicon';
import CompanyDisplay from './GeneralSettings/CompanyDisplay';
import CompanySiteNavigation from './GeneralSettings/CompanySiteNavigation';

export default function GeneralFunctions() {
  return (
    <>
      <div className="pb-4 mb-11 border-b border-slate-200 dark:border-aa-600 purple:border-pt-800">
        <SectionTitle
          sectionTitle="General Settings"
          sectionDescription="Manage your company settings."
          big
        />
      </div>
      <div className="max-w-[510px]">
        <CompanyLogo />
        <Divider />
        <CompanyName />
        <Divider />
        <CompanyDisplay />
        <Divider />
        <CompanyFavicon />
        <Divider />
        <CompanySiteNavigation />
      </div>
    </>
  );
}
