import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { useAuth } from '../../../components/auth/AuthProvider';
import { supabase } from '../../../lib/supabase';

const DashboardOverview = () => {
  const { profile, getPermissions } = useAuth();
  const [stats, setStats] = useState({
    workflows: 0,
    executions: 0,
    timeSaved: 0,
    efficiency: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const permissions = getPermissions();

  useEffect(() => {
    fetchDashboardData();
  }, [profile]);

  const fetchDashboardData = async () => {
    if (!profile) return;
    
    try {
      // Fetch workflow stats
      const { data: workflows, error: workflowError } = await supabase
        .from('workflows')
        .select('id, execution_count, status')
        .eq('organization_id', profile.organization_id);

      if (workflowError) throw workflowError;

      // Calculate stats
      const activeWorkflows = workflows?.filter(w => w.status === 'active')?.length || 0;
      const totalExecutions = workflows?.reduce((sum, w) => sum + (w.execution_count || 0), 0) || 0;
      
      setStats({
        workflows: activeWorkflows,
        executions: totalExecutions,
        timeSaved: Math.floor(totalExecutions * 2.5), // Estimate 2.5 minutes saved per execution
        efficiency: Math.min(95, 60 + (activeWorkflows * 5)) // Base 60% + 5% per workflow
      });

      // Mock recent activity for now
      setRecentActivity([
        {
          id: 1,
          type: 'workflow',
          title: 'Order Processing workflow completed',
          description: 'Successfully processed 25 orders',
          timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
          icon: 'CheckCircle',
          color: 'text-success'
        },
        {
          id: 2,
          type: 'user',
          title: 'New team member added',
          description: 'Sarah Johnson joined your organization',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
          icon: 'UserPlus',
          color: 'text-primary'
        },
        {
          id: 3,
          type: 'system',
          title: 'System maintenance completed',
          description: 'All systems are running optimally',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
          icon: 'Settings',
          color: 'text-warning'
        }
      ]);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    {
      title: 'Create Workflow',
      description: 'Build a new automation workflow',
      icon: 'Plus',
      path: '/dashboard/workflows/new',
      color: 'bg-primary'
    },
    {
      title: 'View Analytics',
      description: 'Check your automation performance',
      icon: 'BarChart3',
      path: '/dashboard/analytics',
      color: 'bg-success'
    },
    {
      title: 'Manage Team',
      description: 'Invite and manage team members',
      icon: 'Users',
      path: '/dashboard/users',
      color: 'bg-accent',
      requiresRole: ['super_admin', 'org_admin']
    },
    {
      title: 'Browse Templates',
      description: 'Explore workflow templates',
      icon: 'FileTemplate',
      path: '/templates',
      color: 'bg-warning'
    }
  ];

  const filteredQuickActions = quickActions.filter(action => 
    !action.requiresRole || action.requiresRole.includes(profile?.role)
  );

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-card rounded-genetic-lg p-6 animate-pulse">
              <div className="w-8 h-8 bg-muted rounded-genetic-md mb-4"></div>
              <div className="h-4 bg-muted rounded mb-2"></div>
              <div className="h-6 bg-muted rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-genetic-xl p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              Welcome back, {profile?.first_name}!
            </h1>
            <p className="text-text-secondary">
              Here's what's happening with your automation workflows today.
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
              <Icon name="Zap" size={32} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-card rounded-genetic-lg p-6 shadow-organic-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-genetic-md flex items-center justify-center">
              <Icon name="Workflow" size={24} className="text-primary" />
            </div>
            <Icon name="TrendingUp" size={16} className="text-success" />
          </div>
          <div className="text-2xl font-bold text-text-primary mb-1">{stats.workflows}</div>
          <div className="text-sm text-text-secondary">Active Workflows</div>
        </div>

        <div className="bg-card rounded-genetic-lg p-6 shadow-organic-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-success/10 rounded-genetic-md flex items-center justify-center">
              <Icon name="Play" size={24} className="text-success" />
            </div>
            <Icon name="TrendingUp" size={16} className="text-success" />
          </div>
          <div className="text-2xl font-bold text-text-primary mb-1">{stats.executions.toLocaleString()}</div>
          <div className="text-sm text-text-secondary">Total Executions</div>
        </div>

        <div className="bg-card rounded-genetic-lg p-6 shadow-organic-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-warning/10 rounded-genetic-md flex items-center justify-center">
              <Icon name="Clock" size={24} className="text-warning" />
            </div>
            <Icon name="TrendingUp" size={16} className="text-success" />
          </div>
          <div className="text-2xl font-bold text-text-primary mb-1">{stats.timeSaved}h</div>
          <div className="text-sm text-text-secondary">Time Saved</div>
        </div>

        <div className="bg-card rounded-genetic-lg p-6 shadow-organic-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-accent/10 rounded-genetic-md flex items-center justify-center">
              <Icon name="Target" size={24} className="text-accent" />
            </div>
            <Icon name="TrendingUp" size={16} className="text-success" />
          </div>
          <div className="text-2xl font-bold text-text-primary mb-1">{stats.efficiency}%</div>
          <div className="text-sm text-text-secondary">Efficiency Score</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <div className="bg-card rounded-genetic-lg p-6 shadow-organic-sm">
            <h2 className="text-xl font-semibold text-text-primary mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredQuickActions.map((action, index) => (
                <div
                  key={index}
                  className="p-4 border border-border rounded-genetic-md hover:shadow-organic-sm transition-all duration-genetic-normal cursor-pointer group"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 ${action.color} rounded-genetic-md flex items-center justify-center group-hover:scale-110 transition-transform duration-genetic-normal`}>
                      <Icon name={action.icon} size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-text-primary group-hover:text-primary transition-colors">
                        {action.title}
                      </h3>
                      <p className="text-sm text-text-secondary">
                        {action.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-card rounded-genetic-lg p-6 shadow-organic-sm">
          <h2 className="text-xl font-semibold text-text-primary mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  activity.type === 'workflow' ? 'bg-success/10' :
                  activity.type === 'user' ? 'bg-primary/10' :
                  'bg-warning/10'
                }`}>
                  <Icon name={activity.icon} size={16} className={activity.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-text-primary">
                    {activity.title}
                  </h4>
                  <p className="text-sm text-text-secondary">
                    {activity.description}
                  </p>
                  <p className="text-xs text-text-secondary mt-1">
                    {formatTimeAgo(activity.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <Button variant="outline" size="sm" fullWidth className="mt-4">
            View All Activity
          </Button>
        </div>
      </div>

      {/* Getting Started */}
      {stats.workflows === 0 && (
        <div className="bg-card rounded-genetic-lg p-8 shadow-organic-sm">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="Rocket" size={32} className="text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
              {profile?.role === 'super_admin' 
                ? 'Welcome to the super admin dashboard. Manage the entire platform from here.'
                : 'Create your first workflow to begin automating your business processes. Choose from our template library or build from scratch.'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {profile?.role === 'super_admin' ? (
                <>
                  <Button 
                    variant="default" 
                    size="lg"
                    iconName="Activity"
                    iconPosition="left"
                    className="btn-organic"
                    onClick={() => window.location.href = '/dashboard/system-health'}
                  >
                    View System Health
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    iconName="Layout"
                    iconPosition="left"
                    onClick={() => window.location.href = '/dashboard/cms'}
                  >
                    Manage Website
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="default" 
                    size="lg"
                    iconName="Plus"
                    iconPosition="left"
                    className="btn-organic"
                  >
                    Create First Workflow
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    iconName="FileTemplate"
                    iconPosition="left"
                  >
                    Browse Templates
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardOverview;