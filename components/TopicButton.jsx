import React from 'react';
import TopicBadges from './TopicBadges';

export default function TopicButton({ badgeName, onClick, selected }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={selected ? 'border-2 border-indigo-500 rounded-full' : ''}>
      <TopicBadges badgeName={badgeName} selected={selected} />
    </button>
  );
}
