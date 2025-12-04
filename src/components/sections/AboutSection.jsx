import React from "react";
import { motion } from "framer-motion";
import { User, Target, Heart, Rocket } from "lucide-react";

const AboutSection = () => {
  const highlights = [
    {
      icon: Rocket,
      title: "Production Projects",
      description: "Experience taking projects from idea to production",
    },
    {
      icon: Target,
      title: "Scalable Architecture",
      description: "System design with best practices and robust architecture",
    },
    {
      icon: Heart,
      title: "Passion for Code",
      description:
        "Committed to creating functional and well-designed products",
    },
  ];

  return (
    <section id="sobre-mi" className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 backdrop-blur-sm mb-6">
            <User className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              Get to know me
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-4 gradient-text">
            About Me
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A glimpse into my passion for development and technology
          </p>
        </motion.div>

        {/* Main content card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-effect rounded-2xl p-8 md:p-12 border border-border/50 hover:border-primary/50 transition-all duration-300 mb-12"
        >
          <div className="space-y-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
            <p>
              <span className="font-semibold text-foreground">
                Self-taught FullStack developer
              </span>{" "}
              with a solid foundation in Java, Spring Boot, React, and MySQL.
            </p>
            <p>
              I have taken real projects from idea to production, such as{" "}
              <span className="font-semibold text-foreground">
                Aires del Lago
              </span>{" "}
              (React + Vite), and I am currently developing{" "}
              <span className="font-semibold text-foreground">Farmaser</span>, a
              pharmacy e-commerce designed with scalable architecture and best
              practices.
            </p>
            <p>
              Passionate about creating functional and well-designed products,
              I'm looking to join a team where I can add immediate value,
              continue growing, and face new technical challenges.
            </p>
          </div>
        </motion.div>

        {/* Highlights grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {highlights.map((highlight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass-effect rounded-xl p-6 border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg group"
            >
              <div className="flex flex-col items-center text-center">
                <div className="p-4 rounded-xl bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                  <highlight.icon className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                </div>
                <h3 className="font-bold text-lg text-foreground mb-2">
                  {highlight.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {highlight.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
