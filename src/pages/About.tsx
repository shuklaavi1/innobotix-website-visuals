
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Award, Users, Lightbulb, Target } from "lucide-react";
import { Helmet } from "react-helmet-async";

const About = () => {
  const values = [
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Innovation First",
      description: "We believe in pushing the boundaries of what's possible with robotics technology"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community Driven",
      description: "Building a supportive community of makers, learners, and innovators"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Quality Education",
      description: "Providing hands-on learning experiences that inspire and educate"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Accessible Learning",
      description: "Making robotics education affordable and accessible to everyone"
    }
  ];

  return (
    <>
      <Helmet>
        <title>About Innobotix - Robotics Education & Innovation | Avi Mohan Shuklaa</title>
        <meta name="description" content="Learn about Innobotix, founded by Avi Mohan Shuklaa. We democratize robotics education through hands-on learning experiences, starter kits, and cutting-edge technology solutions." />
        <meta name="keywords" content="robotics education, Innobotix, Avi Mohan Shuklaa, robotics kits, AI education, STEM learning, innovation, technology education" />
        <meta name="author" content="Avi Mohan Shuklaa" />
        
        {/* Open Graph meta tags */}
        <meta property="og:title" content="About Innobotix - Robotics Education & Innovation" />
        <meta property="og:description" content="Empowering the next generation through hands-on robotics education and cutting-edge technology solutions." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://innobotix.lovable.app/about" />
        <meta property="og:image" content="https://i.postimg.cc/DzLt4bVm/Screenshot-2025-06-29-101351.png" />
        
        {/* Twitter Card meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Innobotix - Robotics Education & Innovation" />
        <meta name="twitter:description" content="Learn about our mission to democratize robotics education and meet founder Avi Mohan Shuklaa." />
        <meta name="twitter:image" content="https://i.postimg.cc/DzLt4bVm/Screenshot-2025-06-29-101351.png" />
        
        {/* Additional SEO meta tags */}
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://innobotix.lovable.app/about" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden">
        {/* Tech Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-64 h-64 border border-white rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-32 w-32 h-32 border border-white rounded-lg rotate-45 animate-bounce"></div>
          <div className="absolute bottom-32 left-1/3 w-48 h-48 border-2 border-dotted border-white rounded-full animate-spin-slow"></div>
          <div className="absolute bottom-20 right-1/4 w-24 h-24 border border-white rotate-12 animate-pulse"></div>
        </div>

        <Navigation />
        
        {/* Hero Section */}
        <section className="py-20 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-5xl font-bold text-white mb-6">
                About <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Innobotix</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Empowering the next generation of innovators through hands-on robotics education 
                and cutting-edge technology solutions.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision - Reduced spacing */}
        <section className="py-12 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12">
              <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm hover:scale-105 transition-all duration-300">
                <CardContent className="p-8">
                  <h3 className="text-3xl font-bold text-white mb-6">Our Mission</h3>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    To democratize robotics education by providing accessible, high-quality learning 
                    experiences that inspire creativity, foster innovation, and prepare the next 
                    generation for a technology-driven future.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm hover:scale-105 transition-all duration-300">
                <CardContent className="p-8">
                  <h3 className="text-3xl font-bold text-white mb-6">Our Vision</h3>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    To become the leading platform for robotics education globally, creating a 
                    community where learners of all backgrounds can explore, create, and innovate 
                    with confidence in the field of robotics and AI.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-gradient-to-r from-gray-800/30 to-blue-900/20 backdrop-blur-sm relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center text-white mb-16">Our Values</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm hover:scale-105 transition-all duration-300 text-center">
                  <CardContent className="p-6">
                    <div className="text-blue-400 mb-4 flex justify-center">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                    <p className="text-gray-400">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Meet the Founder Section - Moved to bottom */}
        <section className="py-20 bg-gradient-to-r from-gray-800/30 to-blue-900/20 backdrop-blur-sm relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Meet the Founder</h2>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <Card className="bg-gray-800/70 border-gray-600/50 backdrop-blur-md hover:scale-105 transition-all duration-300 overflow-hidden">
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-3 gap-8 items-center">
                    <div className="md:col-span-1 text-center">
                      <div className="relative inline-block mb-4">
                        <div className="w-48 h-48 rounded-full overflow-hidden mx-auto shadow-2xl border-4 border-blue-400/70 bg-gray-900">
                          <img 
                            src="https://i.postimg.cc/bJ03pQ7H/1000108570.jpg"
                            alt="Avi Mohan Shuklaa"
                            className="w-full h-full object-cover brightness-110 contrast-110"
                          />
                        </div>
                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-400/10 to-cyan-300/10"></div>
                      </div>
                      <Badge className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-2">
                        Founder & CEO
                      </Badge>
                    </div>
                    
                    <div className="md:col-span-2">
                      <h3 className="text-3xl font-bold text-white mb-4">
                        Avi Mohan Shuklaa
                      </h3>
                      <p className="text-lg text-gray-200 mb-6 leading-relaxed">
                        High school robotics innovator and visionary founder of Innobotix. 
                        Passionate about making cutting-edge robotics technology accessible 
                        to students and enthusiasts worldwide. With a deep understanding of 
                        both technology and education, Avi is dedicated to bridging the gap 
                        between complex robotics concepts and practical, hands-on learning.
                      </p>
                      
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center text-gray-200">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                          <span>Robotics & AI Enthusiast</span>
                        </div>
                        <div className="flex items-center text-gray-200">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                          <span>Educational Technology Advocate</span>
                        </div>
                        <div className="flex items-center text-gray-200">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                          <span>Innovation & Community Builder</span>
                        </div>
                      </div>
                      
                      <a 
                        href="https://www.avishuklaa.in" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
                      >
                        Visit Portfolio
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default About;
