import { useSelector } from 'react-redux';
import { useMemo } from 'react';

function UseRegisteredUserValidation(fieldName) {
  const user = useSelector((state) => state.auth.user);
  const company = useSelector((state) => state.company.company);
  return useMemo(() => {
    if (!company) {
      return false;
    }

    if (company.authentication.type === 'Registered Users') {
      return !!user;
    }

    if (company.authentication.type === 'Custom') {
      return (
        (company.authentication[fieldName] === 'Registered Users' && !!user) ||
        company.authentication[fieldName] !== 'Registered Users'
      );
    }

    return true;
  }, [company, user]);
}

export default UseRegisteredUserValidation;
