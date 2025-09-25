import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const APIDocumentation = () => {
  const [activeEndpoint, setActiveEndpoint] = useState('workflows');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const endpoints = [
    {
      id: 'workflows',
      name: 'Workflows',
      description: 'Create and manage automation workflows',
      methods: ['GET', 'POST', 'PUT', 'DELETE']
    },
    {
      id: 'executions',
      name: 'Executions',
      description: 'Monitor workflow executions and results',
      methods: ['GET', 'POST']
    },
    {
      id: 'integrations',
      name: 'Integrations',
      description: 'Manage third-party integrations',
      methods: ['GET', 'POST', 'DELETE']
    },
    {
      id: 'users',
      name: 'Users',
      description: 'User and team management',
      methods: ['GET', 'POST', 'PUT']
    }
  ];

  return (
    <>
      <Helmet>
        <title>API Documentation - WorkflowGene Cloud</title>
        <meta name="description" content="Complete API documentation for WorkflowGene Cloud automation platform." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20">
            <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Icon name="Code" size={16} />
                <span>Developer Resources</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-text-primary mb-6">
                API Documentation
              </h1>
              <p className="text-xl text-text-secondary mb-8">
                Build powerful integrations with our comprehensive REST API
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="default" size="lg" iconName="Play" iconPosition="left">
                  Quick Start Guide
                </Button>
                <Button variant="outline" size="lg" iconName="Download" iconPosition="left">
                  Download SDK
                </Button>
              </div>
            </div>
          </section>

          {/* API Endpoints */}
          <section className="py-20 bg-surface">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="grid lg:grid-cols-4 gap-8">
                {/* Sidebar */}
                <div className="lg:col-span-1">
                  <div className="bg-card rounded-genetic-lg p-6 sticky top-24">
                    <h3 className="font-semibold text-text-primary mb-4">Endpoints</h3>
                    <nav className="space-y-2">
                      {endpoints?.map((endpoint) => (
                        <button
                          key={endpoint?.id}
                          onClick={() => setActiveEndpoint(endpoint?.id)}
                          className={`w-full text-left p-3 rounded-genetic-md transition-all duration-genetic-normal ${
                            activeEndpoint === endpoint?.id
                              ? 'bg-primary text-white' :'hover:bg-muted'
                          }`}
                        >
                          <div className="font-medium">{endpoint?.name}</div>
                          <div className={`text-sm ${
                            activeEndpoint === endpoint?.id ? 'text-white/80' : 'text-text-secondary'
                          }`}>
                            {endpoint?.description}
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
                      {endpoints?.find(e => e?.id === activeEndpoint)?.name} API
                    </h2>
                    
                    <div className="space-y-8">
                      <div className="bg-secondary rounded-genetic-md p-4">
                        <div className="text-white font-mono text-sm">
                          GET /api/v1/{activeEndpoint}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-text-primary mb-3">Authentication</h3>
                        <p className="text-text-secondary mb-4">
                          All API requests require authentication using your API key in the Authorization header.
                        </p>
                        <div className="bg-muted rounded-genetic-md p-4">
                          <code className="text-sm">Authorization: Bearer YOUR_API_KEY</code>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-text-primary mb-3">Example Response</h3>
                        <div className="bg-secondary rounded-genetic-md p-4">
                          <pre className="text-white text-sm overflow-x-auto">
{`{
  "data": [
    {
      "id": "wf_123",
      "name": "Order Processing",
      "status": "active",
      "created_at": "2024-01-01T00:00:00Z"
    }
  ],
  "meta": {
    "total": 1,
    "page": 1,
    "per_page": 10
  }
}`}
                          </pre>
                        </div>
                      </div>
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

export default APIDocumentation;