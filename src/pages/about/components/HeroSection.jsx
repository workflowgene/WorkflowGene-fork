import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-background to-accent/5 pt-24 pb-16 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 border border-primary/20 rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-accent/20 rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 border border-primary/20 rounded-full"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Icon name="Dna" size={16} />
            <span>The DNA of Smart Business Automation</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6 leading-tight">
            Empowering Businesses to
            <span className="block text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text">
              Evolve & Thrive
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl text-text-secondary mb-8 leading-relaxed max-w-3xl mx-auto">
            At WorkflowGene Cloud, we believe automation isn't just a tool—it's the essential genetic code that enables businesses to evolve, adapt, and focus on what matters most: growth and innovation.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              variant="default" 
              size="lg" 
              className="btn-organic"
              iconName="Users"
              iconPosition="left"
            >
              Meet Our Team
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              iconName="Download"
              iconPosition="left"
            >
              Download Press Kit
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-8 border-t border-border">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-sm text-text-secondary">Enterprise Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
              <div className="text-sm text-text-secondary">Uptime SLA</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">50M+</div>
              <div className="text-sm text-text-secondary">Workflows Automated</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-sm text-text-secondary">Global Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;