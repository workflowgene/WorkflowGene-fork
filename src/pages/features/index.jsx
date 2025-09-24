import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import FeatureCategories from './components/FeatureCategories';
import InteractiveDemo from './components/InteractiveDemo';
import IntegrationMarketplace from './components/IntegrationMarketplace';
import TemplateLibrary from './components/TemplateLibrary';
import AIRoadmap from './components/AIRoadmap';
import FeatureComparison from './components/FeatureComparison';
import CTASection from './components/CTASection';

const FeaturesPage = () => {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Features - WorkflowGene Cloud | Complete Automation Platform</title>
        <meta 
          name="description" 
          content="Discover WorkflowGene's comprehensive automation features including AI-powered workflows, 500+ integrations, smart document processing, and enterprise-grade security. Start your free trial today." 
        />
        <meta name="keywords" content="workflow automation, business process automation, AI automation, integration platform, document processing, enterprise automation" />
        <meta property="og:title" content="Features - WorkflowGene Cloud | Complete Automation Platform" />
        <meta property="og:description" content="Explore powerful automation features that transform your business processes into intelligent, self-evolving workflows." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://workflowgene.cloud/features" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          <HeroSection />
          <FeatureCategories />
          <InteractiveDemo />
          <IntegrationMarketplace />
          <TemplateLibrary />
          <AIRoadmap />
          <FeatureComparison />
          <CTASection />
        </main>
      </div>
    </>
  );
};

export default FeaturesPage;