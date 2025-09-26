import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from '../../components/auth/AuthProvider';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import DashboardOverview from './components/DashboardOverview';
import IndustryDashboard from './components/IndustryDashboard';
import SystemHealthDashboard from '../../components/admin/SystemHealthDashboard';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const Dashboard = () => {
  const { profile, isLoading } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return <LoadingSpinner message="Loading dashboard..." />;
  }

  // Render different dashboards based on user role and organization industry
  const renderDashboardContent = () => {
    if (profile?.role === 'super_admin') {
      return <SystemHealthDashboard />;
    }
    
    const industry = profile?.organization?.industry;
    if (industry && ['education', 'healthcare', 'ecommerce'].includes(industry)) {
      return <IndustryDashboard industry={industry} />;
    }
    
    return <DashboardOverview />;
  };

  return (
    <>
      <Helmet>
        <title>Dashboard - WorkflowGene Cloud</title>
        <meta name="description" content="Manage your workflows, analytics, and organization settings." />
      </Helmet>
      
      <DashboardLayout>
        {renderDashboardContent()}
      </DashboardLayout>
    </>
  );
};

export default Dashboard;