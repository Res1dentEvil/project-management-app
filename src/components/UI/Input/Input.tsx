import React from 'react';
import './Input.scss';

interface IPropsInput {
  id?: string;
  label?: string;
  type?: string;
  name?: string;
  value?: string | number;
  className?: string;
  placeholder?: string;
  onfocus?: React.FocusEventHandler<HTMLInputElement>;
  disabled?: boolean;
  errorMessage?: string | number | null;
  required?: boolean;
  checked?: boolean;
  defaultValue?: number | string;
  onChange?: {
    (e: React.ChangeEvent): void;
    <T = string | React.ChangeEvent>(field: T): T extends React.ChangeEvent
      ? void
      : (e: string | React.ChangeEvent) => void;
  };
}

export const Input = (props: IPropsInput) => {
  return (
    <div className="input__wrapper">
      <input
        id={props.id}
        type={props.type}
        className={props.className}
        placeholder={props.placeholder}
        onFocus={props.onfocus}
        disabled={props.disabled}
        value={props.value}
        defaultChecked={props.checked}
        defaultValue={props.defaultValue}
        onChange={props.onChange}
      />
      <span className="input__error">{}</span>
    </div>
  );
};
