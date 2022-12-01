import * as React from 'react';

function SvgPeople(props) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M13.333 14c0-.93 0-1.396-.115-1.774a2.667 2.667 0 0 0-1.778-1.778c-.378-.115-.844-.115-1.774-.115H6.333c-.93 0-1.396 0-1.774.115a2.666 2.666 0 0 0-1.778 1.778c-.115.378-.115.844-.115 1.774m8.333-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgPeople;
