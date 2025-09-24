import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const AIRoadmap = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('current');

  const timeframes = [
    { id: 'current', name: 'Available Now', icon: 'CheckCircle' },
    { id: 'q1-2025', name: 'Q1 2025', icon: 'Calendar' },
    { id: 'q2-2025', name: 'Q2 2025', icon: 'Clock' },
    { id: 'future', name: 'Future Vision', icon: 'Telescope' }
  ];

  const roadmapData = {
    'current': {
      title: 'AI Features Available Now',
      subtitle: 'Production-ready AI capabilities you can use today',
      features: [
        {
          name: 'Smart Document Processing',
          description: 'AI-powered extraction and classification of documents with 95% accuracy',
          status: 'live',
          impact: 'High',
          category: 'Document AI',
          details: 'Supports PDFs, images, and scanned documents with OCR and NLP processing'
        },
        {
          name: 'Predictive Workflow Optimization',
          description: 'Machine learning algorithms that optimize workflow performance automatically',
          status: 'live',
          impact: 'High',
          category: 'Performance AI',
          details: 'Reduces processing time by up to 40% through intelligent routing and resource allocation'
        },
        {
          name: 'Natural Language Automation',
          description: 'Create workflows using plain English descriptions',
          status: 'live',
          impact: 'Medium',
          category: 'Conversational AI',
          details: 'Transform business requirements into executable workflows through natural language processing'
        },
        {
          name: 'Anomaly Detection',
          description: 'Automatic identification of unusual patterns and potential issues',
          status: 'live',
          impact: 'Medium',
          category: 'Monitoring AI',
          details: 'Real-time monitoring with intelligent alerting and root cause analysis'
        }
      ]
    },
    'q1-2025': {
      title: 'Q1 2025 Releases',
      subtitle: 'Next-generation AI features coming in the first quarter',
      features: [
        {
          name: 'AI Workflow Designer',
          description: 'Conversational AI that builds complete workflows from business descriptions',
          status: 'development',
          impact: 'High',
          category: 'Generative AI',
          details: 'Chat with AI to describe your process and get a fully functional workflow in minutes'
        },
        {
          name: 'Intelligent Data Mapping',
          description: 'Automatic field mapping between different systems using AI',
          status: 'development',
          impact: 'High',
          category: 'Integration AI',
          details: 'Eliminates manual data mapping with 98% accuracy across 500+ applications'
        },
        {
          name: 'Sentiment Analysis Engine',
          description: 'Real-time sentiment analysis for customer communications',
          status: 'beta',
          impact: 'Medium',
          category: 'Communication AI',
          details: 'Analyze customer emails, chats, and feedback to trigger appropriate responses'
        }
      ]
    },
    'q2-2025': {
      title: 'Q2 2025 Innovations',
      subtitle: 'Advanced AI capabilities planned for mid-year release',
      features: [
        {
          name: 'Autonomous Workflow Healing',
          description: 'AI that automatically fixes broken workflows and prevents failures',
          status: 'planning',
          impact: 'High',
          category: 'Self-Healing AI',
          details: 'Proactive error detection and automatic resolution with 99.5% success rate'
        },
        {
          name: 'Multi-Modal AI Processing',
          description: 'Process text, images, audio, and video in unified workflows',
          status: 'planning',
          impact: 'High',
          category: 'Multi-Modal AI',
          details: 'Comprehensive media processing with cross-modal understanding and generation'
        },
        {
          name: 'Predictive Business Intelligence',
          description: 'AI-driven insights and forecasting for business decision making',
          status: 'research',
          impact: 'Medium',
          category: 'Analytics AI',
          details: 'Advanced predictive models for revenue, customer behavior, and market trends'
        }
      ]
    },
    'future': {
      title: 'Future Vision',
      subtitle: 'Revolutionary AI concepts in research and development',
      features: [
        {
          name: 'Quantum-Enhanced Processing',
          description: 'Quantum computing integration for complex optimization problems',
          status: 'research',
          impact: 'Revolutionary',
          category: 'Quantum AI',
          details: 'Exponential performance improvements for large-scale workflow optimization'
        },
        {
          name: 'Autonomous Business Agents',
          description: 'AI agents that can independently manage entire business processes',
          status: 'concept',
          impact: 'Revolutionary',
          category: 'Agent AI',
          details: 'Self-managing AI systems that handle complete business functions with minimal oversight'
        },
        {
          name: 'Neuromorphic Workflow Processing',
          description: 'Brain-inspired computing for ultra-efficient workflow execution',
          status: 'concept',
          impact: 'Revolutionary',
          category: 'Neuromorphic AI',
          details: 'Biomimetic processing that adapts and learns like human neural networks'
        }
      ]
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'live': return 'text-success bg-success/10';
      case 'beta': return 'text-warning bg-warning/10';
      case 'development': return 'text-primary bg-primary/10';
      case 'planning': return 'text-accent bg-accent/10';
      case 'research': return 'text-secondary bg-secondary/10';
      case 'concept': return 'text-text-secondary bg-muted';
      default: return 'text-text-secondary bg-muted';
    }
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'High': return 'text-success';
      case 'Medium': return 'text-warning';
      case 'Revolutionary': return 'text-error';
      default: return 'text-text-secondary';
    }
  };

  const currentData = roadmapData?.[selectedTimeframe];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Icon name="Brain" size={16} />
            <span>AI-Powered Innovation</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-6">
            AI Roadmap & Future Capabilities
          </h2>
          <p className="text-lg text-text-secondary">
            Explore our AI-driven features and get a glimpse into the future of intelligent automation. 
            See what's available now and what's coming next.
          </p>
        </div>

        {/* Timeframe Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {timeframes?.map((timeframe) => (
            <button
              key={timeframe?.id}
              onClick={() => setSelectedTimeframe(timeframe?.id)}
              className={`flex items-center space-x-3 px-6 py-3 rounded-genetic-lg font-medium transition-all duration-genetic-normal ${
                selectedTimeframe === timeframe?.id
                  ? 'bg-primary text-white shadow-organic-md'
                  : 'bg-card text-text-secondary hover:bg-muted border border-border'
              }`}
            >
              <Icon name={timeframe?.icon} size={20} />
              <span>{timeframe?.name}</span>
            </button>
          ))}
        </div>

        {/* Current Timeframe Content */}
        <div className="bg-card rounded-genetic-xl shadow-organic-lg p-8 lg:p-12">
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-text-primary mb-4">
              {currentData?.title}
            </h3>
            <p className="text-lg text-text-secondary">
              {currentData?.subtitle}
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {currentData?.features?.map((feature, index) => (
              <div 
                key={index}
                className="p-6 bg-surface rounded-genetic-lg hover:shadow-organic-md transition-all duration-genetic-normal card-organic"
              >
                {/* Feature Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-text-primary mb-2">
                      {feature?.name}
                    </h4>
                    <p className="text-text-secondary text-sm mb-3">
                      {feature?.description}
                    </p>
                  </div>
                </div>

                {/* Feature Meta */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(feature?.status)}`}>
                      {feature?.status?.charAt(0)?.toUpperCase() + feature?.status?.slice(1)}
                    </span>
                    <span className="text-xs text-text-secondary">
                      {feature?.category}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-text-secondary">Impact:</span>
                    <span className={`text-xs font-medium ${getImpactColor(feature?.impact)}`}>
                      {feature?.impact}
                    </span>
                  </div>
                </div>

                {/* Feature Details */}
                <div className="p-4 bg-background rounded-genetic-md">
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {feature?.details}
                  </p>
                </div>

                {/* Feature Actions */}
                <div className="mt-4 flex space-x-3">
                  {feature?.status === 'live' && (
                    <Button variant="default" size="sm" iconName="Play" iconPosition="left">
                      Try Now
                    </Button>
                  )}
                  {feature?.status === 'beta' && (
                    <Button variant="outline" size="sm" iconName="TestTube" iconPosition="left">
                      Join Beta
                    </Button>
                  )}
                  {(feature?.status === 'development' || feature?.status === 'planning') && (
                    <Button variant="ghost" size="sm" iconName="Bell" iconPosition="left">
                      Get Notified
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" iconName="ExternalLink">
                    Learn More
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 p-8 bg-gradient-to-r from-primary/5 to-accent/5 rounded-genetic-xl">
          <h3 className="text-2xl font-bold text-text-primary mb-4">
            Shape the Future of AI Automation
          </h3>
          <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
            Join our AI research program and get early access to cutting-edge features. 
            Your feedback helps us build the next generation of intelligent automation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="default" size="lg" iconName="Rocket" iconPosition="left" className="btn-organic">
              Join AI Research Program
            </Button>
            <Button variant="outline" size="lg" iconName="MessageSquare" iconPosition="left">
              Request Feature
            </Button>
          </div>
        </div>

        {/* Timeline Visualization */}
        <div className="mt-16">
          <h3 className="text-xl font-bold text-text-primary text-center mb-8">
            AI Development Timeline
          </h3>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-border"></div>
            <div className="space-y-8">
              {timeframes?.map((timeframe, index) => (
                <div key={timeframe?.id} className={`flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <div className="bg-card p-4 rounded-genetic-lg shadow-organic-sm">
                      <h4 className="font-semibold text-text-primary mb-1">{timeframe?.name}</h4>
                      <p className="text-sm text-text-secondary">
                        {roadmapData?.[timeframe?.id]?.features?.length} features planned
                      </p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIRoadmap;