import React from 'react';
import Icon from '../../../components/AppIcon';

const MissionSection = () => {
  const values = [
    {
      icon: "Target",
      title: "Innovation-Driven",
      description: "We continuously push the boundaries of what's possible in business automation, staying ahead of industry trends and technological advances."
    },
    {
      icon: "Shield",
      title: "Trust & Security",
      description: "Your data security and privacy are paramount. We maintain the highest standards of compliance and transparency in everything we do."
    },
    {
      icon: "Users",
      title: "Customer-Centric",
      description: "Every feature we build, every decision we make, is guided by our commitment to delivering exceptional value to our customers."
    },
    {
      icon: "Zap",
      title: "Efficiency First",
      description: "We believe in the power of automation to eliminate repetitive tasks and unlock human potential for strategic, creative work."
    }
  ];

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Mission Statement */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
            Our Mission & Vision
          </h2>
          <div className="bg-card rounded-genetic-lg p-8 shadow-organic-md">
            <blockquote className="text-xl text-text-primary italic mb-6 leading-relaxed">
              "To become the fundamental building blocks of modern business efficiency, enabling organizations worldwide to evolve beyond manual processes and focus on growth, innovation, and human potential."
            </blockquote>
            <div className="flex items-center justify-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                <Icon name="Quote" size={20} className="text-white" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-text-primary">Sarah Chen</div>
                <div className="text-sm text-text-secondary">CEO & Co-Founder</div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-text-primary text-center mb-12">
            Our Core Values
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values?.map((value, index) => (
              <div 
                key={index} 
                className="card-organic bg-card p-6 text-center group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-genetic-lg flex items-center justify-center mx-auto mb-4 group-hover:from-primary/20 group-hover:to-accent/20 transition-all duration-genetic-normal">
                  <Icon name={value?.icon} size={24} className="text-primary" />
                </div>
                <h4 className="text-lg font-semibold text-text-primary mb-3">
                  {value?.title}
                </h4>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {value?.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Company Story */}
        <div className="bg-card rounded-genetic-lg p-8 shadow-organic-md">
          <h3 className="text-2xl font-bold text-text-primary mb-6 text-center">
            Our Story
          </h3>
          <div className="prose prose-lg max-w-none text-text-secondary">
            <p className="mb-4">
              Founded in 2019 by a team of automation experts and business strategists, WorkflowGene Cloud emerged from a simple observation: businesses were drowning in repetitive tasks while their most valuable asset—human creativity and strategic thinking—remained underutilized.
            </p>
            <p className="mb-4">
              Our founders, having worked with Fortune 500 companies and fast-growing startups alike, recognized that traditional automation tools were either too complex for everyday users or too simplistic for enterprise needs. They envisioned a platform that would be as fundamental to business operations as DNA is to life itself.
            </p>
            <p>
              Today, WorkflowGene Cloud serves over 500 enterprise clients across education, healthcare, and e-commerce sectors, processing millions of workflows daily and enabling organizations to focus on growth rather than repetitive tasks. Our journey continues as we evolve alongside our customers, constantly adapting to meet the changing needs of modern business.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;