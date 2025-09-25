import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const Investors = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const keyMetrics = [
    { label: 'Annual Recurring Revenue', value: '$50M+', growth: '+150% YoY' },
    { label: 'Enterprise Customers', value: '500+', growth: '+200% YoY' },
    { label: 'Gross Revenue Retention', value: '98%', growth: 'Industry Leading' },
    { label: 'Net Revenue Retention', value: '130%', growth: '+15% YoY' }
  ];

  const fundingRounds = [
    {
      round: 'Series B',
      amount: '$25M',
      date: 'December 2024',
      lead: 'Accel Partners',
      status: 'Completed'
    },
    {
      round: 'Series A',
      amount: '$15M',
      date: 'June 2021',
      lead: 'Sequoia Capital',
      status: 'Completed'
    },
    {
      round: 'Seed',
      amount: '$2M',
      date: 'March 2019',
      lead: 'First Round Capital',
      status: 'Completed'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Investors - WorkflowGene Cloud | Investor Relations</title>
        <meta name="description" content="WorkflowGene Cloud investor relations, financial information, and company performance metrics." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20">
            <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
              <h1 className="text-4xl lg:text-5xl font-bold text-text-primary mb-6">
                Investor Relations
              </h1>
              <p className="text-xl text-text-secondary mb-8">
                Building the future of business automation
              </p>
              <Button variant="default" size="lg" iconName="Download" iconPosition="left">
                Download Investor Deck
              </Button>
            </div>
          </section>

          {/* Key Metrics */}
          <section className="py-20 bg-surface">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-text-primary text-center mb-12">Key Performance Metrics</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {keyMetrics?.map((metric, index) => (
                  <div key={index} className="bg-card rounded-genetic-lg p-6 text-center shadow-organic-sm">
                    <div className="text-2xl font-bold text-primary mb-2">{metric?.value}</div>
                    <div className="text-sm text-text-primary font-medium mb-1">{metric?.label}</div>
                    <div className="text-xs text-success">{metric?.growth}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Funding History */}
          <section className="py-20 bg-background">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-text-primary text-center mb-12">Funding History</h2>
              <div className="space-y-6">
                {fundingRounds?.map((round, index) => (
                  <div key={index} className="bg-card rounded-genetic-lg p-6 shadow-organic-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-text-primary mb-1">{round?.round}</h3>
                        <p className="text-text-secondary">Led by {round?.lead}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-primary">{round?.amount}</div>
                        <div className="text-sm text-text-secondary">{round?.date}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact */}
          <section className="py-16 bg-surface">
            <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-bold text-text-primary mb-4">
                Investor Contact
              </h2>
              <p className="text-text-secondary mb-8">
                For investor relations inquiries and financial information
              </p>
              <div className="bg-card rounded-genetic-lg p-6 max-w-md mx-auto">
                <Icon name="Mail" size={32} className="text-primary mx-auto mb-4" />
                <div className="font-semibold text-text-primary mb-2">Investor Relations</div>
                <div className="text-text-secondary mb-4">investors@workflowgene.cloud</div>
                <Button variant="default" size="sm" fullWidth iconName="Mail" iconPosition="left">
                  Contact IR Team
                </Button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Investors;