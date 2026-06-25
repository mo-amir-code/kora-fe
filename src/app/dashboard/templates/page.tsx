"use client";

import React, { useState } from "react";
import { TemplatesFilter, TemplateCard, CreateTemplateCard, CreateTemplateForm } from "@/components/dashboard/templates";
import { useTemplates, useCreateTemplate, useUpdateTemplate } from "@/hooks/useTemplates";
import { LuLayoutTemplate } from "react-icons/lu";
import { LoadingSpinner } from "@/components/common";
import { MessageTemplate } from "@/services/template.service";

const FILTER_OPTIONS = [
  { id: "ALL", label: "All Templates" },
  { id: "OUTREACH", label: "Brand Outreach" },
  { id: "FOLLOW_UP", label: "Follow-up" },
  { id: "NEGOTIATION", label: "Negotiation" },
  { id: "CONTRACT", label: "Contract" },
  { id: "INVOICE", label: "Invoice" },
  { id: "PAYMENT_REMINDER", label: "Payment Reminder" },
  { id: "THANK_YOU", label: "Thank You" },
  { id: "CUSTOM", label: "Custom" }
];

const Templates = () => {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [showForm, setShowForm] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<MessageTemplate | null>(null);

  const { data: templates, isLoading, error } = useTemplates(
    activeFilter === "ALL" ? undefined : activeFilter
  );
  const createMutation = useCreateTemplate();
  const updateMutation = useUpdateTemplate();

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedTemplate(null);
  };

  if (showForm) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors p-4 sm:p-0">
        <CreateTemplateForm 
          initialData={selectedTemplate}
          onSave={async (data) => {
            if (selectedTemplate) {
              await updateMutation.mutateAsync({ id: selectedTemplate.id, data });
            } else {
              await createMutation.mutateAsync(data);
            }
            handleCloseForm();
          }} 
          onCancel={handleCloseForm} 
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 sm:gap-10 min-h-screen bg-white dark:bg-gray-900 transition-colors p-4 sm:p-0">
      <TemplatesFilter
        options={FILTER_OPTIONS}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        className="px-1" 
      />

      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-gray-500 border border-dashed border-gray-200 dark:border-gray-800 rounded-[2rem]">
          <LuLayoutTemplate size={40} className="text-red-500 opacity-20" />
          <p className="font-bold uppercase tracking-widest text-sm">Failed to load templates</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-8 pb-10 mt-1 sm:mt-2">
          {/* Aesthetic Create New Template Button/Card - Always first */}
          <CreateTemplateCard onClick={() => setShowForm(true)} />
          
          {templates?.map((template) => (
            <TemplateCard
              key={template.id}
              title={template.name}
              platforms={template.channels.map(c => c === "WHATSAPP" ? "WhatsApp" : "Email") as any}
              preview={template.body}
              lastUsed="Recently"
              onEdit={() => {
                setSelectedTemplate(template);
                setShowForm(true);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Templates;