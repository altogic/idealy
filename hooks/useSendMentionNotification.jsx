import useNotification from './useNotification';

export default function useSendMentionNotification(type) {
  const sendNotification = useNotification();

  const handleNotificationMessage = (name, title) => {
    switch (type) {
      case 'idea':
        return `<b>${name}</b> mentioned you in <b>${title}<b>`;
      case 'comment':
        return `<b>${name}</b> mentioned you in the comments of <b>${title}</b>.`;
      case 'reply':
        return `<b>${name}</b> mentioned you in the replies of <b>${title}</b>.`;
      default:
        return `<b>${name}</b> You have been mentioned in an ${type}`;
    }
  };
  return ({ content, title, ideaId, name }) => {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, 'text/html');
      const mentions = doc.querySelectorAll('.mention');
      if (mentions.length) {
        const mentionsArray = Array.from(mentions);
        const mentionsIds = mentionsArray.map((mention) => mention.dataset.id);
        const uniqueMentions = [...new Set(mentionsIds)];
        uniqueMentions.forEach((id) => {
          const isRegistered = JSON.parse(id.split('-')[1]);
          if (isRegistered) {
            sendNotification({
              message: handleNotificationMessage(name, title),
              targetUser: id.split('-')[0],
              type: 'mention',
              url: `/public-view?feedback=${ideaId}`
            });
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
}
