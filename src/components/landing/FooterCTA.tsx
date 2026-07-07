import Link from "next/link";
import Image from "next/image";
import { APP_NAME } from "@/lib/constants";

export default function FooterCTA() {
  return (
    <footer className="border-t border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-gray-900 transition-colors duration-300">
      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-3 sm:mb-6 tracking-tight">
          Ready to command your worth?
        </h2>
        <p className="text-xs sm:text-base text-slate-500 dark:text-slate-400 mb-6 sm:mb-10 max-w-xl mx-auto px-2 leading-relaxed">
          Join hundreds of top creators who use {APP_NAME} to automate their billing and lock in their peace of mind.
        </p>
        <Link
          href="/auth/signup"
          className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 sm:px-10 sm:py-5 rounded-full bg-brand-500 hover:bg-brand-600 text-white font-black text-sm sm:text-lg hover:scale-105 transition-all shadow-lg shadow-brand-500/20"
        >
          Claim Your {APP_NAME} Account
        </Link>
      </div>

      {/* Navigation Links Grid */}
      <div className="border-t border-slate-200 dark:border-white/5 bg-slate-100/50 dark:bg-gray-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1 space-y-3 sm:space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <Image
                src="/brand/kora-icon-transparent.svg"
                alt={APP_NAME}
                width={28}
                height={28}
                className="w-7 h-7"
              />
              <span className="text-slate-900 dark:text-white font-bold text-base sm:text-lg tracking-tight">
                {APP_NAME}
              </span>
            </Link>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs">
              The premier sponsorship and deal management platform designed for modern digital creators and agencies.
            </p>
          </div>

          {/* Company Section */}
          <div className="col-span-1">
            <h3 className="text-[11px] sm:text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3 sm:mb-4">
              Company
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-slate-600 dark:text-slate-400 hover:text-brand-500 dark:hover:text-brand-400 transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-slate-600 dark:text-slate-400 hover:text-brand-500 dark:hover:text-brand-400 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Product Section */}
          <div className="col-span-1">
            <h3 className="text-[11px] sm:text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3 sm:mb-4">
              Product
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link
                  href="/pricing"
                  className="text-slate-600 dark:text-slate-400 hover:text-brand-500 dark:hover:text-brand-400 transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-slate-600 dark:text-slate-400 hover:text-brand-500 dark:hover:text-brand-400 transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div className="col-span-2 sm:col-span-1 md:col-span-1">
            <h3 className="text-[11px] sm:text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3 sm:mb-4">
              Legal
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link
                  href="/privacy"
                  className="text-slate-600 dark:text-slate-400 hover:text-brand-500 dark:hover:text-brand-400 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 border-t border-slate-200 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400 text-center sm:text-left">
          <p>© {new Date().getFullYear()} {APP_NAME}. All rights reserved.</p>
          <div className="flex items-center justify-center gap-6">
            <Link href="/privacy" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/contact" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
