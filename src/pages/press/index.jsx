import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const Press = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const pressReleases = [
    {
      id: 1,
      title: 'WorkflowGene Cloud Raises $25M Series B to Accelerate AI-Powered Automation',
      date: '2024-12-01',
      excerpt: 'Funding will drive expansion of AI capabilities and international market growth'
    },
    {
      id: 2,
      title: 'WorkflowGene Cloud Achieves SOC 2 Type II Certification',
      date: '2024-11-15',
      excerpt: 'Enhanced security measures reinforce commitment to enterprise data protection'
    },
    {
      id: 3,
      title: 'New Healthcare Automation Features Launch with HIPAA Compliance',
      date: '2024-10-30',
      excerpt: 'Specialized tools for healthcare providers to automate patient care workflows'
    }
  ];

  const mediaKit = [
    {
      name: 'Company Logos',
      description: 'High-resolution logos in various formats',
      type: 'ZIP',
      size: '2.5 MB'
    },
    {
      name: 'Product Screenshots',
      description: 'Platform interface and feature screenshots',
      type: 'ZIP',
      size: '15 MB'
    },
    {
      name: 'Executive Photos',
      description: 'Professional headshots of leadership team',
      type: 'ZIP',
      size: '8 MB'
    },
    {
      name: 'Company Fact Sheet',
      description: 'Key statistics and company information',
      type: 'PDF',
      size: '500 KB'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Press - WorkflowGene Cloud | Media Resources</title>
        <meta name="description" content="Press releases, media kit, and resources for journalists covering WorkflowGene Cloud." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20">
            <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
              <h1 className="text-4xl lg:text-5xl font-bold text-text-primary mb-6">
                Press & Media
              </h1>
              <p className="text-xl text-text-secondary mb-8">
                Latest news, press releases, and media resources
              </p>
              <Button variant="default" size="lg" iconName="Download" iconPosition="left">
                Download Media Kit
              </Button>
            </div>
          </section>

          {/* Press Releases */}
          <section className="py-20 bg-surface">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-text-primary text-center mb-12">Latest Press Releases</h2>
              <div className="space-y-6">
                {pressReleases?.map((release) => (
                  <div key={release?.id} className="bg-card rounded-genetic-lg p-6 shadow-organic-sm">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-text-primary mb-2">{release?.title}</h3>
                        <p className="text-text-secondary mb-3">{release?.excerpt}</p>
                        <div className="text-sm text-text-secondary">{release?.date}</div>
                      </div>
                      <Button variant="outline" size="sm" iconName="ArrowRight">
                        Read More
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Media Kit */}
          <section className="py-20 bg-background">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-text-primary text-center mb-12">Media Kit</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {mediaKit?.map((item, index) => (
                  <div key={index} className="bg-card rounded-genetic-lg p-6 shadow-organic-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-text-primary mb-1">{item?.name}</h3>
                        <p className="text-text-secondary text-sm mb-2">{item?.description}</p>
                        <div className="text-xs text-text-secondary">{item?.type} • {item?.size}</div>
                      </div>
                      <Button variant="outline" size="sm" iconName="Download">
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Press Team */}
          <section className="py-16 bg-surface">
            <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-bold text-text-primary mb-4">
                Media Inquiries
              </h2>
              <p className="text-text-secondary mb-8">
                For press inquiries, interviews, or additional information
              </p>
              <div className="bg-card rounded-genetic-lg p-6 max-w-md mx-auto">
                <Icon name="Mail" size={32} className="text-primary mx-auto mb-4" />
                <div className="font-semibold text-text-primary mb-2">Press Contact</div>
                <div className="text-text-secondary mb-4">press@workflowgene.cloud</div>
                <Button variant="default" size="sm" fullWidth iconName="Mail" iconPosition="left">
                  Contact Press Team
                </Button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Press;