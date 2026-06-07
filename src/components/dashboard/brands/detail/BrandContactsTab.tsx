"use client";

import React, { useState } from "react";
import { LuMail, LuPhone, LuMessageSquare, LuPlus, LuX, LuLoader, LuPencil, LuTrash2, LuStar } from "react-icons/lu";

export interface BrandContact {
  id?: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  isPrimary?: boolean;
}

interface BrandContactsTabProps {
  contacts: BrandContact[];
  showAddForm?: boolean;
  onToggleAddForm?: () => void;
  onAddContact?: (data: { name: string; role: string; email: string; whatsapp: string; isPrimary: boolean }) => void;
  onUpdateContact?: (contactId: string, data: { name?: string; role?: string; email?: string; whatsapp?: string; isPrimary?: boolean }) => void;
  onDeleteContact?: (contactId: string) => void;
  isAdding?: boolean;
}

const BrandContactsTab = ({ contacts, showAddForm, onToggleAddForm, onAddContact, onUpdateContact, onDeleteContact, isAdding }: BrandContactsTabProps) => {
  const [newContact, setNewContact] = useState({ name: "", role: "", email: "", whatsapp: "", isPrimary: false });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState({ name: "", role: "", email: "", whatsapp: "" });

  const handleSubmit = () => {
    if (!newContact.name.trim()) return;
    onAddContact?.(newContact);
    setNewContact({ name: "", role: "", email: "", whatsapp: "", isPrimary: false });
  };

  const startEdit = (contact: BrandContact) => {
    if (!contact.id) return;
    setEditingId(contact.id);
    setEditData({ name: contact.name, role: contact.role, email: contact.email, whatsapp: contact.phone });
  };

  const saveEdit = () => {
    if (!editingId || !editData.name.trim()) return;
    onUpdateContact?.(editingId, {
      name: editData.name.trim(),
      role: editData.role.trim() || undefined,
      email: editData.email.trim() || undefined,
      whatsapp: editData.whatsapp.trim() || undefined,
    });
    setEditingId(null);
  };

  const handleMakePrimary = (contactId: string) => {
    onUpdateContact?.(contactId, { isPrimary: true });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
      {contacts.map((contact, index) => (
        <div
          key={contact.id || index}
          className="relative p-5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 hover:border-gray-300 dark:hover:border-gray-700 transition-all group"
        >
          {contact.isPrimary && (
            <span className="absolute top-4 right-4 px-2 py-0.5 rounded-lg bg-brand-500/10 text-brand-500 text-[9px] font-bold uppercase tracking-wider">
              Primary
            </span>
          )}

          {/* Edit/Delete/Primary actions */}
          {contact.id && !contact.isPrimary && (
            <div className="absolute top-4 right-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => handleMakePrimary(contact.id!)}
                title="Make primary"
                className="p-1.5 rounded-lg text-gray-400 hover:text-amber-500 hover:bg-amber-500/5 transition-all"
              >
                <LuStar size={13} />
              </button>
              <button
                onClick={() => startEdit(contact)}
                title="Edit"
                className="p-1.5 rounded-lg text-gray-400 hover:text-brand-500 hover:bg-brand-500/5 transition-all"
              >
                <LuPencil size={13} />
              </button>
              <button
                onClick={() => onDeleteContact?.(contact.id!)}
                title="Delete"
                className="p-1.5 rounded-lg text-gray-400 hover:text-rose-500 hover:bg-rose-500/5 transition-all"
              >
                <LuTrash2 size={13} />
              </button>
            </div>
          )}
          {contact.id && contact.isPrimary && (
            <div className="absolute top-10 right-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => startEdit(contact)}
                title="Edit"
                className="p-1.5 rounded-lg text-gray-400 hover:text-brand-500 hover:bg-brand-500/5 transition-all"
              >
                <LuPencil size={13} />
              </button>
            </div>
          )}

          {/* Edit mode */}
          {editingId === contact.id ? (
            <div className="space-y-2.5">
              <input
                type="text"
                value={editData.name}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                placeholder="Name"
                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-sm text-gray-900 dark:text-white outline-none focus:border-brand-500"
              />
              <input
                type="text"
                value={editData.role}
                onChange={(e) => setEditData({ ...editData, role: e.target.value })}
                placeholder="Role"
                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-sm text-gray-900 dark:text-white outline-none focus:border-brand-500"
              />
              <input
                type="email"
                value={editData.email}
                onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                placeholder="Email"
                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-sm text-gray-900 dark:text-white outline-none focus:border-brand-500"
              />
              <input
                type="text"
                value={editData.whatsapp}
                onChange={(e) => setEditData({ ...editData, whatsapp: e.target.value })}
                placeholder="WhatsApp"
                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-sm text-gray-900 dark:text-white outline-none focus:border-brand-500"
              />
              <div className="flex gap-2">
                <button onClick={saveEdit} className="flex-1 py-2 rounded-xl bg-brand-500 text-white text-xs font-bold">Save</button>
                <button onClick={() => setEditingId(null)} className="flex-1 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-bold text-gray-600 dark:text-gray-400">Cancel</button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center">
                  <span className="text-sm font-bold text-gray-500 dark:text-gray-400">
                    {contact.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white">{contact.name}</h4>
                  <p className="text-xs text-gray-400 dark:text-gray-500">{contact.role}</p>
                </div>
              </div>

              <div className="space-y-2.5 mb-5">
                {contact.email && (
                  <div className="flex items-center gap-2.5 text-xs text-gray-500 dark:text-gray-400">
                    <LuMail size={14} className="text-gray-400 shrink-0" />
                    <span className="truncate">{contact.email}</span>
                  </div>
                )}
                {contact.phone && (
                  <div className="flex items-center gap-2.5 text-xs text-gray-500 dark:text-gray-400">
                    <LuPhone size={14} className="text-gray-400 shrink-0" />
                    <span>{contact.phone}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-gray-100 dark:border-gray-800">
                {contact.email && (
                  <a
                    href={`mailto:${contact.email}`}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                  >
                    <LuMail size={13} />
                    Email
                  </a>
                )}
                {contact.phone && (
                  <a
                    href={`https://wa.me/${contact.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 transition-all"
                  >
                    <LuMessageSquare size={13} />
                    WhatsApp
                  </a>
                )}
              </div>
            </>
          )}
        </div>
      ))}

      {/* Add New Contact Card / Form */}
      {showAddForm ? (
        <div className="p-5 rounded-2xl border border-brand-500/30 bg-white dark:bg-gray-900/50 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-brand-500 uppercase tracking-wider">New Contact</span>
            <button onClick={onToggleAddForm} className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <LuX size={16} />
            </button>
          </div>
          <input type="text" placeholder="Contact name *" value={newContact.name} onChange={(e) => setNewContact({ ...newContact, name: e.target.value })} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-sm text-gray-900 dark:text-white outline-none focus:border-brand-500" />
          <input type="text" placeholder="Role" value={newContact.role} onChange={(e) => setNewContact({ ...newContact, role: e.target.value })} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-sm text-gray-900 dark:text-white outline-none focus:border-brand-500" />
          <input type="email" placeholder="Email" value={newContact.email} onChange={(e) => setNewContact({ ...newContact, email: e.target.value })} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-sm text-gray-900 dark:text-white outline-none focus:border-brand-500" />
          <input type="text" placeholder="WhatsApp number" value={newContact.whatsapp} onChange={(e) => setNewContact({ ...newContact, whatsapp: e.target.value })} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-sm text-gray-900 dark:text-white outline-none focus:border-brand-500" />
          <button onClick={handleSubmit} disabled={!newContact.name.trim() || isAdding} className="w-full py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
            {isAdding ? <LuLoader size={14} className="animate-spin" /> : <LuPlus size={14} />}
            {isAdding ? "Adding..." : "Add Contact"}
          </button>
        </div>
      ) : (
        <div onClick={onToggleAddForm} className="p-5 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center text-center min-h-[200px] hover:border-brand-500/30 hover:bg-brand-500/[0.02] transition-all cursor-pointer group">
          <div className="w-12 h-12 rounded-full border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center mb-3 group-hover:border-brand-500/50 transition-colors">
            <LuPlus size={20} className="text-gray-400 group-hover:text-brand-500 transition-colors" />
          </div>
          <p className="text-sm font-bold text-gray-500 dark:text-gray-400 group-hover:text-brand-500 transition-colors">Add New Contact</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Add another point of contact for this brand</p>
        </div>
      )}
    </div>
  );
};

export default BrandContactsTab;
