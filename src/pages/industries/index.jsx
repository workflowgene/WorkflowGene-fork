import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import IndustryHero from './components/IndustryHero';
import IndustryCard from './components/IndustryCard';
import ROICalculator from './components/ROICalculator';
import CaseStudyCard from './components/CaseStudyCard';
import ComplianceSection from './components/ComplianceSection';
import ResourcesSection from './components/ResourcesSection';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const Industries = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const industries = [
    {
      id: 'education',
      name: 'Education',
      description: 'Transform educational institutions with intelligent automation that streamlines student services, faculty workflows, and administrative processes while maintaining FERPA compliance and enhancing the learning experience.',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9d1?w=600&h=400&fit=crop&crop=center',
      icon: 'GraduationCap',
      color: 'bg-blue-500',
      stats: {
        companies: 250,
        growth: 45
      },
      features: [
        'Student Enrollment',
        'Grade Management',
        'Faculty Scheduling',
        'Parent Communication',
        'Compliance Reporting',
        'Resource Planning'
      ],
      caseStudy: {
        company: 'Metro University',
        timeSaved: '75%',
        costReduction: '$450K'
      },
      compliance: 'FERPA'
    },
    {
      id: 'healthcare',
      name: 'Healthcare',
      description: 'Revolutionize patient care with HIPAA-compliant automation that optimizes appointment scheduling, patient intake, medical records management, and billing processes while improving patient outcomes and operational efficiency.',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop&crop=center',
      icon: 'Heart',
      color: 'bg-red-500',
      stats: {
        companies: 180,
        growth: 62
      },
      features: [
        'Patient Scheduling',
        'Medical Records',
        'Billing Automation',
        'Insurance Processing',
        'Compliance Tracking',
        'Care Coordination'
      ],
      caseStudy: {
        company: 'Regional Medical Center',
        timeSaved: '80%',
        costReduction: '$1.2M'
      },
      compliance: 'HIPAA'
    },
    {
      id: 'ecommerce',
      name: 'E-Commerce',
      description: 'Scale your online business with powerful automation that handles order processing, inventory management, customer service, and marketing campaigns while ensuring PCI compliance and maximizing conversion rates.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&crop=center',
      icon: 'ShoppingCart',
      color: 'bg-green-500',
      stats: {
        companies: 420,
        growth: 38
      },
      features: [
        'Order Processing',
        'Inventory Management',
        'Customer Support',
        'Marketing Automation',
        'Payment Processing',
        'Analytics & Reporting'
      ],
      caseStudy: {
        company: 'TechGear Online',
        timeSaved: '65%',
        costReduction: '$850K'
      },
      compliance: 'PCI DSS'
    }
  ];

  const featuredCaseStudies = [
    {
      id: 1,
      company: 'Metro University System',
      industry: 'Education',
      logo: 'https://images.unsplash.com/photo-1523050854058-8df90110c9d1?w=100&h=100&fit=crop&crop=center',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9d1?w=800&h=400&fit=crop&crop=center',
      challenge: 'Manual student enrollment processes were taking weeks to complete, causing delays in class assignments and frustrating both students and staff. The university needed to process 15,000+ enrollments each semester.',
      solution: 'Implemented WorkflowGene Cloud to automate the entire enrollment pipeline, from application review to class assignment, with integrated FERPA-compliant document management and automated notifications.',
      results: '75% reduction in processing time',
      testimonial: {
        quote: 'WorkflowGene Cloud transformed our enrollment process from a 3-week nightmare into a 3-day streamlined experience. Our students are happier, and our staff can focus on what matters most - education.',
        author: 'Dr. Sarah Mitchell',
        role: 'Registrar'
      },
      metrics: [
        { value: '75%', label: 'Time Saved' },
        { value: '$450K', label: 'Annual Savings' },
        { value: '98%', label: 'Accuracy Rate' },
        { value: '15K+', label: 'Students Processed' }
      ],
      timeline: '6 weeks',
      tags: ['Student Management', 'FERPA Compliant', 'Process Automation']
    },
    {
      id: 2,
      company: 'Regional Medical Center',
      industry: 'Healthcare',
      logo: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=100&h=100&fit=crop&crop=center',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop&crop=center',
      challenge: 'Patient appointment scheduling and intake processes were causing bottlenecks, with average wait times of 45 minutes and frequent scheduling conflicts affecting 200+ daily appointments.',
      solution: 'Deployed comprehensive patient workflow automation including intelligent scheduling, automated intake forms, insurance verification, and HIPAA-compliant communication systems.',
      results: '80% reduction in wait times',
      testimonial: {
        quote: 'The automation has revolutionized our patient experience. We\'ve eliminated scheduling conflicts and reduced wait times dramatically while maintaining the highest standards of care.',
        author: 'Dr. Michael Chen',
        role: 'Chief Medical Officer'
      },
      metrics: [
        { value: '80%', label: 'Wait Time Reduction' },
        { value: '$1.2M', label: 'Annual Savings' },
        { value: '95%', label: 'Patient Satisfaction' },
        { value: '300+', label: 'Daily Appointments' }
      ],
      timeline: '8 weeks',
      tags: ['Patient Care', 'HIPAA Compliant', 'Scheduling Automation']
    },
    {
      id: 3,
      company: 'TechGear Online',
      industry: 'E-Commerce',
      logo: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=100&fit=crop&crop=center',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop&crop=center',
      challenge: 'Manual order processing and inventory management were limiting growth potential, with order fulfillment taking 3-5 days and frequent stockouts affecting customer satisfaction.',
      solution: 'Implemented end-to-end e-commerce automation covering order processing, inventory management, customer communications, and integrated shipping with real-time tracking.',
      results: '65% faster order processing',
      testimonial: {
        quote: 'WorkflowGene Cloud enabled us to scale from 100 to 1000+ daily orders without adding staff. Our customers love the faster delivery times and real-time updates.',
        author: 'Jennifer Rodriguez',
        role: 'Operations Director'
      },
      metrics: [
        { value: '65%', label: 'Faster Processing' },
        { value: '$850K', label: 'Annual Savings' },
        { value: '99.2%', label: 'Order Accuracy' },
        { value: '1000+', label: 'Daily Orders' }
      ],
      timeline: '4 weeks',
      tags: ['Order Management', 'Inventory Automation', 'Customer Experience']
    }
  ];

  return (
    <>
      <Helmet>
        <title>Industry Solutions - WorkflowGene Cloud | Automation for Education, Healthcare & E-Commerce</title>
        <meta 
          name="description" 
          content="Discover industry-specific automation solutions for Education, Healthcare, and E-Commerce. Tailored workflows with compliance features, ROI calculators, and proven case studies." 
        />
        <meta name="keywords" content="workflow automation, education technology, healthcare automation, ecommerce automation, HIPAA compliant, FERPA compliant, PCI DSS" />
        <meta property="og:title" content="Industry Solutions - WorkflowGene Cloud" />
        <meta property="og:description" content="Transform your industry with intelligent automation solutions tailored to Education, Healthcare, and E-Commerce sectors." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://workflowgene.cloud/industries" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Hero Section */}
        <IndustryHero />

        {/* Industry Cards Section */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
                Industry-Specific Solutions
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Discover how WorkflowGene Cloud adapts to your industry's unique challenges with specialized automation workflows and compliance features.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {industries?.map((industry) => (
                <IndustryCard key={industry?.id} industry={industry} />
              ))}
            </div>
          </div>
        </section>

        {/* ROI Calculator */}
        <ROICalculator />

        {/* Case Studies Section */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-2 bg-success/10 text-success px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Icon name="Award" size={16} />
                <span>Success Stories</span>
              </div>
              
              <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
                Real Results from Real Customers
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                See how organizations across different industries have transformed their operations with WorkflowGene Cloud automation.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredCaseStudies?.map((caseStudy, index) => (
                <CaseStudyCard 
                  key={caseStudy?.id} 
                  caseStudy={caseStudy} 
                  featured={index === 0}
                />
              ))}
            </div>

            <div className="text-center mt-12">
              <Button 
                variant="outline" 
                size="lg"
                iconName="ArrowRight"
                iconPosition="right"
              >
                View All Case Studies
              </Button>
            </div>
          </div>
        </section>

        {/* Compliance Section */}
        <ComplianceSection />

        {/* Resources Section */}
        <ResourcesSection />

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-6">
                Ready to Transform Your Industry?
              </h2>
              <p className="text-xl text-text-secondary mb-8">
                Join hundreds of organizations that have revolutionized their operations with WorkflowGene Cloud. 
                Start your automation journey today with a personalized demo.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                <Button 
                  variant="default" 
                  size="lg" 
                  className="btn-organic"
                  iconName="Calendar"
                  iconPosition="left"
                >
                  Schedule Industry Demo
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  iconName="Calculator"
                  iconPosition="left"
                >
                  Calculate Your ROI
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-primary">30 Days</div>
                  <div className="text-text-secondary">Free Trial</div>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-primary">24/7</div>
                  <div className="text-text-secondary">Expert Support</div>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-primary">99.9%</div>
                  <div className="text-text-secondary">Uptime SLA</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-secondary text-secondary-foreground py-12">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-genetic-md flex items-center justify-center">
                    <Icon name="Zap" size={16} className="text-white" />
                  </div>
                  <span className="text-lg font-bold">WorkflowGene Cloud</span>
                </div>
                <p className="text-sm text-secondary-foreground/80">
                  The DNA of smart business automation for modern enterprises.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Industries</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">Education</a></li>
                  <li><a href="#" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">Healthcare</a></li>
                  <li><a href="#" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">E-Commerce</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Resources</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">Templates</a></li>
                  <li><a href="#" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">Case Studies</a></li>
                  <li><a href="#" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">Webinars</a></li>
                  <li><a href="#" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">Reports</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Support</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">Documentation</a></li>
                  <li><a href="#" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">Help Center</a></li>
                  <li><a href="#" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">Contact Us</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-secondary-foreground/20 mt-8 pt-8 text-center text-sm text-secondary-foreground/60">
              <p>&copy; {new Date()?.getFullYear()} WorkflowGene Cloud. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Industries;