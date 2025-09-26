import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import AIChatbot from '../../components/ui/AIChatbot';
import PricingHero from './components/PricingHero';
import PricingToggle from './components/PricingToggle';
import PricingCard from './components/PricingCard';
import ROICalculator from './components/ROICalculator';
import FeatureComparison from './components/FeatureComparison';
import PricingFAQ from './components/PricingFAQ';
import TrustSignals from './components/TrustSignals';
import EnterpriseContact from './components/EnterpriseContact';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import { openCalendlyDemo, startFreeTrial } from '../../utils/navigation';

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const pricingPlans = [
    {
      name: 'Starter',
      description: 'Perfect for small teams getting started with automation',
      price: 0,
      features: [
        { name: 'Up to 5 active workflows', included: true },
        { name: '1,000 monthly executions', included: true },
        { name: 'Basic workflow builder', included: true },
        { name: '20+ pre-built integrations', included: true },
        { name: 'Email support', included: true },
        { name: 'Basic analytics', included: true },
        { name: 'Custom templates', included: false },
        { name: 'Advanced logic & conditions', included: false },
        { name: 'API access', included: false },
        { name: 'Priority support', included: false }
      ],
      limits: [
        { name: 'Active workflows', value: '5' },
        { name: 'Monthly executions', value: '1,000' },
        { name: 'Team members', value: 'Unlimited' },
        { name: 'Data retention', value: '30 days' }
      ]
    },
    {
      name: 'Professional',
      description: 'Advanced automation for growing businesses',
      price: 200,
      features: [
        { name: 'Up to 50 active workflows', included: true },
        { name: '10,000 monthly executions', included: true },
        { name: 'Advanced workflow builder', included: true },
        { name: '100+ pre-built integrations', included: true },
        { name: 'Priority email & chat support', included: true },
        { name: 'Advanced analytics & reporting', included: true },
        { name: 'Custom templates', included: true },
        { name: 'Advanced logic & conditions', included: true },
        { name: 'API access & webhooks', included: true },
        { name: 'SOC 2 & GDPR compliance', included: true }
      ],
      limits: [
        { name: 'Active workflows', value: '50' },
        { name: 'Monthly executions', value: '10,000' },
        { name: 'Team members', value: 'Unlimited' },
        { name: 'Data retention', value: '1 year' }
      ]
    },
    {
      name: 'Enterprise',
      description: 'Custom solutions for large organizations',
      price: 'custom',
      features: [
        { name: 'Unlimited workflows', included: true },
        { name: 'Unlimited executions', included: true },
        { name: 'Enterprise workflow builder', included: true },
        { name: '500+ integrations + custom', included: true },
        { name: 'Dedicated account manager', included: true },
        { name: 'Enterprise analytics & insights', included: true },
        { name: 'White-label options', included: true },
        { name: 'Advanced security & SSO', included: true },
        { name: 'Custom integrations', included: true },
        { name: 'SLA guarantees', included: true }
      ],
      limits: [
        { name: 'Active workflows', value: 'Unlimited' },
        { name: 'Monthly executions', value: 'Unlimited' },
        { name: 'Team members', value: 'Unlimited' },
        { name: 'Data retention', value: 'Custom' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Pricing - WorkflowGene Cloud | Transparent Automation Pricing</title>
        <meta 
          name="description" 
          content="Simple, transparent pricing for business automation. Start free, scale seamlessly with WorkflowGene Cloud. ROI calculators, feature comparisons, and enterprise solutions available." 
        />
        <meta name="keywords" content="workflow automation pricing, business automation cost, ROI calculator, enterprise automation" />
      </Helmet>
      <Header />
      <main>
        {/* Hero Section */}
        <PricingHero />
        
        {/* Pricing Plans */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            {/* Billing Toggle */}
            <PricingToggle 
              billingCycle={billingCycle} 
              setBillingCycle={setBillingCycle} 
            />
            
            {/* Pricing Cards */}
            <div className="grid lg:grid-cols-3 gap-8 mb-16">
              {pricingPlans?.map((plan, index) => (
                <PricingCard
                  key={plan?.name}
                  plan={plan}
                  billingCycle={billingCycle}
                  isPopular={index === 1}
                />
              ))}
            </div>
            
            {/* Additional Info */}
            <div className="text-center">
              <div className="bg-muted/30 rounded-xl p-8 max-w-4xl mx-auto">
                <h3 className="text-xl font-semibold text-text-primary mb-4">
                  All plans include:
                </h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Icon name="Check" size={16} className="text-success" />
                    <span className="text-text-secondary">Unlimited team members</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Check" size={16} className="text-success" />
                    <span className="text-text-secondary">SSL encryption</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Check" size={16} className="text-success" />
                    <span className="text-text-secondary">99.9% uptime SLA</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Check" size={16} className="text-success" />
                    <span className="text-text-secondary">Mobile app access</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* ROI Calculator */}
        <ROICalculator />
        
        {/* Feature Comparison */}
        <FeatureComparison />
        
        {/* Trust Signals */}
        <TrustSignals />
        
        {/* Enterprise Contact */}
        <EnterpriseContact />
        
        {/* FAQ */}
        <PricingFAQ />
        
        {/* Final CTA */}
        <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Ready to transform your business?
            </h2>
            <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
              Join thousands of businesses already saving time and money with WorkflowGene Cloud.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                variant="default"
                size="lg"
                iconName="ArrowRight"
                iconPosition="right"
                className="btn-organic"
                onClick={startFreeTrial}
              >
                Start Free Trial
              </Button>
              <Button
                variant="outline"
                size="lg"
                iconName="Calendar"
                iconPosition="left"
                onClick={openCalendlyDemo}
              >
                Schedule Demo
              </Button>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-text-secondary">
              <div className="flex items-center space-x-2">
                <Icon name="Check" size={16} className="text-success" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Check" size={16} className="text-success" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Check" size={16} className="text-success" />
                <span>Setup in minutes</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <AIChatbot />
    </div>
  );
};

export default Pricing;