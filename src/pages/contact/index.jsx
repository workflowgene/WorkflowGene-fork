import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import ContactHero from './components/ContactHero';
import ContactMethods from './components/ContactMethods';
import ContactForm from './components/ContactForm';
import OfficeLocations from './components/OfficeLocations';
import SocialConnect from './components/SocialConnect';

const Contact = () => {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Contact Us - WorkflowGene Cloud | Get Expert Automation Support</title>
        <meta 
          name="description" 
          content="Get in touch with WorkflowGene Cloud's expert team. Schedule demos, get support, explore partnerships, or ask questions about business automation solutions." 
        />
        <meta name="keywords" content="contact workflowgene, automation support, schedule demo, business automation consultation, workflow automation help" />
        <meta property="og:title" content="Contact Us - WorkflowGene Cloud" />
        <meta property="og:description" content="Get expert support for your automation journey. Contact our team for demos, support, partnerships, and more." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://workflowgene.cloud/contact" />
        <link rel="canonical" href="https://workflowgene.cloud/contact" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          {/* Hero Section */}
          <ContactHero />
          
          {/* Contact Methods */}
          <ContactMethods />
          
          {/* Contact Form */}
          <ContactForm />
          
          {/* Office Locations */}
          <OfficeLocations />
          
          {/* Social Connect */}
          <SocialConnect />
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Company Info */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <img src="/assets/logos/WorkflowGene Logo.png"></img>
                </div>
                <p className="text-sm text-gray-300">
                  The DNA of smart business automation, empowering organizations to evolve and focus on growth.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-semibold mb-4 text-white">Company</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="/about" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
                  <li><a href="/careers" className="text-gray-300 hover:text-white transition-colors">Careers</a></li>
                  <li><a href="/press" className="text-gray-300 hover:text-white transition-colors">Press</a></li>
                  <li><a href="/investors" className="text-gray-300 hover:text-white transition-colors">Investors</a></li>
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h4 className="font-semibold mb-4 text-white">Resources</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="/resources" className="text-gray-300 hover:text-white transition-colors">Blog</a></li>
                  <li><a href="/help" className="text-gray-300 hover:text-white transition-colors">Help Center</a></li>
                  <li><a href="/api" className="text-gray-300 hover:text-white transition-colors">API Docs</a></li>
                  <li><a href="/security" className="text-gray-300 hover:text-white transition-colors">Security</a></li>
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h4 className="font-semibold mb-4 text-white">Legal</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="/privacy" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
                  <li><a href="/terms" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a></li>
                  <li><a href="/cookies" className="text-gray-300 hover:text-white transition-colors">Cookie Policy</a></li>
                  <li><a href="/compliance" className="text-gray-300 hover:text-white transition-colors">Compliance</a></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-gray-400">
                © {new Date()?.getFullYear()} WorkflowGene Cloud. All rights reserved.
              </p>
              <div className="flex space-x-4 mt-4 md:mt-0">
                <a href="https://linkedin.com/company/workflowgene" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="https://twitter.com/workflowgene" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Contact;