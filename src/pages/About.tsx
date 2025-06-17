
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Bot, Book } from "lucide-react";

const About = () => {
  const stats = [
    { number: "500+", label: "Students Trained", icon: <Users className="w-8 h-8" /> },
    { number: "50+", label: "Projects Built", icon: <Bot className="w-8 h-8" /> },
    { number: "3+", label: "Years Experience", icon: <Book className="w-8 h-8" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Passion-led
              <span className="block text-blue-600">Innovation</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our mission is to democratize robotics education in India, making cutting-edge technology accessible to every student.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Founder Story */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">The Story Behind Innobotix</h2>
              <div className="space-y-4 text-gray-600">
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
                <p>
                  Today, Innobotix has helped over 500 students across India build their first robots 
                  and pursue careers in technology.
                </p>
              </div>
            </div>

            {/* Founder Image */}
            <div className="relative">
              <Card className="overflow-hidden border-0 shadow-2xl">
                <CardContent className="p-0">
                  <img 
                    src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop"
                    alt="Founder working on robotics"
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute bottom-6 left-6 right-6 bg-white rounded-lg p-4 shadow-lg">
                    <h3 className="font-semibold text-gray-900">Making Robotics Accessible</h3>
                    <p className="text-sm text-gray-600 mt-1">One student at a time</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Our Impact
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border-blue-100 hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="text-blue-600 mb-4 flex justify-center">
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
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Our Mission</h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              To democratize robotics education by providing affordable, comprehensive learning solutions 
              that empower students to build, learn, and innovate without barriers.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Accessibility</h3>
                <p className="text-gray-600">Making robotics affordable for every student</p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Quality</h3>
                <p className="text-gray-600">Premium components and comprehensive guides</p>
              </div>
              <div className="text-center">
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
