import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Icon from '../../components/AppIcon';

const Support = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    priority: '',
    message: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const subjectOptions = [
    { value: 'technical', label: 'Technical Issue' },
    { value: 'billing', label: 'Billing Question' },
    { value: 'feature', label: 'Feature Request' },
    { value: 'integration', label: 'Integration Help' },
    { value: 'other', label: 'Other' }
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low - General question' },
    { value: 'medium', label: 'Medium - Non-urgent issue' },
    { value: 'high', label: 'High - Business impact' },
    { value: 'urgent', label: 'Urgent - Service down' }
  ];

  const supportChannels = [
    {
      title: 'Live Chat',
      description: 'Get instant help from our support team',
      icon: 'MessageCircle',
      availability: 'Available now',
      responseTime: 'Instant'
    },
    {
      title: 'Email Support',
      description: 'Send us a detailed message',
      icon: 'Mail',
      availability: '24/7',
      responseTime: '< 4 hours'
    },
    {
      title: 'Phone Support',
      description: 'Talk to our experts directly',
      icon: 'Phone',
      availability: 'Business hours',
      responseTime: 'Immediate'
    }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    // Handle form submission
    console.log('Support ticket submitted:', formData);
  };

  return (
    <>
      <Helmet>
        <title>Support - WorkflowGene Cloud | Get Help</title>
        <meta name="description" content="Get support for WorkflowGene Cloud. Contact our expert team via chat, email, or phone." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20">
            <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
              <h1 className="text-4xl lg:text-5xl font-bold text-text-primary mb-6">
                We're Here to Help
              </h1>
              <p className="text-xl text-text-secondary mb-8">
                Get expert support for all your automation needs
              </p>
            </div>
          </section>

          {/* Support Channels */}
          <section className="py-16 bg-surface">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-text-primary text-center mb-8">Choose Your Support Channel</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {supportChannels?.map((channel, index) => (
                  <div key={index} className="bg-card rounded-genetic-lg p-6 text-center shadow-organic-sm">
                    <Icon name={channel?.icon} size={32} className="text-primary mx-auto mb-4" />
                    <h3 className="font-semibold text-text-primary mb-2">{channel?.title}</h3>
                    <p className="text-text-secondary mb-4">{channel?.description}</p>
                    <div className="text-sm text-text-secondary mb-4">
                      <div>{channel?.availability}</div>
                      <div>Response: {channel?.responseTime}</div>
                    </div>
                    <Button variant="default" size="sm" fullWidth>
                      {channel?.title === 'Live Chat' ? 'Start Chat' :
                       channel?.title === 'Email Support' ? 'Send Email' : 'Call Now'}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Support Form */}
          <section className="py-16 bg-background">
            <div className="max-w-2xl mx-auto px-6 lg:px-8">
              <div className="bg-card rounded-genetic-lg p-8 shadow-organic-sm">
                <h2 className="text-2xl font-bold text-text-primary mb-6 text-center">
                  Submit a Support Ticket
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Name"
                      value={formData?.name}
                      onChange={(e) => handleInputChange('name', e?.target?.value)}
                      required
                    />
                    <Input
                      label="Email"
                      type="email"
                      value={formData?.email}
                      onChange={(e) => handleInputChange('email', e?.target?.value)}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Select
                      label="Subject"
                      options={subjectOptions}
                      value={formData?.subject}
                      onChange={(value) => handleInputChange('subject', value)}
                      required
                    />
                    <Select
                      label="Priority"
                      options={priorityOptions}
                      value={formData?.priority}
                      onChange={(value) => handleInputChange('priority', value)}
                      required
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
                      className="w-full px-3 py-2 border border-border rounded-genetic-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Describe your issue or question in detail..."
                      required
                    />
                  </div>
                  
                  <Button type="submit" variant="default" size="lg" fullWidth iconName="Send" iconPosition="right">
                    Submit Ticket
                  </Button>
                </form>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Support;