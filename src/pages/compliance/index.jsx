import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const Compliance = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const complianceStandards = [
    {
      name: 'SOC 2 Type II',
      description: 'Security, availability, and confidentiality controls',
      status: 'Certified',
      validUntil: 'December 2024',
      icon: 'Shield'
    },
    {
      name: 'GDPR',
      description: 'European General Data Protection Regulation',
      status: 'Compliant',
      validUntil: 'Ongoing',
      icon: 'Globe'
    },
    {
      name: 'HIPAA',
      description: 'Health Insurance Portability and Accountability Act',
      status: 'Ready',
      validUntil: 'Ongoing',
      icon: 'Heart'
    },
    {
      name: 'ISO 27001',
      description: 'Information Security Management System',
      status: 'In Progress',
      validUntil: 'Expected Q2 2025',
      icon: 'Award'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Compliance - WorkflowGene Cloud | Security & Compliance Standards</title>
        <meta name="description" content="Learn about WorkflowGene Cloud's compliance with industry standards including SOC 2, GDPR, HIPAA, and ISO 27001." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20">
            <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
              <div className="inline-flex items-center space-x-2 bg-success/10 text-success px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Icon name="Shield" size={16} />
                <span>Compliance & Security</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-text-primary mb-6">
                Industry-Leading Compliance
              </h1>
              <p className="text-xl text-text-secondary mb-8">
                Meeting the highest standards for security, privacy, and data protection
              </p>
              <Button variant="default" size="lg" iconName="Download" iconPosition="left">
                Download Compliance Report
              </Button>
            </div>
          </section>

          {/* Compliance Standards */}
          <section className="py-20 bg-surface">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-text-primary text-center mb-12">Compliance Standards</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {complianceStandards?.map((standard, index) => (
                  <div key={index} className="bg-card rounded-genetic-lg p-8 shadow-organic-sm">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-genetic-md flex items-center justify-center flex-shrink-0">
                        <Icon name={standard?.icon} size={24} className="text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-semibold text-text-primary">{standard?.name}</h3>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            standard?.status === 'Certified' || standard?.status === 'Compliant' || standard?.status === 'Ready'
                              ? 'bg-success/10 text-success' :'bg-warning/10 text-warning'
                          }`}>
                            {standard?.status}
                          </span>
                        </div>
                        <p className="text-text-secondary mb-3">{standard?.description}</p>
                        <div className="text-sm text-text-secondary">
                          Valid until: {standard?.validUntil}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Compliance Team */}
          <section className="py-16 bg-background">
            <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-bold text-text-primary mb-4">
                Compliance Questions?
              </h2>
              <p className="text-text-secondary mb-8">
                Our compliance team is available to answer questions about our certifications and standards
              </p>
              <Button variant="default" size="lg" iconName="Mail" iconPosition="left">
                Contact Compliance Team
              </Button>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Compliance;