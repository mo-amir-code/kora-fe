"use client";

import React, { useState } from "react";
import { PublicPageLayout } from "@/components/common";
import { APP_NAME } from "@/lib/constants";
import { supportService } from "@/services/support.service";
import toast from "react-hot-toast";
import {
  LuMail,
  LuClock,
  LuMessageSquare,
  LuCircleCheck,
  LuSend,
  LuLoader,
} from "react-icons/lu";
import { FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

export default function ContactPage() {
  const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "support@kora.com";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) {
      newErrors.message = "Message cannot be empty";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await supportService.submitInquiry({
        name: formData.name,
        email: formData.email,
        category: "General Inquiry",
        subject: formData.subject,
        message: formData.message,
      });
      toast.success("Message sent successfully!");
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <PublicPageLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-20 space-y-10 sm:space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 sm:space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-600 dark:text-brand-400 text-[11px] sm:text-xs font-bold uppercase tracking-wider">
            Contact Support
          </div>
          <h1 className="text-2xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            We&apos;re Here to Help You Succeed
          </h1>
          <p className="text-sm sm:text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-normal px-2">
            Have questions about {APP_NAME}, feedback, or partnership opportunities? Send us a message and our team will respond promptly.
          </p>
        </div>

        {/* Grid: Info Cards + Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Left Side: Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-white/5 space-y-6">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <LuMessageSquare className="w-5 h-5 text-brand-500" />
                Contact Information
              </h2>

              <div className="space-y-5">
                <div className="flex items-start gap-3.5 sm:gap-4">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-brand-500/10 text-brand-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <LuMail className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h3 className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Email Us
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white mt-0.5 break-all">
                      {supportEmail}
                    </p>
                    <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                      For general inquiries & customer support
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 sm:gap-4">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-brand-500/10 text-brand-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <LuClock className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h3 className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Business Hours
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white mt-0.5">
                      Monday – Sunday: 24/7 Support
                    </p>
                    <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                      Available 24 hours a day, 7 days a week
                    </p>
                  </div>
                </div>
              </div>

              <hr className="border-t border-slate-200 dark:border-gray-800" />

              <div>
                <h3 className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Connect With Us
                </h3>
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 text-slate-600 dark:text-slate-300 flex items-center justify-center hover:text-brand-500 dark:hover:text-brand-400 hover:border-brand-500 transition-colors"
                    aria-label="Twitter"
                  >
                    <FaTwitter className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 text-slate-600 dark:text-slate-300 flex items-center justify-center hover:text-brand-500 dark:hover:text-brand-400 hover:border-brand-500 transition-colors"
                    aria-label="Instagram"
                  >
                    <FaInstagram className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 text-slate-600 dark:text-slate-300 flex items-center justify-center hover:text-brand-500 dark:hover:text-brand-400 hover:border-brand-500 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </a>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 text-slate-600 dark:text-slate-300 flex items-center justify-center hover:text-brand-500 dark:hover:text-brand-400 hover:border-brand-500 transition-colors"
                    aria-label="YouTube"
                  >
                    <FaYoutube className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 shadow-sm">
              {isSubmitted ? (
                <div className="text-center py-8 sm:py-12 space-y-6">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-3xl mx-auto">
                    <LuCircleCheck className="w-8 h-8 sm:w-10 sm:h-10" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                      Thank you for reaching out. A member of the {APP_NAME} team will review your message and reply via email shortly.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-100 dark:bg-gray-800 hover:bg-slate-200 dark:hover:bg-gray-700 text-slate-900 dark:text-white text-xs sm:text-sm font-semibold transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6" noValidate>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                    Send Us a Message
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                    {/* Name */}
                    <div className="space-y-1.5 sm:space-y-2">
                      <label
                        htmlFor="name"
                        className="block text-[11px] sm:text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider"
                      >
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Alex Rivera"
                        className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-gray-950 border text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 transition-all ${
                          errors.name
                            ? "border-red-500 focus:ring-red-500/20"
                            : "border-slate-200 dark:border-gray-800 focus:border-brand-500 focus:ring-brand-500/20"
                        }`}
                      />
                      {errors.name && (
                        <p className="text-[11px] text-red-500 mt-1">{errors.name}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5 sm:space-y-2">
                      <label
                        htmlFor="email"
                        className="block text-[11px] sm:text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="alex@example.com"
                        className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-gray-950 border text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 transition-all ${
                          errors.email
                            ? "border-red-500 focus:ring-red-500/20"
                            : "border-slate-200 dark:border-gray-800 focus:border-brand-500 focus:ring-brand-500/20"
                        }`}
                      />
                      {errors.email && (
                        <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-1.5 sm:space-y-2">
                    <label
                      htmlFor="subject"
                      className="block text-[11px] sm:text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider"
                    >
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="e.g. Question about Pro Plan features"
                      className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-gray-950 border text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 transition-all ${
                        errors.subject
                          ? "border-red-500 focus:ring-red-500/20"
                          : "border-slate-200 dark:border-gray-800 focus:border-brand-500 focus:ring-brand-500/20"
                      }`}
                    />
                    {errors.subject && (
                      <p className="text-[11px] text-red-500 mt-1">{errors.subject}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5 sm:space-y-2">
                    <label
                      htmlFor="message"
                      className="block text-[11px] sm:text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="How can we help you today?"
                      className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-gray-950 border text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 transition-all resize-y ${
                        errors.message
                          ? "border-red-500 focus:ring-red-500/20"
                          : "border-slate-200 dark:border-gray-800 focus:border-brand-500 focus:ring-brand-500/20"
                      }`}
                    />
                    {errors.message && (
                      <p className="text-[11px] text-red-500 mt-1">{errors.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-brand-500 hover:bg-brand-600 disabled:opacity-70 text-white font-bold text-xs sm:text-sm transition-all shadow-lg shadow-brand-500/20"
                  >
                    {isSubmitting ? (
                      <>
                        <LuLoader className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <LuSend className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </PublicPageLayout>
  );
}
