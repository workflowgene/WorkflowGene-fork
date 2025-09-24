import React from 'react';


const PricingToggle = ({ billingCycle, setBillingCycle }) => {
  return (
    <div className="flex items-center justify-center mb-12">
      <div className="bg-muted p-1 rounded-lg flex items-center">
        <button
          onClick={() => setBillingCycle('monthly')}
          className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
            billingCycle === 'monthly' ?'bg-background text-text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
          }`}
        >
          Monthly
        </button>
        <button
          onClick={() => setBillingCycle('annual')}
          className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
            billingCycle === 'annual' ?'bg-background text-text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
          }`}
        >
          <span>Annual</span>
          <div className="bg-success text-white px-2 py-1 rounded text-xs font-medium">
            Save 20%
          </div>
        </button>
      </div>
    </div>
  );
};

export default PricingToggle;