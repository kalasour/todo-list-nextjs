import React from "react";

type Props = {
  className?: string;
  field?: any;
  type?: string;
  label?: string;
  placeholder?: string;
  errorMsg?: string;
  disabled?: boolean;
};

export default function CustomInput({
  className,
  type,
  label,
  placeholder,
  field,
  errorMsg,
  disabled = false,
}: Props) {
  return (
    <div className={className}>
      {label && <p className="text-md font-medium">{label}</p>}
      <input
        {...field}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full form-input ${
          disabled
            ? `disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed`
            : null
        } ${errorMsg ? "border-rose-300" : ""}`}
      />
      {errorMsg && <p className="text-rose-300">{errorMsg}</p>}
    </div>
  );
}
