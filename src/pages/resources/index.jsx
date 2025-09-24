import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
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
      <footer className="bg-secondary text-secondary-foreground py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-genetic-md flex items-center justify-center">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-white"
                  >
                    <path
                      d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <span className="text-xl font-bold">WorkflowGene Cloud</span>
              </div>
              <p className="text-secondary-foreground/80 mb-4 max-w-md">
                Empowering businesses with intelligent automation solutions. Transform your workflows and unlock your organization's potential.
              </p>
              <div className="text-sm text-secondary-foreground/60">
                © {new Date()?.getFullYear()} WorkflowGene Cloud. All rights reserved.
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-secondary-foreground/80">
                <li><a href="#" className="hover:text-secondary-foreground transition-colors">Automation Academy</a></li>
                <li><a href="#" className="hover:text-secondary-foreground transition-colors">Template Library</a></li>
                <li><a href="#" className="hover:text-secondary-foreground transition-colors">Community Forum</a></li>
                <li><a href="#" className="hover:text-secondary-foreground transition-colors">Best Practices</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-secondary-foreground/80">
                <li><a href="#" className="hover:text-secondary-foreground transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-secondary-foreground transition-colors">API Documentation</a></li>
                <li><a href="#" className="hover:text-secondary-foreground transition-colors">Contact Support</a></li>
                <li><a href="#" className="hover:text-secondary-foreground transition-colors">System Status</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ResourcesPage;