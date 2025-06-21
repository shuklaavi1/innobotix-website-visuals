
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CustomBuildProcess } from "@/components/CustomBuildProcess";
import { useToast } from "@/hooks/use-toast";

const CustomBuilds = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectTitle: "",
    description: "",
    budget: "",
    timeline: ""
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create mailto link
    const subject = `Custom Robot Build Request - ${formData.projectTitle}`;
    const body = `
Name: ${formData.name}
Email: ${formData.email}
Project Title: ${formData.projectTitle}
Description: ${formData.description}
Budget Range: ${formData.budget}
Timeline: ${formData.timeline}
    `;
    
    const mailtoLink = `mailto:hustlewithavi1@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
    
    toast({
      title: "Request Prepared!",
      description: "Your email client will open with the project details. Send the email and we'll get back to you within 24 hours!",
    });
    
    setFormData({
      name: "",
      email: "",
      projectTitle: "",
      description: "",
      budget: "",
      timeline: ""
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 px-4 animate-fade-in">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-slide-in-up">
            Have an Idea? 
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              {" "}We'll Build It
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-slide-in-up">
            Transform your robotics vision into reality with our custom build service. 
            From concept to completion, we bring your ideas to life.
          </p>
          <div className="animate-scale-in">
            <p className="text-2xl font-semibold text-blue-600 italic">
              "From your brain to reality—without you lifting a soldering iron."
            </p>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <CustomBuildProcess />

      {/* Project Submission Form */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Submit Your Project Idea</h2>
            <p className="text-gray-600">
              Tell us about your vision and we'll create a custom solution for you
            </p>
          </div>

          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
              <CardDescription>
                Provide as much detail as possible to help us understand your requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Your Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="projectTitle" className="block text-sm font-medium mb-2">
                    Project Title *
                  </label>
                  <Input
                    id="projectTitle"
                    name="projectTitle"
                    value={formData.projectTitle}
                    onChange={handleChange}
                    required
                    placeholder="Give your project a descriptive title"
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium mb-2">
                    Project Description *
                  </label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Describe your robotics project in detail. What should it do? What features do you need? Any specific requirements?"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium mb-2">
                      Budget Range
                    </label>
                    <Input
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      placeholder="e.g., ₹10,000 - ₹50,000"
                    />
                  </div>
                  <div>
                    <label htmlFor="timeline" className="block text-sm font-medium mb-2">
                      Timeline
                    </label>
                    <Input
                      id="timeline"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      placeholder="e.g., 2-3 weeks"
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-lg py-6">
                  Submit Project Idea
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CustomBuilds;
