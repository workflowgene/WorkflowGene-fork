import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const TemplateLibrary = () => {
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [selectedComplexity, setSelectedComplexity] = useState('all');

  const industries = [
    { id: 'all', name: 'All Industries', icon: 'Globe' },
    { id: 'education', name: 'Education', icon: 'GraduationCap' },
    { id: 'healthcare', name: 'Healthcare', icon: 'Heart' },
    { id: 'ecommerce', name: 'E-Commerce', icon: 'ShoppingCart' },
    { id: 'finance', name: 'Finance', icon: 'DollarSign' },
    { id: 'manufacturing', name: 'Manufacturing', icon: 'Factory' }
  ];

  const complexityLevels = [
    { id: 'all', name: 'All Levels' },
    { id: 'beginner', name: 'Beginner', color: 'text-success' },
    { id: 'intermediate', name: 'Intermediate', color: 'text-warning' },
    { id: 'advanced', name: 'Advanced', color: 'text-error' }
  ];

  const templates = [
    {
      id: 'student-enrollment',
      name: 'Student Enrollment Automation',
      industry: 'education',
      complexity: 'intermediate',
      description: 'Automate student registration, document verification, and welcome communications',
      features: ['Document processing', 'Email notifications', 'Database updates'],
      downloads: 2847,
      rating: 4.8,
      estimatedTime: '2-3 hours',
      integrations: ['Google Workspace', 'Student Information System', 'Payment Gateway']
    },
    {
      id: 'patient-appointment',
      name: 'Patient Appointment Scheduling',
      industry: 'healthcare',
      complexity: 'beginner',
      description: 'Streamline appointment booking, reminders, and follow-up communications',
      features: ['Calendar integration', 'SMS reminders', 'Patient portal sync'],
      downloads: 3521,
      rating: 4.9,
      estimatedTime: '1-2 hours',
      integrations: ['EMR System', 'Twilio', 'Google Calendar']
    },
    {
      id: 'order-fulfillment',
      name: 'E-Commerce Order Fulfillment',
      industry: 'ecommerce',
      complexity: 'advanced',
      description: 'Complete order processing from payment to shipping with inventory management',
      features: ['Payment processing', 'Inventory tracking', 'Shipping automation'],
      downloads: 4156,
      rating: 4.7,
      estimatedTime: '4-6 hours',
      integrations: ['Shopify', 'Stripe', 'ShipStation', 'QuickBooks']
    },
    {
      id: 'invoice-processing',
      name: 'Automated Invoice Processing',
      industry: 'finance',
      complexity: 'intermediate',
      description: 'Extract data from invoices, validate information, and process payments',
      features: ['OCR processing', 'Data validation', 'Approval workflows'],
      downloads: 1923,
      rating: 4.6,
      estimatedTime: '3-4 hours',
      integrations: ['Xero', 'DocuSign', 'Bank APIs']
    },
    {
      id: 'quality-control',
      name: 'Manufacturing Quality Control',
      industry: 'manufacturing',
      complexity: 'advanced',
      description: 'Monitor production quality, generate reports, and trigger corrective actions',
      features: ['Sensor integration', 'Real-time monitoring', 'Alert systems'],
      downloads: 876,
      rating: 4.5,
      estimatedTime: '6-8 hours',
      integrations: ['IoT Sensors', 'ERP System', 'Slack']
    },
    {
      id: 'lead-nurturing',
      name: 'Lead Nurturing Campaign',
      industry: 'all',
      complexity: 'beginner',
      description: 'Automated email sequences based on lead behavior and engagement',
      features: ['Email automation', 'Lead scoring', 'Behavior tracking'],
      downloads: 5234,
      rating: 4.8,
      estimatedTime: '1-2 hours',
      integrations: ['Mailchimp', 'HubSpot', 'Google Analytics']
    }
  ];

  const filteredTemplates = templates?.filter(template => {
    const matchesIndustry = selectedIndustry === 'all' || template?.industry === selectedIndustry || template?.industry === 'all';
    const matchesComplexity = selectedComplexity === 'all' || template?.complexity === selectedComplexity;
    return matchesIndustry && matchesComplexity;
  });

  const getComplexityColor = (complexity) => {
    const level = complexityLevels?.find(l => l?.id === complexity);
    return level?.color || 'text-text-secondary';
  };

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-6">
            Template Library
          </h2>
          <p className="text-lg text-text-secondary">
            Jump-start your automation journey with industry-specific workflow templates. 
            Ready-to-use solutions that you can customize for your needs.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-12">
          {/* Industry Filter */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Filter by Industry</h3>
            <div className="flex flex-wrap gap-3">
              {industries?.map((industry) => (
                <button
                  key={industry?.id}
                  onClick={() => setSelectedIndustry(industry?.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-genetic-lg font-medium transition-all duration-genetic-normal ${
                    selectedIndustry === industry?.id
                      ? 'bg-primary text-white shadow-organic-md'
                      : 'bg-card text-text-secondary hover:bg-muted border border-border'
                  }`}
                >
                  <Icon name={industry?.icon} size={16} />
                  <span>{industry?.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Complexity Filter */}
          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-4">Filter by Complexity</h3>
            <div className="flex flex-wrap gap-3">
              {complexityLevels?.map((level) => (
                <button
                  key={level?.id}
                  onClick={() => setSelectedComplexity(level?.id)}
                  className={`px-4 py-2 rounded-genetic-lg font-medium transition-all duration-genetic-normal ${
                    selectedComplexity === level?.id
                      ? 'bg-primary text-white shadow-organic-md'
                      : 'bg-card text-text-secondary hover:bg-muted border border-border'
                  }`}
                >
                  {level?.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates?.map((template) => (
            <div key={template?.id} className="bg-card rounded-genetic-xl shadow-organic-md p-6 hover:shadow-organic-lg transition-all duration-genetic-normal card-organic">
              {/* Header */}
              <div className="mb-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-text-primary leading-tight">
                    {template?.name}
                  </h3>
                  <span className={`text-sm font-medium px-2 py-1 rounded-genetic-sm ${getComplexityColor(template?.complexity)} bg-current/10`}>
                    {template?.complexity}
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-text-secondary">
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={14} className="text-warning fill-current" />
                    <span>{template?.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Download" size={14} />
                    <span>{template?.downloads?.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={14} />
                    <span>{template?.estimatedTime}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-text-secondary mb-4 text-sm leading-relaxed">
                {template?.description}
              </p>

              {/* Features */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-text-primary mb-2">Key Features:</h4>
                <div className="flex flex-wrap gap-2">
                  {template?.features?.map((feature, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-genetic-sm font-medium"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Integrations */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-text-primary mb-2">Integrations:</h4>
                <div className="flex flex-wrap gap-1">
                  {template?.integrations?.map((integration, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-surface text-text-secondary text-xs rounded-genetic-sm"
                    >
                      {integration}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3">
                <Button variant="default" size="sm" className="flex-1" iconName="Download" iconPosition="left">
                  Use Template
                </Button>
                <Button variant="ghost" size="sm" iconName="Eye">
                  Preview
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredTemplates?.length === 0 && (
          <div className="text-center py-12">
            <Icon name="FileSearch" size={48} className="text-text-secondary mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-text-primary mb-2">No templates found</h3>
            <p className="text-text-secondary mb-6">
              Try adjusting your filters to find templates that match your needs.
            </p>
            <Button 
              variant="outline" 
              onClick={() => { setSelectedIndustry('all'); setSelectedComplexity('all'); }}
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center mt-16 p-8 bg-card rounded-genetic-xl shadow-organic-md">
          <h3 className="text-2xl font-bold text-text-primary mb-4">
            Can't find what you're looking for?
          </h3>
          <p className="text-text-secondary mb-6">
            Request a custom template or browse our community-contributed workflows.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="default" iconName="Plus" iconPosition="left">
              Request Custom Template
            </Button>
            <Button variant="outline" iconName="Users" iconPosition="left">
              Browse Community Templates
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TemplateLibrary;