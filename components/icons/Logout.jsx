import * as React from 'react';

function SvgLogout(props) {
  return <svg
    xmlns="http://www.w3.org/2000/svg"
    className="logout_svg__icon logout_svg__icon-tabler logout_svg__icon-tabler-logout"
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
    <path d="M14 8V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2v-2" />
    <path d="M7 12h14l-3-3m0 6 3-3" />
  </svg>
}
export default SvgLogout;
