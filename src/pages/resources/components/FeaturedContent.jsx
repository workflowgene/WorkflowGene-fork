import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const FeaturedContent = () => {
  const featuredItems = [
    {
      id: 1,
      type: 'Course',
      title: 'Complete Automation Mastery',
      description: `Master the fundamentals of business automation with our comprehensive 8-week course.\nLearn from industry experts and get certified.`,
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop',
      duration: '8 weeks',
      level: 'Beginner to Advanced',
      students: 2500,
      rating: 4.9,
      category: 'course',
      featured: true
    },
    {
      id: 2,
      type: 'Template Pack',
      title: 'E-commerce Automation Templates',
      description: `50+ ready-to-use workflow templates specifically designed for e-commerce businesses.\nBoost your sales and efficiency instantly.`,
      image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?w=600&h=400&fit=crop',
      downloads: 15000,
      rating: 4.8,
      category: 'template',
      featured: true
    },
    {
      id: 3,
      type: 'Webinar Series',
      title: 'Future of Work: AI & Automation',
      description: `Join our monthly webinar series exploring the intersection of AI and business automation.\nNetwork with industry leaders.`,
      image: 'https://images.pixabay.com/photo/2016/02/19/11/19/office-1209640_1280.jpg?w=600&h=400&fit=crop',
      nextSession: 'Oct 15, 2024',
      attendees: 5000,
      category: 'webinar',
      featured: true
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Icon name="Star" size={16} />
            <span>Featured Content</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            Start with Our Most Popular Resources
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Handpicked content that delivers maximum value for your automation journey
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {featuredItems?.map((item) => (
            <div key={item?.id} className="card-organic bg-card overflow-hidden group">
              <div className="relative overflow-hidden">
                <Image
                  src={item?.image}
                  alt={item?.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                    {item?.type}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="bg-white/90 backdrop-blur-sm p-2 rounded-genetic-md">
                    <Icon name="Bookmark" size={16} className="text-text-secondary" />
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-text-primary mb-3 group-hover:text-primary transition-colors">
                  {item?.title}
                </h3>
                
                <p className="text-text-secondary mb-4 line-clamp-3">
                  {item?.description?.split('\n')?.map((line, index) => (
                    <span key={index}>
                      {line}
                      {index < item?.description?.split('\n')?.length - 1 && <br />}
                    </span>
                  ))}
                </p>

                <div className="flex items-center justify-between mb-4">
                  {item?.duration && (
                    <div className="flex items-center space-x-1 text-sm text-text-secondary">
                      <Icon name="Clock" size={14} />
                      <span>{item?.duration}</span>
                    </div>
                  )}
                  {item?.downloads && (
                    <div className="flex items-center space-x-1 text-sm text-text-secondary">
                      <Icon name="Download" size={14} />
                      <span>{item?.downloads?.toLocaleString()} downloads</span>
                    </div>
                  )}
                  {item?.nextSession && (
                    <div className="flex items-center space-x-1 text-sm text-text-secondary">
                      <Icon name="Calendar" size={14} />
                      <span>{item?.nextSession}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-1">
                    <div className="flex items-center">
                      {[...Array(5)]?.map((_, i) => (
                        <Icon
                          key={i}
                          name="Star"
                          size={14}
                          className={i < Math.floor(item?.rating) ? 'text-warning fill-current' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-text-secondary ml-1">
                      {item?.rating}
                    </span>
                  </div>
                  
                  {item?.students && (
                    <span className="text-sm text-text-secondary">
                      {item?.students?.toLocaleString()} students
                    </span>
                  )}
                  {item?.attendees && (
                    <span className="text-sm text-text-secondary">
                      {item?.attendees?.toLocaleString()} registered
                    </span>
                  )}
                </div>

                <div className="flex space-x-3">
                  <Button variant="default" size="sm" className="flex-1">
                    {item?.type === 'Course' ? 'Enroll Now' : 
                     item?.type === 'Template Pack' ? 'Download' : 'Register'}
                  </Button>
                  <Button variant="outline" size="sm" iconName="Eye">
                    Preview
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg"
            iconName="ArrowRight"
            iconPosition="right"
          >
            Explore All Resources
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedContent;