import React from "react";
import Link from "next/link";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "outline" | "neutral";
  isLoading?: boolean;
  href?: string;
  className?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  isLoading = false,
  href,
  className = "",
  children,
  disabled,
  type = "button",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-xl font-bold text-xs sm:text-sm transition-all text-center focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]";

  const variantStyles = {
    primary: "bg-brand-500 hover:bg-brand-600 text-white shadow-lg shadow-brand-500/20 py-3.5 px-6",
    secondary: "bg-slate-200 dark:bg-gray-800 hover:bg-slate-300 dark:hover:bg-gray-700 text-slate-900 dark:text-white py-3.5 px-6",
    danger: "bg-rose-500 hover:bg-rose-600 text-white shadow-lg shadow-rose-500/20 py-3.5 px-6",
    outline: "border border-slate-200 dark:border-gray-800/80 hover:bg-slate-100 dark:hover:bg-gray-800 text-slate-700 dark:text-slate-200 py-3.5 px-6",
    neutral: "bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-white/5 text-slate-900 dark:text-white py-3.5 px-6",
  };

  const finalClassName = `${baseStyles} ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={finalClassName} {...(props as any)}>
        {children}
      </Link>
    );
  }

  return (
    <button disabled={disabled || isLoading} type={type} className={finalClassName} {...props}>
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
};
