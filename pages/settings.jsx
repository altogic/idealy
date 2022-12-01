import { useState, useEffect } from 'react';
import { Tab } from '@headlessui/react';
import cn from 'classnames';
import Head from 'next/head';
import Layout from '@/components/Layout';
import Profile from '@/layouts/settings/Profile';
import Notification from '@/layouts/settings/Notification';
import SavedFilter from '@/layouts/settings/SavedFilter';
import GeneralSettings from '@/layouts/settings/GeneralSettings';
import Topics from '@/layouts/settings/Topics';
import Statuses from '@/layouts/settings/Statuses';
import Categories from '@/layouts/settings/Categories';
import RoadMaps from '@/layouts/settings/RoadMaps';
import InviteTeam from '@/layouts/settings/InviteTeam';
import Privacy from '@/layouts/settings/Privacy';
import WhiteLabel from '@/layouts/settings/WhiteLabel';
import Authentication from '@/layouts/settings/Authentication';
import Miscellaneous from '@/layouts/settings/Miscellaneous';
import { useRouter } from 'next/router';
import { PROFILE_TABS, COMPANY_TABS } from 'constants';
import { useSelector } from 'react-redux';
import _ from 'lodash';

export default function Settings() {
  const [loading, setLoading] = useState(true);
  const [tabIndex, setTabIndex] = useState();
  const [profileTabs, setProfileTabs] = useState();
  const [companyTabs, setCompanyTabs] = useState();
  const router = useRouter();
  const company = useSelector((state) => state.company.company);
  useEffect(() => {
    if (router.query?.tab) {
      const filteredCompanyTabs = COMPANY_TABS.filter((tab) => tab.roles.includes(company?.role));
      const tabs = [...PROFILE_TABS, ...filteredCompanyTabs];
      const index = tabs.findIndex((tab) => tab.name.toLowerCase() === router.query.tab);
      setTabIndex(index);
    }
  }, [router, company]);

  useEffect(() => {
    if (PROFILE_TABS) {
      setProfileTabs(PROFILE_TABS);
    }
    if (COMPANY_TABS) {
      setCompanyTabs(COMPANY_TABS);
    }
  }, [PROFILE_TABS, COMPANY_TABS]);
  useEffect(() => {
    if (!_.isNil(tabIndex) && tabIndex !== -1) {
      setLoading(false);
    }
  }, [tabIndex]);
  const handleTabChange = (tabName) => {
    router.push(`/settings?tab=${tabName.toLowerCase()}`, undefined, { shallow: true });
  };
  return (
    <>
      <Head>
        <title>Altogic Canny Alternative Settings</title>
        <meta name="description" content="Altogic Canny Alternative Settings" />
      </Head>
      <Layout>
        {!loading && (
          <div className="max-w-screen-xl mx-auto">
            <div className="grid grid-cols-[250px,1fr] xl:grid-cols-[350px,1fr]">
              <Tab.Group selectedIndex={tabIndex}>
                <Tab.List className="flex flex-col gap-1 px-6 border-r border-gray-300">
                  <h2 className="text-slate-800 p-4 mt-10 xl:mt-16 mb-3 text-base font-medium tracking-sm border-b border-slate-200">
                    You
                  </h2>
                  {profileTabs?.map((tab) => (
                    <Tab
                      className={({ selected }) =>
                        cn(
                          'px-4 py-3 text-sm font-medium tracking-sm border-2 rounded-md text-left focus:outline-none',
                          selected
                            ? 'bg-slate-50 text-slate-700 border-indigo-700'
                            : 'text-slate-500 border-transparent'
                        )
                      }
                      key={tab.id}
                      onClick={() => handleTabChange(tab.name)}>
                      {tab.name}
                    </Tab>
                  ))}
                  {company?.role !== 'Moderator' && (
                    <h2 className="text-slate-800 p-4 mt-16 mb-3 text-base font-medium tracking-sm border-b border-slate-200">
                      {company?.name}
                    </h2>
                  )}
                  {companyTabs?.map(
                    (tab) =>
                      tab.roles.includes(company?.role) && (
                        <Tab
                          className={({ selected }) =>
                            cn(
                              'px-4 py-3 text-sm font-medium tracking-sm border-2 rounded-md text-left focus:outline-none',
                              selected
                                ? 'bg-slate-50 text-slate-700 border-indigo-700'
                                : 'text-slate-500 border-transparent'
                            )
                          }
                          key={tab.id}
                          onClick={() => handleTabChange(tab.name)}>
                          {tab.name}
                        </Tab>
                      )
                  )}
                </Tab.List>
                <Tab.Panels className="p-10 xl:px-20 xl:py-16">
                  {/* Profile */}
                  <Tab.Panel>
                    <Profile />
                  </Tab.Panel>
                  {/* Notification */}
                  <Tab.Panel>
                    <Notification />
                  </Tab.Panel>
                  {/* Saved Filter */}
                  <Tab.Panel>
                    <SavedFilter />
                  </Tab.Panel>
                  {/* General Settings */}
                  {company?.role !== 'Moderator' && (
                    <Tab.Panel>
                      <GeneralSettings />
                    </Tab.Panel>
                  )}
                  {company?.role === 'Owner' && (
                    <>
                      <Tab.Panel>Billing</Tab.Panel>
                      <Tab.Panel>Upgrade</Tab.Panel>
                    </>
                  )}
                  {company?.role !== 'Moderator' && (
                    <>
                      <Tab.Panel>Themes</Tab.Panel>
                      {/* Invite Team" */}
                      <Tab.Panel>
                        <InviteTeam />
                      </Tab.Panel>
                      {/* Topics */}
                      <Tab.Panel>
                        <Topics />
                      </Tab.Panel>
                      {/* Statusses */}
                      <Tab.Panel>
                        <Statuses />
                      </Tab.Panel>
                      {/* Categories */}
                      <Tab.Panel>
                        <Categories />
                      </Tab.Panel>
                      {/* Roadmaps */}
                      <Tab.Panel>
                        <RoadMaps />
                      </Tab.Panel>
                      {/* Privacy */}
                      <Tab.Panel>
                        <Privacy />
                      </Tab.Panel>
                      {/* White Labeling */}
                      <Tab.Panel>
                        <WhiteLabel companyWhiteLabel={company?.whiteLabel} />
                      </Tab.Panel>
                      {/* Authentication */}
                      <Tab.Panel>
                        <Authentication />
                      </Tab.Panel>
                      {/* Miscellaneous */}
                      <Tab.Panel>
                        <Miscellaneous />
                      </Tab.Panel>
                    </>
                  )}
                </Tab.Panels>
              </Tab.Group>
            </div>
          </div>
        )}
      </Layout>
    </>
  );
}
