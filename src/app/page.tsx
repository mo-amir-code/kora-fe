import {
  Navbar,
  HeroSection,
  FeaturesSection,
  SocialProofSection,
  FooterCTA,
  ThemeToggle,
} from "@/components/landing";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0B0F19] text-slate-700 dark:text-slate-300 font-sans selection:bg-purple-500/30 transition-colors duration-300">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <SocialProofSection />
      <FooterCTA />
      <ThemeToggle />
    </div>
  );
}
