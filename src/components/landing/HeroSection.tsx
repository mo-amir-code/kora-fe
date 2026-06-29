import { LuArrowRight } from "react-icons/lu";

export default function HeroSection() {
  return (
    <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] lg:w-[800px] h-[400px] sm:h-[600px] lg:h-[800px] bg-brand-500/10 dark:bg-brand-500/20 rounded-full blur-[120px] opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 dark:bg-white/5 border border-brand-200 dark:border-white/10 text-[10px] sm:text-xs font-semibold text-brand-600 dark:text-brand-400 mb-6 sm:mb-8 uppercase tracking-widest">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
          </span>
          Kora is live
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-slate-900 dark:text-white tracking-tighter mb-5 sm:mb-8 max-w-5xl mx-auto leading-[1.1]">
          Stop losing deals in your{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-500 to-brand-300">
            DMs.
          </span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-slate-500 dark:text-slate-400 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed px-2">
          The ultimate sponsorship management platform for digital creators.
          Track deliverables, manage brand relationships, and automate your
          invoicing in one seamless workspace.
        </p>

        <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 px-2">
          <input
            type="email"
            placeholder="Enter your work email"
            required
            className="flex-1 w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-5 py-3.5 sm:px-6 sm:py-4 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50 transition-all font-medium text-sm sm:text-base"
          />
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3.5 sm:px-8 sm:py-4 rounded-2xl bg-brand-500 hover:bg-brand-600 text-white font-bold transition-all sm:shrink-0 flex items-center justify-center gap-2 text-sm sm:text-base shadow-lg shadow-brand-500/20"
          >
            Start for free
            <LuArrowRight size={18} />
          </button>
        </form>
        <p className="mt-3 sm:mt-4 text-[11px] sm:text-xs text-slate-400 dark:text-slate-500">
          14-day free trial • Cancel anytime
        </p>
      </div>
    </section>
  );
}
