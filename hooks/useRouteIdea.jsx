import { useRouter } from 'next/router';

export default function useRouteIdea() {
  const router = useRouter();
  return (ideaId) => {
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          feedback: ideaId
        }
      },
      undefined,
      { scroll: false }
    );
  };
}
