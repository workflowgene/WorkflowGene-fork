import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import AIChatbot from '../../components/ui/AIChatbot';
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





        <Footer />
        <AIChatbot />
      </div>
    </>
  );
};

export default Contact;