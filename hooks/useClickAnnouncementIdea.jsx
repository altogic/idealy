import { useEffect } from 'react';
import useRouteIdea from './useRouteIdea';

export default function useClickAnnouncementIdea(deps) {
  const routeIdea = useRouteIdea();
  useEffect(() => {
    const buttons = document.querySelectorAll('#idea-button');
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        routeIdea(button.dataset.id);
      });
    });
  }, [deps]);

  useEffect(
    () => () => {
      const buttons = document.querySelectorAll('#idea-button');
      buttons.forEach((button) => {
        button.removeEventListener('click', () => {
          routeIdea(button.dataset.id);
        });
      });
    },
    []
  );
}
