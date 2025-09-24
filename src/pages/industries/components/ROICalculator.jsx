import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const ROICalculator = () => {
  const [formData, setFormData] = useState({
    industry: '',
    companySize: '',
    currentProcesses: '',
    hourlyRate: '',
    hoursPerWeek: ''
  });
  
  const [results, setResults] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const industryOptions = [
    { value: 'education', label: 'Education' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'ecommerce', label: 'E-Commerce' },
    { value: 'other', label: 'Other' }
  ];

  const companySizeOptions = [
    { value: '50-100', label: '50-100 employees' },
    { value: '100-250', label: '100-250 employees' },
    { value: '250-500', label: '250-500 employees' },
    { value: '500+', label: '500+ employees' }
  ];

  const processOptions = [
    { value: '5-10', label: '5-10 processes' },
    { value: '10-25', label: '10-25 processes' },
    { value: '25-50', label: '25-50 processes' },
    { value: '50+', label: '50+ processes' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateROI = async () => {
    setIsCalculating(true);
    
    // Simulate calculation delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const hourlyRate = parseFloat(formData?.hourlyRate) || 50;
    const hoursPerWeek = parseFloat(formData?.hoursPerWeek) || 20;
    const weeksPerYear = 50;
    
    const currentCost = hourlyRate * hoursPerWeek * weeksPerYear;
    const automationSavings = currentCost * 0.75; // 75% savings
    const implementationCost = 15000; // Base implementation cost
    const annualSubscription = 12000; // Annual subscription
    
    const netSavings = automationSavings - annualSubscription;
    const roiPercentage = ((netSavings - implementationCost) / implementationCost) * 100;
    const paybackMonths = Math.ceil(implementationCost / (netSavings / 12));
    
    setResults({
      currentCost: Math.round(currentCost),
      automationSavings: Math.round(automationSavings),
      netSavings: Math.round(netSavings),
      roiPercentage: Math.round(roiPercentage),
      paybackMonths,
      threeYearSavings: Math.round(netSavings * 3)
    });
    
    setIsCalculating(false);
  };

  const resetCalculator = () => {
    setFormData({
      industry: '',
      companySize: '',
      currentProcesses: '',
      hourlyRate: '',
      hoursPerWeek: ''
    });
    setResults(null);
  };

  return (
    <section className="bg-surface py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            Calculate Your ROI
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Discover how much time and money your organization can save with WorkflowGene Cloud automation.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Calculator Form */}
            <div className="bg-card border border-border rounded-genetic-lg p-8">
              <h3 className="text-xl font-bold text-text-primary mb-6 flex items-center">
                <Icon name="Calculator" size={20} className="mr-2" />
                Your Information
              </h3>
              
              <div className="space-y-6">
                <Select
                  label="Industry"
                  placeholder="Select your industry"
                  options={industryOptions}
                  value={formData?.industry}
                  onChange={(value) => handleInputChange('industry', value)}
                  required
                />

                <Select
                  label="Company Size"
                  placeholder="Select company size"
                  options={companySizeOptions}
                  value={formData?.companySize}
                  onChange={(value) => handleInputChange('companySize', value)}
                  required
                />

                <Select
                  label="Manual Processes"
                  placeholder="Number of manual processes"
                  options={processOptions}
                  value={formData?.currentProcesses}
                  onChange={(value) => handleInputChange('currentProcesses', value)}
                  required
                />

                <Input
                  label="Average Hourly Rate"
                  type="number"
                  placeholder="50"
                  value={formData?.hourlyRate}
                  onChange={(e) => handleInputChange('hourlyRate', e?.target?.value)}
                  description="Average hourly cost of employees handling manual processes"
                  required
                />

                <Input
                  label="Hours Spent Weekly"
                  type="number"
                  placeholder="20"
                  value={formData?.hoursPerWeek}
                  onChange={(e) => handleInputChange('hoursPerWeek', e?.target?.value)}
                  description="Total hours per week spent on manual processes"
                  required
                />

                <div className="flex gap-3">
                  <Button
                    variant="default"
                    fullWidth
                    loading={isCalculating}
                    onClick={calculateROI}
                    disabled={!formData?.industry || !formData?.companySize || !formData?.hourlyRate}
                    iconName="Calculator"
                    iconPosition="left"
                  >
                    {isCalculating ? 'Calculating...' : 'Calculate ROI'}
                  </Button>
                  
                  {results && (
                    <Button
                      variant="outline"
                      onClick={resetCalculator}
                      iconName="RotateCcw"
                      iconPosition="left"
                    >
                      Reset
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="bg-card border border-border rounded-genetic-lg p-8">
              <h3 className="text-xl font-bold text-text-primary mb-6 flex items-center">
                <Icon name="TrendingUp" size={20} className="mr-2" />
                Your ROI Projection
              </h3>

              {!results ? (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                    <Icon name="BarChart3" size={24} className="text-text-secondary" />
                  </div>
                  <p className="text-text-secondary">
                    Fill out the form to see your personalized ROI calculation
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-primary/10 rounded-genetic-md p-4 text-center">
                      <div className="text-2xl font-bold text-primary">
                        ${results?.netSavings?.toLocaleString()}
                      </div>
                      <div className="text-sm text-text-secondary">Annual Savings</div>
                    </div>
                    
                    <div className="bg-success/10 rounded-genetic-md p-4 text-center">
                      <div className="text-2xl font-bold text-success">
                        {results?.roiPercentage}%
                      </div>
                      <div className="text-sm text-text-secondary">ROI</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-text-secondary">Current Annual Cost</span>
                      <span className="font-semibold">${results?.currentCost?.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-text-secondary">Automation Savings</span>
                      <span className="font-semibold text-success">
                        ${results?.automationSavings?.toLocaleString()}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-text-secondary">Payback Period</span>
                      <span className="font-semibold">{results?.paybackMonths} months</span>
                    </div>
                    
                    <div className="flex justify-between items-center py-2">
                      <span className="text-text-secondary">3-Year Savings</span>
                      <span className="font-bold text-primary text-lg">
                        ${results?.threeYearSavings?.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="bg-accent/10 rounded-genetic-md p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="Lightbulb" size={16} className="text-accent" />
                      <span className="font-semibold text-accent">Recommendation</span>
                    </div>
                    <p className="text-sm text-text-secondary">
                      Based on your inputs, WorkflowGene Cloud can deliver significant ROI. 
                      Schedule a demo to see how we can customize automation for your specific needs.
                    </p>
                  </div>

                  <Button
                    variant="default"
                    fullWidth
                    iconName="Calendar"
                    iconPosition="left"
                  >
                    Schedule Demo
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ROICalculator;