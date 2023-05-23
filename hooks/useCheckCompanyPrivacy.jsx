import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function useCheckCompanyPrivacy() {
  const router = useRouter();
  const { company, companies } = useSelector((state) => state.company);

  useEffect(() => {
    if (
      company &&
      companies.length &&
      (!company.privacy.isPublic || company.privacy.userApproval) &&
      !companies.some((c) => c._id === company._id)
    ) {
      router.push('/request-access');
    }
  }, [company?.privacy, companies]);
}
