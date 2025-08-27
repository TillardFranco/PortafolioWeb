import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap } from 'lucide-react';

const EducationExperienceSection = () => {
  return (
    <section id="experiencia-formacion" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Experiencia y Formación</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {/* Columna de Experiencia */}
          <div className="glass-effect rounded-2xl p-8 flex flex-col">
            <div className="flex items-center mb-6">
              <Briefcase className="w-8 h-8 mr-4 text-primary" />
              <h3 className="text-2xl font-bold text-foreground">Experiencia</h3>
            </div>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-lg text-foreground">Cofundador – Dev.Bit</h4>
                <p className="text-sm text-muted-foreground">2024 – Presente</p>
                <p className="mt-2 text-muted-foreground">
                  Desarrollo de páginas web personalizadas para emprendedores y pequeñas empresas usando React + Vite y hosting administrado.
                </p>
              </div>
              <div>
                <h5 className="font-semibold text-md text-foreground">Proyectos destacados:</h5>
                <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
                  <li><span className="font-semibold">Aires del Lago:</span> Programador frontend, creación de landing page moderna y responsive.</li>
                  <li><span className="font-semibold">Farmaser (en desarrollo):</span> Backend con Spring Boot, JWT, Hibernate y MySQL.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Columna de Formación */}
          <div className="glass-effect rounded-2xl p-8 flex flex-col">
            <div className="flex items-center mb-6">
              <GraduationCap className="w-8 h-8 mr-4 text-primary" />
              <h3 className="text-2xl font-bold text-foreground">Formación</h3>
            </div>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-lg text-foreground">Ingeniería en Software</h4>
                <p className="text-sm text-muted-foreground">Universidad Siglo 21 (Estudiante avanzado, 3er año)</p>
                <p className="mt-2 text-muted-foreground">
                  Próximo a graduarme, con una sólida base en principios de ingeniería y desarrollo de software.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-lg text-foreground">Capacitación continua autodidacta</h4>
                <p className="mt-2 text-muted-foreground">
                  Enfocado en desarrollo backend, APIs REST, inteligencia artificial y tecnologías modernas de frontend para mantenerme a la vanguardia de la industria.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationExperienceSection;