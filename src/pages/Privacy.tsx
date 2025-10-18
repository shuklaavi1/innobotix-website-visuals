import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <main className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
        <p className="text-white/70 mb-4">Last updated: {new Date().toLocaleDateString()}</p>
        <div className="space-y-6 text-white/80 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold mb-2">1. Data We Collect</h2>
            <p>Contact details and usage data required to provide services.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-2">2. How We Use Data</h2>
            <p>To operate the site, improve experiences, and communicate with you.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-2">3. Third Parties</h2>
            <p>We may use third-party services like Formspree and email providers.</p>
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

export default Privacy;
