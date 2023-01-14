import * as React from 'react';

function SvgUndo(props) {
  return (
    <svg viewBox="0 0 18 18" width="1em" height="1em" {...props}>
      <polygon className="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10" />
      <path className="ql-stroke" d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9" />
    </svg>
  );
}
export default SvgUndo;
