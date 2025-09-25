import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';

const Privacy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Privacy Policy - WorkflowGene Cloud</title>
        <meta name="description" content="WorkflowGene Cloud privacy policy and data protection practices." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          <section className="py-20">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-text-primary mb-4">Privacy Policy</h1>
                <p className="text-text-secondary">Last updated: January 1, 2025</p>
              </div>

              <div className="prose prose-lg max-w-none">
                <div className="bg-card rounded-genetic-lg p-8 shadow-organic-sm">
                  <h2 className="text-2xl font-semibold text-text-primary mb-4">Information We Collect</h2>
                  <p className="text-text-secondary mb-6">
                    We collect information you provide directly to us, such as when you create an account, 
                    use our services, or contact us for support.
                  </p>

                  <h2 className="text-2xl font-semibold text-text-primary mb-4">How We Use Your Information</h2>
                  <p className="text-text-secondary mb-6">
                    We use the information we collect to provide, maintain, and improve our services, 
                    process transactions, and communicate with you.
                  </p>

                  <h2 className="text-2xl font-semibold text-text-primary mb-4">Data Security</h2>
                  <p className="text-text-secondary mb-6">
                    We implement appropriate technical and organizational measures to protect your personal 
                    information against unauthorized access, alteration, disclosure, or destruction.
                  </p>

                  <div className="bg-primary/5 border-l-4 border-primary p-4 mt-8">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="Info" size={16} className="text-primary" />
                      <span className="font-semibold text-primary">Contact Us</span>
                    </div>
                    <p className="text-text-secondary">
                      If you have questions about this privacy policy, please contact us at privacy@workflowgene.cloud
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

export default Privacy;