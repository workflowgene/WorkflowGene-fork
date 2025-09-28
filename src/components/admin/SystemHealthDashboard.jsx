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
      <div className="space-y-6">
        <div className="bg-card rounded-genetic-lg p-8 text-center shadow-organic-sm">
          <Icon name="Shield" size={64} className="text-primary mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-text-primary mb-4">System Health Dashboard</h2>
          <p className="text-text-secondary mb-6">
            Monitor platform performance, system metrics, and health status.
          </p>
          
          <div className="bg-error/10 border border-error/20 rounded-genetic-md p-4 mb-6">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Lock" size={16} className="text-error" />
              <span className="font-semibold text-error">Access Restricted</span>
            </div>
            <p className="text-sm text-text-secondary">
              This dashboard is only available to super administrators.
            </p>
            <div className="mt-2 text-xs text-text-secondary">
              <p>Current role: {profile?.role || 'Not set'}</p>
              <p>Required role: super_admin</p>
            </div>
          </div>
          
          <Button 
            variant="default"
            onClick={() => window.location.href = '/dashboard'}
            iconName="ArrowLeft"
            iconPosition="left"
          >
            Back to Dashboard
          </Button>
        </div>
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
      {/* ... rest of your code unchanged ... */}
    </div>
  );
};

export default SystemHealthDashboard;
