import React from 'react';
import './Button.scss';

interface IPropsInput {
  value: string | number;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit';
  onClick?: () => void;
}

export const Button = ({ value, className, onClick, type, disabled }: IPropsInput) => {
  return (
    <>
      <button type={type} className={`btn ${className}`} onClick={onClick} disabled={disabled}>
        {value}
      </button>
    </>
  );
};
