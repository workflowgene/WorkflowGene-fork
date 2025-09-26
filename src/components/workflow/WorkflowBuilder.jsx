import React, { useState, useCallback, useRef, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Icon from '../AppIcon';
import { useAuth } from '../auth/AuthProvider';
import { supabase } from '../../lib/supabase';
import toast from 'react-hot-toast';

const WorkflowBuilder = ({ workflowId, onSave, onClose }) => {
  const [workflow, setWorkflow] = useState({
    name: '',
    description: '',
    steps: [],
    version: 1,
    status: 'draft'
  });
  const [selectedStep, setSelectedStep] = useState(null);
  const [showTemplates, setShowTemplates] = useState(false);
  const [versions, setVersions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { profile } = useAuth();
  const canvasRef = useRef(null);

  const stepTypes = [
    { id: 'trigger', name: 'Trigger', icon: 'Zap', color: 'bg-blue-500' },
    { id: 'action', name: 'Action', icon: 'Play', color: 'bg-green-500' },
    { id: 'condition', name: 'Condition', icon: 'GitBranch', color: 'bg-yellow-500' },
    { id: 'delay', name: 'Delay', icon: 'Clock', color: 'bg-purple-500' },
    { id: 'integration', name: 'Integration', icon: 'Link', color: 'bg-indigo-500' }
  ];

  const templates = [
    {
      id: 'student-enrollment',
      name: 'Student Enrollment',
      description: 'Automate student registration process',
      industry: 'education',
      steps: [
        { id: '1', type: 'trigger', name: 'Form Submission', config: {} },
        { id: '2', type: 'action', name: 'Validate Data', config: {} },
        { id: '3', type: 'integration', name: 'Update SIS', config: {} },
        { id: '4', type: 'action', name: 'Send Welcome Email', config: {} }
      ]
    },
    {
      id: 'order-processing',
      name: 'Order Processing',
      description: 'E-commerce order fulfillment workflow',
      industry: 'ecommerce',
      steps: [
        { id: '1', type: 'trigger', name: 'New Order', config: {} },
        { id: '2', type: 'condition', name: 'Check Inventory', config: {} },
        { id: '3', type: 'integration', name: 'Process Payment', config: {} },
        { id: '4', type: 'action', name: 'Ship Order', config: {} }
      ]
    }
  ];

  useEffect(() => {
    if (workflowId) {
      loadWorkflow(workflowId);
      loadVersions(workflowId);
    }
  }, [workflowId]);

  const loadWorkflow = async (id) => {
    try {
      const { data, error } = await supabase
        .from('workflows')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setWorkflow(data);
    } catch (error) {
      console.error('Error loading workflow:', error);
      toast.error('Failed to load workflow');
    }
  };

  const loadVersions = async (id) => {
    try {
      const { data, error } = await supabase
        .from('workflow_versions')
        .select('*')
        .eq('workflow_id', id)
        .order('version', { ascending: false });

      if (error) throw error;
      setVersions(data || []);
    } catch (error) {
      console.error('Error loading versions:', error);
    }
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(workflow.steps);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setWorkflow(prev => ({ ...prev, steps: items }));
  };

  const addStep = (stepType) => {
    const newStep = {
      id: Date.now().toString(),
      type: stepType.id,
      name: `New ${stepType.name}`,
      config: {},
      position: { x: 100, y: 100 + (workflow.steps.length * 120) }
    };

    setWorkflow(prev => ({
      ...prev,
      steps: [...prev.steps, newStep]
    }));
  };

  const updateStep = (stepId, updates) => {
    setWorkflow(prev => ({
      ...prev,
      steps: prev.steps.map(step =>
        step.id === stepId ? { ...step, ...updates } : step
      )
    }));
  };

  const deleteStep = (stepId) => {
    setWorkflow(prev => ({
      ...prev,
      steps: prev.steps.filter(step => step.id !== stepId)
    }));
    setSelectedStep(null);
  };

  const saveWorkflow = async () => {
    setIsLoading(true);
    try {
      const workflowData = {
        name: workflow.name,
        description: workflow.description,
        organization_id: profile.organization_id,
        created_by: profile.id,
        config: {
          steps: workflow.steps,
          version: workflow.version
        },
        status: workflow.status,
        updated_at: new Date().toISOString()
      };

      if (workflowId) {
        // Update existing workflow
        const { error } = await supabase
          .from('workflows')
          .update(workflowData)
          .eq('id', workflowId);

        if (error) throw error;

        // Create new version
        await supabase
          .from('workflow_versions')
          .insert({
            workflow_id: workflowId,
            version: workflow.version + 1,
            config: workflowData.config,
            created_by: profile.id
          });
      } else {
        // Create new workflow
        const { data, error } = await supabase
          .from('workflows')
          .insert(workflowData)
          .select()
          .single();

        if (error) throw error;
        
        // Create initial version
        await supabase
          .from('workflow_versions')
          .insert({
            workflow_id: data.id,
            version: 1,
            config: workflowData.config,
            created_by: profile.id
          });
      }

      toast.success('Workflow saved successfully');
      onSave?.();
    } catch (error) {
      console.error('Error saving workflow:', error);
      toast.error('Failed to save workflow');
    } finally {
      setIsLoading(false);
    }
  };

  const loadTemplate = (template) => {
    setWorkflow(prev => ({
      ...prev,
      name: template.name,
      description: template.description,
      steps: template.steps.map(step => ({
        ...step,
        position: { x: 100, y: 100 + (parseInt(step.id) - 1) * 120 }
      }))
    }));
    setShowTemplates(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-genetic-xl shadow-organic-lg w-full max-w-7xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-bold text-text-primary">
              {workflowId ? 'Edit Workflow' : 'Create Workflow'}
            </h2>
            {versions.length > 0 && (
              <Select
                options={versions.map(v => ({ value: v.version, label: `v${v.version}` }))}
                value={workflow.version}
                onChange={(version) => {
                  const selectedVersion = versions.find(v => v.version === version);
                  if (selectedVersion) {
                    setWorkflow(prev => ({
                      ...prev,
                      ...selectedVersion.config,
                      version: selectedVersion.version
                    }));
                  }
                }}
                className="w-32"
              />
            )}
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={() => setShowTemplates(true)}
              iconName="FileTemplate"
              iconPosition="left"
            >
              Templates
            </Button>
            <Button
              variant="default"
              onClick={saveWorkflow}
              loading={isLoading}
              iconName="Save"
              iconPosition="left"
            >
              Save
            </Button>
            <Button
              variant="ghost"
              onClick={onClose}
              iconName="X"
            />
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-80 bg-surface border-r border-border p-6 overflow-y-auto">
            <div className="space-y-6">
              {/* Workflow Info */}
              <div>
                <h3 className="font-semibold text-text-primary mb-4">Workflow Details</h3>
                <div className="space-y-4">
                  <Input
                    label="Name"
                    value={workflow.name}
                    onChange={(e) => setWorkflow(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter workflow name"
                  />
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Description
                    </label>
                    <textarea
                      value={workflow.description}
                      onChange={(e) => setWorkflow(prev => ({ ...prev, description: e.target.value }))}
                      rows={3}
                      className="w-full px-3 py-2 border border-border rounded-genetic-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Describe what this workflow does"
                    />
                  </div>
                </div>
              </div>

              {/* Step Types */}
              <div>
                <h3 className="font-semibold text-text-primary mb-4">Add Steps</h3>
                <div className="space-y-2">
                  {stepTypes.map((stepType) => (
                    <button
                      key={stepType.id}
                      onClick={() => addStep(stepType)}
                      className="w-full flex items-center space-x-3 p-3 rounded-genetic-md hover:bg-muted transition-colors"
                    >
                      <div className={`w-8 h-8 ${stepType.color} rounded-genetic-sm flex items-center justify-center`}>
                        <Icon name={stepType.icon} size={16} className="text-white" />
                      </div>
                      <span className="font-medium text-text-primary">{stepType.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected Step Config */}
              {selectedStep && (
                <div>
                  <h3 className="font-semibold text-text-primary mb-4">Step Configuration</h3>
                  <div className="space-y-4">
                    <Input
                      label="Step Name"
                      value={selectedStep.name}
                      onChange={(e) => updateStep(selectedStep.id, { name: e.target.value })}
                    />
                    
                    {selectedStep.type === 'condition' && (
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          Condition
                        </label>
                        <textarea
                          value={selectedStep.config.condition || ''}
                          onChange={(e) => updateStep(selectedStep.id, {
                            config: { ...selectedStep.config, condition: e.target.value }
                          })}
                          rows={3}
                          className="w-full px-3 py-2 border border-border rounded-genetic-md focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="if (data.amount > 1000) { ... }"
                        />
                      </div>
                    )}

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteStep(selectedStep.id)}
                      iconName="Trash2"
                      iconPosition="left"
                    >
                      Delete Step
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Canvas */}
          <div className="flex-1 relative overflow-hidden">
            <div
              ref={canvasRef}
              className="w-full h-full bg-background relative overflow-auto"
              style={{ backgroundImage: 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)', backgroundSize: '20px 20px' }}
            >
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="workflow-canvas">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="min-h-full p-8"
                    >
                      {workflow.steps.map((step, index) => (
                        <Draggable key={step.id} draggableId={step.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`absolute bg-card border-2 rounded-genetic-lg p-4 shadow-organic-md cursor-pointer transition-all duration-genetic-normal ${
                                selectedStep?.id === step.id ? 'border-primary' : 'border-border'
                              } ${snapshot.isDragging ? 'shadow-organic-lg scale-105' : ''}`}
                              style={{
                                left: step.position?.x || 100,
                                top: step.position?.y || 100 + (index * 120),
                                ...provided.draggableProps.style
                              }}
                              onClick={() => setSelectedStep(step)}
                            >
                              <div className="flex items-center space-x-3">
                                <div className={`w-10 h-10 ${stepTypes.find(t => t.id === step.type)?.color} rounded-genetic-md flex items-center justify-center`}>
                                  <Icon name={stepTypes.find(t => t.id === step.type)?.icon} size={20} className="text-white" />
                                </div>
                                <div>
                                  <h4 className="font-medium text-text-primary">{step.name}</h4>
                                  <p className="text-sm text-text-secondary capitalize">{step.type}</p>
                                </div>
                              </div>
                              
                              {/* Connection Points */}
                              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-2 border-background"></div>
                              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-muted rounded-full border-2 border-background"></div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                      
                      {/* Empty State */}
                      {workflow.steps.length === 0 && (
                        <div className="flex items-center justify-center h-full">
                          <div className="text-center">
                            <Icon name="Workflow" size={64} className="text-text-secondary mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-text-primary mb-2">
                              Start Building Your Workflow
                            </h3>
                            <p className="text-text-secondary mb-6">
                              Add steps from the sidebar or choose a template to get started
                            </p>
                            <Button
                              variant="default"
                              onClick={() => setShowTemplates(true)}
                              iconName="FileTemplate"
                              iconPosition="left"
                            >
                              Browse Templates
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
          </div>
        </div>

        {/* Templates Modal */}
        {showTemplates && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
            <div className="bg-card rounded-genetic-xl p-8 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-text-primary">Choose Template</h3>
                <Button
                  variant="ghost"
                  onClick={() => setShowTemplates(false)}
                  iconName="X"
                />
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {templates.map((template) => (
                  <div key={template.id} className="border border-border rounded-genetic-lg p-6 hover:border-primary transition-colors cursor-pointer" onClick={() => loadTemplate(template)}>
                    <h4 className="font-semibold text-text-primary mb-2">{template.name}</h4>
                    <p className="text-text-secondary mb-4">{template.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-primary capitalize">{template.industry}</span>
                      <span className="text-sm text-text-secondary">{template.steps.length} steps</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkflowBuilder;