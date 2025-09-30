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

const Organizations = () => {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const { profile, getPermissions } = useAuth();
  const permissions = getPermissions();

  const industryOptions = [
    { value: 'all', label: 'All Industries' },
    { value: 'technology', label: 'Technology' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'education', label: 'Education' },
    { value: 'finance', label: 'Finance' },
    { value: 'ecommerce', label: 'E-Commerce' },
    { value: 'manufacturing', label: 'Manufacturing' }
  ];

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const fetchOrganizations = async () => {
    try {
      const { data, error } = await supabase
        .from('organizations')
        .select(`
          *,
          member_count:profiles(count),
          workflow_count:workflows(count),
          subscription:billing_subscriptions(plan_name, status)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrganizations(data || []);
    } catch (error) {
      console.error('Error fetching organizations:', error);
      toast.error('Failed to load organizations');
    } finally {
      setLoading(false);
    }
  };

  const filteredOrganizations = organizations.filter(org => {
    const matchesSearch = org.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = selectedIndustry === 'all' || org.industry === selectedIndustry;
    return matchesSearch && matchesIndustry;
  });

  if (profile?.role !== 'super_admin') {
    return (
      <DashboardLayout>
        <div className="p-6 text-center">
          <Icon name="Building2" size={48} className="text-error mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
          <p className="text-text-secondary">
            Only super administrators can manage organizations.
          </p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <>
      <Helmet>
        <title>Organizations - WorkflowGene Cloud Dashboard</title>
        <meta name="description" content="Manage all organizations on the platform." />
      </Helmet>
      
      <DashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-text-primary">Organizations</h1>
              <p className="text-text-secondary">
                Manage all organizations on the platform
              </p>
            </div>
            
            <Button
              variant="default"
              iconName="Plus"
              iconPosition="left"
              className="btn-organic"
            >
              Create Organization
            </Button>
          </div>

          {/* Filters */}
          <div className="bg-card rounded-genetic-lg p-6 shadow-organic-sm">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <Input
                  type="search"
                  placeholder="Search organizations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="w-full lg:w-48">
                <Select
                  options={industryOptions}
                  value={selectedIndustry}
                  onChange={setSelectedIndustry}
                  placeholder="Filter by industry"
                />
              </div>
            </div>
          </div>

          {/* Organizations List */}
          <div className="bg-card rounded-genetic-lg shadow-organic-sm overflow-hidden">
            {loading ? (
              <div className="p-8 text-center">
                <Icon name="Loader2" size={32} className="animate-spin text-text-secondary mx-auto mb-4" />
                <p className="text-text-secondary">Loading organizations...</p>
              </div>
            ) : filteredOrganizations.length === 0 ? (
              <div className="p-8 text-center">
                <Icon name="Building2" size={48} className="text-text-secondary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-text-primary mb-2">No organizations found</h3>
                <p className="text-text-secondary">
                  {organizations.length === 0 ? 'No organizations have been created yet' : 'Try adjusting your search criteria'}
                </p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {filteredOrganizations.map((org) => (
                  <div key={org.id} className="p-6 hover:bg-surface transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-text-primary">
                            {org.name}
                          </h3>
                          {org.industry && (
                            <span className="px-2 py-1 bg-primary/10 text-primary text-sm rounded-full">
                              {org.industry}
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-6 text-sm text-text-secondary mb-3">
                          <div className="flex items-center space-x-1">
                            <Icon name="Users" size={14} />
                            <span>{org.member_count?.[0]?.count || 0} members</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Icon name="Workflow" size={14} />
                            <span>{org.workflow_count?.[0]?.count || 0} workflows</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Icon name="Calendar" size={14} />
                            <span>Created {new Date(org.created_at).toLocaleDateString()}</span>
                          </div>
                        </div>

                        {org.subscription?.[0] && (
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-text-secondary">Plan:</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              org.subscription[0].status === 'active' ? 'bg-success/10 text-success' :
                              org.subscription[0].status === 'trialing' ? 'bg-warning/10 text-warning' :
                              'bg-error/10 text-error'
                            }`}>
                              {org.subscription[0].plan_name} ({org.subscription[0].status})
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" iconName="Eye">
                          View
                        </Button>
                        <Button variant="ghost" size="sm" iconName="Edit">
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm" iconName="MoreVertical" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default Organizations;