import React from 'react';
import { motion } from 'framer-motion';
const AboutSection = () => {
  return <section id="sobre-mi" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Sobre mí</h2>
        </div>

        <div className="glass-effect rounded-2xl p-8 md:p-12">
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">Desarrollador FullStack autodidacta con sólida base en Java, Spring Boot, React y MySQL.

He llevado proyectos reales desde la idea hasta la producción, como Aires del Lago (React + Vite), y actualmente desarrollo Farmaser, un sistema de gestión de farmacias diseñado con arquitectura escalable y buenas prácticas.</p>
          <br />
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">Apasionado por crear productos funcionales y bien diseñados, busco integrarme a un equipo donde pueda aportar valor inmediato, seguir creciendo y enfrentar nuevos desafíos técnicos.</p>
        </div>
      </div>
    </section>;
};
export default AboutSection;