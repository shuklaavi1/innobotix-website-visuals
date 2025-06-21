
import { Hero } from "@/components/Hero";
import { StarterKits } from "@/components/StarterKits";
import { Services } from "@/components/Services";
import { Testimonials } from "@/components/Testimonials";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />
      <Hero />
      <StarterKits />
      <Services />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;
