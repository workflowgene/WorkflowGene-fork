import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Icon from '../../components/AppIcon';

const Documentation = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState('getting-started');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      id: 'getting-started',
      name: 'Getting Started',
      icon: 'Play',
      articles: [
        'Quick Start Guide',
        'Creating Your First Workflow',
        'Understanding the Dashboard',
        'Basic Concepts'
      ]
    },
    {
      id: 'workflows',
      name: 'Workflows',
      icon: 'GitBranch',
      articles: [
        'Workflow Builder Guide',
        'Conditional Logic',
        'Error Handling',
        'Testing Workflows'
      ]
    },
    {
      id: 'integrations',
      name: 'Integrations',
      icon: 'Link',
      articles: [
        'Setting Up Integrations',
        'Custom API Connections',
        'Webhook Configuration',
        'Authentication Methods'
      ]
    },
    {
      id: 'api',
      name: 'API Reference',
      icon: 'Code',
      articles: [
        'API Overview',
        'Authentication',
        'Endpoints Reference',
        'SDKs and Libraries'
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Documentation - WorkflowGene Cloud | Complete User Guide</title>
        <meta name="description" content="Complete documentation for WorkflowGene Cloud including guides, tutorials, and API reference." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20">
            <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
              <h1 className="text-4xl lg:text-5xl font-bold text-text-primary mb-6">
                Documentation
              </h1>
              <p className="text-xl text-text-secondary mb-8">
                Everything you need to master WorkflowGene Cloud
              </p>
              <div className="max-w-2xl mx-auto">
                <Input
                  type="search"
                  placeholder="Search documentation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                />
              </div>
            </div>
          </section>

          {/* Documentation Content */}
          <section className="py-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="grid lg:grid-cols-4 gap-8">
                {/* Sidebar */}
                <div className="lg:col-span-1">
                  <div className="bg-card rounded-genetic-lg p-6 sticky top-24">
                    <h3 className="font-semibold text-text-primary mb-4">Sections</h3>
                    <nav className="space-y-2">
                      {sections?.map((section) => (
                        <button
                          key={section?.id}
                          onClick={() => setActiveSection(section?.id)}
                          className={`w-full text-left p-3 rounded-genetic-md transition-all duration-genetic-normal ${
                            activeSection === section?.id
                              ? 'bg-primary text-white' :'hover:bg-muted'
                          }`}
                        >
                          <div className="flex items-center space-x-2">
                            <Icon name={section?.icon} size={16} />
                            <span className="font-medium">{section?.name}</span>
                          </div>
                        </button>
                      ))}
                    </nav>
                  </div>
                </div>

                {/* Content */}
                <div className="lg:col-span-3">
                  <div className="bg-card rounded-genetic-lg p-8 shadow-organic-sm">
                    <h2 className="text-2xl font-bold text-text-primary mb-6">
                      {sections?.find(s => s?.id === activeSection)?.name}
                    </h2>
                    
                    <div className="space-y-4">
                      {sections?.find(s => s?.id === activeSection)?.articles?.map((article, index) => (
                        <div key={index} className="p-4 bg-surface rounded-genetic-md hover:bg-muted transition-colors cursor-pointer">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-text-primary">{article}</h3>
                            <Icon name="ArrowRight" size={16} className="text-text-secondary" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Documentation;