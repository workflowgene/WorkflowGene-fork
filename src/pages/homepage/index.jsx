import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import AIChatbot from '../../components/ui/AIChatbot';
import HeroSection from './components/HeroSection';
import IndustryPathways from './components/IndustryPathways';
import WorkflowBuilder from './components/WorkflowBuilder';
import FeaturesPreview from './components/FeaturesPreview';
import SocialProof from './components/SocialProof';
import CTASection from './components/CTASection';
import { initGA, trackPageView } from '../../lib/analytics';

const Homepage = () => {
  useEffect(() => {
    // Initialize Google Analytics
    initGA();
    trackPageView('/homepage');

    // Scroll reveal animation
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, observerOptions);

    const scrollElements = document.querySelectorAll('.scroll-reveal');
    scrollElements?.forEach(el => observer?.observe(el));

    return () => {
      scrollElements?.forEach(el => observer?.unobserve(el));
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>WorkflowGene Cloud - DNA of Smart Business Automation</title>
        <meta name="description" content="Transform your business operations with intelligent workflow automation. Join 50,000+ businesses using WorkflowGene Cloud for seamless process automation across Education, Healthcare, and E-Commerce." />
        <meta name="keywords" content="workflow automation, business process automation, AI workflows, enterprise automation, SaaS platform" />
        <meta property="og:title" content="WorkflowGene Cloud - DNA of Smart Business Automation" />
        <meta property="og:description" content="Intelligent workflow automation platform that evolves with your business. Start your free trial today." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://workflowgene.cloud" />
        <link rel="canonical" href="https://workflowgene.cloud" />
      </Helmet>
      <Header />
      <main>
        <HeroSection />
        <IndustryPathways />
        <WorkflowBuilder />
        <FeaturesPreview />
        <SocialProof />
        <CTASection />
      </main>



      <Footer />
      <AIChatbot />
    </div>
  );
};

export default Homepage;