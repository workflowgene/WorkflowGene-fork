import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';

const Community = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const communityStats = [
    { label: 'Active Members', value: '25,000+', icon: 'Users' },
    { label: 'Discussions', value: '15,000+', icon: 'MessageSquare' },
    { label: 'Templates Shared', value: '2,500+', icon: 'FileText' },
    { label: 'Countries', value: '50+', icon: 'Globe' }
  ];

  const recentDiscussions = [
    {
      title: 'Best practices for healthcare automation workflows',
      author: 'Dr. Sarah Chen',
      replies: 24,
      category: 'Healthcare',
      timeAgo: '2 hours ago'
    },
    {
      title: 'Integration challenges with Salesforce Enterprise',
      author: 'Michael Rodriguez',
      replies: 18,
      category: 'Integrations',
      timeAgo: '4 hours ago'
    },
    {
      title: 'E-commerce order processing optimization tips',
      author: 'Jennifer Park',
      replies: 31,
      category: 'E-Commerce',
      timeAgo: '6 hours ago'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Community - WorkflowGene Cloud | Join Our Automation Community</title>
        <meta name="description" content="Join the WorkflowGene Cloud community. Connect with automation experts, share knowledge, and get help from peers." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20">
            <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
              <h1 className="text-4xl lg:text-5xl font-bold text-text-primary mb-6">
                Join Our Community
              </h1>
              <p className="text-xl text-text-secondary mb-8">
                Connect with automation experts and enthusiasts worldwide
              </p>
              <Button variant="default" size="lg" className="btn-organic" iconName="Users" iconPosition="left">
                Join Community
              </Button>
            </div>
          </section>

          {/* Community Stats */}
          <section className="py-16 bg-surface">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {communityStats?.map((stat, index) => (
                  <div key={index} className="text-center p-6 bg-card rounded-genetic-lg">
                    <Icon name={stat?.icon} size={32} className="text-primary mx-auto mb-4" />
                    <div className="text-2xl font-bold text-text-primary mb-1">{stat?.value}</div>
                    <div className="text-sm text-text-secondary">{stat?.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Recent Discussions */}
          <section className="py-16 bg-background">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-text-primary text-center mb-8">Recent Discussions</h2>
              <div className="space-y-4">
                {recentDiscussions?.map((discussion, index) => (
                  <div key={index} className="bg-card rounded-genetic-lg p-6 shadow-organic-sm hover:shadow-organic-md transition-all duration-genetic-normal">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-text-primary mb-2">{discussion?.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-text-secondary">
                          <span>by {discussion?.author}</span>
                          <span>in {discussion?.category}</span>
                          <span>{discussion?.timeAgo}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-text-secondary">
                        <Icon name="MessageSquare" size={14} />
                        <span>{discussion?.replies}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-8">
                <Button variant="outline" iconName="ArrowRight" iconPosition="right">
                  View All Discussions
                </Button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Community;