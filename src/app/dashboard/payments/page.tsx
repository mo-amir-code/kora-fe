"use client";

import React from "react";
import { LuCircleAlert, LuClock, LuCircleCheck } from "react-icons/lu";
import PaymentStats from "@/components/dashboard/payments/PaymentStats";
import PaymentFilters from "@/components/dashboard/payments/PaymentFilters";
import PaymentSection from "@/components/dashboard/payments/PaymentSection";
import PaymentItem, { PaymentItemProps } from "@/components/dashboard/payments/PaymentItem";

const OVERDUE_PAYMENTS: PaymentItemProps[] = [
  {
    id: "1",
    brand: "TechBrand India",
    campaign: "Q3 Campaign",
    invoiceNumber: "#INV-2023-089",
    dueDate: "Oct 15",
    amount: "₹1,00,000",
    status: "overdue",
    lateDays: 15,
    logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80\u0026w=100\u0026h=100\u0026auto=format"
  },
  {
    id: "2",
    brand: "Glow Skin Co",
    campaign: "Moisturizer Launch",
    invoiceNumber: "#INV-2023-092",
    dueDate: "Oct 20",
    amount: "₹50,000",
    status: "overdue",
    lateDays: 10,
    logo: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80\u0026w=100\u0026h=100\u0026auto=format"
  }
];

const PENDING_PAYMENTS: PaymentItemProps[] = [
  {
    id: "3",
    brand: "Lifestyle Co",
    campaign: "Autumn Reels",
    dueDate: "Nov 05",
    amount: "₹75,000",
    status: "pending",
    logo: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80\u0026w=100\u0026h=100\u0026auto=format"
  },
  {
    id: "4",
    brand: "FitTrack",
    campaign: "Yearly Subscription",
    dueDate: "Nov 12",
    amount: "₹45,000",
    status: "pending",
    logo: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80\u0026w=100\u0026h=100\u0026auto=format"
  }
];

const PAID_PAYMENTS: PaymentItemProps[] = [
  {
    id: "5",
    brand: "FitnessApp Promo",
    campaign: "Home Workout",
    datePaid: "Oct 28",
    amount: "₹1,20,000",
    status: "paid",
    logo: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80\u0026w=100\u0026h=100\u0026auto=format"
  }
];

export default function PaymentsPage() {
  return (
    <div className="max-w-[1600px] mx-auto p-4 sm:p-6 lg:p-8 space-y-8 sm:space-y-12 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">

      <div className="flex justify-end">
        <PaymentFilters />
      </div>

      {/* Metrics Board */}
      <PaymentStats />

      {/* Categorized Lists */}
      <div className="space-y-12 sm:space-y-16">

        {/* Overdue Section */}
        <PaymentSection
          title="Overdue — Needs Attention"
          icon={<LuCircleAlert size={22} strokeWidth={2} className="text-rose-500" />}
          count={OVERDUE_PAYMENTS.length}
          content={
            OVERDUE_PAYMENTS.map(payment => (
              <PaymentItem key={payment.id} {...payment} />
            ))
          }
        />

        {/* Pending Section */}
        <PaymentSection
          title="Pending Payments"
          icon={<LuClock size={22} strokeWidth={2} className="text-brand-500" />}
          count={PENDING_PAYMENTS.length}
          content={
            PENDING_PAYMENTS.map(payment => (
              <PaymentItem key={payment.id} {...payment} />
            ))
          }
        />

        {/* Paid Section (Collapsible) */}
        <PaymentSection
          title="Paid"
          icon={<LuCircleCheck size={22} strokeWidth={2} className="text-emerald-500" />}
          count={PAID_PAYMENTS.length}
          isCollapsible={true}
          defaultOpen={false}
          content={
            PAID_PAYMENTS.map(payment => (
              <PaymentItem key={payment.id} {...payment} />
            ))
          }
        />

      </div>

      {/* Footer / Info */}
      <div className="pt-8 border-t border-gray-100 dark:border-gray-800 text-center">
        <p className="text-[10px] font-bold text-gray-400 dark:text-gray-600 uppercase tracking-[0.2em]">
          All transactions are handled securely via Kora Pay
        </p>
      </div>

    </div>
  );
}