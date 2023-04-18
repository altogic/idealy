import * as React from 'react';

function SvgFilterHamburger(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="filter-hamburger_svg__icon filter-hamburger_svg__icon-tabler filter-hamburger_svg__icon-tabler-adjustments-horizontal"
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
      <circle cx={14} cy={6} r={2} />
      <path d="M4 6h8M16 6h4" />
      <circle cx={8} cy={12} r={2} />
      <path d="M4 12h2M10 12h10" />
      <circle cx={17} cy={18} r={2} />
      <path d="M4 18h11M19 18h1" />
    </svg>
  );
}
export default SvgFilterHamburger;
