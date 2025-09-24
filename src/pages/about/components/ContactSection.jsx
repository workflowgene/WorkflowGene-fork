import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ContactSection = () => {
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

  const officeHours = [
    {
      region: "Americas",
      timezone: "PST/EST",
      hours: "Monday - Friday: 6:00 AM - 6:00 PM",
      support: "24/7 Emergency Support Available"
    },
    {
      region: "Europe",
      timezone: "CET/GMT",
      hours: "Monday - Friday: 9:00 AM - 6:00 PM",
      support: "Extended Hours for Enterprise Clients"
    },
    {
      region: "Asia Pacific",
      timezone: "JST/AEST",
      hours: "Monday - Friday: 9:00 AM - 6:00 PM",
      support: "Multilingual Support Available"
    }
  ];

  const socialLinks = [
    { name: "LinkedIn", icon: "Linkedin", url: "https://linkedin.com/company/workflowgene" },
    { name: "Twitter", icon: "Twitter", url: "https://twitter.com/workflowgene" },
    { name: "GitHub", icon: "Github", url: "https://github.com/workflowgene" },
    { name: "YouTube", icon: "Youtube", url: "https://youtube.com/workflowgene" }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Get in Touch
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Whether you're interested in our platform, need support, or want to explore partnership opportunities, we're here to help. Reach out to us through any of the channels below.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
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

        {/* Office Hours */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-text-primary text-center mb-8">
            Global Support Hours
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {officeHours?.map((office, index) => (
              <div key={index} className="bg-surface rounded-genetic-lg p-6 text-center">
                <h4 className="text-lg font-semibold text-text-primary mb-2">
                  {office?.region}
                </h4>
                <p className="text-sm text-primary font-medium mb-3">
                  {office?.timezone}
                </p>
                <p className="text-text-secondary mb-3">
                  {office?.hours}
                </p>
                <p className="text-xs text-success">
                  {office?.support}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Headquarters Map */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-text-primary text-center mb-8">
            Visit Our Headquarters
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-card rounded-genetic-lg p-6 shadow-organic-md">
                <h4 className="text-lg font-semibold text-text-primary mb-4">
                  San Francisco Headquarters
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Icon name="MapPin" size={18} className="text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-text-primary font-medium">Address</p>
                      <p className="text-text-secondary text-sm">
                        123 Market Street, Suite 500<br />
                        San Francisco, CA 94105
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Icon name="Phone" size={18} className="text-primary" />
                    <div>
                      <p className="text-text-primary font-medium">Phone</p>
                      <p className="text-text-secondary text-sm">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Icon name="Clock" size={18} className="text-primary" />
                    <div>
                      <p className="text-text-primary font-medium">Office Hours</p>
                      <p className="text-text-secondary text-sm">Monday - Friday: 9:00 AM - 6:00 PM PST</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-genetic-lg p-6 shadow-organic-md">
                <h4 className="text-lg font-semibold text-text-primary mb-4">
                  Getting Here
                </h4>
                <div className="space-y-2 text-sm text-text-secondary">
                  <p>• 2 blocks from Montgomery BART station</p>
                  <p>• Multiple bus lines nearby (1, 8, 12, 30, 45)</p>
                  <p>• Visitor parking available in building garage</p>
                  <p>• Bike parking and shower facilities on-site</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-genetic-lg overflow-hidden shadow-organic-md">
              <iframe
                width="100%"
                height="400"
                loading="lazy"
                title="WorkflowGene Cloud Headquarters"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=37.7749,-122.4194&z=15&output=embed"
                className="border-0"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Social Media & Community */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-text-primary mb-8">
            Connect With Us
          </h3>
          <div className="flex justify-center space-x-6 mb-8">
            {socialLinks?.map((social, index) => (
              <a
                key={index}
                href={social?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-surface rounded-genetic-lg flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-genetic-normal micro-evolution"
                aria-label={`Follow us on ${social?.name}`}
              >
                <Icon name={social?.icon} size={20} />
              </a>
            ))}
          </div>

          <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-genetic-lg p-8 max-w-2xl mx-auto">
            <h4 className="text-xl font-semibold text-text-primary mb-4">
              Stay Updated
            </h4>
            <p className="text-text-secondary mb-6">
              Subscribe to our newsletter for the latest product updates, automation insights, and company news.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-border rounded-genetic-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <Button
                variant="default"
                iconName="Send"
                iconPosition="right"
                className="btn-organic"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;