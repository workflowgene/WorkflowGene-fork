import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';

const Status = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const services = [
    {
      name: 'Workflow Engine',
      status: 'operational',
      uptime: '99.98%',
      responseTime: '120ms'
    },
    {
      name: 'API Gateway',
      status: 'operational',
      uptime: '99.99%',
      responseTime: '85ms'
    },
    {
      name: 'Integration Hub',
      status: 'operational',
      uptime: '99.95%',
      responseTime: '200ms'
    },
    {
      name: 'Authentication Service',
      status: 'operational',
      uptime: '99.99%',
      responseTime: '45ms'
    }
  ];

  const incidents = [
    {
      id: 1,
      title: 'Scheduled Maintenance - Database Optimization',
      status: 'completed',
      date: '2024-12-15',
      duration: '2 hours',
      impact: 'No service impact'
    },
    {
      id: 2,
      title: 'API Rate Limiting Adjustment',
      status: 'completed',
      date: '2024-12-10',
      duration: '30 minutes',
      impact: 'Minimal impact'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'operational': return 'text-success';
      case 'degraded': return 'text-warning';
      case 'outage': return 'text-error';
      default: return 'text-text-secondary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'operational': return 'CheckCircle';
      case 'degraded': return 'AlertTriangle';
      case 'outage': return 'XCircle';
      default: return 'Clock';
    }
  };

  return (
    <>
      <Helmet>
        <title>System Status - WorkflowGene Cloud</title>
        <meta name="description" content="Real-time status of WorkflowGene Cloud services and infrastructure." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          <section className="py-20">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-text-primary mb-4">System Status</h1>
                <div className="inline-flex items-center space-x-2 bg-success/10 text-success px-4 py-2 rounded-full">
                  <Icon name="CheckCircle" size={16} />
                  <span>All Systems Operational</span>
                </div>
              </div>

              {/* Current Status */}
              <div className="bg-card rounded-genetic-lg p-8 shadow-organic-sm mb-8">
                <h2 className="text-2xl font-semibold text-text-primary mb-6">Service Status</h2>
                <div className="space-y-4">
                  {services?.map((service, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-surface rounded-genetic-md">
                      <div className="flex items-center space-x-3">
                        <Icon name={getStatusIcon(service?.status)} size={20} className={getStatusColor(service?.status)} />
                        <div>
                          <h3 className="font-medium text-text-primary">{service?.name}</h3>
                          <p className="text-sm text-text-secondary capitalize">{service?.status}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-text-primary">{service?.uptime}</div>
                        <div className="text-xs text-text-secondary">{service?.responseTime} avg</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Incidents */}
              <div className="bg-card rounded-genetic-lg p-8 shadow-organic-sm">
                <h2 className="text-2xl font-semibold text-text-primary mb-6">Recent Incidents</h2>
                <div className="space-y-4">
                  {incidents?.map((incident) => (
                    <div key={incident?.id} className="p-4 bg-surface rounded-genetic-md">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium text-text-primary mb-1">{incident?.title}</h3>
                          <p className="text-sm text-text-secondary">{incident?.impact}</p>
                        </div>
                        <div className="text-right text-sm text-text-secondary">
                          <div>{incident?.date}</div>
                          <div>{incident?.duration}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Status;