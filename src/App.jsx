import React from "react";
import { Helmet } from "react-helmet";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import EducationExperienceSection from "@/components/sections/EducationExperienceSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import TechnologiesSection from "@/components/sections/TechnologiesSection";
import AboutSection from "@/components/sections/AboutSection";
import ContactSection from "@/components/sections/ContactSection";
import AnimatedSection from "@/components/AnimatedSection";

function App() {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Helmet>
        <title>Porfolio Tillard Franco</title>
        <meta
          name="description"
          content="Desarrollador FullStack autodidacta especializado en React, Node.js, Java y Spring Boot. Creando soluciones web innovadoras."
        />
        <meta property="og:title" content="Franco - Desarrollador FullStack" />
        <meta
          property="og:description"
          content="Desarrollador FullStack autodidacta especializado en React, Node.js, Java y Spring Boot. Creando soluciones web innovadoras."
        />
      </Helmet>

      <div className="min-h-screen bg-background text-foreground">
        <AnimatedSection delay={0}>
          <Navbar scrollToSection={scrollToSection} />
        </AnimatedSection>
        <main>
          <AnimatedSection delay={0.1}>
            <HeroSection scrollToSection={scrollToSection} />
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <EducationExperienceSection />
          </AnimatedSection>
          <AnimatedSection delay={0.3}>
            <ExperienceSection />
          </AnimatedSection>
          <AnimatedSection delay={0.4}>
            <TechnologiesSection />
          </AnimatedSection>
          <AnimatedSection delay={0.5}>
            <AboutSection />
          </AnimatedSection>
          <AnimatedSection delay={0.6}>
            <ContactSection />
          </AnimatedSection>
        </main>
        <Toaster />
      </div>
    </>
  );
}

export default App;
