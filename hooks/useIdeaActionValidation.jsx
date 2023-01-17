import { useSelector } from 'react-redux';

export default function useIdeaActionValidation(model) {
  const company = useSelector((state) => state.company.company);
  const user = useSelector((state) => state.auth.user);
  const userIp = useSelector((state) => state.auth.userIp);
  return (
    userIp === model?.ip ||
    user?._id === model?.author?._id ||
    (user && (company?.role === 'Owner' || company?.role === 'Admin'))
  );
}
