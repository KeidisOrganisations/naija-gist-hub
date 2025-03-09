
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <div className="bg-gradient-to-r from-naija-lightGreen to-naija-lightYellow py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">About Naija How-To Hub</h1>
            <p className="text-lg text-center max-w-2xl mx-auto text-gray-700">
              Your ultimate resource for practical knowledge and guides about life in Nigeria.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-gray-700 mb-4">
                At Naija How-To Hub, we believe that access to practical, localized information shouldn't be complicated. 
                Our mission is to simplify everyday Nigerian challenges by providing clear, actionable guides that empower 
                people to navigate life's complexities with confidence.
              </p>
              <p className="text-lg text-gray-700">
                Whether you're trying to open a bank account, understand how to register a business, or looking for 
                the best ways to save money in today's economy, we've got you covered with straightforward, relevant advice.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-lg text-gray-700 mb-4">
                Naija How-To Hub was born out of frustration. Our founder, after spending hours searching for simple 
                information on how to complete basic tasks in Nigeria, realized there was no single, reliable source 
                of practical knowledge tailored to Nigerian realities.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                What started as a small blog in 2019 has grown into a comprehensive platform covering everything from 
                finance and education to technology and entrepreneurship—all with the unique Nigerian context in mind.
              </p>
              <p className="text-lg text-gray-700">
                Today, we're proud to serve millions of Nigerians monthly, helping them cut through the noise and get 
                straight to the information they need.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Our Values</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold mb-3 text-naija-green">Practicality</h3>
                  <p className="text-gray-700">
                    We focus on real solutions to real problems. No fluff, no unnecessary complexity—just 
                    what works in the Nigerian context.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold mb-3 text-naija-green">Accessibility</h3>
                  <p className="text-gray-700">
                    Information should be available to everyone. We write in clear, simple language that 
                    anyone can understand.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold mb-3 text-naija-green">Authenticity</h3>
                  <p className="text-gray-700">
                    Our content reflects the true Nigerian experience. We don't shy away from addressing the 
                    unique challenges we face as a nation.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold mb-3 text-naija-green">Community</h3>
                  <p className="text-gray-700">
                    We believe in the power of shared knowledge. Our platform encourages Nigerians to learn 
                    from and support each other.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Our Team</h2>
              <p className="text-lg text-gray-700 mb-8">
                Behind Naija How-To Hub is a team of passionate Nigerian writers, researchers, and subject-matter 
                experts who are committed to making everyday life easier for their fellow citizens.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-24 h-24 bg-naija-lightGreen rounded-full mx-auto mb-3"></div>
                  <h3 className="font-semibold">Chioma Eze</h3>
                  <p className="text-sm text-gray-600">Founder & CEO</p>
                </div>
                <div className="text-center">
                  <div className="w-24 h-24 bg-naija-lightGreen rounded-full mx-auto mb-3"></div>
                  <h3 className="font-semibold">Adebayo Ogunlesi</h3>
                  <p className="text-sm text-gray-600">Editor-in-Chief</p>
                </div>
                <div className="text-center">
                  <div className="w-24 h-24 bg-naija-lightGreen rounded-full mx-auto mb-3"></div>
                  <h3 className="font-semibold">Ngozi Okafor</h3>
                  <p className="text-sm text-gray-600">Head of Content</p>
                </div>
                <div className="text-center">
                  <div className="w-24 h-24 bg-naija-lightGreen rounded-full mx-auto mb-3"></div>
                  <h3 className="font-semibold">Emeka Nduka</h3>
                  <p className="text-sm text-gray-600">Tech Lead</p>
                </div>
              </div>
            </section>

            <section>
              <div className="bg-naija-lightGreen p-8 rounded-lg text-center">
                <h2 className="text-2xl font-bold mb-4">Want to Join Our Mission?</h2>
                <p className="text-lg mb-6">
                  We're always looking for passionate writers, researchers, and experts to contribute to our growing platform.
                </p>
                <Button asChild className="bg-naija-green hover:bg-naija-green/90 text-white">
                  <Link to="/contact">Get in Touch</Link>
                </Button>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default About;
