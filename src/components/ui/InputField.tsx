import React from "react";

export interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
  rightElement?: React.ReactNode;
  containerClassName?: string;
  required?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  error,
  helperText,
  icon,
  rightElement,
  containerClassName = "",
  required,
  className = "",
  id,
  type = "text",
  ...props
}) => {
  const inputId = id || (typeof label === "string" ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className={`space-y-1.5 w-full ${containerClassName}`}>
      {label && (
        <label htmlFor={inputId} className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative rounded-xl shadow-sm">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
            {icon}
          </div>
        )}
        <input
          id={inputId}
          type={type}
          className={`w-full bg-gray-50 dark:bg-gray-800/40 border ${
            error
              ? "border-rose-500 focus:ring-rose-500/20 focus:border-rose-500"
              : "border-gray-200 dark:border-gray-800 focus:ring-brand-500/20 focus:border-brand-500"
          } rounded-xl ${icon ? "pl-10" : "px-4"} ${rightElement ? "pr-11 sm:pr-12" : ""} py-3.5 text-sm font-medium text-gray-900 dark:text-white outline-none focus:ring-2 transition-all ${className}`}
          {...props}
        />
        {rightElement && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {rightElement}
          </div>
        )}
      </div>
      {error ? (
        <p className="text-xs font-semibold text-rose-500">{error}</p>
      ) : (
        helperText && (
          <p className="text-xs text-gray-500 dark:text-gray-400">{helperText}</p>
        )
      )}
    </div>
  );
};
export default InputField;
