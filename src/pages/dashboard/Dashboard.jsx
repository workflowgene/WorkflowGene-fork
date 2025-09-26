import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from '../../components/auth/AuthProvider';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import DashboardOverview from './components/DashboardOverview';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const Dashboard = () => {
  const { profile, isLoading } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return <LoadingSpinner message="Loading dashboard..." />;
  }

  return (
    <>
      <Helmet>
        <title>Dashboard - WorkflowGene Cloud</title>
        <meta name="description" content="Manage your workflows, analytics, and organization settings." />
      </Helmet>
      
      <DashboardLayout>
        <DashboardOverview />
      </DashboardLayout>
    </>
  );
};

export default Dashboard;