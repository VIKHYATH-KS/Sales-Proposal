import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ErrorRetryPanel = ({ error, onRetry, onCancel }) => {
  return (
    <div className="bg-destructive/10 border-2 border-destructive/20 rounded-lg p-6">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-destructive/20 flex items-center justify-center">
          <Icon name="AlertCircle" size={24} className="text-destructive" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-foreground mb-2">Processing Error</h3>
          <p className="text-sm text-muted-foreground mb-4">{error?.message}</p>
          
          {error?.details && (
            <div className="bg-background/50 rounded-md p-3 mb-4">
              <p className="text-xs font-mono text-muted-foreground">{error?.details}</p>
            </div>
          )}
          
          <div className="flex flex-wrap gap-3">
            <Button 
              variant="default" 
              iconName="RefreshCw" 
              iconPosition="left"
              onClick={onRetry}
            >
              Retry Processing
            </Button>
            <Button 
              variant="outline" 
              iconName="X" 
              iconPosition="left"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </div>
          
          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground">
              If the problem persists, please contact support or try uploading a different document.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorRetryPanel;