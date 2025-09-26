import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from '../ui/Button';
import Select from '../ui/Select';
import { useAuth } from '../auth/AuthProvider';
import { supabase } from '../../lib/supabase';

const SystemHealthDashboard = () => {
  const [systemMetrics, setSystemMetrics] = useState({
    uptime: 99.99,
    responseTime: 120,
    errorRate: 0.01,
    activeUsers: 12500,
    totalWorkflows: 45000,
    executionsToday: 125000
  });
  
  const [errorLogs, setErrorLogs] = useState([]);
  const [timeRange, setTimeRange] = useState('24h');
  const [loading, setLoading] = useState(true);
  const { profile } = useAuth();

  const timeRangeOptions = [
    { value: '1h', label: 'Last Hour' },
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' }
  ];

  const services = [
    {
      name: 'Workflow Engine',
      status: 'healthy',
      uptime: 99.99,
      responseTime: 120,
      lastCheck: new Date()
    },
    {
      name: 'API Gateway',
      status: 'healthy',
      uptime: 99.98,
      responseTime: 85,
      lastCheck: new Date()
    },
    {
      name: 'Database Cluster',
      status: 'healthy',
      uptime: 99.99,
      responseTime: 45,
      lastCheck: new Date()
    },
    {
      name: 'Integration Hub',
      status: 'degraded',
      uptime: 99.85,
      responseTime: 250,
      lastCheck: new Date()
    },
    {
      name: 'Authentication Service',
      status: 'healthy',
      uptime: 99.99,
      responseTime: 35,
      lastCheck: new Date()
    },
    {
      name: 'File Storage',
      status: 'healthy',
      uptime: 99.97,
      responseTime: 180,
      lastCheck: new Date()
    }
  ];

  useEffect(() => {
    if (profile?.role !== 'super_admin') return;
    
    fetchSystemMetrics();
    fetchErrorLogs();
    
    // Set up real-time updates
    const interval = setInterval(() => {
      fetchSystemMetrics();
      fetchErrorLogs();
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [profile, timeRange]);

  const fetchSystemMetrics = async () => {
    try {
      // In a real implementation, this would fetch from monitoring APIs
      // For now, we'll simulate with some realistic data
      setSystemMetrics({
        uptime: 99.99,
        responseTime: Math.floor(Math.random() * 50) + 100,
        errorRate: Math.random() * 0.1,
        activeUsers: Math.floor(Math.random() * 1000) + 12000,
        totalWorkflows: 45000 + Math.floor(Math.random() * 100),
        executionsToday: Math.floor(Math.random() * 10000) + 120000
      });
    } catch (error) {
      console.error('Error fetching system metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchErrorLogs = async () => {
    try {
      // Mock error logs
      const mockErrors = [
        {
          id: 1,
          timestamp: new Date(Date.now() - 1000 * 60 * 15),
          level: 'error',
          service: 'Integration Hub',
          message: 'Salesforce API rate limit exceeded',
          details: 'Rate limit: 1000 requests/hour exceeded',
          resolved: false
        },
        {
          id: 2,
          timestamp: new Date(Date.now() - 1000 * 60 * 45),
          level: 'warning',
          service: 'Workflow Engine',
          message: 'High memory usage detected',
          details: 'Memory usage: 85% of allocated resources',
          resolved: true
        },
        {
          id: 3,
          timestamp: new Date(Date.now() - 1000 * 60 * 120),
          level: 'error',
          service: 'Database Cluster',
          message: 'Connection timeout',
          details: 'Database connection timeout after 30 seconds',
          resolved: true
        }
      ];
      
      setErrorLogs(mockErrors);
    } catch (error) {
      console.error('Error fetching error logs:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy': return 'text-success bg-success/10';
      case 'degraded': return 'text-warning bg-warning/10';
      case 'down': return 'text-error bg-error/10';
      default: return 'text-text-secondary bg-muted';
    }
  };

  const getLogLevelColor = (level) => {
    switch (level) {
      case 'error': return 'text-error bg-error/10';
      case 'warning': return 'text-warning bg-warning/10';
      case 'info': return 'text-primary bg-primary/10';
      default: return 'text-text-secondary bg-muted';
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  if (profile?.role !== 'super_admin') {
    return (
      <div className="text-center py-12">
        <Icon name="Lock" size={48} className="text-text-secondary mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-text-primary mb-2">Access Denied</h3>
        <p className="text-text-secondary">
          This dashboard is only available to super administrators
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-8 text-center">
        <Icon name="Loader2" size={32} className="animate-spin text-text-secondary mx-auto mb-4" />
        <p className="text-text-secondary">Loading system health data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">System Health</h1>
          <p className="text-text-secondary">Monitor platform performance and errors</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <Select
            options={timeRangeOptions}
            value={timeRange}
            onChange={setTimeRange}
            className="w-40"
          />
          <Button variant="outline" iconName="RefreshCw" onClick={fetchSystemMetrics}>
            Refresh
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-card rounded-genetic-lg p-6 shadow-organic-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-success/10 rounded-genetic-md flex items-center justify-center">
              <Icon name="Activity" size={24} className="text-success" />
            </div>
            <Icon name="TrendingUp" size={16} className="text-success" />
          </div>
          <div className="text-2xl font-bold text-text-primary mb-1">{systemMetrics.uptime}%</div>
          <div className="text-sm text-text-secondary">System Uptime</div>
        </div>

        <div className="bg-card rounded-genetic-lg p-6 shadow-organic-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-genetic-md flex items-center justify-center">
              <Icon name="Zap" size={24} className="text-primary" />
            </div>
            <Icon name="TrendingDown" size={16} className="text-success" />
          </div>
          <div className="text-2xl font-bold text-text-primary mb-1">{systemMetrics.responseTime}ms</div>
          <div className="text-sm text-text-secondary">Avg Response Time</div>
        </div>

        <div className="bg-card rounded-genetic-lg p-6 shadow-organic-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-error/10 rounded-genetic-md flex items-center justify-center">
              <Icon name="AlertTriangle" size={24} className="text-error" />
            </div>
            <Icon name="TrendingDown" size={16} className="text-success" />
          </div>
          <div className="text-2xl font-bold text-text-primary mb-1">{systemMetrics.errorRate.toFixed(2)}%</div>
          <div className="text-sm text-text-secondary">Error Rate</div>
        </div>

        <div className="bg-card rounded-genetic-lg p-6 shadow-organic-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-accent/10 rounded-genetic-md flex items-center justify-center">
              <Icon name="Users" size={24} className="text-accent" />
            </div>
            <Icon name="TrendingUp" size={16} className="text-success" />
          </div>
          <div className="text-2xl font-bold text-text-primary mb-1">{systemMetrics.activeUsers.toLocaleString()}</div>
          <div className="text-sm text-text-secondary">Active Users</div>
        </div>

        <div className="bg-card rounded-genetic-lg p-6 shadow-organic-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-secondary/10 rounded-genetic-md flex items-center justify-center">
              <Icon name="Workflow" size={24} className="text-secondary" />
            </div>
            <Icon name="TrendingUp" size={16} className="text-success" />
          </div>
          <div className="text-2xl font-bold text-text-primary mb-1">{systemMetrics.totalWorkflows.toLocaleString()}</div>
          <div className="text-sm text-text-secondary">Total Workflows</div>
        </div>

        <div className="bg-card rounded-genetic-lg p-6 shadow-organic-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-warning/10 rounded-genetic-md flex items-center justify-center">
              <Icon name="Play" size={24} className="text-warning" />
            </div>
            <Icon name="TrendingUp" size={16} className="text-success" />
          </div>
          <div className="text-2xl font-bold text-text-primary mb-1">{systemMetrics.executionsToday.toLocaleString()}</div>
          <div className="text-sm text-text-secondary">Executions Today</div>
        </div>
      </div>

      {/* Service Status */}
      <div className="bg-card rounded-genetic-lg p-6 shadow-organic-sm">
        <h2 className="text-xl font-semibold text-text-primary mb-6">Service Status</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, index) => (
            <div key={index} className="p-4 border border-border rounded-genetic-md">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-text-primary">{service.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(service.status)}`}>
                  {service.status}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-text-secondary">Uptime</div>
                  <div className="font-medium text-text-primary">{service.uptime}%</div>
                </div>
                <div>
                  <div className="text-text-secondary">Response</div>
                  <div className="font-medium text-text-primary">{service.responseTime}ms</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Error Logs */}
      <div className="bg-card rounded-genetic-lg p-6 shadow-organic-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-text-primary">Error Logs</h2>
          <Button variant="outline" size="sm" iconName="Download" iconPosition="left">
            Export Logs
          </Button>
        </div>
        
        <div className="space-y-3">
          {errorLogs.length === 0 ? (
            <div className="text-center py-8">
              <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-text-primary mb-2">No errors found</h3>
              <p className="text-text-secondary">
                All systems are running smoothly for the selected time period
              </p>
            </div>
          ) : (
            errorLogs.map((log) => (
              <div key={log.id} className="p-4 border border-border rounded-genetic-md">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLogLevelColor(log.level)}`}>
                        {log.level.toUpperCase()}
                      </span>
                      <span className="font-medium text-text-primary">{log.service}</span>
                      <span className="text-sm text-text-secondary">
                        {formatTimestamp(log.timestamp)}
                      </span>
                    </div>
                    
                    <h4 className="font-medium text-text-primary mb-1">{log.message}</h4>
                    <p className="text-sm text-text-secondary">{log.details}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {log.resolved ? (
                      <Icon name="CheckCircle" size={20} className="text-success" />
                    ) : (
                      <Button variant="outline" size="sm" iconName="AlertTriangle">
                        Investigate
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Performance Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-genetic-lg p-6 shadow-organic-sm">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Response Time Trend</h3>
          <div className="h-64 flex items-end justify-between space-x-2">
            {Array.from({ length: 24 }, (_, i) => {
              const height = Math.random() * 200 + 50;
              return (
                <div key={i} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-primary rounded-t-sm transition-all duration-500"
                    style={{ height: `${height}px` }}
                  ></div>
                  <span className="text-xs text-text-secondary mt-2">
                    {i}h
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-card rounded-genetic-lg p-6 shadow-organic-sm">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Error Rate Trend</h3>
          <div className="h-64 flex items-end justify-between space-x-2">
            {Array.from({ length: 24 }, (_, i) => {
              const height = Math.random() * 100 + 10;
              return (
                <div key={i} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-error rounded-t-sm transition-all duration-500"
                    style={{ height: `${height}px` }}
                  ></div>
                  <span className="text-xs text-text-secondary mt-2">
                    {i}h
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  function formatTimestamp(timestamp) {
    return new Date(timestamp).toLocaleString();
  }
};

export default SystemHealthDashboard;