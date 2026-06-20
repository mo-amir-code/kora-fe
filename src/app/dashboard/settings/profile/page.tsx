"use client";

import Link from "next/link";
import { LuArrowLeft, LuLoader } from "react-icons/lu";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import { ProfileIdentityCard } from "@/components/dashboard/settings/profile/ProfileIdentityCard";
import { ProfileFormCard } from "@/components/dashboard/settings/profile/ProfileFormCard";

export default function ProfileSettingsPage() {
  const { data: userData, isLoading, refetch } = useQuery({
    queryKey: ["user-me"],
    queryFn: async () => {
      const res = await api.get("/user/me");
      return res.data.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <LuLoader className="w-10 h-10 text-brand-500 animate-spin" />
        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Loading Profile...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-6 sm:py-10 px-4 sm:px-6 space-y-10">
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:gap-6">
        <Link 
          href="/dashboard/settings"
          className="group flex items-center gap-2 text-gray-400 hover:text-brand-500 transition-colors"
        >
          <div className="p-2 rounded-full border border-gray-200 dark:border-gray-800 group-hover:border-brand-500/50 group-hover:bg-brand-500/5 transition-all">
            <LuArrowLeft size={16} strokeWidth={2.5} />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest ml-1">Back to Settings</span>
        </Link>
        
        <div className="space-y-1">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Edit Profile
          </h1>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 font-medium">
            Manage your personal information and public creator presence.
          </p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Identity Card (4 columns) */}
        <div className="lg:col-span-4 lg:sticky lg:top-8">
          <ProfileIdentityCard user={userData} onUpdate={refetch} />
        </div>

        {/* Right: Detailed Form (8 columns) */}
        <div className="lg:col-span-8">
          <ProfileFormCard user={userData} onUpdate={refetch} />
        </div>
      </div>

      {/* Footer Info */}
      <div className="pt-10 border-t border-gray-100 dark:border-gray-800 flex items-center justify-center text-center">
        <p className="text-[10px] text-gray-400 dark:text-gray-600 font-bold uppercase tracking-[0.2em]">
          End-to-End Encryption Enabled • Highly Secure Profile Management
        </p>
      </div>
    </div>
  );
}