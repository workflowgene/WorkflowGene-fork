import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Icon from '../../components/AppIcon';
import { useAuth } from '../../components/auth/AuthProvider';
import { supabase } from '../../lib/supabase';
import toast from 'react-hot-toast';

const Settings = () => {
  const { profile, getPermissions } = useAuth();
  const [activeTab, setActiveTab] = useState('organization');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiKeys, setApiKeys] = useState([]);
  
  const [orgData, setOrgData] = useState({
    name: '',
    industry: '',
    website: '',
    companySize: ''
  });

  const permissions = getPermissions();

  const tabs = [
    { 
      id: 'organization', 
      name: 'Organization', 
      icon: 'Building2',
      roles: ['super_admin', 'org_admin']
    },
    { 
      id: 'api', 
      name: 'API Keys', 
      icon: 'Key',
      roles: ['super_admin', 'org_admin', 'manager']
    },
    { 
      id: 'billing', 
      name: 'Billing', 
      icon: 'CreditCard',
      roles: ['super_admin', 'org_admin']
    },
    { 
      id: 'integrations', 
      name: 'Integrations', 
      icon: 'Plug',
      roles: ['super_admin', 'org_admin', 'manager']
    }
  ];

  const filteredTabs = tabs.filter(tab => 
    tab.roles.includes(profile?.role)
  );

  useEffect(() => {
    if (profile?.organization) {
      setOrgData({
        name: profile.organization.name || '',
        industry: profile.organization.industry || '',
        website: profile.organization.website || '',
        companySize: profile.organization.company_size || ''
      });
    }
    
    if (activeTab === 'api') {
      fetchApiKeys();
    }
  }, [profile, activeTab]);

  const fetchApiKeys = async () => {
    if (!profile?.organization_id) return;
    
    try {
      const { data, error } = await supabase
        .from('api_keys')
        .select('*')
        .eq('organization_id', profile.organization_id)
        .eq('revoked', false)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApiKeys(data || []);
    } catch (error) {
      console.error('Error fetching API keys:', error);
    }
  };

  const handleOrgSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('organizations')
        .update({
          name: orgData.name,
          industry: orgData.industry,
          website: orgData.website,
          company_size: orgData.companySize,
          updated_at: new Date().toISOString()
        })
        .eq('id', profile.organization_id);

      if (error) throw error;
      
      toast.success('Organization settings updated');
    } catch (error) {
      console.error('Organization update error:', error);
      toast.error('Failed to update organization settings');
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateApiKey = async () => {
    try {
      // Generate a random API key
      const keyPrefix = 'wfg_';
      const keyBody = Array.from(crypto.getRandomValues(new Uint8Array(32)))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
      const fullKey = keyPrefix + keyBody;

      const { error } = await supabase
        .from('api_keys')
        .insert([{
          organization_id: profile.organization_id,
          created_by: profile.id,
          name: `API Key ${apiKeys.length + 1}`,
          key_hash: fullKey, // In production, this should be hashed
          key_prefix: keyPrefix,
          permissions: { read: true, write: true }
        }]);

      if (error) throw error;
      
      await fetchApiKeys();
      toast.success('API key generated successfully');
    } catch (error) {
      console.error('Error generating API key:', error);
      toast.error('Failed to generate API key');
    }
  };

  const revokeApiKey = async (keyId) => {
    try {
      const { error } = await supabase
        .from('api_keys')
        .update({ revoked: true })
        .eq('id', keyId);

      if (error) throw error;
      
      await fetchApiKeys();
      toast.success('API key revoked');
    } catch (error) {
      console.error('Error revoking API key:', error);
      toast.error('Failed to revoke API key');
    }
  };

  return (
    <>
      <Helmet>
        <title>Settings - WorkflowGene Cloud Dashboard</title>
        <meta name="description" content="Manage your organization settings, API keys, and integrations." />
      </Helmet>
      
      <DashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-text-primary">Settings</h1>
            <p className="text-text-secondary">
              Manage your organization and account settings
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-genetic-lg p-6 shadow-organic-sm">
                <nav className="space-y-2">
                  {filteredTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-genetic-md transition-all duration-genetic-normal ${
                        activeTab === tab.id
                          ? 'bg-primary text-white'
                          : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                      }`}
                    >
                      <Icon name={tab.icon} size={16} />
                      <span>{tab.name}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              <div className="bg-card rounded-genetic-lg p-8 shadow-organic-sm">
                {activeTab === 'organization' && (
                  <div>
                    <h2 className="text-2xl font-semibold text-text-primary mb-6">
                      Organization Settings
                    </h2>
                    
                    <form onSubmit={handleOrgSubmit} className="space-y-6">
                      <Input
                        label="Organization Name"
                        type="text"
                        value={orgData.name}
                        onChange={(e) => setOrgData(prev => ({ ...prev, name: e.target.value }))}
                        required
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Select
                          label="Industry"
                          options={[
                            { value: 'technology', label: 'Technology' },
                            { value: 'healthcare', label: 'Healthcare' },
                            { value: 'education', label: 'Education' },
                            { value: 'finance', label: 'Finance' },
                            { value: 'ecommerce', label: 'E-Commerce' },
                            { value: 'other', label: 'Other' }
                          ]}
                          value={orgData.industry}
                          onChange={(value) => setOrgData(prev => ({ ...prev, industry: value }))}
                        />
                        
                        <Select
                          label="Company Size"
                          options={[
                            { value: '1-10', label: '1-10 employees' },
                            { value: '11-50', label: '11-50 employees' },
                            { value: '51-200', label: '51-200 employees' },
                            { value: '201-500', label: '201-500 employees' },
                            { value: '501-1000', label: '501-1,000 employees' },
                            { value: '1000+', label: '1,000+ employees' }
                          ]}
                          value={orgData.companySize}
                          onChange={(value) => setOrgData(prev => ({ ...prev, companySize: value }))}
                        />
                      </div>

                      <Input
                        label="Website"
                        type="url"
                        value={orgData.website}
                        onChange={(e) => setOrgData(prev => ({ ...prev, website: e.target.value }))}
                        placeholder="https://yourcompany.com"
                      />

                      <div className="flex justify-end">
                        <Button
                          type="submit"
                          variant="default"
                          loading={isSubmitting}
                          iconName="Save"
                          iconPosition="left"
                        >
                          Save Changes
                        </Button>
                      </div>
                    </form>
                  </div>
                )}

                {activeTab === 'api' && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="text-2xl font-semibold text-text-primary">API Keys</h2>
                        <p className="text-text-secondary">
                          Manage API keys for programmatic access
                        </p>
                      </div>
                      <Button
                        variant="default"
                        iconName="Plus"
                        iconPosition="left"
                        onClick={generateApiKey}
                      >
                        Generate Key
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {apiKeys.length === 0 ? (
                        <div className="text-center py-8">
                          <Icon name="Key" size={48} className="text-text-secondary mx-auto mb-4" />
                          <h3 className="text-lg font-semibold text-text-primary mb-2">
                            No API Keys
                          </h3>
                          <p className="text-text-secondary">
                            Generate your first API key to start using our API
                          </p>
                        </div>
                      ) : (
                        apiKeys.map((key) => (
                          <div key={key.id} className="flex items-center justify-between p-4 border border-border rounded-genetic-md">
                            <div>
                              <h4 className="font-medium text-text-primary">{key.name}</h4>
                              <p className="text-sm text-text-secondary">
                                {key.key_prefix}••••••••••••••••
                              </p>
                              <p className="text-xs text-text-secondary">
                                Created {new Date(key.created_at).toLocaleDateString()}
                              </p>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              iconName="Trash2"
                              onClick={() => revokeApiKey(key.id)}
                            >
                              Revoke
                            </Button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}

                {activeTab === 'billing' && (
                  <div>
                    <h2 className="text-2xl font-semibold text-text-primary mb-6">
                      Billing & Subscription
                    </h2>
                    
                    <div className="space-y-6">
                      {/* Current Plan */}
                      <div className="p-6 bg-surface rounded-genetic-lg">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-text-primary">Current Plan</h3>
                            <p className="text-text-secondary">Professional Plan</p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-primary">$200</div>
                            <div className="text-sm text-text-secondary">per month</div>
                          </div>
                        </div>
                        
                        <div className="flex space-x-4">
                          <Button variant="default" size="sm">
                            Upgrade Plan
                          </Button>
                          <Button variant="outline" size="sm">
                            View Usage
                          </Button>
                        </div>
                      </div>

                      {/* Payment Method */}
                      <div>
                        <h3 className="text-lg font-semibold text-text-primary mb-4">
                          Payment Method
                        </h3>
                        <div className="p-4 border border-border rounded-genetic-md">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <Icon name="CreditCard" size={20} className="text-text-secondary" />
                              <div>
                                <p className="font-medium text-text-primary">•••• •••• •••• 4242</p>
                                <p className="text-sm text-text-secondary">Expires 12/25</p>
                              </div>
                            </div>
                            <Button variant="outline" size="sm">
                              Update
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Billing History */}
                      <div>
                        <h3 className="text-lg font-semibold text-text-primary mb-4">
                          Billing History
                        </h3>
                        <div className="space-y-3">
                          {[
                            { date: '2024-01-01', amount: '$200.00', status: 'Paid' },
                            { date: '2023-12-01', amount: '$200.00', status: 'Paid' },
                            { date: '2023-11-01', amount: '$200.00', status: 'Paid' }
                          ].map((invoice, index) => (
                            <div key={index} className="flex items-center justify-between p-4 border border-border rounded-genetic-md">
                              <div>
                                <p className="font-medium text-text-primary">{invoice.amount}</p>
                                <p className="text-sm text-text-secondary">{invoice.date}</p>
                              </div>
                              <div className="flex items-center space-x-3">
                                <span className="px-2 py-1 bg-success/10 text-success text-sm rounded-full">
                                  {invoice.status}
                                </span>
                                <Button variant="ghost" size="sm" iconName="Download">
                                  Download
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'integrations' && (
                  <div>
                    <h2 className="text-2xl font-semibold text-text-primary mb-6">
                      Connected Integrations
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      {[
                        { name: 'Salesforce', status: 'Connected', icon: 'Users' },
                        { name: 'Slack', status: 'Connected', icon: 'MessageSquare' },
                        { name: 'Google Sheets', status: 'Disconnected', icon: 'FileSpreadsheet' },
                        { name: 'Stripe', status: 'Connected', icon: 'CreditCard' }
                      ].map((integration, index) => (
                        <div key={index} className="p-4 border border-border rounded-genetic-md">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-muted rounded-genetic-md flex items-center justify-center">
                                <Icon name={integration.icon} size={20} />
                              </div>
                              <div>
                                <h4 className="font-medium text-text-primary">{integration.name}</h4>
                                <p className={`text-sm ${
                                  integration.status === 'Connected' ? 'text-success' : 'text-text-secondary'
                                }`}>
                                  {integration.status}
                                </p>
                              </div>
                            </div>
                            <Button 
                              variant={integration.status === 'Connected' ? 'outline' : 'default'} 
                              size="sm"
                            >
                              {integration.status === 'Connected' ? 'Disconnect' : 'Connect'}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default Settings;