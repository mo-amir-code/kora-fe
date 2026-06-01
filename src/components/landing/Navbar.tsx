import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-white/80 dark:bg-[#0B0F19]/80 backdrop-blur-md border-b border-slate-200 dark:border-white/5 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 sm:gap-3">
          <Image
            src="/brand/kora-icon-transparent.svg"
            alt="Kora"
            width={32}
            height={32}
            className="w-7 h-7 sm:w-8 sm:h-8"
            priority
          />
          <span className="text-slate-900 dark:text-white text-lg sm:text-xl font-bold tracking-tight">
            Kora
          </span>
        </Link>
        <div className="flex items-center gap-3 sm:gap-6">
          <Link
            href="/auth/signin"
            className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/auth/signup"
            className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-brand-500 text-white text-xs sm:text-sm font-bold hover:bg-brand-600 transition-colors shadow-lg shadow-brand-500/20"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
