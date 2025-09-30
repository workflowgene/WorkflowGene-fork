import React, { useState, useRef, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Icon from '../AppIcon';
import { useAuth } from '../auth/AuthProvider';
import { supabase } from '../../lib/supabase';
import toast from 'react-hot-toast';

const CMSBuilder = () => {
  const [selectedPage, setSelectedPage] = useState('homepage');
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [viewportMode, setViewportMode] = useState('desktop');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showMediaLibrary, setShowMediaLibrary] = useState(false);
  const [showSEOPanel, setShowSEOPanel] = useState(false);
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const [pageData, setPageData] = useState({});
  const [isDraft, setIsDraft] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const canvasRef = useRef(null);
  const { profile } = useAuth();

  const pages = [
    { id: 'homepage', name: 'Homepage', icon: 'Home', path: '/' },
    { id: 'about', name: 'About', icon: 'Info', path: '/about' },
    { id: 'contact', name: 'Contact', icon: 'MessageCircle', path: '/contact' },
    { id: 'pricing', name: 'Pricing', icon: 'DollarSign', path: '/pricing' },
    { id: 'features', name: 'Features', icon: 'Zap', path: '/features' },
    { id: 'industries', name: 'Industries', icon: 'Building2', path: '/industries' },
    { id: 'blog', name: 'Blog', icon: 'BookOpen', path: '/blog' }
  ];

  const componentPalette = [
    {
      category: 'Layout',
      components: [
        { id: 'hero', name: 'Hero Section', icon: 'Layout', description: 'Large banner with title and CTA' },
        { id: 'grid', name: 'Grid Layout', icon: 'Grid3X3', description: 'Responsive grid container' },
        { id: 'columns', name: 'Columns', icon: 'Columns', description: 'Multi-column layout' },
        { id: 'container', name: 'Container', icon: 'Square', description: 'Content wrapper' }
      ]
    },
    {
      category: 'Content',
      components: [
        { id: 'heading', name: 'Heading', icon: 'Type', description: 'Text headings H1-H6' },
        { id: 'paragraph', name: 'Paragraph', icon: 'AlignLeft', description: 'Body text content' },
        { id: 'image', name: 'Image', icon: 'Image', description: 'Image with caption' },
        { id: 'video', name: 'Video', icon: 'Video', description: 'Video embed' }
      ]
    },
    {
      category: 'Interactive',
      components: [
        { id: 'button', name: 'Button', icon: 'MousePointer', description: 'Call-to-action button' },
        { id: 'form', name: 'Form', icon: 'FileText', description: 'Contact or signup form' },
        { id: 'pricing-table', name: 'Pricing Table', icon: 'CreditCard', description: 'Pricing comparison' },
        { id: 'testimonial', name: 'Testimonial', icon: 'Quote', description: 'Customer testimonial' }
      ]
    },
    {
      category: 'Navigation',
      components: [
        { id: 'navbar', name: 'Navigation Bar', icon: 'Menu', description: 'Site navigation' },
        { id: 'footer', name: 'Footer', icon: 'Minus', description: 'Site footer' },
        { id: 'breadcrumb', name: 'Breadcrumb', icon: 'ChevronRight', description: 'Navigation breadcrumb' }
      ]
    }
  ];

  const viewportModes = [
    { id: 'desktop', name: 'Desktop', icon: 'Monitor', width: '100%' },
    { id: 'tablet', name: 'Tablet', icon: 'Tablet', width: '768px' },
    { id: 'mobile', name: 'Mobile', icon: 'Smartphone', width: '375px' }
  ];

  useEffect(() => {
    loadPageData(selectedPage);
  }, [selectedPage]);

  const loadPageData = async (pageId) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('cms_pages')
        .select('*')
        .eq('page_id', pageId)
        .eq('organization_id', profile?.organization_id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      
      if (data) {
        setPageData(data);
        setIsDraft(data.status === 'draft');
      } else {
        // Initialize default page structure
        setPageData({
          page_id: pageId,
          title: pages.find(p => p.id === pageId)?.name || 'Page',
          components: [],
          seo: {
            title: '',
            description: '',
            keywords: '',
            og_image: ''
          },
          status: 'draft'
        });
      }
    } catch (error) {
      console.error('Error loading page data:', error);
      toast.error('Failed to load page data');
    } finally {
      setIsLoading(false);
    }
  };

  const savePageData = async (publish = false) => {
    setIsLoading(true);
    try {
      const pageDataToSave = {
        ...pageData,
        organization_id: profile?.organization_id,
        updated_by: profile?.id,
        status: publish ? 'published' : 'draft',
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('cms_pages')
        .upsert(pageDataToSave);

      if (error) throw error;

      // Create version history entry
      await supabase
        .from('cms_versions')
        .insert({
          page_id: selectedPage,
          organization_id: profile?.organization_id,
          content: pageDataToSave,
          created_by: profile?.id,
          version_type: publish ? 'published' : 'draft'
        });

      setIsDraft(!publish);
      toast.success(publish ? 'Page published successfully' : 'Draft saved');
    } catch (error) {
      console.error('Error saving page:', error);
      toast.error('Failed to save page');
    } finally {
      setIsLoading(false);
    }
  };

  const addComponent = (componentType) => {
    const newComponent = {
      id: Date.now().toString(),
      type: componentType.id,
      name: componentType.name,
      props: getDefaultProps(componentType.id),
      styles: getDefaultStyles(componentType.id),
      children: []
    };

    setPageData(prev => ({
      ...prev,
      components: [...(prev.components || []), newComponent]
    }));
  };

  const getDefaultProps = (componentType) => {
    switch (componentType) {
      case 'hero':
        return {
          title: 'Hero Title',
          subtitle: 'Hero subtitle text',
          ctaText: 'Get Started',
          ctaLink: '#',
          backgroundImage: ''
        };
      case 'heading':
        return {
          text: 'Heading Text',
          level: 'h2',
          align: 'left'
        };
      case 'paragraph':
        return {
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          align: 'left'
        };
      case 'button':
        return {
          text: 'Click Me',
          variant: 'default',
          size: 'default',
          link: '#'
        };
      case 'image':
        return {
          src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop',
          alt: 'Image description',
          caption: ''
        };
      default:
        return {};
    }
  };

  const getDefaultStyles = (componentType) => {
    return {
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
      padding: { top: 16, right: 16, bottom: 16, left: 16 },
      backgroundColor: 'transparent',
      textColor: '#1F2937',
      fontSize: '16px',
      fontWeight: 'normal',
      borderRadius: '8px',
      border: 'none'
    };
  };

  const updateComponent = (componentId, updates) => {
    setPageData(prev => ({
      ...prev,
      components: prev.components?.map(comp =>
        comp.id === componentId ? { ...comp, ...updates } : comp
      )
    }));
  };

  const deleteComponent = (componentId) => {
    setPageData(prev => ({
      ...prev,
      components: prev.components?.filter(comp => comp.id !== componentId)
    }));
    setSelectedComponent(null);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(pageData.components || []);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setPageData(prev => ({ ...prev, components: items }));
  };

  const renderComponent = (component, index) => {
    const isSelected = selectedComponent?.id === component.id;
    
    return (
      <Draggable key={component.id} draggableId={component.id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onClick={() => setSelectedComponent(component)}
            className={`relative cursor-pointer transition-all duration-200 ${
              isSelected ? 'ring-2 ring-primary' : 'hover:ring-1 hover:ring-primary/50'
            } ${snapshot.isDragging ? 'shadow-lg' : ''}`}
            style={{
              ...provided.draggableProps.style,
              margin: `${component.styles?.margin?.top || 0}px ${component.styles?.margin?.right || 0}px ${component.styles?.margin?.bottom || 0}px ${component.styles?.margin?.left || 0}px`,
              padding: `${component.styles?.padding?.top || 16}px ${component.styles?.padding?.right || 16}px ${component.styles?.padding?.bottom || 16}px ${component.styles?.padding?.left || 16}px`,
              backgroundColor: component.styles?.backgroundColor || 'transparent',
              color: component.styles?.textColor || '#1F2937',
              fontSize: component.styles?.fontSize || '16px',
              fontWeight: component.styles?.fontWeight || 'normal',
              borderRadius: component.styles?.borderRadius || '8px',
              border: component.styles?.border || 'none'
            }}
          >
            {renderComponentContent(component)}
            
            {isSelected && (
              <div className="absolute -top-8 left-0 bg-primary text-white px-2 py-1 rounded text-xs font-medium">
                {component.name}
              </div>
            )}
          </div>
        )}
      </Draggable>
    );
  };

  const renderComponentContent = (component) => {
    switch (component.type) {
      case 'hero':
        return (
          <div className="text-center py-20">
            <h1 className="text-4xl font-bold mb-4">{component.props?.title}</h1>
            <p className="text-xl mb-8">{component.props?.subtitle}</p>
            <button className="bg-primary text-white px-6 py-3 rounded-lg">
              {component.props?.ctaText}
            </button>
          </div>
        );
      case 'heading':
        const HeadingTag = component.props?.level || 'h2';
        return (
          <HeadingTag style={{ textAlign: component.props?.align || 'left' }}>
            {component.props?.text}
          </HeadingTag>
        );
      case 'paragraph':
        return (
          <p style={{ textAlign: component.props?.align || 'left' }}>
            {component.props?.text}
          </p>
        );
      case 'button':
        return (
          <button className={`px-4 py-2 rounded ${
            component.props?.variant === 'outline' ? 'border border-primary text-primary' : 'bg-primary text-white'
          }`}>
            {component.props?.text}
          </button>
        );
      case 'image':
        return (
          <div>
            <img 
              src={component.props?.src} 
              alt={component.props?.alt}
              className="w-full h-auto rounded"
            />
            {component.props?.caption && (
              <p className="text-sm text-gray-500 mt-2">{component.props?.caption}</p>
            )}
          </div>
        );
      default:
        return (
          <div className="p-4 border-2 border-dashed border-gray-300 rounded">
            <p className="text-gray-500">{component.name} Component</p>
          </div>
        );
    }
  };

  if (profile?.role !== 'super_admin') {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div className="bg-card rounded-genetic-lg p-8 text-center shadow-organic-sm">
            <Icon name="Lock" size={64} className="text-error mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-text-primary mb-4">Access Denied</h2>
            <p className="text-text-secondary mb-6">
              CMS Builder is only available to super administrators. This feature manages the public website content and is not organization-specific.
            </p>
            
            <div className="bg-muted rounded-genetic-md p-4 mb-6">
              <h3 className="font-semibold text-text-primary mb-2">Access Information:</h3>
              <div className="text-sm text-text-secondary space-y-1">
                <p>Current user: {profile?.email || 'Not logged in'}</p>
                <p>Current role: {profile?.role || 'Not set'}</p>
                <p>Required role: super_admin</p>
                <p>Feature type: Website Management (Non-organizational)</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="default"
                onClick={() => window.location.href = '/dashboard'}
                iconName="ArrowLeft"
                iconPosition="left"
              >
                Back to Dashboard
              </Button>
              <Button 
                variant="outline"
                onClick={() => window.location.href = '/contact'}
                iconName="MessageCircle"
                iconPosition="left"
              >
                Request Access
              </Button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <div className={`h-screen flex ${isDarkMode ? 'dark' : ''}`}>
      {/* Left Sidebar */}
      <div className="w-80 bg-card border-r border-border flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-text-primary">CMS Builder</h2>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-md hover:bg-muted"
            >
              <Icon name={isDarkMode ? 'Sun' : 'Moon'} size={20} />
            </button>
          </div>
          
          <Select
            options={pages.map(p => ({ value: p.id, label: p.name }))}
            value={selectedPage}
            onChange={setSelectedPage}
            placeholder="Select page to edit"
          />
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-border">
          <button className="flex-1 px-4 py-3 text-sm font-medium bg-primary text-white">
            Components
          </button>
          <button className="flex-1 px-4 py-3 text-sm font-medium text-text-secondary hover:text-text-primary">
            Layers
          </button>
        </div>

        {/* Component Palette */}
        <div className="flex-1 overflow-y-auto p-4">
          {componentPalette.map((category) => (
            <div key={category.category} className="mb-6">
              <h3 className="text-sm font-semibold text-text-primary mb-3 uppercase tracking-wide">
                {category.category}
              </h3>
              <div className="space-y-2">
                {category.components.map((component) => (
                  <div
                    key={component.id}
                    onClick={() => addComponent(component)}
                    className="flex items-center space-x-3 p-3 rounded-md hover:bg-muted cursor-pointer transition-colors"
                  >
                    <div className="w-8 h-8 bg-primary/10 rounded-md flex items-center justify-center">
                      <Icon name={component.icon} size={16} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-text-primary">{component.name}</div>
                      <div className="text-xs text-text-secondary">{component.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-border space-y-3">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => savePageData(false)}
              loading={isLoading}
              iconName="Save"
            >
              Save Draft
            </Button>
            <Button
              variant="default"
              size="sm"
              className="flex-1"
              onClick={() => savePageData(true)}
              loading={isLoading}
              iconName="Upload"
            >
              Publish
            </Button>
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowMediaLibrary(true)}
              iconName="Image"
            >
              Media
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSEOPanel(true)}
              iconName="Search"
            >
              SEO
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowVersionHistory(true)}
              iconName="History"
            >
              History
            </Button>
          </div>
        </div>
      </div>

      {/* Center Canvas */}
      <div className="flex-1 flex flex-col bg-muted">
        {/* Canvas Header */}
        <div className="bg-card border-b border-border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h3 className="font-semibold text-text-primary">
                {pages.find(p => p.id === selectedPage)?.name}
              </h3>
              {isDraft && (
                <span className="px-2 py-1 bg-warning/10 text-warning text-xs rounded-full">
                  Draft
                </span>
              )}
            </div>
            
            {/* Viewport Toggle */}
            <div className="flex items-center space-x-2 bg-surface rounded-lg p-1">
              {viewportModes.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setViewportMode(mode.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewportMode === mode.id
                      ? 'bg-primary text-white' :'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <Icon name={mode.icon} size={16} />
                  <span>{mode.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 p-8 overflow-auto">
          <div 
            className="mx-auto bg-white rounded-lg shadow-lg min-h-full transition-all duration-300"
            style={{ 
              width: viewportModes.find(m => m.id === viewportMode)?.width,
              maxWidth: '100%'
            }}
          >
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="page-canvas">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="min-h-full"
                  >
                    {pageData.components?.length === 0 ? (
                      <div className="flex items-center justify-center h-96 text-center">
                        <div>
                          <Icon name="Layout" size={48} className="text-text-secondary mx-auto mb-4" />
                          <h3 className="text-lg font-semibold text-text-primary mb-2">
                            Start Building Your Page
                          </h3>
                          <p className="text-text-secondary">
                            Drag components from the left panel to start designing
                          </p>
                        </div>
                      </div>
                    ) : (
                      pageData.components?.map((component, index) => 
                        renderComponent(component, index)
                      )
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>
      </div>

      {/* Right Inspector Panel */}
      <div className="w-80 bg-card border-l border-border flex flex-col">
        {selectedComponent ? (
          <ComponentInspector
            component={selectedComponent}
            onUpdate={(updates) => updateComponent(selectedComponent.id, updates)}
            onDelete={() => deleteComponent(selectedComponent.id)}
          />
        ) : (
          <div className="p-6 text-center">
            <Icon name="MousePointer" size={48} className="text-text-secondary mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              Select a Component
            </h3>
            <p className="text-text-secondary">
              Click on any component in the canvas to edit its properties
            </p>
          </div>
        )}
      </div>

      {/* Modals */}
      {showMediaLibrary && (
        <MediaLibrary onClose={() => setShowMediaLibrary(false)} />
      )}
      
      {showSEOPanel && (
        <SEOPanel
          pageData={pageData}
          onUpdate={(seoData) => setPageData(prev => ({ ...prev, seo: seoData }))}
          onClose={() => setShowSEOPanel(false)}
        />
      )}
      
      {showVersionHistory && (
        <VersionHistory
          pageId={selectedPage}
          onRestore={(version) => {
            setPageData(version.content);
            setShowVersionHistory(false);
            toast.success('Version restored');
          }}
          onClose={() => setShowVersionHistory(false)}
        />
      )}
    </div>
  );
};

// Component Inspector Panel
const ComponentInspector = ({ component, onUpdate, onDelete }) => {
  const [activeTab, setActiveTab] = useState('properties');

  const tabs = [
    { id: 'properties', name: 'Properties', icon: 'Settings' },
    { id: 'styles', name: 'Styles', icon: 'Palette' },
    { id: 'advanced', name: 'Advanced', icon: 'Code' }
  ];

  const updateProps = (key, value) => {
    onUpdate({
      props: { ...component.props, [key]: value }
    });
  };

  const updateStyles = (key, value) => {
    onUpdate({
      styles: { ...component.styles, [key]: value }
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">{component.name}</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={onDelete}
            iconName="Trash2"
            className="text-error hover:text-error"
          />
        </div>
        
        <div className="flex space-x-1 bg-surface rounded-md p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-sm text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary text-white' :'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon name={tab.icon} size={14} />
              <span>{tab.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 'properties' && (
          <div className="space-y-4">
            {component.type === 'hero' && (
              <>
                <Input
                  label="Title"
                  value={component.props?.title || ''}
                  onChange={(e) => updateProps('title', e.target.value)}
                />
                <Input
                  label="Subtitle"
                  value={component.props?.subtitle || ''}
                  onChange={(e) => updateProps('subtitle', e.target.value)}
                />
                <Input
                  label="CTA Text"
                  value={component.props?.ctaText || ''}
                  onChange={(e) => updateProps('ctaText', e.target.value)}
                />
                <Input
                  label="CTA Link"
                  value={component.props?.ctaLink || ''}
                  onChange={(e) => updateProps('ctaLink', e.target.value)}
                />
              </>
            )}
            
            {component.type === 'heading' && (
              <>
                <Input
                  label="Text"
                  value={component.props?.text || ''}
                  onChange={(e) => updateProps('text', e.target.value)}
                />
                <Select
                  label="Heading Level"
                  options={[
                    { value: 'h1', label: 'H1' },
                    { value: 'h2', label: 'H2' },
                    { value: 'h3', label: 'H3' },
                    { value: 'h4', label: 'H4' },
                    { value: 'h5', label: 'H5' },
                    { value: 'h6', label: 'H6' }
                  ]}
                  value={component.props?.level || 'h2'}
                  onChange={(value) => updateProps('level', value)}
                />
                <Select
                  label="Alignment"
                  options={[
                    { value: 'left', label: 'Left' },
                    { value: 'center', label: 'Center' },
                    { value: 'right', label: 'Right' }
                  ]}
                  value={component.props?.align || 'left'}
                  onChange={(value) => updateProps('align', value)}
                />
              </>
            )}
            
            {component.type === 'paragraph' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Text Content
                  </label>
                  <textarea
                    value={component.props?.text || ''}
                    onChange={(e) => updateProps('text', e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <Select
                  label="Alignment"
                  options={[
                    { value: 'left', label: 'Left' },
                    { value: 'center', label: 'Center' },
                    { value: 'right', label: 'Right' },
                    { value: 'justify', label: 'Justify' }
                  ]}
                  value={component.props?.align || 'left'}
                  onChange={(value) => updateProps('align', value)}
                />
              </>
            )}
            
            {component.type === 'button' && (
              <>
                <Input
                  label="Button Text"
                  value={component.props?.text || ''}
                  onChange={(e) => updateProps('text', e.target.value)}
                />
                <Input
                  label="Link URL"
                  value={component.props?.link || ''}
                  onChange={(e) => updateProps('link', e.target.value)}
                />
                <Select
                  label="Variant"
                  options={[
                    { value: 'default', label: 'Default' },
                    { value: 'outline', label: 'Outline' },
                    { value: 'ghost', label: 'Ghost' }
                  ]}
                  value={component.props?.variant || 'default'}
                  onChange={(value) => updateProps('variant', value)}
                />
                <Select
                  label="Size"
                  options={[
                    { value: 'sm', label: 'Small' },
                    { value: 'default', label: 'Default' },
                    { value: 'lg', label: 'Large' }
                  ]}
                  value={component.props?.size || 'default'}
                  onChange={(value) => updateProps('size', value)}
                />
              </>
            )}
            
            {component.type === 'image' && (
              <>
                <Input
                  label="Image URL"
                  value={component.props?.src || ''}
                  onChange={(e) => updateProps('src', e.target.value)}
                />
                <Input
                  label="Alt Text"
                  value={component.props?.alt || ''}
                  onChange={(e) => updateProps('alt', e.target.value)}
                />
                <Input
                  label="Caption"
                  value={component.props?.caption || ''}
                  onChange={(e) => updateProps('caption', e.target.value)}
                />
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  iconName="Upload"
                  onClick={() => setShowMediaLibrary(true)}
                >
                  Choose from Media Library
                </Button>
              </>
            )}
          </div>
        )}

        {activeTab === 'styles' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Background Color
              </label>
              <input
                type="color"
                value={component.styles?.backgroundColor || '#ffffff'}
                onChange={(e) => updateStyles('backgroundColor', e.target.value)}
                className="w-full h-10 rounded border border-border"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Text Color
              </label>
              <input
                type="color"
                value={component.styles?.textColor || '#1F2937'}
                onChange={(e) => updateStyles('textColor', e.target.value)}
                className="w-full h-10 rounded border border-border"
              />
            </div>
            
            <Input
              label="Font Size"
              value={component.styles?.fontSize || '16px'}
              onChange={(e) => updateStyles('fontSize', e.target.value)}
              placeholder="16px"
            />
            
            <Select
              label="Font Weight"
              options={[
                { value: 'normal', label: 'Normal' },
                { value: 'medium', label: 'Medium' },
                { value: 'semibold', label: 'Semibold' },
                { value: 'bold', label: 'Bold' }
              ]}
              value={component.styles?.fontWeight || 'normal'}
              onChange={(value) => updateStyles('fontWeight', value)}
            />
            
            <Input
              label="Border Radius"
              value={component.styles?.borderRadius || '8px'}
              onChange={(e) => updateStyles('borderRadius', e.target.value)}
              placeholder="8px"
            />
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Padding
              </label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  placeholder="Top"
                  value={component.styles?.padding?.top || 16}
                  onChange={(e) => updateStyles('padding', {
                    ...component.styles?.padding,
                    top: parseInt(e.target.value) || 0
                  })}
                />
                <Input
                  placeholder="Right"
                  value={component.styles?.padding?.right || 16}
                  onChange={(e) => updateStyles('padding', {
                    ...component.styles?.padding,
                    right: parseInt(e.target.value) || 0
                  })}
                />
                <Input
                  placeholder="Bottom"
                  value={component.styles?.padding?.bottom || 16}
                  onChange={(e) => updateStyles('padding', {
                    ...component.styles?.padding,
                    bottom: parseInt(e.target.value) || 0
                  })}
                />
                <Input
                  placeholder="Left"
                  value={component.styles?.padding?.left || 16}
                  onChange={(e) => updateStyles('padding', {
                    ...component.styles?.padding,
                    left: parseInt(e.target.value) || 0
                  })}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Margin
              </label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  placeholder="Top"
                  value={component.styles?.margin?.top || 0}
                  onChange={(e) => updateStyles('margin', {
                    ...component.styles?.margin,
                    top: parseInt(e.target.value) || 0
                  })}
                />
                <Input
                  placeholder="Right"
                  value={component.styles?.margin?.right || 0}
                  onChange={(e) => updateStyles('margin', {
                    ...component.styles?.margin,
                    right: parseInt(e.target.value) || 0
                  })}
                />
                <Input
                  placeholder="Bottom"
                  value={component.styles?.margin?.bottom || 0}
                  onChange={(e) => updateStyles('margin', {
                    ...component.styles?.margin,
                    bottom: parseInt(e.target.value) || 0
                  })}
                />
                <Input
                  placeholder="Left"
                  value={component.styles?.margin?.left || 0}
                  onChange={(e) => updateStyles('margin', {
                    ...component.styles?.margin,
                    left: parseInt(e.target.value) || 0
                  })}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'advanced' && (
          <div className="space-y-4">
            <Input
              label="CSS Classes"
              value={component.cssClasses || ''}
              onChange={(e) => onUpdate({ cssClasses: e.target.value })}
              placeholder="custom-class another-class"
            />
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Custom CSS
              </label>
              <textarea
                value={component.customCSS || ''}
                onChange={(e) => onUpdate({ customCSS: e.target.value })}
                rows={6}
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
                placeholder="/* Custom CSS styles */"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Component ID
              </label>
              <Input
                value={component.htmlId || ''}
                onChange={(e) => onUpdate({ htmlId: e.target.value })}
                placeholder="unique-id"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Media Library Modal
const MediaLibrary = ({ onClose, onSelect }) => {
  const [mediaFiles, setMediaFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const mockMediaFiles = [
    {
      id: 1,
      name: 'hero-image.jpg',
      url: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop',
      type: 'image',
      size: '2.5 MB',
      uploadedAt: '2024-01-15'
    },
    {
      id: 2,
      name: 'team-photo.jpg',
      url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop',
      type: 'image',
      size: '1.8 MB',
      uploadedAt: '2024-01-14'
    },
    {
      id: 3,
      name: 'product-demo.mp4',
      url: '#',
      type: 'video',
      size: '15.2 MB',
      uploadedAt: '2024-01-13'
    }
  ];

  useEffect(() => {
    setMediaFiles(mockMediaFiles);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card rounded-lg shadow-lg w-full max-w-4xl h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h3 className="text-xl font-semibold text-text-primary">Media Library</h3>
          <Button variant="ghost" onClick={onClose} iconName="X" />
        </div>
        
        <div className="flex-1 p-6">
          <div className="mb-6">
            <Button
              variant="default"
              iconName="Upload"
              iconPosition="left"
              loading={uploading}
            >
              Upload Media
            </Button>
          </div>
          
          <div className="grid grid-cols-4 gap-4">
            {mediaFiles.map((file) => (
              <div
                key={file.id}
                onClick={() => onSelect?.(file)}
                className="border border-border rounded-lg p-4 hover:border-primary cursor-pointer transition-colors"
              >
                {file.type === 'image' ? (
                  <img src={file.url} alt={file.name} className="w-full h-24 object-cover rounded mb-2" />
                ) : (
                  <div className="w-full h-24 bg-muted rounded mb-2 flex items-center justify-center">
                    <Icon name="Video" size={24} className="text-text-secondary" />
                  </div>
                )}
                <div className="text-sm font-medium text-text-primary truncate">{file.name}</div>
                <div className="text-xs text-text-secondary">{file.size}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// SEO Panel Modal
const SEOPanel = ({ pageData, onUpdate, onClose }) => {
  const [seoData, setSeoData] = useState(pageData.seo || {});

  const handleUpdate = (key, value) => {
    const updated = { ...seoData, [key]: value };
    setSeoData(updated);
    onUpdate(updated);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card rounded-lg shadow-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h3 className="text-xl font-semibold text-text-primary">SEO Settings</h3>
          <Button variant="ghost" onClick={onClose} iconName="X" />
        </div>
        
        <div className="p-6 space-y-6">
          <Input
            label="Page Title"
            value={seoData.title || ''}
            onChange={(e) => handleUpdate('title', e.target.value)}
            description="Appears in browser tab and search results"
          />
          
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Meta Description
            </label>
            <textarea
              value={seoData.description || ''}
              onChange={(e) => handleUpdate('description', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Brief description for search engines"
            />
            <p className="text-xs text-text-secondary mt-1">
              {(seoData.description || '').length}/160 characters
            </p>
          </div>
          
          <Input
            label="Keywords"
            value={seoData.keywords || ''}
            onChange={(e) => handleUpdate('keywords', e.target.value)}
            placeholder="keyword1, keyword2, keyword3"
            description="Comma-separated keywords"
          />
          
          <Input
            label="Open Graph Image"
            value={seoData.og_image || ''}
            onChange={(e) => handleUpdate('og_image', e.target.value)}
            placeholder="https://example.com/image.jpg"
            description="Image for social media sharing"
          />
          
          <div className="bg-surface rounded-md p-4">
            <h4 className="font-semibold text-text-primary mb-2">Search Preview</h4>
            <div className="space-y-2">
              <div className="text-blue-600 text-lg">{seoData.title || 'Page Title'}</div>
              <div className="text-green-600 text-sm">workflowgene.cloud{pages.find(p => p.id === selectedPage)?.path}</div>
              <div className="text-text-secondary text-sm">{seoData.description || 'Meta description will appear here'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Version History Modal
const VersionHistory = ({ pageId, onRestore, onClose }) => {
  const [versions, setVersions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVersions();
  }, [pageId]);

  const fetchVersions = async () => {
    try {
      const { data, error } = await supabase
        .from('cms_versions')
        .select(`
          *,
          created_by:profiles!cms_versions_created_by_fkey(first_name, last_name)
        `)
        .eq('page_id', pageId)
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      setVersions(data || []);
    } catch (error) {
      console.error('Error fetching versions:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card rounded-lg shadow-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h3 className="text-xl font-semibold text-text-primary">Version History</h3>
          <Button variant="ghost" onClick={onClose} iconName="X" />
        </div>
        
        <div className="p-6">
          {loading ? (
            <div className="text-center py-8">
              <Icon name="Loader2" size={32} className="animate-spin text-text-secondary mx-auto mb-4" />
              <p className="text-text-secondary">Loading version history...</p>
            </div>
          ) : versions.length === 0 ? (
            <div className="text-center py-8">
              <Icon name="History" size={48} className="text-text-secondary mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-text-primary mb-2">No Version History</h4>
              <p className="text-text-secondary">
                Version history will appear here after you save changes
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {versions.map((version) => (
                <div key={version.id} className="flex items-center justify-between p-4 border border-border rounded-md">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        version.version_type === 'published' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                      }`}>
                        {version.version_type}
                      </span>
                      <span className="text-sm text-text-secondary">
                        {new Date(version.created_at).toLocaleString()}
                      </span>
                    </div>
                    <div className="text-sm text-text-secondary">
                      by {version.created_by?.first_name} {version.created_by?.last_name}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onRestore(version)}
                    iconName="RotateCcw"
                  >
                    Restore
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CMSBuilder;