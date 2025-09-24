import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TeamSection = () => {
  const [selectedMember, setSelectedMember] = useState(null);

  const leadership = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "CEO & Co-Founder",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      bio: `Sarah brings over 15 years of experience in enterprise software and business automation. Previously VP of Product at Salesforce, she led the development of workflow automation tools used by millions of users worldwide.\n\nShe holds an MBA from Stanford and a BS in Computer Science from MIT. Sarah is passionate about empowering businesses through intelligent automation and has been featured in Forbes, TechCrunch, and Harvard Business Review.`,
      linkedin: "sarah-chen-workflowgene",
      twitter: "sarahc_wfg",
      expertise: ["Product Strategy", "Enterprise Sales", "Team Leadership", "Business Automation"]
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      role: "CTO & Co-Founder",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      bio: `Marcus is a seasoned technology leader with 18 years of experience building scalable cloud platforms. Former Principal Engineer at Google Cloud, he architected systems serving billions of requests daily.\n\nHe holds a PhD in Distributed Systems from Carnegie Mellon and has published 20+ papers on cloud computing and automation. Marcus is a frequent speaker at tech conferences and holds 12 patents in workflow automation technology.`,
      linkedin: "marcus-rodriguez-tech",
      twitter: "marcusr_dev",
      expertise: ["Cloud Architecture", "Distributed Systems", "AI/ML", "Platform Engineering"]
    },
    {
      id: 3,
      name: "Dr. Emily Watson",
      role: "VP of Product",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      bio: `Emily leads product strategy and user experience design at WorkflowGene Cloud. With a background in cognitive psychology and human-computer interaction, she ensures our platform is both powerful and intuitive.\n\nShe previously led UX teams at Microsoft and Adobe, focusing on enterprise productivity tools. Emily holds a PhD in Cognitive Psychology from UC Berkeley and is an advocate for accessible, user-centered design in enterprise software.`,
      linkedin: "emily-watson-product",
      twitter: "emilyw_ux",
      expertise: ["Product Management", "UX Design", "User Research", "Accessibility"]
    },
    {
      id: 4,
      name: "James Thompson",
      role: "VP of Engineering",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      bio: `James oversees our engineering teams and technical infrastructure. With 14 years of experience in high-scale systems, he ensures WorkflowGene Cloud maintains 99.9% uptime while continuously innovating.\n\nPreviously Senior Director of Engineering at Stripe, he built payment processing systems handling millions of transactions. James holds a MS in Computer Science from Stanford and is passionate about building reliable, scalable software.`,
      linkedin: "james-thompson-eng",
      twitter: "jamest_code",
      expertise: ["Software Engineering", "System Architecture", "DevOps", "Team Management"]
    }
  ];

  const advisors = [
    {
      name: "David Kim",
      role: "Strategic Advisor",
      company: "Former VP at Salesforce",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face"
    },
    {
      name: "Lisa Zhang",
      role: "Technical Advisor",
      company: "Former CTO at Dropbox",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face"
    },
    {
      name: "Robert Johnson",
      role: "Industry Advisor",
      company: "Former CEO at Workday",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=face"
    }
  ];

  const openModal = (member) => {
    setSelectedMember(member);
  };

  const closeModal = () => {
    setSelectedMember(null);
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Meet Our Leadership Team
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Our diverse team of experts brings together decades of experience in enterprise software, automation, and business strategy to drive innovation in workflow automation.
          </p>
        </div>

        {/* Leadership Team */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {leadership?.map((member) => (
            <div 
              key={member?.id}
              className="card-organic bg-card p-6 text-center cursor-pointer group"
              onClick={() => openModal(member)}
            >
              <div className="relative mb-4">
                <Image
                  src={member?.image}
                  alt={member?.name}
                  className="w-24 h-24 rounded-full mx-auto object-cover"
                />
                <div className="absolute inset-0 bg-primary/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-genetic-normal flex items-center justify-center">
                  <Icon name="Eye" size={20} className="text-primary" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-1">
                {member?.name}
              </h3>
              <p className="text-sm text-primary font-medium mb-3">
                {member?.role}
              </p>
              <div className="flex justify-center space-x-3">
                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors duration-genetic-normal">
                  <Icon name="Linkedin" size={16} />
                </div>
                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors duration-genetic-normal">
                  <Icon name="Twitter" size={16} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Advisory Board */}
        <div className="bg-surface rounded-genetic-lg p-8">
          <h3 className="text-2xl font-bold text-text-primary text-center mb-8">
            Advisory Board
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {advisors?.map((advisor, index) => (
              <div key={index} className="text-center">
                <Image
                  src={advisor?.image}
                  alt={advisor?.name}
                  className="w-16 h-16 rounded-full mx-auto mb-3 object-cover"
                />
                <h4 className="font-semibold text-text-primary mb-1">
                  {advisor?.name}
                </h4>
                <p className="text-sm text-primary font-medium mb-1">
                  {advisor?.role}
                </p>
                <p className="text-xs text-text-secondary">
                  {advisor?.company}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Team Member Modal */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-genetic-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center space-x-4">
                  <Image
                    src={selectedMember?.image}
                    alt={selectedMember?.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-text-primary">
                      {selectedMember?.name}
                    </h3>
                    <p className="text-primary font-medium">
                      {selectedMember?.role}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={closeModal}
                  iconName="X"
                />
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-text-primary mb-3">Biography</h4>
                  <div className="text-text-secondary leading-relaxed whitespace-pre-line">
                    {selectedMember?.bio}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-text-primary mb-3">Expertise</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedMember?.expertise?.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4 pt-4 border-t border-border">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Linkedin"
                    iconPosition="left"
                  >
                    LinkedIn
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Twitter"
                    iconPosition="left"
                  >
                    Twitter
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TeamSection;