import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from '../../components/auth/AuthProvider';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import DashboardOverview from './components/DashboardOverview';
import IndustryDashboard from './components/IndustryDashboard';
import SystemHealthDashboard from '../../components/admin/SystemHealthDashboard';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const Dashboard = () => {
  const { user, profile, loading, initialized, error } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading || !initialized) {
    return <LoadingSpinner message="Loading dashboard..." />;
  }

  // Handle auth errors
  if (error) {
    return (
      <DashboardLayout>
        <div className="p-6 text-center">
          <Icon name="AlertCircle" size={48} className="text-error mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2 text-text-primary">Authentication Error</h2>
          <p className="text-text-secondary mb-4">{error}</p>
          <Button variant="default" onClick={() => window.location.reload()}>
            Retry
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  // Handle case: user exists but profile is missing
  if (user && !profile) {
    return (
      <DashboardLayout>
        <div className="p-6 text-center">
          <Icon name="User" size={48} className="text-warning mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Profile Setup</h2>
          <p className="text-text-secondary mb-4">
            Setting up your profile... Please wait a moment.
          </p>
          <div className="text-xs text-text-secondary">
            <p>User email: {user?.email}</p>
            <p>User ID: {user?.id}</p>
          </div>
          <div className="mt-4">
            <Icon name="Loader2" size={24} className="animate-spin text-primary mx-auto" />
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Handle case: no user at all
  if (!user) {
    return (
      <DashboardLayout>
        <div className="p-6 text-center">
          <Icon name="UserX" size={48} className="text-error mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Not signed in</h2>
          <p className="text-text-secondary">
            Please sign in to access your dashboard.
          </p>
          <Button 
            variant="default" 
            className="mt-4"
            onClick={() => window.location.href = '/login'}
          >
            Go to Login
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  // Render dashboards based on profile role + organization industry
  const renderDashboardContent = () => {
    console.log('Rendering dashboard for role:', profile?.role);
    
    if (profile?.role === 'super_admin') {
      return <DashboardOverview />;
    }

    const industry = profile?.organization?.industry || profile?.industry;
    if (industry && ['education', 'healthcare', 'ecommerce'].includes(industry)) {
      return <IndustryDashboard industry={industry} />;
    }

    return <DashboardOverview />;
  };

  return (
    <>
      <Helmet>
        <title>Dashboard - WorkflowGene Cloud</title>
        <meta
          name="description"
          content="Manage your workflows, analytics, and organization settings."
        />
      </Helmet>

      <DashboardLayout>
        {renderDashboardContent()}
      </DashboardLayout>
    </>
  );
};

export default Dashboard;
