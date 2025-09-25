import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const Security = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const securityFeatures = [
    {
      title: 'End-to-End Encryption',
      description: 'All data encrypted using AES-256 encryption in transit and at rest',
      icon: 'Lock'
    },
    {
      title: 'SOC 2 Type II Certified',
      description: 'Annual third-party security audits and compliance verification',
      icon: 'Shield'
    },
    {
      title: 'Multi-Factor Authentication',
      description: 'Required MFA with support for TOTP, SMS, and hardware keys',
      icon: 'Smartphone'
    },
    {
      title: 'Role-Based Access Control',
      description: 'Granular permissions and user role management',
      icon: 'Users'
    },
    {
      title: 'Audit Logging',
      description: 'Comprehensive activity logs for compliance and monitoring',
      icon: 'FileText'
    },
    {
      title: 'Data Residency',
      description: 'Choose where your data is stored and processed globally',
      icon: 'Globe'
    }
  ];

  const certifications = [
    {
      name: 'SOC 2 Type II',
      status: 'Certified',
      description: 'Security, availability, and confidentiality controls',
      validUntil: 'December 2024'
    },
    {
      name: 'GDPR Compliant',
      status: 'Compliant',
      description: 'European data protection regulation compliance',
      validUntil: 'Ongoing'
    },
    {
      name: 'HIPAA Ready',
      status: 'Ready',
      description: 'Healthcare data protection capabilities',
      validUntil: 'Ongoing'
    },
    {
      name: 'ISO 27001',
      status: 'In Progress',
      description: 'Information security management certification',
      validUntil: 'Expected Q2 2025'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Security - WorkflowGene Cloud | Enterprise-Grade Security</title>
        <meta name="description" content="Learn about WorkflowGene Cloud's enterprise-grade security features, compliance certifications, and data protection measures." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20">
            <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
              <div className="inline-flex items-center space-x-2 bg-success/10 text-success px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Icon name="Shield" size={16} />
                <span>Enterprise Security</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-text-primary mb-6">
                Security You Can Trust
              </h1>
              <p className="text-xl text-text-secondary mb-8">
                Enterprise-grade security and compliance built into every aspect of our platform
              </p>
              <Button variant="default" size="lg" className="btn-organic" iconName="Download">
                Download Security Whitepaper
              </Button>
            </div>
          </section>

          {/* Security Features */}
          <section className="py-20 bg-surface">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-text-primary text-center mb-12">Security Features</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {securityFeatures?.map((feature, index) => (
                  <div key={index} className="bg-card rounded-genetic-lg p-6 shadow-organic-sm">
                    <div className="w-12 h-12 bg-primary/10 rounded-genetic-md flex items-center justify-center mb-4">
                      <Icon name={feature?.icon} size={24} className="text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-text-primary mb-2">{feature?.title}</h3>
                    <p className="text-text-secondary">{feature?.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Certifications */}
          <section className="py-20 bg-background">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-text-primary text-center mb-12">Compliance & Certifications</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {certifications?.map((cert, index) => (
                  <div key={index} className="bg-card rounded-genetic-lg p-6 text-center shadow-organic-sm">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-4 ${
                      cert?.status === 'Certified' || cert?.status === 'Compliant' || cert?.status === 'Ready'
                        ? 'bg-success/10 text-success' :'bg-warning/10 text-warning'
                    }`}>
                      {cert?.status}
                    </div>
                    <h3 className="font-semibold text-text-primary mb-2">{cert?.name}</h3>
                    <p className="text-sm text-text-secondary mb-2">{cert?.description}</p>
                    <p className="text-xs text-text-secondary">{cert?.validUntil}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Security Team */}
          <section className="py-16 bg-surface">
            <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-bold text-text-primary mb-4">
                Security Questions?
              </h2>
              <p className="text-text-secondary mb-8">
                Our security team is available to answer any questions about our practices
              </p>
              <Button variant="default" size="lg" iconName="Mail" iconPosition="left">
                Contact Security Team
              </Button>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Security;