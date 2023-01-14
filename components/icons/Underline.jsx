import * as React from 'react';

function SvgUnderline(props) {
  return (
    <svg viewBox="0 0 18 18" width="1em" height="1em" {...props}>
      <path className="ql-stroke" d="M5 3v6a4.012 4.012 0 0 0 4 4 4.012 4.012 0 0 0 4-4V3" />
      <rect className="ql-fill" height={1} rx={0.5} ry={0.5} width={12} x={3} y={15} />
    </svg>
  );
}
export default SvgUnderline;
