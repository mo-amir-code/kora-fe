"use client";

import React, { useRef, useState } from "react";
import { LuCamera, LuTrash2, LuImage, LuLoader } from "react-icons/lu";
import api from "@/lib/axios";
import toast from "react-hot-toast";

interface UserProfile {
  fullName: string;
  handle: string;
  avatarUrl: string | null;
}

interface ProfileIdentityCardProps {
  user?: UserProfile;
  onUpdate?: () => void;
}

export const ProfileIdentityCard = ({ user, onUpdate }: ProfileIdentityCardProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (5MB as per backend)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setIsUploading(true);
    const toastId = toast.loading("Updating profile photo...");

    try {
      // 1. Upload to cloud
      const uploadRes = await api.post("/upload", formData, {
        headers: { "doc-id": "profile", "Content-Type": "multipart/form-data" },
      });

      const newAvatarUrl = uploadRes.data.data.url;

      // 2. Update user profile
      await api.patch("/user/me", { avatarUrl: newAvatarUrl });

      toast.success("Profile photo updated", { id: toastId });
      onUpdate?.();
    } catch (error: any) {
      console.error("Upload error:", error);
      toast.error(error.response?.data?.message || "Failed to update photo", { id: toastId });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const removeAvatar = async () => {
    if (!user?.avatarUrl) return;
    
    setIsUploading(true);
    const toastId = toast.loading("Removing photo...");

    try {
      await api.patch("/user/me", { avatarUrl: null });
      toast.success("Profile photo removed", { id: toastId });
      onUpdate?.();
    } catch (error: any) {
      toast.error("Failed to remove photo", { id: toastId });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="relative overflow-hidden p-6 sm:p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 group">
      <div className="relative flex flex-col items-center gap-6">
        {/* Avatar Display */}
        <div className="relative group/avatar">
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-gray-50 dark:border-gray-800 overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center transition-transform duration-500 group-hover/avatar:scale-105 relative">
            {isUploading && (
              <div className="absolute inset-0 z-20 bg-white/60 dark:bg-gray-900/60 backdrop-blur-[2px] flex items-center justify-center">
                <LuLoader className="w-8 h-8 text-brand-500 animate-spin" />
              </div>
            )}
            
            {user?.avatarUrl ? (
              <img src={user.avatarUrl} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="text-gray-400 dark:text-gray-600">
                <LuCamera size={40} strokeWidth={1.5} />
              </div>
            )}
          </div>
          
          <button 
            type="button"
            disabled={isUploading}
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-1 right-1 p-2 rounded-full bg-brand-500 text-white hover:bg-brand-600 transition-all active:scale-90 disabled:opacity-50 z-30"
            title="Update Photo"
          >
            <LuCamera size={16} />
          </button>
        </div>

        {/* Identity Info */}
        <div className="text-center space-y-1">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1">
            {user?.fullName || "Loading..."}
          </h2>
          <p className="text-xs font-semibold text-brand-500 uppercase tracking-widest truncate">
            {user?.handle ? `@${user.handle}` : "No handle"}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 w-full">
          <button 
            type="button"
            disabled={isUploading}
            onClick={() => fileInputRef.current?.click()}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 text-xs font-bold hover:bg-gray-50 dark:hover:bg-white/5 transition-all active:scale-[0.98] disabled:opacity-50"
          >
            <LuImage size={14} />
            Change
          </button>
          <button 
            type="button"
            disabled={isUploading || !user?.avatarUrl}
            onClick={removeAvatar}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-error-100 dark:border-error-500/20 text-error-500 text-xs font-bold hover:bg-error-50 dark:hover:bg-error-500/5 transition-all active:scale-[0.98] disabled:opacity-30"
          >
            <LuTrash2 size={14} />
            Remove
          </button>
        </div>

        {/* Requirements Text */}
        <div className="w-full pt-4 border-t border-gray-100 dark:border-gray-800">
          <p className="text-[10px] text-gray-400 dark:text-gray-500 text-center leading-relaxed font-medium uppercase tracking-tighter">
            Recommended: 500x500px • Max: 5MB (JPG, PNG)
          </p>
        </div>
      </div>

      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
};
