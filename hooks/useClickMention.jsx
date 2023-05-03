import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function useClickMention(id, dashboard) {
  const feedBackDetailModal = useSelector((state) => state.general.feedBackDetailModal);
  const idea = useSelector((state) => state.idea.selectedIdea);
  const [userCardStyle, setUserCardStyle] = useState({ top: 0, left: 0 });
  const [userCardInfo, setUserCardInfo] = useState({});

  function handleClickMention(e) {
    e.stopPropagation();
    const top = e.target.offsetTop - 80;
    const left = e.target.offsetLeft + 20;
    const mention = e.target.dataset.value
      ? e.target
      : e.target.innerText === '@'
      ? e.target.parentElement.parentElement
      : e.target.parentElement;
    if (mention.parentElement.parentElement.id !== id) return;
    setUserCardStyle({ top, left, display: 'flex' });
    setUserCardInfo({
      name: mention.dataset.value,
      profilePicture:
        mention.dataset.profilePicture !== 'undefined' ? mention.dataset.profilePicture : null,
      email: mention.dataset.email
    });
  }

  function hideUserCard() {
    setUserCardStyle({ display: 'none' });
  }
  useEffect(() => {
    if (feedBackDetailModal || dashboard) {
      const mentions = document.querySelectorAll('.mention');
      mentions.forEach((mention) => {
        mention.addEventListener('click', handleClickMention);
      });
      if (!dashboard) {
        const ideaDetail = document.querySelector('.drawer-body');
        ideaDetail?.addEventListener('click', hideUserCard);
      }
    }

    return () => {
      hideUserCard();
      const mentions = document.querySelectorAll('.mention');
      mentions.forEach((mention) => {
        mention.removeEventListener('click', handleClickMention);
      });
    };
  }, [feedBackDetailModal, dashboard, idea]);

  return { userCardStyle, userCardInfo, setUserCardInfo, setUserCardStyle };
}
