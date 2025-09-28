import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from '../../components/auth/AuthProvider';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import DashboardOverview from './components/DashboardOverview';
import IndustryDashboard from './components/IndustryDashboard';
import SystemHealthDashboard from '../../components/admin/SystemHealthDashboard';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const Dashboard = () => {
  const { user, profile, loading, initialized } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading || !initialized) {
    return <LoadingSpinner message="Loading dashboard..." />;
  }

  // Handle case: user exists but profile is missing
  if (user && !profile) {
    return (
      <DashboardLayout>
        <div className="p-6 text-center">
          <h2 className="text-xl font-semibold mb-2">Profile Setup</h2>
          <p className="text-text-secondary mb-4">
            Setting up your profile... Please wait a moment.
          </p>
          <div className="text-xs text-text-secondary">
            <p>User email: {user?.email}</p>
            <p>User ID: {user?.id}</p>
          </div>
          <LoadingSpinner />
        </div>
      </DashboardLayout>
    );
  }

  // Handle case: no user at all
  if (!user) {
    return (
      <DashboardLayout>
        <div className="p-6 text-center">
          <h2 className="text-xl font-semibold mb-2">Not signed in</h2>
          <p className="text-text-secondary">
            Please sign in to access your dashboard.
          </p>
        </div>
      </DashboardLayout>
    );
  }

  // Render dashboards based on profile role + organization industry
  const renderDashboardContent = () => {
    if (profile?.role === 'super_admin') {
      return <SystemHealthDashboard />;
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
