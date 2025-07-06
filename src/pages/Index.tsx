
import React from "react";
import { Hero } from "@/components/Hero";
import { StarterKits } from "@/components/StarterKits";
import { Services } from "@/components/Services";
import { Testimonials } from "@/components/Testimonials";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Innobotix - Engineering Tomorrow's Intelligence | Robotic Kits & AI</title>
        <meta name="description" content="Build, customize, and interact with real robots and AI. Professional robotic kits, custom robots, and AI tools for the next generation of innovators." />
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Helmet>
      
      <div className="min-h-screen bg-black overflow-x-hidden relative">
        {/* Animated Background */}
        <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.1)_0%,transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(139,92,246,0.1)_0%,transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,rgba(34,197,94,0.1)_0%,transparent_50%)]"></div>
        </div>
        
        {/* Floating particles */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse" style={{top: '20%', left: '10%', animationDelay: '0s'}}></div>
          <div className="absolute w-1 h-1 bg-purple-400 rounded-full animate-pulse" style={{top: '50%', left: '80%', animationDelay: '1s'}}></div>
          <div className="absolute w-1 h-1 bg-green-400 rounded-full animate-pulse" style={{top: '80%', left: '30%', animationDelay: '2s'}}></div>
          <div className="absolute w-1 h-1 bg-pink-400 rounded-full animate-pulse" style={{top: '30%', left: '70%', animationDelay: '1.5s'}}></div>
        </div>
        
        <div className="relative z-10">
          <Navigation />
          <Hero />
          <StarterKits />
          <Services />
          <Testimonials />
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Index;
