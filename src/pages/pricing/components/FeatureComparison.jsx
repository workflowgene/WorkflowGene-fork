import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const FeatureComparison = () => {
  const [activeCategory, setActiveCategory] = useState('core');

  const categories = [
    { id: 'core', name: 'Core Features', icon: 'Zap' },
    { id: 'integrations', name: 'Integrations', icon: 'Link' },
    { id: 'security', name: 'Security & Compliance', icon: 'Shield' },
    { id: 'support', name: 'Support & Training', icon: 'HeadphonesIcon' }
  ];

  const plans = [
    { id: 'starter', name: 'Starter', popular: false },
    { id: 'professional', name: 'Professional', popular: true },
    { id: 'enterprise', name: 'Enterprise', popular: false }
  ];

  const features = {
    core: [
      {
        name: 'Workflow Builder',
        description: 'Visual drag-and-drop workflow creation',
        starter: true,
        professional: true,
        enterprise: true
      },
      {
        name: 'Active Workflows',
        description: 'Number of concurrent workflows',
        starter: '5',
        professional: '50',
        enterprise: 'Unlimited'
      },
      {
        name: 'Monthly Executions',
        description: 'Workflow execution limit per month',
        starter: '1,000',
        professional: '10,000',
        enterprise: 'Unlimited'
      },
      {
        name: 'Custom Templates',
        description: 'Create and save custom workflow templates',
        starter: false,
        professional: true,
        enterprise: true
      },
      {
        name: 'Advanced Logic',
        description: 'Conditional branching and complex logic',
        starter: false,
        professional: true,
        enterprise: true
      },
      {
        name: 'Multi-step Workflows',
        description: 'Complex workflows with multiple steps',
        starter: '3 steps',
        professional: '20 steps',
        enterprise: 'Unlimited'
      },
      {
        name: 'Workflow Analytics',
        description: 'Performance metrics and insights',
        starter: 'Basic',
        professional: 'Advanced',
        enterprise: 'Enterprise'
      }
    ],
    integrations: [
      {
        name: 'Pre-built Integrations',
        description: 'Ready-to-use app connections',
        starter: '20+',
        professional: '100+',
        enterprise: '500+'
      },
      {
        name: 'Custom API Connections',
        description: 'Connect to any REST API',
        starter: false,
        professional: true,
        enterprise: true
      },
      {
        name: 'Webhook Support',
        description: 'Real-time data synchronization',
        starter: false,
        professional: true,
        enterprise: true
      },
      {
        name: 'Database Connections',
        description: 'Direct database integration',
        starter: false,
        professional: false,
        enterprise: true
      },
      {
        name: 'Enterprise Connectors',
        description: 'SAP, Oracle, Salesforce Enterprise',
        starter: false,
        professional: false,
        enterprise: true
      },
      {
        name: 'Custom Connectors',
        description: 'Build your own integrations',
        starter: false,
        professional: false,
        enterprise: true
      }
    ],
    security: [
      {
        name: 'SSL Encryption',
        description: 'Data encryption in transit',
        starter: true,
        professional: true,
        enterprise: true
      },
      {
        name: 'Data Encryption at Rest',
        description: 'Stored data encryption',
        starter: false,
        professional: true,
        enterprise: true
      },
      {
        name: 'SOC 2 Compliance',
        description: 'Security audit certification',
        starter: false,
        professional: true,
        enterprise: true
      },
      {
        name: 'GDPR Compliance',
        description: 'European data protection compliance',
        starter: false,
        professional: true,
        enterprise: true
      },
      {
        name: 'Single Sign-On (SSO)',
        description: 'Enterprise authentication',
        starter: false,
        professional: false,
        enterprise: true
      },
      {
        name: 'Advanced User Permissions',
        description: 'Granular access control',
        starter: false,
        professional: false,
        enterprise: true
      },
      {
        name: 'Audit Logs',
        description: 'Complete activity tracking',
        starter: false,
        professional: 'Basic',
        enterprise: 'Advanced'
      }
    ],
    support: [
      {
        name: 'Email Support',
        description: 'Support via email',
        starter: true,
        professional: true,
        enterprise: true
      },
      {
        name: 'Response Time',
        description: 'Guaranteed response time',
        starter: '48 hours',
        professional: '24 hours',
        enterprise: '4 hours'
      },
      {
        name: 'Live Chat Support',
        description: 'Real-time chat assistance',
        starter: false,
        professional: true,
        enterprise: true
      },
      {
        name: 'Phone Support',
        description: 'Direct phone assistance',
        starter: false,
        professional: false,
        enterprise: true
      },
      {
        name: 'Dedicated Account Manager',
        description: 'Personal success manager',
        starter: false,
        professional: false,
        enterprise: true
      },
      {
        name: 'Training Sessions',
        description: 'Onboarding and training',
        starter: 'Self-service',
        professional: 'Group sessions',
        enterprise: 'Custom training'
      },
      {
        name: 'Implementation Support',
        description: 'Setup and migration assistance',
        starter: false,
        professional: 'Basic',
        enterprise: 'Full service'
      }
    ]
  };

  const renderFeatureValue = (value) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Icon name="Check" size={20} className="text-success" />
      ) : (
        <Icon name="X" size={20} className="text-error" />
      );
    }
    return <span className="text-sm font-medium text-text-primary">{value}</span>;
  };

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            Compare Features
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            See exactly what's included in each plan and find the perfect fit for your business needs.
          </p>
        </div>
        
        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories?.map((category) => (
            <button
              key={category?.id}
              onClick={() => setActiveCategory(category?.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeCategory === category?.id
                  ? 'bg-primary text-white' :'bg-muted text-text-secondary hover:text-text-primary hover:bg-muted/80'
              }`}
            >
              <Icon name={category?.icon} size={16} />
              <span>{category?.name}</span>
            </button>
          ))}
        </div>
        
        {/* Comparison Table */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-4 gap-4 p-6 bg-muted/30 border-b border-border">
            <div className="font-semibold text-text-primary">Features</div>
            {plans?.map((plan) => (
              <div key={plan?.id} className="text-center">
                <div className={`font-semibold ${plan?.popular ? 'text-primary' : 'text-text-primary'}`}>
                  {plan?.name}
                </div>
                {plan?.popular && (
                  <div className="text-xs text-primary font-medium mt-1">Most Popular</div>
                )}
              </div>
            ))}
          </div>
          
          {/* Feature Rows */}
          <div className="divide-y divide-border">
            {features?.[activeCategory]?.map((feature, index) => (
              <div key={index} className="grid grid-cols-4 gap-4 p-6 hover:bg-muted/20 transition-colors">
                <div>
                  <div className="font-medium text-text-primary mb-1">{feature?.name}</div>
                  <div className="text-sm text-text-secondary">{feature?.description}</div>
                </div>
                <div className="text-center flex items-center justify-center">
                  {renderFeatureValue(feature?.starter)}
                </div>
                <div className="text-center flex items-center justify-center">
                  {renderFeatureValue(feature?.professional)}
                </div>
                <div className="text-center flex items-center justify-center">
                  {renderFeatureValue(feature?.enterprise)}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center mt-8">
          <p className="text-text-secondary mb-4">
            Need help choosing the right plan?
          </p>
          <button className="text-primary hover:text-primary/80 font-medium inline-flex items-center space-x-2">
            <Icon name="MessageCircle" size={16} />
            <span>Contact our sales team</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeatureComparison;