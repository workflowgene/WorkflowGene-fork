import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const EnterpriseContact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    employees: '',
    industry: '',
    phone: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const employeeOptions = [
    { value: '1-10', label: '1-10 employees' },
    { value: '11-50', label: '11-50 employees' },
    { value: '51-200', label: '51-200 employees' },
    { value: '201-500', label: '201-500 employees' },
    { value: '501-1000', label: '501-1,000 employees' },
    { value: '1000+', label: '1,000+ employees' }
  ];

  const industryOptions = [
    { value: 'technology', label: 'Technology' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'education', label: 'Education' },
    { value: 'finance', label: 'Financial Services' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'retail', label: 'Retail & E-commerce' },
    { value: 'government', label: 'Government' },
    { value: 'nonprofit', label: 'Non-profit' },
    { value: 'other', label: 'Other' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
  };

  const enterpriseFeatures = [
    {
      title: 'Custom Implementation',
      description: 'Dedicated implementation team and custom onboarding',
      icon: 'Settings'
    },
    {
      title: 'Volume Discounts',
      description: 'Significant savings for large organizations',
      icon: 'DollarSign'
    },
    {
      title: 'Priority Support',
      description: '4-hour response time with dedicated account manager',
      icon: 'Headphones'
    },
    {
      title: 'Advanced Security',
      description: 'SSO, advanced permissions, and audit logs',
      icon: 'Shield'
    },
    {
      title: 'Custom Integrations',
      description: 'Build connections to your unique systems',
      icon: 'Link'
    },
    {
      title: 'Training & Certification',
      description: 'Comprehensive team training and certification programs',
      icon: 'GraduationCap'
    }
  ];

  if (isSubmitted) {
    return (
      <section className="py-16 bg-gradient-to-br from-success/5 to-primary/5">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="bg-card border border-border rounded-xl p-12">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="CheckCircle" size={32} className="text-success" />
            </div>
            
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              Thank you for your interest!
            </h2>
            
            <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
              Our enterprise team will review your requirements and contact you within 24 hours to schedule a personalized demo and discuss custom pricing.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon name="Calendar" size={20} className="text-primary" />
                </div>
                <h3 className="font-semibold text-text-primary mb-1">Next Steps</h3>
                <p className="text-sm text-text-secondary">Demo scheduling within 24 hours</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon name="Users" size={20} className="text-primary" />
                </div>
                <h3 className="font-semibold text-text-primary mb-1">Dedicated Team</h3>
                <p className="text-sm text-text-secondary">Enterprise specialists assigned</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon name="FileText" size={20} className="text-primary" />
                </div>
                <h3 className="font-semibold text-text-primary mb-1">Custom Proposal</h3>
                <p className="text-sm text-text-secondary">Tailored pricing and features</p>
              </div>
            </div>
            
            <Button
              variant="outline"
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  firstName: '',
                  lastName: '',
                  email: '',
                  company: '',
                  employees: '',
                  industry: '',
                  phone: '',
                  message: ''
                });
              }}
            >
              Submit Another Request
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            Enterprise Solutions
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Get custom pricing, dedicated support, and enterprise-grade features tailored to your organization's needs.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Enterprise Features */}
          <div>
            <h3 className="text-2xl font-bold text-text-primary mb-8">
              What's Included in Enterprise
            </h3>
            
            <div className="space-y-6">
              {enterpriseFeatures?.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name={feature?.icon} size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary mb-2">{feature?.title}</h4>
                    <p className="text-text-secondary">{feature?.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 bg-card border border-border rounded-lg p-6">
              <h4 className="font-semibold text-text-primary mb-4">Why Choose Enterprise?</h4>
              <ul className="space-y-2 text-text-secondary">
                <li className="flex items-center space-x-2">
                  <Icon name="Check" size={16} className="text-success" />
                  <span>Unlimited workflows and executions</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Icon name="Check" size={16} className="text-success" />
                  <span>White-label options available</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Icon name="Check" size={16} className="text-success" />
                  <span>On-premise deployment options</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Icon name="Check" size={16} className="text-success" />
                  <span>Custom SLA agreements</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="bg-card border border-border rounded-xl p-8">
            <h3 className="text-xl font-semibold text-text-primary mb-6">
              Get Custom Enterprise Pricing
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  type="text"
                  value={formData?.firstName}
                  onChange={(e) => handleInputChange('firstName', e?.target?.value)}
                  required
                />
                
                <Input
                  label="Last Name"
                  type="text"
                  value={formData?.lastName}
                  onChange={(e) => handleInputChange('lastName', e?.target?.value)}
                  required
                />
              </div>
              
              <Input
                label="Work Email"
                type="email"
                value={formData?.email}
                onChange={(e) => handleInputChange('email', e?.target?.value)}
                required
              />
              
              <Input
                label="Company Name"
                type="text"
                value={formData?.company}
                onChange={(e) => handleInputChange('company', e?.target?.value)}
                required
              />
              
              <div className="grid grid-cols-2 gap-4">
                <Select
                  label="Company Size"
                  options={employeeOptions}
                  value={formData?.employees}
                  onChange={(value) => handleInputChange('employees', value)}
                  required
                />
                
                <Select
                  label="Industry"
                  options={industryOptions}
                  value={formData?.industry}
                  onChange={(value) => handleInputChange('industry', value)}
                  required
                />
              </div>
              
              <Input
                label="Phone Number"
                type="tel"
                value={formData?.phone}
                onChange={(e) => handleInputChange('phone', e?.target?.value)}
              />
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Tell us about your automation needs
                </label>
                <textarea
                  value={formData?.message}
                  onChange={(e) => handleInputChange('message', e?.target?.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Describe your current processes, team size, and automation goals..."
                />
              </div>
              
              <Button
                type="submit"
                variant="default"
                fullWidth
                loading={isSubmitting}
                iconName="Send"
                iconPosition="right"
              >
                Request Enterprise Demo
              </Button>
              
              <p className="text-xs text-text-secondary text-center">
                By submitting this form, you agree to our privacy policy and terms of service.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnterpriseContact;