
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Bot, MessageSquare, Video, Wrench } from "lucide-react";

const Innobot = () => {
  const features = [
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Answer kit questions instantly",
      description: "Get immediate help with your robotics kit assembly and troubleshooting"
    },
    {
      icon: <Video className="w-8 h-8" />,
      title: "Step-by-step video guidance",
      description: "Watch personalized video tutorials for your specific project needs"
    },
    {
      icon: <Wrench className="w-8 h-8" />,
      title: "Helps you build robots, troubleshoot, and learn",
      description: "Your personal AI mentor for all things robotics"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-cyan-900">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-32 px-4 text-center relative overflow-hidden">
        {/* Enhanced Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-cyan-500/20" />
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] opacity-10" />
        
        <div className="max-w-4xl mx-auto relative z-10 animate-fade-in">
          <div className="mb-8">
            <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xl px-8 py-3 animate-pulse glow-effect">
              Coming Soon
            </Badge>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 animate-slide-in-up">
            INNOBOT
          </h1>
          
          <p className="text-2xl md:text-4xl text-blue-200 mb-12 animate-slide-in-up font-light">
            Our upcoming AI mentor that helps you build robotics projects with guidance and answers.
          </p>
          
          <div className="relative w-40 h-40 mx-auto mb-16">
            <div className="w-full h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center animate-pulse shadow-2xl glow-effect">
              <Bot className="w-20 h-20 text-white" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full animate-ping opacity-20"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-400 rounded-full animate-ping opacity-10 animation-delay-1000"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-16 animate-fade-in">
            What Innobot Will Do
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="glass-effect border-white/20 hover:bg-white/20 transition-all duration-300 animate-slide-in-up hover-scale">
                <CardContent className="p-8 text-center">
                  <div className="text-cyan-400 mb-6 flex justify-center glow-effect">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-blue-200">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon CTA */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-2xl mx-auto animate-fade-in-up">
          <h2 className="text-4xl font-bold text-white mb-6">
            Be the First to Know
          </h2>
          <p className="text-blue-200 mb-8 text-lg">
            Join our WhatsApp community to get notified when Innobot launches and be among the first to experience AI-powered robotics guidance.
          </p>
          <div className="animate-scale-in">
            <button 
              onClick={() => window.open("https://chat.whatsapp.com/your-group-link", "_blank")}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-8 rounded-lg text-xl transition-all hover-scale glow-effect"
            >
              Join WhatsApp Community
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Innobot;
