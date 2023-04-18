import * as React from 'react';

function SvgPlusPeople(props) {
  return <svg
    xmlns="http://www.w3.org/2000/svg"
    className="plus-people_svg__icon plus-people_svg__icon-tabler plus-people_svg__icon-tabler-user-plus"
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
    <circle cx={9} cy={7} r={4} />
    <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2M16 11h6m-3-3v6" />
  </svg>
}
export default SvgPlusPeople;
