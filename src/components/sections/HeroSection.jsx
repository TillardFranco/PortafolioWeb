import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail, Linkedin, Github, Download, ArrowDown, Sparkles } from "lucide-react";

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

  const handleScrollDown = () => {
    scrollToSection("experiencia-formacion");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="w-full max-w-6xl mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col md:flex-row items-center gap-12 md:gap-16"
        >
          {/* Left side - Image and badge */}
          <motion.div
            variants={itemVariants}
            className="flex-shrink-0 order-2 md:order-1"
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-2xl animate-pulse" />
              
              {/* Image container */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 200, 
                  damping: 20,
                  delay: 0.4 
                }}
                className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-primary/20 dark:border-primary/30 shadow-2xl"
              >
                <img
                  className="w-full h-full object-cover"
                  alt="Franco - Desarrollador FullStack"
                  src="/HeroPic.png"
                />
                {/* Animated border */}
                <div className="absolute inset-0 rounded-full border-4 border-transparent bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 opacity-20 animate-spin-slow" 
                  style={{ animationDuration: '8s' }} />
              </motion.div>

              {/* Floating badge */}
              <motion.a
                href="https://www.linkedin.com/in/tillardfrancotomas/"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -bottom-4 left-1/2 transform -translate-x-1/2"
              >
                <Button className="available-btn text-xs px-4 py-2 shadow-lg hover:shadow-xl">
                  <span className="available-dot" />
                  Available for work
                </Button>
              </motion.a>
            </div>
          </motion.div>

          {/* Right side - Content */}
          <motion.div
            variants={itemVariants}
            className="flex-1 text-center md:text-left order-1 md:order-2"
          >
            {/* Greeting */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 backdrop-blur-sm mb-6"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">
                FullStack Developer
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            >
              <span className="block text-foreground">Hi, I'm</span>
              <span className="block gradient-text mt-2">Franco Tillard</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto md:mx-0 leading-relaxed"
            >
              FullStack developer and advanced{" "}
              <span className="font-semibold text-foreground">Software Engineering</span> student, 
              with a strong interest in continuous learning and new technologies.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 justify-center md:justify-start items-center mb-12"
            >
              <Button
                onClick={handleEmail}
                size="lg"
                className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Contact Me
                </span>
                <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </Button>

              <a
                href="https://www.linkedin.com/in/tillardfrancotomas/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-border hover:border-primary text-foreground px-8 py-6 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:bg-accent/50 backdrop-blur-sm"
                >
                  <Linkedin className="w-5 h-5 mr-2" />
                  LinkedIn
                </Button>
              </a>

              <a
                href="https://github.com/tillardfranco"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-border hover:border-primary text-foreground px-8 py-6 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:bg-accent/50 backdrop-blur-sm"
                >
                  <Github className="w-5 h-5 mr-2" />
                  GitHub
                </Button>
              </a>

              <Button
                onClick={handleDownloadCV}
                size="lg"
                variant="outline"
                className="border-2 border-border hover:border-primary text-foreground px-8 py-6 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:bg-accent/50 backdrop-blur-sm"
              >
                <Download className="w-5 h-5 mr-2" />
                CV
              </Button>
            </motion.div>

            {/* Scroll indicator */}
            <motion.button
              onClick={handleScrollDown}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
            >
              <span className="text-sm font-medium">Explore more</span>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowDown className="w-5 h-5" />
              </motion.div>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
