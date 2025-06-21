
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Wrench, Package, ArrowRight } from "lucide-react";

export const CustomBuildProcess = () => {
  const processSteps = [
    {
      icon: <Brain className="w-12 h-12" />,
      title: "🧠 Share your robot idea",
      description: "Tell us about your robotics project vision and requirements",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Wrench className="w-12 h-12" />,
      title: "🛠️ We assign it to a builder",
      description: "Our experts will analyze feasibility and create a detailed proposal",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Package className="w-12 h-12" />,
      title: "📦 Robot is delivered to you",
      description: "Get your custom-built robot with documentation and support",
      color: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 mb-8">
            From your brain to reality—without you lifting a soldering iron.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {processSteps.map((step, index) => (
            <div key={step.title} className="relative group">
              <Card className="h-full hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-2 border-transparent hover:border-blue-200">
                <CardHeader className="text-center pb-4">
                  <div className={`w-20 h-20 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {step.icon}
                  </div>
                  <CardTitle className="text-2xl mb-4">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center text-lg leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
              
              {/* Arrow between steps */}
              {index < processSteps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-8 transform -translate-y-1/2 z-10">
                  <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center border-4 border-blue-100">
                    <ArrowRight className="w-8 h-8 text-blue-500" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
