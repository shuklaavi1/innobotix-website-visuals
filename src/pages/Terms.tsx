import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <main className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>
        <p className="text-white/70 mb-4">Last updated: {new Date().toLocaleDateString()}</p>
        <div className="space-y-6 text-white/80 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold mb-2">1. Agreement</h2>
            <p>By using Innobotix services, you agree to these terms.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-2">2. Use of Service</h2>
            <p>Use our website and AI assistant responsibly and lawfully.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-2">3. No Warranty</h2>
            <p>Content is provided "as-is" without warranties of any kind.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-2">4. Contact</h2>
            <p>Questions? Contact hello@innobotix.com.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
