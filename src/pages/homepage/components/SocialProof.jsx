import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const SocialProof = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Director of Operations",
      company: "TechEdu Solutions",
      industry: "Education",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      quote: "WorkflowGene transformed our student enrollment process. What used to take 3 days now happens in 30 minutes. Our staff can focus on what matters - educating students.",
      metrics: {
        timeSaved: "85%",
        efficiency: "300%",
        satisfaction: "98%"
      },
      videoThumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
    },
    {
      id: 2,
      name: "Dr. Michael Rodriguez",
      role: "Chief Medical Officer",
      company: "HealthFirst Clinic",
      industry: "Healthcare",
      avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      quote: "Patient care coordination has never been smoother. WorkflowGene's HIPAA-compliant automation reduced our administrative overhead by 60% while improving patient outcomes.",
      metrics: {
        overhead: "60%",
        accuracy: "99.5%",
        patientSat: "95%"
      },
      videoThumbnail: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
    },
    {
      id: 3,
      name: "Jennifer Park",
      role: "E-commerce Director",
      company: "StyleHub Retail",
      industry: "E-Commerce",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1061&q=80",
      quote: "Our order processing went from manual chaos to automated perfection. We\'re handling 10x more orders with the same team size. ROI was evident within the first month.",
      metrics: {
        orderVolume: "1000%",
        processing: "95%",
        roi: "400%"
      },
      videoThumbnail: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
    }
  ];

  const partners = [
    { name: "Salesforce", logo: "https://logos-world.net/wp-content/uploads/2020/08/Salesforce-Logo.png" },
    { name: "Microsoft", logo: "https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31" },
    { name: "Google", logo: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png" },
    { name: "Slack", logo: "https://a.slack-edge.com/80588/marketing/img/icons/icon_slack_hash_colored.png" },
    { name: "Zapier", logo: "https://cdn.zapier.com/storage/photos/9ec65c79de8ae54080c98165b4fd8c872561085a.png" },
    { name: "HubSpot", logo: "https://www.hubspot.com/hubfs/HubSpot_Logos/HubSpot-Inversed-Favicon.png" }
  ];

  const awards = [
    {
      title: "Best Workflow Automation Platform",
      organization: "TechCrunch Awards 2024",
      icon: "Award"
    },
    {
      title: "Top 50 SaaS Companies",
      organization: "Forbes Cloud 100",
      icon: "Trophy"
    },
    {
      title: "Customer Choice Award",
      organization: "Gartner Peer Insights",
      icon: "Star"
    }
  ];

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setActiveTestimonial((prev) => (prev + 1) % testimonials?.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials?.length]);

  const currentTestimonial = testimonials?.[activeTestimonial];

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 scroll-reveal">
          <div className="inline-flex items-center space-x-2 bg-success/10 text-success px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Icon name="Users" size={16} />
            <span>Trusted by 50,000+ Businesses</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-text-primary mb-6">
            Success Stories That Inspire
          </h2>
          
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            See how organizations across industries are transforming their operations with WorkflowGene Cloud.
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="mb-16 scroll-reveal stagger-1">
          <div className="bg-white rounded-genetic-xl shadow-organic-lg overflow-hidden">
            <div className="grid lg:grid-cols-2">
              {/* Video/Image */}
              <div className="relative">
                <Image
                  src={currentTestimonial?.videoThumbnail}
                  alt={`${currentTestimonial?.company} success story`}
                  className="w-full h-80 lg:h-full object-cover"
                />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <button className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-organic-lg hover:bg-white transition-all duration-genetic-normal micro-evolution">
                    <Icon name="Play" size={24} className="text-primary ml-1" />
                  </button>
                </div>

                {/* Industry Badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-text-primary">
                  {currentTestimonial?.industry}
                </div>
              </div>

              {/* Content */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="mb-6">
                  <Icon name="Quote" size={32} className="text-primary/20 mb-4" />
                  <blockquote className="text-xl lg:text-2xl text-text-primary leading-relaxed mb-6">
                    "{currentTestimonial?.quote}"
                  </blockquote>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4 mb-8 py-6 border-t border-b border-border">
                  {Object.entries(currentTestimonial?.metrics)?.map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="text-2xl font-bold text-primary">{value}</div>
                      <div className="text-sm text-text-secondary capitalize">
                        {key === 'timeSaved' ? 'Time Saved' :
                         key === 'efficiency' ? 'Efficiency Gain' :
                         key === 'satisfaction' ? 'User Satisfaction' :
                         key === 'overhead' ? 'Overhead Reduction' :
                         key === 'accuracy' ? 'Process Accuracy' :
                         key === 'patientSat' ? 'Patient Satisfaction' :
                         key === 'orderVolume' ? 'Order Volume Increase' :
                         key === 'processing' ? 'Faster Processing' :
                         key === 'roi' ? 'ROI Increase' : key}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Author */}
                <div className="flex items-center space-x-4">
                  <Image
                    src={currentTestimonial?.avatar}
                    alt={currentTestimonial?.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-text-primary">
                      {currentTestimonial?.name}
                    </div>
                    <div className="text-sm text-text-secondary">
                      {currentTestimonial?.role}, {currentTestimonial?.company}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial Navigation */}
          <div className="flex justify-center mt-8 space-x-4">
            {testimonials?.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveTestimonial(index);
                  setIsAutoPlaying(false);
                }}
                className={`w-12 h-12 rounded-full border-2 transition-all duration-genetic-normal ${
                  index === activeTestimonial
                    ? 'border-primary bg-primary/10' :'border-border hover:border-primary/50'
                }`}
              >
                <Image
                  src={testimonials?.[index]?.avatar}
                  alt={testimonials?.[index]?.name}
                  className="w-full h-full rounded-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Partner Logos */}
        <div className="mb-16 scroll-reveal stagger-2">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-text-primary mb-4">
              Trusted Integration Partners
            </h3>
            <p className="text-text-secondary">
              Seamlessly connect with the tools you already use
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {partners?.map((partner, index) => (
              <div
                key={partner?.name}
                className="flex items-center justify-center p-4 bg-white rounded-genetic-lg shadow-organic-sm hover:shadow-organic-md transition-all duration-genetic-normal grayscale hover:grayscale-0"
              >
                <Image
                  src={partner?.logo}
                  alt={`${partner?.name} integration`}
                  className="h-8 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Awards & Recognition */}
        <div className="scroll-reveal stagger-3">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-text-primary mb-4">
              Industry Recognition
            </h3>
            <p className="text-text-secondary">
              Recognized by leading industry analysts and publications
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {awards?.map((award, index) => (
              <div
                key={index}
                className="bg-white rounded-genetic-lg p-6 shadow-organic-sm hover:shadow-organic-md transition-all duration-genetic-normal text-center"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name={award?.icon} size={24} className="text-primary" />
                </div>
                <h4 className="font-semibold text-text-primary mb-2">
                  {award?.title}
                </h4>
                <p className="text-sm text-text-secondary">
                  {award?.organization}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 scroll-reveal stagger-4">
          <div className="bg-gradient-to-br from-primary to-accent rounded-genetic-xl p-8 lg:p-12 text-white">
            <h3 className="text-3xl lg:text-4xl font-bold mb-4">
              Join 50,000+ Successful Businesses
            </h3>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Start your transformation journey today and see why industry leaders choose WorkflowGene Cloud.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="secondary"
                size="lg"
                iconName="Play"
                iconPosition="left"
                className="bg-white text-primary hover:bg-white/90"
              >
                Start Free Trial
              </Button>
              <Button
                variant="outline"
                size="lg"
                iconName="Calendar"
                iconPosition="left"
                className="border-white/30 text-white hover:bg-white/10"
              >
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;