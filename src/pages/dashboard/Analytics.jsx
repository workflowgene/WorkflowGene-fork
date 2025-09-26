import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import { useAuth } from '../../components/auth/AuthProvider';
import { supabase } from '../../lib/supabase';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [analytics, setAnalytics] = useState({
    totalExecutions: 0,
    successRate: 0,
    timeSaved: 0,
    costSavings: 0,
    topWorkflows: [],
    executionTrend: []
  });
  const [loading, setLoading] = useState(true);
  const { profile } = useAuth();

  const timeRangeOptions = [
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' }
  ];

  useEffect(() => {
    fetchAnalytics();
  }, [profile, timeRange]);

  const fetchAnalytics = async () => {
    if (!profile?.organization_id) return;
    
    setLoading(true);
    try {
      // Calculate date range
      const now = new Date();
      const daysBack = timeRange === '24h' ? 1 : 
                     timeRange === '7d' ? 7 : 
                     timeRange === '30d' ? 30 : 90;
      const startDate = new Date(now.getTime() - (daysBack * 24 * 60 * 60 * 1000));

      // Fetch analytics data
      const { data: analyticsData, error } = await supabase
        .from('analytics')
        .select('*')
        .eq('organization_id', profile.organization_id)
        .gte('recorded_at', startDate.toISOString());

      if (error) throw error;

      // Process analytics data
      const totalExecutions = analyticsData?.filter(a => a.metric_type === 'execution')?.length || 0;
      const successfulExecutions = analyticsData?.filter(a => 
        a.metric_type === 'execution' && a.metadata?.status === 'success'
      )?.length || 0;
      
      const successRate = totalExecutions > 0 ? (successfulExecutions / totalExecutions) * 100 : 0;
      const timeSaved = totalExecutions * 2.5; // Estimate 2.5 minutes per execution
      const costSavings = timeSaved * 0.5; // Estimate $0.50 per minute saved

      // Mock trend data for visualization
      const executionTrend = Array.from({ length: daysBack }, (_, i) => {
        const date = new Date(startDate.getTime() + (i * 24 * 60 * 60 * 1000));
        return {
          date: date.toISOString().split('T')[0],
          executions: Math.floor(Math.random() * 50) + 10
        };
      });

      setAnalytics({
        totalExecutions,
        successRate: Math.round(successRate),
        timeSaved: Math.round(timeSaved),
        costSavings: Math.round(costSavings),
        topWorkflows: [
          { name: 'Order Processing', executions: 245, efficiency: 95 },
          { name: 'Customer Onboarding', executions: 189, efficiency: 92 },
          { name: 'Invoice Generation', executions: 156, efficiency: 88 }
        ],
        executionTrend
      });

    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, subtitle, icon, color, trend }) => (
    <div className="bg-card rounded-genetic-lg p-6 shadow-organic-sm">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 ${color} rounded-genetic-md flex items-center justify-center`}>
          <Icon name={icon} size={24} className="text-white" />
        </div>
        {trend && (
          <div className={`flex items-center space-x-1 text-sm ${
            trend > 0 ? 'text-success' : trend < 0 ? 'text-error' : 'text-text-secondary'
          }`}>
            <Icon name={trend > 0 ? 'TrendingUp' : trend < 0 ? 'TrendingDown' : 'Minus'} size={16} />
            <span>{Math.abs(trend)}%</span>
          </div>
        )}
      </div>
      <div className="text-2xl font-bold text-text-primary mb-1">{value}</div>
      <div className="text-sm text-text-secondary">{subtitle}</div>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Analytics - WorkflowGene Cloud Dashboard</title>
        <meta name="description" content="View detailed analytics and performance metrics for your automation workflows." />
      </Helmet>
      
      <DashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-text-primary">Analytics</h1>
              <p className="text-text-secondary">
                Monitor your automation performance and ROI
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <Select
                options={timeRangeOptions}
                value={timeRange}
                onChange={setTimeRange}
                className="w-48"
              />
              <Button variant="outline" iconName="Download" iconPosition="left">
                Export Report
              </Button>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-card rounded-genetic-lg p-6 animate-pulse">
                  <div className="w-12 h-12 bg-muted rounded-genetic-md mb-4"></div>
                  <div className="h-6 bg-muted rounded mb-2"></div>
                  <div className="h-4 bg-muted rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                  title="Total Executions"
                  value={analytics.totalExecutions.toLocaleString()}
                  subtitle="Workflow runs"
                  icon="Play"
                  color="bg-primary"
                  trend={12}
                />
                
                <StatCard
                  title="Success Rate"
                  value={`${analytics.successRate}%`}
                  subtitle="Successful executions"
                  icon="CheckCircle"
                  color="bg-success"
                  trend={5}
                />
                
                <StatCard
                  title="Time Saved"
                  value={`${analytics.timeSaved}h`}
                  subtitle="Hours automated"
                  icon="Clock"
                  color="bg-warning"
                  trend={18}
                />
                
                <StatCard
                  title="Cost Savings"
                  value={`$${analytics.costSavings.toLocaleString()}`}
                  subtitle="Estimated savings"
                  icon="DollarSign"
                  color="bg-accent"
                  trend={25}
                />
              </div>

              {/* Charts Section */}
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Execution Trend Chart */}
                <div className="bg-card rounded-genetic-lg p-6 shadow-organic-sm">
                  <h2 className="text-xl font-semibold text-text-primary mb-6">
                    Execution Trend
                  </h2>
                  <div className="h-64 flex items-end justify-between space-x-2">
                    {analytics.executionTrend.map((day, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div 
                          className="w-full bg-primary rounded-t-sm transition-all duration-500"
                          style={{ 
                            height: `${(day.executions / Math.max(...analytics.executionTrend.map(d => d.executions))) * 200}px`,
                            minHeight: '4px'
                          }}
                        ></div>
                        <span className="text-xs text-text-secondary mt-2">
                          {new Date(day.date).getDate()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Workflows */}
                <div className="bg-card rounded-genetic-lg p-6 shadow-organic-sm">
                  <h2 className="text-xl font-semibold text-text-primary mb-6">
                    Top Performing Workflows
                  </h2>
                  <div className="space-y-4">
                    {analytics.topWorkflows.map((workflow, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-surface rounded-genetic-md">
                        <div>
                          <h4 className="font-medium text-text-primary">{workflow.name}</h4>
                          <p className="text-sm text-text-secondary">
                            {workflow.executions} executions
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-success">
                            {workflow.efficiency}% efficiency
                          </div>
                          <div className="w-16 bg-muted rounded-full h-2 mt-1">
                            <div 
                              className="bg-success h-2 rounded-full"
                              style={{ width: `${workflow.efficiency}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Detailed Reports */}
              <div className="bg-card rounded-genetic-lg p-6 shadow-organic-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-text-primary">
                    Detailed Reports
                  </h2>
                  <Button variant="outline" size="sm" iconName="Download">
                    Export All
                  </Button>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-surface rounded-genetic-md">
                    <Icon name="FileText" size={32} className="text-primary mx-auto mb-4" />
                    <h3 className="font-semibold text-text-primary mb-2">Performance Report</h3>
                    <p className="text-sm text-text-secondary mb-4">
                      Detailed workflow performance analysis
                    </p>
                    <Button variant="outline" size="sm" fullWidth>
                      Generate Report
                    </Button>
                  </div>
                  
                  <div className="text-center p-6 bg-surface rounded-genetic-md">
                    <Icon name="TrendingUp" size={32} className="text-success mx-auto mb-4" />
                    <h3 className="font-semibold text-text-primary mb-2">ROI Analysis</h3>
                    <p className="text-sm text-text-secondary mb-4">
                      Return on investment calculations
                    </p>
                    <Button variant="outline" size="sm" fullWidth>
                      View ROI
                    </Button>
                  </div>
                  
                  <div className="text-center p-6 bg-surface rounded-genetic-md">
                    <Icon name="Users" size={32} className="text-accent mx-auto mb-4" />
                    <h3 className="font-semibold text-text-primary mb-2">Usage Report</h3>
                    <p className="text-sm text-text-secondary mb-4">
                      Team usage and adoption metrics
                    </p>
                    <Button variant="outline" size="sm" fullWidth>
                      View Usage
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </DashboardLayout>
    </>
  );
};

export default Analytics;