import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail, Linkedin, Download } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const HeroSection = ({ scrollToSection }) => {
  const handleEmail = () => {
    scrollToSection("contacto");
  };

  const handleDownloadCV = () => {
    const link = document.createElement("a");
    link.href = "/FrancoTillard-CV.pdf";
    link.download = "FrancoTillard-CV.pdf";
    link.click();
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-4xl mx-auto relative z-10 flex flex-col items-start text-left">
        <div className="flex items-center gap-4 mb-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="relative inline-block"
          >
            <div className="w-16 h-16 rounded-full glass-effect p-1">
              <img
                class="w-full h-full rounded-full object-cover"
                alt="Franco - Desarrollador FullStack"
                src="/HeroPic.png"
              />
            </div>
          </motion.div>
          <a
            href="https://www.linkedin.com/in/tillardfrancotomas/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="available-btn text-xs px-3 py-1">
              <span className="available-dot" />
              Disponible para trabajar
            </Button>
          </a>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-3 text-foreground">
          Hola, soy <span className="gradient-text">Franco</span>
        </h1>

        <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-xl">
          Desarrollador fullstack y estudiante avanzado de Ingeniería en
          Software, con gran interés en el aprendizaje constante y las nuevas
          tecnologías.
        </p>

        <div className="flex flex-wrap gap-3 justify-start items-center">
          <Button
            onClick={handleEmail}
            variant="outline"
            className="border-border text-foreground px-5 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:bg-accent"
          >
            <Mail className="w-4 h-4" />
            Contáctame
          </Button>
          <a
            href="https://www.linkedin.com/in/tillardfrancotomas/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              className="border-border text-foreground px-5 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:bg-accent"
            >
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </Button>
          </a>

          <Button
            onClick={handleDownloadCV}
            variant="outline"
            className="border-border text-foreground px-5 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:bg-accent"
          >
            <Download className="w-4 h-4" />
            Curriculum Vitae
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
