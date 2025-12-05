import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, ArrowUpRight, Code2, Github } from "lucide-react";

const projects = [
  {
    title: "Aires del Lago",
    subtitle: "Cabin rental promotional website",
    description:
      "Complete development of a promotional website with responsive design and performance optimization. Implementation of SEO and UX best practices.",
    tags: ["React", "Vite", "Tailwind CSS"],
    imageText: "Aires del Lago",
    image: "/AiresDelLago.png",
    status: "Completed",
    gradient: "from-emerald-500/20 to-teal-500/20",
    link: "https://airesdellagolosmolinos.com.ar/home",
    github: "https://github.com/TillardFranco/aires-del-lago",
  },
  {
    title: "Farmaser",
    subtitle: "Pharmacy management system",
    description:
      "Comprehensive pharmacy management system with inventory control, sales, and reports. Scalable architecture with Spring Boot and JWT.",
    tags: ["Java", "Spring Boot", "MySQL", "React", "JWT", "Spring Security"],
    imageText: "In development",
    image: "/farmaser.jpg",
    status: "Completed",
    gradient: "from-purple-500/20 to-pink-500/20",
    link: null,
    github: null,
  },
  {
    title: "Internal management system",
    subtitle: "Enterprise Resource Planning (ERP) System",
    description:
      "A generic and modular Backend ERP system built with Spring Boot 3.4.4 and Java 17. Designed to be easily adaptable to various types of businesses (pharmacies, retail stores, supermarkets, etc.). It streamlines core business processes by integrating inventory, sales, and management into a unified platform.",
    tags: [
      "Java",
      "Spring Boot",
      "MySQL",
      "JWT",
      "MapStruct (Mappers)",
      "Spring Data JPA",
      "Spring Security",
    ],
    imageText: "Internal management system",
    image: "/Sistema-Gestion-Backend.png",
    status: "Completed",
    gradient: "from-blue-500/20 to-cyan-500/20",
    link: "https://github.com/TillardFranco/Sistema-Gestion-Backend-ERP",
    github: "https://github.com/TillardFranco/Sistema-Gestion-Backend-ERP",
  },
];

const ExperienceSection = () => {
  return (
    <section id="proyectos" className="py-24 px-4 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 backdrop-blur-sm mb-6">
            <Code2 className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              Portfolio
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-4 gradient-text">
            Featured Projects
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A selection of projects that showcase my skills and experience
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative"
            >
              <div className="relative h-full glass-effect rounded-2xl p-6 overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10">
                {/* Gradient overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />

                {/* Status badge */}
                <div className="absolute top-4 right-4 z-10">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${
                      project.status === "Completed"
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>

                <div className="relative z-10 flex flex-col h-full">
                  {/* Project image */}
                  <div className="mb-6 overflow-hidden rounded-xl bg-gradient-to-br from-card to-card/50 h-48 border border-border/50 group-hover:border-primary/50 transition-colors">
                    {project.image ? (
                      <motion.img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center p-6">
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <ExternalLink className="w-16 h-16 mx-auto mb-3 text-muted-foreground group-hover:text-primary transition-colors" />
                          </motion.div>
                          <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                            {project.imageText}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Project info */}
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 font-medium">
                      {project.subtitle}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, tagIndex) => (
                        <motion.span
                          key={tag}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.15 + tagIndex * 0.05 }}
                          className="px-3 py-1 bg-secondary/80 text-foreground border border-border rounded-lg text-xs font-medium hover:border-primary/50 transition-colors"
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                      {project.description}
                    </p>

                    {/* Action buttons */}
                    <div className="mt-6 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {project.link ? (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                        >
                          View more
                          <ArrowUpRight className="w-4 h-4" />
                        </a>
                      ) : (
                        <span className="flex items-center gap-2 text-sm font-medium text-muted-foreground cursor-not-allowed">
                          Coming soon
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* GitHub button - bottom right corner */}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-4 right-4 z-20 p-3 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 hover:scale-110 shadow-lg"
                  >
                    <Github className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
                  </a>
                )}

                {/* Shine effect */}
                <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
