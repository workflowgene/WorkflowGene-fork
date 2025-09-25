import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Icon from '../../components/AppIcon';

const Help = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = [
    { id: 'all', name: 'All Topics', icon: 'Grid3X3' },
    { id: 'getting-started', name: 'Getting Started', icon: 'Play' },
    { id: 'workflows', name: 'Workflows', icon: 'GitBranch' },
    { id: 'integrations', name: 'Integrations', icon: 'Link' },
    { id: 'troubleshooting', name: 'Troubleshooting', icon: 'AlertCircle' },
    { id: 'billing', name: 'Billing', icon: 'CreditCard' }
  ];

  const helpArticles = [
    {
      id: 1,
      title: 'Getting Started with WorkflowGene Cloud',
      category: 'getting-started',
      description: 'Complete guide to setting up your first automation workflow',
      readTime: '5 min',
      helpful: 245,
      views: 12500
    },
    {
      id: 2,
      title: 'How to Connect Salesforce Integration',
      category: 'integrations',
      description: 'Step-by-step guide to connecting your Salesforce account',
      readTime: '8 min',
      helpful: 189,
      views: 8900
    },
    {
      id: 3,
      title: 'Troubleshooting Failed Workflow Executions',
      category: 'troubleshooting',
      description: 'Common issues and solutions for workflow failures',
      readTime: '6 min',
      helpful: 156,
      views: 6700
    },
    {
      id: 4,
      title: 'Understanding Your Billing and Usage',
      category: 'billing',
      description: 'How billing works and how to monitor your usage',
      readTime: '4 min',
      helpful: 134,
      views: 5400
    }
  ];

  const filteredArticles = helpArticles?.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article?.category === selectedCategory;
    const matchesSearch = article?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         article?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Helmet>
        <title>Help Center - WorkflowGene Cloud | Support & Documentation</title>
        <meta name="description" content="Find answers to your questions about WorkflowGene Cloud. Browse our help articles, tutorials, and troubleshooting guides." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20">
            <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
              <h1 className="text-4xl lg:text-5xl font-bold text-text-primary mb-6">
                How can we help you?
              </h1>
              <p className="text-xl text-text-secondary mb-8">
                Search our knowledge base or browse categories to find answers
              </p>
              <div className="max-w-2xl mx-auto">
                <Input
                  type="search"
                  placeholder="Search for help articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                  className="text-lg py-4"
                />
              </div>
            </div>
          </section>

          {/* Categories */}
          <section className="py-16 bg-surface">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {categories?.map((category) => (
                  <button
                    key={category?.id}
                    onClick={() => setSelectedCategory(category?.id)}
                    className={`p-4 rounded-genetic-lg text-center transition-all duration-genetic-normal ${
                      selectedCategory === category?.id
                        ? 'bg-primary text-white' :'bg-card hover:bg-muted'
                    }`}
                  >
                    <Icon name={category?.icon} size={24} className="mx-auto mb-2" />
                    <span className="text-sm font-medium">{category?.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Help Articles */}
          <section className="py-16 bg-background">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-text-primary mb-8">
                {selectedCategory === 'all' ? 'Popular Articles' : `${categories?.find(c => c?.id === selectedCategory)?.name} Articles`}
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {filteredArticles?.map((article) => (
                  <div key={article?.id} className="bg-card rounded-genetic-lg p-6 shadow-organic-sm hover:shadow-organic-md transition-all duration-genetic-normal">
                    <h3 className="text-lg font-semibold text-text-primary mb-2">{article?.title}</h3>
                    <p className="text-text-secondary mb-4">{article?.description}</p>
                    <div className="flex items-center justify-between text-sm text-text-secondary">
                      <div className="flex items-center space-x-4">
                        <span>{article?.readTime}</span>
                        <span>{article?.views} views</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="ThumbsUp" size={14} />
                        <span>{article?.helpful}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Support */}
          <section className="py-16 bg-surface">
            <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-bold text-text-primary mb-4">
                Still need help?
              </h2>
              <p className="text-text-secondary mb-8">
                Our support team is here to help you succeed
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-card rounded-genetic-lg p-6">
                  <Icon name="MessageCircle" size={32} className="text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-text-primary mb-2">Live Chat</h3>
                  <p className="text-sm text-text-secondary mb-4">Get instant help from our support team</p>
                  <Button variant="default" size="sm" fullWidth>Start Chat</Button>
                </div>
                <div className="bg-card rounded-genetic-lg p-6">
                  <Icon name="Mail" size={32} className="text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-text-primary mb-2">Email Support</h3>
                  <p className="text-sm text-text-secondary mb-4">Send us a detailed message</p>
                  <Button variant="outline" size="sm" fullWidth>Send Email</Button>
                </div>
                <div className="bg-card rounded-genetic-lg p-6">
                  <Icon name="Phone" size={32} className="text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-text-primary mb-2">Phone Support</h3>
                  <p className="text-sm text-text-secondary mb-4">Talk to our experts directly</p>
                  <Button variant="outline" size="sm" fullWidth>Call Us</Button>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Help;