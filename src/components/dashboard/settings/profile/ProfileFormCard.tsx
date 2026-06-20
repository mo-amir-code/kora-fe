import React, { useState, useEffect } from "react";
import { LuSave, LuMessageCircle, LuLoader } from "react-icons/lu";
import api from "@/lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "@/stores/auth/auth";
import { mapToAuthUser } from "@/hooks/useAuth";

interface UserProfile {
  fullName: string;
  handle: string;
  whatsappNumber: string | null;
}

interface ProfileFormCardProps {
  user?: UserProfile;
  onUpdate?: () => void;
}

export const ProfileFormCard = ({ user, onUpdate }: ProfileFormCardProps) => {
  const setUser = useAuthStore((s) => s.setUser);
  const [formData, setFormData] = useState({
    fullName: "",
    handle: "",
    whatsappNumber: ""
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        handle: user.handle || "",
        whatsappNumber: user.whatsappNumber || ""
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const toastId = toast.loading("Saving changes...");

    try {
      const userRes = await api.patch("/user/me", formData);
      
      // Sync with global AuthStore
      setUser(mapToAuthUser(userRes.data.data));

      toast.success("Profile saved successfully", { id: toastId });
      onUpdate?.();
    } catch (error: any) {
      console.error("Update error:", error);
      toast.error(error.response?.data?.message || "Failed to save profile", { id: toastId });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        handle: user.handle || "",
        whatsappNumber: user.whatsappNumber || ""
      });
    }
  };

  return (
    <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
      <form onSubmit={handleSubmit} className="space-y-10">
        {/* Primary Information Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1.5 h-6 rounded-full bg-brand-500" />
            <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest">
              My Identity
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">
                Full Name
              </label>
              <input 
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData(p => ({ ...p, fullName: e.target.value }))}
                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700/50 rounded-2xl px-5 py-3.5 text-sm font-semibold text-gray-900 dark:text-white outline-none focus:border-brand-500 transition-all disabled:opacity-50"
                disabled={isSaving}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">
                Handle
              </label>
              <div className="relative group">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-600 font-bold transition-colors group-focus-within:text-brand-500">@</span>
                <input 
                  type="text"
                  required
                  value={formData.handle}
                  onChange={(e) => setFormData(p => ({ ...p, handle: e.target.value }))}
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700/50 rounded-2xl pl-10 pr-5 py-3.5 text-sm font-semibold text-gray-900 dark:text-white outline-none focus:border-brand-500 transition-all font-mono disabled:opacity-50"
                  disabled={isSaving}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-6 rounded-full bg-success-500" />
              <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest">
                Contact Details
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2 max-w-sm">
              <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">
                WhatsApp Number
              </label>
              <div className="relative group">
                <LuMessageCircle size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-success-500" />
                <input 
                  type="text"
                  placeholder="+91 XXXXX XXXXX"
                  value={formData.whatsappNumber}
                  onChange={(e) => setFormData(p => ({ ...p, whatsappNumber: e.target.value }))}
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700/50 rounded-2xl pl-12 pr-5 py-3.5 text-sm font-bold text-gray-900 dark:text-white outline-none focus:border-brand-500 transition-all tracking-wider font-mono disabled:opacity-50"
                  disabled={isSaving}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Form Footer Actions */}
        <div className="pt-10 border-t border-gray-100 dark:border-gray-800 flex flex-col-reverse sm:flex-row items-center justify-end gap-3 sm:gap-4">
          <button 
            type="button"
            onClick={handleCancel}
            disabled={isSaving}
            className="w-full sm:w-auto px-10 py-4 rounded-2xl border border-gray-200 dark:border-gray-800 text-sm font-bold text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 transition-all active:scale-[0.98] disabled:opacity-50"
          >
            Reset
          </button>
          <button 
            type="submit"
            disabled={isSaving}
            className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-brand-500 text-white text-sm font-bold hover:bg-brand-600 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isSaving ? (
              <LuLoader size={18} className="animate-spin" />
            ) : (
              <LuSave size={18} strokeWidth={2.5} />
            )}
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};
