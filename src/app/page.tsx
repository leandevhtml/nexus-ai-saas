import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <SocialProof />
      <hr className="section-divider" />
      <Features />
      <hr className="section-divider" />
      <HowItWorks />
      <hr className="section-divider" />
      <About />
      <hr className="section-divider" />
      <Testimonials />
      <hr className="section-divider" />
      <Contact />
      <hr className="section-divider" />
      <FinalCTA />
      <Footer />
    </>
  );
}
