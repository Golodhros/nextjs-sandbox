import * as React from 'react';

const ChevronRight = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={10}
    height={16}
    fill="none"
    {...props}
  >
    <path stroke="#fff" strokeWidth={2} d="m1 1 7 7-7 7" />
  </svg>
);

export { ChevronRight };
