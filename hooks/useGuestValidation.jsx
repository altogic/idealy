import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function useGuestValidation(fieldName) {
  const [guestValidation, setGuestValidation] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const company = useSelector((state) => state.company.company);
  useEffect(() => {
    if (company?.authentication.type) {
      setGuestValidation(
        company?.authentication.type === 'Guest Authentication' ||
          (company.authentication.type === 'Custom' &&
            company.authentication[fieldName] === 'Guest Authentication')
      );
    }
  }, [company?.authentication.type]);
  return !user && guestValidation;
}
