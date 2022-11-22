import React from 'react';
import './Button.scss';

interface IPropsInput {
  value: string | number;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export const Button = ({ value, className, onClick }: IPropsInput) => {
  return (
    <>
      <button className={`btn ${className}`} onClick={onClick}>
        {value}
      </button>
    </>
  );
};
