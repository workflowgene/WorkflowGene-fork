import React from 'react';

import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const IndustryCard = ({ industry }) => {
  const {
    id,
    name,
    description,
    image,
    icon,
    color,
    stats,
    features,
    caseStudy,
    compliance
  } = industry;

  return (
    <div className="card-organic bg-card border border-border p-8 h-full flex flex-col">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className={`w-12 h-12 ${color} rounded-genetic-md flex items-center justify-center`}>
            <Icon name={icon} size={24} className="text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-text-primary">{name}</h3>
            <p className="text-text-secondary">{stats?.companies}+ Companies</p>
          </div>
        </div>
        <div className="flex items-center space-x-1 text-sm text-success font-medium">
          <Icon name="TrendingUp" size={16} />
          <span>{stats?.growth}% Growth</span>
        </div>
      </div>
      <div className="relative mb-6 overflow-hidden rounded-genetic-md">
        <Image 
          src={image} 
          alt={`${name} industry automation`}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>
      <p className="text-text-secondary mb-6 flex-grow">{description}</p>
      <div className="space-y-4 mb-6">
        <div>
          <h4 className="font-semibold text-text-primary mb-2">Key Benefits</h4>
          <div className="grid grid-cols-2 gap-2">
            {features?.slice(0, 4)?.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2 text-sm">
                <Icon name="Check" size={14} className="text-success flex-shrink-0" />
                <span className="text-text-secondary">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-muted rounded-genetic-md p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-text-primary">Success Story</span>
            <span className="text-xs text-text-secondary">{caseStudy?.company}</span>
          </div>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-primary">{caseStudy?.timeSaved}</div>
              <div className="text-xs text-text-secondary">Time Saved</div>
            </div>
            <div>
              <div className="text-lg font-bold text-success">{caseStudy?.costReduction}</div>
              <div className="text-xs text-text-secondary">Cost Reduction</div>
            </div>
          </div>
        </div>

        {compliance && (
          <div className="flex items-center space-x-2 text-sm">
            <Icon name="Shield" size={14} className="text-primary" />
            <span className="text-text-secondary">{compliance} Compliant</span>
          </div>
        )}
      </div>
      <div className="flex flex-col sm:flex-row gap-3 mt-auto">
        <Button 
          variant="default" 
          size="sm" 
          className="flex-1"
          iconName="ArrowRight"
          iconPosition="right"
        >
          View Solutions
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          iconName="Calculator"
          iconPosition="left"
        >
          ROI Calculator
        </Button>
      </div>
    </div>
  );
};

export default IndustryCard;