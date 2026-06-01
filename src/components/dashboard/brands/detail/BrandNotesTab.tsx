"use client";

import React, { useState } from "react";
import { LuPencil, LuTrash2, LuCheck, LuX } from "react-icons/lu";

interface BrandNotesTabProps {
  notes: string[];
  onAddNote: (note: string) => void;
  onEditNote: (index: number, note: string) => void;
  onDeleteNote: (index: number) => void;
}

const BrandNotesTab = ({ notes, onAddNote, onEditNote, onDeleteNote }: BrandNotesTabProps) => {
  const [newNote, setNewNote] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");

  const handlePost = () => {
    if (newNote.trim()) {
      onAddNote(newNote.trim());
      setNewNote("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handlePost();
    }
  };

  const startEdit = (index: number) => {
    setEditingIndex(index);
    setEditValue(notes[index]);
  };

  const confirmEdit = () => {
    if (editingIndex !== null && editValue.trim()) {
      onEditNote(editingIndex, editValue.trim());
      setEditingIndex(null);
      setEditValue("");
    }
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditValue("");
  };

  return (
    <div className="space-y-5">
      {/* New Note Input */}
      <div className="p-4 sm:p-5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50">
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Write an internal note..."
          rows={3}
          className="w-full bg-transparent text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 resize-none focus:outline-none"
        />
        <div className="flex items-center justify-end mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
          <button
            onClick={handlePost}
            disabled={!newNote.trim()}
            className="px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold transition-all active:scale-95"
          >
            Post Note
          </button>
        </div>
      </div>

      {/* Notes List */}
      <div className="space-y-3">
        {notes.map((note, index) => (
          <div
            key={index}
            className="group p-4 sm:p-5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 hover:border-gray-300 dark:hover:border-gray-700 transition-all"
          >
            {editingIndex === index ? (
              <div className="space-y-3">
                <textarea
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  rows={3}
                  className="w-full bg-gray-50 dark:bg-gray-800 rounded-xl p-3 text-sm text-gray-900 dark:text-white resize-none focus:outline-none focus:ring-2 focus:ring-brand-500/50 border border-gray-200 dark:border-gray-700"
                />
                <div className="flex items-center gap-2 justify-end">
                  <button
                    onClick={cancelEdit}
                    className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                  >
                    <LuX size={16} />
                  </button>
                  <button
                    onClick={confirmEdit}
                    className="p-2 rounded-lg text-brand-500 hover:bg-brand-500/10 transition-all"
                  >
                    <LuCheck size={16} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between gap-4">
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed flex-1">
                  {note}
                </p>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                  <button
                    onClick={() => startEdit(index)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-brand-500 hover:bg-brand-500/5 transition-all"
                  >
                    <LuPencil size={14} />
                  </button>
                  <button
                    onClick={() => onDeleteNote(index)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-rose-500 hover:bg-rose-500/5 transition-all"
                  >
                    <LuTrash2 size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        {notes.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-sm text-gray-400 dark:text-gray-500">
              No notes yet. Add your first note above.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrandNotesTab;
