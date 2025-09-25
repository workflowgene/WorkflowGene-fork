import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const OfficeLocations = () => {
  const officeHours = [
    {
      region: "Americas",
      timezone: "PST/EST",
      hours: "Monday - Friday: 6:00 AM - 6:00 PM",
      support: "24/7 Emergency Support Available"
    },
    {
      region: "Europe",
      timezone: "CET/GMT",
      hours: "Monday - Friday: 9:00 AM - 6:00 PM",
      support: "Extended Hours for Enterprise Clients"
    },
    {
      region: "Asia Pacific",
      timezone: "JST/AEST",
      hours: "Monday - Friday: 9:00 AM - 6:00 PM",
      support: "Multilingual Support Available"
    }
  ];

  const officeLocations = [
    {
      city: "San Francisco",
      address: "123 Market Street, Suite 500\nSan Francisco, CA 94105",
      type: "Headquarters",
      employees: "45 employees",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop",
      amenities: ["Open workspace", "Game room", "Rooftop terrace", "Fully stocked kitchen"]
    },
    {
      city: "Austin",
      address: "456 Congress Avenue, Floor 12\nAustin, TX 78701",
      type: "Engineering Hub",
      employees: "32 employees",
      image: "https://images.unsplash.com/photo-1531218150217-54595bc2b934?w=400&h=250&fit=crop",
      amenities: ["Collaboration spaces", "Quiet zones", "Bike storage", "Coffee bar"]
    },
    {
      city: "Remote",
      address: "Distributed across 15 countries\nGlobal remote workforce",
      type: "Virtual Office",
      employees: "73 employees",
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=250&fit=crop",
      amenities: ["Home office stipend", "Co-working allowance", "Virtual events", "Digital collaboration tools"]
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Global Support Hours */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-text-primary text-center mb-8">
            Global Support Hours
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {officeHours?.map((office, index) => (
              <div key={index} className="bg-surface rounded-genetic-lg p-6 text-center">
                <h4 className="text-lg font-semibold text-text-primary mb-2">
                  {office?.region}
                </h4>
                <p className="text-sm text-primary font-medium mb-3">
                  {office?.timezone}
                </p>
                <p className="text-text-secondary mb-3">
                  {office?.hours}
                </p>
                <p className="text-xs text-success">
                  {office?.support}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Office Locations */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-text-primary text-center mb-8">
            Our Offices
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {officeLocations?.map((location, index) => (
              <div key={index} className="card-organic bg-card overflow-hidden">
                <Image
                  src={location?.image}
                  alt={location?.city}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-text-primary">
                      {location?.city}
                    </h3>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {location?.type}
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary mb-3 whitespace-pre-line">
                    {location?.address}
                  </p>
                  <p className="text-sm font-medium text-primary mb-4">
                    {location?.employees}
                  </p>
                  <div className="space-y-1">
                    {location?.amenities?.map((amenity, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <Icon name="Check" size={12} className="text-success" />
                        <span className="text-xs text-text-secondary">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Headquarters Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-card rounded-genetic-lg p-6 shadow-organic-md">
              <h4 className="text-lg font-semibold text-text-primary mb-4">
                San Francisco Headquarters
              </h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Icon name="MapPin" size={18} className="text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-text-primary font-medium">Address</p>
                    <p className="text-text-secondary text-sm">
                      123 Market Street, Suite 500<br />
                      San Francisco, CA 94105
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Phone" size={18} className="text-primary" />
                  <div>
                    <p className="text-text-primary font-medium">Phone</p>
                    <p className="text-text-secondary text-sm">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Clock" size={18} className="text-primary" />
                  <div>
                    <p className="text-text-primary font-medium">Office Hours</p>
                    <p className="text-text-secondary text-sm">Monday - Friday: 9:00 AM - 6:00 PM PST</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-genetic-lg p-6 shadow-organic-md">
              <h4 className="text-lg font-semibold text-text-primary mb-4">
                Getting Here
              </h4>
              <div className="space-y-2 text-sm text-text-secondary">
                <p>• 2 blocks from Montgomery BART station</p>
                <p>• Multiple bus lines nearby (1, 8, 12, 30, 45)</p>
                <p>• Visitor parking available in building garage</p>
                <p>• Bike parking and shower facilities on-site</p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-genetic-lg overflow-hidden shadow-organic-md">
            <iframe
              width="100%"
              height="400"
              loading="lazy"
              title="WorkflowGene Cloud Headquarters"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=37.7749,-122.4194&z=15&output=embed"
              className="border-0"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfficeLocations;