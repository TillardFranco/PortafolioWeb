import React from "react";
import { motion } from "framer-motion";
import {
  Code,
  Database,
  Server,
  Globe,
  Zap,
  Coffee,
  Layers,
  Terminal,
  Package,
  Box,
} from "lucide-react";

const technologies = [
  { name: "React", icon: Code, color: "#61DAFB", category: "Frontend" },
  { name: "Node.js", icon: Server, color: "#339933", category: "Backend" },
  { name: "Vite", icon: Zap, color: "#646CFF", category: "Frontend" },
  { name: "Java", icon: Coffee, color: "#ED8B00", category: "Backend" },
  { name: "Spring Boot", icon: Server, color: "#6DB33F", category: "Backend" },
  { name: "Maven", icon: Box, color: "#C71A36", category: "Backend" },
  { name: "MySQL", icon: Database, color: "#4479A1", category: "Database" },
  { name: "Git", icon: Code, color: "#F05032", category: "Tools" },
  { name: "HTML", icon: Globe, color: "#E34F26", category: "Frontend" },
  { name: "CSS", icon: Globe, color: "#1572B6", category: "Frontend" },
  {
    name: "Tailwind CSS",
    icon: Layers,
    color: "#06B6D4",
    category: "Frontend",
  },
  {
    name: "JavaScript",
    icon: Terminal,
    color: "#F7DF1E",
    category: "Frontend",
  },
];

const TechnologiesSection = () => {
  const categories = ["Frontend", "Backend", "Database", "Tools"];

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 backdrop-blur-sm mb-6">
            <Package className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              Tech Stack
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-4 gradient-text">
            Technologies
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Tools and technologies I use to create innovative solutions
          </p>
        </motion.div>

        {/* Technologies Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.05,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{
                scale: 1.1,
                y: -5,
                transition: { duration: 0.2 },
              }}
              className="group relative"
            >
              <div className="glass-effect rounded-2xl p-6 text-center border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 cursor-pointer h-full flex flex-col items-center justify-center">
                {/* Glow effect on hover */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
                  style={{ backgroundColor: tech.color + "20" }}
                />

                <div className="relative z-10">
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                    className="mb-4"
                  >
                    <tech.icon
                      className="w-10 h-10 md:w-12 md:h-12 mx-auto transition-all duration-300 group-hover:scale-110"
                      style={{ color: tech.color }}
                    />
                  </motion.div>

                  <h3 className="font-semibold text-sm md:text-base text-foreground group-hover:text-primary transition-colors">
                    {tech.name}
                  </h3>

                  {/* Category badge */}
                  <span className="inline-block mt-2 px-2 py-1 rounded-full text-xs text-muted-foreground bg-secondary/50">
                    {tech.category}
                  </span>
                </div>

                {/* Shine effect */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Category legend */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-12 flex flex-wrap justify-center gap-4"
        >
          {categories.map((category) => (
            <div
              key={category}
              className="px-4 py-2 rounded-full bg-secondary/50 backdrop-blur-sm border border-border/50 text-sm text-muted-foreground"
            >
              {category}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TechnologiesSection;
