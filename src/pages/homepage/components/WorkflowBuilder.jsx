import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const WorkflowBuilder = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [completedSteps, setCompletedSteps] = useState([]);

  const workflowSteps = [
    {
      id: 1,
      title: 'Trigger Event',
      description: 'Define what starts your workflow',
      icon: 'Zap',
      type: 'trigger',
      examples: ['New email received', 'Form submission', 'Schedule timer', 'File upload'],
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 2,
      title: 'Process Data',
      description: 'Transform and analyze information',
      icon: 'Settings',
      type: 'action',
      examples: ['Extract data', 'Validate information', 'Apply business rules', 'Format output'],
      color: 'from-purple-500 to-pink-600'
    },
    {
      id: 3,
      title: 'Make Decisions',
      description: 'Add conditional logic and routing',
      icon: 'GitBranch',
      type: 'condition',
      examples: ['If/then conditions', 'Approval workflows', 'Priority routing', 'Error handling'],
      color: 'from-amber-500 to-orange-600'
    },
    {
      id: 4,
      title: 'Take Action',
      description: 'Execute automated tasks',
      icon: 'Play',
      type: 'action',
      examples: ['Send notifications', 'Update databases', 'Generate reports', 'Create tasks'],
      color: 'from-emerald-500 to-teal-600'
    },
    {
      id: 5,
      title: 'Monitor & Optimize',
      description: 'Track performance and improve',
      icon: 'BarChart3',
      type: 'monitor',
      examples: ['Performance metrics', 'Error tracking', 'Success rates', 'Optimization suggestions'],
      color: 'from-rose-500 to-red-600'
    }
  ];

  const integrations = [
    { name: 'Slack', icon: 'MessageSquare', connected: true },
    { name: 'Gmail', icon: 'Mail', connected: true },
    { name: 'Salesforce', icon: 'Users', connected: false },
    { name: 'Dropbox', icon: 'Cloud', connected: true },
    { name: 'Zapier', icon: 'Zap', connected: false },
    { name: 'Microsoft', icon: 'Monitor', connected: true }
  ];

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setActiveStep((prev) => {
          const next = (prev + 1) % workflowSteps?.length;
          if (next === 0) {
            setCompletedSteps([]);
          } else {
            setCompletedSteps((completed) => [...completed, prev]);
          }
          return next;
        });
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, workflowSteps?.length]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      setCompletedSteps([]);
      setActiveStep(0);
    }
  };

  const handleStepClick = (index) => {
    if (!isPlaying) {
      setActiveStep(index);
      setCompletedSteps(Array.from({ length: index }, (_, i) => i));
    }
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 scroll-reveal">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Icon name="Workflow" size={16} />
            <span>Interactive Demo</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-text-primary mb-6">
            Build Workflows Visually
          </h2>
          
          <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-8">
            Experience our intuitive drag-and-drop workflow builder. Create powerful automation without writing a single line of code.
          </p>

          <div className="flex justify-center">
            <Button
              variant={isPlaying ? "outline" : "default"}
              size="lg"
              onClick={handlePlayPause}
              iconName={isPlaying ? "Pause" : "Play"}
              iconPosition="left"
              className="btn-organic"
            >
              {isPlaying ? 'Pause Demo' : 'Play Demo'}
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Workflow Steps */}
          <div className="lg:col-span-2 space-y-6 scroll-reveal stagger-1">
            <div className="bg-white rounded-genetic-xl shadow-organic-lg p-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-text-primary">Workflow Builder</h3>
                <div className="flex items-center space-x-2 text-sm text-text-secondary">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span>Live Preview</span>
                </div>
              </div>

              {/* Workflow Visualization */}
              <div className="space-y-6">
                {workflowSteps?.map((step, index) => (
                  <div key={step?.id} className="relative">
                    {/* Connection Line */}
                    {index < workflowSteps?.length - 1 && (
                      <div className="absolute left-6 top-16 w-0.5 h-12 bg-border z-0"></div>
                    )}
                    
                    {/* Step Card */}
                    <div
                      onClick={() => handleStepClick(index)}
                      className={`relative z-10 flex items-start space-x-4 p-6 rounded-genetic-lg border-2 transition-all duration-genetic-normal cursor-pointer ${
                        activeStep === index
                          ? 'border-primary bg-primary/5 shadow-organic-md scale-105'
                          : completedSteps?.includes(index)
                          ? 'border-success bg-success/5' :'border-border bg-surface hover:border-primary/50 hover:bg-primary/2'
                      }`}
                    >
                      {/* Step Icon */}
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                        activeStep === index
                          ? `bg-gradient-to-br ${step?.color} text-white`
                          : completedSteps?.includes(index)
                          ? 'bg-success text-white' :'bg-muted text-text-secondary'
                      }`}>
                        {completedSteps?.includes(index) ? (
                          <Icon name="Check" size={20} />
                        ) : (
                          <Icon name={step?.icon} size={20} />
                        )}
                      </div>

                      {/* Step Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-lg font-semibold text-text-primary">
                            {step?.title}
                          </h4>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            step?.type === 'trigger' ? 'bg-blue-100 text-blue-700' :
                            step?.type === 'action' ? 'bg-purple-100 text-purple-700' :
                            step?.type === 'condition' ? 'bg-amber-100 text-amber-700' :
                            step?.type === 'monitor'? 'bg-rose-100 text-rose-700' : 'bg-gray-100 text-gray-700'
                          }`}>
                            {step?.type}
                          </span>
                        </div>
                        
                        <p className="text-text-secondary mb-3">
                          {step?.description}
                        </p>

                        {/* Examples */}
                        {activeStep === index && (
                          <div className="space-y-2 animate-fadeIn">
                            <div className="text-sm font-medium text-text-primary">Examples:</div>
                            <div className="flex flex-wrap gap-2">
                              {step?.examples?.map((example, idx) => (
                                <span
                                  key={idx}
                                  className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                                >
                                  {example}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Active Indicator */}
                      {activeStep === index && (
                        <div className="absolute -right-2 top-1/2 -translate-y-1/2">
                          <div className="w-4 h-4 bg-primary rounded-full animate-pulse"></div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Integrations Panel */}
          <div className="space-y-6 scroll-reveal stagger-2">
            {/* Integrations */}
            <div className="bg-white rounded-genetic-xl shadow-organic-lg p-6">
              <h4 className="text-xl font-bold text-text-primary mb-6">
                Popular Integrations
              </h4>
              
              <div className="space-y-3">
                {integrations?.map((integration, index) => (
                  <div
                    key={integration?.name}
                    className="flex items-center justify-between p-3 rounded-genetic-md border border-border hover:border-primary/50 transition-colors duration-genetic-normal"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-muted rounded-genetic-sm flex items-center justify-center">
                        <Icon name={integration?.icon} size={16} />
                      </div>
                      <span className="font-medium text-text-primary">
                        {integration?.name}
                      </span>
                    </div>
                    
                    <div className={`w-2 h-2 rounded-full ${
                      integration?.connected ? 'bg-success' : 'bg-border'
                    }`}></div>
                  </div>
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                fullWidth
                className="mt-4"
                iconName="Plus"
                iconPosition="left"
              >
                View All 500+ Integrations
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-genetic-xl shadow-organic-lg p-6">
              <h4 className="text-xl font-bold text-text-primary mb-6">
                Builder Stats
              </h4>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">Templates Available</span>
                  <span className="font-bold text-text-primary">2,500+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">Avg. Build Time</span>
                  <span className="font-bold text-text-primary">15 min</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">Success Rate</span>
                  <span className="font-bold text-text-primary">99.9%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">User Rating</span>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5]?.map((star) => (
                      <Icon key={star} name="Star" size={14} className="text-amber-400 fill-current" />
                    ))}
                    <span className="font-bold text-text-primary ml-1">4.9</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-br from-primary to-accent rounded-genetic-xl p-6 text-white">
              <h4 className="text-xl font-bold mb-3">
                Ready to Build?
              </h4>
              <p className="text-white/90 mb-4">
                Start creating your first workflow in minutes with our intuitive builder.
              </p>
              <Button
                variant="secondary"
                size="sm"
                fullWidth
                iconName="ArrowRight"
                iconPosition="right"
              >
                Try Builder Free
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkflowBuilder;