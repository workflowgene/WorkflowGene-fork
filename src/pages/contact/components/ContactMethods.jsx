import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ContactMethods = () => {
  const contactMethods = [
    {
      title: "Sales Inquiries",
      description: "Ready to transform your business workflows? Our sales team is here to help.",
      icon: "Phone",
      contact: "sales@workflowgene.cloud",
      action: "Schedule Demo",
      color: "primary"
    },
    {
      title: "Customer Support",
      description: "Need help with your existing WorkflowGene Cloud implementation?",
      icon: "HeadphonesIcon",
      contact: "support@workflowgene.cloud",
      action: "Get Support",
      color: "success"
    },
    {
      title: "Partnership Opportunities",
      description: "Interested in becoming a WorkflowGene Cloud integration partner?",
      icon: "Handshake",
      contact: "partnerships@workflowgene.cloud",
      action: "Partner With Us",
      color: "accent"
    },
    {
      title: "Media & Press",
      description: "Journalists and media professionals can reach our press team here.",
      icon: "Newspaper",
      contact: "press@workflowgene.cloud",
      action: "Press Inquiries",
      color: "secondary"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            How Can We Help You?
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Choose the best way to reach us based on your needs. Our team is ready to assist you with any questions or requirements.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {contactMethods?.map((method, index) => (
            <div key={index} className="card-organic bg-card p-6">
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 bg-gradient-to-br from-${method?.color}/10 to-${method?.color}/20 rounded-genetic-lg flex items-center justify-center flex-shrink-0`}>
                  <Icon name={method?.icon} size={20} className={`text-${method?.color}`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-text-primary mb-2">
                    {method?.title}
                  </h3>
                  <p className="text-text-secondary mb-4 leading-relaxed">
                    {method?.description}
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <a 
                      href={`mailto:${method?.contact}`}
                      className="text-sm text-primary hover:underline"
                    >
                      {method?.contact}
                    </a>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="ArrowRight"
                      iconPosition="right"
                    >
                      {method?.action}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactMethods;