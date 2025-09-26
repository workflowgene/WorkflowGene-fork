import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import AIChatbot from '../../components/ui/AIChatbot';
import HeroSection from './components/HeroSection';
import ResourceCategories from './components/ResourceCategories';
import FeaturedContent from './components/FeaturedContent';
import AutomationAcademy from './components/AutomationAcademy';
import CommunityForum from './components/CommunityForum';
import InteractiveTools from './components/InteractiveTools';
import NewsletterCTA from './components/NewsletterCTA';

const ResourcesPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    // Scroll to featured content section
    const featuredSection = document.getElementById('featured-content');
    if (featuredSection) {
      featuredSection?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Resources - WorkflowGene Cloud | Automation Knowledge Hub</title>
        <meta 
          name="description" 
          content="Master business automation with our comprehensive resource library. Access courses, templates, community forum, interactive tools, and expert insights to transform your workflows." 
        />
        <meta name="keywords" content="automation resources, workflow templates, business automation courses, automation community, ROI calculator, automation academy" />
        <meta property="og:title" content="Resources - WorkflowGene Cloud | Automation Knowledge Hub" />
        <meta property="og:description" content="Master business automation with our comprehensive resource library. Access courses, templates, community forum, interactive tools, and expert insights." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://workflowgene.cloud/resources" />
        <link rel="canonical" href="https://workflowgene.cloud/resources" />
      </Helmet>
      <Header />
      <main>
        <HeroSection />
        
        <ResourceCategories 
          onCategoryChange={handleCategoryChange}
          activeCategory={activeCategory}
        />
        
        <div id="featured-content">
          <FeaturedContent />
        </div>
        
        <AutomationAcademy />
        
        <InteractiveTools />
        
        <CommunityForum />
        
        <NewsletterCTA />
      </main>
      <Footer />
      <AIChatbot />
    </div>
  );
};

export default ResourcesPage;