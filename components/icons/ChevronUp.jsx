import * as React from 'react';

function SvgChevronUp(props) {
  return <svg
    xmlns="http://www.w3.org/2000/svg"
    className="chevron-up_svg__icon chevron-up_svg__icon-tabler chevron-up_svg__icon-tabler-chevron-up"
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
    <path d="m6 15 6-6 6 6" />
  </svg>
}
export default SvgChevronUp;
