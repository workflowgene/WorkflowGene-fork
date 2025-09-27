import React, { useState, useEffect, useRef } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Icon from '../AppIcon';
import Image from '../AppImage';
import { useAuth } from '../auth/AuthProvider';
import { supabase } from '../../lib/supabase';
import toast from 'react-hot-toast';

const MediaLibrary = ({ onClose, onSelect, allowMultiple = false }) => {
  const [mediaFiles, setMediaFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const fileInputRef = useRef(null);
  const { profile } = useAuth();

  const itemsPerPage = 20;

  useEffect(() => {
    fetchMediaFiles();
  }, [currentPage, searchTerm, filterType]);

  const fetchMediaFiles = async () => {
    try {
      let query = supabase
        .from('cms_media')
        .select('*', { count: 'exact' })
        .eq('organization_id', profile?.organization_id)
        .order('created_at', { ascending: false });

      if (searchTerm) {
        query = query.or(`filename.ilike.%${searchTerm}%,original_name.ilike.%${searchTerm}%,alt_text.ilike.%${searchTerm}%`);
      }

      if (filterType !== 'all') {
        query = query.like('file_type', `${filterType}%`);
      }

      const from = (currentPage - 1) * itemsPerPage;
      const to = from + itemsPerPage - 1;
      query = query.range(from, to);

      const { data, error, count } = await query;

      if (error) throw error;

      setMediaFiles(data || []);
      setTotalPages(Math.ceil((count || 0) / itemsPerPage));
    } catch (error) {
      console.error('Error fetching media files:', error);
      toast.error('Failed to load media files');
    }
  };

  const handleFileUpload = async (files) => {
    if (!files || files.length === 0) return;

    setUploading(true);
    const uploadPromises = Array.from(files).map(async (file) => {
      try {
        // Generate unique filename
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `media/${profile?.organization_id}/${fileName}`;

        // Upload to Supabase Storage
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('cms-media')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('cms-media')
          .getPublicUrl(filePath);

        // Save to database
        const { error: dbError } = await supabase
          .from('cms_media')
          .insert({
            organization_id: profile?.organization_id,
            filename: fileName,
            original_name: file.name,
            file_type: file.type,
            file_size: file.size,
            url: publicUrl,
            uploaded_by: profile?.id
          });

        if (dbError) throw dbError;

        return { success: true, fileName: file.name };
      } catch (error) {
        console.error('Error uploading file:', error);
        return { success: false, fileName: file.name, error: error.message };
      }
    });

    const results = await Promise.all(uploadPromises);
    const successful = results.filter(r => r.success);
    const failed = results.filter(r => !r.success);

    if (successful.length > 0) {
      toast.success(`${successful.length} file(s) uploaded successfully`);
      fetchMediaFiles();
    }

    if (failed.length > 0) {
      toast.error(`${failed.length} file(s) failed to upload`);
    }

    setUploading(false);
  };

  const handleFileSelect = (file) => {
    if (allowMultiple) {
      setSelectedFiles(prev => {
        const isSelected = prev.some(f => f.id === file.id);
        if (isSelected) {
          return prev.filter(f => f.id !== file.id);
        } else {
          return [...prev, file];
        }
      });
    } else {
      onSelect?.(file);
      onClose();
    }
  };

  const handleMultipleSelect = () => {
    onSelect?.(selectedFiles);
    onClose();
  };

  const deleteFile = async (fileId) => {
    try {
      const { error } = await supabase
        .from('cms_media')
        .delete()
        .eq('id', fileId);

      if (error) throw error;

      toast.success('File deleted successfully');
      fetchMediaFiles();
    } catch (error) {
      console.error('Error deleting file:', error);
      toast.error('Failed to delete file');
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileType) => {
    if (fileType.startsWith('image/')) return 'Image';
    if (fileType.startsWith('video/')) return 'Video';
    if (fileType.startsWith('audio/')) return 'Music';
    if (fileType.includes('pdf')) return 'FileText';
    return 'File';
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card rounded-lg shadow-lg w-full max-w-6xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h3 className="text-xl font-semibold text-text-primary">Media Library</h3>
            <p className="text-sm text-text-secondary">
              {mediaFiles.length} files • {selectedFiles.length} selected
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="default"
              iconName="Upload"
              iconPosition="left"
              loading={uploading}
              onClick={() => fileInputRef.current?.click()}
            >
              Upload Files
            </Button>
            <Button variant="ghost" onClick={onClose} iconName="X" />
          </div>
        </div>

        {/* Filters */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <Input
                type="search"
                placeholder="Search files..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex space-x-2">
              {['all', 'image', 'video', 'document'].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    filterType === type
                      ? 'bg-primary text-white' :'bg-surface text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Media Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          {mediaFiles.length === 0 ? (
            <div className="text-center py-12">
              <Icon name="Image" size={48} className="text-text-secondary mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-text-primary mb-2">No media files</h4>
              <p className="text-text-secondary mb-6">
                Upload your first file to get started
              </p>
              <Button
                variant="default"
                iconName="Upload"
                iconPosition="left"
                onClick={() => fileInputRef.current?.click()}
              >
                Upload Files
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {mediaFiles.map((file) => {
                const isSelected = selectedFiles.some(f => f.id === file.id);
                
                return (
                  <div
                    key={file.id}
                    onClick={() => handleFileSelect(file)}
                    className={`relative group cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      isSelected ? 'border-primary' : 'border-border hover:border-primary/50'
                    }`}
                  >
                    {file.file_type.startsWith('image/') ? (
                      <Image
                        src={file.url}
                        alt={file.alt_text || file.original_name}
                        className="w-full h-32 object-cover"
                      />
                    ) : (
                      <div className="w-full h-32 bg-muted flex items-center justify-center">
                        <Icon name={getFileIcon(file.file_type)} size={32} className="text-text-secondary" />
                      </div>
                    )}
                    
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors">
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteFile(file.id);
                          }}
                          className="w-8 h-8 bg-error text-white rounded-full flex items-center justify-center hover:bg-error/80"
                        >
                          <Icon name="Trash2" size={14} />
                        </button>
                      </div>
                    </div>
                    
                    {isSelected && (
                      <div className="absolute top-2 left-2">
                        <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center">
                          <Icon name="Check" size={14} />
                        </div>
                      </div>
                    )}
                    
                    <div className="p-3 bg-white">
                      <div className="text-sm font-medium text-text-primary truncate">
                        {file.original_name}
                      </div>
                      <div className="text-xs text-text-secondary">
                        {formatFileSize(file.file_size)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-6 border-t border-border">
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
                iconName="ChevronLeft"
              >
                Previous
              </Button>
              
              <span className="text-sm text-text-secondary">
                Page {currentPage} of {totalPages}
              </span>
              
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
                iconName="ChevronRight"
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {/* Footer */}
        {allowMultiple && selectedFiles.length > 0 && (
          <div className="p-6 border-t border-border">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">
                {selectedFiles.length} file(s) selected
              </span>
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setSelectedFiles([])}
                >
                  Clear Selection
                </Button>
                <Button
                  variant="default"
                  onClick={handleMultipleSelect}
                  iconName="Check"
                  iconPosition="left"
                >
                  Select Files
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*,video/*,.pdf,.doc,.docx"
        onChange={(e) => handleFileUpload(e.target.files)}
        className="hidden"
      />
    </div>
  );
};

export default MediaLibrary;