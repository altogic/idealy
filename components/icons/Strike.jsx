import * as React from 'react';

function SvgStrike(props) {
  return (
    <svg viewBox="0 0 18 18" width="1em" height="1em" {...props}>
      <path className="ql-stroke ql-thin" d="m15.5 8.5-13 1" />
      <path
        className="ql-fill"
        d="M9.007 8C6.542 7.791 6 7.519 6 6.5 6 5.792 7.283 5 9 5c1.571 0 2.765.679 2.969 1.309a1 1 0 0 0 1.9-.617C13.356 4.106 11.354 3 9 3 6.2 3 4 4.538 4 6.5a3.2 3.2 0 0 0 .5 1.843ZM8.984 10c2.473.208 3.016.479 3.016 1.5 0 .708-1.283 1.5-3 1.5-1.571 0-2.765-.679-2.969-1.309a1 1 0 1 0-1.9.617C4.644 13.894 6.646 15 9 15c2.8 0 5-1.538 5-3.5a3.2 3.2 0 0 0-.5-1.843Z"
      />
    </svg>
  );
}
export default SvgStrike;
