import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';

const Careers = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const openPositions = [
    {
      id: 1,
      title: 'Senior Software Engineer',
      department: 'Engineering',
      location: 'San Francisco, CA / Remote',
      type: 'Full-time',
      experience: '5+ years',
      description: 'Build scalable automation platform features and integrations',
      skills: ['React', 'Node.js', 'Python', 'AWS', 'Docker']
    },
    {
      id: 2,
      title: 'Product Manager',
      department: 'Product',
      location: 'Austin, TX / Remote',
      type: 'Full-time',
      experience: '3+ years',
      description: 'Drive product strategy and roadmap for workflow automation features',
      skills: ['Product Strategy', 'User Research', 'Analytics', 'Agile', 'B2B SaaS']
    },
    {
      id: 3,
      title: 'Customer Success Manager',
      department: 'Customer Success',
      location: 'Remote',
      type: 'Full-time',
      experience: '2+ years',
      description: 'Help enterprise customers achieve success with automation implementations',
      skills: ['Customer Success', 'Project Management', 'Communication', 'SaaS', 'Training']
    },
    {
      id: 4,
      title: 'DevOps Engineer',
      department: 'Engineering',
      location: 'San Francisco, CA / Remote',
      type: 'Full-time',
      experience: '4+ years',
      description: 'Maintain and scale our cloud infrastructure and deployment pipelines',
      skills: ['AWS', 'Kubernetes', 'Terraform', 'CI/CD', 'Monitoring']
    }
  ];

  const benefits = [
    {
      title: 'Health & Wellness',
      items: ['Comprehensive health insurance', 'Mental health support', 'Fitness reimbursement', 'Wellness stipend'],
      icon: 'Heart'
    },
    {
      title: 'Work-Life Balance',
      items: ['Unlimited PTO', 'Flexible hours', 'Remote work', 'Sabbatical program'],
      icon: 'Clock'
    },
    {
      title: 'Growth & Learning',
      items: ['$2,000 learning budget', 'Conference attendance', 'Mentorship', 'Career development'],
      icon: 'TrendingUp'
    },
    {
      title: 'Financial Benefits',
      items: ['Competitive salary', 'Equity participation', '401(k) matching', 'Performance bonuses'],
      icon: 'DollarSign'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Careers - WorkflowGene Cloud | Join Our Team</title>
        <meta name="description" content="Join WorkflowGene Cloud and help build the future of business automation. Explore open positions, benefits, and our company culture." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          {/* Hero Section */}
          <section className="relative bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="text-center max-w-4xl mx-auto">
                <h1 className="text-4xl lg:text-6xl font-bold text-text-primary mb-6">
                  Build the Future of
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent"> Automation</span>
                </h1>
                <p className="text-xl text-text-secondary mb-8">
                  Join our mission to transform how businesses operate through intelligent automation
                </p>
                <Button variant="default" size="lg" className="btn-organic" iconName="ArrowDown">
                  View Open Positions
                </Button>
              </div>
            </div>
          </section>

          {/* Open Positions */}
          <section className="py-20 bg-surface">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-text-primary text-center mb-12">Open Positions</h2>
              <div className="space-y-6">
                {openPositions?.map((position) => (
                  <div key={position?.id} className="bg-card rounded-genetic-lg p-6 shadow-organic-sm hover:shadow-organic-md transition-all duration-genetic-normal">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-semibold text-text-primary">{position?.title}</h3>
                          <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                            {position?.department}
                          </span>
                        </div>
                        <p className="text-text-secondary mb-3">{position?.description}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-text-secondary">
                          <div className="flex items-center space-x-1">
                            <Icon name="MapPin" size={14} />
                            <span>{position?.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Icon name="Clock" size={14} />
                            <span>{position?.type}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Icon name="Award" size={14} />
                            <span>{position?.experience}</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 lg:mt-0 lg:ml-6">
                        <Button variant="default" iconName="ArrowRight" iconPosition="right">
                          Apply Now
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Benefits */}
          <section className="py-20 bg-background">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-text-primary text-center mb-12">Why Work With Us</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {benefits?.map((benefit, index) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-genetic-lg flex items-center justify-center mx-auto mb-4">
                      <Icon name={benefit?.icon} size={32} className="text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-text-primary mb-3">{benefit?.title}</h3>
                    <ul className="space-y-1">
                      {benefit?.items?.map((item, idx) => (
                        <li key={idx} className="text-sm text-text-secondary">{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Careers;