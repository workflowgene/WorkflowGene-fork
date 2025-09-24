import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-background via-surface to-muted py-20 lg:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-secondary rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Icon name="Zap" size={16} />
            <span>Powered by AI & Machine Learning</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl lg:text-6xl font-bold text-text-primary mb-6 leading-tight">
            The Complete
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent"> Automation</span>
            <br />
            Platform
          </h1>

          {/* Subheading */}
          <p className="text-xl lg:text-2xl text-text-secondary mb-8 leading-relaxed">
            Discover powerful features that transform your business processes into intelligent, 
            self-evolving workflows. Experience the DNA of smart automation.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button 
              variant="default" 
              size="lg" 
              className="btn-organic"
              iconName="Play"
              iconPosition="left"
            >
              Watch Interactive Demo
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              iconName="Download"
              iconPosition="left"
            >
              Download Feature Guide
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-sm text-text-secondary">Pre-built Templates</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <div className="text-sm text-text-secondary">Native Integrations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
              <div className="text-sm text-text-secondary">Uptime SLA</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-sm text-text-secondary">Expert Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;