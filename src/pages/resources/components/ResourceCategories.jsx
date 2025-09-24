import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ResourceCategories = ({ onCategoryChange, activeCategory }) => {
  const categories = [
    {
      id: 'all',
      name: 'All Resources',
      icon: 'Grid3X3',
      count: 500,
      description: 'Complete resource library'
    },
    {
      id: 'courses',
      name: 'Automation Academy',
      icon: 'GraduationCap',
      count: 50,
      description: 'Structured learning paths'
    },
    {
      id: 'templates',
      name: 'Templates Library',
      icon: 'FileTemplate',
      count: 150,
      description: 'Ready-to-use workflows'
    },
    {
      id: 'guides',
      name: 'Best Practices',
      icon: 'BookOpen',
      count: 80,
      description: 'Expert guidance'
    },
    {
      id: 'webinars',
      name: 'Webinars & Events',
      icon: 'Video',
      count: 45,
      description: 'Live learning sessions'
    },
    {
      id: 'community',
      name: 'Community Forum',
      icon: 'Users',
      count: 200,
      description: 'Peer discussions'
    },
    {
      id: 'tools',
      name: 'Interactive Tools',
      icon: 'Calculator',
      count: 25,
      description: 'Assessment & calculators'
    },
    {
      id: 'api',
      name: 'Developer Resources',
      icon: 'Code',
      count: 30,
      description: 'Technical documentation'
    }
  ];

  return (
    <section className="py-16 bg-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            Explore Our Resource Categories
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Find exactly what you need to accelerate your automation journey
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories?.map((category) => (
            <div
              key={category?.id}
              onClick={() => onCategoryChange(category?.id)}
              className={`card-organic p-6 cursor-pointer transition-all duration-300 ${
                activeCategory === category?.id
                  ? 'bg-primary text-white shadow-organic-lg'
                  : 'bg-card hover:shadow-organic-md'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-genetic-md ${
                  activeCategory === category?.id
                    ? 'bg-white/20' :'bg-primary/10'
                }`}>
                  <Icon 
                    name={category?.icon} 
                    size={24} 
                    color={activeCategory === category?.id ? 'white' : 'var(--color-primary)'} 
                  />
                </div>
                <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                  activeCategory === category?.id
                    ? 'bg-white/20 text-white' :'bg-primary/10 text-primary'
                }`}>
                  {category?.count}
                </span>
              </div>
              
              <h3 className={`text-lg font-semibold mb-2 ${
                activeCategory === category?.id ? 'text-white' : 'text-text-primary'
              }`}>
                {category?.name}
              </h3>
              
              <p className={`text-sm ${
                activeCategory === category?.id ? 'text-white/80' : 'text-text-secondary'
              }`}>
                {category?.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResourceCategories;