import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import AIChatbot from '../../components/ui/AIChatbot';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';

const CaseStudies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('all');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const industries = [
    { id: 'all', name: 'All Industries' },
    { id: 'education', name: 'Education' },
    { id: 'healthcare', name: 'Healthcare' },
    { id: 'ecommerce', name: 'E-Commerce' },
    { id: 'finance', name: 'Finance' }
  ];

  const caseStudies = [
    {
      id: 1,
      title: 'Metro University: 75% Reduction in Enrollment Processing Time',
      company: 'Metro University System',
      industry: 'education',
      challenge: 'Manual student enrollment processes were taking weeks to complete, causing delays in class assignments and frustrating both students and staff.',
      solution: 'Implemented WorkflowGene Cloud to automate the entire enrollment pipeline, from application review to class assignment.',
      results: {
        timeSaved: '75%',
        costReduction: '$450,000',
        efficiency: '300%',
        satisfaction: '95%'
      },
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9d1?w=800&h=400&fit=crop',
      logo: 'https://images.unsplash.com/photo-1523050854058-8df90110c9d1?w=100&h=100&fit=crop&crop=center',
      testimonial: {
        quote: 'WorkflowGene Cloud transformed our enrollment process from a 3-week nightmare into a 3-day streamlined experience.',
        author: 'Dr. Sarah Mitchell',
        role: 'Registrar'
      },
      tags: ['Student Management', 'FERPA Compliant', 'Process Automation'],
      publishDate: '2024-01-15',
      readTime: '8 min read'
    },
    {
      id: 2,
      title: 'HealthFirst Clinic: Revolutionizing Patient Care Coordination',
      company: 'HealthFirst Medical Center',
      industry: 'healthcare',
      challenge: 'Patient appointment scheduling and care coordination were causing bottlenecks, with average wait times of 45 minutes.',
      solution: 'Deployed comprehensive patient workflow automation including intelligent scheduling and HIPAA-compliant communication systems.',
      results: {
        timeSaved: '80%',
        costReduction: '$1,200,000',
        efficiency: '250%',
        satisfaction: '98%'
      },
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop',
      logo: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=100&h=100&fit=crop&crop=center',
      testimonial: {
        quote: 'The automation has revolutionized our patient experience. We\'ve eliminated scheduling conflicts and reduced wait times dramatically.',
        author: 'Dr. Michael Chen',
        role: 'Chief Medical Officer'
      },
      tags: ['Patient Care', 'HIPAA Compliant', 'Scheduling Automation'],
      publishDate: '2024-01-12',
      readTime: '10 min read'
    },
    {
      id: 3,
      title: 'TechGear Online: Scaling E-Commerce Operations 10x',
      company: 'TechGear Online',
      industry: 'ecommerce',
      challenge: 'Manual order processing and inventory management were limiting growth potential, with order fulfillment taking 3-5 days.',
      solution: 'Implemented end-to-end e-commerce automation covering order processing, inventory management, and customer communications.',
      results: {
        timeSaved: '65%',
        costReduction: '$850,000',
        efficiency: '400%',
        satisfaction: '92%'
      },
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop',
      logo: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=100&fit=crop&crop=center',
      testimonial: {
        quote: 'WorkflowGene Cloud enabled us to scale from 100 to 1000+ daily orders without adding staff.',
        author: 'Jennifer Rodriguez',
        role: 'Operations Director'
      },
      tags: ['Order Management', 'Inventory Automation', 'Customer Experience'],
      publishDate: '2024-01-10',
      readTime: '12 min read'
    },
    {
      id: 4,
      title: 'Global Finance Corp: Streamlining Invoice Processing',
      company: 'Global Finance Corporation',
      industry: 'finance',
      challenge: 'Manual invoice processing was taking 5-7 days per invoice, creating cash flow issues and vendor relationship problems.',
      solution: 'Automated invoice processing with AI-powered data extraction, approval workflows, and payment automation.',
      results: {
        timeSaved: '85%',
        costReduction: '$2,100,000',
        efficiency: '500%',
        satisfaction: '94%'
      },
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop',
      logo: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=100&h=100&fit=crop&crop=center',
      testimonial: {
        quote: 'Our invoice processing went from days to hours. The ROI was evident within the first month.',
        author: 'Robert Kim',
        role: 'CFO'
      },
      tags: ['Invoice Processing', 'AI Automation', 'Financial Workflows'],
      publishDate: '2024-01-08',
      readTime: '9 min read'
    }
  ];

  const filteredCaseStudies = caseStudies.filter(study => {
    const matchesSearch = study.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         study.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         study.challenge.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = selectedIndustry === 'all' || study.industry === selectedIndustry;
    return matchesSearch && matchesIndustry;
  });

  return (
    <>
      <Helmet>
        <title>Case Studies - WorkflowGene Cloud | Real Customer Success Stories</title>
        <meta 
          name="description" 
          content="Discover how organizations across Education, Healthcare, and E-Commerce have transformed their operations with WorkflowGene Cloud automation. Real results, real ROI." 
        />
        <meta name="keywords" content="automation case studies, customer success stories, workflow automation ROI, business transformation" />
        <meta property="og:title" content="Case Studies - WorkflowGene Cloud | Real Customer Success Stories" />
        <meta property="og:description" content="Discover how organizations have transformed their operations with WorkflowGene Cloud automation. Real results, real ROI." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://workflowgene.cloud/case-studies" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20">
            <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
              <div className="inline-flex items-center space-x-2 bg-success/10 text-success px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Icon name="Award" size={16} />
                <span>Success Stories</span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-text-primary mb-6">
                Real Results from Real Customers
              </h1>
              
              <p className="text-xl text-text-secondary mb-8">
                See how organizations across industries have transformed their operations with WorkflowGene Cloud
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
                <Input
                  type="search"
                  placeholder="Search case studies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1"
                />
                <div className="flex gap-2">
                  {industries.slice(0, 4).map((industry) => (
                    <button
                      key={industry.id}
                      onClick={() => setSelectedIndustry(industry.id)}
                      className={`px-3 py-2 rounded-genetic-md text-sm font-medium transition-all duration-genetic-normal ${
                        selectedIndustry === industry.id
                          ? 'bg-primary text-white' :'bg-surface text-text-secondary hover:bg-muted'
                      }`}
                    >
                      {industry.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Case Studies Grid */}
          <section className="py-16 bg-background">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-8">
                {filteredCaseStudies.map((study) => (
                  <article key={study.id} className="card-organic bg-card overflow-hidden">
                    <div className="relative">
                      <Image
                        src={study.image}
                        alt={`${study.company} case study`}
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="w-12 h-12 bg-white rounded-genetic-md p-2">
                            <Image src={study.logo} alt={`${study.company} logo`} className="w-full h-full object-contain" />
                          </div>
                          <div>
                            <h3 className="text-white font-bold text-lg">{study.company}</h3>
                            <p className="text-white/80 text-sm capitalize">{study.industry}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center space-x-2 mb-3 text-sm text-text-secondary">
                        <span>{new Date(study.publishDate).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{study.readTime}</span>
                      </div>
                      
                      <h2 className="text-xl font-bold text-text-primary mb-4">
                        {study.title}
                      </h2>
                      
                      <div className="space-y-4 mb-6">
                        <div>
                          <h4 className="font-semibold text-text-primary mb-2">Challenge</h4>
                          <p className="text-text-secondary text-sm">{study.challenge}</p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-text-primary mb-2">Solution</h4>
                          <p className="text-text-secondary text-sm">{study.solution}</p>
                        </div>
                      </div>

                      {/* Results Grid */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        {Object.entries(study.results).map(([key, value]) => (
                          <div key={key} className="text-center p-3 bg-surface rounded-genetic-md">
                            <div className="text-xl font-bold text-primary">{value}</div>
                            <div className="text-xs text-text-secondary capitalize">
                              {key === 'timeSaved' ? 'Time Saved' :
                               key === 'costReduction' ? 'Cost Reduction' :
                               key === 'efficiency' ? 'Efficiency Gain' :
                               key === 'satisfaction' ? 'User Satisfaction' : key}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Testimonial */}
                      <div className="bg-primary/5 border-l-4 border-primary p-4 mb-6">
                        <blockquote className="text-text-primary italic text-sm mb-2">
                          "{study.testimonial.quote}"
                        </blockquote>
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                            <Icon name="User" size={14} className="text-primary" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-text-primary">{study.testimonial.author}</div>
                            <div className="text-xs text-text-secondary">{study.testimonial.role}</div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                          {study.tags.slice(0, 2).map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-muted text-text-secondary text-xs rounded-genetic-sm"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <Link to={`/case-studies/${study.id}`}>
                          <Button variant="default" size="sm" iconName="ArrowRight" iconPosition="right">
                            Read Full Story
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {filteredCaseStudies.length === 0 && (
                <div className="text-center py-12">
                  <Icon name="Search" size={48} className="text-text-secondary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-text-primary mb-2">No case studies found</h3>
                  <p className="text-text-secondary">
                    Try adjusting your search terms or industry filter
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 bg-surface">
            <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
              <div className="bg-card rounded-genetic-xl p-8 shadow-organic-md">
                <h2 className="text-2xl font-bold text-text-primary mb-4">
                  Ready to Write Your Success Story?
                </h2>
                <p className="text-text-secondary mb-6">
                  Join hundreds of organizations that have transformed their operations with WorkflowGene Cloud
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    variant="default"
                    size="lg"
                    iconName="Play"
                    iconPosition="left"
                    className="btn-organic"
                  >
                    Start Free Trial
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    iconName="Calendar"
                    iconPosition="left"
                  >
                    Schedule Demo
                  </Button>
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

export default CaseStudies;