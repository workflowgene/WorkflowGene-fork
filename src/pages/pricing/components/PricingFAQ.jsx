import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const PricingFAQ = () => {
  const [openItems, setOpenItems] = useState(new Set([0]));

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems?.has(index)) {
      newOpenItems?.delete(index);
    } else {
      newOpenItems?.add(index);
    }
    setOpenItems(newOpenItems);
  };

  const faqData = [
    {
      question: "How does the 14-day free trial work?",
      answer: `Start your free trial instantly without providing a credit card. You'll get full access to Professional plan features for 14 days. After the trial ends, you can choose to upgrade to a paid plan or continue with our free Starter plan. No automatic charges, no surprises.`
    },
    {
      question: "Can I change plans at any time?",
      answer: `Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll be charged the prorated difference immediately. When downgrading, the change takes effect at your next billing cycle, and you'll continue to have access to your current plan's features until then.`
    },
    {
      question: "What happens if I exceed my plan limits?",
      answer: `If you approach your plan limits, we'll notify you in advance. For workflow executions, you can purchase additional execution packs or upgrade to a higher plan. We never stop your workflows without warning - we'll always give you options to continue seamlessly.`
    },
    {
      question: "Do you offer discounts for annual billing?",
      answer: `Yes! Annual billing saves you 20% compared to monthly billing. For example, the Professional plan costs $200/month or $1,920/year (equivalent to $160/month). Enterprise customers can also access additional volume discounts.`
    },
    {
      question: "What\'s included in Enterprise support?",
      answer: `Enterprise support includes a dedicated account manager, 4-hour response time guarantee, phone support, custom training sessions, implementation assistance, and priority feature requests. You'll also get access to our enterprise Slack channel for real-time support.`
    },
    {
      question: "Can I integrate with my existing tools?",
      answer: `Absolutely! We offer 500+ pre-built integrations with popular business tools. Professional plans include custom API connections, and Enterprise plans include database connections and custom connectors. Our integration team can help with complex setups.`
    },
    {
      question: "Is my data secure and compliant?",
      answer: `Yes, we take security seriously. All plans include SSL encryption. Professional and Enterprise plans include data encryption at rest, SOC 2 compliance, and GDPR compliance. Enterprise plans also include SSO, advanced permissions, and comprehensive audit logs.`
    },
    {
      question: "What if I need custom features or integrations?",
      answer: `Enterprise customers can request custom features and integrations. We work closely with our enterprise clients to build solutions that fit their specific needs. Contact our sales team to discuss your requirements and timeline.`
    },
    {
      question: "Do you offer refunds?",
      answer: `We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied within the first 30 days, we'll provide a full refund, no questions asked. For annual plans, this applies to the full annual payment.`
    },
    {
      question: "How does pricing work for large teams?",
      answer: `Our pricing is based on features and usage limits, not per-user. This means your entire team can use WorkflowGene without additional per-seat costs. For very large organizations (1000+ employees), we offer custom enterprise pricing with volume discounts.`
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-text-secondary">
            Everything you need to know about our pricing and plans.
          </p>
        </div>
        
        <div className="space-y-4">
          {faqData?.map((item, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-lg overflow-hidden transition-all duration-200 hover:shadow-md"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-muted/20 transition-colors"
              >
                <span className="font-semibold text-text-primary pr-4">
                  {item?.question}
                </span>
                <Icon
                  name={openItems?.has(index) ? 'ChevronUp' : 'ChevronDown'}
                  size={20}
                  className="text-text-secondary flex-shrink-0"
                />
              </button>
              
              {openItems?.has(index) && (
                <div className="px-6 pb-4">
                  <div className="text-text-secondary leading-relaxed">
                    {item?.answer}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <div className="bg-card border border-border rounded-lg p-8">
            <h3 className="text-xl font-semibold text-text-primary mb-2">
              Still have questions?
            </h3>
            <p className="text-text-secondary mb-6">
              Our team is here to help you find the perfect plan for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 font-medium">
                <Icon name="MessageCircle" size={16} />
                <span>Start a chat</span>
              </button>
              <button className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 font-medium">
                <Icon name="Mail" size={16} />
                <span>Send us an email</span>
              </button>
              <button className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 font-medium">
                <Icon name="Calendar" size={16} />
                <span>Schedule a call</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingFAQ;