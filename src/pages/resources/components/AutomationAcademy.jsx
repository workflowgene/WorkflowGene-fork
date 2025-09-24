import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const AutomationAcademy = () => {
  const learningPaths = [
    {
      id: 1,
      title: 'Automation Fundamentals',
      description: 'Perfect for beginners starting their automation journey',
      level: 'Beginner',
      duration: '4 weeks',
      modules: 12,
      students: 3500,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop',
      skills: ['Workflow Design', 'Process Mapping', 'Basic Automation']
    },
    {
      id: 2,
      title: 'Advanced Integration Mastery',
      description: 'Deep dive into complex integrations and API management',
      level: 'Advanced',
      duration: '6 weeks',
      modules: 18,
      students: 1200,
      rating: 4.8,
      image: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?w=400&h=300&fit=crop',
      skills: ['API Integration', 'Custom Connectors', 'Error Handling']
    },
    {
      id: 3,
      title: 'AI-Powered Automation',
      description: 'Leverage artificial intelligence in your workflows',
      level: 'Intermediate',
      duration: '5 weeks',
      modules: 15,
      students: 2100,
      rating: 4.9,
      image: 'https://images.pixabay.com/photo/2017/05/10/19/29/robot-2301646_1280.jpg?w=400&h=300&fit=crop',
      skills: ['Machine Learning', 'Natural Language Processing', 'Predictive Analytics']
    }
  ];

  const certifications = [
    {
      id: 1,
      name: 'Certified Automation Specialist',
      description: 'Industry-recognized certification for automation professionals',
      duration: '3 months',
      price: 'Free',
      badge: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=100&h=100&fit=crop'
    },
    {
      id: 2,
      name: 'Advanced Integration Expert',
      description: 'Master-level certification for complex automation scenarios',
      duration: '6 months',
      price: 'Free',
      badge: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?w=100&h=100&fit=crop'
    }
  ];

  return (
    <section className="py-16 bg-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-success/10 text-success px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Icon name="GraduationCap" size={16} />
            <span>Automation Academy</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            Structured Learning Paths
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            From beginner to expert, our comprehensive courses will guide you through every aspect of business automation
          </p>
        </div>

        {/* Learning Paths */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-text-primary mb-8">Featured Courses</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {learningPaths?.map((path) => (
              <div key={path?.id} className="card-organic bg-card overflow-hidden group">
                <div className="relative overflow-hidden">
                  <Image
                    src={path?.image}
                    alt={path?.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      path?.level === 'Beginner' ? 'bg-success text-white' :
                      path?.level === 'Intermediate'? 'bg-warning text-white' : 'bg-error text-white'
                    }`}>
                      {path?.level}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h4 className="text-xl font-semibold text-text-primary mb-2 group-hover:text-primary transition-colors">
                    {path?.title}
                  </h4>
                  
                  <p className="text-text-secondary mb-4">
                    {path?.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-text-secondary">
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={14} />
                      <span>{path?.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="BookOpen" size={14} />
                      <span>{path?.modules} modules</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Users" size={14} />
                      <span>{path?.students?.toLocaleString()} students</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" size={14} className="text-warning fill-current" />
                      <span>{path?.rating}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h5 className="text-sm font-medium text-text-primary mb-2">You'll Learn:</h5>
                    <div className="flex flex-wrap gap-2">
                      {path?.skills?.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-primary/10 text-primary px-2 py-1 rounded-genetic-sm text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <Button variant="default" size="sm" className="flex-1">
                      Enroll Free
                    </Button>
                    <Button variant="outline" size="sm" iconName="Play">
                      Preview
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="bg-card rounded-genetic-lg p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-text-primary mb-4">
              Get Certified
            </h3>
            <p className="text-text-secondary">
              Validate your expertise with industry-recognized certifications
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {certifications?.map((cert) => (
              <div key={cert?.id} className="flex items-start space-x-4 p-6 bg-surface rounded-genetic-md">
                <div className="flex-shrink-0">
                  <Image
                    src={cert?.badge}
                    alt={cert?.name}
                    className="w-16 h-16 rounded-genetic-md object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-text-primary mb-2">
                    {cert?.name}
                  </h4>
                  <p className="text-text-secondary mb-3">
                    {cert?.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-text-secondary">
                      <span>{cert?.duration}</span>
                      <span className="font-semibold text-success">{cert?.price}</span>
                    </div>
                    <Button variant="outline" size="sm">
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AutomationAcademy;