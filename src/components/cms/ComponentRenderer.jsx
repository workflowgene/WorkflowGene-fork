import React from 'react';
import Button from '../ui/Button';
import Icon from '../AppIcon';
import Image from '../AppImage';

const ComponentRenderer = ({ component, isEditing = false, onSelect, isSelected = false }) => {
  const handleClick = (e) => {
    if (isEditing) {
      e.stopPropagation();
      onSelect?.(component);
    }
  };

  const getComponentStyles = () => {
    const styles = component.styles || {};
    return {
      margin: `${styles.margin?.top || 0}px ${styles.margin?.right || 0}px ${styles.margin?.bottom || 0}px ${styles.margin?.left || 0}px`,
      padding: `${styles.padding?.top || 16}px ${styles.padding?.right || 16}px ${styles.padding?.bottom || 16}px ${styles.padding?.left || 16}px`,
      backgroundColor: styles.backgroundColor || 'transparent',
      color: styles.textColor || '#1F2937',
      fontSize: styles.fontSize || '16px',
      fontWeight: styles.fontWeight || 'normal',
      borderRadius: styles.borderRadius || '8px',
      border: styles.border || 'none'
    };
  };

  const renderHeroSection = () => (
    <section 
      className={`relative py-20 ${component.props?.backgroundImage ? 'bg-cover bg-center' : 'bg-gradient-to-br from-primary/5 to-accent/5'}`}
      style={{ 
        backgroundImage: component.props?.backgroundImage ? `url(${component.props.backgroundImage})` : undefined 
      }}
    >
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h1 className="text-4xl lg:text-6xl font-bold text-text-primary mb-6">
          {component.props?.title || 'Hero Title'}
        </h1>
        <p className="text-xl text-text-secondary mb-8 max-w-3xl mx-auto">
          {component.props?.subtitle || 'Hero subtitle text'}
        </p>
        <Button 
          variant="default" 
          size="lg"
          className="btn-organic"
        >
          {component.props?.ctaText || 'Get Started'}
        </Button>
      </div>
    </section>
  );

  const renderHeading = () => {
    const HeadingTag = component.props?.level || 'h2';
    const alignment = component.props?.align || 'left';
    
    return (
      <HeadingTag 
        className={`font-bold text-text-primary ${
          HeadingTag === 'h1' ? 'text-4xl' :
          HeadingTag === 'h2' ? 'text-3xl' :
          HeadingTag === 'h3' ? 'text-2xl' :
          HeadingTag === 'h4' ? 'text-xl' :
          HeadingTag === 'h5' ? 'text-lg' : 'text-base'
        }`}
        style={{ textAlign: alignment }}
      >
        {component.props?.text || 'Heading Text'}
      </HeadingTag>
    );
  };

  const renderParagraph = () => (
    <p 
      className="text-text-secondary leading-relaxed"
      style={{ textAlign: component.props?.align || 'left' }}
    >
      {component.props?.text || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}
    </p>
  );

  const renderButton = () => (
    <Button
      variant={component.props?.variant || 'default'}
      size={component.props?.size || 'default'}
      className={component.props?.variant === 'default' ? 'btn-organic' : ''}
    >
      {component.props?.text || 'Click Me'}
    </Button>
  );

  const renderImage = () => (
    <div>
      <Image
        src={component.props?.src || 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop'}
        alt={component.props?.alt || 'Image description'}
        className="w-full h-auto rounded-lg"
      />
      {component.props?.caption && (
        <p className="text-sm text-text-secondary mt-2 text-center">
          {component.props.caption}
        </p>
      )}
    </div>
  );

  const renderGrid = () => (
    <div className={`grid gap-6 ${
      component.props?.columns === 2 ? 'grid-cols-1 md:grid-cols-2' :
      component.props?.columns === 3 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' :
      component.props?.columns === 4 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' :
      'grid-cols-1 md:grid-cols-3'
    }`}>
      {component.children?.map((child, index) => (
        <div key={child.id || index} className="bg-card p-6 rounded-lg">
          <ComponentRenderer component={child} isEditing={isEditing} onSelect={onSelect} />
        </div>
      )) || (
        <>
          <div className="bg-card p-6 rounded-lg border-2 border-dashed border-border">
            <p className="text-text-secondary text-center">Grid Item 1</p>
          </div>
          <div className="bg-card p-6 rounded-lg border-2 border-dashed border-border">
            <p className="text-text-secondary text-center">Grid Item 2</p>
          </div>
          <div className="bg-card p-6 rounded-lg border-2 border-dashed border-border">
            <p className="text-text-secondary text-center">Grid Item 3</p>
          </div>
        </>
      )}
    </div>
  );

  const renderForm = () => (
    <form className="space-y-6 max-w-md mx-auto">
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          {component.props?.nameLabel || 'Name'}
        </label>
        <input
          type="text"
          className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder={component.props?.namePlaceholder || 'Enter your name'}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          {component.props?.emailLabel || 'Email'}
        </label>
        <input
          type="email"
          className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder={component.props?.emailPlaceholder || 'Enter your email'}
        />
      </div>
      {component.props?.includeMessage && (
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            {component.props?.messageLabel || 'Message'}
          </label>
          <textarea
            rows={4}
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder={component.props?.messagePlaceholder || 'Enter your message'}
          />
        </div>
      )}
      <Button variant="default" fullWidth className="btn-organic">
        {component.props?.submitText || 'Submit'}
      </Button>
    </form>
  );

  const renderPricingTable = () => (
    <div className="grid md:grid-cols-3 gap-8">
      {(component.props?.plans || [
        { name: 'Starter', price: '$29', features: ['5 workflows', '1K executions', 'Email support'] },
        { name: 'Professional', price: '$99', features: ['50 workflows', '10K executions', 'Priority support'] },
        { name: 'Enterprise', price: 'Custom', features: ['Unlimited workflows', 'Unlimited executions', 'Dedicated support'] }
      ]).map((plan, index) => (
        <div key={index} className={`bg-card rounded-lg p-6 border ${index === 1 ? 'border-primary' : 'border-border'}`}>
          {index === 1 && (
            <div className="text-center mb-4">
              <span className="bg-primary text-white px-3 py-1 rounded-full text-sm">Most Popular</span>
            </div>
          )}
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-text-primary mb-2">{plan.name}</h3>
            <div className="text-3xl font-bold text-primary">{plan.price}</div>
            <div className="text-text-secondary">per month</div>
          </div>
          <ul className="space-y-2 mb-6">
            {plan.features.map((feature, idx) => (
              <li key={idx} className="flex items-center space-x-2">
                <Icon name="Check" size={16} className="text-success" />
                <span className="text-text-secondary">{feature}</span>
              </li>
            ))}
          </ul>
          <Button variant={index === 1 ? 'default' : 'outline'} fullWidth>
            Get Started
          </Button>
        </div>
      ))}
    </div>
  );

  const renderTestimonial = () => (
    <div className="bg-card rounded-lg p-8 shadow-md">
      <div className="mb-6">
        <Icon name="Quote" size={32} className="text-primary/20" />
      </div>
      <blockquote className="text-lg text-text-primary mb-6 leading-relaxed">
        "{component.props?.quote || 'This is an amazing product that has transformed our business operations.'}"
      </blockquote>
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
          <span className="text-white font-semibold">
            {(component.props?.authorName || 'John Doe').split(' ').map(n => n[0]).join('')}
          </span>
        </div>
        <div>
          <div className="font-semibold text-text-primary">
            {component.props?.authorName || 'John Doe'}
          </div>
          <div className="text-sm text-text-secondary">
            {component.props?.authorRole || 'CEO'}, {component.props?.authorCompany || 'Company Name'}
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (component.type) {
      case 'hero':
        return renderHeroSection();
      case 'heading':
        return renderHeading();
      case 'paragraph':
        return renderParagraph();
      case 'button':
        return renderButton();
      case 'image':
        return renderImage();
      case 'grid':
        return renderGrid();
      case 'form':
        return renderForm();
      case 'pricing-table':
        return renderPricingTable();
      case 'testimonial':
        return renderTestimonial();
      default:
        return (
          <div className="p-4 border-2 border-dashed border-gray-300 rounded">
            <p className="text-gray-500 text-center">{component.name} Component</p>
          </div>
        );
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`relative transition-all duration-200 ${
        isEditing && isSelected ? 'ring-2 ring-primary' : ''
      } ${isEditing ? 'cursor-pointer hover:ring-1 hover:ring-primary/50' : ''}`}
      style={getComponentStyles()}
    >
      {renderContent()}
      
      {isEditing && isSelected && (
        <div className="absolute -top-8 left-0 bg-primary text-white px-2 py-1 rounded text-xs font-medium z-10">
          {component.name}
        </div>
      )}
    </div>
  );
};

export default ComponentRenderer;