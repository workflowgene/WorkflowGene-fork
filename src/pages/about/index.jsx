import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import AIChatbot from '../../components/ui/AIChatbot';
import HeroSection from './components/HeroSection';
import MissionSection from './components/MissionSection';
import TeamSection from './components/TeamSection';
import TimelineSection from './components/TimelineSection';
import TrustSection from './components/TrustSection';
import CultureSection from './components/CultureSection';

const About = () => {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>About Us - WorkflowGene Cloud | The DNA of Smart Business Automation</title>
        <meta 
          name="description" 
          content="Learn about WorkflowGene Cloud's mission to revolutionize business automation. Meet our team, explore our company culture, and discover how we're empowering businesses to evolve and thrive through intelligent workflow automation." 
        />
        <meta name="keywords" content="about workflowgene, company story, business automation team, workflow automation mission, enterprise software company" />
        <meta property="og:title" content="About Us - WorkflowGene Cloud" />
        <meta property="og:description" content="The DNA of smart business automation. Learn about our mission, team, and commitment to empowering businesses through intelligent workflow automation." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://workflowgene.cloud/about" />
        <link rel="canonical" href="https://workflowgene.cloud/about" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          {/* Hero Section */}
          <HeroSection />
          
          {/* Mission & Values Section */}
          <MissionSection />
          
          {/* Team Section */}
          <TeamSection />
          
          {/* Company Timeline */}
          <TimelineSection />
          
          {/* Trust & Security */}
          <TrustSection />
          
          {/* Culture & Benefits */}
          <CultureSection />
          
        </main>





          </div>
      <Footer />
      <AIChatbot />
  )
}