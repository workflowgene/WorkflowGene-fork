import React, { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Icon from '../AppIcon';

const SEOPanel = ({ pageData, onUpdate, onClose }) => {
  const [seoData, setSeoData] = useState(pageData.seo || {
    title: '',
    description: '',
    keywords: '',
    og_title: '',
    og_description: '',
    og_image: '',
    twitter_title: '',
    twitter_description: '',
    twitter_image: '',
    canonical_url: '',
    robots: 'index,follow'
  });

  const [activeTab, setActiveTab] = useState('basic');

  const tabs = [
    { id: 'basic', name: 'Basic SEO', icon: 'Search' },
    { id: 'social', name: 'Social Media', icon: 'Share2' },
    { id: 'advanced', name: 'Advanced', icon: 'Settings' }
  ];

  const handleUpdate = (key, value) => {
    const updated = { ...seoData, [key]: value };
    setSeoData(updated);
    onUpdate(updated);
  };

  const handleSave = () => {
    onUpdate(seoData);
    onClose();
  };

  const generatePreview = () => {
    const title = seoData.title || pageData.title || 'Page Title';
    const description = seoData.description || 'Page description will appear here';
    const url = `workflowgene.cloud${pageData.path || '/'}`;

    return { title, description, url };
  };

  const preview = generatePreview();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card rounded-lg shadow-lg w-full max-w-4xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h3 className="text-xl font-semibold text-text-primary">SEO Settings</h3>
            <p className="text-sm text-text-secondary">
              Optimize your page for search engines and social media
            </p>
          </div>
          <Button variant="ghost" onClick={onClose} iconName="X" />
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Left Panel - SEO Form */}
          <div className="w-2/3 flex flex-col">
            {/* Tab Navigation */}
            <div className="flex border-b border-border">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'border-b-2 border-primary text-primary' :'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <Icon name={tab.icon} size={16} />
                  <span>{tab.name}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {activeTab === 'basic' && (
                <div className="space-y-6">
                  <Input
                    label="Page Title"
                    value={seoData.title}
                    onChange={(e) => handleUpdate('title', e.target.value)}
                    description="Appears in browser tab and search results (50-60 characters recommended)"
                    placeholder="Enter page title"
                  />
                  
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Meta Description
                    </label>
                    <textarea
                      value={seoData.description}
                      onChange={(e) => handleUpdate('description', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Brief description for search engines"
                    />
                    <div className="flex justify-between text-xs mt-1">
                      <span className="text-text-secondary">
                        Appears in search results
                      </span>
                      <span className={`${
                        (seoData.description || '').length > 160 ? 'text-error' : 'text-text-secondary'
                      }`}>
                        {(seoData.description || '').length}/160
                      </span>
                    </div>
                  </div>
                  
                  <Input
                    label="Keywords"
                    value={seoData.keywords}
                    onChange={(e) => handleUpdate('keywords', e.target.value)}
                    placeholder="keyword1, keyword2, keyword3"
                    description="Comma-separated keywords relevant to this page"
                  />
                  
                  <Input
                    label="Canonical URL"
                    value={seoData.canonical_url}
                    onChange={(e) => handleUpdate('canonical_url', e.target.value)}
                    placeholder="https://workflowgene.cloud/page"
                    description="Preferred URL for this page (prevents duplicate content issues)"
                  />
                </div>
              )}

              {activeTab === 'social' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
                      <Icon name="Facebook" size={20} className="mr-2 text-blue-600" />
                      Open Graph (Facebook, LinkedIn)
                    </h4>
                    
                    <div className="space-y-4">
                      <Input
                        label="OG Title"
                        value={seoData.og_title}
                        onChange={(e) => handleUpdate('og_title', e.target.value)}
                        placeholder={seoData.title || 'Will use page title if empty'}
                      />
                      
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          OG Description
                        </label>
                        <textarea
                          value={seoData.og_description}
                          onChange={(e) => handleUpdate('og_description', e.target.value)}
                          rows={2}
                          className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder={seoData.description || 'Will use meta description if empty'}
                        />
                      </div>
                      
                      <Input
                        label="OG Image"
                        value={seoData.og_image}
                        onChange={(e) => handleUpdate('og_image', e.target.value)}
                        placeholder="https://example.com/image.jpg"
                        description="1200x630px recommended"
                      />
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
                      <Icon name="Twitter" size={20} className="mr-2 text-blue-400" />
                      Twitter Cards
                    </h4>
                    
                    <div className="space-y-4">
                      <Input
                        label="Twitter Title"
                        value={seoData.twitter_title}
                        onChange={(e) => handleUpdate('twitter_title', e.target.value)}
                        placeholder={seoData.og_title || seoData.title || 'Will use OG title if empty'}
                      />
                      
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          Twitter Description
                        </label>
                        <textarea
                          value={seoData.twitter_description}
                          onChange={(e) => handleUpdate('twitter_description', e.target.value)}
                          rows={2}
                          className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder={seoData.og_description || seoData.description || 'Will use OG description if empty'}
                        />
                      </div>
                      
                      <Input
                        label="Twitter Image"
                        value={seoData.twitter_image}
                        onChange={(e) => handleUpdate('twitter_image', e.target.value)}
                        placeholder={seoData.og_image || 'Will use OG image if empty'}
                        description="1200x600px recommended"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'advanced' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Robots Meta Tag
                    </label>
                    <select
                      value={seoData.robots}
                      onChange={(e) => handleUpdate('robots', e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="index,follow">Index, Follow (Default)</option>
                      <option value="noindex,follow">No Index, Follow</option>
                      <option value="index,nofollow">Index, No Follow</option>
                      <option value="noindex,nofollow">No Index, No Follow</option>
                    </select>
                    <p className="text-xs text-text-secondary mt-1">
                      Controls how search engines crawl and index this page
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Custom Meta Tags
                    </label>
                    <textarea
                      value={seoData.custom_meta || ''}
                      onChange={(e) => handleUpdate('custom_meta', e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
                      placeholder='<meta name="author" content="WorkflowGene">'
                    />
                    <p className="text-xs text-text-secondary mt-1">
                      Additional meta tags (HTML format)
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Schema Markup
                    </label>
                    <textarea
                      value={seoData.schema_markup || ''}
                      onChange={(e) => handleUpdate('schema_markup', e.target.value)}
                      rows={6}
                      className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
                      placeholder='{"@context": "https://schema.org", "@type": "WebPage"}'
                    />
                    <p className="text-xs text-text-secondary mt-1">
                      JSON-LD structured data
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div className="w-1/3 border-l border-border p-6">
            <h4 className="text-lg font-semibold text-text-primary mb-6">Preview</h4>
            
            {/* Search Result Preview */}
            <div className="mb-8">
              <h5 className="text-sm font-medium text-text-primary mb-3">Google Search Result</h5>
              <div className="border border-border rounded-md p-4 bg-white">
                <div className="text-blue-600 text-lg hover:underline cursor-pointer">
                  {preview.title}
                </div>
                <div className="text-green-600 text-sm mt-1">{preview.url}</div>
                <div className="text-text-secondary text-sm mt-2 leading-relaxed">
                  {preview.description}
                </div>
              </div>
            </div>

            {/* Social Media Preview */}
            <div className="mb-8">
              <h5 className="text-sm font-medium text-text-primary mb-3">Social Media Preview</h5>
              <div className="border border-border rounded-md overflow-hidden bg-white">
                {(seoData.og_image || seoData.twitter_image) && (
                  <div className="h-32 bg-muted flex items-center justify-center">
                    <img 
                      src={seoData.og_image || seoData.twitter_image} 
                      alt="Social preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-4">
                  <div className="text-sm font-medium text-text-primary">
                    {seoData.og_title || seoData.title || 'Page Title'}
                  </div>
                  <div className="text-xs text-text-secondary mt-1">
                    {seoData.og_description || seoData.description || 'Page description'}
                  </div>
                  <div className="text-xs text-text-secondary mt-2">
                    workflowgene.cloud
                  </div>
                </div>
              </div>
            </div>

            {/* SEO Score */}
            <div className="bg-surface rounded-md p-4">
              <h5 className="text-sm font-medium text-text-primary mb-3">SEO Score</h5>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">Title Length</span>
                  <div className="flex items-center space-x-2">
                    <Icon 
                      name={(seoData.title || '').length >= 30 && (seoData.title || '').length <= 60 ? 'CheckCircle' : 'AlertCircle'} 
                      size={16} 
                      className={(seoData.title || '').length >= 30 && (seoData.title || '').length <= 60 ? 'text-success' : 'text-warning'} 
                    />
                    <span className="text-sm">{(seoData.title || '').length}/60</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">Description Length</span>
                  <div className="flex items-center space-x-2">
                    <Icon 
                      name={(seoData.description || '').length >= 120 && (seoData.description || '').length <= 160 ? 'CheckCircle' : 'AlertCircle'} 
                      size={16} 
                      className={(seoData.description || '').length >= 120 && (seoData.description || '').length <= 160 ? 'text-success' : 'text-warning'} 
                    />
                    <span className="text-sm">{(seoData.description || '').length}/160</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">Keywords</span>
                  <div className="flex items-center space-x-2">
                    <Icon 
                      name={(seoData.keywords || '').split(',').filter(k => k.trim()).length > 0 ? 'CheckCircle' : 'AlertCircle'} 
                      size={16} 
                      className={(seoData.keywords || '').split(',').filter(k => k.trim()).length > 0 ? 'text-success' : 'text-warning'} 
                    />
                    <span className="text-sm">
                      {(seoData.keywords || '').split(',').filter(k => k.trim()).length} keywords
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">Social Image</span>
                  <div className="flex items-center space-x-2">
                    <Icon 
                      name={seoData.og_image ? 'CheckCircle' : 'AlertCircle'} 
                      size={16} 
                      className={seoData.og_image ? 'text-success' : 'text-warning'} 
                    />
                    <span className="text-sm">{seoData.og_image ? 'Set' : 'Missing'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Form Fields */}
          <div className="w-1/3 border-l border-border p-6 overflow-y-auto">
            {activeTab === 'basic' && (
              <div className="space-y-4">
                <Input
                  label="Page Title"
                  value={seoData.title}
                  onChange={(e) => handleUpdate('title', e.target.value)}
                  placeholder="Enter page title"
                />
                
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Meta Description
                  </label>
                  <textarea
                    value={seoData.description}
                    onChange={(e) => handleUpdate('description', e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    placeholder="Brief description for search engines"
                  />
                </div>
                
                <Input
                  label="Keywords"
                  value={seoData.keywords}
                  onChange={(e) => handleUpdate('keywords', e.target.value)}
                  placeholder="keyword1, keyword2"
                />
              </div>
            )}

            {activeTab === 'social' && (
              <div className="space-y-4">
                <Input
                  label="OG Title"
                  value={seoData.og_title}
                  onChange={(e) => handleUpdate('og_title', e.target.value)}
                  placeholder="Social media title"
                />
                
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    OG Description
                  </label>
                  <textarea
                    value={seoData.og_description}
                    onChange={(e) => handleUpdate('og_description', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    placeholder="Social media description"
                  />
                </div>
                
                <Input
                  label="OG Image URL"
                  value={seoData.og_image}
                  onChange={(e) => handleUpdate('og_image', e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
                
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  iconName="Upload"
                >
                  Choose from Media Library
                </Button>
              </div>
            )}

            {activeTab === 'advanced' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Robots
                  </label>
                  <select
                    value={seoData.robots}
                    onChange={(e) => handleUpdate('robots', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  >
                    <option value="index,follow">Index, Follow</option>
                    <option value="noindex,follow">No Index, Follow</option>
                    <option value="index,nofollow">Index, No Follow</option>
                    <option value="noindex,nofollow">No Index, No Follow</option>
                  </select>
                </div>
                
                <Input
                  label="Canonical URL"
                  value={seoData.canonical_url}
                  onChange={(e) => handleUpdate('canonical_url', e.target.value)}
                  placeholder="https://workflowgene.cloud/page"
                />
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <div className="text-sm text-text-secondary">
            Changes are saved automatically
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button variant="default" onClick={handleSave} iconName="Save">
              Save SEO Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SEOPanel;