import IdeaDetail from '@/components/Idea/IdeaDetail';
import Layout from '@/components/Layout';
import UserPage from '@/components/UserPage';
import { companyActions } from '@/redux/company/companySlice';
import { toggleFeedBackDetailModal } from '@/redux/general/generalSlice';
import { ideaActions } from '@/redux/ideas/ideaSlice';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Users() {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    company,
    isGuest,
    companyUsers: { result: users }
  } = useSelector((state) => state.company);
  const { selectedIdea } = useSelector((state) => state.idea);
  const [selectedUser, setSelectedUser] = useState();

  const getCompanyUsers = useCallback(() => {
    if (company && router.isReady) {
      dispatch(
        companyActions.getCompanyUsers({
          limit: 10,
          filter: [
            `this.companyId == '${company?._id}'`,
            router.query.segment && `this.segment._id == '${router.query.segment}'`,
            router.query.q &&
              `(INCLUDES(this.user.name, '${router.query.q}') || INCLUDES(this.name, '${router.query.q}'))`
          ]
            .filter(Boolean)
            .join(' && '),
          sort: router.query.sort,
          page: router.query.page
        })
      );
    }
  }, [company, router.query.sort, router.query.page, router.query.q, router.query.segment]);

  function handleCloseIdea() {
    const temp = router.query;
    delete temp?.feedback;
    dispatch(ideaActions.setSelectedIdea(null));
    dispatch(toggleFeedBackDetailModal());
    router.push(
      {
        pathname: router.pathname,
        query: temp
      },
      undefined,
      { scroll: false }
    );
  }

  useEffect(() => {
    if (!users?.length || Object.keys(router.query).length > 1) {
      getCompanyUsers();
    }
  }, [getCompanyUsers]);

  const getIdeas = useCallback(
    (page) => {
      if (company?._id && selectedUser) {
        const req = {
          companyId: company?._id,
          limit: 10,
          filter: [
            `this.isMerged == false && this.company == '${company._id}'`,
            selectedUser?.userId
              ? `this.author._id == '${selectedUser.userId}'`
              : `this.guestEmail == '${selectedUser.email}'`
          ]
            .filter(Boolean)
            .join(' && '),
          sort: 'createdAt:desc',
          page
        };
        dispatch(ideaActions.getIdeasByCompany(req));
      }
    },
    [company, selectedUser]
  );

  useEffect(() => {
    getIdeas();
  }, [getIdeas]);

  useEffect(() => {
    if (selectedUser && users) {
      const user = users?.find((user) => user._id === selectedUser._id);
      setSelectedUser(user);
    }
  }, [users]);

  useEffect(() => {
    if (router.isReady && router.query.userId) {
      const user = users?.find((user) => user._id === router.query.userId);
      setSelectedUser(user);
    }
  }, [router.isReady, router.query.userId, users]);

  useEffect(() => {
    if (isGuest) {
      router.push('/login');
    }
  }, [isGuest]);

  return (
    <Layout>
      <UserPage selectedUser={selectedUser} setSelectedUser={setSelectedUser} getIdeas={getIdeas} />
      <IdeaDetail idea={selectedIdea} company={company} onClose={() => handleCloseIdea()} />
    </Layout>
  );
}
