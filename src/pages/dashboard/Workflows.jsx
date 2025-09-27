import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Icon from '../../components/AppIcon';
import WorkflowBuilder from '../../components/workflow/WorkflowBuilder';
import TeamCollaboration from '../../components/collaboration/TeamCollaboration';
import { useAuth } from '../../components/auth/AuthProvider';
import { supabase } from '../../lib/supabase';

const Workflows = () => {
  const [workflows, setWorkflows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showBuilder, setShowBuilder] = useState(false);
  const [editingWorkflow, setEditingWorkflow] = useState(null);
  const [showCollaboration, setShowCollaboration] = useState(false);
  const { profile, getPermissions } = useAuth();
  const permissions = getPermissions();

  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'draft', label: 'Draft' },
    { value: 'active', label: 'Active' },
    { value: 'paused', label: 'Paused' },
    { value: 'archived', label: 'Archived' }
  ];

  useEffect(() => {
    fetchWorkflows();
  }, [profile]);

  const fetchWorkflows = async () => {
    if (!profile?.organization_id) return;
    
    try {
      let query = supabase
        .from('workflows')
        .select(`
          *,
          created_by:profiles!workflows_created_by_fkey(first_name, last_name)
        `)
        .eq('organization_id', profile.organization_id)
        .order('created_at', { ascending: false });

      // If user role, only show assigned workflows
      if (profile.role === 'user') {
        query = query.contains('assigned_to', [profile.id]);
      }

      const { data, error } = await query;
      
      if (error) throw error;
      setWorkflows(data || []);
    } catch (error) {
      console.error('Error fetching workflows:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredWorkflows = workflows.filter(workflow => {
    const matchesSearch = workflow.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workflow.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || workflow.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success bg-success/10';
      case 'paused': return 'text-warning bg-warning/10';
      case 'draft': return 'text-text-secondary bg-muted';
      case 'archived': return 'text-error bg-error/10';
      default: return 'text-text-secondary bg-muted';
    }
  };

  const handleStatusChange = async (workflowId, newStatus) => {
    try {
      const { error } = await supabase
        .from('workflows')
        .update({ 
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', workflowId);

      if (error) throw error;

      setWorkflows(prev => 
        prev.map(w => w.id === workflowId ? { ...w, status: newStatus } : w)
      );
    } catch (error) {
      console.error('Error updating workflow status:', error);
    }
  };

  const handleCreateWorkflow = () => {
    setEditingWorkflow(null);
    setShowBuilder(true);
  };

  const handleEditWorkflow = (workflow) => {
    setEditingWorkflow(workflow);
    setShowBuilder(true);
  };

  const handleSaveWorkflow = () => {
    setShowBuilder(false);
    setEditingWorkflow(null);
    fetchWorkflows();
  };
  return (
    <>
      <Helmet>
        <title>Workflows - WorkflowGene Cloud Dashboard</title>
        <meta name="description" content="Manage your automation workflows and monitor their performance." />
      </Helmet>
      
      <DashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-text-primary">Workflows</h1>
              <p className="text-text-secondary">
                Manage and monitor your automation workflows
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowCollaboration(!showCollaboration)}
                iconName="Users"
                iconPosition="left"
              >
                Team Activity
              </Button>
              
              {permissions.canManageWorkflows && (
                <Button
                  variant="default"
                  onClick={handleCreateWorkflow}
                  iconName="Plus"
                  iconPosition="left"
                  className="btn-organic"
                >
                  Create Workflow
                </Button>
              )}
            </div>
          </div>

          {/* Team Collaboration */}
          {showCollaboration && (
            <TeamCollaboration workflowId={null} limit={10} />
          )}
          {/* Filters */}
          <div className="bg-card rounded-genetic-lg p-6 shadow-organic-sm">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <Input
                  type="search"
                  placeholder="Search workflows..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="w-full lg:w-48">
                <Select
                  options={statusOptions}
                  value={statusFilter}
                  onChange={setStatusFilter}
                  placeholder="Filter by status"
                />
              </div>
            </div>
          </div>

          {/* Workflows List */}
          <div className="bg-card rounded-genetic-lg shadow-organic-sm overflow-hidden">
            {loading ? (
              <div className="p-8 text-center">
                <Icon name="Loader2" size={32} className="animate-spin text-text-secondary mx-auto mb-4" />
                <p className="text-text-secondary">Loading workflows...</p>
              </div>
            ) : filteredWorkflows.length === 0 ? (
              <div className="p-8 text-center">
                <Icon name="Workflow" size={48} className="text-text-secondary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  {workflows.length === 0 ? 'No workflows yet' : 'No workflows found'}
                </h3>
                <p className="text-text-secondary mb-6">
                  {workflows.length === 0 
                    ? 'Create your first workflow to start automating your processes'
                    : 'Try adjusting your search or filter criteria'
                  }
                </p>
                {workflows.length === 0 && permissions.canManageWorkflows && (
                  <Button variant="default" onClick={handleCreateWorkflow} iconName="Plus" iconPosition="left">
                    Create First Workflow
                  </Button>
                )}
              </div>
            ) : (
              <div className="divide-y divide-border">
                {filteredWorkflows.map((workflow) => (
                  <div key={workflow.id} className="p-6 hover:bg-surface transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-text-primary">
                            {workflow.name}
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(workflow.status)}`}>
                            {workflow.status.charAt(0).toUpperCase() + workflow.status.slice(1)}
                          </span>
                        </div>
                        
                        <p className="text-text-secondary mb-3">
                          {workflow.description || 'No description provided'}
                        </p>
                        
                        <div className="flex items-center space-x-6 text-sm text-text-secondary">
                          <div className="flex items-center space-x-1">
                            <Icon name="Play" size={14} />
                            <span>{workflow.execution_count || 0} executions</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Icon name="User" size={14} />
                            <span>
                              Created by {workflow.created_by?.first_name} {workflow.created_by?.last_name}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Icon name="Calendar" size={14} />
                            <span>{new Date(workflow.created_at).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 ml-4">
                        {permissions.canManageWorkflows && (
                          <>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              iconName="Edit"
                              onClick={() => handleEditWorkflow(workflow)}
                            >
                              Edit
                            </Button>
                            
                            {workflow.status === 'active' ? (
                              <Button 
                                variant="outline" 
                                size="sm" 
                                iconName="Pause"
                                onClick={() => handleStatusChange(workflow.id, 'paused')}
                              >
                                Pause
                              </Button>
                            ) : workflow.status === 'paused' ? (
                              <Button 
                                variant="default" 
                                size="sm" 
                                iconName="Play"
                                onClick={() => handleStatusChange(workflow.id, 'active')}
                              >
                                Resume
                              </Button>
                            ) : (
                              <Button 
                                variant="default" 
                                size="sm" 
                                iconName="Play"
                                onClick={() => handleStatusChange(workflow.id, 'active')}
                              >
                                Activate
                              </Button>
                            )}
                          </>
                        )}
                        
                        <Button variant="ghost" size="sm" iconName="MoreVertical" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Workflow Builder Modal */}
        {showBuilder && (
          <WorkflowBuilder
            workflowId={editingWorkflow?.id}
            onSave={handleSaveWorkflow}
            onClose={() => setShowBuilder(false)}
          />
        )}
      </DashboardLayout>
    </>
  );
};

export default Workflows;