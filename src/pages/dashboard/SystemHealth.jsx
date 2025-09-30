import React from 'react';
import { Helmet } from 'react-helmet';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import SystemHealthDashboard from '../../components/admin/SystemHealthDashboard';

const SystemHealth = () => {
  return (
    <>
      <Helmet>
        <title>System Health - WorkflowGene Cloud Dashboard</title>
        <meta name="description" content="Monitor system health, performance metrics, and error logs." />
      </Helmet>
      
      <DashboardLayout>
        <SystemHealthDashboard />
      </DashboardLayout>
    </>
  );
};

export default SystemHealth;