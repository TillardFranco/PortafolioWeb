import React from 'react';
import { motion } from 'framer-motion';
import { Github, Code, Database, Server, Globe, Zap, Coffee } from 'lucide-react';

const technologies = [
  { name: 'React', icon: Code, color: '#61DAFB' },
  { name: 'Node.js', icon: Server, color: '#339933' },
  { name: 'Vite', icon: Zap, color: '#646CFF' },
  { name: 'Java', icon: Coffee, color: '#ED8B00' },
  { name: 'Spring Boot', icon: Server, color: '#6DB33F' },
  { name: 'MySQL', icon: Database, color: '#4479A1' },
  { name: 'Git', icon: Code, color: '#F05032' },
  { name: 'GitHub', icon: Github, color: '#181717' },
  { name: 'HTML', icon: Globe, color: '#E34F26' },
  { name: 'CSS', icon: Globe, color: '#1572B6' }
];

const TechnologiesSection = () => {
  return (
    <section className="py-20 px-4 section-gradient">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Tecnologías</h2>
          <p className="text-gray-400 text-lg">Herramientas que domino</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-effect rounded-xl p-6 text-center tech-icon group hover:bg-white/10"
            >
              <tech.icon className="w-12 h-12 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" style={{ color: tech.color }} />
              <h3 className="font-medium text-foreground">{tech.name}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnologiesSection;