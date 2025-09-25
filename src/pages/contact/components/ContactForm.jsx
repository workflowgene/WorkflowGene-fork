import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: '',
    industry: '',
    companySize: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const subjectOptions = [
    { value: 'sales', label: 'Sales Inquiry' },
    { value: 'support', label: 'Technical Support' },
    { value: 'partnership', label: 'Partnership Opportunity' },
    { value: 'press', label: 'Media & Press' },
    { value: 'general', label: 'General Question' },
    { value: 'demo', label: 'Request Demo' }
  ];

  const industryOptions = [
    { value: 'education', label: 'Education' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'ecommerce', label: 'E-Commerce' },
    { value: 'finance', label: 'Finance' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'technology', label: 'Technology' },
    { value: 'other', label: 'Other' }
  ];

  const companySizeOptions = [
    { value: '1-10', label: '1-10 employees' },
    { value: '11-50', label: '11-50 employees' },
    { value: '51-200', label: '51-200 employees' },
    { value: '201-500', label: '201-500 employees' },
    { value: '501-1000', label: '501-1,000 employees' },
    { value: '1000+', label: '1,000+ employees' }
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

  if (isSubmitted) {
    return (
      <section className="py-20 bg-surface">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="bg-card rounded-genetic-xl p-12 text-center shadow-organic-lg">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="CheckCircle" size={32} className="text-success" />
            </div>
            
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              Thank You for Reaching Out!
            </h2>
            
            <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
              We've received your message and our team will get back to you within 4 hours during business hours. 
              In the meantime, feel free to explore our resources or start a free trial.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon name="Clock" size={20} className="text-primary" />
                </div>
                <h3 className="font-semibold text-text-primary mb-1">Quick Response</h3>
                <p className="text-sm text-text-secondary">Within 4 hours</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon name="Users" size={20} className="text-primary" />
                </div>
                <h3 className="font-semibold text-text-primary mb-1">Expert Team</h3>
                <p className="text-sm text-text-secondary">Specialized support</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon name="Zap" size={20} className="text-primary" />
                </div>
                <h3 className="font-semibold text-text-primary mb-1">Next Steps</h3>
                <p className="text-sm text-text-secondary">Personalized follow-up</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="default"
                iconName="Play"
                iconPosition="left"
                className="btn-organic"
              >
                Start Free Trial
              </Button>
              <Button
                variant="outline"
                iconName="BookOpen"
                iconPosition="left"
              >
                Browse Resources
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Send Us a Message
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Fill out the form below and we'll get back to you as soon as possible. All fields marked with * are required.
          </p>
        </div>

        <div className="bg-card rounded-genetic-xl shadow-organic-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Email Address"
                type="email"
                value={formData?.email}
                onChange={(e) => handleInputChange('email', e?.target?.value)}
                required
              />
              
              <Input
                label="Phone Number"
                type="tel"
                value={formData?.phone}
                onChange={(e) => handleInputChange('phone', e?.target?.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Company Name"
                type="text"
                value={formData?.company}
                onChange={(e) => handleInputChange('company', e?.target?.value)}
              />
              
              <Select
                label="Subject"
                options={subjectOptions}
                value={formData?.subject}
                onChange={(value) => handleInputChange('subject', value)}
                placeholder="Select a subject"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Industry"
                options={industryOptions}
                value={formData?.industry}
                onChange={(value) => handleInputChange('industry', value)}
                placeholder="Select your industry"
              />
              
              <Select
                label="Company Size"
                options={companySizeOptions}
                value={formData?.companySize}
                onChange={(value) => handleInputChange('companySize', value)}
                placeholder="Select company size"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Message *
              </label>
              <textarea
                value={formData?.message}
                onChange={(e) => handleInputChange('message', e?.target?.value)}
                rows={6}
                className="w-full px-3 py-2 border border-border rounded-genetic-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                placeholder="Tell us about your automation needs, questions, or how we can help you..."
                required
              />
            </div>

            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="consent"
                required
                className="mt-1 h-4 w-4 text-primary focus:ring-primary border-border rounded"
              />
              <label htmlFor="consent" className="text-sm text-text-secondary">
                I agree to receive communications from WorkflowGene Cloud and understand that I can unsubscribe at any time. 
                View our <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>.
              </label>
            </div>

            <Button
              type="submit"
              variant="default"
              size="lg"
              fullWidth
              loading={isSubmitting}
              iconName="Send"
              iconPosition="right"
              className="btn-organic"
            >
              {isSubmitting ? 'Sending Message...' : 'Send Message'}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;