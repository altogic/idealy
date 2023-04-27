import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { companyActions } from '@/redux/company/companySlice';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';

export default function Index() {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    company,
    companyUsers: { result: users }
  } = useSelector((state) => state.company);

  useEffect(() => {
    if (company) {
      dispatch(
        companyActions.getCompanyUsers({
          page: 1,
          limit: 10,
          filter: `this.companyId == '${company._id}'`,
          sort: 'createdAt:desc'
        })
      );
    }
  }, [company]);

  useEffect(() => {
    if (users?.length) {
      router.push({
        pathname: `/users/${users?.[0]?._id}`,
        query: { ...router.query }
      });
    }
  }, [users]);

  return <Layout />;
}
