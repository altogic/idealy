import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function useCheckCompanyPrivacy() {
  const router = useRouter();
  const { company } = useSelector((state) => state.company);

  useEffect(() => {
    if (company && (!company.privacy.isPublic || company.privacy.userApproval) && !company.role) {
      router.push('/request-access');
    }
  }, [company?.privacy]);
}
