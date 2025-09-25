import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';

const Integrations = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = [
    { id: 'all', name: 'All', count: 500 },
    { id: 'crm', name: 'CRM', count: 45 },
    { id: 'ecommerce', name: 'E-Commerce', count: 60 },
    { id: 'communication', name: 'Communication', count: 35 },
    { id: 'productivity', name: 'Productivity', count: 80 },
    { id: 'finance', name: 'Finance', count: 40 }
  ];

  const integrations = [
    {
      id: 1,
      name: 'Salesforce',
      category: 'crm',
      description: 'Sync leads, contacts, and opportunities with your CRM workflows',
      logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=64&h=64&fit=crop',
      rating: 4.9,
      installs: '50K+',
      verified: true
    },
    {
      id: 2,
      name: 'Shopify',
      category: 'ecommerce',
      description: 'Automate order processing and inventory management',
      logo: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=64&h=64&fit=crop',
      rating: 4.8,
      installs: '75K+',
      verified: true
    },
    {
      id: 3,
      name: 'Slack',
      category: 'communication',
      description: 'Send notifications and manage team communications',
      logo: 'https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=64&h=64&fit=crop',
      rating: 4.7,
      installs: '100K+',
      verified: true
    },
    {
      id: 4,
      name: 'Google Sheets',
      category: 'productivity',
      description: 'Read, write, and manipulate spreadsheet data',
      logo: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=64&h=64&fit=crop',
      rating: 4.6,
      installs: '120K+',
      verified: true
    }
  ];

  const filteredIntegrations = integrations?.filter(integration => {
    const matchesSearch = integration?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || integration?.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Helmet>
        <title>Integrations - WorkflowGene Cloud | 500+ App Connections</title>
        <meta name="description" content="Connect WorkflowGene Cloud with 500+ popular business applications. Browse our integration marketplace and find the connections you need." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20">
            <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
              <h1 className="text-4xl lg:text-5xl font-bold text-text-primary mb-6">
                500+ Integrations
              </h1>
              <p className="text-xl text-text-secondary mb-8">
                Connect with all your favorite tools and platforms
              </p>
              <div className="max-w-2xl mx-auto">
                <Input
                  type="search"
                  placeholder="Search integrations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                />
              </div>
            </div>
          </section>

          {/* Categories */}
          <section className="py-16 bg-surface">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex flex-wrap gap-3 justify-center mb-8">
                {categories?.map((category) => (
                  <button
                    key={category?.id}
                    onClick={() => setSelectedCategory(category?.id)}
                    className={`px-4 py-2 rounded-genetic-lg font-medium transition-all duration-genetic-normal ${
                      selectedCategory === category?.id
                        ? 'bg-primary text-white' :'bg-card hover:bg-muted'
                    }`}
                  >
                    {category?.name} ({category?.count})
                  </button>
                ))}
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredIntegrations?.map((integration) => (
                  <div key={integration?.id} className="bg-card rounded-genetic-lg p-6 shadow-organic-sm hover:shadow-organic-md transition-all duration-genetic-normal">
                    <div className="flex items-center space-x-3 mb-4">
                      <Image src={integration?.logo} alt={integration?.name} className="w-12 h-12 rounded-genetic-md" />
                      <div>
                        <h3 className="font-semibold text-text-primary">{integration?.name}</h3>
                        <div className="flex items-center space-x-2 text-sm text-text-secondary">
                          <Icon name="Star" size={14} className="text-warning fill-current" />
                          <span>{integration?.rating}</span>
                          <span>•</span>
                          <span>{integration?.installs}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-text-secondary mb-4">{integration?.description}</p>
                    <Button variant="default" size="sm" fullWidth>
                      Connect
                    </Button>
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

export default Integrations;