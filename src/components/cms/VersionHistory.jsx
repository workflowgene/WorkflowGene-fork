import React, { useState, useEffect } from 'react';
import Button from '../ui/Button';
import Icon from '../AppIcon';
import { useAuth } from '../auth/AuthProvider';
import { supabase } from '../../lib/supabase';
import toast from 'react-hot-toast';

const VersionHistory = ({ pageId, onRestore, onClose }) => {
  const [versions, setVersions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const { profile } = useAuth();

  useEffect(() => {
    fetchVersions();
  }, [pageId]);

  const fetchVersions = async () => {
    try {
      const { data, error } = await supabase
        .from('cms_versions')
        .select(`
          *,
          created_by:profiles!cms_versions_created_by_fkey(first_name, last_name, avatar_url)
        `)
        .eq('page_id', pageId)
        .eq('organization_id', profile?.organization_id)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      setVersions(data || []);
    } catch (error) {
      console.error('Error fetching versions:', error);
      toast.error('Failed to load version history');
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async (version) => {
    try {
      // Create a new version entry for the restore action
      await supabase
        .from('cms_versions')
        .insert({
          page_id: pageId,
          organization_id: profile?.organization_id,
          content: version.content,
          version_type: 'restored',
          created_by: profile?.id
        });

      onRestore(version);
      toast.success('Version restored successfully');
    } catch (error) {
      console.error('Error restoring version:', error);
      toast.error('Failed to restore version');
    }
  };

  const deleteVersion = async (versionId) => {
    try {
      const { error } = await supabase
        .from('cms_versions')
        .delete()
        .eq('id', versionId);

      if (error) throw error;
      
      setVersions(prev => prev.filter(v => v.id !== versionId));
      toast.success('Version deleted');
    } catch (error) {
      console.error('Error deleting version:', error);
      toast.error('Failed to delete version');
    }
  };

  const getVersionIcon = (versionType) => {
    switch (versionType) {
      case 'published': return 'CheckCircle';
      case 'draft': return 'Edit';
      case 'restored': return 'RotateCcw';
      case 'auto-save': return 'Save';
      default: return 'FileText';
    }
  };

  const getVersionColor = (versionType) => {
    switch (versionType) {
      case 'published': return 'text-success bg-success/10';
      case 'draft': return 'text-warning bg-warning/10';
      case 'restored': return 'text-primary bg-primary/10';
      case 'auto-save': return 'text-text-secondary bg-muted';
      default: return 'text-text-secondary bg-muted';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    if (diffInMinutes < 10080) return `${Math.floor(diffInMinutes / 1440)}d ago`;
    return time.toLocaleDateString();
  };

  const compareVersions = (version1, version2) => {
    const components1 = version1.content?.components || [];
    const components2 = version2.content?.components || [];
    
    return {
      added: components2.length - components1.length,
      modified: Math.abs(JSON.stringify(components1).length - JSON.stringify(components2).length) > 100 ? 1 : 0,
      removed: Math.max(0, components1.length - components2.length)
    };
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card rounded-lg shadow-lg w-full max-w-6xl h-[90vh] flex">
        {/* Left Panel - Version List */}
        <div className="w-1/2 flex flex-col border-r border-border">
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div>
              <h3 className="text-xl font-semibold text-text-primary">Version History</h3>
              <p className="text-sm text-text-secondary">
                {versions.length} versions saved
              </p>
            </div>
            <Button variant="ghost" onClick={onClose} iconName="X" />
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="text-center py-12">
                <Icon name="Loader2" size={32} className="animate-spin text-text-secondary mx-auto mb-4" />
                <p className="text-text-secondary">Loading version history...</p>
              </div>
            ) : versions.length === 0 ? (
              <div className="text-center py-12">
                <Icon name="History" size={48} className="text-text-secondary mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-text-primary mb-2">No Version History</h4>
                <p className="text-text-secondary">
                  Version history will appear here after you save changes
                </p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {versions.map((version, index) => {
                  const isSelected = selectedVersion?.id === version.id;
                  const previousVersion = versions[index + 1];
                  const changes = previousVersion ? compareVersions(previousVersion, version) : null;
                  
                  return (
                    <div
                      key={version.id}
                      onClick={() => setSelectedVersion(version)}
                      className={`p-6 cursor-pointer transition-colors ${
                        isSelected ? 'bg-primary/5 border-r-2 border-primary' : 'hover:bg-surface'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getVersionColor(version.version_type)}`}>
                            <Icon name={getVersionIcon(version.version_type)} size={16} />
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-text-primary">
                                {version.version_type.charAt(0).toUpperCase() + version.version_type.slice(1)}
                              </span>
                              {index === 0 && (
                                <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                                  Current
                                </span>
                              )}
                            </div>
                            <div className="text-sm text-text-secondary">
                              {formatTimeAgo(version.created_at)}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedVersion(version);
                              setShowPreview(true);
                            }}
                            iconName="Eye"
                          />
                          {index !== 0 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRestore(version);
                              }}
                              iconName="RotateCcw"
                            />
                          )}
                          {version.version_type !== 'published' && index !== 0 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteVersion(version.id);
                              }}
                              iconName="Trash2"
                              className="text-error hover:text-error"
                            />
                          )}
                        </div>
                      </div>
                      
                      <div className="text-sm text-text-secondary mb-2">
                        by {version.created_by?.first_name} {version.created_by?.last_name}
                      </div>
                      
                      {changes && (
                        <div className="flex items-center space-x-4 text-xs text-text-secondary">
                          {changes.added > 0 && (
                            <span className="text-success">+{changes.added} added</span>
                          )}
                          {changes.modified > 0 && (
                            <span className="text-warning">~{changes.modified} modified</span>
                          )}
                          {changes.removed > 0 && (
                            <span className="text-error">-{changes.removed} removed</span>
                          )}
                        </div>
                      )}
                      
                      <div className="text-xs text-text-secondary mt-2">
                        {(version.content?.components || []).length} components
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Version Details */}
        <div className="w-1/2 flex flex-col">
          {selectedVersion ? (
            <>
              <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-semibold text-text-primary">
                      Version Details
                    </h4>
                    <p className="text-sm text-text-secondary">
                      {new Date(selectedVersion.created_at).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowPreview(true)}
                      iconName="Eye"
                    >
                      Preview
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleRestore(selectedVersion)}
                      iconName="RotateCcw"
                    >
                      Restore
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-6">
                  {/* Version Info */}
                  <div className="bg-surface rounded-lg p-4">
                    <h5 className="font-medium text-text-primary mb-3">Version Information</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Type:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getVersionColor(selectedVersion.version_type)}`}>
                          {selectedVersion.version_type}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Created by:</span>
                        <span className="text-text-primary">
                          {selectedVersion.created_by?.first_name} {selectedVersion.created_by?.last_name}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Components:</span>
                        <span className="text-text-primary">
                          {(selectedVersion.content?.components || []).length}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Size:</span>
                        <span className="text-text-primary">
                          {(JSON.stringify(selectedVersion.content).length / 1024).toFixed(1)} KB
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* SEO Data */}
                  {selectedVersion.content?.seo && (
                    <div className="bg-surface rounded-lg p-4">
                      <h5 className="font-medium text-text-primary mb-3">SEO Settings</h5>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-text-secondary">Title:</span>
                          <div className="text-text-primary mt-1">
                            {selectedVersion.content.seo.title || 'Not set'}
                          </div>
                        </div>
                        <div>
                          <span className="text-text-secondary">Description:</span>
                          <div className="text-text-primary mt-1">
                            {selectedVersion.content.seo.description || 'Not set'}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Component List */}
                  <div className="bg-surface rounded-lg p-4">
                    <h5 className="font-medium text-text-primary mb-3">Components</h5>
                    <div className="space-y-2">
                      {(selectedVersion.content?.components || []).map((comp, index) => (
                        <div key={comp.id || index} className="flex items-center space-x-3 p-2 rounded border border-border">
                          <div className="w-6 h-6 bg-primary/10 rounded flex items-center justify-center">
                            <Icon name={getComponentIcon(comp.type)} size={14} className="text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium text-text-primary">{comp.name}</div>
                            <div className="text-xs text-text-secondary">{comp.type}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <Icon name="MousePointer" size={48} className="text-text-secondary mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-text-primary mb-2">
                  Select a Version
                </h4>
                <p className="text-text-secondary">
                  Click on any version from the list to view details
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Preview Modal */}
        {showPreview && selectedVersion && (
          <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-10">
            <div className="bg-card rounded-lg shadow-lg w-full max-w-5xl h-[80vh] flex flex-col">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h4 className="text-lg font-semibold text-text-primary">
                  Version Preview - {new Date(selectedVersion.created_at).toLocaleString()}
                </h4>
                <div className="flex space-x-2">
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => {
                      handleRestore(selectedVersion);
                      setShowPreview(false);
                    }}
                    iconName="RotateCcw"
                  >
                    Restore This Version
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPreview(false)}
                    iconName="X"
                  />
                </div>
              </div>
              
              <div className="flex-1 overflow-auto p-6 bg-muted">
                <div className="bg-white rounded-lg shadow-sm min-h-full p-8">
                  {/* Render version preview here */}
                  <div className="space-y-8">
                    {(selectedVersion.content?.components || []).map((comp, index) => (
                      <div key={comp.id || index} className="border border-dashed border-gray-300 p-4 rounded">
                        <div className="flex items-center space-x-2 mb-2">
                          <Icon name={getComponentIcon(comp.type)} size={16} className="text-primary" />
                          <span className="text-sm font-medium text-text-primary">{comp.name}</span>
                        </div>
                        <div className="text-xs text-text-secondary">
                          {JSON.stringify(comp.props, null, 2).substring(0, 100)}...
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  function getComponentIcon(type) {
    switch (type) {
      case 'hero': return 'Layout';
      case 'heading': return 'Type';
      case 'paragraph': return 'AlignLeft';
      case 'button': return 'MousePointer';
      case 'image': return 'Image';
      case 'form': return 'FileText';
      case 'grid': return 'Grid3X3';
      case 'testimonial': return 'Quote';
      case 'pricing-table': return 'CreditCard';
      default: return 'Square';
    }
  }
};

export default VersionHistory;