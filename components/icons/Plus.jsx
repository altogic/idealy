import * as React from 'react';

function SvgPlus(props) {
  return <svg
    xmlns="http://www.w3.org/2000/svg"
    className="plus_svg__icon plus_svg__icon-tabler plus_svg__icon-tabler-plus"
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
    <path d="M12 5v14M5 12h14" />
  </svg>
}
export default SvgPlus;
