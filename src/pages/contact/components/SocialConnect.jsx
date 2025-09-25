import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SocialConnect = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const socialLinks = [
    { name: "LinkedIn", icon: "Linkedin", url: "https://linkedin.com/company/workflowgene" },
    { name: "Twitter", icon: "Twitter", url: "https://twitter.com/workflowgene" },
    { name: "GitHub", icon: "Github", url: "https://github.com/workflowgene" },
    { name: "YouTube", icon: "Youtube", url: "https://youtube.com/workflowgene" }
  ];

  const handleEmailSubmit = async (e) => {
    e?.preventDefault();
    // Simulate subscription
    setTimeout(() => {
      setIsSubscribed(true);
      setEmail('');
    }, 1000);
  };

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Social Media & Community */}
        <div className="text-center mb-12">
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
        </div>

        {/* Newsletter Signup */}
        <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-genetic-lg p-8 max-w-2xl mx-auto">
          {!isSubscribed ? (
            <>
              <h4 className="text-xl font-semibold text-text-primary mb-4 text-center">
                Stay Updated
              </h4>
              <p className="text-text-secondary mb-6 text-center">
                Subscribe to our newsletter for the latest product updates, automation insights, and company news.
              </p>
              <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e?.target?.value)}
                  className="flex-1"
                  required
                />
                <Button
                  type="submit"
                  variant="default"
                  iconName="Send"
                  iconPosition="right"
                  className="btn-organic"
                >
                  Subscribe
                </Button>
              </form>
            </>
          ) : (
            <div className="text-center">
              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="CheckCircle" size={24} className="text-success" />
              </div>
              <h4 className="text-xl font-semibold text-text-primary mb-2">
                Thank You for Subscribing!
              </h4>
              <p className="text-text-secondary">
                You'll receive our latest updates and insights in your inbox.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SocialConnect;