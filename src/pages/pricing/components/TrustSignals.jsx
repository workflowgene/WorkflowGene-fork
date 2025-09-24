import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const certifications = [
    {
      name: 'SOC 2 Type II',
      description: 'Security audit certification',
      icon: 'Shield',
      verified: true
    },
    {
      name: 'GDPR Compliant',
      description: 'European data protection',
      icon: 'Lock',
      verified: true
    },
    {
      name: 'ISO 27001',
      description: 'Information security management',
      icon: 'Award',
      verified: true
    },
    {
      name: 'HIPAA Ready',
      description: 'Healthcare data protection',
      icon: 'Heart',
      verified: true
    }
  ];

  const guarantees = [
    {
      title: '99.9% Uptime SLA',
      description: 'Guaranteed service availability',
      icon: 'Activity'
    },
    {
      title: '30-Day Money Back',
      description: 'Full refund guarantee',
      icon: 'RefreshCw'
    },
    {
      title: 'Enterprise Security',
      description: 'Bank-level data protection',
      icon: 'Shield'
    },
    {
      title: '24/7 Monitoring',
      description: 'Continuous system monitoring',
      icon: 'Eye'
    }
  ];

  const testimonials = [
    {
      quote: "WorkflowGene saved us $50,000 in the first year by automating our invoice processing. The ROI was immediate.",
      author: "Sarah Chen",
      role: "CFO",
      company: "TechFlow Solutions",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face"
    },
    {
      quote: "Implementation was seamless. We went from manual processes to fully automated workflows in just 2 weeks.",
      author: "Michael Rodriguez",
      role: "Operations Director",
      company: "HealthCare Plus",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face"
    },
    {
      quote: "The customer support is exceptional. They helped us customize workflows that perfectly fit our unique needs.",
      author: "Emily Johnson",
      role: "IT Manager",
      company: "EduTech Academy",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Security Certifications */}
        <div className="text-center mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-8">
            Enterprise-Grade Security & Compliance
          </h2>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications?.map((cert, index) => (
              <div key={index} className="bg-card border border-border rounded-lg p-6 text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name={cert?.icon} size={24} className="text-success" />
                </div>
                <h3 className="font-semibold text-text-primary mb-2">{cert?.name}</h3>
                <p className="text-sm text-text-secondary">{cert?.description}</p>
                {cert?.verified && (
                  <div className="flex items-center justify-center space-x-1 mt-3">
                    <Icon name="CheckCircle" size={16} className="text-success" />
                    <span className="text-xs text-success font-medium">Verified</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Guarantees */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary text-center mb-8">
            Our Guarantees to You
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {guarantees?.map((guarantee, index) => (
              <div key={index} className="bg-card border border-border rounded-lg p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name={guarantee?.icon} size={24} className="text-primary" />
                </div>
                <h3 className="font-semibold text-text-primary mb-2">{guarantee?.title}</h3>
                <p className="text-sm text-text-secondary">{guarantee?.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Customer Testimonials */}
        <div>
          <h2 className="text-2xl font-bold text-text-primary text-center mb-8">
            Trusted by Industry Leaders
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {testimonials?.map((testimonial, index) => (
              <div key={index} className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)]?.map((_, i) => (
                    <Icon key={i} name="Star" size={16} className="text-warning fill-current" />
                  ))}
                </div>
                
                <blockquote className="text-text-primary mb-6 leading-relaxed">
                  "{testimonial?.quote}"
                </blockquote>
                
                <div className="flex items-center space-x-3">
                  <img
                    src={testimonial?.avatar}
                    alt={testimonial?.author}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-text-primary">{testimonial?.author}</div>
                    <div className="text-sm text-text-secondary">
                      {testimonial?.role}, {testimonial?.company}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Trust Metrics */}
        <div className="mt-16 bg-muted/30 rounded-xl p-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
              <div className="text-sm text-text-secondary">Active Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
              <div className="text-sm text-text-secondary">Uptime SLA</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">50M+</div>
              <div className="text-sm text-text-secondary">Workflows Executed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-sm text-text-secondary">Expert Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSignals;