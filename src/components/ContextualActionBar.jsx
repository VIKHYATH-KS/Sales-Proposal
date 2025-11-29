import React from 'react';
import Button from './ui/Button';

const ContextualActionBar = ({ 
  onEdit, 
  onExport, 
  onShare, 
  onDownload,
  showEdit = true,
  showExport = true,
  showShare = true,
  showDownload = false,
  isProcessing = false
}) => {
  return (
    <div className="action-bar">
      <div className="action-bar-container">
        <div className="action-bar-group">
          {showEdit && (
            <Button
              variant="outline"
              iconName="Edit"
              iconPosition="left"
              onClick={onEdit}
              disabled={isProcessing}
            >
              Edit
            </Button>
          )}
          {showDownload && (
            <Button
              variant="outline"
              iconName="Download"
              iconPosition="left"
              onClick={onDownload}
              disabled={isProcessing}
            >
              Download
            </Button>
          )}
        </div>
        
        <div className="action-bar-group">
          {showExport && (
            <Button
              variant="secondary"
              iconName="FileDown"
              iconPosition="left"
              onClick={onExport}
              disabled={isProcessing}
            >
              Export PDF
            </Button>
          )}
          {showShare && (
            <Button
              variant="default"
              iconName="Share2"
              iconPosition="left"
              onClick={onShare}
              disabled={isProcessing}
            >
              Share
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContextualActionBar;