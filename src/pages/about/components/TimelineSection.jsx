import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const TimelineSection = () => {
  const [activeYear, setActiveYear] = useState(2024);

  const milestones = [
    {
      year: 2019,
      title: "Company Founded",
      description: "WorkflowGene Cloud was founded by Sarah Chen and Marcus Rodriguez with a vision to revolutionize business automation.",
      icon: "Rocket",
      achievements: [
        "Secured $2M seed funding",
        "Built core team of 8 engineers",
        "Developed MVP platform"
      ]
    },
    {
      year: 2020,
      title: "First Enterprise Clients",
      description: "Onboarded first 50 enterprise clients and achieved product-market fit in the education sector.",
      icon: "Users",
      achievements: [
        "50+ enterprise clients",
        "99.5% uptime achieved",
        "Education sector expansion"
      ]
    },
    {
      year: 2021,
      title: "Series A & Platform Expansion",
      description: "Raised $15M Series A and expanded into healthcare and e-commerce verticals.",
      icon: "TrendingUp",
      achievements: [
        "$15M Series A funding",
        "Healthcare compliance (HIPAA)",
        "E-commerce integrations launched"
      ]
    },
    {
      year: 2022,
      title: "AI Integration & Scale",
      description: "Integrated AI-powered workflow optimization and reached 200+ enterprise clients.",
      icon: "Brain",
      achievements: [
        "AI workflow optimization",
        "200+ enterprise clients",
        "10M+ workflows processed"
      ]
    },
    {
      year: 2023,
      title: "Global Expansion",
      description: "Expanded to international markets and achieved SOC 2 Type II compliance.",
      icon: "Globe",
      achievements: [
        "SOC 2 Type II compliance",
        "International expansion",
        "24/7 global support"
      ]
    },
    {
      year: 2024,
      title: "Industry Leadership",
      description: "Became the leading workflow automation platform with 500+ enterprise clients and 50M+ workflows automated.",
      icon: "Award",
      achievements: [
        "500+ enterprise clients",
        "50M+ workflows automated",
        "Industry recognition awards"
      ]
    }
  ];

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Our Journey
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            From a small startup to industry leader, explore the key milestones that shaped WorkflowGene Cloud into the platform it is today.
          </p>
        </div>

        {/* Interactive Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-border h-full hidden lg:block"></div>

          {/* Timeline Items */}
          <div className="space-y-12">
            {milestones?.map((milestone, index) => (
              <div
                key={milestone?.year}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Timeline Node */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background z-10 hidden lg:block"></div>

                {/* Content Card */}
                <div className={`w-full lg:w-5/12 ${index % 2 === 0 ? 'lg:pr-8' : 'lg:pl-8'}`}>
                  <div 
                    className={`card-organic bg-card p-6 cursor-pointer transition-all duration-genetic-normal ${
                      activeYear === milestone?.year ? 'ring-2 ring-primary shadow-organic-lg' : ''
                    }`}
                    onClick={() => setActiveYear(milestone?.year)}
                  >
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-accent/10 rounded-genetic-md flex items-center justify-center">
                        <Icon name={milestone?.icon} size={20} className="text-primary" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-primary">
                          {milestone?.year}
                        </div>
                        <h3 className="text-lg font-semibold text-text-primary">
                          {milestone?.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-text-secondary mb-4 leading-relaxed">
                      {milestone?.description}
                    </p>

                    {/* Achievements */}
                    {activeYear === milestone?.year && (
                      <div className="space-y-2 animate-in slide-in-from-top-2 duration-300">
                        <h4 className="font-semibold text-text-primary text-sm">
                          Key Achievements:
                        </h4>
                        <ul className="space-y-1">
                          {milestone?.achievements?.map((achievement, idx) => (
                            <li key={idx} className="flex items-center space-x-2 text-sm text-text-secondary">
                              <Icon name="Check" size={14} className="text-success" />
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {/* Spacer for opposite side */}
                <div className="hidden lg:block w-5/12"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Growth Metrics */}
        <div className="mt-20 bg-card rounded-genetic-lg p-8 shadow-organic-md">
          <h3 className="text-2xl font-bold text-text-primary text-center mb-8">
            Growth Metrics (2019-2024)
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-sm text-text-secondary">Enterprise Clients</div>
              <div className="text-xs text-success mt-1">↑ 2400% growth</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">50M+</div>
              <div className="text-sm text-text-secondary">Workflows Automated</div>
              <div className="text-xs text-success mt-1">↑ 5000% growth</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">$32M</div>
              <div className="text-sm text-text-secondary">Total Funding Raised</div>
              <div className="text-xs text-success mt-1">Series B planned</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">150+</div>
              <div className="text-sm text-text-secondary">Team Members</div>
              <div className="text-xs text-success mt-1">↑ 1775% growth</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;