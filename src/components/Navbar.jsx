import React from 'react';
import { ThemeToggle } from '@/components/ThemeToggle';

const Navbar = ({ scrollToSection }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-sm py-4 px-8 flex justify-center items-center">
      <ul className="flex space-x-6 text-muted-foreground text-sm font-medium items-center">
        <li>
          <button onClick={() => scrollToSection('experiencia-formacion')} className="hover:text-foreground transition-colors duration-200">Experiencia</button>
        </li>
        <li>
          <button onClick={() => scrollToSection('proyectos')} className="hover:text-foreground transition-colors duration-200">Proyectos</button>
        </li>
        <li>
          <button onClick={() => scrollToSection('sobre-mi')} className="hover:text-foreground transition-colors duration-200">Sobre mí</button>
        </li>
        <li>
          <button onClick={() => scrollToSection('contacto')} className="hover:text-foreground transition-colors duration-200">Contacto</button>
        </li>
        <li>
          <ThemeToggle />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;