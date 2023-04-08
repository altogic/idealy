import * as React from 'react';

function SvgMinusCircle(props) {
  return <svg
    xmlns="http://www.w3.org/2000/svg"
    className="minus-circle_svg__icon minus-circle_svg__icon-tabler minus-circle_svg__icon-tabler-circle-minus"
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
    <path d="M9 12h6" />
  </svg>
}
export default SvgMinusCircle;
