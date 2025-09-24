import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-background to-accent/5 pt-24 pb-16">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Icon name="BookOpen" size={16} />
            <span>Knowledge Hub</span>
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-bold text-text-primary mb-6 leading-tight">
            Master the
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent"> DNA </span>
            of Automation
          </h1>
          
          <p className="text-xl text-text-secondary mb-8 leading-relaxed">
            Unlock your business potential with our comprehensive resource library. From beginner guides to advanced certifications, discover everything you need to transform your workflows.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button 
              variant="default" 
              size="lg" 
              className="btn-organic"
              iconName="Play"
              iconPosition="left"
            >
              Start Learning Journey
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              iconName="Download"
              iconPosition="left"
            >
              Download Templates
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">500+</div>
              <div className="text-sm text-text-secondary">Resources</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">50+</div>
              <div className="text-sm text-text-secondary">Courses</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">10K+</div>
              <div className="text-sm text-text-secondary">Community Members</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">24/7</div>
              <div className="text-sm text-text-secondary">Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;