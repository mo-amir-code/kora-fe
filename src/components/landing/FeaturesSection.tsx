import { LuBriefcase, LuCalendarDays, LuBell } from "react-icons/lu";

const features = [
  {
    icon: LuBriefcase,
    title: "Brand & Deal CRM",
    description:
      "Manage all your sponsorships in one pipeline. From negotiation to publication, track every deal and brand contact effortlessly.",
    hoverColor: "hover:border-brand-500/30",
    iconBg: "bg-brand-500/10",
    iconColor: "text-brand-600 dark:text-brand-400",
  },
  {
    icon: LuCalendarDays,
    title: "Deliverable Tracking",
    description:
      "Never miss a posting deadline. Keep track of specific deliverables—reels, stories, posts—across all your social platforms.",
    hoverColor: "hover:border-emerald-500/30",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    icon: LuBell,
    title: "Smart Invoicing & Reminders",
    description:
      "Generate 1-click professional invoices. Let automated multi-channel (WhatsApp, Email) reminders chase down pendings for you.",
    hoverColor: "hover:border-brand-300/30",
    iconBg: "bg-brand-300/10",
    iconColor: "text-brand-700 dark:text-brand-300",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-16 sm:py-24 bg-slate-50 dark:bg-[#0f1520] border-y border-slate-200 dark:border-white/5 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-3 sm:mb-4">
            Master every brand deal.
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-2xl mx-auto px-2">
            Everything you need to track deliverables, look professional, and
            get paid faster.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className={`bg-white dark:bg-[#151c2c] border border-slate-200 dark:border-white/5 p-6 sm:p-8 rounded-2xl sm:rounded-3xl ${feature.hoverColor} transition-colors group shadow-sm dark:shadow-none`}
              >
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 ${feature.iconBg} ${feature.iconColor} rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2 sm:mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
