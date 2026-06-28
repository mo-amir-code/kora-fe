import { Metadata } from "next";

type AppMetadata = {
  landing: Metadata;
  auth: {
    signin: Metadata;
    signup: Metadata;
    forgotPassword: Metadata;
    resetPassword: Metadata;
  };
  about: Metadata;
  pricing: Metadata;
  contact: Metadata;
  contactUs: Metadata;
  faq: Metadata;
  privacy: Metadata;
  dashboard: {
    home: Metadata;
    brands: Metadata;
    brandDetail: Metadata;
    deals: Metadata;
    dealDetail: Metadata;
    calendar: Metadata;
    earnings: Metadata;
    invoices: Metadata;
    invoiceCreate: Metadata;
    invoiceEdit: Metadata;
    payments: Metadata;
    templates: Metadata;
    settingsProfile: Metadata;
  };
  notFound: Metadata;
};

export const allMetadata: AppMetadata = {
  // Landing page (src/app/page.tsx)
  landing: {
    title: "Kora | Influencer Brand Deal Management Tool",
    description:
      "Kora is the ultimate sponsorship management platform for digital creators. Track deliverables, manage brand relationships, and automate invoicing.",
  },

  // Auth pages
  auth: {
    signin: {
      title: "Sign In | Kora",
      description:
        "Sign in to your Kora account to manage your brand deals, invoices, and creator partnerships.",
    },
    signup: {
      title: "Sign Up | Kora",
      description:
        "Create your free Kora account and start managing your influencer brand deals, deliverables, and payments.",
    },
    forgotPassword: {
      title: "Forgot Password | Kora",
      description:
        "Reset your Kora account password. Enter your email to receive a password reset link.",
    },
    resetPassword: {
      title: "Reset Password | Kora",
      description: "Set a new password for your Kora account.",
    },
  },

  // Public Informational pages
  about: {
    title: "About Us | Kora",
    description:
      "Learn about Kora's mission to empower digital creators with automated deal management, professional invoicing, and financial clarity.",
  },
  pricing: {
    title: "Pricing Plans | Kora",
    description:
      "Simple, transparent pricing for creators and agencies. Choose the right plan to manage your brand sponsorships and invoices.",
  },
  contact: {
    title: "Contact Us | Kora",
    description:
      "Get in touch with the Kora team. We're here to help with questions, feedback, or partnership inquiries.",
  },
  contactUs: {
    title: "Contact Us | Kora",
    description:
      "Get in touch with the Kora team. We're here to help with questions, feedback, or partnership inquiries.",
  },
  faq: {
    title: "Frequently Asked Questions | Kora",
    description:
      "Find answers to common questions about Kora, sponsorship tracking, automated reminders, and invoicing.",
  },
  privacy: {
    title: "Privacy Policy | Kora",
    description:
      "Read Kora's privacy policy to understand how we collect, use, and protect your personal and business data.",
  },

  // Dashboard pages
  dashboard: {
    home: {
      title: "Dashboard | Kora",
      description:
        "Your Kora dashboard — an overview of your active deals, upcoming deliverables, and earnings at a glance.",
    },
    brands: {
      title: "Brands | Kora",
      description:
        "Manage all your brand contacts and partnerships in one place. Track communication history and deal status.",
    },
    brandDetail: {
      title: "Brand Details | Kora",
      description:
        "View brand profile, deal history, and manage your relationship with this brand partner.",
    },
    deals: {
      title: "Deals | Kora",
      description:
        "Track all your sponsorship deals from negotiation to completion. Monitor deliverables and payment status.",
    },
    dealDetail: {
      title: "Deal Details | Kora",
      description:
        "View deal terms, deliverables, timelines, and payment information for this sponsorship.",
    },
    calendar: {
      title: "Calendar | Kora",
      description:
        "View your content calendar with posting deadlines, deliverable due dates, and brand meeting schedules.",
    },
    earnings: {
      title: "Earnings | Kora",
      description:
        "Track your creator earnings, payment history, and revenue analytics across all brand partnerships.",
    },
    invoices: {
      title: "Invoices | Kora",
      description:
        "Manage your invoices — create, send, and track payment status for all your brand deals.",
    },
    invoiceCreate: {
      title: "Create Invoice | Kora",
      description:
        "Generate a professional invoice for your brand deal with automatic details and payment terms.",
    },
    invoiceEdit: {
      title: "Edit Invoice | Kora",
      description:
        "Update invoice details, line items, and payment terms before sending to your brand partner.",
    },
    payments: {
      title: "Payments | Kora",
      description:
        "View and manage incoming payments from brand deals. Track pending, received, and overdue payments.",
    },
    templates: {
      title: "Templates | Kora",
      description:
        "Browse and manage your invoice and contract templates for faster deal setup.",
    },
    settingsProfile: {
      title: "Profile Settings | Kora",
      description:
        "Update your profile information, social accounts, and creator details.",
    },
  },

  // Error page
  notFound: {
    title: "Page Not Found | Kora",
    description:
      "The page you're looking for doesn't exist or has been moved.",
  },
};
