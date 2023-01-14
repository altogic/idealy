import * as React from 'react';

function SvgRedo(props) {
  return (
    <svg viewBox="0 0 18 18" width="1em" height="1em" {...props}>
      <polygon className="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10" />
      <path className="ql-stroke" d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5" />
    </svg>
  );
}
export default SvgRedo;
