import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CTASection = () => {
  const benefits = [
    {
      icon: 'Clock',
      title: '14-Day Free Trial',
      description: 'Full access to all features, no credit card required'
    },
    {
      icon: 'Users',
      title: 'Expert Support',
      description: 'Dedicated onboarding and 24/7 customer success team'
    },
    {
      icon: 'Shield',
      title: 'Enterprise Security',
      description: 'SOC 2 compliant with bank-level encryption'
    },
    {
      icon: 'Zap',
      title: 'Quick Setup',
      description: 'Get your first workflow running in under 15 minutes'
    }
  ];

  const stats = [
    { value: '50,000+', label: 'Active Users' },
    { value: '2M+', label: 'Workflows Created' },
    { value: '99.99%', label: 'Uptime SLA' },
    { value: '4.9/5', label: 'Customer Rating' }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-primary via-accent to-primary">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main CTA */}
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Transform Your Business Today
          </h2>
          
          <p className="text-xl lg:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            Join thousands of businesses already automating their workflows with WorkflowGene Cloud. 
            Start your free trial and see results in minutes, not months.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              variant="secondary"
              size="xl"
              iconName="Play"
              iconPosition="left"
              className="bg-white text-primary hover:bg-white/90 btn-organic text-lg px-8 py-4"
            >
              Start Free Trial
            </Button>
            <Button
              variant="outline"
              size="xl"
              iconName="Calendar"
              iconPosition="left"
              className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-4"
            >
              Schedule Demo
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-8 text-white/80">
            <div className="flex items-center space-x-2">
              <Icon name="Check" size={16} className="text-white" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Check" size={16} className="text-white" />
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Check" size={16} className="text-white" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16 scroll-reveal stagger-1">
          {stats?.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-white mb-2">
                {stat?.value}
              </div>
              <div className="text-white/80">
                {stat?.label}
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 scroll-reveal stagger-2">
          {benefits?.map((benefit, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-genetic-lg p-6 text-center hover:bg-white/15 transition-all duration-genetic-normal"
            >
              <div className="w-12 h-12 bg-white/20 rounded-genetic-md flex items-center justify-center mx-auto mb-4">
                <Icon name={benefit?.icon} size={24} className="text-white" />
              </div>
              
              <h3 className="text-lg font-semibold text-white mb-2">
                {benefit?.title}
              </h3>
              
              <p className="text-white/80 text-sm">
                {benefit?.description}
              </p>
            </div>
          ))}
        </div>

        {/* Final CTA */}
        <div className="text-center mt-16 scroll-reveal stagger-4">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Automate Your Success?
            </h3>
            
            <p className="text-xl text-white/90 mb-8">
              Don't let manual processes hold your business back. Start your automation journey today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="secondary"
                size="lg"
                iconName="Rocket"
                iconPosition="left"
                className="bg-white text-primary hover:bg-white/90 btn-organic"
              >
                Get Started Now
              </Button>
              <Button
                variant="outline"
                size="lg"
                iconName="MessageCircle"
                iconPosition="left"
                className="border-white/30 text-white hover:bg-white/10"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;