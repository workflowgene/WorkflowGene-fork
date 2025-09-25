import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';

const Terms = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Terms of Service - WorkflowGene Cloud</title>
        <meta name="description" content="WorkflowGene Cloud terms of service and user agreement." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          <section className="py-20">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-text-primary mb-4">Terms of Service</h1>
                <p className="text-text-secondary">Last updated: January 1, 2025</p>
              </div>

              <div className="prose prose-lg max-w-none">
                <div className="bg-card rounded-genetic-lg p-8 shadow-organic-sm">
                  <h2 className="text-2xl font-semibold text-text-primary mb-4">Acceptance of Terms</h2>
                  <p className="text-text-secondary mb-6">
                    By accessing and using WorkflowGene Cloud, you accept and agree to be bound by the 
                    terms and provision of this agreement.
                  </p>

                  <h2 className="text-2xl font-semibold text-text-primary mb-4">Use License</h2>
                  <p className="text-text-secondary mb-6">
                    Permission is granted to temporarily use WorkflowGene Cloud for personal and commercial use. 
                    This is the grant of a license, not a transfer of title.
                  </p>

                  <h2 className="text-2xl font-semibold text-text-primary mb-4">Service Availability</h2>
                  <p className="text-text-secondary mb-6">
                    We strive to maintain 99.9% uptime but cannot guarantee uninterrupted service. 
                    Scheduled maintenance will be announced in advance.
                  </p>

                  <div className="bg-warning/5 border-l-4 border-warning p-4 mt-8">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="AlertTriangle" size={16} className="text-warning" />
                      <span className="font-semibold text-warning">Important</span>
                    </div>
                    <p className="text-text-secondary">
                      These terms may be updated from time to time. Continued use of the service constitutes acceptance of any changes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Terms;