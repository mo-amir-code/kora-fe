'use client';

import React, { useState } from 'react';
import { LuX, LuWallet, LuCheck } from 'react-icons/lu';
import { useDealsList } from '@/hooks/useDeals';
import { useInvoicesList } from '@/hooks/useInvoices';
import { useCreatePaymentEvent } from '@/hooks/usePayments';
import { useCurrency } from '@/hooks/useCurrency';
import toast from 'react-hot-toast';

interface AddPaymentEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultDealId?: string;
}

export const AddPaymentEventModal: React.FC<AddPaymentEventModalProps> = ({
  isOpen,
  onClose,
  defaultDealId,
}) => {
  const { data: deals = [], isLoading: isLoadingDeals } = useDealsList();
  const { data: invoices = [], isLoading: isLoadingInvoices } = useInvoicesList();
  const createMutation = useCreatePaymentEvent();
  const { symbol, format } = useCurrency();

  const [dealId, setDealId] = useState<string>(defaultDealId || '');
  const [invoiceId, setInvoiceId] = useState<string>('');
  const [type, setType] = useState<'PAYMENT_RECEIVED' | 'PARTIAL_PAYMENT' | 'REFUND' | 'CHARGEBACK' | 'ADJUSTMENT'>('PAYMENT_RECEIVED');
  const [amount, setAmount] = useState<string>('');
  const [method, setMethod] = useState<string>('Bank Transfer');
  const [reference, setReference] = useState<string>('');
  const [paidAt, setPaidAt] = useState<string>(new Date().toISOString().split('T')[0]);

  if (!isOpen) return null;

  const filteredInvoices = dealId
    ? invoices.filter((inv: any) => inv.dealId === dealId || inv.deal?.id === dealId)
    : invoices;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!dealId) {
      toast.error('Please select a deal');
      return;
    }
    if (!amount || Number(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    createMutation.mutate(
      {
        dealId,
        invoiceId: invoiceId || undefined,
        type,
        amount: Number(amount),
        method: method || undefined,
        reference: reference || undefined,
        paidAt: paidAt ? new Date(paidAt).toISOString() : undefined,
      },
      {
        onSuccess: () => {
          toast.success('Payment event recorded successfully!');
          onClose();
          setAmount('');
          setReference('');
        },
        onError: (err: any) => {
          toast.error(err?.response?.data?.message || 'Failed to record payment event');
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/20">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-brand-500/10 text-brand-500">
              <LuWallet className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                Record Payment Event
              </h2>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Log a payment, milestone payout, or refund
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
          >
            <LuX className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">
              Associated Deal <span className="text-rose-500">*</span>
            </label>
            <select
              value={dealId}
              onChange={(e) => {
                setDealId(e.target.value);
                setInvoiceId('');
              }}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-sm font-medium text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500 transition-all"
            >
              <option value="">Select a Deal</option>
              {deals.map((d: any) => (
                <option key={d.id} value={d.id}>
                  {d.title} ({d.brand?.name || 'Brand'})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">
              Link to Invoice (Optional)
            </label>
            <select
              value={invoiceId}
              onChange={(e) => setInvoiceId(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-sm font-medium text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500 transition-all"
            >
              <option value="">Direct Deal Payment (No Invoice)</option>
              {filteredInvoices.map((inv: any) => (
                <option key={inv.id} value={inv.id}>
                  {inv.invoiceNumber} — {format(inv.total)} ({inv.status})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">
              Event Type <span className="text-rose-500">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { label: 'Payment Received', val: 'PAYMENT_RECEIVED' },
                { label: 'Partial Payment', val: 'PARTIAL_PAYMENT' },
                { label: 'Refund', val: 'REFUND' },
                { label: 'Chargeback', val: 'CHARGEBACK' },
                { label: 'Adjustment', val: 'ADJUSTMENT' },
              ].map((item) => (
                <button
                  type="button"
                  key={item.val}
                  onClick={() => setType(item.val as any)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border text-left flex items-center justify-between ${
                    type === item.val
                      ? 'bg-brand-500/10 border-brand-500 text-brand-600 dark:text-brand-400'
                      : 'border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:border-gray-300'
                  }`}
                >
                  <span>{item.label}</span>
                  {type === item.val && <LuCheck className="h-3.5 w-3.5 text-brand-500" />}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">
                Amount ({symbol}) <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                step="any"
                placeholder="e.g. 500"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-sm font-medium text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">
                Payment Date <span className="text-rose-500">*</span>
              </label>
              <input
                type="date"
                value={paidAt}
                onChange={(e) => setPaidAt(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-sm font-medium text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">
                Payment Method
              </label>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-sm font-medium text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500 transition-all"
              >
                <option value="Bank Transfer">Bank Transfer (NEFT/Wire)</option>
                <option value="UPI / Razorpay">UPI / Razorpay</option>
                <option value="Stripe / Card">Stripe / Credit Card</option>
                <option value="PayPal">PayPal</option>
                <option value="Cash">Cash</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">
                Reference / UTR #
              </label>
              <input
                type="text"
                placeholder="e.g. UTR98765432"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-sm font-medium text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500 transition-all"
              />
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-gray-100 dark:border-gray-800">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={createMutation.isPending}
              className="px-6 py-2.5 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-bold hover:opacity-90 transition-all shadow-md disabled:opacity-50"
            >
              {createMutation.isPending ? 'Saving...' : 'Save Payment Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
