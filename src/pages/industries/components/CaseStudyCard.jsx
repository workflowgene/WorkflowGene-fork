import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const CaseStudyCard = ({ caseStudy, featured = false }) => {
  const {
    id,
    company,
    industry,
    logo,
    image,
    challenge,
    solution,
    results,
    testimonial,
    metrics,
    timeline,
    tags
  } = caseStudy;

  return (
    <div className={`card-organic bg-card border border-border overflow-hidden ${
      featured ? 'lg:col-span-2' : ''
    }`}>
      <div className="relative">
        <Image 
          src={image} 
          alt={`${company} case study`}
          className={`w-full object-cover ${featured ? 'h-64' : 'h-48'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-white rounded-genetic-md p-2">
              <Image src={logo} alt={`${company} logo`} className="w-full h-full object-contain" />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">{company}</h3>
              <p className="text-white/80 text-sm">{industry}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags?.slice(0, 3)?.map((tag, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="mb-6">
          <h4 className="font-semibold text-text-primary mb-2">Challenge</h4>
          <p className="text-text-secondary text-sm leading-relaxed">{challenge}</p>
        </div>

        <div className="mb-6">
          <h4 className="font-semibold text-text-primary mb-2">Solution</h4>
          <p className="text-text-secondary text-sm leading-relaxed">{solution}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {metrics?.map((metric, index) => (
            <div key={index} className="text-center p-3 bg-muted rounded-genetic-md">
              <div className="text-xl font-bold text-primary">{metric?.value}</div>
              <div className="text-xs text-text-secondary">{metric?.label}</div>
            </div>
          ))}
        </div>

        {testimonial && (
          <div className="bg-primary/5 border-l-4 border-primary p-4 mb-6">
            <blockquote className="text-text-primary italic text-sm mb-2">
              "{testimonial?.quote}"
            </blockquote>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                <Icon name="User" size={14} className="text-primary" />
              </div>
              <div>
                <div className="text-sm font-medium text-text-primary">{testimonial?.author}</div>
                <div className="text-xs text-text-secondary">{testimonial?.role}</div>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between text-sm text-text-secondary mb-4">
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={14} />
            <span>Implementation: {timeline}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="TrendingUp" size={14} />
            <span>ROI: {results}</span>
          </div>
        </div>

        <div className="flex gap-3">
          <Button 
            variant="default" 
            size="sm" 
            className="flex-1"
            iconName="FileText"
            iconPosition="left"
          >
            Full Case Study
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            iconName="Play"
            iconPosition="left"
          >
            Watch Video
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyCard;