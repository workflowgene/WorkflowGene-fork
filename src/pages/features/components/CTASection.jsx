import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CTASection = () => {
  const benefits = [
    {
      icon: 'Zap',
      title: 'Quick Setup',
      description: 'Get started in minutes with our guided onboarding'
    },
    {
      icon: 'Shield',
      title: 'Enterprise Security',
      description: 'SOC 2 compliant with end-to-end encryption'
    },
    {
      icon: 'Users',
      title: 'Expert Support',
      description: '24/7 support from automation specialists'
    },
    {
      icon: 'TrendingUp',
      title: 'Proven ROI',
      description: 'Average 300% ROI within 6 months'
    }
  ];

  const testimonials = [
    {
      quote: "WorkflowGene transformed our operations. We\'ve automated 80% of our manual processes and saved 40 hours per week.",
      author: "Sarah Chen",
      role: "Operations Director",
      company: "TechFlow Solutions"
    },
    {
      quote: "The AI features are incredible. Document processing that used to take hours now happens in seconds with 99% accuracy.",
      author: "Michael Rodriguez",
      role: "IT Manager",
      company: "Healthcare Plus"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main CTA */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-text-primary mb-6 leading-tight">
            Ready to Transform Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent"> Business Workflows?</span>
          </h2>
          <p className="text-xl text-text-secondary mb-8 leading-relaxed">
            Join thousands of businesses that have automated their processes with WorkflowGene. 
            Start your free trial today and experience the power of intelligent automation.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button 
              variant="default" 
              size="xl" 
              className="btn-organic"
              iconName="Rocket"
              iconPosition="left"
            >
              Start Free 14-Day Trial
            </Button>
            <Button 
              variant="outline" 
              size="xl"
              iconName="Play"
              iconPosition="left"
            >
              Watch 5-Min Demo
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-text-secondary">
            <div className="flex items-center space-x-2">
              <Icon name="CreditCard" size={16} />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} />
              <span>Setup in under 5 minutes</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={16} />
              <span>Enterprise-grade security</span>
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {benefits?.map((benefit, index) => (
            <div 
              key={index}
              className="text-center p-6 bg-card rounded-genetic-xl shadow-organic-sm hover:shadow-organic-md transition-all duration-genetic-normal card-organic"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-genetic-lg mb-4">
                <Icon name={benefit?.icon} size={32} className="text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">{benefit?.title}</h3>
              <p className="text-text-secondary text-sm">{benefit?.description}</p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {testimonials?.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-card p-8 rounded-genetic-xl shadow-organic-md"
            >
              <div className="mb-6">
                <Icon name="Quote" size={32} className="text-primary/20" />
              </div>
              <blockquote className="text-text-primary mb-6 leading-relaxed">
                "{testimonial?.quote}"
              </blockquote>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {testimonial?.author?.split(' ')?.map(n => n?.[0])?.join('')}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-text-primary">{testimonial?.author}</div>
                  <div className="text-sm text-text-secondary">
                    {testimonial?.role} at {testimonial?.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Final CTA */}
        <div className="text-center bg-card p-8 lg:p-12 rounded-genetic-xl shadow-organic-lg">
          <h3 className="text-2xl lg:text-3xl font-bold text-text-primary mb-4">
            Join 10,000+ Companies Already Using WorkflowGene
          </h3>
          <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
            From startups to Fortune 500 companies, businesses trust WorkflowGene to automate 
            their most critical processes. See why we're the #1 choice for intelligent automation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              variant="default" 
              size="lg" 
              className="btn-organic"
              iconName="ArrowRight"
              iconPosition="right"
            >
              Get Started Now
            </Button>
            <Button 
              variant="ghost" 
              size="lg"
              iconName="Phone"
              iconPosition="left"
            >
              Schedule Consultation
            </Button>
          </div>

          {/* Company Logos */}
          <div className="pt-8 border-t border-border">
            <p className="text-sm text-text-secondary mb-6">Trusted by leading companies worldwide</p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
              {['Microsoft', 'Salesforce', 'Shopify', 'HubSpot', 'Stripe', 'Google']?.map((company, index) => (
                <div key={index} className="text-text-secondary font-semibold text-lg">
                  {company}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;