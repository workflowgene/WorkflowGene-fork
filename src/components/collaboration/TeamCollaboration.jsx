import React, { useState, useEffect } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Icon from '../AppIcon';
import ActivityFeed from './ActivityFeed';
import { useAuth } from '../auth/AuthProvider';
import { supabase } from '../../lib/supabase';
import toast from 'react-hot-toast';

const TeamCollaboration = () => {
  const [activeUsers, setActiveUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [showActivityFeed, setShowActivityFeed] = useState(true);
  const { profile } = useAuth();

  useEffect(() => {
    fetchActiveUsers();
    fetchComments();
    
    // Set up presence tracking
    const channel = supabase.channel('team_collaboration', {
      config: {
        presence: {
          key: profile?.id,
        },
      },
    });

    channel
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState();
        const users = Object.values(state).flat();
        setActiveUsers(users);
      })
      .on('presence', { event: 'join' }, ({ key, newPresences }) => {
        console.log('User joined:', newPresences);
      })
      .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
        console.log('User left:', leftPresences);
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({
            user_id: profile?.id,
            name: `${profile?.first_name} ${profile?.last_name}`,
            avatar_url: profile?.avatar_url,
            online_at: new Date().toISOString(),
          });
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [profile]);

  const fetchActiveUsers = async () => {
    if (!profile?.organization_id) return;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, first_name, last_name, avatar_url, last_login')
        .eq('organization_id', profile.organization_id)
        .gte('last_login', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()) // Last 24 hours
        .order('last_login', { ascending: false });

      if (error) throw error;
      setActiveUsers(data || []);
    } catch (error) {
      console.error('Error fetching active users:', error);
    }
  };

  const fetchComments = async () => {
    if (!profile?.organization_id) return;
    
    try {
      const { data, error } = await supabase
        .from('collaboration_comments')
        .select(`
          *,
          user:profiles!collaboration_comments_user_id_fkey(first_name, last_name, avatar_url)
        `)
        .eq('organization_id', profile.organization_id)
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      setComments(data || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const addComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const { error } = await supabase
        .from('collaboration_comments')
        .insert({
          organization_id: profile.organization_id,
          user_id: profile.id,
          content: newComment.trim(),
          type: 'general'
        });

      if (error) throw error;
      
      setNewComment('');
      fetchComments();
      toast.success('Comment added');
    } catch (error) {
      console.error('Error adding comment:', error);
      toast.error('Failed to add comment');
    }
  };

  return (
    <div className="bg-card rounded-genetic-lg shadow-organic-sm">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-text-primary">Team Collaboration</h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="flex -space-x-2">
                {activeUsers.slice(0, 5).map((user) => (
                  <div
                    key={user.id}
                    className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center border-2 border-background"
                    title={`${user.first_name} ${user.last_name}`}
                  >
                    {user.avatar_url ? (
                      <img src={user.avatar_url} alt="" className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <span className="text-white text-xs font-medium">
                        {user.first_name?.[0]}{user.last_name?.[0]}
                      </span>
                    )}
                  </div>
                ))}
              </div>
              {activeUsers.length > 5 && (
                <span className="text-sm text-text-secondary">
                  +{activeUsers.length - 5} more
                </span>
              )}
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowActivityFeed(!showActivityFeed)}
              iconName={showActivityFeed ? 'ChevronUp' : 'ChevronDown'}
            />
          </div>
        </div>
      </div>

      {showActivityFeed && (
        <div className="p-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Activity Feed */}
            <div>
              <h4 className="font-semibold text-text-primary mb-4">Recent Activity</h4>
              <div className="max-h-96 overflow-y-auto">
                <ActivityFeed workflowId={workflowId} limit={limit} />
              </div>
            </div>

            {/* Team Comments */}
            <div>
              <h4 className="font-semibold text-text-primary mb-4">Team Discussion</h4>
              
              {/* Add Comment */}
              <form onSubmit={addComment} className="mb-4">
                <div className="flex space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-medium">
                      {profile?.first_name?.[0]}{profile?.last_name?.[0]}
                    </span>
                  </div>
                  <div className="flex-1">
                    <Input
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Add a comment..."
                      className="mb-2"
                    />
                    <div className="flex justify-end">
                      <Button
                        type="submit"
                        variant="default"
                        size="sm"
                        disabled={!newComment.trim()}
                        iconName="Send"
                        iconPosition="left"
                      >
                        Comment
                      </Button>
                    </div>
                  </div>
                </div>
              </form>

              {/* Comments List */}
              <div className="space-y-4 max-h-64 overflow-y-auto">
                {comments.length === 0 ? (
                  <div className="text-center py-8">
                    <Icon name="MessageSquare" size={32} className="text-text-secondary mx-auto mb-2" />
                    <p className="text-text-secondary text-sm">No comments yet</p>
                  </div>
                ) : (
                  comments.map((comment) => (
                    <div key={comment.id} className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center flex-shrink-0">
                        {comment.user?.avatar_url ? (
                          <img src={comment.user.avatar_url} alt="" className="w-full h-full rounded-full object-cover" />
                        ) : (
                          <span className="text-white text-xs font-medium">
                            {comment.user?.first_name?.[0]}{comment.user?.last_name?.[0]}
                          </span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-text-primary text-sm">
                            {comment.user?.first_name} {comment.user?.last_name}
                          </span>
                          <span className="text-xs text-text-secondary">
                            {formatTimeAgo(comment.created_at)}
                          </span>
                        </div>
                        <p className="text-sm text-text-secondary">
                          {comment.content}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  function formatTimeAgo(timestamp) {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  }
};

export default TeamCollaboration;