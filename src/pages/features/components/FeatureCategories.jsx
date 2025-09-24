import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const FeatureCategories = () => {
  const [activeCategory, setActiveCategory] = useState('workflow');

  const categories = [
    {
      id: 'workflow',
      name: 'Workflow Automation',
      icon: 'Workflow',
      description: 'Build, deploy, and manage intelligent workflows',
      features: [
        {
          title: 'Visual Workflow Builder',
          description: 'Drag-and-drop interface for creating complex automation workflows without coding',
          icon: 'GitBranch'
        },
        {
          title: 'Conditional Logic',
          description: 'Advanced if-then-else conditions with multi-branch decision trees',
          icon: 'Split'
        },
        {
          title: 'Parallel Processing',
          description: 'Execute multiple workflow branches simultaneously for faster processing',
          icon: 'Zap'
        },
        {
          title: 'Error Handling',
          description: 'Automatic retry mechanisms and custom error handling workflows',
          icon: 'Shield'
        }
      ]
    },
    {
      id: 'integration',
      name: 'Integrations',
      icon: 'Plug',
      description: 'Connect with your existing tools and platforms',
      features: [
        {
          title: 'API Connectors',
          description: 'Pre-built connectors for 500+ popular business applications',
          icon: 'Link'
        },
        {
          title: 'Custom Webhooks',
          description: 'Create custom webhook endpoints for real-time data synchronization',
          icon: 'Webhook'
        },
        {
          title: 'Database Integration',
          description: 'Direct connections to SQL, NoSQL, and cloud databases',
          icon: 'Database'
        },
        {
          title: 'File Processing',
          description: 'Automated file uploads, downloads, and format conversions',
          icon: 'FileText'
        }
      ]
    },
    {
      id: 'ai',
      name: 'AI & Analytics',
      icon: 'Brain',
      description: 'Intelligent automation with machine learning capabilities',
      features: [
        {
          title: 'Smart Document Processing',
          description: 'AI-powered extraction and processing of documents and forms',
          icon: 'FileSearch'
        },
        {
          title: 'Predictive Analytics',
          description: 'Machine learning models for forecasting and trend analysis',
          icon: 'TrendingUp'
        },
        {
          title: 'Natural Language Processing',
          description: 'Text analysis, sentiment detection, and content classification',
          icon: 'MessageSquare'
        },
        {
          title: 'Anomaly Detection',
          description: 'Automatic identification of unusual patterns and outliers',
          icon: 'AlertTriangle'
        }
      ]
    },
    {
      id: 'security',
      name: 'Security & Compliance',
      icon: 'Lock',
      description: 'Enterprise-grade security and compliance features',
      features: [
        {
          title: 'Role-Based Access Control',
          description: 'Granular permissions and user role management system',
          icon: 'Users'
        },
        {
          title: 'Data Encryption',
          description: 'End-to-end encryption for data at rest and in transit',
          icon: 'Key'
        },
        {
          title: 'Audit Logging',
          description: 'Comprehensive activity logs and compliance reporting',
          icon: 'FileCheck'
        },
        {
          title: 'SOC 2 Compliance',
          description: 'Certified security controls and regular compliance audits',
          icon: 'Award'
        }
      ]
    }
  ];

  const activeData = categories?.find(cat => cat?.id === activeCategory);

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-6">
            Comprehensive Feature Set
          </h2>
          <p className="text-lg text-text-secondary">
            Explore our complete automation platform with features designed for every aspect of your business workflow needs.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories?.map((category) => (
            <button
              key={category?.id}
              onClick={() => setActiveCategory(category?.id)}
              className={`flex items-center space-x-3 px-6 py-3 rounded-genetic-lg font-medium transition-all duration-genetic-normal ${
                activeCategory === category?.id
                  ? 'bg-primary text-white shadow-organic-md'
                  : 'bg-surface text-text-secondary hover:bg-muted hover:text-text-primary'
              }`}
            >
              <Icon name={category?.icon} size={20} />
              <span>{category?.name}</span>
            </button>
          ))}
        </div>

        {/* Active Category Content */}
        <div className="bg-card rounded-genetic-xl shadow-organic-lg p-8 lg:p-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-genetic-lg mb-4">
              <Icon name={activeData?.icon} size={32} className="text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-text-primary mb-2">{activeData?.name}</h3>
            <p className="text-lg text-text-secondary">{activeData?.description}</p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {activeData?.features?.map((feature, index) => (
              <div 
                key={index}
                className="flex items-start space-x-4 p-6 bg-surface rounded-genetic-lg hover:shadow-organic-md transition-all duration-genetic-normal card-organic"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-genetic-md flex items-center justify-center">
                  <Icon name={feature?.icon} size={24} className="text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-text-primary mb-2">{feature?.title}</h4>
                  <p className="text-text-secondary">{feature?.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureCategories;