import React from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  Calendar,
  MapPin,
  Award,
  BookOpen,
} from "lucide-react";

const EducationExperienceSection = () => {
  const experienceItems = [
    {
      title: "Co-founder",
      company: "Dev.Bit",
      period: "2024 – Present",
      description:
        "Development of custom websites for entrepreneurs and small businesses using React + Vite and managed hosting.",
      projects: [
        {
          name: "Aires del Lago",
          role: "Frontend Developer",
          description: "Creation of modern and responsive landing page",
        },
        {
          name: "Farmaser",
          role: "Backend & Frontend Developer",
          description:
            "Backend with Spring Boot, JWT, Hibernate and MySQL & Frontend with React, Tailwind CSS and Vite",
          status: "In Development",
        },
      ],
    },
  ];

  const educationItems = [
    {
      degree: "Software Engineering",
      institution: "Universidad Siglo 21",
      status: "Advanced Student (3rd year)",
      description:
        "Close to graduation, with a solid foundation in engineering principles and software development.",
      icon: GraduationCap,
    },
    {
      degree: "Continuous Self-Learning",
      institution: "Self-taught",
      status: "Ongoing",
      description:
        "Focused on backend development, REST APIs, artificial intelligence, and modern frontend technologies to stay at the forefront of the industry.",
      icon: BookOpen,
    },
  ];

  return (
    <section id="experiencia-formacion" className="py-24 px-4 relative">
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
            <Award className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              Career Path
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-4 gradient-text">
            Experience & Education
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            My professional and academic journey
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Columna de Experiencia */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="glass-effect rounded-2xl p-8 md:p-10 border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl h-full">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-xl bg-primary/10">
                  <Briefcase className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                  Experience
                </h3>
              </div>

              <div className="space-y-8">
                {experienceItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className="relative pl-6 border-l-2 border-primary/20"
                  >
                    {/* Timeline dot */}
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary border-2 border-background" />

                    <div className="space-y-3">
                      <div>
                        <h4 className="font-bold text-lg md:text-xl text-foreground">
                          {item.title}
                        </h4>
                        <div className="flex items-center gap-2 text-primary font-semibold mb-2">
                          <span>{item.company}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                          <Calendar className="w-4 h-4" />
                          <span>{item.period}</span>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      {item.projects && (
                        <div className="mt-4 space-y-3">
                          <h5 className="font-semibold text-foreground flex items-center gap-2">
                            <Award className="w-4 h-4 text-primary" />
                            Highlighted Projects:
                          </h5>
                          <ul className="space-y-3">
                            {item.projects.map((project, pIndex) => (
                              <li
                                key={pIndex}
                                className="pl-4 border-l-2 border-secondary"
                              >
                                <span className="font-semibold text-foreground">
                                  {project.name}
                                </span>
                                {project.status && (
                                  <span className="ml-2 px-2 py-0.5 rounded-full text-xs bg-amber-500/20 text-amber-400 border border-amber-500/30">
                                    {project.status}
                                  </span>
                                )}
                                <p className="text-sm text-muted-foreground mt-1">
                                  <span className="font-medium">
                                    {project.role}:
                                  </span>{" "}
                                  {project.description}
                                </p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Columna de Formación */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="glass-effect rounded-2xl p-8 md:p-10 border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl h-full">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-xl bg-primary/10">
                  <GraduationCap className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                  Education
                </h3>
              </div>

              <div className="space-y-8">
                {educationItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className="relative pl-6 border-l-2 border-primary/20"
                  >
                    {/* Timeline dot */}
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary border-2 border-background" />

                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-secondary/50 mt-1">
                          <item.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-lg md:text-xl text-foreground mb-1">
                            {item.degree}
                          </h4>
                          <div className="flex items-center gap-2 text-sm text-primary font-semibold mb-2">
                            <MapPin className="w-4 h-4" />
                            <span>{item.institution}</span>
                          </div>
                          <div className="mb-3">
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                              {item.status}
                            </span>
                          </div>
                          <p className="text-muted-foreground leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EducationExperienceSection;
