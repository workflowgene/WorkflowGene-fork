import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const CultureSection = () => {
  const [activeTab, setActiveTab] = useState('culture');

  const cultureValues = [
    {
      title: "Remote-First",
      description: "We believe great work happens anywhere. Our distributed team spans 15 countries, fostering diverse perspectives and flexible work-life balance.",
      icon: "Globe",
      stats: "15 countries, 40% remote"
    },
    {
      title: "Continuous Learning",
      description: "Every team member receives $2,000 annually for professional development, conferences, and skill-building initiatives.",
      icon: "BookOpen",
      stats: "$2,000 learning budget"
    },
    {
      title: "Innovation Time",
      description: "20% of work time is dedicated to exploring new ideas, contributing to open source, or working on passion projects.",
      icon: "Lightbulb",
      stats: "20% innovation time"
    },
    {
      title: "Inclusive Environment",
      description: "We celebrate diversity and ensure every voice is heard. Our team represents 25+ nationalities and diverse backgrounds.",
      icon: "Users",
      stats: "25+ nationalities"
    }
  ];

  const benefits = [
    {
      category: "Health & Wellness",
      items: [
        "Comprehensive health insurance",
        "Mental health support",
        "Fitness membership reimbursement",
        "Annual wellness stipend"
      ],
      icon: "Heart"
    },
    {
      category: "Work-Life Balance",
      items: [
        "Unlimited PTO policy",
        "Flexible working hours",
        "Remote work support",
        "Sabbatical program"
      ],
      icon: "Clock"
    },
    {
      category: "Financial Benefits",
      items: [
        "Competitive salary",
        "Equity participation",
        "401(k) matching",
        "Performance bonuses"
      ],
      icon: "DollarSign"
    },
    {
      category: "Growth & Development",
      items: [
        "Learning & development budget",
        "Conference attendance",
        "Mentorship programs",
        "Internal mobility"
      ],
      icon: "TrendingUp"
    }
  ];

  const officeLocations = [
    {
      city: "San Francisco",
      address: "123 Market Street, Suite 500\nSan Francisco, CA 94105",
      type: "Headquarters",
      employees: "45 employees",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop",
      amenities: ["Open workspace", "Game room", "Rooftop terrace", "Fully stocked kitchen"]
    },
    {
      city: "Austin",
      address: "456 Congress Avenue, Floor 12\nAustin, TX 78701",
      type: "Engineering Hub",
      employees: "32 employees",
      image: "https://images.unsplash.com/photo-1531218150217-54595bc2b934?w=400&h=250&fit=crop",
      amenities: ["Collaboration spaces", "Quiet zones", "Bike storage", "Coffee bar"]
    },
    {
      city: "Remote",
      address: "Distributed across 15 countries\nGlobal remote workforce",
      type: "Virtual Office",
      employees: "73 employees",
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=250&fit=crop",
      amenities: ["Home office stipend", "Co-working allowance", "Virtual events", "Digital collaboration tools"]
    }
  ];

  const socialInitiatives = [
    {
      title: "WorkflowGene Foundation",
      description: "Our nonprofit arm provides free automation tools to educational institutions and nonprofits worldwide.",
      impact: "500+ nonprofits supported",
      icon: "Heart"
    },
    {
      title: "Open Source Contributions",
      description: "We contribute to and maintain several open-source projects that benefit the broader developer community.",
      impact: "15 open source projects",
      icon: "Code"
    },
    {
      title: "Environmental Commitment",
      description: "Carbon-neutral operations and partnerships with environmental organizations to offset our digital footprint.",
      impact: "100% carbon neutral",
      icon: "Leaf"
    },
    {
      title: "Education Partnerships",
      description: "Free training programs and internships for underrepresented groups in technology.",
      impact: "200+ students trained",
      icon: "GraduationCap"
    }
  ];

  const tabs = [
    { id: 'culture', label: 'Culture & Values', icon: 'Users' },
    { id: 'benefits', label: 'Benefits', icon: 'Gift' },
    { id: 'locations', label: 'Locations', icon: 'MapPin' },
    { id: 'social', label: 'Social Impact', icon: 'Heart' }
  ];

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Life at WorkflowGene
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            We're building more than just software—we're creating a culture where innovation thrives, diversity is celebrated, and every team member can do their best work.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center mb-12 bg-card rounded-genetic-lg p-2 shadow-organic-sm">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-genetic-md text-sm font-medium transition-all duration-genetic-normal ${
                activeTab === tab?.id
                  ? 'bg-primary text-white shadow-organic-sm'
                  : 'text-text-secondary hover:text-text-primary hover:bg-muted'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="min-h-[500px]">
          {/* Culture & Values */}
          {activeTab === 'culture' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {cultureValues?.map((value, index) => (
                  <div key={index} className="card-organic bg-card p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-accent/10 rounded-genetic-lg flex items-center justify-center flex-shrink-0">
                        <Icon name={value?.icon} size={20} className="text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-text-primary mb-2">
                          {value?.title}
                        </h3>
                        <p className="text-text-secondary mb-3 leading-relaxed">
                          {value?.description}
                        </p>
                        <div className="text-sm font-medium text-primary">
                          {value?.stats}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Benefits */}
          {activeTab === 'benefits' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {benefits?.map((benefit, index) => (
                <div key={index} className="card-organic bg-card p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary/10 to-accent/10 rounded-genetic-md flex items-center justify-center">
                      <Icon name={benefit?.icon} size={18} className="text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-text-primary">
                      {benefit?.category}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {benefit?.items?.map((item, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-text-secondary">
                        <Icon name="Check" size={14} className="text-success flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* Locations */}
          {activeTab === 'locations' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {officeLocations?.map((location, index) => (
                  <div key={index} className="card-organic bg-card overflow-hidden">
                    <Image
                      src={location?.image}
                      alt={location?.city}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-semibold text-text-primary">
                          {location?.city}
                        </h3>
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                          {location?.type}
                        </span>
                      </div>
                      <p className="text-sm text-text-secondary mb-3 whitespace-pre-line">
                        {location?.address}
                      </p>
                      <p className="text-sm font-medium text-primary mb-4">
                        {location?.employees}
                      </p>
                      <div className="space-y-1">
                        {location?.amenities?.map((amenity, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <Icon name="Check" size={12} className="text-success" />
                            <span className="text-xs text-text-secondary">{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Social Impact */}
          {activeTab === 'social' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {socialInitiatives?.map((initiative, index) => (
                <div key={index} className="card-organic bg-card p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-success/10 to-primary/10 rounded-genetic-lg flex items-center justify-center flex-shrink-0">
                      <Icon name={initiative?.icon} size={20} className="text-success" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-text-primary mb-2">
                        {initiative?.title}
                      </h3>
                      <p className="text-text-secondary mb-3 leading-relaxed">
                        {initiative?.description}
                      </p>
                      <div className="text-sm font-medium text-success">
                        {initiative?.impact}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Join Our Team CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-genetic-lg p-8">
            <h3 className="text-2xl font-bold text-text-primary mb-4">
              Ready to Join Our Team?
            </h3>
            <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
              We're always looking for talented individuals who share our passion for innovation, automation, and making a positive impact on businesses worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/careers"
                className="inline-flex items-center justify-center px-8 py-3 bg-primary text-white rounded-genetic-md hover:bg-primary/90 transition-colors duration-genetic-normal btn-organic"
              >
                <Icon name="Briefcase" size={18} className="mr-2" />
                View Open Positions
              </a>
              <a 
                href="/culture-guide.pdf"
                className="inline-flex items-center justify-center px-8 py-3 border border-border text-text-primary rounded-genetic-md hover:bg-muted transition-colors duration-genetic-normal"
              >
                <Icon name="Download" size={18} className="mr-2" />
                Culture Guide
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CultureSection;