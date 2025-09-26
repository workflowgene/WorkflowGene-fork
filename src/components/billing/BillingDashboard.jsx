import React, { useState, useEffect } from 'react';
import Button from '../ui/Button';
import Icon from '../AppIcon';
import { useAuth } from '../auth/AuthProvider';
import { supabase } from '../../lib/supabase';
import toast from 'react-hot-toast';

const BillingDashboard = () => {
  const [subscription, setSubscription] = useState(null);
  const [usage, setUsage] = useState({
    workflows: 0,
    executions: 0,
    storage: 0
  });
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const { profile } = useAuth();

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: 0,
      period: 'month',
      features: ['5 workflows', '1,000 executions', 'Basic support'],
      limits: { workflows: 5, executions: 1000, storage: 1 }
    },
    {
      id: 'professional',
      name: 'Professional',
      price: 200,
      period: 'month',
      features: ['50 workflows', '10,000 executions', 'Priority support'],
      limits: { workflows: 50, executions: 10000, storage: 10 }
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 'custom',
      period: 'month',
      features: ['Unlimited workflows', 'Unlimited executions', 'Dedicated support'],
      limits: { workflows: -1, executions: -1, storage: -1 }
    }
  ];

  useEffect(() => {
    fetchSubscription();
    fetchUsage();
    fetchInvoices();
  }, [profile]);

  const fetchSubscription = async () => {
    if (!profile?.organization_id) return;
    
    try {
      const { data, error } = await supabase
        .from('billing_subscriptions')
        .select('*')
        .eq('organization_id', profile.organization_id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      setSubscription(data);
    } catch (error) {
      console.error('Error fetching subscription:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsage = async () => {
    if (!profile?.organization_id) return;
    
    try {
      // Fetch current month usage
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);

      const { data: workflowCount } = await supabase
        .from('workflows')
        .select('id', { count: 'exact' })
        .eq('organization_id', profile.organization_id)
        .eq('status', 'active');

      const { data: executionCount } = await supabase
        .from('analytics')
        .select('id', { count: 'exact' })
        .eq('organization_id', profile.organization_id)
        .eq('metric_type', 'execution')
        .gte('recorded_at', startOfMonth.toISOString());

      setUsage({
        workflows: workflowCount?.length || 0,
        executions: executionCount?.length || 0,
        storage: 2.5 // Mock storage usage in GB
      });
    } catch (error) {
      console.error('Error fetching usage:', error);
    }
  };

  const fetchInvoices = async () => {
    // Mock invoice data for now
    setInvoices([
      {
        id: 'inv_001',
        date: '2024-01-01',
        amount: 200,
        status: 'paid',
        period: 'Dec 2023'
      },
      {
        id: 'inv_002',
        date: '2023-12-01',
        amount: 200,
        status: 'paid',
        period: 'Nov 2023'
      }
    ]);
  };

  const startTrial = async (planId) => {
    try {
      const plan = plans.find(p => p.id === planId);
      
      const { error } = await supabase
        .from('billing_subscriptions')
        .insert({
          organization_id: profile.organization_id,
          plan_name: plan.name,
          status: 'trialing',
          trial_end: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
          current_period_start: new Date().toISOString(),
          current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        });

      if (error) throw error;
      
      toast.success('Trial started successfully!');
      fetchSubscription();
    } catch (error) {
      console.error('Error starting trial:', error);
      toast.error('Failed to start trial');
    }
  };

  const upgradePlan = async (planId) => {
    try {
      const plan = plans.find(p => p.id === planId);
      
      if (subscription) {
        const { error } = await supabase
          .from('billing_subscriptions')
          .update({
            plan_name: plan.name,
            status: 'active',
            updated_at: new Date().toISOString()
          })
          .eq('id', subscription.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('billing_subscriptions')
          .insert({
            organization_id: profile.organization_id,
            plan_name: plan.name,
            status: 'active',
            current_period_start: new Date().toISOString(),
            current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
          });

        if (error) throw error;
      }
      
      toast.success('Plan upgraded successfully!');
      fetchSubscription();
    } catch (error) {
      console.error('Error upgrading plan:', error);
      toast.error('Failed to upgrade plan');
    }
  };

  const getUsagePercentage = (current, limit) => {
    if (limit === -1) return 0; // Unlimited
    return Math.min((current / limit) * 100, 100);
  };

  const currentPlan = plans.find(p => p.name === subscription?.plan_name) || plans[0];

  if (loading) {
    return (
      <div className="p-8 text-center">
        <Icon name="Loader2" size={32} className="animate-spin text-text-secondary mx-auto mb-4" />
        <p className="text-text-secondary">Loading billing information...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Current Plan */}
      <div className="bg-card rounded-genetic-lg p-6 shadow-organic-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-text-primary">Current Plan</h2>
            <p className="text-text-secondary">Manage your subscription and usage</p>
          </div>
          
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">
              {currentPlan.price === 'custom' ? 'Custom' : currentPlan.price === 0 ? 'Free' : `$${currentPlan.price}`}
            </div>
            {currentPlan.price !== 'custom' && currentPlan.price !== 0 && (
              <div className="text-sm text-text-secondary">per {currentPlan.period}</div>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="text-center p-4 bg-surface rounded-genetic-md">
            <div className="text-2xl font-bold text-text-primary mb-1">{currentPlan.name}</div>
            <div className="text-sm text-text-secondary">Current Plan</div>
            {subscription?.status === 'trialing' && (
              <div className="text-xs text-warning mt-1">
                Trial ends {new Date(subscription.trial_end).toLocaleDateString()}
              </div>
            )}
          </div>
          
          <div className="text-center p-4 bg-surface rounded-genetic-md">
            <div className="text-2xl font-bold text-text-primary mb-1">
              {subscription?.status === 'trialing' ? 'Trial' : 'Active'}
            </div>
            <div className="text-sm text-text-secondary">Status</div>
          </div>
          
          <div className="text-center p-4 bg-surface rounded-genetic-md">
            <div className="text-2xl font-bold text-text-primary mb-1">
              {subscription?.current_period_end ? 
                new Date(subscription.current_period_end).toLocaleDateString() : 
                'N/A'
              }
            </div>
            <div className="text-sm text-text-secondary">Next Billing</div>
          </div>
        </div>

        {/* Usage Meters */}
        <div className="space-y-4">
          <h3 className="font-semibold text-text-primary">Usage This Month</h3>
          
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-text-secondary">Active Workflows</span>
                <span className="text-text-primary">
                  {usage.workflows} / {currentPlan.limits.workflows === -1 ? '∞' : currentPlan.limits.workflows}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-500"
                  style={{ width: `${getUsagePercentage(usage.workflows, currentPlan.limits.workflows)}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-text-secondary">Workflow Executions</span>
                <span className="text-text-primary">
                  {usage.executions.toLocaleString()} / {currentPlan.limits.executions === -1 ? '∞' : currentPlan.limits.executions.toLocaleString()}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-success h-2 rounded-full transition-all duration-500"
                  style={{ width: `${getUsagePercentage(usage.executions, currentPlan.limits.executions)}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-text-secondary">Storage Used</span>
                <span className="text-text-primary">
                  {usage.storage} GB / {currentPlan.limits.storage === -1 ? '∞' : `${currentPlan.limits.storage} GB`}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-warning h-2 rounded-full transition-all duration-500"
                  style={{ width: `${getUsagePercentage(usage.storage, currentPlan.limits.storage)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Available Plans */}
      <div className="bg-card rounded-genetic-lg p-6 shadow-organic-sm">
        <h3 className="text-xl font-semibold text-text-primary mb-6">Available Plans</h3>
        
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div 
              key={plan.id}
              className={`border rounded-genetic-lg p-6 ${
                currentPlan.id === plan.id ? 'border-primary bg-primary/5' : 'border-border'
              }`}
            >
              <div className="text-center mb-4">
                <h4 className="text-lg font-semibold text-text-primary mb-2">{plan.name}</h4>
                <div className="text-2xl font-bold text-primary mb-1">
                  {plan.price === 'custom' ? 'Custom' : plan.price === 0 ? 'Free' : `$${plan.price}`}
                </div>
                {plan.price !== 'custom' && plan.price !== 0 && (
                  <div className="text-sm text-text-secondary">per {plan.period}</div>
                )}
              </div>

              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2 text-sm">
                    <Icon name="Check" size={14} className="text-success" />
                    <span className="text-text-secondary">{feature}</span>
                  </li>
                ))}
              </ul>

              {currentPlan.id === plan.id ? (
                <Button variant="outline" fullWidth disabled>
                  Current Plan
                </Button>
              ) : subscription?.status === 'trialing' && plan.price === 0 ? (
                <Button variant="outline" fullWidth disabled>
                  Available After Trial
                </Button>
              ) : plan.price === 'custom' ? (
                <Button variant="default" fullWidth iconName="MessageCircle" iconPosition="left">
                  Contact Sales
                </Button>
              ) : !subscription && plan.price > 0 ? (
                <Button 
                  variant="default" 
                  fullWidth 
                  onClick={() => startTrial(plan.id)}
                  iconName="Play"
                  iconPosition="left"
                >
                  Start 14-Day Trial
                </Button>
              ) : (
                <Button 
                  variant="default" 
                  fullWidth 
                  onClick={() => upgradePlan(plan.id)}
                  iconName="ArrowUp"
                  iconPosition="left"
                >
                  {plan.price > currentPlan.price ? 'Upgrade' : 'Downgrade'}
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Billing History */}
      <div className="bg-card rounded-genetic-lg p-6 shadow-organic-sm">
        <h3 className="text-xl font-semibold text-text-primary mb-6">Billing History</h3>
        
        {invoices.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Receipt" size={48} className="text-text-secondary mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-text-primary mb-2">No invoices yet</h4>
            <p className="text-text-secondary">
              Your billing history will appear here once you have a paid subscription
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {invoices.map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between p-4 border border-border rounded-genetic-md">
                <div>
                  <div className="font-medium text-text-primary">
                    ${invoice.amount.toFixed(2)}
                  </div>
                  <div className="text-sm text-text-secondary">
                    {invoice.period} • {invoice.date}
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    invoice.status === 'paid' ? 'bg-success/10 text-success' :
                    invoice.status === 'pending' ? 'bg-warning/10 text-warning' :
                    'bg-error/10 text-error'
                  }`}>
                    {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                  </span>
                  
                  <Button variant="ghost" size="sm" iconName="Download">
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Payment Method */}
      <div className="bg-card rounded-genetic-lg p-6 shadow-organic-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-text-primary">Payment Method</h3>
          <Button variant="outline" size="sm" iconName="Plus" iconPosition="left">
            Add Payment Method
          </Button>
        </div>
        
        <div className="flex items-center justify-between p-4 border border-border rounded-genetic-md">
          <div className="flex items-center space-x-3">
            <Icon name="CreditCard" size={20} className="text-text-secondary" />
            <div>
              <div className="font-medium text-text-primary">•••• •••• •••• 4242</div>
              <div className="text-sm text-text-secondary">Expires 12/25</div>
            </div>
          </div>
          <Button variant="outline" size="sm">
            Update
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BillingDashboard;