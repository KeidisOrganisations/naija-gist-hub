
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-naija-green to-naija-yellow py-16 md:py-24">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Advertise on Naija How-To Hub
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8">
            Connect with millions of engaged Nigerians looking for practical advice and solutions
          </p>
          <Button 
            size="lg" 
            className="bg-white text-naija-green hover:bg-white/90"
            asChild
          >
            <a href="#contact">Get Started</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
