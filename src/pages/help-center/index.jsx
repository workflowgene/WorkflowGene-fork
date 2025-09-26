import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import AIChatbot from '../../components/ui/AIChatbot';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Icon from '../../components/AppIcon';

const HelpCenter = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const helpCategories = [
    {
      id: 'getting-started',
      name: 'Getting Started',
      icon: 'Play',
      description: 'Learn the basics of WorkflowGene Cloud',
      articleCount: 12,
      color: 'bg-blue-500'
    },
    {
      id: 'workflows',
      name: 'Building Workflows',
      icon: 'GitBranch',
      description: 'Create and manage automation workflows',
      articleCount: 18,
      color: 'bg-green-500'
    },
    {
      id: 'integrations',
      name: 'Integrations',
      icon: 'Link',
      description: 'Connect with your favorite tools',
      articleCount: 25,
      color: 'bg-purple-500'
    },
    {
      id: 'troubleshooting',
      name: 'Troubleshooting',
      icon: 'AlertCircle',
      description: 'Solve common issues and errors',
      articleCount: 15,
      color: 'bg-orange-500'
    },
    {
      id: 'billing',
      name: 'Billing & Plans',
      icon: 'CreditCard',
      description: 'Manage your subscription and billing',
      articleCount: 8,
      color: 'bg-indigo-500'
    },
    {
      id: 'security',
      name: 'Security & Privacy',
      icon: 'Shield',
      description: 'Data protection and compliance',
      articleCount: 10,
      color: 'bg-red-500'
    }
  ];

  const popularArticles = [
    {
      id: 1,
      title: 'Creating Your First Workflow',
      category: 'getting-started',
      description: 'Step-by-step guide to building your first automation workflow',
      readTime: '5 min',
      views: 15000,
      helpful: 245,
      lastUpdated: '2024-01-15'
    },
    {
      id: 2,
      title: 'Connecting Salesforce Integration',
      category: 'integrations',
      description: 'How to set up and configure Salesforce integration',
      readTime: '8 min',
      views: 12000,
      helpful: 189,
      lastUpdated: '2024-01-12'
    },
    {
      id: 3,
      title: 'Understanding Workflow Execution Limits',
      category: 'billing',
      description: 'Learn about execution limits and how to manage usage',
      readTime: '4 min',
      views: 8500,
      helpful: 156,
      lastUpdated: '2024-01-10'
    },
    {
      id: 4,
      title: 'Troubleshooting Failed Workflows',
      category: 'troubleshooting',
      description: 'Common causes and solutions for workflow failures',
      readTime: '6 min',
      views: 7200,
      helpful: 134,
      lastUpdated: '2024-01-08'
    },
    {
      id: 5,
      title: 'Setting Up Two-Factor Authentication',
      category: 'security',
      description: 'Enhance your account security with 2FA',
      readTime: '3 min',
      views: 5800,
      helpful: 98,
      lastUpdated: '2024-01-05'
    },
    {
      id: 6,
      title: 'Advanced Conditional Logic',
      category: 'workflows',
      description: 'Create complex decision trees in your workflows',
      readTime: '10 min',
      views: 4500,
      helpful: 87,
      lastUpdated: '2024-01-03'
    }
  ];

  const quickActions = [
    {
      title: 'Contact Support',
      description: 'Get help from our expert team',
      icon: 'MessageCircle',
      action: 'Start Chat',
      color: 'bg-primary'
    },
    {
      title: 'Schedule Demo',
      description: 'See WorkflowGene in action',
      icon: 'Calendar',
      action: 'Book Demo',
      color: 'bg-success'
    },
    {
      title: 'Community Forum',
      description: 'Connect with other users',
      icon: 'Users',
      action: 'Join Forum',
      color: 'bg-accent'
    },
    {
      title: 'Video Tutorials',
      description: 'Watch step-by-step guides',
      icon: 'Play',
      action: 'Watch Now',
      color: 'bg-warning'
    }
  ];

  const filteredArticles = popularArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Helmet>
        <title>Help Center - WorkflowGene Cloud | Support & Documentation</title>
        <meta 
          name="description" 
          content="Find comprehensive help and support for WorkflowGene Cloud. Browse articles, tutorials, troubleshooting guides, and get expert assistance." 
        />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20">
            <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Icon name="LifeBuoy" size={16} />
                <span>Help Center</span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-text-primary mb-6">
                We're here to help
              </h1>
              
              <p className="text-xl text-text-secondary mb-8">
                Find answers, get support, and learn how to make the most of WorkflowGene Cloud
              </p>
              
              <div className="max-w-2xl mx-auto">
                <Input
                  type="search"
                  placeholder="Search help articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </section>

          {/* Quick Actions */}
          <section className="py-16 bg-surface">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-2xl font-bold text-text-primary mb-4">
                  Quick Actions
                </h2>
                <p className="text-text-secondary">
                  Get help fast with these popular options
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {quickActions.map((action, index) => (
                  <div key={index} className="card-organic bg-card p-6 text-center">
                    <div className={`w-12 h-12 ${action.color} rounded-genetic-md flex items-center justify-center mx-auto mb-4`}>
                      <Icon name={action.icon} size={24} className="text-white" />
                    </div>
                    <h3 className="font-semibold text-text-primary mb-2">{action.title}</h3>
                    <p className="text-text-secondary text-sm mb-4">{action.description}</p>
                    <Button variant="outline" size="sm" fullWidth>
                      {action.action}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Help Categories */}
          <section className="py-16 bg-background">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-2xl font-bold text-text-primary mb-4">
                  Browse by Category
                </h2>
                <p className="text-text-secondary">
                  Find articles organized by topic
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {helpCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`card-organic bg-card p-6 text-left transition-all duration-genetic-normal ${
                      selectedCategory === category.id ? 'ring-2 ring-primary' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-4 mb-4">
                      <div className={`w-12 h-12 ${category.color} rounded-genetic-md flex items-center justify-center`}>
                        <Icon name={category.icon} size={24} className="text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-text-primary">{category.name}</h3>
                        <p className="text-sm text-text-secondary">{category.articleCount} articles</p>
                      </div>
                    </div>
                    <p className="text-text-secondary text-sm">{category.description}</p>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Popular Articles */}
          <section className="py-16 bg-surface">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-2xl font-bold text-text-primary mb-4">
                  {selectedCategory === 'all' ? 'Popular Articles' : `${helpCategories.find(c => c.id === selectedCategory)?.name} Articles`}
                </h2>
                <p className="text-text-secondary">
                  Most helpful articles from our knowledge base
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map((article) => (
                  <Link key={article.id} to={`/help-center/${article.id}`}>
                    <div className="card-organic bg-card p-6">
                      <div className="flex items-center space-x-2 mb-3">
                        <span className="text-sm text-primary font-medium capitalize">
                          {helpCategories.find(c => c.id === article.category)?.name}
                        </span>
                        <span className="text-text-secondary">•</span>
                        <span className="text-sm text-text-secondary">{article.readTime}</span>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-text-primary mb-3 hover:text-primary transition-colors">
                        {article.title}
                      </h3>
                      
                      <p className="text-text-secondary mb-4 text-sm leading-relaxed">
                        {article.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm text-text-secondary">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Icon name="Eye" size={14} />
                            <span>{article.views.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Icon name="ThumbsUp" size={14} />
                            <span>{article.helpful}</span>
                          </div>
                        </div>
                        <span>Updated {new Date(article.lastUpdated).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {filteredArticles.length === 0 && (
                <div className="text-center py-12">
                  <Icon name="Search" size={48} className="text-text-secondary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-text-primary mb-2">No articles found</h3>
                  <p className="text-text-secondary">
                    Try adjusting your search terms or browse different categories
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Contact Support */}
          <section className="py-16 bg-background">
            <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
              <div className="bg-card rounded-genetic-xl p-8 shadow-organic-md">
                <h2 className="text-2xl font-bold text-text-primary mb-4">
                  Need More Help?
                </h2>
                <p className="text-text-secondary mb-6">
                  Can't find what you're looking for? Our support team is ready to assist you.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    variant="default"
                    size="lg"
                    iconName="MessageCircle"
                    iconPosition="left"
                    className="btn-organic"
                  >
                    Contact Support
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    iconName="Users"
                    iconPosition="left"
                  >
                    Join Community
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
        <AIChatbot />
      </div>
    </>
  );
};

export default HelpCenter;