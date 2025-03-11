
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/advertise/HeroSection";
import StatsSection from "@/components/advertise/StatsSection";
import AdvertisingOptionsSection from "@/components/advertise/AdvertisingOptionsSection";
import ContactForm from "@/components/advertise/ContactForm";

const Advertise = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <HeroSection />
        <StatsSection />
        <AdvertisingOptionsSection />
        <ContactForm />
      </main>
      
      <Footer />
    </div>
  );
};

export default Advertise;
