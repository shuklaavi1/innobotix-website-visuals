
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, Users, Book, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export const Services = () => {
  const navigate = useNavigate();

  const services = [
    {
      title: "Innobot AI",
      description: "Your Robotics AI Buddy",
      icon: <Bot className="w-8 h-8" />,
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=400&fit=crop",
      features: ["Doubt Solving", "Kit Guidance", "Project Ideas", "Community Chat", "24/7 Availability"],
      cta: "Try Beta",
      href: "/innobot",
      badge: "Beta Version",
      gradient: "from-violet-600 to-purple-600"
    },
    {
      title: "Pre-made Projects",
      description: "Plug-n-Play Projects for Schools & Colleges",
      icon: <Book className="w-8 h-8" />,
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop",
      features: ["Line Follower Robot", "Obstacle Avoider", "Voice Controller", "Smart Home Kit", "IoT Weather Station"],
      cta: "Explore Projects",
      href: "/projects",
      badge: "Popular",
      gradient: "from-blue-600 to-cyan-500"
    },
    {
      title: "Custom Builds",
      description: "Have an Idea? We'll Build It For You.",
      icon: <Users className="w-8 h-8" />,
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop",
      features: ["Submit Your Idea", "Talk to Engineer", "Receive Custom Robot", "Full Documentation", "Ongoing Support"],
      cta: "Submit Idea",
      href: "/custom-builds",
      badge: "Custom",
      gradient: "from-green-600 to-emerald-500"
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
            From AI assistance to ready-made solutions and custom builds, we've got everything to power your robotics journey.
          </p>
        </div>

        {/* Services Carousel */}
        <div className="relative">
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent className="-ml-4">
              {services.map((service, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className={`group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg overflow-hidden h-full ${
                    index === 0 ? 'ring-2 ring-violet-500/30 shadow-violet-500/20' : ''
                  }`}>
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
                          service.badge === 'Beta Version' ? 'bg-violet-500' : 
                          service.badge === 'Custom' ? 'bg-green-500' : 'bg-blue-500'
                        } text-white shadow-lg`}>
                          {service.badge}
                        </Badge>
                      </div>

                      {/* Icon */}
                      <div className={`absolute bottom-4 left-4 bg-white rounded-lg p-3 shadow-lg ${
                        index === 0 ? 'text-violet-600' : 'text-blue-600'
                      }`}>
                        {service.icon}
                      </div>
                    </div>

                    <CardHeader>
                      <CardTitle className="text-xl text-gray-900">{service.title}</CardTitle>
                      <p className="text-gray-600">{service.description}</p>
                    </CardHeader>

                    <CardContent className="space-y-4 flex-1 flex flex-col">
                      {/* Features */}
                      <div className="space-y-2 flex-1">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${
                              index === 0 ? 'bg-violet-500' : 'bg-blue-500'
                            }`}></div>
                            <span className="text-sm text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* CTA */}
                      <Button 
                        onClick={() => navigate(service.href)}
                        className={`w-full bg-gradient-to-r ${service.gradient} hover:opacity-90 mt-auto shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
                      >
                        {service.cta}
                      </Button>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};
