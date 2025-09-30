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

const Team = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteData, setInviteData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    role: 'user'
  });
  const { profile, getPermissions } = useAuth();
  const permissions = getPermissions();

  const roleOptions = [
    { value: 'user', label: 'User - Basic workflow access' },
    { value: 'manager', label: 'Manager - Workflow management' },
    { value: 'org_admin', label: 'Organization Admin - Full org access' }
  ];

  useEffect(() => {
    fetchTeamMembers();
  }, [profile]);

  const fetchTeamMembers = async () => {
    if (!profile?.organization_id) return;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('organization_id', profile.organization_id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTeamMembers(data || []);
    } catch (error) {
      console.error('Error fetching team members:', error);
      toast.error('Failed to load team members');
    } finally {
      setLoading(false);
    }
  };

  const handleInvite = async (e) => {
    e.preventDefault();
    
    try {
      // In a real implementation, this would send an invitation email
      // For now, we'll create a placeholder profile
      const { error } = await supabase
        .from('profiles')
        .insert({
          email: inviteData.email,
          first_name: inviteData.firstName,
          last_name: inviteData.lastName,
          role: inviteData.role,
          organization_id: profile.organization_id,
          email_verified: false
        });

      if (error) throw error;
      
      toast.success('Team member invited successfully');
      setShowInviteModal(false);
      setInviteData({ email: '', firstName: '', lastName: '', role: 'user' });
      fetchTeamMembers();
    } catch (error) {
      console.error('Error inviting team member:', error);
      toast.error('Failed to invite team member');
    }
  };

  const updateMemberRole = async (memberId, newRole) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole, updated_at: new Date().toISOString() })
        .eq('id', memberId);

      if (error) throw error;
      
      toast.success('Role updated successfully');
      fetchTeamMembers();
    } catch (error) {
      console.error('Error updating role:', error);
      toast.error('Failed to update role');
    }
  };

  const deactivateMember = async (memberId) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ is_active: false, updated_at: new Date().toISOString() })
        .eq('id', memberId);

      if (error) throw error;
      
      toast.success('Team member deactivated');
      fetchTeamMembers();
    } catch (error) {
      console.error('Error deactivating member:', error);
      toast.error('Failed to deactivate member');
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'org_admin': return 'bg-primary/10 text-primary';
      case 'manager': return 'bg-success/10 text-success';
      case 'user': return 'bg-muted text-text-secondary';
      default: return 'bg-muted text-text-secondary';
    }
  };

  const formatRole = (role) => {
    return role?.replace('_', ' ')?.replace(/\b\w/g, l => l.toUpperCase());
  };

  if (!permissions.canManageUsers) {
    return (
      <DashboardLayout>
        <div className="p-6 text-center">
          <Icon name="Users" size={48} className="text-error mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
          <p className="text-text-secondary">
            You don't have permission to manage team members.
          </p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <>
      <Helmet>
        <title>Team Management - WorkflowGene Cloud Dashboard</title>
        <meta name="description" content="Manage your organization's team members and roles." />
      </Helmet>
      
      <DashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-text-primary">Team Management</h1>
              <p className="text-text-secondary">
                Manage your organization's team members and their roles
              </p>
            </div>
            
            <Button
              variant="default"
              onClick={() => setShowInviteModal(true)}
              iconName="UserPlus"
              iconPosition="left"
              className="btn-organic"
            >
              Invite Team Member
            </Button>
          </div>

          {/* Team Members List */}
          <div className="bg-card rounded-genetic-lg shadow-organic-sm overflow-hidden">
            {loading ? (
              <div className="p-8 text-center">
                <Icon name="Loader2" size={32} className="animate-spin text-text-secondary mx-auto mb-4" />
                <p className="text-text-secondary">Loading team members...</p>
              </div>
            ) : teamMembers.length === 0 ? (
              <div className="p-8 text-center">
                <Icon name="Users" size={48} className="text-text-secondary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-text-primary mb-2">No team members yet</h3>
                <p className="text-text-secondary mb-6">
                  Invite your first team member to start collaborating
                </p>
                <Button
                  variant="default"
                  onClick={() => setShowInviteModal(true)}
                  iconName="UserPlus"
                  iconPosition="left"
                >
                  Invite Team Member
                </Button>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {teamMembers.map((member) => (
                  <div key={member.id} className="p-6 hover:bg-surface transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">
                            {member.first_name?.[0]}{member.last_name?.[0]}
                          </span>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-semibold text-text-primary">
                            {member.first_name} {member.last_name}
                          </h3>
                          <p className="text-text-secondary">{member.email}</p>
                          <div className="flex items-center space-x-3 mt-1">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(member.role)}`}>
                              {formatRole(member.role)}
                            </span>
                            {!member.email_verified && (
                              <span className="px-2 py-1 bg-warning/10 text-warning rounded-full text-xs">
                                Pending Verification
                              </span>
                            )}
                            {!member.is_active && (
                              <span className="px-2 py-1 bg-error/10 text-error rounded-full text-xs">
                                Inactive
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        {member.id !== profile.id && (
                          <>
                            <Select
                              options={roleOptions}
                              value={member.role}
                              onChange={(newRole) => updateMemberRole(member.id, newRole)}
                              className="w-48"
                            />
                            
                            {member.is_active ? (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => deactivateMember(member.id)}
                                iconName="UserX"
                              >
                                Deactivate
                              </Button>
                            ) : (
                              <Button
                                variant="default"
                                size="sm"
                                onClick={() => updateMemberRole(member.id, member.role)}
                                iconName="UserCheck"
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

          {/* Invite Modal */}
          {showInviteModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-card rounded-genetic-xl max-w-md w-full p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-text-primary">Invite Team Member</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowInviteModal(false)}
                    iconName="X"
                  />
                </div>

                <form onSubmit={handleInvite} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="First Name"
                      value={inviteData.firstName}
                      onChange={(e) => setInviteData(prev => ({ ...prev, firstName: e.target.value }))}
                      required
                    />
                    <Input
                      label="Last Name"
                      value={inviteData.lastName}
                      onChange={(e) => setInviteData(prev => ({ ...prev, lastName: e.target.value }))}
                      required
                    />
                  </div>
                  
                  <Input
                    label="Email Address"
                    type="email"
                    value={inviteData.email}
                    onChange={(e) => setInviteData(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                  
                  <Select
                    label="Role"
                    options={roleOptions}
                    value={inviteData.role}
                    onChange={(value) => setInviteData(prev => ({ ...prev, role: value }))}
                    required
                  />

                  <div className="flex space-x-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      fullWidth
                      onClick={() => setShowInviteModal(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="default"
                      fullWidth
                      iconName="Send"
                      iconPosition="left"
                    >
                      Send Invite
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </DashboardLayout>
    </>
  );
};

export default Team;