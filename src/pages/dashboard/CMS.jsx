import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import CMSBuilder from '../../components/cms/CMSBuilder';

const CMS = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>CMS Builder - WorkflowGene Cloud Dashboard</title>
        <meta name="description" content="Manage and edit website pages with the visual CMS builder." />
      </Helmet>
      
      <CMSBuilder />
    </>
  );
};

export default CMS;