
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="py-12 md:py-20 bg-gradient-to-r from-naija-lightGreen to-naija-lightYellow">
      <div className="container px-4 mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6 leading-tight">
            Omo, life no suppose hard! <br />
            <span className="bg-gradient-to-r from-naija-green to-naija-yellow bg-clip-text text-transparent">
              Get the best Naija how-tos here.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-naija-charcoal/80 mb-8 max-w-2xl mx-auto">
            Practical guides on finance, education, tech, business, and everyday life in Nigeria. 
            No long talk, just straight to the point info wey go make your life better!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              className="bg-naija-charcoal hover:bg-naija-charcoal/90 text-white font-medium px-6 py-3 rounded-full"
              asChild
            >
              <Link to="/category/tech">
                Explore How-Tos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              className="border-naija-charcoal text-naija-charcoal hover:bg-naija-charcoal/10 font-medium px-6 py-3 rounded-full"
              onClick={() => {
                document.getElementById('newsletter-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Subscribe for Updates
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
