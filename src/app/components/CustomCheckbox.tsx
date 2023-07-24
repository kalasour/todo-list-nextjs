import React from "react";

type Props = {
  className?: string;
  onChange?: any;
  label?: string;
  errorMsg?: string;
  disabled?: boolean;
  value: boolean;
};

export default function CustomCheckbox({
  className,
  label,
  onChange,
  errorMsg,
  value,
  disabled = false,
}: Props) {
  return (
    <div className={className}>
      <div className="flex gap-2">
        <input
          checked={value}
          onChange={onChange}
          type="checkbox"
          disabled={disabled}
          className={`form-checkbox ${
            disabled
              ? `disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed`
              : null
          } ${errorMsg ? "border-rose-300" : ""}`}
        />
        {label && <p className="text-md font-medium">{label}</p>}
      </div>
      {errorMsg && <p className="text-rose-300">{errorMsg}</p>}
    </div>
  );
}
