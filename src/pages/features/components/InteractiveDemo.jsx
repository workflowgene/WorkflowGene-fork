import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const InteractiveDemo = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const demoSteps = [
    {
      title: 'Create Workflow',
      description: 'Start by selecting a trigger event that will initiate your automation workflow',
      visual: 'plus-circle',
      code: `trigger: {
  type: "webhook",
  endpoint: "/api/new-order",
  method: "POST"
}`
    },
    {
      title: 'Add Conditions',
      description: 'Define conditional logic to route your workflow based on specific criteria',
      visual: 'git-branch',
      code: `if (order.amount > 1000) {
  route: "high-value-process"
} else {
  route: "standard-process"
}`
    },
    {
      title: 'Connect Integrations',
      description: 'Link your workflow to external services and applications seamlessly',
      visual: 'link',
      code: `integrations: [
  { service: "Salesforce", action: "create_lead" },
  { service: "Slack", action: "send_notification" }
]`
    },
    {
      title: 'Deploy & Monitor',
      description: 'Launch your workflow and monitor its performance with real-time analytics',
      visual: 'activity',
      code: `status: "active",
executions: 1247,
success_rate: 99.8%,
avg_runtime: "2.3s"`
    }
  ];

  const handlePlayDemo = () => {
    setIsPlaying(true);
    setCurrentStep(0);
    
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= demoSteps?.length - 1) {
          clearInterval(interval);
          setIsPlaying(false);
          return 0;
        }
        return prev + 1;
      });
    }, 3000);
  };

  const handleStepClick = (index) => {
    if (!isPlaying) {
      setCurrentStep(index);
    }
  };

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-6">
            Interactive Workflow Demo
          </h2>
          <p className="text-lg text-text-secondary mb-8">
            Experience how easy it is to build powerful automation workflows with our visual builder.
          </p>
          <Button 
            variant="default" 
            size="lg" 
            className="btn-organic"
            iconName={isPlaying ? "Pause" : "Play"}
            iconPosition="left"
            onClick={handlePlayDemo}
            disabled={isPlaying}
          >
            {isPlaying ? 'Demo Running...' : 'Start Interactive Demo'}
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Demo Steps */}
          <div className="space-y-6">
            {demoSteps?.map((step, index) => (
              <div
                key={index}
                onClick={() => handleStepClick(index)}
                className={`p-6 rounded-genetic-lg border-2 transition-all duration-genetic-normal cursor-pointer ${
                  currentStep === index
                    ? 'border-primary bg-primary/5 shadow-organic-md'
                    : 'border-border bg-card hover:border-primary/30'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                    currentStep === index
                      ? 'bg-primary text-white' :'bg-muted text-text-secondary'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-lg font-semibold mb-2 ${
                      currentStep === index ? 'text-primary' : 'text-text-primary'
                    }`}>
                      {step?.title}
                    </h3>
                    <p className="text-text-secondary">{step?.description}</p>
                  </div>
                  {currentStep === index && (
                    <div className="flex-shrink-0">
                      <Icon name="CheckCircle" size={24} className="text-success" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Visual Demo Area */}
          <div className="bg-card rounded-genetic-xl shadow-organic-lg p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-genetic-lg mb-4">
                <Icon name={demoSteps?.[currentStep]?.visual} size={40} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2">
                {demoSteps?.[currentStep]?.title}
              </h3>
            </div>

            {/* Code Preview */}
            <div className="bg-secondary rounded-genetic-md p-4 mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-white">workflow.json</span>
                <Button variant="ghost" size="xs" iconName="Copy">
                  Copy
                </Button>
              </div>
              <pre className="text-sm text-gray-300 overflow-x-auto">
                <code>{demoSteps?.[currentStep]?.code}</code>
              </pre>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-muted rounded-full h-2 mb-4">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-1000"
                style={{ width: `${((currentStep + 1) / demoSteps?.length) * 100}%` }}
              ></div>
            </div>

            <div className="text-center">
              <span className="text-sm text-text-secondary">
                Step {currentStep + 1} of {demoSteps?.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveDemo;