import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const CommunityForum = () => {
  const [activeTab, setActiveTab] = useState('popular');

  const forumStats = [
    { label: 'Active Members', value: '12,500+', icon: 'Users' },
    { label: 'Discussions', value: '8,200+', icon: 'MessageSquare' },
    { label: 'Solutions Shared', value: '15,000+', icon: 'CheckCircle' },
    { label: 'Expert Contributors', value: '250+', icon: 'Award' }
  ];

  const popularTopics = [
    {
      id: 1,
      title: 'Best practices for e-commerce automation workflows',
      author: 'Sarah Chen',
      avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
      category: 'E-commerce',
      replies: 24,
      views: 1250,
      lastActivity: '2 hours ago',
      tags: ['E-commerce', 'Workflows', 'Best Practices'],
      solved: true
    },
    {
      id: 2,
      title: 'Integration challenges with legacy CRM systems',
      author: 'Michael Rodriguez',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
      category: 'Integration',
      replies: 18,
      views: 890,
      lastActivity: '4 hours ago',
      tags: ['CRM', 'Legacy Systems', 'Integration'],
      solved: false
    },
    {
      id: 3,
      title: 'AI-powered document processing automation tips',
      author: 'Emily Watson',
      avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
      category: 'AI & ML',
      replies: 31,
      views: 2100,
      lastActivity: '6 hours ago',
      tags: ['AI', 'Document Processing', 'Machine Learning'],
      solved: true
    },
    {
      id: 4,
      title: 'Healthcare compliance automation requirements',
      author: 'Dr. James Park',
      avatar: 'https://randomuser.me/api/portraits/men/38.jpg',
      category: 'Healthcare',
      replies: 15,
      views: 650,
      lastActivity: '1 day ago',
      tags: ['Healthcare', 'Compliance', 'HIPAA'],
      solved: false
    }
  ];

  const categories = [
    { name: 'General Discussion', count: 1250, icon: 'MessageCircle', color: 'bg-blue-500' },
    { name: 'E-commerce', count: 890, icon: 'ShoppingCart', color: 'bg-green-500' },
    { name: 'Healthcare', count: 650, icon: 'Heart', color: 'bg-red-500' },
    { name: 'Education', count: 420, icon: 'BookOpen', color: 'bg-purple-500' },
    { name: 'Integration', count: 780, icon: 'Link', color: 'bg-orange-500' },
    { name: 'AI & ML', count: 340, icon: 'Brain', color: 'bg-indigo-500' }
  ];

  const tabs = [
    { id: 'popular', label: 'Popular', icon: 'TrendingUp' },
    { id: 'recent', label: 'Recent', icon: 'Clock' },
    { id: 'solved', label: 'Solved', icon: 'CheckCircle' },
    { id: 'unanswered', label: 'Unanswered', icon: 'HelpCircle' }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Icon name="Users" size={16} />
            <span>Community Forum</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            Connect with Automation Experts
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Join thousands of professionals sharing knowledge, solving problems, and building the future of automation together
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {forumStats?.map((stat, index) => (
            <div key={index} className="text-center p-6 bg-card rounded-genetic-lg card-organic">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-genetic-md mb-4">
                <Icon name={stat?.icon} size={24} className="text-primary" />
              </div>
              <div className="text-2xl font-bold text-text-primary mb-1">{stat?.value}</div>
              <div className="text-sm text-text-secondary">{stat?.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Forum Content */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-genetic-lg overflow-hidden">
              {/* Forum Header */}
              <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-text-primary">
                    Community Discussions
                  </h3>
                  <Button variant="default" size="sm" iconName="Plus">
                    New Topic
                  </Button>
                </div>

                {/* Tabs */}
                <div className="flex space-x-1 bg-surface rounded-genetic-md p-1">
                  {tabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      onClick={() => setActiveTab(tab?.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-genetic-sm text-sm font-medium transition-all duration-200 ${
                        activeTab === tab?.id
                          ? 'bg-primary text-white' :'text-text-secondary hover:text-text-primary hover:bg-muted'
                      }`}
                    >
                      <Icon name={tab?.icon} size={16} />
                      <span>{tab?.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Forum Topics */}
              <div className="divide-y divide-border">
                {popularTopics?.map((topic) => (
                  <div key={topic?.id} className="p-6 hover:bg-surface transition-colors cursor-pointer">
                    <div className="flex items-start space-x-4">
                      <Image
                        src={topic?.avatar}
                        alt={topic?.author}
                        className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                      />
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="text-lg font-medium text-text-primary hover:text-primary transition-colors line-clamp-2">
                            {topic?.title}
                          </h4>
                          {topic?.solved && (
                            <div className="flex-shrink-0 ml-2">
                              <Icon name="CheckCircle" size={20} className="text-success" />
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-text-secondary mb-3">
                          <span>by {topic?.author}</span>
                          <span>in {topic?.category}</span>
                          <span>{topic?.lastActivity}</span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-2">
                            {topic?.tags?.map((tag, index) => (
                              <span
                                key={index}
                                className="bg-primary/10 text-primary px-2 py-1 rounded-genetic-sm text-xs"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          
                          <div className="flex items-center space-x-4 text-sm text-text-secondary">
                            <div className="flex items-center space-x-1">
                              <Icon name="MessageSquare" size={14} />
                              <span>{topic?.replies}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Icon name="Eye" size={14} />
                              <span>{topic?.views}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 border-t border-border text-center">
                <Button variant="outline" iconName="ArrowRight" iconPosition="right">
                  View All Discussions
                </Button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Categories */}
            <div className="bg-card rounded-genetic-lg p-6">
              <h4 className="text-lg font-semibold text-text-primary mb-4">
                Categories
              </h4>
              <div className="space-y-3">
                {categories?.map((category, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-genetic-md hover:bg-surface transition-colors cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${category?.color}`}></div>
                      <span className="text-text-primary font-medium">{category?.name}</span>
                    </div>
                    <span className="text-sm text-text-secondary">{category?.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Community Guidelines */}
            <div className="bg-card rounded-genetic-lg p-6">
              <h4 className="text-lg font-semibold text-text-primary mb-4">
                Community Guidelines
              </h4>
              <div className="space-y-3 text-sm text-text-secondary">
                <div className="flex items-start space-x-2">
                  <Icon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
                  <span>Be respectful and professional</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Icon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
                  <span>Search before posting</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Icon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
                  <span>Use descriptive titles</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Icon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
                  <span>Share code and examples</span>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4">
                Read Full Guidelines
              </Button>
            </div>

            {/* Top Contributors */}
            <div className="bg-card rounded-genetic-lg p-6">
              <h4 className="text-lg font-semibold text-text-primary mb-4">
                Top Contributors
              </h4>
              <div className="space-y-3">
                {[
                  { name: 'Alex Thompson', points: 2450, avatar: 'https://randomuser.me/api/portraits/men/22.jpg' },
                  { name: 'Maria Garcia', points: 1890, avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
                  { name: 'David Kim', points: 1650, avatar: 'https://randomuser.me/api/portraits/men/33.jpg' }
                ]?.map((contributor, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Image
                      src={contributor?.avatar}
                      alt={contributor?.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-text-primary">{contributor?.name}</div>
                      <div className="text-xs text-text-secondary">{contributor?.points} points</div>
                    </div>
                    <div className="text-xs text-primary font-medium">#{index + 1}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityForum;