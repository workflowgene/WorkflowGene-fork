import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { useAuth } from '../../../components/auth/AuthProvider';

const IndustryDashboard = ({ industry }) => {
  const [metrics, setMetrics] = useState({});
  const [workflows, setWorkflows] = useState([]);
  const { profile } = useAuth();

  useEffect(() => {
    loadIndustryData();
  }, [industry, profile]);

  const loadIndustryData = async () => {
    // Load industry-specific metrics and workflows
    const industryMetrics = getIndustryMetrics(industry);
    const industryWorkflows = getIndustryWorkflows(industry);
    
    setMetrics(industryMetrics);
    setWorkflows(industryWorkflows);
  };

  const getIndustryMetrics = (industry) => {
    switch (industry) {
      case 'education':
        return {
          studentsProcessed: 15000,
          enrollmentTime: '3 days',
          gradeAccuracy: '99.5%',
          parentSatisfaction: '95%',
          complianceScore: 'FERPA Compliant'
        };
      case 'healthcare':
        return {
          patientsScheduled: 8500,
          waitTimeReduction: '80%',
          recordAccuracy: '99.8%',
          patientSatisfaction: '98%',
          complianceScore: 'HIPAA Compliant'
        };
      case 'ecommerce':
        return {
          ordersProcessed: 25000,
          fulfillmentTime: '24 hours',
          inventoryAccuracy: '99.2%',
          customerSatisfaction: '94%',
          conversionRate: '12.5%'
        };
      default:
        return {};
    }
  };

  const getIndustryWorkflows = (industry) => {
    switch (industry) {
      case 'education':
        return [
          { name: 'Student Enrollment', status: 'active', executions: 1250 },
          { name: 'Grade Processing', status: 'active', executions: 890 },
          { name: 'Parent Communication', status: 'active', executions: 650 },
          { name: 'Faculty Scheduling', status: 'paused', executions: 320 }
        ];
      case 'healthcare':
        return [
          { name: 'Patient Scheduling', status: 'active', executions: 2100 },
          { name: 'Insurance Verification', status: 'active', executions: 1800 },
          { name: 'Lab Results Processing', status: 'active', executions: 950 },
          { name: 'Appointment Reminders', status: 'active', executions: 3200 }
        ];
      case 'ecommerce':
        return [
          { name: 'Order Processing', status: 'active', executions: 5600 },
          { name: 'Inventory Management', status: 'active', executions: 3400 },
          { name: 'Customer Support', status: 'active', executions: 2100 },
          { name: 'Marketing Automation', status: 'active', executions: 1800 }
        ];
      default:
        return [];
    }
  };

  const renderEducationDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-card rounded-genetic-lg p-6 shadow-organic-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-500/10 rounded-genetic-md flex items-center justify-center">
              <Icon name="Users" size={24} className="text-blue-500" />
            </div>
            <Icon name="TrendingUp" size={16} className="text-success" />
          </div>
          <div className="text-2xl font-bold text-text-primary mb-1">{metrics.studentsProcessed?.toLocaleString()}</div>
          <div className="text-sm text-text-secondary">Students Processed</div>
        </div>

        <div className="bg-card rounded-genetic-lg p-6 shadow-organic-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-500/10 rounded-genetic-md flex items-center justify-center">
              <Icon name="Clock" size={24} className="text-green-500" />
            </div>
            <Icon name="TrendingDown" size={16} className="text-success" />
          </div>
          <div className="text-2xl font-bold text-text-primary mb-1">{metrics.enrollmentTime}</div>
          <div className="text-sm text-text-secondary">Avg Enrollment Time</div>
        </div>

        <div className="bg-card rounded-genetic-lg p-6 shadow-organic-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-500/10 rounded-genetic-md flex items-center justify-center">
              <Icon name="CheckCircle" size={24} className="text-purple-500" />
            </div>
            <Icon name="TrendingUp" size={16} className="text-success" />
          </div>
          <div className="text-2xl font-bold text-text-primary mb-1">{metrics.gradeAccuracy}</div>
          <div className="text-sm text-text-secondary">Grade Accuracy</div>
        </div>

        <div className="bg-card rounded-genetic-lg p-6 shadow-organic-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-500/10 rounded-genetic-md flex items-center justify-center">
              <Icon name="Heart" size={24} className="text-orange-500" />
            </div>
            <Icon name="TrendingUp" size={16} className="text-success" />
          </div>
          <div className="text-2xl font-bold text-text-primary mb-1">{metrics.parentSatisfaction}</div>
          <div className="text-sm text-text-secondary">Parent Satisfaction</div>
        </div>
      </div>

      {/* Education-specific widgets */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-genetic-lg p-6 shadow-organic-sm">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Academic Calendar Integration</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-surface rounded-genetic-md">
              <span className="text-text-primary">Fall Semester Enrollment</span>
              <span className="text-success font-medium">Active</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-surface rounded-genetic-md">
              <span className="text-text-primary">Grade Submission Deadline</span>
              <span className="text-warning font-medium">Upcoming</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-surface rounded-genetic-md">
              <span className="text-text-primary">Spring Registration Opens</span>
              <span className="text-primary font-medium">Scheduled</span>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-genetic-lg p-6 shadow-organic-sm">
          <h3 className="text-lg font-semibold text-text-primary mb-4">FERPA Compliance Status</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Icon name="Shield" size={20} className="text-success" />
              <span className="text-text-primary">Data Encryption: Active</span>
            </div>
            <div className="flex items-center space-x-3">
              <Icon name="Lock" size={20} className="text-success" />
              <span className="text-text-primary">Access Controls: Configured</span>
            </div>
            <div className="flex items-center space-x-3">
              <Icon name="FileText" size={20} className="text-success" />
              <span className="text-text-primary">Audit Logs: Enabled</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderHealthcareDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-card rounded-genetic-lg p-6 shadow-organic-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-red-500/10 rounded-genetic-md flex items-center justify-center">
              <Icon name="Calendar" size={24} className="text-red-500" />
            </div>
            <Icon name="TrendingUp" size={16} className="text-success" />
          </div>
          <div className="text-2xl font-bold text-text-primary mb-1">{metrics.patientsScheduled?.toLocaleString()}</div>
          <div className="text-sm text-text-secondary">Patients Scheduled</div>
        </div>

        <div className="bg-card rounded-genetic-lg p-6 shadow-organic-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-500/10 rounded-genetic-md flex items-center justify-center">
              <Icon name="Clock" size={24} className="text-green-500" />
            </div>
            <Icon name="TrendingDown" size={16} className="text-success" />
          </div>
          <div className="text-2xl font-bold text-text-primary mb-1">{metrics.waitTimeReduction}</div>
          <div className="text-sm text-text-secondary">Wait Time Reduction</div>
        </div>

        <div className="bg-card rounded-genetic-lg p-6 shadow-organic-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-500/10 rounded-genetic-md flex items-center justify-center">
              <Icon name="FileText" size={24} className="text-blue-500" />
            </div>
            <Icon name="TrendingUp" size={16} className="text-success" />
          </div>
          <div className="text-2xl font-bold text-text-primary mb-1">{metrics.recordAccuracy}</div>
          <div className="text-sm text-text-secondary">Record Accuracy</div>
        </div>

        <div className="bg-card rounded-genetic-lg p-6 shadow-organic-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-500/10 rounded-genetic-md flex items-center justify-center">
              <Icon name="Heart" size={24} className="text-purple-500" />
            </div>
            <Icon name="TrendingUp" size={16} className="text-success" />
          </div>
          <div className="text-2xl font-bold text-text-primary mb-1">{metrics.patientSatisfaction}</div>
          <div className="text-sm text-text-secondary">Patient Satisfaction</div>
        </div>
      </div>

      {/* Healthcare-specific widgets */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-genetic-lg p-6 shadow-organic-sm">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Patient Flow Management</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-surface rounded-genetic-md">
              <span className="text-text-primary">Emergency Department</span>
              <span className="text-warning font-medium">High Volume</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-surface rounded-genetic-md">
              <span className="text-text-primary">Outpatient Clinics</span>
              <span className="text-success font-medium">Normal</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-surface rounded-genetic-md">
              <span className="text-text-primary">Surgery Schedule</span>
              <span className="text-success font-medium">On Track</span>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-genetic-lg p-6 shadow-organic-sm">
          <h3 className="text-lg font-semibold text-text-primary mb-4">HIPAA Compliance Status</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Icon name="Shield" size={20} className="text-success" />
              <span className="text-text-primary">PHI Encryption: Active</span>
            </div>
            <div className="flex items-center space-x-3">
              <Icon name="Lock" size={20} className="text-success" />
              <span className="text-text-primary">Access Controls: Configured</span>
            </div>
            <div className="flex items-center space-x-3">
              <Icon name="FileCheck" size={20} className="text-success" />
              <span className="text-text-primary">Audit Trail: Complete</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderEcommerceDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-card rounded-genetic-lg p-6 shadow-organic-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-500/10 rounded-genetic-md flex items-center justify-center">
              <Icon name="ShoppingCart" size={24} className="text-green-500" />
            </div>
            <Icon name="TrendingUp" size={16} className="text-success" />
          </div>
          <div className="text-2xl font-bold text-text-primary mb-1">{metrics.ordersProcessed?.toLocaleString()}</div>
          <div className="text-sm text-text-secondary">Orders Processed</div>
        </div>

        <div className="bg-card rounded-genetic-lg p-6 shadow-organic-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-500/10 rounded-genetic-md flex items-center justify-center">
              <Icon name="Truck" size={24} className="text-blue-500" />
            </div>
            <Icon name="TrendingDown" size={16} className="text-success" />
          </div>
          <div className="text-2xl font-bold text-text-primary mb-1">{metrics.fulfillmentTime}</div>
          <div className="text-sm text-text-secondary">Avg Fulfillment Time</div>
        </div>

        <div className="bg-card rounded-genetic-lg p-6 shadow-organic-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-500/10 rounded-genetic-md flex items-center justify-center">
              <Icon name="Package" size={24} className="text-purple-500" />
            </div>
            <Icon name="TrendingUp" size={16} className="text-success" />
          </div>
          <div className="text-2xl font-bold text-text-primary mb-1">{metrics.inventoryAccuracy}</div>
          <div className="text-sm text-text-secondary">Inventory Accuracy</div>
        </div>

        <div className="bg-card rounded-genetic-lg p-6 shadow-organic-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-500/10 rounded-genetic-md flex items-center justify-center">
              <Icon name="TrendingUp" size={24} className="text-orange-500" />
            </div>
            <Icon name="TrendingUp" size={16} className="text-success" />
          </div>
          <div className="text-2xl font-bold text-text-primary mb-1">{metrics.conversionRate}</div>
          <div className="text-sm text-text-secondary">Conversion Rate</div>
        </div>
      </div>

      {/* E-commerce specific widgets */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-genetic-lg p-6 shadow-organic-sm">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Sales Performance</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-surface rounded-genetic-md">
              <span className="text-text-primary">Today's Revenue</span>
              <span className="text-success font-medium">$45,230</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-surface rounded-genetic-md">
              <span className="text-text-primary">Conversion Rate</span>
              <span className="text-primary font-medium">12.5%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-surface rounded-genetic-md">
              <span className="text-text-primary">Cart Abandonment</span>
              <span className="text-warning font-medium">23.4%</span>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-genetic-lg p-6 shadow-organic-sm">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Inventory Alerts</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-error/5 rounded-genetic-md">
              <Icon name="AlertTriangle" size={16} className="text-error" />
              <span className="text-text-primary">5 items low stock</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-warning/5 rounded-genetic-md">
              <Icon name="Package" size={16} className="text-warning" />
              <span className="text-text-primary">12 items need reorder</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-success/5 rounded-genetic-md">
              <Icon name="CheckCircle" size={16} className="text-success" />
              <span className="text-text-primary">Inventory sync: Up to date</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDashboard = () => {
    switch (industry) {
      case 'education':
        return renderEducationDashboard();
      case 'healthcare':
        return renderHealthcareDashboard();
      case 'ecommerce':
        return renderEcommerceDashboard();
      default:
        return (
          <div className="text-center py-12">
            <Icon name="Building2" size={48} className="text-text-secondary mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-text-primary mb-2">Industry Dashboard</h3>
            <p className="text-text-secondary">
              Select an industry to view specialized metrics and workflows
            </p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Industry Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-text-primary capitalize">
            {industry} Dashboard
          </h2>
          <p className="text-text-secondary">
            Industry-specific metrics and workflows
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            metrics.complianceScore?.includes('Compliant') ? 'bg-success/10 text-success' : 'bg-muted text-text-secondary'
          }`}>
            {metrics.complianceScore || 'Standard Compliance'}
          </div>
          <Button variant="outline" size="sm" iconName="Settings">
            Configure
          </Button>
        </div>
      </div>

      {renderDashboard()}

      {/* Industry Workflows */}
      <div className="bg-card rounded-genetic-lg p-6 shadow-organic-sm">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          {industry.charAt(0).toUpperCase() + industry.slice(1)} Workflows
        </h3>
        
        <div className="space-y-3">
          {workflows.map((workflow, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-border rounded-genetic-md">
              <div>
                <h4 className="font-medium text-text-primary">{workflow.name}</h4>
                <p className="text-sm text-text-secondary">
                  {workflow.executions.toLocaleString()} executions this month
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  workflow.status === 'active' ? 'bg-success/10 text-success' :
                  workflow.status === 'paused' ? 'bg-warning/10 text-warning' :
                  'bg-muted text-text-secondary'
                }`}>
                  {workflow.status}
                </span>
                <Button variant="ghost" size="sm" iconName="MoreVertical" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IndustryDashboard;