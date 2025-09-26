import React, { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Icon from '../AppIcon';

const ComponentInspector = ({ component, onUpdate, onDelete }) => {
  const [activeTab, setActiveTab] = useState('properties');

  const tabs = [
    { id: 'properties', name: 'Properties', icon: 'Settings' },
    { id: 'styles', name: 'Styles', icon: 'Palette' },
    { id: 'responsive', name: 'Responsive', icon: 'Monitor' },
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

  const updateResponsiveStyles = (breakpoint, key, value) => {
    const responsive = component.responsive || {};
    onUpdate({
      responsive: {
        ...responsive,
        [breakpoint]: {
          ...responsive[breakpoint],
          [key]: value
        }
      }
    });
  };

  const renderPropertiesTab = () => {
    switch (component.type) {
      case 'hero':
        return (
          <div className="space-y-4">
            <Input
              label="Title"
              value={component.props?.title || ''}
              onChange={(e) => updateProps('title', e.target.value)}
            />
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Subtitle
              </label>
              <textarea
                value={component.props?.subtitle || ''}
                onChange={(e) => updateProps('subtitle', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
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
            <Input
              label="Background Image URL"
              value={component.props?.backgroundImage || ''}
              onChange={(e) => updateProps('backgroundImage', e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="overlay"
                checked={component.props?.overlay || false}
                onChange={(e) => updateProps('overlay', e.target.checked)}
                className="rounded border-border"
              />
              <label htmlFor="overlay" className="text-sm text-text-primary">
                Add dark overlay
              </label>
            </div>
          </div>
        );

      case 'heading':
        return (
          <div className="space-y-4">
            <Input
              label="Text"
              value={component.props?.text || ''}
              onChange={(e) => updateProps('text', e.target.value)}
            />
            <Select
              label="Heading Level"
              options={[
                { value: 'h1', label: 'H1 - Main Title' },
                { value: 'h2', label: 'H2 - Section Title' },
                { value: 'h3', label: 'H3 - Subsection' },
                { value: 'h4', label: 'H4 - Minor Heading' },
                { value: 'h5', label: 'H5 - Small Heading' },
                { value: 'h6', label: 'H6 - Tiny Heading' }
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
          </div>
        );

      case 'paragraph':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Text Content
              </label>
              <textarea
                value={component.props?.text || ''}
                onChange={(e) => updateProps('text', e.target.value)}
                rows={6}
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter your text content..."
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
          </div>
        );

      case 'button':
        return (
          <div className="space-y-4">
            <Input
              label="Button Text"
              value={component.props?.text || ''}
              onChange={(e) => updateProps('text', e.target.value)}
            />
            <Input
              label="Link URL"
              value={component.props?.link || ''}
              onChange={(e) => updateProps('link', e.target.value)}
              placeholder="https://example.com or /page"
            />
            <Select
              label="Variant"
              options={[
                { value: 'default', label: 'Default (Filled)' },
                { value: 'outline', label: 'Outline' },
                { value: 'ghost', label: 'Ghost' },
                { value: 'link', label: 'Link' }
              ]}
              value={component.props?.variant || 'default'}
              onChange={(value) => updateProps('variant', value)}
            />
            <Select
              label="Size"
              options={[
                { value: 'sm', label: 'Small' },
                { value: 'default', label: 'Default' },
                { value: 'lg', label: 'Large' },
                { value: 'xl', label: 'Extra Large' }
              ]}
              value={component.props?.size || 'default'}
              onChange={(value) => updateProps('size', value)}
            />
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="fullWidth"
                checked={component.props?.fullWidth || false}
                onChange={(e) => updateProps('fullWidth', e.target.checked)}
                className="rounded border-border"
              />
              <label htmlFor="fullWidth" className="text-sm text-text-primary">
                Full width
              </label>
            </div>
          </div>
        );

      case 'image':
        return (
          <div className="space-y-4">
            <Input
              label="Image URL"
              value={component.props?.src || ''}
              onChange={(e) => updateProps('src', e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
            <Input
              label="Alt Text"
              value={component.props?.alt || ''}
              onChange={(e) => updateProps('alt', e.target.value)}
              placeholder="Describe the image for accessibility"
            />
            <Input
              label="Caption"
              value={component.props?.caption || ''}
              onChange={(e) => updateProps('caption', e.target.value)}
              placeholder="Optional image caption"
            />
            <Select
              label="Object Fit"
              options={[
                { value: 'cover', label: 'Cover' },
                { value: 'contain', label: 'Contain' },
                { value: 'fill', label: 'Fill' },
                { value: 'scale-down', label: 'Scale Down' }
              ]}
              value={component.props?.objectFit || 'cover'}
              onChange={(value) => updateProps('objectFit', value)}
            />
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="rounded"
                checked={component.props?.rounded || false}
                onChange={(e) => updateProps('rounded', e.target.checked)}
                className="rounded border-border"
              />
              <label htmlFor="rounded" className="text-sm text-text-primary">
                Rounded corners
              </label>
            </div>
          </div>
        );

      case 'form':
        return (
          <div className="space-y-4">
            <Input
              label="Form Title"
              value={component.props?.title || ''}
              onChange={(e) => updateProps('title', e.target.value)}
              placeholder="Contact Us"
            />
            <Input
              label="Submit Button Text"
              value={component.props?.submitText || ''}
              onChange={(e) => updateProps('submitText', e.target.value)}
              placeholder="Submit"
            />
            <Input
              label="Success Message"
              value={component.props?.successMessage || ''}
              onChange={(e) => updateProps('successMessage', e.target.value)}
              placeholder="Thank you for your message!"
            />
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-primary">Form Fields</label>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="includeName"
                  checked={component.props?.includeName !== false}
                  onChange={(e) => updateProps('includeName', e.target.checked)}
                  className="rounded border-border"
                />
                <label htmlFor="includeName" className="text-sm text-text-primary">Name field</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="includeEmail"
                  checked={component.props?.includeEmail !== false}
                  onChange={(e) => updateProps('includeEmail', e.target.checked)}
                  className="rounded border-border"
                />
                <label htmlFor="includeEmail" className="text-sm text-text-primary">Email field</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="includePhone"
                  checked={component.props?.includePhone || false}
                  onChange={(e) => updateProps('includePhone', e.target.checked)}
                  className="rounded border-border"
                />
                <label htmlFor="includePhone" className="text-sm text-text-primary">Phone field</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="includeMessage"
                  checked={component.props?.includeMessage !== false}
                  onChange={(e) => updateProps('includeMessage', e.target.checked)}
                  className="rounded border-border"
                />
                <label htmlFor="includeMessage" className="text-sm text-text-primary">Message field</label>
              </div>
            </div>
          </div>
        );

      case 'testimonial':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Quote
              </label>
              <textarea
                value={component.props?.quote || ''}
                onChange={(e) => updateProps('quote', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter the testimonial quote..."
              />
            </div>
            <Input
              label="Author Name"
              value={component.props?.authorName || ''}
              onChange={(e) => updateProps('authorName', e.target.value)}
              placeholder="John Doe"
            />
            <Input
              label="Author Role"
              value={component.props?.authorRole || ''}
              onChange={(e) => updateProps('authorRole', e.target.value)}
              placeholder="CEO"
            />
            <Input
              label="Company"
              value={component.props?.authorCompany || ''}
              onChange={(e) => updateProps('authorCompany', e.target.value)}
              placeholder="Company Name"
            />
            <Input
              label="Author Image URL"
              value={component.props?.authorImage || ''}
              onChange={(e) => updateProps('authorImage', e.target.value)}
              placeholder="https://example.com/avatar.jpg"
            />
          </div>
        );

      case 'grid':
        return (
          <div className="space-y-4">
            <Select
              label="Number of Columns"
              options={[
                { value: 1, label: '1 Column' },
                { value: 2, label: '2 Columns' },
                { value: 3, label: '3 Columns' },
                { value: 4, label: '4 Columns' },
                { value: 6, label: '6 Columns' }
              ]}
              value={component.props?.columns || 3}
              onChange={(value) => updateProps('columns', parseInt(value))}
            />
            <Input
              label="Gap Size"
              value={component.props?.gap || '24px'}
              onChange={(e) => updateProps('gap', e.target.value)}
              placeholder="24px"
            />
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="equalHeight"
                checked={component.props?.equalHeight || false}
                onChange={(e) => updateProps('equalHeight', e.target.checked)}
                className="rounded border-border"
              />
              <label htmlFor="equalHeight" className="text-sm text-text-primary">
                Equal height columns
              </label>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-8">
            <Icon name="Settings" size={32} className="text-text-secondary mx-auto mb-4" />
            <p className="text-text-secondary">
              No properties available for this component type
            </p>
          </div>
        );
    }
  };

  const renderStylesTab = () => (
    <div className="space-y-6">
      {/* Colors */}
      <div>
        <h4 className="text-sm font-semibold text-text-primary mb-3">Colors</h4>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Background Color
            </label>
            <div className="flex space-x-2">
              <input
                type="color"
                value={component.styles?.backgroundColor || '#ffffff'}
                onChange={(e) => updateStyles('backgroundColor', e.target.value)}
                className="w-12 h-10 rounded border border-border"
              />
              <Input
                value={component.styles?.backgroundColor || '#ffffff'}
                onChange={(e) => updateStyles('backgroundColor', e.target.value)}
                placeholder="#ffffff"
                className="flex-1"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Text Color
            </label>
            <div className="flex space-x-2">
              <input
                type="color"
                value={component.styles?.textColor || '#1F2937'}
                onChange={(e) => updateStyles('textColor', e.target.value)}
                className="w-12 h-10 rounded border border-border"
              />
              <Input
                value={component.styles?.textColor || '#1F2937'}
                onChange={(e) => updateStyles('textColor', e.target.value)}
                placeholder="#1F2937"
                className="flex-1"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Typography */}
      <div>
        <h4 className="text-sm font-semibold text-text-primary mb-3">Typography</h4>
        <div className="space-y-3">
          <Input
            label="Font Size"
            value={component.styles?.fontSize || '16px'}
            onChange={(e) => updateStyles('fontSize', e.target.value)}
            placeholder="16px"
          />
          
          <Select
            label="Font Weight"
            options={[
              { value: 'normal', label: 'Normal (400)' },
              { value: 'medium', label: 'Medium (500)' },
              { value: 'semibold', label: 'Semibold (600)' },
              { value: 'bold', label: 'Bold (700)' }
            ]}
            value={component.styles?.fontWeight || 'normal'}
            onChange={(value) => updateStyles('fontWeight', value)}
          />
          
          <Input
            label="Line Height"
            value={component.styles?.lineHeight || '1.5'}
            onChange={(e) => updateStyles('lineHeight', e.target.value)}
            placeholder="1.5"
          />
        </div>
      </div>

      {/* Spacing */}
      <div>
        <h4 className="text-sm font-semibold text-text-primary mb-3">Spacing</h4>
        <div className="space-y-3">
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
      </div>

      {/* Border & Effects */}
      <div>
        <h4 className="text-sm font-semibold text-text-primary mb-3">Border & Effects</h4>
        <div className="space-y-3">
          <Input
            label="Border Radius"
            value={component.styles?.borderRadius || '8px'}
            onChange={(e) => updateStyles('borderRadius', e.target.value)}
            placeholder="8px"
          />
          
          <Input
            label="Border"
            value={component.styles?.border || 'none'}
            onChange={(e) => updateStyles('border', e.target.value)}
            placeholder="1px solid #e5e7eb"
          />
          
          <Select
            label="Box Shadow"
            options={[
              { value: 'none', label: 'None' },
              { value: 'sm', label: 'Small' },
              { value: 'md', label: 'Medium' },
              { value: 'lg', label: 'Large' },
              { value: 'xl', label: 'Extra Large' }
            ]}
            value={component.styles?.boxShadow || 'none'}
            onChange={(value) => updateStyles('boxShadow', value)}
          />
        </div>
      </div>
    </div>
  );

  const renderResponsiveTab = () => {
    const breakpoints = [
      { id: 'mobile', name: 'Mobile', icon: 'Smartphone', width: '< 768px' },
      { id: 'tablet', name: 'Tablet', icon: 'Tablet', width: '768px - 1024px' },
      { id: 'desktop', name: 'Desktop', icon: 'Monitor', width: '> 1024px' }
    ];

    return (
      <div className="space-y-6">
        <div className="text-sm text-text-secondary">
          Configure how this component appears on different screen sizes
        </div>
        
        {breakpoints.map((breakpoint) => (
          <div key={breakpoint.id} className="border border-border rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-4">
              <Icon name={breakpoint.icon} size={16} className="text-primary" />
              <span className="font-medium text-text-primary">{breakpoint.name}</span>
              <span className="text-xs text-text-secondary">({breakpoint.width})</span>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={`${breakpoint.id}-hidden`}
                  checked={component.responsive?.[breakpoint.id]?.hidden || false}
                  onChange={(e) => updateResponsiveStyles(breakpoint.id, 'hidden', e.target.checked)}
                  className="rounded border-border"
                />
                <label htmlFor={`${breakpoint.id}-hidden`} className="text-sm text-text-primary">
                  Hide on {breakpoint.name.toLowerCase()}
                </label>
              </div>
              
              <Input
                label="Font Size"
                value={component.responsive?.[breakpoint.id]?.fontSize || ''}
                onChange={(e) => updateResponsiveStyles(breakpoint.id, 'fontSize', e.target.value)}
                placeholder="Inherit from base styles"
              />
              
              <div className="grid grid-cols-2 gap-2">
                <Input
                  label="Padding"
                  value={component.responsive?.[breakpoint.id]?.padding || ''}
                  onChange={(e) => updateResponsiveStyles(breakpoint.id, 'padding', e.target.value)}
                  placeholder="16px"
                />
                <Input
                  label="Margin"
                  value={component.responsive?.[breakpoint.id]?.margin || ''}
                  onChange={(e) => updateResponsiveStyles(breakpoint.id, 'margin', e.target.value)}
                  placeholder="0px"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderAdvancedTab = () => (
    <div className="space-y-6">
      <Input
        label="CSS Classes"
        value={component.cssClasses || ''}
        onChange={(e) => onUpdate({ cssClasses: e.target.value })}
        placeholder="custom-class another-class"
        description="Additional CSS classes to apply"
      />
      
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Custom CSS
        </label>
        <textarea
          value={component.customCSS || ''}
          onChange={(e) => onUpdate({ customCSS: e.target.value })}
          rows={8}
          className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
          placeholder="/* Custom CSS styles */
.my-component {
  /* Your styles here */
}"
        />
      </div>
      
      <Input
        label="HTML ID"
        value={component.htmlId || ''}
        onChange={(e) => onUpdate({ htmlId: e.target.value })}
        placeholder="unique-component-id"
        description="Unique identifier for this component"
      />
      
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Custom Attributes
        </label>
        <textarea
          value={component.customAttributes || ''}
          onChange={(e) => onUpdate({ customAttributes: e.target.value })}
          rows={3}
          className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
          placeholder='data-analytics="track-click"
aria-label="Custom label"'
        />
        <p className="text-xs text-text-secondary mt-1">
          One attribute per line (key="value" format)
        </p>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-text-primary">{component.name}</h3>
            <p className="text-sm text-text-secondary">Component ID: {component.id}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onDelete}
            iconName="Trash2"
            className="text-error hover:text-error hover:bg-error/10"
          />
        </div>
        
        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-surface rounded-md p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-sm text-sm font-medium transition-colors flex-1 justify-center ${
                activeTab === tab.id
                  ? 'bg-primary text-white' :'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon name={tab.icon} size={14} />
              <span className="hidden sm:inline">{tab.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 'properties' && renderPropertiesTab()}
        {activeTab === 'styles' && renderStylesTab()}
        {activeTab === 'responsive' && renderResponsiveTab()}
        {activeTab === 'advanced' && renderAdvancedTab()}
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="text-xs text-text-secondary">
            Changes are applied automatically
          </div>
          <Button
            variant="outline"
            size="sm"
            iconName="Copy"
            onClick={() => {
              navigator.clipboard.writeText(JSON.stringify(component, null, 2));
              toast.success('Component data copied to clipboard');
            }}
          >
            Copy Component
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ComponentInspector;