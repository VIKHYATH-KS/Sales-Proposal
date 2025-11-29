import React, { useCallback, useState } from 'react';
import Icon from '../../../components/AppIcon';

const UploadZone = ({ onFilesSelected, acceptedFiles, maxSize, maxFiles }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = useCallback((e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e) => {
    e?.preventDefault();
    e?.stopPropagation();
  }, []);

  const handleDrop = useCallback((e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e?.dataTransfer?.files);
    onFilesSelected(files);
  }, [onFilesSelected]);

  const handleFileInput = useCallback((e) => {
    const files = Array.from(e?.target?.files);
    onFilesSelected(files);
  }, [onFilesSelected]);

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes?.[i];
  };

  return (
    <div
      className={`relative border-2 border-dashed rounded-lg transition-all duration-200 ${
        isDragging
          ? 'border-primary bg-primary/5 scale-[1.02]'
          : 'border-border bg-card hover:border-primary/50 hover:bg-muted/30'
      }`}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        id="file-upload"
        className="hidden"
        accept={acceptedFiles}
        multiple={maxFiles > 1}
        onChange={handleFileInput}
      />

      <label
        htmlFor="file-upload"
        className="flex flex-col items-center justify-center px-6 py-12 lg:py-16 cursor-pointer"
      >
        <div className={`w-16 h-16 lg:w-20 lg:h-20 rounded-full flex items-center justify-center mb-4 transition-all duration-200 ${
          isDragging ? 'bg-primary/20 scale-110' : 'bg-primary/10'
        }`}>
          <Icon
            name={isDragging ? 'Download' : 'Upload'}
            size={32}
            color="var(--color-primary)"
            className={isDragging ? 'animate-bounce' : ''}
          />
        </div>

        <h3 className="text-lg lg:text-xl font-semibold text-foreground mb-2">
          {isDragging ? 'Drop your files here' : 'Upload Client Requirements'}
        </h3>

        <p className="text-sm lg:text-base text-muted-foreground text-center mb-4 max-w-md">
          Drag and drop your PDF files here, or click to browse
        </p>

        <div className="flex flex-col items-center gap-2 text-xs lg:text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Icon name="FileText" size={16} />
            <span>Supported format: PDF only</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="HardDrive" size={16} />
            <span>Maximum file size: {formatFileSize(maxSize)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="Files" size={16} />
            <span>Upload up to {maxFiles} files at once</span>
          </div>
        </div>

        <div className="mt-6">
          <span className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors">
            <Icon name="FolderOpen" size={20} />
            Browse Files
          </span>
        </div>
      </label>
    </div>
  );
};

export default UploadZone;