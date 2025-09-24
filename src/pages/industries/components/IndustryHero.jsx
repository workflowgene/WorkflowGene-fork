import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const IndustryHero = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-background to-accent/5 pt-24 pb-16 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Icon name="Building2" size={16} />
            <span>Industry Solutions</span>
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-bold text-text-primary mb-6 leading-tight">
            Automation DNA for Every
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> Industry</span>
          </h1>
          
          <p className="text-xl text-text-secondary mb-8 leading-relaxed">
            Discover how WorkflowGene Cloud transforms businesses across Education, Healthcare, and E-Commerce with intelligent automation solutions tailored to your industry's unique challenges.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              variant="default" 
              size="lg" 
              className="btn-organic"
              iconName="Play"
              iconPosition="left"
            >
              Watch Industry Demo
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              iconName="Calculator"
              iconPosition="left"
            >
              Calculate ROI
            </Button>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">500+</div>
              <div className="text-text-secondary">Companies Automated</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">85%</div>
              <div className="text-text-secondary">Average Time Saved</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">$2.4M</div>
              <div className="text-text-secondary">Average Annual Savings</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustryHero;