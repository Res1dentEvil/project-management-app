import React from 'react';

function Preloader() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
      version="1"
      viewBox="0 0 128 128"
    >
      <g>
        <circle cx="16" cy="64" r="16"></circle>
        <circle cx="16" cy="64" r="14.344" transform="rotate(45 64 64)"></circle>
        <circle cx="16" cy="64" r="12.531" transform="rotate(90 64 64)"></circle>
        <circle cx="16" cy="64" r="10.75" transform="rotate(135 64 64)"></circle>
        <circle cx="16" cy="64" r="10.063" transform="rotate(180 64 64)"></circle>
        <circle cx="16" cy="64" r="8.063" transform="rotate(225 64 64)"></circle>
        <circle cx="16" cy="64" r="6.438" transform="rotate(270 64 64)"></circle>
        <circle cx="16" cy="64" r="5.375" transform="rotate(315 64 64)"></circle>
        <animateTransform
          attributeName="transform"
          calcMode="discrete"
          dur="720ms"
          repeatCount="indefinite"
          type="rotate"
          values="0 64 64;315 64 64;270 64 64;225 64 64;180 64 64;135 64 64;90 64 64;45 64 64"
        ></animateTransform>
      </g>
    </svg>
  );
}

export default Preloader;
