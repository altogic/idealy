import * as React from 'react';

function SvgSwitch(props) {
  return <svg
    xmlns="http://www.w3.org/2000/svg"
    className="switch_svg__icon switch_svg__icon-tabler switch_svg__icon-tabler-repeat"
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
    <path d="M4 12V9a3 3 0 0 1 3-3h13m-3-3 3 3-3 3M20 12v3a3 3 0 0 1-3 3H4m3 3-3-3 3-3" />
  </svg>
}
export default SvgSwitch;
