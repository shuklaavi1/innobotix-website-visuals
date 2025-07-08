
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, Bot, Zap, Cpu, CircuitBoard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export const Hero = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8
      }
    }
  };

  return (
    <section className="relative overflow-hidden min-h-screen flex items-center justify-center">
      {/* Futuristic Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:100px_100px]"></div>
      
      {/* Floating Tech Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full"
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 1, 0.3]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-3/4 right-1/4 w-3 h-3 bg-purple-400 rounded-full"
          animate={{
            y: [0, 20, 0],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div 
          className="absolute top-1/2 right-1/3 w-1 h-1 bg-green-400 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.4, 1, 0.4]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div 
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main Headline */}
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-8"
            variants={itemVariants}
            style={{ fontFamily: 'Orbitron, monospace' }}
          >
            <span className="block text-white">Engineering</span>
            <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
              Tomorrow's
            </span>
            <span className="block text-white">Intelligence</span>
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
            variants={itemVariants}
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Build, Customize, and Interact with Real Robots + AI. 
            <br className="hidden md:block" />
            Professional-grade kits and custom solutions for the next generation.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
            variants={itemVariants}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg"
                onClick={() => navigate("/starter-kits")}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-white font-bold text-lg px-8 py-6 rounded-2xl border-2 border-blue-400/50 shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-all duration-300"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                <Zap className="w-5 h-5 mr-2" />
                Shop Kits
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg"
                onClick={() => navigate("/innobot")}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-lg px-8 py-6 rounded-2xl border-2 border-purple-400/50 shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_30px_rgba(147,51,234,0.5)] transition-all duration-300"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                <Bot className="w-5 h-5 mr-2" />
                Talk to Innobot AI
              </Button>
            </motion.div>
          </motion.div>

          {/* Floating Robot Logo */}
          <motion.div 
            className="relative mx-auto w-64 h-64 md:w-80 md:h-80"
            variants={itemVariants}
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-cyan-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
            <div className="relative w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl border border-gray-700 flex items-center justify-center shadow-2xl">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="w-40 h-40 md:w-48 md:h-48 rounded-3xl overflow-hidden bg-white/10 backdrop-blur-sm flex items-center justify-center"
              >
                <img 
                  src="https://i.postimg.cc/CMNN97jZ/INNO-LOGO-FINAL.png"
                  alt="Innobotix Logo"
                  className="w-32 h-32 md:w-40 md:h-40 object-contain"
                />
              </motion.div>
              
              {/* Floating tech icons */}
              <motion.div 
                className="absolute -top-4 -right-4 bg-purple-600 p-3 rounded-lg shadow-lg"
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Cpu className="w-6 h-6 text-white" />
              </motion.div>
              
              <motion.div 
                className="absolute -bottom-4 -left-4 bg-green-600 p-3 rounded-lg shadow-lg"
                animate={{
                  y: [0, 5, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Bot className="w-6 h-6 text-white" />
              </motion.div>
            </div>
          </motion.div>

          {/* Stats Row */}
          <motion.div 
            className="grid grid-cols-3 gap-8 mt-16 max-w-3xl mx-auto"
            variants={containerVariants}
          >
            {[
              { number: "5+", label: "AI-Integrated Kits", icon: <Cpu className="w-6 h-6" /> },
              { number: "100+", label: "Students Empowered", icon: <Zap className="w-6 h-6" /> },
              { number: "24/7", label: "AI Assistant", icon: <Bot className="w-6 h-6" /> }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center group"
                variants={itemVariants}
                whileHover={{ scale: 1.1 }}
              >
                <div className="flex justify-center mb-2 text-cyan-400 group-hover:text-purple-400 transition-colors duration-300">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2" style={{ fontFamily: 'Orbitron, monospace' }}>
                  {stat.number}
                </div>
                <div className="text-sm text-gray-400" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <ArrowDown className="w-6 h-6 text-cyan-400" />
        </motion.div>
      </div>
    </section>
  );
};
