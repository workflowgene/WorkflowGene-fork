import React, { useState, useEffect } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Icon from '../AppIcon';
import Image from '../AppImage';
import { useAuth } from '../auth/AuthProvider';
import { supabase } from '../../lib/supabase';
import toast from 'react-hot-toast';

const TemplateLibrary = ({ onClose, onSelectTemplate }) => {
  const [templates, setTemplates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const { profile } = useAuth();

  const categories = [
    { id: 'all', name: 'All Templates' },
    { id: 'hero', name: 'Hero Sections' },
    { id: 'about', name: 'About Pages' },
    { id: 'contact', name: 'Contact Forms' },
    { id: 'pricing', name: 'Pricing Tables' },
    { id: 'features', name: 'Feature Sections' },
    { id: 'testimonials', name: 'Testimonials' },
    { id: 'footer', name: 'Footers' }
  ];

  const mockTemplates = [
    {
      id: 1,
      name: 'Modern Hero Section',
      category: 'hero',
      description: 'Clean hero section with gradient background and call-to-action',
      preview_image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop',
      components: [
        {
          id: 'hero-1',
          type: 'hero',
          name: 'Hero Section',
          props: {
            title: 'Transform Your Business Today',
            subtitle: 'Powerful automation solutions that grow with your business',
            ctaText: 'Start Free Trial',
            ctaLink: '/signup',
            backgroundImage: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=600&fit=crop'
          },
          styles: {
            padding: { top: 80, right: 24, bottom: 80, left: 24 },
            backgroundColor: 'transparent',
            textColor: '#ffffff'
          }
        }
      ],
      downloads: 1250,
      rating: 4.8,
      is_global: true
    },
    {
      id: 2,
      name: 'Feature Grid Layout',
      category: 'features',
      description: 'Responsive grid showcasing product features with icons',
      preview_image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      components: [
        {
          id: 'grid-1',
          type: 'grid',
          name: 'Feature Grid',
          props: {
            columns: 3,
            gap: '32px',
            equalHeight: true
          },
          children: [
            {
              id: 'feature-1',
              type: 'feature-card',
              props: {
                icon: 'Zap',
                title: 'Fast Performance',
                description: 'Lightning-fast automation workflows'
              }
            },
            {
              id: 'feature-2',
              type: 'feature-card',
              props: {
                icon: 'Shield',
                title: 'Secure & Compliant',
                description: 'Enterprise-grade security and compliance'
              }
            },
            {
              id: 'feature-3',
              type: 'feature-card',
              props: {
                icon: 'Users',
                title: 'Team Collaboration',
                description: 'Built-in collaboration tools'
              }
            }
          ]
        }
      ],
      downloads: 890,
      rating: 4.6,
      is_global: true
    },
    {
      id: 3,
      name: 'Contact Form with Map',
      category: 'contact',
      description: 'Professional contact form with integrated location map',
      preview_image: 'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=400&h=300&fit=crop',
      components: [
        {
          id: 'contact-form-1',
          type: 'form',
          name: 'Contact Form',
          props: {
            title: 'Get in Touch',
            submitText: 'Send Message',
            includeName: true,
            includeEmail: true,
            includePhone: true,
            includeMessage: true,
            successMessage: 'Thank you for your message! We\'ll get back to you soon.'
          }
        }
      ],
      downloads: 650,
      rating: 4.7,
      is_global: true
    },
    {
      id: 4,
      name: 'Pricing Table - 3 Tiers',
      category: 'pricing',
      description: 'Professional pricing table with three tiers and feature comparison',
      preview_image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop',
      components: [
        {
          id: 'pricing-1',
          type: 'pricing-table',
          name: 'Pricing Table',
          props: {
            plans: [
              {
                name: 'Starter',
                price: '$29',
                period: 'month',
                features: ['5 workflows', '1K executions', 'Email support'],
                popular: false
              },
              {
                name: 'Professional',
                price: '$99',
                period: 'month',
                features: ['50 workflows', '10K executions', 'Priority support'],
                popular: true
              },
              {
                name: 'Enterprise',
                price: 'Custom',
                period: 'month',
                features: ['Unlimited workflows', 'Unlimited executions', 'Dedicated support'],
                popular: false
              }
            ]
          }
        }
      ],
      downloads: 1100,
      rating: 4.9,
      is_global: true
    }
  ];

  useEffect(() => {
    // In a real implementation, this would fetch from the database
    setTemplates(mockTemplates);
    setLoading(false);
  }, []);

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSelectTemplate = (template) => {
    onSelectTemplate(template);
    onClose();
    toast.success(`Template "${template.name}" applied successfully`);
  };

  const saveAsTemplate = async (pageData) => {
    try {
      const { error } = await supabase
        .from('cms_templates')
        .insert({
          name: `${pageData.title} Template`,
          description: `Custom template created from ${pageData.title}`,
          category: 'custom',
          components: pageData.components,
          organization_id: profile?.organization_id,
          created_by: profile?.id
        });

      if (error) throw error;
      
      toast.success('Template saved successfully');
      // Refresh templates list
      fetchTemplates();
    } catch (error) {
      console.error('Error saving template:', error);
      toast.error('Failed to save template');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card rounded-lg shadow-lg w-full max-w-6xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h3 className="text-xl font-semibold text-text-primary">Template Library</h3>
            <p className="text-sm text-text-secondary">
              Choose from pre-built templates to speed up your design process
            </p>
          </div>
          <Button variant="ghost" onClick={onClose} iconName="X" />
        </div>

        {/* Filters */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <Input
                type="search"
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex space-x-2">
              {categories.slice(0, 5).map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-primary text-white' :'bg-surface text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="text-center py-12">
              <Icon name="Loader2" size={32} className="animate-spin text-text-secondary mx-auto mb-4" />
              <p className="text-text-secondary">Loading templates...</p>
            </div>
          ) : filteredTemplates.length === 0 ? (
            <div className="text-center py-12">
              <Icon name="FileTemplate" size={48} className="text-text-secondary mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-text-primary mb-2">No templates found</h4>
              <p className="text-text-secondary">
                Try adjusting your search terms or category filter
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTemplates.map((template) => (
                <div key={template.id} className="bg-surface rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative">
                    <Image
                      src={template.preview_image}
                      alt={template.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        template.is_global ? 'bg-primary text-white' : 'bg-surface text-text-primary'
                      }`}>
                        {template.is_global ? 'Global' : 'Custom'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h4 className="font-semibold text-text-primary mb-2">{template.name}</h4>
                    <p className="text-sm text-text-secondary mb-4 line-clamp-2">
                      {template.description}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4 text-xs text-text-secondary">
                        <div className="flex items-center space-x-1">
                          <Icon name="Download" size={12} />
                          <span>{template.downloads}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="Star" size={12} className="text-warning fill-current" />
                          <span>{template.rating}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="Layers" size={12} />
                          <span>{template.components.length} components</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button
                        variant="default"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleSelectTemplate(template)}
                        iconName="Download"
                      >
                        Use Template
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        iconName="Eye"
                      >
                        Preview
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="text-sm text-text-secondary">
              {filteredTemplates.length} template(s) available
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" iconName="Plus">
                Create Template
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateLibrary;