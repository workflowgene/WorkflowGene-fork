import React from 'react';
import { Helmet } from 'react-helmet';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import IntegrationMarketplace from '../../components/marketplace/IntegrationMarketplace';

const Integrations = () => {
  return (
    <>
      <Helmet>
        <title>Integrations - WorkflowGene Cloud Dashboard</title>
        <meta name="description" content="Manage your organization's integrations and connections." />
      </Helmet>
      
      <DashboardLayout>
        <IntegrationMarketplace />
      </DashboardLayout>
    </>
  );
};

export default Integrations;