import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CertificationSection } from "@/components/CertificationSection";
import { OrderForm } from "@/components/OrderForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Book, Users, Youtube, Download } from "lucide-react";
import { useState } from "react";

const StarterKits = () => {
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);

  const handleOrderNow = () => {
    setIsOrderFormOpen(true);
  };

  const handleDownloadSample = () => {
    // Placeholder for sample project download
    console.log("Download Sample Project clicked");
    alert("Sample project download will be available soon!");
  };

  const projects = [
    {
      title: "Line Follower Robot",
      description: "Build a robot that follows black lines using IR sensors",
      difficulty: "Intermediate",
      time: "2-3 hours"
    },
    {
      title: "Obstacle Avoider",
      description: "Create a robot that navigates around obstacles autonomously",
      difficulty: "Intermediate",
      time: "3-4 hours"
    },
    {
      title: "Voice Controlled Bot",
      description: "Control your robot using voice commands via smartphone",
      difficulty: "Advanced",
      time: "4-5 hours"
    },
    {
      title: "Smart Home System",
      description: "Build IoT-enabled home automation with sensors",
      difficulty: "Intermediate",
      time: "2-3 hours"
    },
    {
      title: "Security Alert Buzzer",
      description: "Simulates intruder detection alarm",
      difficulty: "Beginner",
      time: "2-3 hours"
    }
  ];

  const components = [
    "Arduino Nano",
    "DC Motors (2x SG90)",
    "Ultrasonic Sensor HC-SR04",
    "IR Sensors (2x)",
    "Breadboard",
    "Battery",
    "Jumper Wires (40 pieces)",
    "LED + Wheels",
    "Resistors Set (20 pieces)",
    "Push Buttons",
    "Buzzer Module",
    "Project Manual & Code"
  ];

  const kitImages = [
    "https://i.postimg.cc/6p8rDwwJ/An-Indian-teenage-boy-in-a-dark-room-opening-a-mysterious-box-labeled-INNOBOTIX-Inside-the-box-ar.png",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&h=600&fit=crop"
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black">
        <Navigation />
        
        {/* Hero Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-5xl font-bold text-white mb-6">
                All-in-One Robotics
                <span className="block text-blue-400">Starter Kit</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
                One kit, endless innovation. Everything you need to build 5+ amazing robotics projects from scratch.
              </p>
              <div className="flex justify-center space-x-6 mb-8">
                <Badge className="bg-green-500 text-white px-4 py-2 text-lg">5+ Projects</Badge>
                <Badge className="bg-blue-500 text-white px-4 py-2 text-lg">Beginner-Friendly</Badge>
                <Badge className="bg-purple-500 text-white px-4 py-2 text-lg">Video Guides</Badge>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Product Image Carousel */}
              <div className="relative">
                <div className="bg-gray-800/50 rounded-2xl p-8 shadow-2xl backdrop-blur-sm border border-gray-700/50">
                  <Carousel className="w-full max-w-lg mx-auto">
                    <CarouselContent>
                      {kitImages.map((image, index) => (
                        <CarouselItem key={index}>
                          <div className="p-1">
                            <img 
                              src={image}
                              alt={`Innobotix Starter Kit View ${index + 1}`}
                              className="w-full h-80 object-cover rounded-lg"
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="text-white border-gray-600 hover:bg-gray-700 rounded-full w-12 h-12" />
                    <CarouselNext className="text-white border-gray-600 hover:bg-gray-700 rounded-full w-12 h-12" />
                  </Carousel>
                  <div className="absolute -top-4 -right-4 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-lg p-4 shadow-lg">
                    <div className="text-2xl font-bold">₹900</div>
                    <div className="text-sm opacity-90">Free Shipping</div>
                  </div>
                </div>
              </div>

              {/* Kit Features */}
              <div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <Card className="text-center bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <Book className="w-8 h-8 text-blue-400 mx-auto mb-4" />
                      <h3 className="font-semibold text-white mb-2">5+ Projects</h3>
                      <p className="text-sm text-gray-300">Complete step-by-step guides</p>
                    </CardContent>
                  </Card>
                  <Card className="text-center bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <Users className="w-8 h-8 text-blue-400 mx-auto mb-4" />
                      <h3 className="font-semibold text-white mb-2">Beginner-Friendly</h3>
                      <p className="text-sm text-gray-300">No prior experience needed</p>
                    </CardContent>
                  </Card>
                  <Card className="text-center bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <Youtube className="w-8 h-8 text-blue-400 mx-auto mb-4" />
                      <h3 className="font-semibold text-white mb-2">Video Guides</h3>
                      <p className="text-sm text-gray-300">HD video tutorials included</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-4">
                  <Button 
                    size="lg" 
                    onClick={handleOrderNow}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-lg py-6"
                  >
                    Pre-Book Now - ₹900
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    onClick={handleDownloadSample}
                    className="w-full border-blue-600 text-blue-400 hover:bg-blue-900/50 hover:text-white text-lg py-6"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download Sample Project
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="py-20 bg-gray-800/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center text-white mb-16">
              Projects You'll Build
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-lg text-white">{project.title}</CardTitle>
                      <Badge variant={project.difficulty === 'Beginner' ? 'secondary' : project.difficulty === 'Intermediate' ? 'default' : 'destructive'}>
                        {project.difficulty}
                      </Badge>
                    </div>
                    <p className="text-gray-300">{project.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm text-gray-400">
                      <span>⏱️ {project.time}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Components Section */}
        <section className="py-20 bg-gradient-to-br from-gray-900 via-slate-900 to-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center text-white mb-16">
              What's Inside the Kit?
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop"
                  alt="Kit Components Laid Out"
                  className="w-full h-80 object-cover rounded-lg shadow-lg"
                />
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Premium Components Included</h3>
                <div className="grid grid-cols-1 gap-3">
                  {components.map((component, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                      <span className="text-gray-300">{component}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 p-6 bg-blue-900/20 rounded-lg border border-blue-700/30 backdrop-blur-sm">
                  <h4 className="font-semibold text-blue-300 mb-2">Bonus Included:</h4>
                  <ul className="text-blue-200 space-y-1">
                    <li>• Lifetime access to video tutorials</li>
                    <li>• 1-year mentor support</li>
                    <li>• Project source codes</li>
                    <li>• Certificate of completion</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CertificationSection />

        <Footer />
      </div>

      {/* Order Form Modal */}
      <OrderForm 
        isOpen={isOrderFormOpen} 
        onClose={() => setIsOrderFormOpen(false)} 
      />
    </>
  );
};

export default StarterKits;
