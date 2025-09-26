import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import { useAuth } from '../auth/AuthProvider';
import { supabase } from '../../lib/supabase';

const ActivityFeed = ({ workflowId = null, limit = 10 }) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const { profile } = useAuth();

  useEffect(() => {
    fetchActivities();
    
    // Set up real-time subscription
    const subscription = supabase
      .channel('activity_feed')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'activity_logs',
        filter: workflowId ? `workflow_id=eq.${workflowId}` : `organization_id=eq.${profile?.organization_id}`
      }, () => {
        fetchActivities();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [workflowId, profile?.organization_id]);

  const fetchActivities = async () => {
    if (!profile?.organization_id) return;
    
    try {
      let query = supabase
        .from('activity_logs')
        .select(`
          *,
          user:profiles!activity_logs_user_id_fkey(first_name, last_name, avatar_url),
          workflow:workflows(name)
        `)
        .eq('organization_id', profile.organization_id)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (workflowId) {
        query = query.eq('workflow_id', workflowId);
      }

      const { data, error } = await query;
      
      if (error) throw error;
      setActivities(data || []);
    } catch (error) {
      console.error('Error fetching activities:', error);
    } finally {
      setLoading(false);
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'workflow_created': return 'Plus';
      case 'workflow_updated': return 'Edit';
      case 'workflow_executed': return 'Play';
      case 'workflow_paused': return 'Pause';
      case 'workflow_deleted': return 'Trash2';
      case 'user_joined': return 'UserPlus';
      case 'user_left': return 'UserMinus';
      case 'integration_added': return 'Link';
      case 'integration_removed': return 'Unlink';
      default: return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'workflow_created': return 'text-success';
      case 'workflow_updated': return 'text-primary';
      case 'workflow_executed': return 'text-success';
      case 'workflow_paused': return 'text-warning';
      case 'workflow_deleted': return 'text-error';
      case 'user_joined': return 'text-success';
      case 'user_left': return 'text-warning';
      case 'integration_added': return 'text-primary';
      case 'integration_removed': return 'text-error';
      default: return 'text-text-secondary';
    }
  };

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
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-start space-x-3 animate-pulse">
            <div className="w-8 h-8 bg-muted rounded-full"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-3 bg-muted rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {activities.length === 0 ? (
        <div className="text-center py-8">
          <Icon name="Activity" size={48} className="text-text-secondary mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-text-primary mb-2">No activity yet</h3>
          <p className="text-text-secondary">
            Activity will appear here as your team works on workflows
          </p>
        </div>
      ) : (
        activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3 p-4 hover:bg-surface rounded-genetic-md transition-colors">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              activity.type.includes('created') || activity.type.includes('executed') ? 'bg-success/10' :
              activity.type.includes('updated') ? 'bg-primary/10' :
              activity.type.includes('paused') || activity.type.includes('left') ? 'bg-warning/10' :
              activity.type.includes('deleted') || activity.type.includes('removed') ? 'bg-error/10' :
              'bg-muted'
            }`}>
              <Icon 
                name={getActivityIcon(activity.type)} 
                size={16} 
                className={getActivityColor(activity.type)} 
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <span className="font-medium text-text-primary">
                  {activity.user?.first_name} {activity.user?.last_name}
                </span>
                <span className="text-text-secondary">
                  {activity.action}
                </span>
                {activity.workflow && (
                  <span className="text-primary font-medium">
                    {activity.workflow.name}
                  </span>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <p className="text-sm text-text-secondary">
                  {activity.description}
                </p>
                <span className="text-xs text-text-secondary">
                  {formatTimeAgo(activity.created_at)}
                </span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ActivityFeed;