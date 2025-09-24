import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FeatureComparison = () => {
  const [selectedPlan, setSelectedPlan] = useState('professional');

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: '$29',
      period: '/month',
      description: 'Perfect for small teams getting started with automation',
      popular: false
    },
    {
      id: 'professional',
      name: 'Professional',
      price: '$99',
      period: '/month',
      description: 'Advanced features for growing businesses',
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 'Custom',
      period: 'pricing',
      description: 'Full-scale automation for large organizations',
      popular: false
    }
  ];

  const featureCategories = [
    {
      name: 'Core Workflow Features',
      features: [
        {
          name: 'Visual Workflow Builder',
          description: 'Drag-and-drop interface for creating workflows',
          starter: true,
          professional: true,
          enterprise: true
        },
        {
          name: 'Workflow Templates',
          description: 'Pre-built templates for common use cases',
          starter: '50+',
          professional: '200+',
          enterprise: '500+'
        },
        {
          name: 'Conditional Logic',
          description: 'Advanced if-then-else conditions',
          starter: 'Basic',
          professional: 'Advanced',
          enterprise: 'Advanced'
        },
        {
          name: 'Parallel Processing',
          description: 'Execute multiple branches simultaneously',
          starter: false,
          professional: true,
          enterprise: true
        },
        {
          name: 'Custom Functions',
          description: 'Write custom code for specialized tasks',
          starter: false,
          professional: 'JavaScript',
          enterprise: 'Multi-language'
        }
      ]
    },
    {
      name: 'Integrations & Connectivity',
      features: [
        {
          name: 'Pre-built Connectors',
          description: 'Ready-to-use integrations with popular apps',
          starter: '25',
          professional: '100+',
          enterprise: '500+'
        },
        {
          name: 'Custom API Connections',
          description: 'Connect to any REST API',
          starter: '5',
          professional: 'Unlimited',
          enterprise: 'Unlimited'
        },
        {
          name: 'Webhook Support',
          description: 'Real-time data synchronization',
          starter: true,
          professional: true,
          enterprise: true
        },
        {
          name: 'Database Connections',
          description: 'Direct database integration',
          starter: false,
          professional: 'SQL only',
          enterprise: 'SQL + NoSQL'
        },
        {
          name: 'Enterprise SSO',
          description: 'Single sign-on integration',
          starter: false,
          professional: false,
          enterprise: true
        }
      ]
    },
    {
      name: 'AI & Analytics',
      features: [
        {
          name: 'Document Processing AI',
          description: 'AI-powered document extraction',
          starter: false,
          professional: '1000/month',
          enterprise: 'Unlimited'
        },
        {
          name: 'Predictive Analytics',
          description: 'Machine learning insights',
          starter: false,
          professional: 'Basic',
          enterprise: 'Advanced'
        },
        {
          name: 'Natural Language Processing',
          description: 'Text analysis and sentiment detection',
          starter: false,
          professional: false,
          enterprise: true
        },
        {
          name: 'Custom AI Models',
          description: 'Train your own AI models',
          starter: false,
          professional: false,
          enterprise: true
        }
      ]
    },
    {
      name: 'Security & Compliance',
      features: [
        {
          name: 'Data Encryption',
          description: 'End-to-end encryption',
          starter: 'In transit',
          professional: 'At rest + transit',
          enterprise: 'At rest + transit'
        },
        {
          name: 'Role-based Access Control',
          description: 'Granular user permissions',
          starter: 'Basic',
          professional: 'Advanced',
          enterprise: 'Enterprise'
        },
        {
          name: 'Audit Logging',
          description: 'Comprehensive activity logs',
          starter: '30 days',
          professional: '1 year',
          enterprise: 'Unlimited'
        },
        {
          name: 'Compliance Certifications',
          description: 'SOC 2, GDPR, HIPAA compliance',
          starter: 'GDPR',
          professional: 'SOC 2 + GDPR',
          enterprise: 'All certifications'
        }
      ]
    },
    {
      name: 'Support & Resources',
      features: [
        {
          name: 'Support Channels',
          description: 'Available support options',
          starter: 'Email',
          professional: 'Email + Chat',
          enterprise: 'Phone + Dedicated'
        },
        {
          name: 'Response Time SLA',
          description: 'Guaranteed response times',
          starter: '24 hours',
          professional: '4 hours',
          enterprise: '1 hour'
        },
        {
          name: 'Training & Onboarding',
          description: 'Getting started assistance',
          starter: 'Self-service',
          professional: 'Group training',
          enterprise: 'Dedicated CSM'
        },
        {
          name: 'Custom Development',
          description: 'Professional services',
          starter: false,
          professional: false,
          enterprise: true
        }
      ]
    }
  ];

  const renderFeatureValue = (value, planId) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Icon name="Check" size={20} className="text-success mx-auto" />
      ) : (
        <Icon name="X" size={20} className="text-text-secondary mx-auto opacity-50" />
      );
    }
    
    if (typeof value === 'string') {
      return (
        <span className={`text-sm ${planId === selectedPlan ? 'text-primary font-medium' : 'text-text-primary'}`}>
          {value}
        </span>
      );
    }
    
    return (
      <span className={`text-sm ${planId === selectedPlan ? 'text-primary font-medium' : 'text-text-primary'}`}>
        {value}
      </span>
    );
  };

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-6">
            Feature Comparison
          </h2>
          <p className="text-lg text-text-secondary">
            Compare our plans and find the perfect fit for your automation needs. 
            All plans include our core workflow builder and 24/7 uptime monitoring.
          </p>
        </div>

        {/* Plan Selector (Mobile) */}
        <div className="lg:hidden mb-8">
          <div className="flex space-x-2 bg-card p-2 rounded-genetic-lg">
            {plans?.map((plan) => (
              <button
                key={plan?.id}
                onClick={() => setSelectedPlan(plan?.id)}
                className={`flex-1 px-4 py-2 rounded-genetic-md text-sm font-medium transition-all duration-genetic-normal ${
                  selectedPlan === plan?.id
                    ? 'bg-primary text-white' :'text-text-secondary hover:text-text-primary'
                }`}
              >
                {plan?.name}
              </button>
            ))}
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-card rounded-genetic-xl shadow-organic-lg overflow-hidden">
          {/* Table Header */}
          <div className="hidden lg:grid lg:grid-cols-4 gap-6 p-8 bg-surface border-b border-border">
            <div className="text-lg font-semibold text-text-primary">
              Features
            </div>
            {plans?.map((plan) => (
              <div key={plan?.id} className="text-center">
                <div className="relative">
                  {plan?.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-text-primary mb-2">{plan?.name}</h3>
                  <div className="flex items-baseline justify-center mb-2">
                    <span className="text-2xl font-bold text-primary">{plan?.price}</span>
                    <span className="text-text-secondary ml-1">{plan?.period}</span>
                  </div>
                  <p className="text-sm text-text-secondary mb-4">{plan?.description}</p>
                  <Button 
                    variant={plan?.popular ? "default" : "outline"} 
                    size="sm" 
                    fullWidth
                    className={plan?.popular ? "btn-organic" : ""}
                  >
                    {plan?.id === 'enterprise' ? 'Contact Sales' : 'Start Free Trial'}
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Feature Categories */}
          {featureCategories?.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              {/* Category Header */}
              <div className="p-6 bg-muted border-b border-border">
                <h3 className="text-lg font-semibold text-text-primary">{category?.name}</h3>
              </div>

              {/* Category Features */}
              {category?.features?.map((feature, featureIndex) => (
                <div key={featureIndex} className="border-b border-border last:border-b-0">
                  {/* Desktop View */}
                  <div className="hidden lg:grid lg:grid-cols-4 gap-6 p-6 hover:bg-surface/50 transition-colors duration-genetic-normal">
                    <div>
                      <h4 className="font-medium text-text-primary mb-1">{feature?.name}</h4>
                      <p className="text-sm text-text-secondary">{feature?.description}</p>
                    </div>
                    <div className="text-center">
                      {renderFeatureValue(feature?.starter, 'starter')}
                    </div>
                    <div className="text-center">
                      {renderFeatureValue(feature?.professional, 'professional')}
                    </div>
                    <div className="text-center">
                      {renderFeatureValue(feature?.enterprise, 'enterprise')}
                    </div>
                  </div>

                  {/* Mobile View */}
                  <div className="lg:hidden p-6">
                    <div className="mb-4">
                      <h4 className="font-medium text-text-primary mb-1">{feature?.name}</h4>
                      <p className="text-sm text-text-secondary">{feature?.description}</p>
                    </div>
                    <div className="text-center">
                      {renderFeatureValue(feature?.[selectedPlan], selectedPlan)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 p-8 bg-card rounded-genetic-xl shadow-organic-md">
          <h3 className="text-2xl font-bold text-text-primary mb-4">
            Still have questions?
          </h3>
          <p className="text-text-secondary mb-6">
            Our team is here to help you choose the right plan and get started with automation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="default" size="lg" iconName="MessageSquare" iconPosition="left" className="btn-organic">
              Schedule Demo
            </Button>
            <Button variant="outline" size="lg" iconName="Phone" iconPosition="left">
              Talk to Sales
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureComparison;