import * as React from 'react';

function SvgLink(props) {
  return (
    <svg viewBox="0 0 18 18" width="1em" height="1em" {...props}>
      <path className="ql-stroke" d="m7 7 4 4" />
      <path
        className="ql-even ql-stroke"
        d="M8.9 4.577a3.476 3.476 0 0 1 .36 4.679A3.476 3.476 0 0 1 4.577 8.9c-1.392-1.4-2.542-2.5-.36-4.683S7.5 3.185 8.9 4.577Z"
      />
      <path
        className="ql-even ql-stroke"
        d="M13.423 9.1a3.476 3.476 0 0 0-4.679-.36 3.476 3.476 0 0 0 .36 4.679c1.392 1.392 2.5 2.542 4.679.36s1.032-3.279-.36-4.679Z"
      />
    </svg>
  );
}
export default SvgLink;
