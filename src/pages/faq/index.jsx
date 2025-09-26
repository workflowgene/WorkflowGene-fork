import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import AIChatbot from '../../components/ui/AIChatbot';
import Input from '../../components/ui/Input';
import Icon from '../../components/AppIcon';

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [openItems, setOpenItems] = useState(new Set([0]));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = [
    { id: 'all', name: 'All Questions' },
    { id: 'getting-started', name: 'Getting Started' },
    { id: 'billing', name: 'Billing & Pricing' },
    { id: 'features', name: 'Features' },
    { id: 'security', name: 'Security' },
    { id: 'integrations', name: 'Integrations' },
    { id: 'support', name: 'Support' }
  ];

  const faqData = [
    {
      id: 1,
      category: 'getting-started',
      question: "How do I get started with WorkflowGene Cloud?",
      answer: `Getting started is easy! Sign up for a free account, and you'll be guided through our onboarding process. You can create your first workflow in under 15 minutes using our visual builder or choose from 500+ pre-built templates. Our Quick Start Guide will walk you through the basics, and our support team is available 24/7 to help.`
    },
    {
      id: 2,
      category: 'billing',
      question: "How does the 14-day free trial work?",
      answer: `Start your free trial instantly without providing a credit card. You'll get full access to Professional plan features for 14 days. After the trial ends, you can choose to upgrade to a paid plan or continue with our free Starter plan. No automatic charges, no surprises.`
    },
    {
      id: 3,
      category: 'features',
      question: "Can I integrate with my existing tools?",
      answer: `Absolutely! We offer 500+ pre-built integrations with popular business tools including Salesforce, Slack, Google Workspace, Microsoft 365, Shopify, and many more. Professional plans include custom API connections, and Enterprise plans include database connections and custom connectors.`
    },
    {
      id: 4,
      category: 'security',
      question: "Is my data secure and compliant?",
      answer: `Yes, security is our top priority. All plans include SSL encryption. Professional and Enterprise plans include data encryption at rest, SOC 2 Type II compliance, and GDPR compliance. We also offer HIPAA-ready configurations for healthcare organizations and FERPA compliance for educational institutions.`
    },
    {
      id: 5,
      category: 'billing',
      question: "Can I change plans at any time?",
      answer: `Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll be charged the prorated difference immediately. When downgrading, the change takes effect at your next billing cycle, and you'll continue to have access to your current plan's features until then.`
    },
    {
      id: 6,
      category: 'features',
      question: "What happens if I exceed my plan limits?",
      answer: `If you approach your plan limits, we'll notify you in advance. For workflow executions, you can purchase additional execution packs or upgrade to a higher plan. We never stop your workflows without warning - we'll always give you options to continue seamlessly.`
    },
    {
      id: 7,
      category: 'integrations',
      question: "How do integrations work?",
      answer: `Our integrations use secure OAuth connections and API keys to connect with your existing tools. Most integrations can be set up in just a few clicks. We handle all the technical complexity, so you can focus on building your workflows. Each integration includes detailed setup guides and our support team can help with complex configurations.`
    },
    {
      id: 8,
      category: 'support',
      question: "What kind of support do you offer?",
      answer: `We offer multiple support channels: email support for all plans, live chat for Professional plans, and phone support plus dedicated account managers for Enterprise plans. Our response times are 48 hours for Starter, 24 hours for Professional, and 4 hours for Enterprise. We also provide extensive documentation, video tutorials, and community forums.`
    },
    {
      id: 9,
      category: 'security',
      question: "Do you offer two-factor authentication?",
      answer: `Yes, we support two-factor authentication (2FA) using TOTP apps like Google Authenticator or Authy. Enterprise plans also include SSO integration with providers like Okta, Azure AD, and Google Workspace. We strongly recommend enabling 2FA for all accounts to enhance security.`
    },
    {
      id: 10,
      category: 'billing',
      question: "Do you offer refunds?",
      answer: `We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied within the first 30 days, we'll provide a full refund, no questions asked. For annual plans, this applies to the full annual payment.`
    },
    {
      id: 11,
      category: 'features',
      question: "Can I create custom workflows from scratch?",
      answer: `Absolutely! Our visual workflow builder allows you to create completely custom workflows using drag-and-drop components. You can add conditional logic, loops, error handling, and integrate with any of our 500+ supported applications. Advanced users can also write custom code snippets for specialized functionality.`
    },
    {
      id: 12,
      category: 'getting-started',
      question: "Do you provide training and onboarding?",
      answer: `Yes! All plans include access to our comprehensive documentation and video tutorials. Professional plans include group training sessions, and Enterprise plans include custom training programs and dedicated onboarding specialists. We also offer certification programs to help your team become automation experts.`
    }
  ];

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  const filteredFAQs = faqData.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Helmet>
        <title>FAQ - WorkflowGene Cloud | Frequently Asked Questions</title>
        <meta 
          name="description" 
          content="Find answers to frequently asked questions about WorkflowGene Cloud automation platform, pricing, features, security, and support." 
        />
        <meta name="keywords" content="FAQ, frequently asked questions, workflow automation help, WorkflowGene support" />
        <meta property="og:title" content="FAQ - WorkflowGene Cloud | Frequently Asked Questions" />
        <meta property="og:description" content="Find answers to frequently asked questions about WorkflowGene Cloud automation platform." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://workflowgene.cloud/faq" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20">
            <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Icon name="HelpCircle" size={16} />
                <span>Frequently Asked Questions</span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-text-primary mb-6">
                How can we help you?
              </h1>
              
              <p className="text-xl text-text-secondary mb-8">
                Find answers to common questions about WorkflowGene Cloud
              </p>
              
              <div className="max-w-2xl mx-auto">
                <Input
                  type="search"
                  placeholder="Search frequently asked questions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </section>

          {/* Categories */}
          <section className="py-8 bg-surface">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex flex-wrap gap-3 justify-center">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-genetic-lg font-medium transition-all duration-genetic-normal ${
                      selectedCategory === category.id
                        ? 'bg-primary text-white' :'bg-card text-text-secondary hover:bg-muted hover:text-text-primary'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ Items */}
          <section className="py-16 bg-background">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <div className="space-y-4">
                {filteredFAQs.map((item, index) => (
                  <div
                    key={item.id}
                    className="bg-card border border-border rounded-genetic-lg overflow-hidden transition-all duration-200 hover:shadow-organic-md"
                  >
                    <button
                      onClick={() => toggleItem(index)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-surface transition-colors"
                    >
                      <span className="font-semibold text-text-primary pr-4">
                        {item.question}
                      </span>
                      <Icon
                        name={openItems.has(index) ? 'ChevronUp' : 'ChevronDown'}
                        size={20}
                        className="text-text-secondary flex-shrink-0"
                      />
                    </button>
                    
                    {openItems.has(index) && (
                      <div className="px-6 pb-4 border-t border-border">
                        <div className="text-text-secondary leading-relaxed pt-4">
                          {item.answer}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {filteredFAQs.length === 0 && (
                <div className="text-center py-12">
                  <Icon name="Search" size={48} className="text-text-secondary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-text-primary mb-2">No questions found</h3>
                  <p className="text-text-secondary">
                    Try adjusting your search terms or browse different categories
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Contact Support */}
          <section className="py-16 bg-surface">
            <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
              <div className="bg-card rounded-genetic-xl p-8 shadow-organic-md">
                <h2 className="text-2xl font-bold text-text-primary mb-4">
                  Still have questions?
                </h2>
                <p className="text-text-secondary mb-6">
                  Our support team is here to help you succeed with automation
                </p>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-genetic-md flex items-center justify-center mx-auto mb-3">
                      <Icon name="MessageCircle" size={24} className="text-primary" />
                    </div>
                    <h3 className="font-semibold text-text-primary mb-2">Live Chat</h3>
                    <p className="text-sm text-text-secondary mb-4">Get instant help from our support team</p>
                    <button className="text-primary hover:underline text-sm font-medium">
                      Start Chat
                    </button>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-genetic-md flex items-center justify-center mx-auto mb-3">
                      <Icon name="Mail" size={24} className="text-primary" />
                    </div>
                    <h3 className="font-semibold text-text-primary mb-2">Email Support</h3>
                    <p className="text-sm text-text-secondary mb-4">Send us a detailed message</p>
                    <a href="mailto:support@workflowgene.cloud" className="text-primary hover:underline text-sm font-medium">
                      Send Email
                    </a>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-genetic-md flex items-center justify-center mx-auto mb-3">
                      <Icon name="BookOpen" size={24} className="text-primary" />
                    </div>
                    <h3 className="font-semibold text-text-primary mb-2">Documentation</h3>
                    <p className="text-sm text-text-secondary mb-4">Browse our comprehensive guides</p>
                    <a href="/documentation" className="text-primary hover:underline text-sm font-medium">
                      View Docs
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
        <AIChatbot />
      </div>
    </>
  );
};

export default FAQ;