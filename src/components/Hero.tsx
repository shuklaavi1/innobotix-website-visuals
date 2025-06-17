
import { Button } from "@/components/ui/button";
import { ArrowDown, Bot, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-cyan-500/5" />
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
              Build the Future with{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Innobotix
              </span>
            </h1>
            
            <p className="mt-6 text-xl text-gray-600 leading-relaxed">
              DIY Robotics Kits, Custom Robot Solutions & Expert Mentorship. 
              Transform your ideas into reality with cutting-edge technology.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg"
                onClick={() => navigate("/starter-kits")}
                className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-lg px-8 py-6"
              >
                Explore Starter Kits
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => navigate("/custom-builds")}
                className="border-blue-200 text-blue-600 hover:bg-blue-50 text-lg px-8 py-6"
              >
                Request Custom Robot
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-8">
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-blue-600">5+</div>
                <div className="text-sm text-gray-600">Projects Included</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-blue-600">100+</div>
                <div className="text-sm text-gray-600">Students Helped</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-blue-600">24/7</div>
                <div className="text-sm text-gray-600">Mentor Support</div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl p-8 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop"
                alt="Robotics Workspace"
                className="w-full h-64 lg:h-80 object-cover rounded-lg"
              />
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-white rounded-lg p-4 shadow-lg">
                <Bot className="w-8 h-8 text-blue-600" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-lg p-4 shadow-lg">
                <Users className="w-8 h-8 text-cyan-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <ArrowDown className="w-6 h-6 text-gray-400 animate-bounce" />
        </div>
      </div>
    </section>
  );
};
