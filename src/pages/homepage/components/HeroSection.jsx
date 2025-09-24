import React, { useState, useEffect } from 'react';

import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const heroSlides = [
    {
      id: 1,
      title: "Automation is Your Business DNA",
      subtitle: "Transform your operations with intelligent workflows that evolve with your business",
      description: "WorkflowGene Cloud integrates seamlessly into your business processes, becoming the genetic code that drives efficiency, growth, and innovation.",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      stats: { users: "50,000+", processes: "2M+", efficiency: "85%" }
    },
    {
      id: 2,
      title: "Focus on Growth, Not Repetitive Tasks",
      subtitle: "Let AI handle the routine while you drive strategic initiatives",
      description: "Our intelligent automation platform eliminates manual bottlenecks, freeing your team to focus on what matters most - growing your business.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80",
      stats: { saved: "40hrs/week", roi: "300%", satisfaction: "98%" }
    },
    {
      id: 3,
      title: "Intelligent Workflows That Evolve",
      subtitle: "Adaptive automation that learns and improves with your business",
      description: "Experience next-generation workflow automation that adapts to your changing needs, scales with your growth, and continuously optimizes performance.",
      image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
      stats: { accuracy: "99.9%", uptime: "99.99%", integrations: "500+" }
    }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides?.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [heroSlides?.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides?.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides?.length) % heroSlides?.length);
  };

  const currentHero = heroSlides?.[currentSlide];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-background via-surface to-muted overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232563EB' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      <div className="relative z-10 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            {/* Content */}
            <div className={`space-y-8 ${isVisible ? 'scroll-reveal revealed' : 'scroll-reveal'}`}>
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                  <Icon name="Zap" size={16} />
                  <span>New: AI-Powered Workflow Intelligence</span>
                </div>
                
                <h1 className="text-5xl lg:text-6xl font-bold text-text-primary leading-tight">
                  {currentHero?.title}
                </h1>
                
                <h2 className="text-xl lg:text-2xl text-text-secondary font-medium">
                  {currentHero?.subtitle}
                </h2>
                
                <p className="text-lg text-text-secondary leading-relaxed max-w-xl">
                  {currentHero?.description}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6">
                {Object.entries(currentHero?.stats)?.map(([key, value], index) => (
                  <div key={key} className={`text-center stagger-${index + 1}`}>
                    <div className="text-2xl lg:text-3xl font-bold text-primary">
                      {value}
                    </div>
                    <div className="text-sm text-text-secondary capitalize">
                      {key === 'users' ? 'Active Users' : 
                       key === 'processes' ? 'Processes Automated' :
                       key === 'efficiency' ? 'Efficiency Gain' :
                       key === 'saved' ? 'Time Saved' :
                       key === 'roi' ? 'Average ROI' :
                       key === 'satisfaction' ? 'Customer Satisfaction' :
                       key === 'accuracy' ? 'Process Accuracy' :
                       key === 'uptime' ? 'System Uptime' :
                       key === 'integrations' ? 'Integrations' : key}
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  variant="default" 
                  size="lg" 
                  className="btn-organic"
                  iconName="Play"
                  iconPosition="left"
                >
                  Start Free Trial
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  iconName="Calendar"
                  iconPosition="left"
                >
                  Book Demo
                </Button>
              </div>

              <div className="flex items-center space-x-4 text-sm text-text-secondary">
                <div className="flex items-center space-x-1">
                  <Icon name="Check" size={16} className="text-success" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Check" size={16} className="text-success" />
                  <span>14-day free trial</span>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className={`relative ${isVisible ? 'scroll-reveal revealed stagger-2' : 'scroll-reveal'}`}>
              <div className="relative rounded-genetic-xl overflow-hidden shadow-organic-lg">
                <Image
                  src={currentHero?.image}
                  alt={`${currentHero?.title} - WorkflowGene Cloud`}
                  className="w-full h-[500px] object-cover"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                
                {/* Floating Cards */}
                <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm rounded-genetic-md p-4 shadow-organic-md">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
                      <Icon name="TrendingUp" size={20} className="text-success" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-text-primary">Efficiency Boost</div>
                      <div className="text-xs text-text-secondary">+{currentHero?.stats?.efficiency || '85%'} this month</div>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-genetic-md p-4 shadow-organic-md">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon name="Users" size={20} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-text-primary">Active Users</div>
                      <div className="text-xs text-text-secondary">{currentHero?.stats?.users || '50,000+'} worldwide</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="absolute top-1/2 -translate-y-1/2 -left-4">
                <button
                  onClick={prevSlide}
                  className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-organic-md flex items-center justify-center text-text-primary hover:bg-white transition-all duration-genetic-normal micro-evolution"
                >
                  <Icon name="ChevronLeft" size={20} />
                </button>
              </div>
              
              <div className="absolute top-1/2 -translate-y-1/2 -right-4">
                <button
                  onClick={nextSlide}
                  className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-organic-md flex items-center justify-center text-text-primary hover:bg-white transition-all duration-genetic-normal micro-evolution"
                >
                  <Icon name="ChevronRight" size={20} />
                </button>
              </div>

              {/* Slide Indicators */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
                {heroSlides?.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-genetic-normal ${
                      index === currentSlide 
                        ? 'bg-primary scale-110' :'bg-border hover:bg-primary/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center space-y-2 text-text-secondary">
          <span className="text-sm">Scroll to explore</span>
          <Icon name="ChevronDown" size={20} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;