import React from "react";

type option = {
  value: any;
  name: string;
  disabled?: boolean;
};

type Props = {
  className?: string;
  field?: any;
  label?: string;
  errorMsg?: string;
  disabled?: boolean;
  value: any;
  options: option[];
};

export default function CustomSelect({
  className,
  label,
  field,
  errorMsg,
  options,
  disabled = false,
}: Props) {
  const optionComponents = options.map((option, index) => (
    <option
      v-for="(opt,index) of options"
      key={index}
      value={option.value}
      disabled={option.disabled || false}
    >
      {option.name}
    </option>
  ));

  return (
    <div className={className}>
      {label && <p className="text-md font-medium">{label}</p>}
      <select
        className={`form-select select-height w-full text-sm text-slate-500 ${
          disabled ? "select-disabled" : ""
        } ${errorMsg ? "border-rose-300" : ""}`}
        {...field}
      >
        {optionComponents}
      </select>
      {errorMsg && <p className="text-rose-300">{errorMsg}</p>}
    </div>
  );
}
