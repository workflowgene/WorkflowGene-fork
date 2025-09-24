import React, { useState, useEffect } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ROICalculator = () => {
  const [formData, setFormData] = useState({
    employees: 50,
    hourlyRate: 25,
    hoursPerWeek: 10,
    industry: 'technology',
    currentTools: 3
  });
  
  const [results, setResults] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const industryOptions = [
    { value: 'technology', label: 'Technology' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'education', label: 'Education' },
    { value: 'ecommerce', label: 'E-Commerce' },
    { value: 'finance', label: 'Finance' },
    { value: 'manufacturing', label: 'Manufacturing' }
  ];

  const calculateROI = () => {
    setIsCalculating(true);
    
    // Simulate calculation delay
    setTimeout(() => {
      const weeklyManualHours = formData?.hoursPerWeek * formData?.employees;
      const weeklyCost = weeklyManualHours * formData?.hourlyRate;
      const annualCost = weeklyCost * 52;
      
      // Automation savings (assuming 70% reduction in manual work)
      const automationSavings = annualCost * 0.7;
      const workflowGeneCost = 2400; // Annual cost for Professional plan
      const netSavings = automationSavings - workflowGeneCost;
      const roi = ((netSavings / workflowGeneCost) * 100)?.toFixed(0);
      const paybackMonths = Math.ceil(workflowGeneCost / (automationSavings / 12));
      
      setResults({
        currentAnnualCost: annualCost,
        automationSavings,
        netSavings,
        roi,
        paybackMonths,
        timeRecovered: weeklyManualHours * 0.7
      });
      
      setIsCalculating(false);
    }, 1500);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setResults(null); // Reset results when inputs change
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            Calculate Your ROI
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            See how much time and money WorkflowGene can save your business with our interactive ROI calculator.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Calculator Form */}
          <div className="bg-card border border-border rounded-xl p-8">
            <h3 className="text-xl font-semibold text-text-primary mb-6">
              Tell us about your business
            </h3>
            
            <div className="space-y-6">
              <Input
                label="Number of employees"
                type="number"
                value={formData?.employees}
                onChange={(e) => handleInputChange('employees', parseInt(e?.target?.value) || 0)}
                placeholder="50"
                description="How many people work at your company?"
              />
              
              <Input
                label="Average hourly rate ($)"
                type="number"
                value={formData?.hourlyRate}
                onChange={(e) => handleInputChange('hourlyRate', parseFloat(e?.target?.value) || 0)}
                placeholder="25"
                description="Average hourly cost per employee"
              />
              
              <Input
                label="Manual work hours per week"
                type="number"
                value={formData?.hoursPerWeek}
                onChange={(e) => handleInputChange('hoursPerWeek', parseInt(e?.target?.value) || 0)}
                placeholder="10"
                description="Hours spent on repetitive tasks per employee"
              />
              
              <Select
                label="Industry"
                options={industryOptions}
                value={formData?.industry}
                onChange={(value) => handleInputChange('industry', value)}
                description="Your primary business sector"
              />
              
              <Input
                label="Current automation tools"
                type="number"
                value={formData?.currentTools}
                onChange={(e) => handleInputChange('currentTools', parseInt(e?.target?.value) || 0)}
                placeholder="3"
                description="Number of tools you currently use"
              />
              
              <Button
                variant="default"
                fullWidth
                onClick={calculateROI}
                loading={isCalculating}
                iconName="Calculator"
                iconPosition="left"
                className="mt-8"
              >
                Calculate ROI
              </Button>
            </div>
          </div>
          
          {/* Results */}
          <div className="bg-card border border-border rounded-xl p-8">
            {!results && !isCalculating && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Calculator" size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-2">
                  Ready to calculate?
                </h3>
                <p className="text-text-secondary">
                  Fill out the form and click "Calculate ROI" to see your potential savings.
                </p>
              </div>
            )}
            
            {isCalculating && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <Icon name="Loader2" size={32} className="text-primary animate-spin" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-2">
                  Calculating your ROI...
                </h3>
                <p className="text-text-secondary">
                  Analyzing your business data and automation potential.
                </p>
              </div>
            )}
            
            {results && (
              <div>
                <h3 className="text-xl font-semibold text-text-primary mb-6">
                  Your ROI Analysis
                </h3>
                
                <div className="space-y-6">
                  <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <Icon name="TrendingUp" size={20} className="text-success" />
                      <span className="font-semibold text-success">ROI</span>
                    </div>
                    <div className="text-3xl font-bold text-success">
                      {results?.roi}%
                    </div>
                    <p className="text-sm text-success/80 mt-1">
                      Return on investment in first year
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted/50 rounded-lg p-4">
                      <div className="text-2xl font-bold text-text-primary">
                        ${results?.netSavings?.toLocaleString()}
                      </div>
                      <p className="text-sm text-text-secondary">Net annual savings</p>
                    </div>
                    
                    <div className="bg-muted/50 rounded-lg p-4">
                      <div className="text-2xl font-bold text-text-primary">
                        {results?.paybackMonths} months
                      </div>
                      <p className="text-sm text-text-secondary">Payback period</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-text-secondary">Current annual cost</span>
                      <span className="font-semibold text-text-primary">
                        ${results?.currentAnnualCost?.toLocaleString()}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-text-secondary">Automation savings</span>
                      <span className="font-semibold text-success">
                        ${results?.automationSavings?.toLocaleString()}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center py-2">
                      <span className="text-text-secondary">Time recovered per week</span>
                      <span className="font-semibold text-text-primary">
                        {results?.timeRecovered?.toFixed(0)} hours
                      </span>
                    </div>
                  </div>
                  
                  <Button
                    variant="default"
                    fullWidth
                    iconName="ArrowRight"
                    iconPosition="right"
                    className="mt-6"
                  >
                    Start Free Trial
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ROICalculator;