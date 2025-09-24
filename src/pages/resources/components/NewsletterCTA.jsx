import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const NewsletterCTA = () => {
  const [email, setEmail] = useState('');
  const [interests, setInterests] = useState([]);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const interestOptions = [
    { id: 'trends', label: 'Automation Trends', icon: 'TrendingUp' },
    { id: 'tutorials', label: 'Step-by-Step Tutorials', icon: 'BookOpen' },
    { id: 'case-studies', label: 'Success Stories', icon: 'Award' },
    { id: 'webinars', label: 'Webinar Invitations', icon: 'Video' },
    { id: 'templates', label: 'New Templates', icon: 'FileTemplate' },
    { id: 'industry', label: 'Industry Insights', icon: 'Building2' }
  ];

  const handleInterestToggle = (interestId) => {
    setInterests(prev => 
      prev?.includes(interestId)
        ? prev?.filter(id => id !== interestId)
        : [...prev, interestId]
    );
  };

  const handleSubscribe = (e) => {
    e?.preventDefault();
    if (email) {
      setIsSubscribed(true);
      // Mock subscription logic
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
        setInterests([]);
      }, 3000);
    }
  };

  if (isSubscribed) {
    return (
      <section className="py-16 bg-gradient-to-br from-success/10 via-background to-primary/5">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-success/20 rounded-full mb-6">
            <Icon name="CheckCircle" size={32} className="text-success" />
          </div>
          <h2 className="text-3xl font-bold text-text-primary mb-4">
            Welcome to the Community!
          </h2>
          <p className="text-lg text-text-secondary mb-6">
            Thank you for subscribing! You'll receive your first automation insights within 24 hours.
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm text-text-secondary">
            <div className="flex items-center space-x-2">
              <Icon name="Mail" size={16} />
              <span>Weekly insights</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Gift" size={16} />
              <span>Exclusive templates</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={16} />
              <span>Community access</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="bg-card rounded-genetic-xl p-8 lg:p-12 shadow-organic-lg">
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Icon name="Mail" size={16} />
              <span>Stay Updated</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Join 25,000+ Automation Professionals
            </h2>
            <p className="text-lg text-text-secondary">
              Get weekly insights, exclusive templates, and early access to new features. No spam, unsubscribe anytime.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="space-y-6">
            <div className="max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e?.target?.value)}
                required
                className="text-center"
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-4 text-center">
                What interests you most?
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-2xl mx-auto">
                {interestOptions?.map((option) => (
                  <button
                    key={option?.id}
                    type="button"
                    onClick={() => handleInterestToggle(option?.id)}
                    className={`flex items-center space-x-2 p-3 rounded-genetic-md border transition-all duration-200 ${
                      interests?.includes(option?.id)
                        ? 'border-primary bg-primary/10 text-primary' :'border-border hover:border-primary/50 hover:bg-surface text-text-secondary'
                    }`}
                  >
                    <Icon name={option?.icon} size={16} />
                    <span className="text-sm font-medium">{option?.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="text-center">
              <Button 
                type="submit"
                variant="default" 
                size="lg"
                className="btn-organic"
                iconName="ArrowRight"
                iconPosition="right"
              >
                Subscribe Free
              </Button>
              <p className="text-xs text-text-secondary mt-3">
                By subscribing, you agree to our Privacy Policy and Terms of Service
              </p>
            </div>
          </form>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-8 border-t border-border">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-genetic-md mb-3">
                <Icon name="TrendingUp" size={24} className="text-primary" />
              </div>
              <h4 className="font-semibold text-text-primary mb-2">Weekly Insights</h4>
              <p className="text-sm text-text-secondary">
                Latest automation trends and industry analysis
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/10 rounded-genetic-md mb-3">
                <Icon name="Gift" size={24} className="text-accent" />
              </div>
              <h4 className="font-semibold text-text-primary mb-2">Exclusive Content</h4>
              <p className="text-sm text-text-secondary">
                Subscriber-only templates and resources
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-success/10 rounded-genetic-md mb-3">
                <Icon name="Zap" size={24} className="text-success" />
              </div>
              <h4 className="font-semibold text-text-primary mb-2">Early Access</h4>
              <p className="text-sm text-text-secondary">
                Be first to try new features and tools
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterCTA;