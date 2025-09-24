import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ComplianceSection = () => {
  const complianceData = [
    {
      industry: 'Healthcare',
      icon: 'Heart',
      color: 'bg-red-500',
      certifications: [
        { name: 'HIPAA', description: 'Health Insurance Portability and Accountability Act compliance' },
        { name: 'SOC 2 Type II', description: 'Security, availability, and confidentiality controls' },
        { name: 'HITECH', description: 'Health Information Technology for Economic and Clinical Health' },
        { name: 'FDA 21 CFR Part 11', description: 'Electronic records and signatures validation' }
      ],
      features: [
        'End-to-end encryption',
        'Audit trail logging',
        'Access controls',
        'Data anonymization'
      ]
    },
    {
      industry: 'Education',
      icon: 'GraduationCap',
      color: 'bg-blue-500',
      certifications: [
        { name: 'FERPA', description: 'Family Educational Rights and Privacy Act compliance' },
        { name: 'COPPA', description: 'Children\'s Online Privacy Protection Act adherence' },
        { name: 'SOC 2 Type II', description: 'Security and privacy controls verification' },
        { name: 'ISO 27001', description: 'Information security management standards' }
      ],
      features: [
        'Student data protection',
        'Consent management',
        'Secure data sharing',
        'Privacy by design'
      ]
    },
    {
      industry: 'E-Commerce',
      icon: 'ShoppingCart',
      color: 'bg-green-500',
      certifications: [
        { name: 'PCI DSS', description: 'Payment Card Industry Data Security Standard' },
        { name: 'GDPR', description: 'General Data Protection Regulation compliance' },
        { name: 'SOC 2 Type II', description: 'Security and availability controls' },
        { name: 'ISO 27001', description: 'Information security management certification' }
      ],
      features: [
        'Payment data security',
        'Customer data protection',
        'Fraud prevention',
        'Regulatory reporting'
      ]
    }
  ];

  const globalCertifications = [
    {
      name: 'SOC 2 Type II',
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center',
      description: 'Annual security audit by independent third party'
    },
    {
      name: 'ISO 27001',
      logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop&crop=center',
      description: 'International information security management standard'
    },
    {
      name: 'GDPR Ready',
      logo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=100&h=100&fit=crop&crop=center',
      description: 'European data protection regulation compliance'
    },
    {
      name: 'AWS Security',
      logo: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=100&h=100&fit=crop&crop=center',
      description: 'Enterprise-grade cloud security infrastructure'
    }
  ];

  return (
    <section className="bg-background py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-success/10 text-success px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Icon name="Shield" size={16} />
            <span>Security & Compliance</span>
          </div>
          
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            Industry-Specific Compliance
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Meet the strictest regulatory requirements with built-in compliance features tailored to your industry's unique needs.
          </p>
        </div>

        {/* Industry-Specific Compliance */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {complianceData?.map((industry, index) => (
            <div key={index} className="card-organic bg-card border border-border p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className={`w-12 h-12 ${industry?.color} rounded-genetic-md flex items-center justify-center`}>
                  <Icon name={industry?.icon} size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-text-primary">{industry?.industry}</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-text-primary mb-3">Certifications</h4>
                  <div className="space-y-3">
                    {industry?.certifications?.map((cert, certIndex) => (
                      <div key={certIndex} className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-success/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Icon name="Check" size={12} className="text-success" />
                        </div>
                        <div>
                          <div className="font-medium text-text-primary text-sm">{cert?.name}</div>
                          <div className="text-text-secondary text-xs">{cert?.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-text-primary mb-3">Key Features</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {industry?.features?.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2 text-sm">
                        <Icon name="Shield" size={12} className="text-primary flex-shrink-0" />
                        <span className="text-text-secondary">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Global Certifications */}
        <div className="bg-surface rounded-genetic-xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-text-primary mb-2">
              Global Security Certifications
            </h3>
            <p className="text-text-secondary">
              Trusted by enterprises worldwide with industry-leading security standards
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {globalCertifications?.map((cert, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-genetic-md p-3 shadow-organic-sm">
                  <Image 
                    src={cert?.logo} 
                    alt={`${cert?.name} certification`}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h4 className="font-semibold text-text-primary mb-1">{cert?.name}</h4>
                <p className="text-text-secondary text-sm">{cert?.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm">
              <Icon name="Lock" size={14} />
              <span>Enterprise-grade security for all industries</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComplianceSection;