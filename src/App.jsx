import React from "react";
import { Helmet } from "react-helmet";
import { MotionConfig } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import QuoteSection from "@/components/sections/QuoteSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import StackSection from "@/components/sections/StackSection";
import ContactSection from "@/components/sections/ContactSection";
import { useLanguage } from "@/i18n/LanguageProvider";

function App() {
  const { lang, t } = useLanguage();

  return (
    <MotionConfig reducedMotion="user">
      <Helmet htmlAttributes={{ lang }}>
        <title>{t("meta.title")}</title>
        <meta name="description" content={t("meta.description")} />
        <meta property="og:title" content={t("meta.title")} />
        <meta property="og:description" content={t("meta.description")} />
      </Helmet>

      <Navbar />
      <main>
        <HeroSection />
        <QuoteSection />
        <ProjectsSection />
        <ExperienceSection />
        <StackSection />
        <ContactSection />
      </main>
    </MotionConfig>
  );
}

export default App;
