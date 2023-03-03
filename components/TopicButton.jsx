import React from 'react';
import TopicBadges from './TopicBadges';

export default function TopicButton({ badgeName, onClick, selected, disabled }) {
  return (
    <button type="button" onClick={onClick} disabled={disabled}>
      <TopicBadges badgeName={badgeName} selected={selected} disabled={disabled} />
    </button>
  );
}
