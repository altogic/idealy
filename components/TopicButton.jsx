import React from 'react';
import TopicBadges from './TopicBadges';

export default function TopicButton({ badgeName, onClick, selected }) {
  return (
    <button type="button" onClick={onClick}>
      <TopicBadges badgeName={badgeName} selected={selected} />
    </button>
  );
}
