"use client";
import React from "react";
import Image from "next/image";
import { GuestGuard } from "@/components/guards";
import { APP_NAME } from "@/lib/constants";

interface AuthLayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
}

const features = [
  "Automated WhatsApp reminders for pending invoices.",
  "1-click professional invoicing tailored for creators.",
  "Real-time payment tracking across all brand deals.",
];

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, pageTitle }) => {
  return (
    <GuestGuard>
      {pageTitle && <title>{pageTitle}</title>}
      <div className="min-h-screen min-h-[100dvh] bg-[#0B0F19] flex items-start sm:items-center justify-center p-0 sm:p-4 md:p-6 lg:p-8">
        <div className="w-full min-h-[100dvh] sm:min-h-0 sm:max-w-[1100px] grid grid-cols-1 lg:grid-cols-2 gap-0 sm:rounded-2xl overflow-hidden sm:border sm:border-[#1e293b]/60 bg-[#0f1520]">
          {/* Left Panel - Branding (Hidden on Mobile) */}
          <div className="hidden lg:flex bg-[#0f1520] px-5 pt-6 pb-4 sm:p-8 md:p-10 lg:p-12 flex-col justify-start lg:justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2.5 sm:gap-3 mb-5 sm:mb-10">
              <Image
                src="/images/logo/logo-icon.svg"
                alt={APP_NAME}
                width={28}
                height={28}
                className="sm:w-8 sm:h-8"
              />
              <span className="text-white text-lg sm:text-xl font-semibold tracking-tight">
                {APP_NAME}
              </span>
            </div>

            {/* Tagline */}
              <div className="lg:flex-1 flex flex-col justify-center">
              <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-4 sm:mb-8">
                Stop losing deals in your DMs.
              </h1>

              {/* Features */}
              <div className="space-y-2.5 sm:space-y-4 mb-5 sm:mb-10">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2.5 sm:gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 20 20"
                        fill="none"
                        className="sm:w-5 sm:h-5"
                      >
                        <circle cx="10" cy="10" r="10" fill="#22c55e" fillOpacity="0.15" />
                        <path
                          d="M6 10.5L8.5 13L14 7.5"
                          stroke="#22c55e"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* Testimonial - Hidden on very small screens, shown on sm+ */}
              <div className="hidden sm:block bg-[#151c2c] border border-[#1e293b] rounded-xl p-4 sm:p-5">
                <p className="text-gray-400 text-xs sm:text-sm italic leading-relaxed mb-3 sm:mb-4">
                  &ldquo;I recovered ₹40,000 in overdue payments within my first
                  week using {APP_NAME}. It completely professionalized how I interact
                  with agencies.&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <Image
                    src="/images/user/owner.jpg"
                    alt="Arjun"
                    width={36}
                    height={36}
                    className="rounded-full object-cover sm:w-10 sm:h-10"
                  />
                  <div>
                    <p className="text-white text-xs sm:text-sm font-medium">Arjun</p>
                    <p className="text-gray-500 text-[10px] sm:text-xs">
                      Tech Creator • 85K Followers
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Form */}
          <div className="bg-[#111827] px-5 py-8 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center min-h-[100dvh] sm:min-h-0 border-t lg:border-t-0 lg:border-l border-[#1e293b]/60">
            {/* Mobile Logo */}
            <div className="flex lg:hidden items-center gap-2.5 mb-8">
              <Image
                src="/images/logo/logo-icon.svg"
                alt={APP_NAME}
                width={28}
                height={28}
                className="w-8 h-8"
              />
              <span className="text-white text-xl font-semibold tracking-tight">
                {APP_NAME}
              </span>
            </div>
            {children}
          </div>
        </div>
      </div>
    </GuestGuard>
  );
};

export default AuthLayout;
