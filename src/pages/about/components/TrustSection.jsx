import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TrustSection = () => {
  const certifications = [
    {
      name: "SOC 2 Type II",
      description: "Comprehensive security and availability controls",
      icon: "Shield",
      status: "Certified",
      date: "Valid through Dec 2024"
    },
    {
      name: "HIPAA Compliant",
      description: "Healthcare data protection and privacy standards",
      icon: "Heart",
      status: "Compliant",
      date: "Continuously monitored"
    },
    {
      name: "GDPR Compliant",
      description: "European data protection regulation compliance",
      icon: "Globe",
      status: "Compliant",
      date: "Since May 2018"
    },
    {
      name: "ISO 27001",
      description: "Information security management system",
      icon: "Lock",
      status: "In Progress",
      date: "Expected Q2 2025"
    }
  ];

  const securityFeatures = [
    {
      title: "End-to-End Encryption",
      description: "All data encrypted in transit and at rest using AES-256",
      icon: "Key"
    },
    {
      title: "Multi-Factor Authentication",
      description: "Required for all user accounts with SAML/SSO support",
      icon: "Smartphone"
    },
    {
      title: "Regular Security Audits",
      description: "Quarterly penetration testing by third-party security firms",
      icon: "Search"
    },
    {
      title: "Data Residency Control",
      description: "Choose where your data is stored and processed globally",
      icon: "MapPin"
    },
    {
      title: "Audit Logging",
      description: "Comprehensive activity logs for compliance and monitoring",
      icon: "FileText"
    },
    {
      title: "Backup & Recovery",
      description: "Automated daily backups with 99.9% recovery guarantee",
      icon: "Database"
    }
  ];

  const awards = [
    {
      title: "Best Workflow Automation Platform",
      organization: "TechCrunch Disrupt 2024",
      image: "https://images.pexels.com/photos/8867482/pexels-photo-8867482.jpeg?w=200&h=100&fit=crop"
    },
    {
      title: "Enterprise Software Innovation Award",
      organization: "SaaS Awards 2024",
      image: "https://images.pexels.com/photos/8867434/pexels-photo-8867434.jpeg?w=200&h=100&fit=crop"
    },
    {
      title: "Customer Choice Award",
      organization: "G2 Winter 2024",
      image: "https://images.pexels.com/photos/8867464/pexels-photo-8867464.jpeg?w=200&h=100&fit=crop"
    }
  ];

  const partners = [
    {
      name: "Salesforce",
      logo: "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?w=120&h=60&fit=crop",
      type: "Integration Partner"
    },
    {
      name: "Microsoft",
      logo: "https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?w=120&h=60&fit=crop",
      type: "Technology Partner"
    },
    {
      name: "Google Cloud",
      logo: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?w=120&h=60&fit=crop",
      type: "Infrastructure Partner"
    },
    {
      name: "AWS",
      logo: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?w=120&h=60&fit=crop",
      type: "Cloud Partner"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Trust & Security
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Your data security and privacy are our top priorities. We maintain the highest standards of compliance, transparency, and security in everything we do.
          </p>
        </div>

        {/* Certifications */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-text-primary text-center mb-8">
            Compliance & Certifications
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications?.map((cert, index) => (
              <div key={index} className="card-organic bg-card p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-genetic-lg flex items-center justify-center mx-auto mb-4">
                  <Icon name={cert?.icon} size={24} className="text-primary" />
                </div>
                <h4 className="text-lg font-semibold text-text-primary mb-2">
                  {cert?.name}
                </h4>
                <p className="text-sm text-text-secondary mb-3">
                  {cert?.description}
                </p>
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                  cert?.status === 'Certified' || cert?.status === 'Compliant' 
                    ? 'bg-success/10 text-success' :'bg-warning/10 text-warning'
                }`}>
                  <Icon 
                    name={cert?.status === 'In Progress' ? 'Clock' : 'CheckCircle'} 
                    size={12} 
                    className="mr-1" 
                  />
                  {cert?.status}
                </div>
                <p className="text-xs text-text-secondary mt-2">
                  {cert?.date}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Security Features */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-text-primary text-center mb-8">
            Security Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {securityFeatures?.map((feature, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 bg-surface rounded-genetic-md">
                <div className="w-10 h-10 bg-primary/10 rounded-genetic-md flex items-center justify-center flex-shrink-0">
                  <Icon name={feature?.icon} size={18} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary mb-1">
                    {feature?.title}
                  </h4>
                  <p className="text-sm text-text-secondary">
                    {feature?.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Awards & Recognition */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-text-primary text-center mb-8">
            Awards & Recognition
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {awards?.map((award, index) => (
              <div key={index} className="card-organic bg-card p-6 text-center">
                <Image
                  src={award?.image}
                  alt={award?.title}
                  className="w-full h-24 object-cover rounded-genetic-md mb-4"
                />
                <h4 className="font-semibold text-text-primary mb-2">
                  {award?.title}
                </h4>
                <p className="text-sm text-text-secondary">
                  {award?.organization}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Partner Network */}
        <div className="bg-surface rounded-genetic-lg p-8">
          <h3 className="text-2xl font-bold text-text-primary text-center mb-8">
            Trusted Partners
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {partners?.map((partner, index) => (
              <div key={index} className="text-center">
                <div className="bg-card rounded-genetic-md p-4 mb-3 shadow-organic-sm">
                  <Image
                    src={partner?.logo}
                    alt={partner?.name}
                    className="w-full h-12 object-contain"
                  />
                </div>
                <h4 className="font-medium text-text-primary text-sm mb-1">
                  {partner?.name}
                </h4>
                <p className="text-xs text-text-secondary">
                  {partner?.type}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Security Team */}
        <div className="mt-16 text-center">
          <div className="bg-card rounded-genetic-lg p-8 shadow-organic-md max-w-2xl mx-auto">
            <Icon name="Shield" size={32} className="text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold text-text-primary mb-4">
              Security Questions?
            </h3>
            <p className="text-text-secondary mb-6">
              Our security team is available to answer any questions about our security practices, compliance, or data handling procedures.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:security@workflowgene.cloud"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-genetic-md hover:bg-primary/90 transition-colors duration-genetic-normal"
              >
                <Icon name="Mail" size={18} className="mr-2" />
                Contact Security Team
              </a>
              <a 
                href="/security-whitepaper.pdf"
                className="inline-flex items-center justify-center px-6 py-3 border border-border text-text-primary rounded-genetic-md hover:bg-muted transition-colors duration-genetic-normal"
              >
                <Icon name="Download" size={18} className="mr-2" />
                Download Security Whitepaper
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;