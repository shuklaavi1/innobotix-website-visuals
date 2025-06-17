
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Book, Users, Youtube } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const StarterKits = () => {
  const navigate = useNavigate();

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
    }
  ];

  const components = [
    "Arduino Uno R3",
    "Servo Motors (2x)",
    "Ultrasonic Sensor",
    "LED Matrix Display",
    "Jumper Wires",
    "Breadboard",
    "Resistors Set",
    "Project Manual"
  ];

  return (
    <section id="starter-kits" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            All-in-One Robotics Starter Kit
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            One kit, endless innovation. Everything you need to start your robotics journey.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Product Image */}
          <div className="relative">
            <div className="bg-gradient-to-br from-slate-100 to-blue-50 rounded-2xl p-8">
              <img 
                src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop"
                alt="Robotics Starter Kit Components"
                className="w-full h-80 object-cover rounded-lg shadow-lg"
              />
              
              {/* Price Badge */}
              <div className="absolute top-4 right-4">
                <Badge className="bg-green-500 text-white text-lg px-4 py-2">
                  ₹2,999
                </Badge>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div>
            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {features.map((feature, index) => (
                <Card key={index} className="border-blue-100 hover:border-blue-300 transition-colors">
                  <CardContent className="p-4 text-center">
                    <div className="text-blue-600 mb-2 flex justify-center">
                      {feature.icon}
                    </div>
                    <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* What's in the box */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">What's in the Box?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {components.map((component, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700">{component}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            <div className="space-y-4">
              <Button 
                size="lg"
                onClick={() => navigate("/starter-kits")}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-lg py-6"
              >
                Buy Now - ₹2,999
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => navigate("/starter-kits")}
                className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 text-lg py-6"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
