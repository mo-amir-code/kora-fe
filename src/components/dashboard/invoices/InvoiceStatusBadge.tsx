import React from "react";

export type InvoiceStatus = 'Paid' | 'Sent' | 'Pending' | 'Draft' | 'Overdue';

interface InvoiceStatusBadgeProps {
  status: InvoiceStatus;
}

const getStatusStyles = (status: InvoiceStatus) => {
  switch (status) {
    case 'Paid':
      return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20 shadow-emerald-500/10";
    case 'Sent':
      return "bg-brand-500/10 text-brand-500 border-brand-500/20 shadow-brand-500/10";
    case 'Pending':
      return "bg-blue-500/10 text-blue-500 border-blue-500/20 shadow-blue-500/10";
    case 'Draft':
      return "bg-gray-500/10 text-gray-400 border-gray-500/20 shadow-gray-500/5";
    case 'Overdue':
      return "bg-rose-500/10 text-rose-500 border-rose-500/20 shadow-rose-500/10";
    default:
      return "bg-gray-500/10 text-gray-500 border-gray-500/20";
  }
};

const InvoiceStatusBadge = ({ status }: InvoiceStatusBadgeProps) => {
  return (
    <span className={`
      px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-black uppercase tracking-widest border shadow-sm transition-all duration-300
      ${getStatusStyles(status)}
    `}>
      {status}
    </span>
  );
};

export default InvoiceStatusBadge;
