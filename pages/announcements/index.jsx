/* eslint-disable react/no-array-index-key */
import AnnouncementCard from '@/components/Announcement/AnnouncementCard';
import BaseListBox from '@/components/BaseListBox';
import Button from '@/components/Button';
import Divider from '@/components/Divider';
import EmptyState from '@/components/EmptyState';
import Errors from '@/components/Errors';
import InfiniteScroll from '@/components/InfiniteScroll';
import Layout from '@/components/Layout';
import SearchInput from '@/components/SearchInput';
import { FilterHamburger, Plus } from '@/components/icons';
import useDebounce from '@/hooks/useDebounce';
import { announcementActions } from '@/redux/announcement/announcementSlice';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ideaActions } from '@/redux/ideas/ideaSlice';
import { toggleFeedBackDetailModal } from '@/redux/general/generalSlice';
import IdeaDetail from '@/components/Idea/IdeaDetail';
import useOpenFeedbackModal from '@/hooks/useOpenFeedbackModal';
import AnnouncementSkeleton from '@/components/Announcement/AnnouncementSkeleton';
import Head from 'next/head';

export default function Announcements() {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    announcements,
    countInfo,
    getAnnouncementLoading: isLoading
  } = useSelector((state) => state.announcement);
  const { company, isGuest } = useSelector((state) => state.company);
  const { user, guestInfo, userIp } = useSelector((state) => state.auth);

  const { selectedIdea } = useSelector((state) => state.idea);
  const [filterCategories, setFilterCategories] = useState([]);
  const [error, setError] = useState();
  const [searchText, setSearchText] = useState('');
  useOpenFeedbackModal();
  useDebounce(searchText, () => {
    if (router.isReady) {
      router.push({
        pathname: router.pathname,
        query: {
          ...router.query,
          search: searchText
        }
      });
    }
  });

  function onSearchChange(value) {
    setSearchText(value);
    if (!value) {
      delete router.query.search;
      router.push({
        pathname: router.pathname,
        query: {
          ...router.query
        }
      });
    }
  }

  function setCategoryQuery() {
    const queryArray = [];
    filterCategories.forEach((category) => {
      queryArray.push(`IN(this.categories,'${category._id}')`);
    });
    return `(${queryArray.join(' || ')})`;
  }

  const handleFilterCategoriesChange = (value) => {
    if (value) {
      router.push({
        pathname: router.pathname,
        query: {
          ...router.query,
          categories: value.map((category) => category.name).join(',')
        }
      });
    } else {
      delete router.query.categories;
      router.push({
        pathname: router.pathname,
        query: {
          ...router.query
        }
      });
    }
  };

  const getAnnouncements = useCallback(() => {
    if (router.isReady && company?._id) {
      dispatch(
        announcementActions.getAnnouncements({
          filter: [
            `this.company == '${company._id}'`,
            isGuest
              ? `this.isPublished == true && this.publishDate <= DATEVALUE('${new Date().toISOString()}')`
              : '',
            filterCategories.length && setCategoryQuery()
          ]
            .filter(Boolean)
            .join(' && '),
          page: router.query.page || 1,
          search: router.query.search
        })
      );
    }
  }, [filterCategories, router.query.page, router.query.search]);

  useEffect(() => {
    const { categories, search } = router.query;
    setFilterCategories(
      company?.categories.filter((category) => categories?.includes(category.name))
    );
    setSearchText(search || '');
  }, [router.query.categories, company]);

  useEffect(() => {
    if (company) {
      dispatch(
        announcementActions.getAnnouncementReactions({
          filter: [
            `this.companyId == '${company?._id}'`,
            user
              ? `this.userId == '${user._id}'`
              : guestInfo.email
              ? `this.guestEmail == '${guestInfo.email}'`
              : `this.ip == '${userIp}'`
          ]
            .filter(Boolean)
            .join(' && ')
        })
      );
    }
  }, [company, user, guestInfo, userIp]);

  useEffect(() => {
    getAnnouncements();
  }, [getAnnouncements]);

  useEffect(() => {
    if (router.isReady) {
      router.push({
        pathname: router.pathname,
        query: {
          ...router.query,
          page: 1
        }
      });
      dispatch(announcementActions.resetAnnouncement());
    }
  }, [router.isReady]);

  useEffect(() => {
    if (company) {
      if (
        !company?.siteNavigation?.announcements &&
        !(company?.role && company?.role !== 'Guest')
      ) {
        setError({
          title: 'Announcements are disabled',
          message:
            'Announcements are disabled for this company. Please contact company administrator for detail information.'
        });
      } else {
        setError(null);
      }
    }
  }, [company]);

  return (
    <>
      <Head>
        <title>{company?.name} - Announcements</title>
      </Head>
      <Layout>
        <div className="bg-white dark:bg-aa-900 purple:bg-pt-1000 h-[calc(100vh-93px)] space-y-8">
          {error ? (
            <Errors title={error?.title} message={error?.message} />
          ) : (
            <>
              <div className="pt-14 px-4">
                <div className="mx-auto w-8/12">
                  <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-8">
                    <h1 className="text-slate-900 dark:text-aa-200 purple:text-pt-200 mb-2 text-3xl font-semibold">
                      Announcements
                    </h1>
                    <div className="flex gap-4 items-center ">
                      <SearchInput
                        searchText={searchText}
                        onSearch={(value) => onSearchChange(value)}
                        onClear={() => {
                          setSearchText('');
                          router.push({
                            pathname: router.pathname,
                            query: { ...router.query, search: '' }
                          });
                        }}
                      />

                      {!!company?.categories.length && (
                        <BaseListBox
                          value={filterCategories}
                          onChange={handleFilterCategoriesChange}
                          field="name"
                          options={company?.categories}
                          icon={<FilterHamburger className="w-5 h-5 icon" />}
                          label="Categories"
                          multiple
                          size="md"
                          align="right"
                          hidden="mobile"
                          type="status"
                          onReset={() => {
                            delete router.query.categories;
                            router.push({
                              pathname: router.pathname,
                              query: {
                                ...router.query
                              }
                            });
                          }}
                        />
                      )}
                      {!isGuest && (
                        <Button
                          type="button"
                          text="New"
                          icon={<Plus className="w-5 h-5 icon-slate" />}
                          variant="indigo"
                          size="sm"
                          mobileFullWidth="mobileFullWidth"
                          onClick={() => router.push('/announcements/new')}
                        />
                      )}
                    </div>
                  </div>
                  <Divider />
                </div>
              </div>
              <div className="h-[calc(100vh-233px)]">
                {isLoading && router.query.page === '1' ? (
                  <AnnouncementSkeleton />
                ) : (
                  <InfiniteScroll
                    items={announcements}
                    countInfo={countInfo}
                    endOfList={() => {
                      const page = Number.isNaN(parseInt(router.query.page, 2) + 1)
                        ? router.query.page
                        : parseInt(router.query.page, 2) + 1;
                      router.push({
                        pathname: router.pathname,
                        query: {
                          ...router.query,
                          page
                        }
                      });
                    }}>
                    {countInfo.count > 0 ? (
                      announcements?.map((announcement) => (
                        <AnnouncementCard
                          key={announcement._id}
                          announcement={announcement}
                          isGuest={isGuest}
                        />
                      ))
                    ) : (
                      <EmptyState
                        title="No announcements yet"
                        description="Announcements will be posted here."
                      />
                    )}
                  </InfiniteScroll>
                )}
              </div>
            </>
          )}
        </div>
        <IdeaDetail
          idea={selectedIdea}
          company={company}
          onClose={() => {
            dispatch(ideaActions.setSelectedIdea(null));
            dispatch(toggleFeedBackDetailModal());
            router.push(
              {
                pathname: router.pathname,
                query: { ...router.query, feedback: undefined }
              },
              undefined,
              { scroll: false }
            );
          }}
        />
      </Layout>
    </>
  );
}
