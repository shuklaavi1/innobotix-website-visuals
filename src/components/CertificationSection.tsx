
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const CertificationSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectTitle: "",
    videoUrl: "",
    description: ""
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create mailto link
    const subject = `Project Submission for Certification - ${formData.projectTitle}`;
    const body = `
Name: ${formData.name}
Email: ${formData.email}
Project Title: ${formData.projectTitle}
Video URL: ${formData.videoUrl}
Description: ${formData.description}
    `;
    
    const mailtoLink = `mailto:hustlewithavi1@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
    
    toast({
      title: "Submission Prepared!",
      description: "Your email client will open with the project details. Send the email to complete your submission.",
    });
    
    setFormData({
      name: "",
      email: "",
      projectTitle: "",
      videoUrl: "",
      description: ""
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section className="py-20 bg-gradient-to-br from-yellow-50 to-orange-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="border-yellow-200 shadow-xl">
          <CardHeader className="text-center bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-t-lg">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-yellow-500" />
            </div>
            <CardTitle className="text-3xl mb-2">🎓 Get Certified</CardTitle>
            <p className="text-yellow-100">
              Upload your final project video and receive an official Innobotix Certificate of Completion!
            </p>
          </CardHeader>
          
          <CardContent className="p-8">
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
                  placeholder="e.g., Line Follower Robot"
                />
              </div>

              <div>
                <label htmlFor="videoUrl" className="block text-sm font-medium mb-2">
                  Video URL *
                </label>
                <Input
                  id="videoUrl"
                  name="videoUrl"
                  type="url"
                  value={formData.videoUrl}
                  onChange={handleChange}
                  required
                  placeholder="YouTube, Google Drive, or any video link"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-2">
                  Project Description
                </label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell us about your project, challenges faced, and what you learned..."
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white text-lg py-6"
              >
                <Upload className="w-5 h-5 mr-2" />
                Submit Project for Certification
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
