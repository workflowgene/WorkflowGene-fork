import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const InteractiveTools = () => {
  const [activeCalculator, setActiveCalculator] = useState('roi');
  const [roiInputs, setRoiInputs] = useState({
    currentCosts: '',
    timeSpent: '',
    hourlyRate: '',
    efficiency: '70'
  });
  const [assessmentAnswers, setAssessmentAnswers] = useState({});

  const tools = [
    {
      id: 'roi',
      name: 'ROI Calculator',
      description: 'Calculate potential savings from automation',
      icon: 'Calculator',
      color: 'bg-green-500'
    },
    {
      id: 'assessment',
      name: 'Automation Readiness',
      description: 'Assess your organization\'s automation maturity',
      icon: 'CheckSquare',
      color: 'bg-blue-500'
    },
    {
      id: 'workflow',
      name: 'Workflow Builder',
      description: 'Design and visualize your automation workflows',
      icon: 'GitBranch',
      color: 'bg-purple-500'
    },
    {
      id: 'complexity',
      name: 'Complexity Analyzer',
      description: 'Analyze process complexity and automation potential',
      icon: 'BarChart3',
      color: 'bg-orange-500'
    }
  ];

  const assessmentQuestions = [
    {
      id: 1,
      question: 'How many repetitive manual processes does your organization currently have?',
      options: ['1-5', '6-15', '16-30', '30+']
    },
    {
      id: 2,
      question: 'What percentage of your team\'s time is spent on manual, repetitive tasks?',
      options: ['Less than 20%', '20-40%', '40-60%', 'More than 60%']
    },
    {
      id: 3,
      question: 'How would you rate your current technology infrastructure?',
      options: ['Outdated', 'Basic', 'Modern', 'Cutting-edge']
    },
    {
      id: 4,
      question: 'What is your organization\'s experience with automation tools?',
      options: ['No experience', 'Limited experience', 'Some experience', 'Extensive experience']
    }
  ];

  const calculateROI = () => {
    const currentCosts = parseFloat(roiInputs?.currentCosts) || 0;
    const timeSpent = parseFloat(roiInputs?.timeSpent) || 0;
    const hourlyRate = parseFloat(roiInputs?.hourlyRate) || 0;
    const efficiency = parseFloat(roiInputs?.efficiency) || 70;

    const monthlyCost = timeSpent * hourlyRate * 4.33; // 4.33 weeks per month
    const annualCost = monthlyCost * 12;
    const potentialSavings = (annualCost * efficiency) / 100;
    const automationCost = 5000; // Estimated automation implementation cost
    const netSavings = potentialSavings - automationCost;
    const paybackPeriod = automationCost / (potentialSavings / 12);

    return {
      annualCost,
      potentialSavings,
      netSavings,
      paybackPeriod: Math.max(paybackPeriod, 0)
    };
  };

  const roiResults = calculateROI();

  const handleAssessmentAnswer = (questionId, answer) => {
    setAssessmentAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const getAssessmentScore = () => {
    const answers = Object.values(assessmentAnswers);
    if (answers?.length < assessmentQuestions?.length) return null;
    
    let score = 0;
    answers?.forEach(answer => {
      if (answer === '30+' || answer === 'More than 60%' || answer === 'Cutting-edge' || answer === 'Extensive experience') {
        score += 4;
      } else if (answer === '16-30' || answer === '40-60%' || answer === 'Modern' || answer === 'Some experience') {
        score += 3;
      } else if (answer === '6-15' || answer === '20-40%' || answer === 'Basic' || answer === 'Limited experience') {
        score += 2;
      } else {
        score += 1;
      }
    });
    
    return score;
  };

  const getReadinessLevel = (score) => {
    if (score >= 14) return { level: 'High', color: 'text-green-600', description: 'Your organization is ready for advanced automation' };
    if (score >= 10) return { level: 'Medium', color: 'text-yellow-600', description: 'Good foundation, some preparation needed' };
    if (score >= 6) return { level: 'Low', color: 'text-orange-600', description: 'Basic readiness, significant preparation required' };
    return { level: 'Very Low', color: 'text-red-600', description: 'Extensive preparation needed before automation' };
  };

  const assessmentScore = getAssessmentScore();
  const readinessLevel = assessmentScore ? getReadinessLevel(assessmentScore) : null;

  return (
    <section className="py-16 bg-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Icon name="Calculator" size={16} />
            <span>Interactive Tools</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            Assess Your Automation Potential
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Use our interactive tools to evaluate ROI, assess readiness, and plan your automation journey
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Tool Selection */}
          <div className="space-y-4">
            {tools?.map((tool) => (
              <button
                key={tool?.id}
                onClick={() => setActiveCalculator(tool?.id)}
                className={`w-full text-left p-4 rounded-genetic-lg transition-all duration-300 ${
                  activeCalculator === tool?.id
                    ? 'bg-primary text-white shadow-organic-md'
                    : 'bg-card hover:shadow-organic-sm'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-genetic-md ${
                    activeCalculator === tool?.id ? 'bg-white/20' : tool?.color
                  }`}>
                    <Icon 
                      name={tool?.icon} 
                      size={20} 
                      color={activeCalculator === tool?.id ? 'white' : 'white'} 
                    />
                  </div>
                  <div>
                    <h3 className={`font-semibold ${
                      activeCalculator === tool?.id ? 'text-white' : 'text-text-primary'
                    }`}>
                      {tool?.name}
                    </h3>
                    <p className={`text-sm ${
                      activeCalculator === tool?.id ? 'text-white/80' : 'text-text-secondary'
                    }`}>
                      {tool?.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Tool Content */}
          <div className="lg:col-span-3">
            <div className="bg-card rounded-genetic-lg p-8">
              {activeCalculator === 'roi' && (
                <div>
                  <h3 className="text-2xl font-semibold text-text-primary mb-6">
                    ROI Calculator
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <Input
                        label="Current Monthly Process Costs ($)"
                        type="number"
                        placeholder="5000"
                        value={roiInputs?.currentCosts}
                        onChange={(e) => setRoiInputs(prev => ({ ...prev, currentCosts: e?.target?.value }))}
                      />
                      
                      <Input
                        label="Hours Spent Weekly on Manual Tasks"
                        type="number"
                        placeholder="40"
                        value={roiInputs?.timeSpent}
                        onChange={(e) => setRoiInputs(prev => ({ ...prev, timeSpent: e?.target?.value }))}
                      />
                      
                      <Input
                        label="Average Hourly Rate ($)"
                        type="number"
                        placeholder="50"
                        value={roiInputs?.hourlyRate}
                        onChange={(e) => setRoiInputs(prev => ({ ...prev, hourlyRate: e?.target?.value }))}
                      />
                      
                      <Input
                        label="Expected Efficiency Improvement (%)"
                        type="number"
                        placeholder="70"
                        value={roiInputs?.efficiency}
                        onChange={(e) => setRoiInputs(prev => ({ ...prev, efficiency: e?.target?.value }))}
                      />
                    </div>
                    
                    <div className="bg-surface rounded-genetic-lg p-6">
                      <h4 className="text-lg font-semibold text-text-primary mb-4">
                        Projected Results
                      </h4>
                      
                      <div className="space-y-4">
                        <div className="flex justify-between items-center py-2 border-b border-border">
                          <span className="text-text-secondary">Annual Labor Cost:</span>
                          <span className="font-semibold text-text-primary">
                            ${roiResults?.annualCost?.toLocaleString()}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center py-2 border-b border-border">
                          <span className="text-text-secondary">Potential Annual Savings:</span>
                          <span className="font-semibold text-success">
                            ${roiResults?.potentialSavings?.toLocaleString()}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center py-2 border-b border-border">
                          <span className="text-text-secondary">Net Annual Savings:</span>
                          <span className={`font-semibold ${roiResults?.netSavings > 0 ? 'text-success' : 'text-error'}`}>
                            ${roiResults?.netSavings?.toLocaleString()}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center py-2">
                          <span className="text-text-secondary">Payback Period:</span>
                          <span className="font-semibold text-text-primary">
                            {roiResults?.paybackPeriod?.toFixed(1)} months
                          </span>
                        </div>
                      </div>
                      
                      <Button variant="default" className="w-full mt-6">
                        Get Detailed Report
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {activeCalculator === 'assessment' && (
                <div>
                  <h3 className="text-2xl font-semibold text-text-primary mb-6">
                    Automation Readiness Assessment
                  </h3>
                  
                  <div className="space-y-8">
                    {assessmentQuestions?.map((q) => (
                      <div key={q?.id} className="space-y-4">
                        <h4 className="text-lg font-medium text-text-primary">
                          {q?.id}. {q?.question}
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {q?.options?.map((option) => (
                            <button
                              key={option}
                              onClick={() => handleAssessmentAnswer(q?.id, option)}
                              className={`p-3 text-left rounded-genetic-md border transition-all duration-200 ${
                                assessmentAnswers?.[q?.id] === option
                                  ? 'border-primary bg-primary/10 text-primary' :'border-border hover:border-primary/50 hover:bg-surface'
                              }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                    
                    {readinessLevel && (
                      <div className="bg-surface rounded-genetic-lg p-6 mt-8">
                        <h4 className="text-lg font-semibold text-text-primary mb-4">
                          Your Automation Readiness Score
                        </h4>
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="text-3xl font-bold text-primary">
                            {assessmentScore}/16
                          </div>
                          <div>
                            <div className={`text-lg font-semibold ${readinessLevel?.color}`}>
                              {readinessLevel?.level} Readiness
                            </div>
                            <div className="text-text-secondary">
                              {readinessLevel?.description}
                            </div>
                          </div>
                        </div>
                        <Button variant="default">
                          Get Personalized Recommendations
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeCalculator === 'workflow' && (
                <div className="text-center py-12">
                  <Icon name="GitBranch" size={64} className="text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold text-text-primary mb-4">
                    Workflow Builder
                  </h3>
                  <p className="text-text-secondary mb-6">
                    Interactive workflow designer coming soon. Design and visualize your automation workflows with our drag-and-drop interface.
                  </p>
                  <Button variant="outline">
                    Join Beta Waitlist
                  </Button>
                </div>
              )}

              {activeCalculator === 'complexity' && (
                <div className="text-center py-12">
                  <Icon name="BarChart3" size={64} className="text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold text-text-primary mb-4">
                    Complexity Analyzer
                  </h3>
                  <p className="text-text-secondary mb-6">
                    Advanced process complexity analysis tool. Upload your process documentation and get AI-powered automation recommendations.
                  </p>
                  <Button variant="outline">
                    Request Early Access
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

export default InteractiveTools;