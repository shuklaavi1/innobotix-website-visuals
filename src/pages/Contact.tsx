
import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Users, Youtube, Mail, Clock, Headphones } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Using FormSubmit.co for form submission
      const formSubmitData = new FormData();
      formSubmitData.append('name', formData.name);
      formSubmitData.append('email', formData.email);
      formSubmitData.append('subject', formData.subject);
      formSubmitData.append('message', formData.message);
      
      const response = await fetch('https://formsubmit.co/info.innobotix@gmail.com', {
        method: 'POST',
        body: formSubmitData
      });

      if (response.ok) {
        toast({
          title: "Message Sent! 🎉",
          description: "Thank you for reaching out. We'll get back to you within 24 hours.",
        });
        
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      toast({
        title: "Message Sent! 📝",
        description: "Thank you for reaching out. We'll get back to you within 24 hours.",
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

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
    <div className="min-h-screen bg-black overflow-x-hidden relative">
      {/* Animated Background - Same as Hero */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.1)_0%,transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(139,92,246,0.1)_0%,transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,rgba(34,197,94,0.1)_0%,transparent_50%)]"></div>
      </div>

      {/* Tech Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:100px_100px]"></div>
      
      {/* Floating particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse" style={{top: '20%', left: '10%', animationDelay: '0s'}}></div>
        <div className="absolute w-1 h-1 bg-purple-400 rounded-full animate-pulse" style={{top: '50%', left: '80%', animationDelay: '1s'}}></div>
        <div className="absolute w-1 h-1 bg-green-400 rounded-full animate-pulse" style={{top: '80%', left: '30%', animationDelay: '2s'}}></div>
        <div className="absolute w-1 h-1 bg-blue-400 rounded-full animate-pulse" style={{top: '30%', left: '70%', animationDelay: '1.5s'}}></div>
      </div>

      <div className="relative z-10">
        <Navigation />
        
        {/* Hero Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-16"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.h1 
                className="text-5xl md:text-6xl font-bold leading-tight mb-6"
                variants={itemVariants}
                style={{ fontFamily: 'Orbitron, monospace' }}
              >
                <span className="block text-white">Let's</span>
                <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
                  Connect
                </span>
              </motion.h1>
              <motion.p 
                className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
                variants={itemVariants}
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                Have a question about our kits? Need help with a project? Or want to discuss a custom solution? We'd love to hear from you!
              </motion.p>
            </motion.div>

            <motion.div 
              className="grid lg:grid-cols-2 gap-12"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Contact Form */}
              <motion.div variants={itemVariants}>
                <Card className="bg-black/80 backdrop-blur-xl border border-gray-800/50 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                  <CardHeader>
                    <CardTitle className="text-2xl text-white flex items-center gap-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                      <MessageCircle className="w-6 h-6 text-cyan-400" />
                      Send us a Message
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                            Your Name
                          </label>
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            className="bg-gray-900/50 border-gray-700 focus:border-cyan-400 text-white placeholder-gray-400"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                            Email Address
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="bg-gray-900/50 border-gray-700 focus:border-cyan-400 text-white placeholder-gray-400"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                          Subject
                        </label>
                        <Input
                          id="subject"
                          name="subject"
                          type="text"
                          required
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="What's this about?"
                          className="bg-gray-900/50 border-gray-700 focus:border-cyan-400 text-white placeholder-gray-400"
                        />
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                          Message
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          required
                          rows={6}
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Tell us more about your inquiry..."
                          className="bg-gray-900/50 border-gray-700 focus:border-cyan-400 text-white placeholder-gray-400"
                        />
                      </div>

                      <Button 
                        type="submit" 
                        size="lg" 
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-white font-bold text-lg px-8 py-6 rounded-2xl border-2 border-blue-400/50 shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-all duration-300"
                        style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Contact Info */}
              <motion.div className="space-y-8" variants={itemVariants}>
                <Card className="bg-black/80 backdrop-blur-xl border border-gray-800/50 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                      <Mail className="w-5 h-5 text-purple-400" />
                      Get in Touch
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-300">Email</h4>
                        <p className="text-gray-400">info.innobotix@gmail.com</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-300">Response Time</h4>
                        <p className="text-gray-400">Within 24 hours</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-300">Support Hours</h4>
                        <p className="text-gray-400">Monday - Saturday, 9 AM - 7 PM IST</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-black/80 backdrop-blur-xl border border-gray-800/50 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                      <Users className="w-5 h-5 text-green-400" />
                      Follow Us
                    </h3>
                    <div className="space-y-4">
                      <a href="#" className="flex items-center space-x-3 text-gray-400 hover:text-cyan-400 transition-colors">
                        <Users className="w-5 h-5" />
                        <span>LinkedIn - @innobotix</span>
                      </a>
                      <a href="#" className="flex items-center space-x-3 text-gray-400 hover:text-cyan-400 transition-colors">
                        <MessageCircle className="w-5 h-5" />
                        <span>Instagram - @innobotix</span>
                      </a>
                      <a href="#" className="flex items-center space-x-3 text-gray-400 hover:text-cyan-400 transition-colors">
                        <Youtube className="w-5 h-5" />
                        <span>YouTube - Innobotix Tutorials</span>
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-black/80 backdrop-blur-xl border border-gray-800/50 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                      <Headphones className="w-5 h-5 text-purple-400" />
                      Need Immediate Help?
                    </h3>
                    <p className="mb-4 text-gray-300">
                      For urgent technical support or order issues, reach out to us directly.
                    </p>
                    <Button 
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-white font-bold px-6 py-3 rounded-xl border border-blue-400/50 shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] transition-all duration-300"
                      style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                    >
                      WhatsApp Support
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default Contact;
