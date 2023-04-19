import * as React from 'react';

function SvgCircleUser(props) {
  return <svg
    xmlns="http://www.w3.org/2000/svg"
    className="circle-user_svg__icon circle-user_svg__icon-tabler circle-user_svg__icon-tabler-user-circle"
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
    <circle cx={12} cy={12} r={9} />
    <circle cx={12} cy={10} r={3} />
    <path d="M6.168 18.849A4 4 0 0 1 10 16h4a4 4 0 0 1 3.834 2.855" />
  </svg>
}
export default SvgCircleUser;
