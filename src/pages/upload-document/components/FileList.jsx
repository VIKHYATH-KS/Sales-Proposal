import React from 'react';
import Icon from '../../../components/AppIcon';

const FileList = ({ files, onRemove }) => {
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes?.[i];
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'uploading':
        return <Icon name="Loader2" size={20} className="animate-spin text-primary" />;
      case 'success':
        return <Icon name="CheckCircle2" size={20} className="text-success" />;
      case 'error':
        return <Icon name="XCircle" size={20} className="text-error" />;
      default:
        return <Icon name="File" size={20} className="text-muted-foreground" />;
    }
  };

  if (files?.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <h3 className="text-base lg:text-lg font-semibold text-foreground">
        Selected Files ({files?.length})
      </h3>
      <div className="space-y-2">
        {files?.map((file) => (
          <div
            key={file?.id}
            className="bg-card border border-border rounded-lg p-4 transition-all duration-200 hover:shadow-soft"
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">
                {getStatusIcon(file?.status)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {file?.name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatFileSize(file?.size)}
                    </p>
                  </div>

                  <button
                    onClick={() => onRemove(file?.id)}
                    className="flex-shrink-0 p-1 rounded-md hover:bg-muted/50 transition-colors"
                    aria-label={`Remove ${file?.name}`}
                    disabled={file?.status === 'uploading'}
                  >
                    <Icon name="X" size={16} className="text-muted-foreground" />
                  </button>
                </div>

                {file?.status === 'uploading' && (
                  <div className="space-y-1">
                    <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-300"
                        style={{ width: `${file?.progress || 0}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Uploading... {file?.progress || 0}%
                    </p>
                  </div>
                )}

                {file?.status === 'error' && (
                  <p className="text-xs text-error mt-1">{file?.error}</p>
                )}

                {file?.status === 'success' && (
                  <p className="text-xs text-success mt-1">Upload complete</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileList;