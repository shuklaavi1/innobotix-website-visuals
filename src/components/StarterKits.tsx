
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Book, Users, Youtube, Award, CheckCircle, Sparkles, ChevronLeft, ChevronRight, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { OrderForm } from "./OrderForm";

export const StarterKits = () => {
  const navigate = useNavigate();
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);

  const handleOrderNow = () => {
    setIsOrderFormOpen(true);
  };

  const handleDownloadSample = () => {
    // Placeholder for sample project download
    console.log("Download Sample Project clicked");
    alert("Sample project download will be available soon!");
  };

  const features = [
    {
      icon: <Book className="w-6 h-6" />,
      title: "5+ Projects",
      description: "Complete step-by-step guides"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Beginner-Friendly",
      description: "No prior experience needed"
    },
    {
      icon: <Youtube className="w-6 h-6" />,
      title: "Video Guides",
      description: "HD video tutorials included"
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Get Certified",
      description: "Official completion certificate"
    }
  ];

  const kitImages = [
    "https://i.postimg.cc/DZHvTfx3/assets-task-01jzqy5da5fkavbxakvp6sn706-1752076388-img-1.webp",
    "https://i.postimg.cc/DZ9TNjz2/assets-task-01jzqydw1sfgzt661vwgqfnefb-1752076675-img-0.webp",
    "https://i.postimg.cc/K8GyCgmg/assets-task-01jzqy1zfhemftmc2bzmq4a6kc-1752076264-img-0.webp",
    "https://i.postimg.cc/6p8rDwwJ/An-Indian-teenage-boy-in-a-dark-room-opening-a-mysterious-box-labeled-INNOBOTIX-Inside-the-box-ar.png"
  ];

  const components = [
    "Arduino",
    "L298N Motor Driver",
    "IR Sensors (2x)",
    "Ultrasonic Sensor",
    "Jumper Wires",
    "Breadboard",
    "2 Motors + Wheels",
    "Buzzer + LED",
    "Battery",
    "Project Manual"
  ];

  const featureHighlights = [
    "🔹 10+ Beginner-Friendly Projects",
    "🔹 Pre-tested Components",
    "🔹 Step-by-step Video Guides",
    "🔹 🎓 Certification on Completion"
  ];

  return (
    <>
      <section id="starter-kits" className="py-20 bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden">
        {/* Tech Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-64 h-64 border border-white rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-20 w-32 h-32 border border-white rounded-lg rotate-45 animate-bounce"></div>
          <div className="absolute bottom-20 left-1/4 w-48 h-48 border-2 border-dotted border-white rounded-full animate-spin-slow"></div>
          <div className="absolute bottom-40 right-1/3 w-24 h-24 border border-white rotate-12 animate-pulse"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              All-in-One Robotics Starter Kit
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              One kit, endless innovation. Everything you need to start your robotics journey.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image Carousel and Feature Highlights */}
            <div className="relative">
              {/* Feature List */}
              <div className="mb-8">
                <div className="space-y-2">
                  {featureHighlights.map((feature, index) => (
                    <div key={index} className="text-lg text-gray-300 font-medium">
                      {feature}
                    </div>
                  ))}
                </div>
                
                {/* Get Certified Button with slower animation */}
                <div className="mt-6">
                  <Button 
                    size="lg"
                    onClick={() => navigate("/starter-kits#certification")}
                    className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white animate-pulse-slower hover:animate-none hover:scale-105 transition-all duration-300"
                  >
                    <Award className="w-5 h-5 mr-2" />
                    <Sparkles className="w-4 h-4 mr-1" />
                    Get Certified Now!
                  </Button>
                </div>
              </div>

              {/* Enhanced Portrait Image Carousel */}
              <div className="bg-gradient-to-br from-gray-800/50 to-blue-900/30 rounded-2xl p-6 backdrop-blur-sm border border-gray-700/30 relative">
                <Carousel className="w-full max-w-lg mx-auto">
                  <CarouselContent>
                    {kitImages.map((image, index) => (
                      <CarouselItem key={index}>
                        <div className="p-1">
                          <div className="relative w-full h-96 bg-gradient-to-br from-gray-900/80 to-blue-900/60 rounded-lg overflow-hidden shadow-lg">
                            <img 
                              src={image}
                              alt={`Robotics Starter Kit View ${index + 1}`}
                              className="absolute inset-0 w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                              style={{
                                objectFit: 'contain',
                                objectPosition: 'center'
                              }}
                            />
                            {/* Subtle overlay for better contrast */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/20 pointer-events-none"></div>
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="text-white border-gray-600 hover:bg-gray-700 rounded-full w-12 h-12 flex items-center justify-center bg-gray-800/80 backdrop-blur-sm">
                    <ChevronLeft className="w-6 h-6" />
                  </CarouselPrevious>
                  <CarouselNext className="text-white border-gray-600 hover:bg-gray-700 rounded-full w-12 h-12 flex items-center justify-center bg-gray-800/80 backdrop-blur-sm">
                    <ChevronRight className="w-6 h-6" />
                  </CarouselNext>
                </Carousel>
                
                {/* Price Badge */}
                <div className="absolute top-4 right-4">
                  <Badge className="bg-green-500 text-white text-lg px-4 py-2 animate-bounce">
                    ₹900
                  </Badge>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div>
              {/* Enhanced Features Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {features.map((feature, index) => (
                  <Card key={index} className="bg-gray-800/50 border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 backdrop-blur-sm">
                    <CardContent className="p-4 text-center">
                      <div className="text-blue-400 mb-2 flex justify-center">
                        {feature.icon}
                      </div>
                      <h3 className="font-semibold text-white">{feature.title}</h3>
                      <p className="text-sm text-gray-400 mt-1">{feature.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* What's in the box */}
              <Card className="mb-8 bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-white">What's in the Box?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {components.map((component, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span className="text-gray-300">{component}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* CTA */}
              <div className="space-y-4">
                <Button 
                  size="lg"
                  onClick={handleOrderNow}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-lg py-6 hover:scale-105 transition-all duration-300"
                >
                  Pre-Book Now - ₹900
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  onClick={() => navigate("/starter-kits")}
                  className="w-full border-blue-600 text-blue-400 hover:bg-blue-900/50 hover:text-white text-lg py-6 hover:scale-105 transition-all duration-300"
                >
                  Learn More
                </Button>
                <Button 
                  size="lg"
                  onClick={handleDownloadSample}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-lg py-6 hover:scale-105 transition-all duration-300"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Sample Project
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Order Form Modal */}
      <OrderForm 
        isOpen={isOrderFormOpen} 
        onClose={() => setIsOrderFormOpen(false)} 
      />
    </>
  );
};
