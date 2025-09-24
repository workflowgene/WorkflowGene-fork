import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const IndustryPathways = () => {
  const [activeIndustry, setActiveIndustry] = useState('education');

  const industries = [
    {
      id: 'education',
      name: 'Education',
      icon: 'GraduationCap',
      title: 'Transform Educational Operations',
      description: 'Streamline student enrollment, automate grading workflows, and enhance campus communication with intelligent automation designed for educational institutions.',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      features: [
        'Student Information Management',
        'Automated Grading Systems',
        'Parent-Teacher Communication',
        'Resource Scheduling'
      ],
      stats: {
        institutions: '2,500+',
        students: '1.2M+',
        efficiency: '70%'
      },
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'healthcare',
      name: 'Healthcare',
      icon: 'Heart',
      title: 'Revolutionize Patient Care',
      description: 'Optimize patient scheduling, automate medical record management, and improve care coordination with HIPAA-compliant workflow automation.',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      features: [
        'Patient Appointment Scheduling',
        'Medical Record Automation',
        'Insurance Claims Processing',
        'Care Team Coordination'
      ],
      stats: {
        providers: '1,800+',
        patients: '5M+',
        accuracy: '99.5%'
      },
      color: 'from-emerald-500 to-teal-600'
    },
    {
      id: 'ecommerce',
      name: 'E-Commerce',
      icon: 'ShoppingCart',
      title: 'Scale Your Online Business',
      description: 'Automate order processing, inventory management, and customer service workflows to scale your e-commerce operations efficiently.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      features: [
        'Order Processing Automation',
        'Inventory Management',
        'Customer Service Workflows',
        'Marketing Campaign Automation'
      ],
      stats: {
        stores: '15,000+',
        orders: '50M+',
        growth: '150%'
      },
      color: 'from-purple-500 to-pink-600'
    }
  ];

  const currentIndustry = industries?.find(ind => ind?.id === activeIndustry);

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 scroll-reveal">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Icon name="Target" size={16} />
            <span>Industry-Specific Solutions</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-text-primary mb-6">
            Tailored for Your Industry
          </h2>
          
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Experience workflow automation designed specifically for your sector's unique challenges and requirements.
          </p>
        </div>

        {/* Industry Tabs */}
        <div className="flex flex-col lg:flex-row justify-center mb-12 scroll-reveal stagger-1">
          <div className="flex flex-col lg:flex-row bg-white rounded-genetic-lg p-2 shadow-organic-sm">
            {industries?.map((industry) => (
              <button
                key={industry?.id}
                onClick={() => setActiveIndustry(industry?.id)}
                className={`flex items-center space-x-3 px-6 py-4 rounded-genetic-md transition-all duration-genetic-normal ${
                  activeIndustry === industry?.id
                    ? 'bg-primary text-white shadow-organic-md'
                    : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                }`}
              >
                <Icon name={industry?.icon} size={20} />
                <span className="font-medium">{industry?.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Industry Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 scroll-reveal stagger-2">
            <div className="space-y-6">
              <h3 className="text-3xl lg:text-4xl font-bold text-text-primary">
                {currentIndustry?.title}
              </h3>
              
              <p className="text-lg text-text-secondary leading-relaxed">
                {currentIndustry?.description}
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-text-primary">Key Features:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentIndustry?.features?.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name="Check" size={14} className="text-success" />
                    </div>
                    <span className="text-text-secondary">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 py-6 border-t border-border">
              {Object.entries(currentIndustry?.stats)?.map(([key, value]) => (
                <div key={key} className="text-center">
                  <div className="text-2xl font-bold text-primary">{value}</div>
                  <div className="text-sm text-text-secondary capitalize">
                    {key === 'institutions' ? 'Institutions' :
                     key === 'students' ? 'Students Served' :
                     key === 'providers' ? 'Healthcare Providers' :
                     key === 'patients' ? 'Patients Managed' :
                     key === 'stores' ? 'Online Stores' :
                     key === 'orders' ? 'Orders Processed' :
                     key === 'efficiency' ? 'Efficiency Gain' :
                     key === 'accuracy' ? 'Process Accuracy' :
                     key === 'growth' ? 'Average Growth' : key}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/industries">
                <Button 
                  variant="default" 
                  size="lg"
                  iconName="ArrowRight"
                  iconPosition="right"
                  className="btn-organic"
                >
                  Explore {currentIndustry?.name} Solutions
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg"
                iconName="Play"
                iconPosition="left"
              >
                Watch Demo
              </Button>
            </div>
          </div>

          {/* Visual */}
          <div className="relative scroll-reveal stagger-3">
            <div className="relative rounded-genetic-xl overflow-hidden shadow-organic-lg">
              <Image
                src={currentIndustry?.image}
                alt={`${currentIndustry?.name} workflow automation`}
                className="w-full h-[500px] object-cover"
              />
              
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${currentIndustry?.color} opacity-20`} />
              
              {/* Floating Success Card */}
              <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm rounded-genetic-md p-4 shadow-organic-md">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 bg-gradient-to-br ${currentIndustry?.color} rounded-full flex items-center justify-center`}>
                    <Icon name={currentIndustry?.icon} size={20} className="text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-text-primary">Success Rate</div>
                    <div className="text-xs text-text-secondary">
                      {Object.values(currentIndustry?.stats)?.[2]} improvement
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Stats Card */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-genetic-md p-4 shadow-organic-md">
                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <div className="text-lg font-bold text-text-primary">
                      {Object.values(currentIndustry?.stats)?.[0]}
                    </div>
                    <div className="text-xs text-text-secondary">
                      {Object.keys(currentIndustry?.stats)?.[0]}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-text-primary">
                      {Object.values(currentIndustry?.stats)?.[1]}
                    </div>
                    <div className="text-xs text-text-secondary">
                      {Object.keys(currentIndustry?.stats)?.[1]}
                    </div>
                  </div>
                  <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
                    <Icon name="TrendingUp" size={16} className="text-success" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustryPathways;