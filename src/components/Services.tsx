
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, Users, Book } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Services = () => {
  const navigate = useNavigate();

  const services = [
    {
      title: "Pre-made Projects",
      description: "Plug-n-Play Projects for Schools & Colleges",
      icon: <Book className="w-8 h-8" />,
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop",
      features: ["Line Follower Robot", "Obstacle Avoider", "Voice Controller", "Smart Home Kit", "IoT Weather Station"],
      cta: "Explore Projects",
      href: "/projects",
      badge: "Popular"
    },
    {
      title: "Custom Builds",
      description: "Have an Idea? We'll Build It For You.",
      icon: <Users className="w-8 h-8" />,
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop",
      features: ["Submit Your Idea", "Talk to Engineer", "Receive Custom Robot", "Full Documentation", "Ongoing Support"],
      cta: "Submit Idea",
      href: "/custom-builds",
      badge: "Custom"
    },
    {
      title: "Innobot AI",
      description: "Your Robotics AI Buddy",
      icon: <Bot className="w-8 h-8" />,
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=400&fit=crop",
      features: ["Doubt Solving", "Kit Guidance", "Project Ideas", "Community Chat", "24/7 Availability"],
      cta: "Coming Soon",
      href: "/innobot",
      badge: "Coming Soon"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From ready-made solutions to custom builds, we've got everything to power your robotics journey.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg overflow-hidden">
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* Badge */}
                <div className="absolute top-4 right-4">
                  <Badge className={`${
                    service.badge === 'Coming Soon' ? 'bg-orange-500' : 
                    service.badge === 'Custom' ? 'bg-purple-500' : 'bg-green-500'
                  } text-white`}>
                    {service.badge}
                  </Badge>
                </div>

                {/* Icon */}
                <div className="absolute bottom-4 left-4 bg-white rounded-lg p-3 text-blue-600">
                  {service.icon}
                </div>
              </div>

              <CardHeader>
                <CardTitle className="text-xl text-gray-900">{service.title}</CardTitle>
                <p className="text-gray-600">{service.description}</p>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Features */}
                <div className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Button 
                  onClick={() => navigate(service.href)}
                  className={`w-full ${
                    service.badge === 'Coming Soon' 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600'
                  }`}
                  disabled={service.badge === 'Coming Soon'}
                >
                  {service.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
