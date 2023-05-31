import * as React from 'react';

function SvgUser(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="user_svg__icon user_svg__icon-tabler user_svg__icon-tabler-user"
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
      <circle cx={12} cy={7} r={4} />
      <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
    </svg>
  );
}
export default SvgUser;
