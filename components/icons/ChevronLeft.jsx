import * as React from 'react';

function SvgChevronLeft(props) {
  return <svg
    xmlns="http://www.w3.org/2000/svg"
    className="chevron-left_svg__icon chevron-left_svg__icon-tabler chevron-left_svg__icon-tabler-chevron-left"
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
    <path d="m15 6-6 6 6 6" />
  </svg>
}
export default SvgChevronLeft;
