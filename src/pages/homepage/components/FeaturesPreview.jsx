import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const FeaturesPreview = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      id: 'visual-builder',
      title: 'Visual Workflow Builder',
      description: 'Create complex workflows with our intuitive drag-and-drop interface. No coding required.',
      icon: 'Workflow',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      benefits: [
        'Drag-and-drop interface',
        'Pre-built templates',
        'Real-time validation',
        'Version control'
      ],
      stats: { templates: '2,500+', buildTime: '15 min', successRate: '99.9%' }
    },
    {
      id: 'ai-intelligence',
      title: 'AI-Powered Intelligence',
      description: 'Leverage machine learning to optimize workflows automatically and predict potential issues.',
      icon: 'Brain',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      benefits: [
        'Predictive analytics',
        'Auto-optimization',
        'Anomaly detection',
        'Smart recommendations'
      ],
      stats: { accuracy: '98.5%', predictions: '1M+', optimization: '40%' }
    },
    {
      id: 'integrations',
      title: 'Universal Integrations',
      description: 'Connect with 500+ popular business tools and platforms seamlessly.',
      icon: 'Zap',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      benefits: [
        'One-click connections',
        'Real-time sync',
        'Custom APIs',
        'Enterprise security'
      ],
      stats: { integrations: '500+', uptime: '99.99%', dataSync: '< 1s' }
    },
    {
      id: 'analytics',
      title: 'Advanced Analytics',
      description: 'Get deep insights into your workflow performance with comprehensive reporting.',
      icon: 'BarChart3',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      benefits: [
        'Real-time dashboards',
        'Custom reports',
        'Performance metrics',
        'ROI tracking'
      ],
      stats: { metrics: '50+', reports: 'Custom', insights: 'Real-time' }
    }
  ];

  const quickFeatures = [
    {
      icon: 'Shield',
      title: 'Enterprise Security',
      description: 'SOC 2 Type II, GDPR compliant with end-to-end encryption'
    },
    {
      icon: 'Clock',
      title: '24/7 Monitoring',
      description: 'Continuous workflow monitoring with instant alerts'
    },
    {
      icon: 'Users',
      title: 'Team Collaboration',
      description: 'Built-in collaboration tools for seamless teamwork'
    },
    {
      icon: 'Smartphone',
      title: 'Mobile Ready',
      description: 'Manage workflows on-the-go with our mobile app'
    }
  ];

  const currentFeature = features?.[activeFeature];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 scroll-reveal">
          <div className="inline-flex items-center space-x-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Icon name="Sparkles" size={16} />
            <span>Powerful Features</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-text-primary mb-6">
            Everything You Need to Automate
          </h2>
          
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Comprehensive workflow automation tools designed to scale with your business needs.
          </p>
        </div>

        {/* Main Feature Showcase */}
        <div className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Feature Navigation */}
            <div className="space-y-6 scroll-reveal stagger-1">
              <div className="space-y-4">
                {features?.map((feature, index) => (
                  <button
                    key={feature?.id}
                    onClick={() => setActiveFeature(index)}
                    className={`w-full text-left p-6 rounded-genetic-lg border-2 transition-all duration-genetic-normal ${
                      activeFeature === index
                        ? 'border-primary bg-primary/5 shadow-organic-md'
                        : 'border-border bg-white hover:border-primary/50 hover:bg-primary/2'
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 rounded-genetic-md flex items-center justify-center flex-shrink-0 ${
                        activeFeature === index
                          ? 'bg-primary text-white' :'bg-muted text-text-secondary'
                      }`}>
                        <Icon name={feature?.icon} size={20} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-semibold text-text-primary mb-2">
                          {feature?.title}
                        </h3>
                        <p className="text-text-secondary">
                          {feature?.description}
                        </p>
                        
                        {activeFeature === index && (
                          <div className="mt-4 space-y-3 animate-fadeIn">
                            <div className="grid grid-cols-2 gap-2">
                              {feature?.benefits?.map((benefit, idx) => (
                                <div key={idx} className="flex items-center space-x-2">
                                  <Icon name="Check" size={14} className="text-success flex-shrink-0" />
                                  <span className="text-sm text-text-secondary">{benefit}</span>
                                </div>
                              ))}
                            </div>
                            
                            <div className="flex items-center space-x-6 pt-2 border-t border-border">
                              {Object.entries(feature?.stats)?.map(([key, value]) => (
                                <div key={key} className="text-center">
                                  <div className="text-sm font-bold text-primary">{value}</div>
                                  <div className="text-xs text-text-secondary capitalize">{key}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Feature Visual */}
            <div className="scroll-reveal stagger-2">
              <div className="relative rounded-genetic-xl overflow-hidden shadow-organic-lg">
                <Image
                  src={currentFeature?.image}
                  alt={`${currentFeature?.title} preview`}
                  className="w-full h-[500px] object-cover"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                
                {/* Feature Badge */}
                <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm rounded-genetic-md px-4 py-2 shadow-organic-md">
                  <div className="flex items-center space-x-2">
                    <Icon name={currentFeature?.icon} size={16} className="text-primary" />
                    <span className="font-medium text-text-primary">{currentFeature?.title}</span>
                  </div>
                </div>

                {/* Stats Overlay */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-genetic-md p-4 shadow-organic-md">
                  <div className="grid grid-cols-3 gap-4">
                    {Object.entries(currentFeature?.stats)?.map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-lg font-bold text-text-primary">{value}</div>
                        <div className="text-xs text-text-secondary capitalize">
                          {key === 'buildTime' ? 'Avg Build Time' :
                           key === 'successRate' ? 'Success Rate' :
                           key === 'predictions' ? 'Predictions Made' :
                           key === 'optimization' ? 'Performance Boost' :
                           key === 'uptime' ? 'System Uptime' :
                           key === 'dataSync' ? 'Sync Speed' :
                           key === 'reports' ? 'Report Types' :
                           key === 'insights' ? 'Insight Delivery' : key}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Features Grid */}
        <div className="scroll-reveal stagger-3">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-text-primary mb-4">
              Built for Modern Businesses
            </h3>
            <p className="text-lg text-text-secondary">
              Additional features that make WorkflowGene the complete automation solution
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickFeatures?.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-genetic-lg p-6 shadow-organic-sm hover:shadow-organic-md transition-all duration-genetic-normal card-organic"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-genetic-md flex items-center justify-center mb-4">
                  <Icon name={feature?.icon} size={24} className="text-primary" />
                </div>
                
                <h4 className="text-lg font-semibold text-text-primary mb-2">
                  {feature?.title}
                </h4>
                
                <p className="text-text-secondary text-sm">
                  {feature?.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 scroll-reveal stagger-4">
          <div className="bg-surface rounded-genetic-xl p-8 lg:p-12">
            <h3 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Ready to Experience These Features?
            </h3>
            <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
              Explore all features with our interactive demo or start building your first workflow today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/features">
                <Button
                  variant="default"
                  size="lg"
                  iconName="ArrowRight"
                  iconPosition="right"
                  className="btn-organic"
                >
                  Explore All Features
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                iconName="Play"
                iconPosition="left"
              >
                Interactive Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesPreview;