import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function useGuestValidation({ company, fieldName }) {
  const [guestValidation, setGuestValidation] = useState(false);
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    if (company) {
      setGuestValidation(
        company?.authentication.type === 'Guest Authentication' ||
          (company.authentication.type === 'Custom' &&
            company.authentication[fieldName] === 'Guest Authentication')
      );
    }
  }, [company]);
  return !user && guestValidation;
}
