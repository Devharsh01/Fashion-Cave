import React from 'react';

const DropDownIcon = ({ width = '25px', height = '25px', fill = '#ffffff'}) => (
  <svg width={width} height={height} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill={fill}>
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.144"></g>
    <g id="SVGRepo_iconCarrier">
      <rect x="0" fill="none" width="24" height="24"></rect>
      <g>
        <path d="M20 9l-8 8-8-8 1.414-1.414L12 14.172l6.586-6.586"></path>
      </g>
    </g>
  </svg>
);

export default DropDownIcon;
