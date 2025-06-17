
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Users, Book } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const MentorSection = () => {
  const navigate = useNavigate();

  const benefits = [
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Instant Help",
      description: "Get answers to your doubts within hours"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Expert Mentors",
      description: "Learn from experienced robotics engineers"
    },
    {
      icon: <Book className="w-6 h-6" />,
      title: "Project Guidance",
      description: "Step-by-step support for your projects"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Confused with a Project?{" "}
              <span className="text-blue-600">Ask a Mentor.</span>
            </h2>
            
            <p className="text-xl text-gray-600 mb-8">
              Don't let technical challenges stop your innovation. Our expert mentors are here to guide you through every step of your robotics journey.
            </p>

            {/* Benefits */}
            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="bg-blue-100 rounded-lg p-2 text-blue-600">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button 
              size="lg"
              onClick={() => navigate("/mentorship")}
              className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-lg px-8 py-6"
            >
              Request Mentor Help
            </Button>
          </div>

          {/* Right Content - Image */}
          <div className="relative">
            <Card className="overflow-hidden border-0 shadow-2xl">
              <CardContent className="p-0">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop"
                  alt="Student working with mentor"
                  className="w-full h-80 object-cover"
                />
                
                {/* Overlay Card */}
                <div className="absolute bottom-6 left-6 right-6 bg-white rounded-lg p-4 shadow-lg">
                  <div className="flex items-center space-x-4">
                    <div className="bg-green-100 rounded-full p-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">24/7 Mentor Support</p>
                      <p className="text-sm text-gray-600">Average response time: 2 hours</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
