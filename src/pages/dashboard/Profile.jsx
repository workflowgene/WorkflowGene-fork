import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Icon from '../../components/AppIcon';
import TwoFactorAuth from '../../components/auth/TwoFactorAuth';
import { useAuth } from '../../components/auth/AuthProvider';
import { updateProfile, updatePassword } from '../../lib/auth';
import toast from 'react-hot-toast';

const Profile = () => {
  const { profile, refreshProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [profileData, setProfileData] = useState({
    firstName: profile?.first_name || '',
    lastName: profile?.last_name || '',
    email: profile?.email || '',
    phone: profile?.phone || ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const tabs = [
    { id: 'profile', name: 'Profile Information', icon: 'User' },
    { id: 'security', name: 'Security', icon: 'Shield' },
    { id: 'preferences', name: 'Preferences', icon: 'Settings' }
  ];

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await updateProfile({
        first_name: profileData.firstName,
        last_name: profileData.lastName,
        phone: profileData.phone
      });

      if (result.success) {
        await refreshProfile();
        toast.success('Profile updated successfully');
      }
    } catch (error) {
      console.error('Profile update error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await updatePassword(passwordData.newPassword);
      
      if (result.success) {
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      }
    } catch (error) {
      console.error('Password update error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Profile - WorkflowGene Cloud Dashboard</title>
        <meta name="description" content="Manage your profile settings and account preferences." />
      </Helmet>
      
      <DashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-text-primary">Profile Settings</h1>
            <p className="text-text-secondary">
              Manage your account information and preferences
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-genetic-lg p-6 shadow-organic-sm">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">
                      {profile?.first_name?.[0]}{profile?.last_name?.[0]}
                    </span>
                  </div>
                  <h3 className="font-semibold text-text-primary">
                    {profile?.first_name} {profile?.last_name}
                  </h3>
                  <p className="text-sm text-text-secondary">
                    {profile?.role?.replace('_', ' ')?.replace(/\b\w/g, l => l.toUpperCase())}
                  </p>
                </div>

                <nav className="space-y-2">
                  {tabs.map((tab) => (
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
                {activeTab === 'profile' && (
                  <div>
                    <h2 className="text-2xl font-semibold text-text-primary mb-6">
                      Profile Information
                    </h2>
                    
                    <form onSubmit={handleProfileSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                          label="First Name"
                          type="text"
                          value={profileData.firstName}
                          onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                          required
                        />
                        
                        <Input
                          label="Last Name"
                          type="text"
                          value={profileData.lastName}
                          onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
                          required
                        />
                      </div>

                      <Input
                        label="Email Address"
                        type="email"
                        value={profileData.email}
                        disabled
                        description="Contact support to change your email address"
                      />

                      <Input
                        label="Phone Number"
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="+1 (555) 123-4567"
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

                {activeTab === 'security' && (
                  <div>
                    <h2 className="text-2xl font-semibold text-text-primary mb-6">
                      Security Settings
                    </h2>
                    
                    <div className="space-y-8">
                      {/* Change Password */}
                      <div>
                        <h3 className="text-lg font-medium text-text-primary mb-4">
                          Change Password
                        </h3>
                        
                        <form onSubmit={handlePasswordSubmit} className="space-y-4">
                          <Input
                            label="Current Password"
                            type="password"
                            value={passwordData.currentPassword}
                            onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                            required
                          />
                          
                          <Input
                            label="New Password"
                            type="password"
                            value={passwordData.newPassword}
                            onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                            required
                          />
                          
                          <Input
                            label="Confirm New Password"
                            type="password"
                            value={passwordData.confirmPassword}
                            onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                            required
                            error={passwordData.confirmPassword && passwordData.newPassword !== passwordData.confirmPassword ? 'Passwords do not match' : ''}
                          />
                          
                          <Button
                            type="submit"
                            variant="default"
                            loading={isSubmitting}
                            disabled={passwordData.newPassword !== passwordData.confirmPassword}
                            iconName="Lock"
                            iconPosition="left"
                          >
                            Update Password
                          </Button>
                        </form>
                      </div>

                      {/* Two-Factor Authentication */}
                      <div className="border-t border-border pt-8">
                        <TwoFactorAuth />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'preferences' && (
                  <div>
                    <h2 className="text-2xl font-semibold text-text-primary mb-6">
                      Preferences
                    </h2>
                    
                    <div className="space-y-6">
                      {/* Notification Preferences */}
                      <div>
                        <h3 className="text-lg font-medium text-text-primary mb-4">
                          Notification Preferences
                        </h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-4 bg-surface rounded-genetic-md">
                            <div>
                              <h4 className="font-medium text-text-primary">Email Notifications</h4>
                              <p className="text-sm text-text-secondary">
                                Receive workflow updates via email
                              </p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" defaultChecked />
                              <div className="relative w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                            </label>
                          </div>
                          
                          <div className="flex items-center justify-between p-4 bg-surface rounded-genetic-md">
                            <div>
                              <h4 className="font-medium text-text-primary">Push Notifications</h4>
                              <p className="text-sm text-text-secondary">
                                Receive real-time notifications in browser
                              </p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" defaultChecked />
                              <div className="relative w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* Theme Preference */}
                      <div>
                        <h3 className="text-lg font-medium text-text-primary mb-4">
                          Appearance
                        </h3>
                        <div className="p-4 bg-surface rounded-genetic-md">
                          <h4 className="font-medium text-text-primary mb-2">Theme</h4>
                          <p className="text-sm text-text-secondary mb-4">
                            Choose your preferred interface theme
                          </p>
                          <div className="flex space-x-4">
                            <button className="flex items-center space-x-2 p-3 border border-border rounded-genetic-md hover:border-primary">
                              <Icon name="Sun" size={16} />
                              <span>Light</span>
                            </button>
                            <button className="flex items-center space-x-2 p-3 border border-border rounded-genetic-md hover:border-primary">
                              <Icon name="Moon" size={16} />
                              <span>Dark</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                </div>
              )}
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default Profile;