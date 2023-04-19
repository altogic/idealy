import * as React from 'react';

function SvgCalendar(props) {
  return <svg
    xmlns="http://www.w3.org/2000/svg"
    className="calendar_svg__icon calendar_svg__icon-tabler calendar_svg__icon-tabler-calendar"
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
    <rect x={4} y={5} width={16} height={16} rx={2} />
    <path d="M16 3v4M8 3v4M4 11h16M11 15h1M12 15v3" />
  </svg>
}
export default SvgCalendar;
