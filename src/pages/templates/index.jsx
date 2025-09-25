import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Icon from '../../components/AppIcon';

const Templates = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('all');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const industries = [
    { id: 'all', name: 'All Industries' },
    { id: 'education', name: 'Education' },
    { id: 'healthcare', name: 'Healthcare' },
    { id: 'ecommerce', name: 'E-Commerce' },
    { id: 'finance', name: 'Finance' }
  ];

  const templates = [
    {
      id: 1,
      name: 'Student Enrollment Automation',
      industry: 'education',
      description: 'Automate student registration and enrollment processes',
      downloads: 2847,
      rating: 4.8,
      complexity: 'Intermediate'
    },
    {
      id: 2,
      name: 'Patient Appointment Scheduling',
      industry: 'healthcare',
      description: 'Streamline appointment booking and reminders',
      downloads: 1923,
      rating: 4.9,
      complexity: 'Beginner'
    },
    {
      id: 3,
      name: 'Order Processing Pipeline',
      industry: 'ecommerce',
      description: 'End-to-end order management automation',
      downloads: 3456,
      rating: 4.7,
      complexity: 'Advanced'
    },
    {
      id: 4,
      name: 'Invoice Processing Workflow',
      industry: 'finance',
      description: 'Automated invoice processing and approval',
      downloads: 1567,
      rating: 4.6,
      complexity: 'Intermediate'
    }
  ];

  const filteredTemplates = templates?.filter(template => {
    const matchesSearch = template?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    const matchesIndustry = selectedIndustry === 'all' || template?.industry === selectedIndustry;
    return matchesSearch && matchesIndustry;
  });

  return (
    <>
      <Helmet>
        <title>Templates - WorkflowGene Cloud | Ready-to-Use Workflow Templates</title>
        <meta name="description" content="Browse our library of ready-to-use workflow templates for various industries and use cases." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20">
            <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
              <h1 className="text-4xl lg:text-5xl font-bold text-text-primary mb-6">
                Workflow Templates
              </h1>
              <p className="text-xl text-text-secondary mb-8">
                Jump-start your automation with ready-to-use templates
              </p>
              <div className="max-w-2xl mx-auto">
                <Input
                  type="search"
                  placeholder="Search templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                />
              </div>
            </div>
          </section>

          {/* Filters */}
          <section className="py-8 bg-surface">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex flex-wrap gap-3 justify-center">
                {industries?.map((industry) => (
                  <button
                    key={industry?.id}
                    onClick={() => setSelectedIndustry(industry?.id)}
                    className={`px-4 py-2 rounded-genetic-lg font-medium transition-all duration-genetic-normal ${
                      selectedIndustry === industry?.id
                        ? 'bg-primary text-white' :'bg-card hover:bg-muted'
                    }`}
                  >
                    {industry?.name}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Templates Grid */}
          <section className="py-16 bg-background">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredTemplates?.map((template) => (
                  <div key={template?.id} className="bg-card rounded-genetic-lg p-6 shadow-organic-sm hover:shadow-organic-md transition-all duration-genetic-normal">
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        template?.complexity === 'Beginner' ? 'bg-success/10 text-success' :
                        template?.complexity === 'Intermediate' ? 'bg-warning/10 text-warning' :
                        'bg-error/10 text-error'
                      }`}>
                        {template?.complexity}
                      </span>
                      <div className="flex items-center space-x-1 text-sm text-text-secondary">
                        <Icon name="Star" size={14} className="text-warning fill-current" />
                        <span>{template?.rating}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-text-primary mb-2">{template?.name}</h3>
                    <p className="text-text-secondary mb-4">{template?.description}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-1 text-sm text-text-secondary">
                        <Icon name="Download" size={14} />
                        <span>{template?.downloads?.toLocaleString()} downloads</span>
                      </div>
                      <span className="text-sm text-primary font-medium capitalize">{template?.industry}</span>
                    </div>
                    
                    <div className="flex space-x-3">
                      <Button variant="default" size="sm" className="flex-1">
                        Use Template
                      </Button>
                      <Button variant="outline" size="sm" iconName="Eye">
                        Preview
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Templates;