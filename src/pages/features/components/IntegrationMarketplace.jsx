import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const IntegrationMarketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [compatibilityCheck, setCompatibilityCheck] = useState({});

  const categories = [
    { id: 'all', name: 'All Integrations', count: 150 },
    { id: 'crm', name: 'CRM', count: 25 },
    { id: 'ecommerce', name: 'E-Commerce', count: 30 },
    { id: 'communication', name: 'Communication', count: 20 },
    { id: 'productivity', name: 'Productivity', count: 35 },
    { id: 'analytics', name: 'Analytics', count: 15 },
    { id: 'finance', name: 'Finance', count: 25 }
  ];

  const integrations = [
    {
      id: 'salesforce',
      name: 'Salesforce',
      category: 'crm',
      description: 'Sync leads, contacts, and opportunities with your CRM workflows',
      logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=64&h=64&fit=crop&crop=center',
      rating: 4.9,
      installs: '50K+',
      verified: true,
      features: ['Real-time sync', 'Custom fields', 'Bulk operations'],
      compatibility: 95
    },
    {
      id: 'shopify',
      name: 'Shopify',
      category: 'ecommerce',
      description: 'Automate order processing, inventory management, and customer communications',
      logo: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=64&h=64&fit=crop&crop=center',
      rating: 4.8,
      installs: '75K+',
      verified: true,
      features: ['Order automation', 'Inventory sync', 'Customer segmentation'],
      compatibility: 98
    },
    {
      id: 'slack',
      name: 'Slack',
      category: 'communication',
      description: 'Send notifications, create channels, and manage team communications',
      logo: 'https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=64&h=64&fit=crop&crop=center',
      rating: 4.7,
      installs: '100K+',
      verified: true,
      features: ['Channel management', 'Direct messages', 'File sharing'],
      compatibility: 92
    },
    {
      id: 'hubspot',
      name: 'HubSpot',
      category: 'crm',
      description: 'Integrate marketing automation with your customer relationship workflows',
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=64&h=64&fit=crop&crop=center',
      rating: 4.6,
      installs: '40K+',
      verified: true,
      features: ['Lead scoring', 'Email campaigns', 'Contact management'],
      compatibility: 89
    },
    {
      id: 'stripe',
      name: 'Stripe',
      category: 'finance',
      description: 'Process payments, manage subscriptions, and handle financial workflows',
      logo: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=64&h=64&fit=crop&crop=center',
      rating: 4.9,
      installs: '60K+',
      verified: true,
      features: ['Payment processing', 'Subscription billing', 'Fraud detection'],
      compatibility: 96
    },
    {
      id: 'google-sheets',
      name: 'Google Sheets',
      category: 'productivity',
      description: 'Read, write, and manipulate spreadsheet data in your automation workflows',
      logo: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=64&h=64&fit=crop&crop=center',
      rating: 4.5,
      installs: '120K+',
      verified: true,
      features: ['Data manipulation', 'Real-time updates', 'Formula support'],
      compatibility: 94
    }
  ];

  const filteredIntegrations = integrations?.filter(integration => {
    const matchesSearch = integration?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         integration?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || integration?.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const checkCompatibility = (integrationId) => {
    // Simulate compatibility check
    setCompatibilityCheck(prev => ({
      ...prev,
      [integrationId]: 'checking'
    }));

    setTimeout(() => {
      const integration = integrations?.find(i => i?.id === integrationId);
      setCompatibilityCheck(prev => ({
        ...prev,
        [integrationId]: integration?.compatibility
      }));
    }, 2000);
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-6">
            Integration Marketplace
          </h2>
          <p className="text-lg text-text-secondary">
            Connect with 150+ popular business applications and services. Real-time compatibility checking ensures seamless integration.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-8">
            <div className="w-full lg:w-96">
              <Input
                type="search"
                placeholder="Search integrations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e?.target?.value)}
                className="w-full"
              />
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-text-secondary whitespace-nowrap">Filter by:</span>
              <div className="flex flex-wrap gap-2">
                {categories?.slice(0, 4)?.map((category) => (
                  <button
                    key={category?.id}
                    onClick={() => setSelectedCategory(category?.id)}
                    className={`px-4 py-2 rounded-genetic-md text-sm font-medium transition-all duration-genetic-normal ${
                      selectedCategory === category?.id
                        ? 'bg-primary text-white' :'bg-surface text-text-secondary hover:bg-muted'
                    }`}
                  >
                    {category?.name} ({category?.count})
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-3">
            {categories?.map((category) => (
              <button
                key={category?.id}
                onClick={() => setSelectedCategory(category?.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-genetic-normal ${
                  selectedCategory === category?.id
                    ? 'bg-primary text-white shadow-organic-md'
                    : 'bg-card text-text-secondary hover:bg-muted border border-border'
                }`}
              >
                {category?.name}
              </button>
            ))}
          </div>
        </div>

        {/* Integrations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredIntegrations?.map((integration) => (
            <div key={integration?.id} className="bg-card rounded-genetic-xl shadow-organic-md p-6 hover:shadow-organic-lg transition-all duration-genetic-normal card-organic">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-genetic-md overflow-hidden bg-surface">
                    <Image 
                      src={integration?.logo} 
                      alt={`${integration?.name} logo`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-semibold text-text-primary">{integration?.name}</h3>
                      {integration?.verified && (
                        <Icon name="BadgeCheck" size={16} className="text-success" />
                      )}
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-text-secondary">
                      <div className="flex items-center space-x-1">
                        <Icon name="Star" size={14} className="text-warning fill-current" />
                        <span>{integration?.rating}</span>
                      </div>
                      <span>•</span>
                      <span>{integration?.installs} installs</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-text-secondary mb-4 text-sm leading-relaxed">
                {integration?.description}
              </p>

              {/* Features */}
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {integration?.features?.map((feature, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-genetic-sm font-medium"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Compatibility Check */}
              <div className="mb-4">
                {compatibilityCheck?.[integration?.id] === 'checking' ? (
                  <div className="flex items-center space-x-2 text-sm text-text-secondary">
                    <Icon name="Loader2" size={16} className="animate-spin" />
                    <span>Checking compatibility...</span>
                  </div>
                ) : compatibilityCheck?.[integration?.id] ? (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">Compatibility</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-muted rounded-full h-2">
                        <div 
                          className="bg-success h-2 rounded-full"
                          style={{ width: `${compatibilityCheck?.[integration?.id]}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-success">
                        {compatibilityCheck?.[integration?.id]}%
                      </span>
                    </div>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    iconName="CheckCircle"
                    iconPosition="left"
                    onClick={() => checkCompatibility(integration?.id)}
                  >
                    Check Compatibility
                  </Button>
                )}
              </div>

              {/* Actions */}
              <div className="flex space-x-3">
                <Button variant="default" size="sm" className="flex-1">
                  Install
                </Button>
                <Button variant="ghost" size="sm" iconName="ExternalLink">
                  Learn More
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        {filteredIntegrations?.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" iconName="Plus" iconPosition="left">
              Load More Integrations
            </Button>
          </div>
        )}

        {/* No Results */}
        {filteredIntegrations?.length === 0 && (
          <div className="text-center py-12">
            <Icon name="Search" size={48} className="text-text-secondary mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-text-primary mb-2">No integrations found</h3>
            <p className="text-text-secondary mb-6">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
            <Button variant="outline" onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default IntegrationMarketplace;