"use client";

import React, { useState } from "react";
import TemplatesFilter from "@/components/dashboard/templates/TemplatesFilter";
import TemplateCard from "@/components/dashboard/templates/TemplateCard";
import CreateTemplateCard from "@/components/dashboard/templates/CreateTemplateCard";

const FILTER_OPTIONS = [
  { id: "reminder", label: "Payment Reminder" },
  { id: "followup", label: "Invoice Follow-up" },
  { id: "pitch", label: "Deal Pitch" },
  { id: "deliverable", label: "Deliverable Submitted" },
  { id: "thanks", label: "Thank You" },
];

type Platform = "WhatsApp" | "Email";

interface Template {
  id: number;
  category: string;
  title: string;
  platforms: Platform[];
  preview: string;
  lastUsed: string;
}

const TEMPLATESDATA: Template[] = [
  {
    id: 1,
    category: "reminder",
    title: "Gentle Payment Nudge",
    platforms: ["WhatsApp", "Email"],
    preview: "Hi [Brand Contact], hope you're having a great week! Just dropping a quick note to check on the status of invoice #...",
    lastUsed: "2 days ago",
  },
  {
    id: 2,
    category: "reminder",
    title: "Overdue Invoice - Final Notice",
    platforms: ["Email"],
    preview: "Dear [Brand Contact], This is a formal follow-up regarding invoice #[Invoice Number] which is now [Days Overdue] da...",
    lastUsed: "12 days ago",
  },
  {
    id: 3,
    category: "reminder",
    title: "Pre-payment Confirmation",
    platforms: ["WhatsApp"],
    preview: "Hey [Brand Contact]! We're scheduled to start shooting tomorrow. Just confirming if the 50% advance payment has...",
    lastUsed: "5 days ago",
  },
];

const Templates = () => {
  const [activeFilter, setActiveFilter] = useState("reminder");

  const filteredTemplates = TEMPLATESDATA.filter(t => t.category === activeFilter);

  return (
    <div className="flex flex-col gap-6 sm:gap-10 min-h-screen bg-white dark:bg-gray-900 transition-colors p-4 sm:p-0">
      <TemplatesFilter
        options={FILTER_OPTIONS}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        className="px-1" 
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-8 pb-10">
        {filteredTemplates.map((template) => (
          <TemplateCard
            key={template.id}
            title={template.title}
            platforms={template.platforms}
            preview={template.preview}
            lastUsed={template.lastUsed}
          />
        ))}
        {/* Aesthetic Create New Template Button/Card */}
        <CreateTemplateCard />
      </div>
    </div>
  );
};

export default Templates;