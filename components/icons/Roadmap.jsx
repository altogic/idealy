import * as React from 'react';

function SvgRoadmap(props) {
  return <svg
    xmlns="http://www.w3.org/2000/svg"
    className="roadmap_svg__icon roadmap_svg__icon-tabler roadmap_svg__icon-tabler-layout-kanban"
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
    <path d="M4 4h6M14 4h6" />
    <rect x={4} y={8} width={6} height={12} rx={2} />
    <rect x={14} y={8} width={6} height={6} rx={2} />
  </svg>
}
export default SvgRoadmap;
