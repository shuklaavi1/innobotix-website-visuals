
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageCircle, Users, Book, GraduationCap } from "lucide-react";
import { useState } from "react";

export const MentorSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    educationLevel: "",
    description: "",
    preferredMode: ""
  });

  const benefits = [
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Expert Guidance",
      description: "Get answers from MIT, Stanford, IIT graduates"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "1-on-1 Mentorship",
      description: "Personal attention for your specific needs"
    },
    {
      icon: <Book className="w-6 h-6" />,
      title: "Project Support",
      description: "From concept to completion, we're here"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Mentor request submitted:", formData);
    // TODO: Handle form submission - integrate with email service
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Content */}
          <div>
            <div className="mb-8">
              <h2 className="text-5xl font-bold text-gray-900 mb-4">
                Need Guidance in{" "}
                <span className="text-blue-600">Robotics?</span>
              </h2>
              
              <p className="text-xl text-gray-600 mb-6">
                Get personal mentorship from experts and students at top universities like MIT, Stanford, IITs & more.
              </p>

              <p className="text-lg text-gray-700 mb-8">
                Whether you're just getting started or working on advanced projects — our mentors are here to help you understand, build, and grow. Ask your doubts, get project help, or receive career advice in tech and robotics.
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="bg-blue-100 rounded-lg p-3 text-blue-600 flex-shrink-0">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* University Badges */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-4">Our mentors are from:</p>
              <div className="flex items-center space-x-6 text-gray-400">
                <span className="font-semibold">MIT</span>
                <span className="font-semibold">Stanford</span>
                <span className="font-semibold">IIT</span>
                <span className="font-semibold">+ More</span>
              </div>
            </div>
          </div>

          {/* Right Content - Enhanced Form */}
          <div className="relative">
            <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur">
              <CardContent className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-2">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Request a Mentor</h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Your full name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="education">Your current education level</Label>
                    <Select onValueChange={(value) => handleInputChange("educationLevel", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="school">School Student</SelectItem>
                        <SelectItem value="college">College Student</SelectItem>
                        <SelectItem value="graduate">Graduate</SelectItem>
                        <SelectItem value="professional">Working Professional</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Describe your doubt or what you need mentorship in</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      placeholder="Tell us about your project, doubts, or what you'd like guidance on..."
                      rows={4}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mode">Preferred time or mode</Label>
                    <Select onValueChange={(value) => handleInputChange("preferredMode", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="How would you like to connect?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="chat">Text/Chat</SelectItem>
                        <SelectItem value="video">Video Call</SelectItem>
                        <SelectItem value="voice">Voice Call</SelectItem>
                        <SelectItem value="flexible">Flexible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button 
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg py-6"
                  >
                    Request Mentor Help
                  </Button>
                </form>

                {/* Response Time Indicator */}
                <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <div>
                      <p className="font-semibold text-green-800">Quick Response Guaranteed</p>
                      <p className="text-sm text-green-600">We'll match you with a mentor within 24 hours</p>
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
