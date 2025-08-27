import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';

const ContactSection = () => {
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // IMPORTANT: Replace with your EmailJS credentials
    const serviceID = 'YOUR_SERVICE_ID';
    const templateID = 'YOUR_TEMPLATE_ID';
    const publicKey = 'YOUR_PUBLIC_KEY';

    if (serviceID === 'YOUR_SERVICE_ID' || templateID === 'YOUR_TEMPLATE_ID' || publicKey === 'YOUR_PUBLIC_KEY') {
      toast({
        variant: "destructive",
        title: "🚧 Configuración de EmailJS incompleta",
        description: "Por favor, proporciona tus credenciales de EmailJS para activar el formulario.",
      });
      setIsSubmitting(false);
      return;
    }

    emailjs.sendForm(serviceID, templateID, form.current, publicKey)
      .then((result) => {
        toast({
          title: "✅ ¡Mensaje enviado!",
          description: "Gracias por contactarme. Te responderé lo antes posible.",
        });
        form.current.reset();
      }, (error) => {
        toast({
          variant: "destructive",
          title: "❌ ¡Error al enviar!",
          description: "Hubo un problema al enviar tu mensaje. Por favor, inténtalo de nuevo.",
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <section id="contacto" className="py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Contacto</h2>
          <p className="text-muted-foreground text-lg">¿Tienes una pregunta o quieres trabajar juntos?</p>
        </div>

        <div className="glass-effect rounded-2xl p-8 md:p-12">
          <form ref={form} onSubmit={handleFormSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre</Label>
                <Input id="name" name="name" placeholder="Tu nombre" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="Tu email" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Mensaje</Label>
              <Textarea id="message" name="message" placeholder="Escribe tu mensaje aquí..." required rows={6} />
            </div>
            <div className="text-center">
              <Button type="submit" disabled={isSubmitting} className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;