import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
const projects = [{
  title: "Aires del Lago",
  subtitle: "Página web promocional de cabañas",
  description: "Desarrollo completo de sitio web promocional con diseño responsivo y optimización de rendimiento.",
  tags: ["React", "Vite"],
  imageText: "Aires del Lago"
}, {
  title: "Análisis Inmobiliario",
  subtitle: "Plataforma de análisis inmobiliario",
  description: "Sistema de análisis inmobiliario con arquitectura robusta y base de datos optimizada.",
  tags: ["Java", "Spring Boot", "MySQL"],
  imageText: "Proyecto en desarrollo"
}, {
  title: "Gestión de Farmacias",
  subtitle: "Sistema de gestión farmacéutica",
  description: "Sistema integral de gestión para farmacias con control de inventario y ventas.",
  tags: ["React", "Node.js"],
  imageText: "Sistema en desarrollo"
}];
const ExperienceSection = () => {
  return <section id="proyectos" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Proyectos</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative glass-effect rounded-2xl p-6 shimmer hover:scale-105 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-6 overflow-hidden rounded-lg bg-card flex items-center justify-center h-40">
                  <div className="text-center">
                    <ExternalLink className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-muted-foreground">{project.imageText}</p>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mb-1 text-foreground">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{project.subtitle}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map(tag => <span key={tag} className="px-3 py-1 bg-secondary text-foreground border border-border rounded-full text-sm gradient-text">{tag}</span>)}
                </div>
                
                <p className="text-muted-foreground text-sm mt-auto">{project.description}</p>
              </div>
            </motion.div>)}
        </div>
      </div>
    </section>;
};
export default ExperienceSection;