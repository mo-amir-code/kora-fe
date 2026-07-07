import { Metadata } from "next";
import { APP_NAME } from "@/lib/constants";

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
    title: `${APP_NAME} | Influencer Brand Deal Management Tool`,
    description:
      `${APP_NAME} is the ultimate sponsorship management platform for digital creators. Track deliverables, manage brand relationships, and automate invoicing.`,
  },

  // Auth pages
  auth: {
    signin: {
      title: `Sign In | ${APP_NAME}`,
      description:
        `Sign in to your ${APP_NAME} account to manage your brand deals, invoices, and creator partnerships.`,
    },
    signup: {
      title: `Sign Up | ${APP_NAME}`,
      description:
        `Create your free ${APP_NAME} account and start managing your influencer brand deals, deliverables, and payments.`,
    },
    forgotPassword: {
      title: `Forgot Password | ${APP_NAME}`,
      description:
        `Reset your ${APP_NAME} account password. Enter your email to receive a password reset link.`,
    },
    resetPassword: {
      title: `Reset Password | ${APP_NAME}`,
      description: `Set a new password for your ${APP_NAME} account.`,
    },
  },

  // Public Informational pages
  about: {
    title: `About Us | ${APP_NAME}`,
    description:
      `Learn about ${APP_NAME}'s mission to empower digital creators with automated deal management, professional invoicing, and financial clarity.`,
  },
  pricing: {
    title: `Pricing Plans | ${APP_NAME}`,
    description:
      `Simple, transparent pricing for creators and agencies. Choose the right plan to manage your brand sponsorships and invoices.`,
  },
  contact: {
    title: `Contact Us | ${APP_NAME}`,
    description:
      `Get in touch with the ${APP_NAME} team. We're here to help with questions, feedback, or partnership inquiries.`,
  },
  contactUs: {
    title: `Contact Us | ${APP_NAME}`,
    description:
      `Get in touch with the ${APP_NAME} team. We're here to help with questions, feedback, or partnership inquiries.`,
  },
  faq: {
    title: `Frequently Asked Questions | ${APP_NAME}`,
    description:
      `Find answers to common questions about ${APP_NAME}, sponsorship tracking, automated reminders, and invoicing.`,
  },
  privacy: {
    title: `Privacy Policy | ${APP_NAME}`,
    description:
      `Read ${APP_NAME}'s privacy policy to understand how we collect, use, and protect your personal and business data.`,
  },

  // Dashboard pages
  dashboard: {
    home: {
      title: `Dashboard | ${APP_NAME}`,
      description:
        `Your ${APP_NAME} dashboard — an overview of your active deals, upcoming deliverables, and earnings at a glance.`,
    },
    brands: {
      title: `Brands | ${APP_NAME}`,
      description:
        `Manage all your brand contacts and partnerships in one place. Track communication history and deal status.`,
    },
    brandDetail: {
      title: `Brand Details | ${APP_NAME}`,
      description:
        `View brand profile, deal history, and manage your relationship with this brand partner.`,
    },
    deals: {
      title: `Deals | ${APP_NAME}`,
      description:
        `Track all your sponsorship deals from negotiation to completion. Monitor deliverables and payment status.`,
    },
    dealDetail: {
      title: `Deal Details | ${APP_NAME}`,
      description:
        `View deal terms, deliverables, timelines, and payment information for this sponsorship.`,
    },
    calendar: {
      title: `Calendar | ${APP_NAME}`,
      description:
        `View your content calendar with posting deadlines, deliverable due dates, and brand meeting schedules.`,
    },
    earnings: {
      title: `Earnings | ${APP_NAME}`,
      description:
        `Track your creator earnings, payment history, and revenue analytics across all brand partnerships.`,
    },
    invoices: {
      title: `Invoices | ${APP_NAME}`,
      description:
        `Manage your invoices — create, send, and track payment status for all your brand deals.`,
    },
    invoiceCreate: {
      title: `Create Invoice | ${APP_NAME}`,
      description:
        `Generate a professional invoice for your brand deal with automatic details and payment terms.`,
    },
    invoiceEdit: {
      title: `Edit Invoice | ${APP_NAME}`,
      description:
        `Update invoice details, line items, and payment terms before sending to your brand partner.`,
    },
    payments: {
      title: `Payments | ${APP_NAME}`,
      description:
        `View and manage incoming payments from brand deals. Track pending, received, and overdue payments.`,
    },
    templates: {
      title: `Templates | ${APP_NAME}`,
      description:
        `Browse and manage your invoice and contract templates for faster deal setup.`,
    },
    settingsProfile: {
      title: `Profile Settings | ${APP_NAME}`,
      description:
        `Update your profile information, social accounts, and creator details.`,
    },
  },

  // Error page
  notFound: {
    title: `Page Not Found | ${APP_NAME}`,
    description:
      `The page you're looking for doesn't exist or has been moved.`,
  },
};
