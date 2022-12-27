import { useState, useEffect } from 'react';

export default function useGuestValidation({ company, fieldName }) {
  console.log('company', company);
  const [guestValidation, setGuestValidation] = useState(false);
  useEffect(() => {
    if (company) {
      setGuestValidation(
        company?.authentication.type === 'Guest Authentication' ||
          (company.authentication.type === 'Custom' &&
            company.authentication[fieldName] === 'Guest Authentication')
      );
    }
  }, [company]);
  return guestValidation;
}
