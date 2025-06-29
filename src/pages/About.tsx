
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Bot, Book, ExternalLink } from "lucide-react";

const About = () => {
  const stats = [
    { number: "100+", label: "Students Trained", icon: <Users className="w-8 h-8" /> },
    { number: "15+", label: "Projects Built", icon: <Bot className="w-8 h-8" /> },
    { number: "2+", label: "Years Experience", icon: <Book className="w-8 h-8" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6 animate-slide-in-up">
              Passion-led
              <span className="block text-blue-600">Innovation</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-slide-in-up">
              Our mission is to democratize robotics education in India, making cutting-edge technology accessible to every student.
            </p>
          </div>

          {/* Meet the Founder Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20 animate-fade-in-up">
            <div className="relative animate-slide-in-left">
              <Card className="overflow-hidden border-0 shadow-2xl hover-scale">
                <CardContent className="p-0">
                  <img 
                    src="https://i.postimg.cc/bJ03pQ7H/1000108570.jpg"
                    alt="Avi Mohan Shuklaa - Founder of Innobotix"
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute bottom-6 left-6 right-6 glass-effect rounded-lg p-4 shadow-lg">
                    <h3 className="font-semibold text-white mb-1">Meet the Founder</h3>
                    <p className="text-sm text-blue-100">Building the future of robotics education</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="animate-slide-in-right">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Meet the Founder</h2>
              <div className="space-y-6 text-gray-600">
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-lg border-l-4 border-blue-500">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Avi Mohan Shuklaa</h3>
                  <p className="text-lg text-blue-700 mb-4">High school robotics innovator and founder of Innobotix</p>
                  <a 
                    href="https://www.avishuklaa.in" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-medium transition-colors hover-scale"
                  >
                    <span>Visit Personal Website</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
                <p>
                  Started as a college project, Innobotix was born from a simple observation: 
                  robotics education in India was too expensive and complex for most students.
                </p>
                <p>
                  As an engineering student, I struggled to find affordable, comprehensive robotics kits 
                  that didn't require extensive prior knowledge. Most available options were either 
                  too basic or prohibitively expensive.
                </p>
                <p>
                  That's when I decided to create something different - a complete ecosystem that combines 
                  high-quality hardware, comprehensive learning materials, and ongoing mentor support, 
                  all at an affordable price.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16 animate-fade-in">
            Our Impact
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border-blue-100 hover:shadow-xl transition-all duration-300 hover-scale animate-scale-in">
                <CardContent className="p-8">
                  <div className="text-blue-600 mb-4 flex justify-center glow-effect">
                    {stat.icon}
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Our Mission</h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              To democratize robotics education by providing affordable, comprehensive learning solutions 
              that empower students to build, learn, and innovate without barriers.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center hover-scale">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 glow-effect">
                  <span className="text-white font-bold text-xl">$</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Accessibility</h3>
                <p className="text-gray-600">Making robotics affordable for every student</p>
              </div>
              <div className="text-center hover-scale">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 glow-effect">
                  <span className="text-white font-bold text-xl">★</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Quality</h3>
                <p className="text-gray-600">Premium components and comprehensive guides</p>
              </div>
              <div className="text-center hover-scale">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 glow-effect">
                  <span className="text-white font-bold text-xl">♥</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Support</h3>
                <p className="text-gray-600">Ongoing mentorship and community help</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
