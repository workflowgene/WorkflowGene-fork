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

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [featuredPost, setFeaturedPost] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = [
    { id: 'all', name: 'All Posts', count: 45 },
    { id: 'automation', name: 'Automation', count: 15 },
    { id: 'industry', name: 'Industry Insights', count: 12 },
    { id: 'tutorials', name: 'Tutorials', count: 10 },
    { id: 'case-studies', name: 'Case Studies', count: 8 }
  ];

  const blogPosts = [
    {
      id: 1,
      title: 'The Future of Healthcare Automation: AI-Powered Patient Care',
      excerpt: 'Discover how artificial intelligence is revolutionizing patient care workflows and improving healthcare outcomes across the industry.',
      content: 'Healthcare automation is transforming the way medical professionals deliver care...',
      author: 'Dr. Sarah Chen',
      authorRole: 'Healthcare Technology Expert',
      authorAvatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face',
      category: 'industry',
      tags: ['Healthcare', 'AI', 'Patient Care', 'Automation'],
      publishDate: '2024-01-15',
      readTime: '8 min read',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=400&fit=crop',
      featured: true,
      views: 2500,
      likes: 89
    },
    {
      id: 2,
      title: 'Building Your First E-Commerce Automation Workflow',
      excerpt: 'Step-by-step guide to creating automated order processing workflows that scale with your business growth.',
      content: 'E-commerce automation starts with understanding your customer journey...',
      author: 'Michael Rodriguez',
      authorRole: 'E-Commerce Automation Specialist',
      authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      category: 'tutorials',
      tags: ['E-Commerce', 'Tutorial', 'Workflows', 'Getting Started'],
      publishDate: '2024-01-12',
      readTime: '12 min read',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop',
      featured: false,
      views: 1800,
      likes: 67
    },
    {
      id: 3,
      title: 'Case Study: How Metro University Automated Student Enrollment',
      excerpt: 'Learn how Metro University reduced enrollment processing time by 75% using WorkflowGene Cloud automation.',
      content: 'Metro University faced significant challenges with their manual enrollment process...',
      author: 'Emily Watson',
      authorRole: 'Education Technology Consultant',
      authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      category: 'case-studies',
      tags: ['Education', 'Case Study', 'Student Management', 'ROI'],
      publishDate: '2024-01-10',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9d1?w=800&h=400&fit=crop',
      featured: false,
      views: 1200,
      likes: 45
    },
    {
      id: 4,
      title: '10 Automation Trends That Will Shape 2024',
      excerpt: 'Explore the latest trends in business automation and how they will impact organizations across industries.',
      content: 'As we move into 2024, several key trends are emerging in the automation space...',
      author: 'David Kim',
      authorRole: 'Automation Strategy Director',
      authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      category: 'automation',
      tags: ['Trends', 'Strategy', 'Future', 'Innovation'],
      publishDate: '2024-01-08',
      readTime: '10 min read',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=400&fit=crop',
      featured: false,
      views: 3200,
      likes: 124
    },
    {
      id: 5,
      title: 'Security Best Practices for Workflow Automation',
      excerpt: 'Essential security considerations when implementing automation workflows in enterprise environments.',
      content: 'Security should be at the forefront of any automation implementation...',
      author: 'Lisa Thompson',
      authorRole: 'Cybersecurity Expert',
      authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face',
      category: 'automation',
      tags: ['Security', 'Best Practices', 'Enterprise', 'Compliance'],
      publishDate: '2024-01-05',
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop',
      featured: false,
      views: 1600,
      likes: 78
    }
  ];

  useEffect(() => {
    const featured = blogPosts.find(post => post.featured);
    setFeaturedPost(featured);
  }, []);

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory && !post.featured;
  });

  return (
    <>
      <Helmet>
        <title>Blog - WorkflowGene Cloud | Automation Insights & Tutorials</title>
        <meta 
          name="description" 
          content="Stay updated with the latest automation trends, tutorials, case studies, and industry insights from WorkflowGene Cloud experts." 
        />
        <meta name="keywords" content="automation blog, workflow tutorials, business automation insights, case studies, industry trends" />
        <meta property="og:title" content="Blog - WorkflowGene Cloud | Automation Insights & Tutorials" />
        <meta property="og:description" content="Stay updated with the latest automation trends, tutorials, case studies, and industry insights from WorkflowGene Cloud experts." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://workflowgene.cloud/blog" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20">
            <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Icon name="BookOpen" size={16} />
                <span>Automation Insights</span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-text-primary mb-6">
                The WorkflowGene Blog
              </h1>
              
              <p className="text-xl text-text-secondary mb-8">
                Insights, tutorials, and case studies from automation experts
              </p>
              
              <div className="max-w-2xl mx-auto">
                <Input
                  type="search"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </section>

          {/* Featured Post */}
          {featuredPost && (
            <section className="py-16 bg-surface">
              <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="bg-card rounded-genetic-xl shadow-organic-lg overflow-hidden">
                  <div className="grid lg:grid-cols-2 gap-8">
                    <div className="relative">
                      <Image
                        src={featuredPost.image}
                        alt={featuredPost.title}
                        className="w-full h-80 lg:h-full object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                          Featured
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-8 flex flex-col justify-center">
                      <div className="flex items-center space-x-2 mb-4">
                        <span className="text-sm text-primary font-medium capitalize">
                          {featuredPost.category}
                        </span>
                        <span className="text-text-secondary">•</span>
                        <span className="text-sm text-text-secondary">
                          {featuredPost.readTime}
                        </span>
                      </div>
                      
                      <h2 className="text-3xl font-bold text-text-primary mb-4">
                        {featuredPost.title}
                      </h2>
                      
                      <p className="text-text-secondary mb-6 leading-relaxed">
                        {featuredPost.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-3">
                          <Image
                            src={featuredPost.authorAvatar}
                            alt={featuredPost.author}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <div className="font-medium text-text-primary">{featuredPost.author}</div>
                            <div className="text-sm text-text-secondary">{featuredPost.authorRole}</div>
                          </div>
                        </div>
                        
                        <div className="text-sm text-text-secondary">
                          {new Date(featuredPost.publishDate).toLocaleDateString()}
                        </div>
                      </div>
                      
                      <Link to={`/blog/${featuredPost.id}`}>
                        <Button 
                          variant="default" 
                          size="lg"
                          iconName="ArrowRight"
                          iconPosition="right"
                          className="btn-organic"
                        >
                          Read Full Article
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Categories */}
          <section className="py-8 bg-background">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex flex-wrap gap-3 justify-center">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-genetic-lg font-medium transition-all duration-genetic-normal ${
                      selectedCategory === category.id
                        ? 'bg-primary text-white' :'bg-surface text-text-secondary hover:bg-muted hover:text-text-primary'
                    }`}
                  >
                    {category.name} ({category.count})
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Blog Posts Grid */}
          <section className="py-16 bg-background">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <article key={post.id} className="card-organic bg-card overflow-hidden">
                    <div className="relative">
                      <Image
                        src={post.image}
                        alt={post.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-primary/90 text-white px-2 py-1 rounded-genetic-sm text-xs font-medium capitalize">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center space-x-2 mb-3 text-sm text-text-secondary">
                        <span>{new Date(post.publishDate).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-text-primary mb-3 line-clamp-2">
                        {post.title}
                      </h3>
                      
                      <p className="text-text-secondary mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-muted text-text-secondary text-xs rounded-genetic-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Image
                            src={post.authorAvatar}
                            alt={post.author}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div>
                            <div className="font-medium text-text-primary text-sm">{post.author}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-text-secondary">
                          <div className="flex items-center space-x-1">
                            <Icon name="Eye" size={14} />
                            <span>{post.views}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Icon name="Heart" size={14} />
                            <span>{post.likes}</span>
                          </div>
                        </div>
                      </div>
                      
                      <Link to={`/blog/${post.id}`} className="block mt-4">
                        <Button variant="outline" size="sm" fullWidth iconName="ArrowRight" iconPosition="right">
                          Read More
                        </Button>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>

              {filteredPosts.length === 0 && (
                <div className="text-center py-12">
                  <Icon name="Search" size={48} className="text-text-secondary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-text-primary mb-2">No articles found</h3>
                  <p className="text-text-secondary">
                    Try adjusting your search terms or category filter
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Newsletter Signup */}
          <section className="py-16 bg-surface">
            <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
              <div className="bg-card rounded-genetic-xl p-8 shadow-organic-md">
                <h2 className="text-2xl font-bold text-text-primary mb-4">
                  Stay Updated with Automation Insights
                </h2>
                <p className="text-text-secondary mb-6">
                  Get the latest articles, tutorials, and industry insights delivered to your inbox
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1"
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
                
                <p className="text-xs text-text-secondary mt-3">
                  No spam, unsubscribe anytime
                </p>
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

export default Blog;