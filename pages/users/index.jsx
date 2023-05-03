import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { companyActions } from '@/redux/company/companySlice';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import UserPage from '@/components/UserPage';

export default function Index() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { company, isGuest } = useSelector((state) => state.company);

  useEffect(() => {
    if (company && !isGuest) {
      dispatch(
        companyActions.getCompanyUsers({
          page: 1,
          limit: 10,
          filter: `this.companyId == '${company._id}'`,
          sort: 'createdAt:desc',
          onSuccess: (users) => {
            if (users?.length > 0) {
              const userId = router.query?.email
                ? users.find((user) => user.email === router.query.email)?._id
                : users[0]._id;
              delete router.query?.email;
              router.push({
                pathname: `/users/${userId ?? users[0]._id}`,
                query: router.query
              });
            }
          }
        })
      );
    }
  }, [company]);

  return (
    <Layout>
      <UserPage />
    </Layout>
  );
}
