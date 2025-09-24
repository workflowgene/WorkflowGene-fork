import React from 'react';
import Icon from '../../../components/AppIcon';

const PricingHero = () => {
  return (
    <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Icon name="Zap" size={16} />
            <span>Transparent Pricing</span>
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-bold text-text-primary mb-6 leading-tight">
            Simple pricing that
            <span className="text-primary block">grows with you</span>
          </h1>
          
          <p className="text-xl text-text-secondary mb-8 leading-relaxed max-w-3xl mx-auto">
            Choose the perfect plan for your business automation needs. Start free, scale seamlessly, and unlock enterprise-grade features as you grow.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <div className="flex items-center space-x-2 text-success">
              <Icon name="Check" size={20} />
              <span className="text-sm font-medium">14-day free trial</span>
            </div>
            <div className="flex items-center space-x-2 text-success">
              <Icon name="Check" size={20} />
              <span className="text-sm font-medium">No credit card required</span>
            </div>
            <div className="flex items-center space-x-2 text-success">
              <Icon name="Check" size={20} />
              <span className="text-sm font-medium">Cancel anytime</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <div className="flex items-center space-x-3 bg-card border border-border rounded-lg px-6 py-3">
              <div className="flex -space-x-2">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                  alt="Customer"
                  className="w-8 h-8 rounded-full border-2 border-background"
                />
                <img
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face"
                  alt="Customer"
                  className="w-8 h-8 rounded-full border-2 border-background"
                />
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
                  alt="Customer"
                  className="w-8 h-8 rounded-full border-2 border-background"
                />
              </div>
              <div className="text-left">
                <div className="flex items-center space-x-1">
                  {[...Array(5)]?.map((_, i) => (
                    <Icon key={i} name="Star" size={14} className="text-warning fill-current" />
                  ))}
                </div>
                <p className="text-sm text-text-secondary">Trusted by 10,000+ businesses</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingHero;