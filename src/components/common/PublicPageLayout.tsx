import React from "react";
import { Navbar, FooterCTA, ThemeToggle } from "@/components/landing";

interface PublicPageLayoutProps {
  children: React.ReactNode;
  showCTA?: boolean;
}

export const PublicPageLayout: React.FC<PublicPageLayoutProps> = ({
  children,
}) => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-slate-700 dark:text-slate-300 font-sans selection:bg-brand-500/30 transition-colors duration-300 flex flex-col justify-between">
      <Navbar />
      <main className="flex-grow pt-20 sm:pt-24">{children}</main>
      <FooterCTA />
      <ThemeToggle />
    </div>
  );
};
