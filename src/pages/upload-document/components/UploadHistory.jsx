import React from 'react';
import Icon from '../../../components/AppIcon';

const UploadHistory = ({ history, onReselect }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes?.[i];
  };

  if (history?.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base lg:text-lg font-semibold text-foreground">
          Recent Uploads
        </h3>
        <span className="text-xs text-muted-foreground">
          Last 10 documents
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {history?.map((item) => (
          <div
            key={item?.id}
            className="bg-card border border-border rounded-lg p-4 hover:shadow-soft transition-all duration-200 cursor-pointer group"
            onClick={() => onReselect(item)}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon name="FileText" size={20} color="var(--color-primary)" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                  {item?.fileName}
                </p>
                <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                  <span>{formatFileSize(item?.fileSize)}</span>
                  <span>•</span>
                  <span>{formatDate(item?.uploadedAt)}</span>
                </div>
                {item?.proposalGenerated && (
                  <div className="flex items-center gap-1 mt-2">
                    <Icon name="CheckCircle2" size={14} className="text-success" />
                    <span className="text-xs text-success">Proposal generated</span>
                  </div>
                )}
              </div>

              <button
                className="flex-shrink-0 p-2 rounded-md opacity-0 group-hover:opacity-100 hover:bg-muted/50 transition-all"
                onClick={(e) => {
                  e?.stopPropagation();
                  onReselect(item);
                }}
                aria-label={`Reselect ${item?.fileName}`}
              >
                <Icon name="RotateCw" size={16} className="text-muted-foreground" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadHistory;