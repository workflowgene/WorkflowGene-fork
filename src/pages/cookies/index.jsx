import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';

const Cookies = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Cookie Policy - WorkflowGene Cloud</title>
        <meta name="description" content="WorkflowGene Cloud cookie policy and how we use cookies on our website." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          <section className="py-20">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-text-primary mb-4">Cookie Policy</h1>
                <p className="text-text-secondary">Last updated: January 1, 2025</p>
              </div>

              <div className="prose prose-lg max-w-none">
                <div className="bg-card rounded-genetic-lg p-8 shadow-organic-sm">
                  <h2 className="text-2xl font-semibold text-text-primary mb-4">What Are Cookies</h2>
                  <p className="text-text-secondary mb-6">
                    Cookies are small text files that are stored on your computer or mobile device when you visit our website. 
                    They help us provide you with a better experience by remembering your preferences and improving our services.
                  </p>

                  <h2 className="text-2xl font-semibold text-text-primary mb-4">How We Use Cookies</h2>
                  <p className="text-text-secondary mb-6">
                    We use cookies to analyze website traffic, personalize content, and improve user experience. 
                    We also use cookies for authentication and security purposes.
                  </p>

                  <h2 className="text-2xl font-semibold text-text-primary mb-4">Managing Cookies</h2>
                  <p className="text-text-secondary mb-6">
                    You can control and manage cookies through your browser settings. However, disabling cookies 
                    may affect the functionality of our website.
                  </p>

                  <div className="bg-primary/5 border-l-4 border-primary p-4 mt-8">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="Info" size={16} className="text-primary" />
                      <span className="font-semibold text-primary">Questions?</span>
                    </div>
                    <p className="text-text-secondary">
                      If you have questions about our cookie policy, contact us at privacy@workflowgene.cloud
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

export default Cookies;