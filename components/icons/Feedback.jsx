import * as React from 'react';

function SvgFeedback(props) {
  return (
    <svg
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      {...props}>
      <path d="M12.469 4v16m6-14-12 12m14-6h-16m14 6-12-12" stroke="currentColor" />
    </svg>
  );
}
export default SvgFeedback;
