import React from "react";
import { Bot, Youtube, Users, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export const Footer = () => {
  const navigate = useNavigate();

  const quickLinks = [
    { name: "Starter Kits", href: "/starter-kits" },
    { name: "Custom Builds", href: "/custom-builds" },
    { name: "About Us", href: "/about" },
    { name: "Innobot AI", href: "/innobot" }
  ];

  const socialLinks = [
    { icon: <Users className="w-5 h-5" />, href: "#", label: "LinkedIn" },
    { icon: <MessageCircle className="w-5 h-5" />, href: "#", label: "Instagram" },
    { icon: <Youtube className="w-5 h-5" />, href: "#", label: "YouTube" }
  ];

  return (
    <footer className="relative bg-black border-t border-gray-800">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <motion.div 
            className="md:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="flex items-center space-x-3 mb-6 cursor-pointer group"
              onClick={() => navigate("/")}
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center group-hover:shadow-lg group-hover:shadow-cyan-500/30 transition-all duration-300">
                <Bot className="w-7 h-7 text-white" />
              </div>
              <span 
                className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
                style={{ fontFamily: 'Orbitron, monospace' }}
              >
                Innobotix
              </span>
            </motion.div>
            <p 
              className="text-gray-400 max-w-md leading-relaxed text-lg"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              <span className="text-cyan-400 font-semibold">Engineering Tomorrow's Intelligence.</span>
              <br />
              Democratizing robotics education through innovative DIY kits, 
              custom solutions, and AI-powered learning.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 
              className="text-xl font-bold mb-6 text-white"
              style={{ fontFamily: 'Orbitron, monospace' }}
            >
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li 
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <button
                    onClick={() => navigate(link.href)}
                    className="text-gray-400 hover:text-cyan-400 transition-all duration-300 relative group"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 transition-all duration-300 group-hover:w-full"></span>
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact & Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 
              className="text-xl font-bold mb-6 text-white"
              style={{ fontFamily: 'Orbitron, monospace' }}
            >
              Connect
            </h3>
            <div className="space-y-4">
              <button
                onClick={() => navigate("/contact")}
                className="block text-gray-400 hover:text-cyan-400 transition-all duration-300 text-lg"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                Contact Us
              </button>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    className="p-3 bg-gray-800/50 rounded-lg text-gray-400 hover:text-cyan-400 hover:bg-gray-700/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20"
                    aria-label={social.label}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          className="border-t border-gray-800/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <p 
            className="text-gray-400 text-sm"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            © 2024 Innobotix. All rights reserved. Built with ❤️ for robotics enthusiasts.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <button 
              className="text-gray-400 hover:text-cyan-400 text-sm transition-all duration-300"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Privacy Policy
            </button>
            <button 
              className="text-gray-400 hover:text-cyan-400 text-sm transition-all duration-300"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Terms of Service
            </button>
          </div>
        </motion.div>

        {/* Tech Tagline */}
        <motion.div 
          className="text-center mt-8 pt-8 border-t border-gray-800/30"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <p 
            className="text-sm bg-gradient-to-r from-cyan-400 via-purple-400 to-green-400 bg-clip-text text-transparent font-medium"
            style={{ fontFamily: 'Orbitron, monospace' }}
          >
            "Where Innovation Meets Intelligence"
          </p>
        </motion.div>
      </div>
    </footer>
  );
};
