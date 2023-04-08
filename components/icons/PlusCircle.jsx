import * as React from 'react';

function SvgPlusCircle(props) {
  return <svg
    xmlns="http://www.w3.org/2000/svg"
    className="plus-circle_svg__icon plus-circle_svg__icon-tabler plus-circle_svg__icon-tabler-circle-plus"
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
    <path d="M9 12h6M12 9v6" />
  </svg>
}
export default SvgPlusCircle;
