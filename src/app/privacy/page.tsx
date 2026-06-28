import React from "react";
import { PublicPageLayout } from "@/components/common";
import { allMetadata } from "@/utils/data/metadata";
import { APP_NAME } from "@/lib/constants";
import Link from "next/link";

export const metadata = allMetadata.privacy;

export default function PrivacyPage() {
  const lastUpdated = "June 28, 2026";

  const sections = [
    {
      id: "information-collected",
      title: "1. Information We Collect",
      content: (
        <div className="space-y-3">
          <p>
            When you register for or use {APP_NAME}, we collect personal and operational data necessary to provide our sponsorship management services:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Account Information:</strong> Your full name, email address, profile picture, social media channel details, and encrypted login credentials.
            </li>
            <li>
              <strong>Business & Deal Data:</strong> Brand partner contact details, sponsorship agreement terms, deliverable posting dates, invoice line items, and payout amounts.
            </li>
            <li>
              <strong>Payment & Billing Details:</strong> Bank account numbers, UPI IDs, GST/tax registration numbers, and billing addresses required for invoice generation.
            </li>
            <li>
              <strong>Technical Data:</strong> IP address, device type, browser specifications, operating system, and standard server log information.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "how-data-used",
      title: "2. How We Use Your Data",
      content: (
        <div className="space-y-3">
          <p>We process your information strictly for legitimate business purposes including:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Operating, maintaining, and improving the {APP_NAME} platform and dashboard features.</li>
            <li>Generating PDF invoices and dispatching automated WhatsApp and email payment reminders to designated brand contacts on your behalf.</li>
            <li>Calculating revenue analytics, earnings trends, and content deliverable schedules.</li>
            <li>Providing responsive customer support and communicating critical security updates or service changes.</li>
            <li>Detecting and preventing fraudulent transactions or unauthorized access.</li>
          </ul>
        </div>
      ),
    },
    {
      id: "cookies",
      title: "3. Cookies & Tracking Technologies",
      content: (
        <div className="space-y-3">
          <p>
            {APP_NAME} uses essential cookies and similar session storage technologies to maintain user authentication states, remember dark/light theme preferences, and secure your session. You can configure your browser to block or alert you about these cookies, but portions of the app may not function properly without them.
          </p>
        </div>
      ),
    },
    {
      id: "analytics",
      title: "4. Analytics & Third-Party Services",
      content: (
        <div className="space-y-3">
          <p>
            We partner with trusted third-party service providers to facilitate infrastructure operations, transactional communications, and platform analytics:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Messaging Providers:</strong> Official Meta/WhatsApp Business APIs for sending automated payment reminder notifications.</li>
            <li><strong>Email Gateways:</strong> SMTP and transactional email services for password resets and system notifications.</li>
            <li><strong>Cloud Hosting & Databases:</strong> Secure cloud infrastructure providers operating with SOC-2 compliant data centers.</li>
          </ul>
        </div>
      ),
    },
    {
      id: "data-retention",
      title: "5. Data Retention & Storage",
      content: (
        <div className="space-y-3">
          <p>
            We retain your active account data, deal history, and invoices for as long as your account remains active or as needed to provide services to you. You may request account deletion or data export at any time. Invoices and financial tax records may be retained for longer periods to satisfy statutory legal and accounting obligations.
          </p>
        </div>
      ),
    },
    {
      id: "user-rights",
      title: "6. User Rights & Choices",
      content: (
        <div className="space-y-3">
          <p>Depending on your jurisdiction, you possess specific data privacy rights:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Right to Access:</strong> Request a copy of the personal and business data we hold about you.</li>
            <li><strong>Right to Rectification:</strong> Update or correct inaccurate profile details from your account settings.</li>
            <li><strong>Right to Erasure (Right to be Forgotten):</strong> Request the permanent deletion of your account and associated deal records.</li>
            <li><strong>Data Portability:</strong> Export your deal metrics and invoice data in structured formats (CSV/PDF).</li>
          </ul>
        </div>
      ),
    },
    {
      id: "security",
      title: "7. Data Security Measures",
      content: (
        <div className="space-y-3">
          <p>
            We implement robust physical, technical, and organizational security measures to safeguard your information. All data transmissions are encrypted using standard TLS 1.3 encryption. Passwords and sensitive API tokens are cryptographically hashed using industry-standard algorithms.
          </p>
        </div>
      ),
    },
    {
      id: "childrens-privacy",
      title: "8. Children's Privacy",
      content: (
        <div className="space-y-3">
          <p>
            {APP_NAME} is intended strictly for professional creators and businesses. We do not knowingly collect or solicit personal information from children under the age of 18. If we learn that we have collected personal data from a child under 18 without parental consent, we will delete that information promptly.
          </p>
        </div>
      ),
    },
    {
      id: "policy-updates",
      title: "9. Policy Updates",
      content: (
        <div className="space-y-3">
          <p>
            We may update this Privacy Policy periodically to reflect changes in legal requirements or platform features. We will notify users of material updates via email or prominent dashboard notices prior to the changes taking effect.
          </p>
        </div>
      ),
    },
    {
      id: "contact-information",
      title: "10. Contact Us Information",
      content: (
        <div className="space-y-3">
          <p>
            If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact our Data Protection Officer at:
          </p>
          <div className="p-4 rounded-xl bg-slate-100 dark:bg-gray-800 text-sm space-y-1 font-mono">
            <p><strong>Email:</strong> privacy@kora.com</p>
            <p><strong>Address:</strong> Kora Data Privacy Team, Creator OS Inc.</p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <PublicPageLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20 space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-slate-200 dark:border-gray-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-wider">
            Legal Document
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Last updated: {lastUpdated}
          </p>
        </div>

        {/* Quick Table of Contents */}
        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-white/5 space-y-3">
          <h2 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Table of Contents
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
            {sections.map((sec, idx) => (
              <a
                key={idx}
                href={`#${sec.id}`}
                className="text-slate-600 dark:text-slate-400 hover:text-brand-500 dark:hover:text-brand-400 transition-colors"
              >
                {sec.title}
              </a>
            ))}
          </div>
        </div>

        {/* Policy Sections */}
        <div className="space-y-10">
          {sections.map((sec) => (
            <section id={sec.id} key={sec.id} className="space-y-4 scroll-mt-28">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                {sec.title}
              </h2>
              <div className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                {sec.content}
              </div>
            </section>
          ))}
        </div>

        {/* Bottom Contact CTA */}
        <div className="pt-8 border-t border-slate-200 dark:border-gray-800 text-center space-y-4">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Have questions about your privacy rights or data handling?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-slate-900 dark:bg-gray-800 hover:bg-slate-800 dark:hover:bg-gray-700 text-white text-sm font-semibold transition-colors"
          >
            Contact Our Privacy Team
          </Link>
        </div>
      </div>
    </PublicPageLayout>
  );
}
