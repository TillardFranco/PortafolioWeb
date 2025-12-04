import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail, Linkedin, Github, Copy, Check } from "lucide-react";

const ContactSection = () => {
  const email = "tillardtomasfranco@gmail.com";
  const [copied, setCopied] = React.useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const contactLinks = [
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://www.linkedin.com/in/tillardfrancotomas/",
      color: "hover:text-[#0077B5]",
      bgColor: "hover:bg-[#0077B5]/10",
    },
    {
      name: "GitHub",
      icon: Github,
      href: "https://github.com/tillardfranco",
      color: "hover:text-foreground",
      bgColor: "hover:bg-foreground/10",
    },
  ];

  return (
    <section id="contacto" className="py-24 px-4 relative">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 backdrop-blur-sm mb-6">
            <Mail className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              Let's Talk
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-4 gradient-text">
            Get In Touch
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Have a question or want to work together? I'm always open to new
            opportunities and interesting projects.
          </p>
        </motion.div>

        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-effect rounded-2xl p-8 md:p-12 border border-border/50 hover:border-primary/50 transition-all duration-300 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
            className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-600/20 to-blue-600/20 flex items-center justify-center"
          >
            <Mail className="w-10 h-10 text-primary" />
          </motion.div>

          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Say Hello!
          </h3>

          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Whether you have a project in mind, a job opportunity, or just want
            to say hi, feel free to reach out.
          </p>

          {/* Email Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <a href={`mailto:${email}`}>
              <Button
                size="lg"
                className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Send me an Email
                </span>
                <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </Button>
            </a>

            <Button
              onClick={handleCopyEmail}
              size="lg"
              variant="outline"
              className="border-2 border-border hover:border-primary text-foreground px-6 py-6 rounded-xl font-medium transition-all duration-300 hover:scale-105"
            >
              {copied ? (
                <span className="flex items-center gap-2 text-green-500">
                  <Check className="w-5 h-5" />
                  Copied!
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Copy className="w-5 h-5" />
                  Copy Email
                </span>
              )}
            </Button>
          </div>

          {/* Email display */}
          <p className="text-muted-foreground text-sm mb-8">
            <span className="font-mono bg-secondary/50 px-3 py-1.5 rounded-lg">
              {email}
            </span>
          </p>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-border" />
            <span className="text-muted-foreground text-sm">or find me on</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-4">
            {contactLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-muted-foreground transition-all duration-300 ${link.color} ${link.bgColor}`}
              >
                <link.icon className="w-5 h-5" />
                <span className="font-medium">{link.name}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Footer message */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center text-muted-foreground text-sm mt-12"
        >
          I typically respond within 24-48 hours ⚡
        </motion.p>
      </div>
    </section>
  );
};

export default ContactSection;
