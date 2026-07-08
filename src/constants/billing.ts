export const STARTER_FEATURES = [
  "Up to 3 active brand deals",
  "Basic invoice generation",
  "Standard deal status tracking",
  "2 default email-only reminder rules (read-only)",
  "Standard email-only support",
];

export const PRO_FEATURES = [
  "Unlimited active brand deals & tracking",
  "Smart WhatsApp & Email payment reminders",
  "Customizable reminder rules & editable message templates",
  "Tailored branding on PDF invoices",
  "Real-time revenue & earnings analytics",
  "Calendar deadline integrations",
  "Priority 24/7 dedicated support",
];

export const PRICING_PLANS = [
  {
    name: "Starter",
    description: "Ideal for emerging creators tracking their first brand collaborations.",
    monthlyPrice: 0,
    quarterlyPrice: 0,
    yearlyPrice: 0,
    highlighted: false,
    ctaText: "Start Free",
    ctaHref: "/auth/signup",
    features: STARTER_FEATURES,
  },
  {
    name: "Pro Creator",
    description: "For established creators ready to automate billing and protect their income.",
    monthlyPrice: 15,
    quarterlyPrice: 13,
    yearlyPrice: 10.75,
    quarterlyTotal: 39,
    yearlyTotal: 129,
    highlighted: true,
    badgeText: "Most Popular",
    ctaText: "Get Pro Access",
    ctaHref: "/auth/signup",
    features: PRO_FEATURES,
  },
];

export const AVAILABLE_PLANS = [
  {
    cycle: "MONTHLY" as const,
    name: "Pro Monthly",
    price: "$15",
    period: "month",
    description: "Perfect for starting creators to streamline their deals.",
    features: PRO_FEATURES,
    tier: 1,
    tag: null,
    savings: null,
    yearlyComparison: "Total cost: $180/year",
    billedAs: "billed month-to-month",
  },
  {
    cycle: "QUARTERLY" as const,
    name: "Pro Quarterly",
    price: "$13",
    period: "month",
    description: "Best for growing creators scaling their sponsorships.",
    features: PRO_FEATURES,
    tier: 2,
    tag: "⭐ Most Popular",
    savings: "Save 13% (1.6 Months FREE!)",
    yearlyComparison: "Only $156/year (Save $24/yr)",
    billedAs: "billed quarterly as $39",
  },
  {
    cycle: "YEARLY" as const,
    name: "Pro Yearly",
    price: "$10.75",
    period: "month",
    description: "Elite platform access with the best possible rate.",
    features: PRO_FEATURES,
    tier: 3,
    tag: "🔥 Best Value",
    savings: "Save 28% (3.4 Months FREE!)",
    yearlyComparison: "Only $129/year (Save $51/yr)",
    billedAs: "billed yearly as $129",
  },
];

export const COMPARISON_CATEGORIES = [
  {
    category: "Deal & Sponsorship Management",
    features: [
      { name: "Active Brand Deals", starter: "Up to 3", pro: "Unlimited" },
      { name: "Content Deadline Calendar", starter: false, pro: true },
    ],
  },
  {
    category: "Invoicing & Payment Automation",
    features: [
      { name: "Professional PDF Invoices", starter: true, pro: true },
      { name: "Automated WhatsApp & Email Follow-ups", starter: false, pro: true },
      { name: "Customizable Reminder Rules", starter: "2 default email-only rules (read-only)", pro: "Unlimited (fully editable)" },
      { name: "Custom PDF Branding (Logo/Prefix)", starter: false, pro: true },
      { name: "Tax & Bank Details Settings", starter: true, pro: true },
      { name: "Overdue Interest Calculation", starter: false, pro: true },
    ],
  },
  {
    category: "Analytics & Support",
    features: [
      { name: "Revenue Dashboard", starter: "Basic", pro: "Full Analytics" },
      { name: "Support Level", starter: "Email", pro: "Priority 24/7" },
    ],
  },
];
