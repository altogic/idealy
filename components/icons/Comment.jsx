import * as React from 'react';

function SvgComment(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="comment_svg__icon comment_svg__icon-tabler comment_svg__icon-tabler-messages"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="#2c3e50"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}>
      <path d="M0 0h24v24H0z" stroke="none" />
      <path d="m21 14-3-3h-7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v10M14 15v2a1 1 0 0 1-1 1H6l-3 3V11a1 1 0 0 1 1-1h2" />
    </svg>
  );
}
export default SvgComment;
