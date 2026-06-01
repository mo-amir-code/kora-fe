import Link from "next/link";

export default function FooterCTA() {
  return (
    <footer className="border-t border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-[#0f1520] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4 sm:mb-6 tracking-tight">
          Ready to command your worth?
        </h2>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mb-8 sm:mb-10 max-w-xl mx-auto px-2">
          Join hundreds of top creators who use Kora to automate their billing
          and lock in their peace of mind.
        </p>
        <Link
          href="/auth/signup"
          className="inline-flex items-center justify-center px-8 py-4 sm:px-10 sm:py-5 rounded-full bg-brand-500 hover:bg-brand-600 text-white font-black text-base sm:text-lg hover:scale-105 transition-all shadow-lg shadow-brand-500/20"
        >
          Claim Your Kora Account
        </Link>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 border-t border-slate-200 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-xs text-slate-400 dark:text-slate-500">
        <p>© {new Date().getFullYear()} Kora. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">
            Privacy
          </Link>
          <Link href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">
            Terms
          </Link>
          <Link href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">
            Twitter
          </Link>
        </div>
      </div>
    </footer>
  );
}
