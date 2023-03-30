import AnnouncementCard from '@/components/AnnouncementCard';
import BaseListBox from '@/components/BaseListBox';
import Button from '@/components/Button';
import Divider from '@/components/Divider';
import EmptyState from '@/components/EmptyState';
import { FilterHamburger, Plus } from '@/components/icons';
import InfiniteScroll from '@/components/InfiniteScroll';
import Layout from '@/components/Layout';
import useGuestValidation from '@/hooks/useGuestValidation';
import { announcementActions } from '@/redux/announcement/announcementSlice';
import { useRouter } from 'next/router';
import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default function Announcements() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { announcements, countInfo } = useSelector((state) => state.announcement);
  const { company, isGuest } = useSelector((state) => state.company);
  const { user, guestInfo, userIp } = useSelector((state) => state.auth);
  const [filterCategories, setFilterCategories] = useState([]);
  const [page, setPage] = useState(1);
  function setCategoryQuery() {
    const queryArray = [];
    filterCategories.forEach((category) => {
      queryArray.push(`IN(this.categories,'${category._id}')`);
    });
    return `(${queryArray.join(' || ')})`;
  }

  const handleFilterCategoriesChange = (value) => {
    if (value) {
      router.query.categories = value.map((category) => category.name).join(',');
      router.push(router);
    } else {
      delete router.query.categories;
      router.push(router);
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
          page
        })
      );
    }
  }, [filterCategories, page]);

  useEffect(() => {
    const { categories } = router.query;
    if (categories && company) {
      setFilterCategories(
        company.categories.filter((category) => categories.includes(category.name))
      );
    } else {
      setFilterCategories([]);
    }
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
              : `ip == '${userIp}'`
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
    if (router.isReady && router.query.page) {
      setPage(router.query.page);
    }
    if (router.isReady && !router.query.page) {
      setPage(1);
    }
  }, [router]);

  return (
    <Layout>
      <div className="bg-white dark:bg-aa-900 max-h-screen space-y-8">
        <div className="pt-14 px-4">
          <div className="mx-auto w-8/12">
            <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-8">
              <h1 className="text-slate-900 dark:text-aa-200 purple:text-pt-200 mb-2 text-3xl font-semibold">
                Announcements
              </h1>
              <div className="flex gap-4 items-center ">
                <BaseListBox
                  value={filterCategories}
                  onChange={handleFilterCategoriesChange}
                  field="name"
                  options={company?.categories}
                  icon={
                    <FilterHamburger className="w-5 h-5 text-slate-500 dark:text-aa-200 purple:text-pt-200" />
                  }
                  label="Topics"
                  multiple
                  size="md"
                  align="right"
                  hidden="mobile"
                  type="status"
                  onReset={() => {
                    delete router.query.categories;
                    router.push(router);
                  }}
                />
                {!isGuest && (
                  <Button
                    type="button"
                    text="New"
                    icon={<Plus className="w-5 h-5" />}
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
          <InfiniteScroll
            items={announcements}
            countInfo={countInfo}
            endOfList={() => {
              setPage((page) => page + 1);
            }}>
            {announcements?.length ? (
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
        </div>
      </div>
    </Layout>
  );
}
