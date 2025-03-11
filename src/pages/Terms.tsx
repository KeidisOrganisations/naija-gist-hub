
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-8">Terms of Service</h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-6">
                Last updated: {new Date().toLocaleDateString()}
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
              <p>
                Welcome to Naija How-To Hub. These terms and conditions outline the rules and regulations 
                for the use of our website. By accessing this website, we assume you accept these terms 
                and conditions in full. Do not continue to use Naija How-To Hub if you do not accept all 
                of the terms and conditions stated on this page.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">2. License to Use</h2>
              <p>
                Unless otherwise stated, Naija How-To Hub and/or its licensors own the intellectual property rights 
                for all material on this website. All intellectual property rights are reserved. You may view and/or print 
                pages from the website for your own personal use subject to restrictions set in these terms and conditions.
              </p>
              <p>You must not:</p>
              <ul className="list-disc pl-6 mb-6">
                <li>Republish material from this website</li>
                <li>Sell, rent or sub-license material from this website</li>
                <li>Reproduce, duplicate or copy material from this website</li>
                <li>Redistribute content from Naija How-To Hub (unless content is specifically made for redistribution)</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">3. User Contributions</h2>
              <p>
                Users may submit content to our website in the form of guides, comments, or other materials. 
                By submitting content, you grant us a non-exclusive, perpetual, irrevocable, royalty-free, 
                worldwide license to use, copy, modify, adapt, publish, translate, create derivative works from, 
                distribute, and display such content in any form, media, or technology.
              </p>
              <p>
                You represent and warrant that you own or control all rights in and to the content that you submit, 
                and that such content does not violate these terms or any applicable law.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">4. Acceptable Use</h2>
              <p>
                You may use our website only for lawful purposes and in accordance with these terms. You agree not to:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>Use the website in any way that violates any applicable federal, state, local, or international law or regulation</li>
                <li>Impersonate or attempt to impersonate the Company, a Company employee, another user, or any other person or entity</li>
                <li>Engage in any conduct that restricts or inhibits anyone's use or enjoyment of the website</li>
                <li>Use the website in any manner that could disable, overburden, damage, or impair the site</li>
                <li>Upload or transmit viruses, Trojan horses, or other material designed to interrupt, destroy, or limit the functionality of any computer software or hardware</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">5. Limitation of Liability</h2>
              <p>
                In no event shall Naija How-To Hub, nor any of its officers, directors, and employees, be liable to you for 
                anything arising out of or in any way connected with your use of this website. Naija How-To Hub shall not be 
                liable for any indirect, consequential, or special liability arising out of or in any way related to your use 
                of this website.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">6. Indemnification</h2>
              <p>
                You agree to indemnify and hold Naija How-To Hub and its affiliates, officers, agents, employees, and partners 
                harmless from and against any and all claims, liabilities, damages, losses, and expenses, including reasonable 
                legal and accounting fees, arising out of or in any way connected with your access to or use of the site or your 
                violation of these terms.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">7. Governing Law</h2>
              <p>
                These terms and conditions are governed by and construed in accordance with the laws of Nigeria and you 
                irrevocably submit to the exclusive jurisdiction of the courts in Nigeria.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">8. Changes to Terms</h2>
              <p>
                We reserve the right, at our sole discretion, to modify or replace these terms at any time. If a revision is 
                material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes 
                a material change will be determined at our sole discretion.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">9. Contact Information</h2>
              <p>
                If you have any questions about these Terms, please contact us at:
              </p>
              <p className="mb-6">
                Email: terms@naijahowto.com<br />
                Address: 123 Lagos Street, Victoria Island, Lagos, Nigeria
              </p>
              
              <div className="mt-10 pt-6 border-t border-gray-200">
                <p>
                  By using our website, you consent to our <Link to="/privacy" className="text-naija-green hover:underline">Privacy Policy</Link> and <Link to="/terms" className="text-naija-green hover:underline">Terms of Service</Link>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Terms;
