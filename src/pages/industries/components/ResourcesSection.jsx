import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ResourcesSection = () => {
  const [activeTab, setActiveTab] = useState('templates');

  const tabs = [
    { id: 'templates', label: 'Templates', icon: 'FileText' },
    { id: 'guides', label: 'Implementation Guides', icon: 'BookOpen' },
    { id: 'webinars', label: 'Webinars', icon: 'Video' },
    { id: 'reports', label: 'Industry Reports', icon: 'BarChart3' }
  ];

  const resources = {
    templates: [
      {
        id: 1,
        title: 'Student Enrollment Automation',
        industry: 'Education',
        description: 'Streamline student registration and enrollment processes with automated workflows.',
        downloads: 1247,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9d1?w=300&h=200&fit=crop&crop=center',
        tags: ['Enrollment', 'Student Management', 'FERPA Compliant']
      },
      {
        id: 2,
        title: 'Patient Intake & Scheduling',
        industry: 'Healthcare',
        description: 'Automate patient registration, appointment scheduling, and intake forms.',
        downloads: 892,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop&crop=center',
        tags: ['Patient Care', 'HIPAA Compliant', 'Scheduling']
      },
      {
        id: 3,
        title: 'Order Processing Pipeline',
        industry: 'E-Commerce',
        description: 'End-to-end order management from cart to delivery with automated notifications.',
        downloads: 2156,
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200&fit=crop&crop=center',
        tags: ['Order Management', 'Inventory', 'Customer Service']
      }
    ],
    guides: [
      {
        id: 1,
        title: 'Healthcare Automation Implementation Guide',
        description: 'Complete 90-day implementation roadmap for healthcare organizations.',
        pages: 45,
        readTime: '25 min',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=300&h=200&fit=crop&crop=center',
        topics: ['HIPAA Compliance', 'Patient Workflows', 'Integration Planning']
      },
      {
        id: 2,
        title: 'Education Sector Digital Transformation',
        description: 'Best practices for implementing automation in educational institutions.',
        pages: 38,
        readTime: '20 min',
        image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=300&h=200&fit=crop&crop=center',
        topics: ['Student Systems', 'Faculty Workflows', 'Data Privacy']
      },
      {
        id: 3,
        title: 'E-Commerce Automation Playbook',
        description: 'Scale your online business with intelligent automation strategies.',
        pages: 52,
        readTime: '30 min',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop&crop=center',
        topics: ['Customer Journey', 'Inventory Management', 'Marketing Automation']
      }
    ],
    webinars: [
      {
        id: 1,
        title: 'Healthcare Automation: ROI in 90 Days',
        speaker: 'Dr. Sarah Chen, Healthcare IT Director',
        date: '2024-10-15',
        duration: '45 min',
        attendees: 1247,
        image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=300&h=200&fit=crop&crop=center',
        topics: ['ROI Calculation', 'Implementation Timeline', 'Case Studies']
      },
      {
        id: 2,
        title: 'Education Technology Trends 2024',
        speaker: 'Prof. Michael Rodriguez, EdTech Consultant',
        date: '2024-10-22',
        duration: '60 min',
        attendees: 892,
        image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=200&fit=crop&crop=center',
        topics: ['Digital Transformation', 'Student Experience', 'Future Trends']
      },
      {
        id: 3,
        title: 'E-Commerce Automation Masterclass',
        speaker: 'Lisa Thompson, E-Commerce Strategist',
        date: '2024-10-29',
        duration: '90 min',
        attendees: 2156,
        image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=300&h=200&fit=crop&crop=center',
        topics: ['Customer Journey', 'Conversion Optimization', 'Scaling Strategies']
      }
    ],
    reports: [
      {
        id: 1,
        title: '2024 Healthcare Automation Report',
        description: 'Comprehensive analysis of automation trends and ROI in healthcare.',
        pages: 78,
        publishDate: '2024-09-15',
        image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=300&h=200&fit=crop&crop=center',
        insights: ['Market Trends', 'ROI Analysis', 'Technology Adoption', 'Future Outlook']
      },
      {
        id: 2,
        title: 'Education Technology Efficiency Study',
        description: 'How automation is transforming educational institutions worldwide.',
        pages: 65,
        publishDate: '2024-08-28',
        image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300&h=200&fit=crop&crop=center',
        insights: ['Efficiency Gains', 'Student Outcomes', 'Cost Savings', 'Implementation Challenges']
      },
      {
        id: 3,
        title: 'E-Commerce Automation Benchmark',
        description: 'Industry benchmarks and best practices for online retail automation.',
        pages: 89,
        publishDate: '2024-09-10',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop&crop=center',
        insights: ['Performance Metrics', 'Customer Satisfaction', 'Revenue Impact', 'Technology Stack']
      }
    ]
  };

  const renderTemplates = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {resources?.templates?.map((template) => (
        <div key={template?.id} className="card-organic bg-card border border-border overflow-hidden">
          <div className="relative">
            <Image 
              src={template?.image} 
              alt={template?.title}
              className="w-full h-48 object-cover"
            />
            <div className="absolute top-4 left-4">
              <span className="px-2 py-1 bg-primary text-white text-xs rounded-full">
                {template?.industry}
              </span>
            </div>
          </div>
          
          <div className="p-6">
            <h3 className="font-bold text-text-primary mb-2">{template?.title}</h3>
            <p className="text-text-secondary text-sm mb-4">{template?.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {template?.tags?.map((tag, index) => (
                <span key={index} className="px-2 py-1 bg-muted text-text-secondary text-xs rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4 text-sm text-text-secondary">
                <div className="flex items-center space-x-1">
                  <Icon name="Download" size={14} />
                  <span>{template?.downloads}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={14} className="text-yellow-500" />
                  <span>{template?.rating}</span>
                </div>
              </div>
            </div>
            
            <Button variant="default" size="sm" fullWidth iconName="Download" iconPosition="left">
              Download Template
            </Button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderGuides = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {resources?.guides?.map((guide) => (
        <div key={guide?.id} className="card-organic bg-card border border-border overflow-hidden">
          <div className="relative">
            <Image 
              src={guide?.image} 
              alt={guide?.title}
              className="w-full h-48 object-cover"
            />
          </div>
          
          <div className="p-6">
            <h3 className="font-bold text-text-primary mb-2">{guide?.title}</h3>
            <p className="text-text-secondary text-sm mb-4">{guide?.description}</p>
            
            <div className="flex items-center space-x-4 text-sm text-text-secondary mb-4">
              <div className="flex items-center space-x-1">
                <Icon name="FileText" size={14} />
                <span>{guide?.pages} pages</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Clock" size={14} />
                <span>{guide?.readTime}</span>
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              {guide?.topics?.map((topic, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm">
                  <Icon name="Check" size={12} className="text-success" />
                  <span className="text-text-secondary">{topic}</span>
                </div>
              ))}
            </div>
            
            <Button variant="default" size="sm" fullWidth iconName="BookOpen" iconPosition="left">
              Read Guide
            </Button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderWebinars = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {resources?.webinars?.map((webinar) => (
        <div key={webinar?.id} className="card-organic bg-card border border-border overflow-hidden">
          <div className="relative">
            <Image 
              src={webinar?.image} 
              alt={webinar?.title}
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Icon name="Play" size={24} className="text-white ml-1" />
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <h3 className="font-bold text-text-primary mb-2">{webinar?.title}</h3>
            <p className="text-text-secondary text-sm mb-4">{webinar?.speaker}</p>
            
            <div className="flex items-center space-x-4 text-sm text-text-secondary mb-4">
              <div className="flex items-center space-x-1">
                <Icon name="Calendar" size={14} />
                <span>{new Date(webinar.date)?.toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Clock" size={14} />
                <span>{webinar?.duration}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-1 text-sm text-text-secondary mb-4">
              <Icon name="Users" size={14} />
              <span>{webinar?.attendees} attendees</span>
            </div>
            
            <Button variant="default" size="sm" fullWidth iconName="Play" iconPosition="left">
              Watch Webinar
            </Button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderReports = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {resources?.reports?.map((report) => (
        <div key={report?.id} className="card-organic bg-card border border-border overflow-hidden">
          <div className="relative">
            <Image 
              src={report?.image} 
              alt={report?.title}
              className="w-full h-48 object-cover"
            />
          </div>
          
          <div className="p-6">
            <h3 className="font-bold text-text-primary mb-2">{report?.title}</h3>
            <p className="text-text-secondary text-sm mb-4">{report?.description}</p>
            
            <div className="flex items-center space-x-4 text-sm text-text-secondary mb-4">
              <div className="flex items-center space-x-1">
                <Icon name="FileText" size={14} />
                <span>{report?.pages} pages</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Calendar" size={14} />
                <span>{new Date(report.publishDate)?.toLocaleDateString()}</span>
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              {report?.insights?.slice(0, 3)?.map((insight, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm">
                  <Icon name="TrendingUp" size={12} className="text-primary" />
                  <span className="text-text-secondary">{insight}</span>
                </div>
              ))}
            </div>
            
            <Button variant="default" size="sm" fullWidth iconName="Download" iconPosition="left">
              Download Report
            </Button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'templates':
        return renderTemplates();
      case 'guides':
        return renderGuides();
      case 'webinars':
        return renderWebinars();
      case 'reports':
        return renderReports();
      default:
        return renderTemplates();
    }
  };

  return (
    <section className="bg-surface py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Icon name="BookOpen" size={16} />
            <span>Resources & Templates</span>
          </div>
          
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            Industry-Specific Resources
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Access our comprehensive library of templates, guides, and insights tailored to your industry's unique automation needs.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-genetic-md font-medium transition-all duration-genetic-normal ${
                activeTab === tab?.id
                  ? 'bg-primary text-white' :'bg-card text-text-secondary hover:text-text-primary hover:bg-muted'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="scroll-reveal">
          {renderContent()}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-primary/5 rounded-genetic-xl p-8">
            <h3 className="text-2xl font-bold text-text-primary mb-4">
              Need Custom Resources?
            </h3>
            <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
              Our team can create custom templates, implementation guides, and training materials specific to your organization's needs.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                variant="default" 
                iconName="MessageCircle"
                iconPosition="left"
              >
                Contact Our Experts
              </Button>
              <Button 
                variant="outline"
                iconName="Calendar"
                iconPosition="left"
              >
                Schedule Consultation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;