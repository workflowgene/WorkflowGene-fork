import React, { useState, useEffect } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Icon from '../AppIcon';
import Image from '../AppImage';
import { useAuth } from '../auth/AuthProvider';
import { supabase } from '../../lib/supabase';
import toast from 'react-hot-toast';

const IntegrationMarketplace = () => {
  const [integrations, setIntegrations] = useState([]);
  const [installedIntegrations, setInstalledIntegrations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const { profile } = useAuth();

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'crm', label: 'CRM & Sales' },
    { value: 'communication', label: 'Communication' },
    { value: 'productivity', label: 'Productivity' },
    { value: 'ecommerce', label: 'E-Commerce' },
    { value: 'finance', label: 'Finance' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'analytics', label: 'Analytics' },
    { value: 'storage', label: 'File Storage' }
  ];

  const mockIntegrations = [
    {
      id: 'salesforce',
      name: 'Salesforce',
      description: 'Sync leads, contacts, and opportunities with your CRM workflows',
      category: 'crm',
      logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=64&h=64&fit=crop',
      rating: 4.9,
      installs: 50000,
      verified: true,
      price: 'Free',
      features: ['Real-time sync', 'Custom fields', 'Bulk operations', 'Advanced reporting'],
      screenshots: [
        'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop'
      ]
    },
    {
      id: 'slack',
      name: 'Slack',
      description: 'Send notifications, create channels, and manage team communications',
      category: 'communication',
      logo: 'https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=64&h=64&fit=crop',
      rating: 4.8,
      installs: 75000,
      verified: true,
      price: 'Free',
      features: ['Channel management', 'Direct messages', 'File sharing', 'Bot integration'],
      screenshots: [
        'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=300&fit=crop'
      ]
    },
    {
      id: 'shopify',
      name: 'Shopify',
      description: 'Automate order processing, inventory management, and customer communications',
      category: 'ecommerce',
      logo: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=64&h=64&fit=crop',
      rating: 4.7,
      installs: 60000,
      verified: true,
      price: 'Free',
      features: ['Order automation', 'Inventory sync', 'Customer segmentation', 'Analytics'],
      screenshots: [
        'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop'
      ]
    },
    {
      id: 'stripe',
      name: 'Stripe',
      description: 'Process payments, manage subscriptions, and handle financial workflows',
      category: 'finance',
      logo: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=64&h=64&fit=crop',
      rating: 4.9,
      installs: 45000,
      verified: true,
      price: 'Free',
      features: ['Payment processing', 'Subscription billing', 'Fraud detection', 'Reporting'],
      screenshots: []
    },
    {
      id: 'google-sheets',
      name: 'Google Sheets',
      description: 'Read, write, and manipulate spreadsheet data in your automation workflows',
      category: 'productivity',
      logo: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=64&h=64&fit=crop',
      rating: 4.6,
      installs: 80000,
      verified: true,
      price: 'Free',
      features: ['Data manipulation', 'Real-time updates', 'Formula support', 'Collaboration'],
      screenshots: []
    },
    {
      id: 'mailchimp',
      name: 'Mailchimp',
      description: 'Automate email marketing campaigns and subscriber management',
      category: 'marketing',
      logo: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=64&h=64&fit=crop',
      rating: 4.5,
      installs: 35000,
      verified: true,
      price: 'Free',
      features: ['Email campaigns', 'Audience segmentation', 'A/B testing', 'Analytics'],
      screenshots: []
    }
  ];

  useEffect(() => {
    setIntegrations(mockIntegrations);
    fetchInstalledIntegrations();
    setLoading(false);
  }, [profile]);

  const fetchInstalledIntegrations = async () => {
    if (!profile?.organization_id) return;
    
    try {
      const { data, error } = await supabase
        .from('installed_integrations')
        .select('integration_id')
        .eq('organization_id', profile.organization_id)
        .eq('status', 'active');

      if (error) throw error;
      setInstalledIntegrations(data?.map(i => i.integration_id) || []);
    } catch (error) {
      console.error('Error fetching installed integrations:', error);
    }
  };

  const installIntegration = async (integrationId) => {
    try {
      const { error } = await supabase
        .from('installed_integrations')
        .insert({
          organization_id: profile.organization_id,
          integration_id: integrationId,
          installed_by: profile.id,
          status: 'active',
          config: {}
        });

      if (error) throw error;
      
      setInstalledIntegrations(prev => [...prev, integrationId]);
      toast.success('Integration installed successfully');
    } catch (error) {
      console.error('Error installing integration:', error);
      toast.error('Failed to install integration');
    }
  };

  const uninstallIntegration = async (integrationId) => {
    try {
      const { error } = await supabase
        .from('installed_integrations')
        .update({ status: 'inactive' })
        .eq('organization_id', profile.organization_id)
        .eq('integration_id', integrationId);

      if (error) throw error;
      
      setInstalledIntegrations(prev => prev.filter(id => id !== integrationId));
      toast.success('Integration uninstalled');
    } catch (error) {
      console.error('Error uninstalling integration:', error);
      toast.error('Failed to uninstall integration');
    }
  };

  const filteredIntegrations = integrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || integration.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="p-8 text-center">
        <Icon name="Loader2" size={32} className="animate-spin text-text-secondary mx-auto mb-4" />
        <p className="text-text-secondary">Loading marketplace...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Integration Marketplace</h2>
          <p className="text-text-secondary">
            Connect with 500+ popular business applications
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="w-64">
            <Input
              type="search"
              placeholder="Search integrations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-48">
            <Select
              options={categories}
              value={selectedCategory}
              onChange={setSelectedCategory}
              placeholder="All Categories"
            />
          </div>
        </div>
      </div>

      {/* Integrations Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIntegrations.map((integration) => (
          <IntegrationCard
            key={integration.id}
            integration={integration}
            isInstalled={installedIntegrations.includes(integration.id)}
            onInstall={() => installIntegration(integration.id)}
            onUninstall={() => uninstallIntegration(integration.id)}
          />
        ))}
      </div>

      {filteredIntegrations.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Search" size={48} className="text-text-secondary mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-text-primary mb-2">No integrations found</h3>
          <p className="text-text-secondary">
            Try adjusting your search terms or category filter
          </p>
        </div>
      )}
    </div>
  );
};

const IntegrationCard = ({ integration, isInstalled, onInstall, onUninstall }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <div className="card-organic bg-card p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-genetic-md overflow-hidden bg-surface">
              <Image 
                src={integration.logo} 
                alt={`${integration.name} logo`}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-semibold text-text-primary">{integration.name}</h3>
                {integration.verified && (
                  <Icon name="BadgeCheck" size={16} className="text-success" />
                )}
              </div>
              <div className="flex items-center space-x-2 text-sm text-text-secondary">
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={14} className="text-warning fill-current" />
                  <span>{integration.rating}</span>
                </div>
                <span>•</span>
                <span>{integration.installs.toLocaleString()} installs</span>
              </div>
            </div>
          </div>
          
          <span className="text-sm font-medium text-success">{integration.price}</span>
        </div>

        <p className="text-text-secondary mb-4 text-sm leading-relaxed">
          {integration.description}
        </p>

        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {integration.features.slice(0, 3).map((feature, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-genetic-sm font-medium"
              >
                {feature}
              </span>
            ))}
            {integration.features.length > 3 && (
              <span className="text-xs text-text-secondary">
                +{integration.features.length - 3} more
              </span>
            )}
          </div>
        </div>

        <div className="flex space-x-3">
          {isInstalled ? (
            <>
              <Button variant="outline" size="sm" className="flex-1" onClick={onUninstall}>
                Uninstall
              </Button>
              <Button variant="default" size="sm" iconName="Settings">
                Configure
              </Button>
            </>
          ) : (
            <>
              <Button variant="default" size="sm" className="flex-1" onClick={onInstall}>
                Install
              </Button>
              <Button variant="outline" size="sm" iconName="Eye" onClick={() => setShowDetails(true)}>
                Details
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Integration Details Modal */}
      {showDetails && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-genetic-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Image 
                    src={integration.logo} 
                    alt={`${integration.name} logo`}
                    className="w-16 h-16 rounded-genetic-md object-cover"
                  />
                  <div>
                    <h2 className="text-2xl font-bold text-text-primary">{integration.name}</h2>
                    <div className="flex items-center space-x-4 text-sm text-text-secondary">
                      <div className="flex items-center space-x-1">
                        <Icon name="Star" size={14} className="text-warning fill-current" />
                        <span>{integration.rating}</span>
                      </div>
                      <span>{integration.installs.toLocaleString()} installs</span>
                      <span className="text-success font-medium">{integration.price}</span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => setShowDetails(false)}
                  iconName="X"
                />
              </div>
            </div>

            <div className="p-6">
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-text-primary mb-4">Description</h3>
                  <p className="text-text-secondary mb-6 leading-relaxed">
                    {integration.description}
                  </p>

                  <h3 className="text-xl font-semibold text-text-primary mb-4">Features</h3>
                  <div className="space-y-2">
                    {integration.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Icon name="Check" size={16} className="text-success" />
                        <span className="text-text-secondary">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  {integration.screenshots.length > 0 && (
                    <>
                      <h3 className="text-xl font-semibold text-text-primary mb-4">Screenshots</h3>
                      <div className="space-y-4">
                        {integration.screenshots.map((screenshot, index) => (
                          <Image
                            key={index}
                            src={screenshot}
                            alt={`${integration.name} screenshot ${index + 1}`}
                            className="w-full rounded-genetic-md border border-border"
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-border">
                <Button
                  variant="outline"
                  onClick={() => setShowDetails(false)}
                >
                  Close
                </Button>
                {isInstalled ? (
                  <Button variant="outline" onClick={onUninstall}>
                    Uninstall
                  </Button>
                ) : (
                  <Button variant="default" onClick={onInstall} iconName="Download" iconPosition="left">
                    Install Integration
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default IntegrationMarketplace;