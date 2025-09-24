import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const PricingCard = ({ plan, billingCycle, isPopular = false }) => {
  const getPrice = () => {
    if (plan?.price === 0) return 'Free';
    if (plan?.price === 'custom') return 'Custom';
    
    const price = billingCycle === 'annual' ? plan?.price * 0.8 : plan?.price;
    return `$${price?.toFixed(0)}`;
  };

  const getOriginalPrice = () => {
    if (billingCycle === 'annual' && plan?.price !== 0 && plan?.price !== 'custom') {
      return `$${plan?.price}`;
    }
    return null;
  };

  return (
    <div className={`relative bg-card border rounded-xl p-8 transition-all duration-300 hover:shadow-lg ${
      isPopular ? 'border-primary shadow-lg scale-105' : 'border-border hover:border-primary/50'
    }`}>
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-primary text-white px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2">
            <Icon name="Star" size={16} className="fill-current" />
            <span>Most Popular</span>
          </div>
        </div>
      )}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-text-primary mb-2">{plan?.name}</h3>
        <p className="text-text-secondary mb-6">{plan?.description}</p>
        
        <div className="mb-6">
          <div className="flex items-baseline justify-center space-x-2">
            <span className="text-4xl font-bold text-text-primary">{getPrice()}</span>
            {plan?.price !== 0 && plan?.price !== 'custom' && (
              <span className="text-text-secondary">
                /{billingCycle === 'annual' ? 'year' : 'month'}
              </span>
            )}
          </div>
          {getOriginalPrice() && (
            <div className="flex items-center justify-center space-x-2 mt-2">
              <span className="text-text-secondary line-through text-sm">
                {getOriginalPrice()}/month
              </span>
              <span className="bg-success/10 text-success px-2 py-1 rounded text-xs font-medium">
                20% off
              </span>
            </div>
          )}
        </div>
        
        <Button
          variant={isPopular ? 'default' : 'outline'}
          fullWidth
          className="mb-6"
          iconName={plan?.price === 'custom' ? 'MessageCircle' : 'ArrowRight'}
          iconPosition="right"
        >
          {plan?.price === 'custom' ? 'Contact Sales' : plan?.price === 0 ? 'Start Free' : 'Start Trial'}
        </Button>
      </div>
      <div className="space-y-4">
        <h4 className="font-semibold text-text-primary mb-4">Everything in {plan?.name}:</h4>
        {plan?.features?.map((feature, index) => (
          <div key={index} className="flex items-start space-x-3">
            <Icon 
              name={feature?.included ? 'Check' : 'X'} 
              size={16} 
              className={feature?.included ? 'text-success mt-1' : 'text-error mt-1'} 
            />
            <span className={`text-sm ${feature?.included ? 'text-text-primary' : 'text-text-secondary'}`}>
              {feature?.name}
            </span>
          </div>
        ))}
      </div>
      {plan?.limits && (
        <div className="mt-6 pt-6 border-t border-border">
          <h5 className="font-medium text-text-primary mb-3">Usage Limits:</h5>
          <div className="space-y-2">
            {plan?.limits?.map((limit, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span className="text-text-secondary">{limit?.name}</span>
                <span className="text-text-primary font-medium">{limit?.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PricingCard;