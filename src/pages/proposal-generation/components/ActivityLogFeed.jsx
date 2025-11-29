import React, { useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';

const ActivityLogFeed = ({ logs }) => {
  const logEndRef = useRef(null);

  useEffect(() => {
    logEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const getLogIcon = (type) => {
    switch (type) {
      case 'success':
        return { name: 'CheckCircle2', color: 'text-success' };
      case 'error':
        return { name: 'AlertCircle', color: 'text-destructive' };
      case 'warning':
        return { name: 'AlertTriangle', color: 'text-warning' };
      case 'info':
      default:
        return { name: 'Info', color: 'text-primary' };
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
            <Icon name="Activity" size={18} className="text-primary" />
          </div>
          <h3 className="text-base font-semibold text-foreground">Activity Log</h3>
        </div>
        <span className="text-sm text-muted-foreground">{logs?.length} entries</span>
      </div>
      <div className="max-h-96 overflow-y-auto p-4 space-y-3">
        {logs?.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Icon name="FileText" size={32} className="mx-auto mb-2 opacity-50" />
            <p className="text-sm">No activity logs yet</p>
          </div>
        ) : (
          logs?.map((log, index) => {
            const iconConfig = getLogIcon(log?.type);
            return (
              <div 
                key={index}
                className="flex items-start gap-3 p-3 bg-muted/20 rounded-md hover:bg-muted/40 transition-colors"
              >
                <Icon 
                  name={iconConfig?.name} 
                  size={16} 
                  className={`${iconConfig?.color} mt-0.5 flex-shrink-0`}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground break-words">{log?.message}</p>
                  <span className="text-xs text-muted-foreground mt-1 block">{log?.timestamp}</span>
                </div>
              </div>
            );
          })
        )}
        <div ref={logEndRef} />
      </div>
    </div>
  );
};

export default ActivityLogFeed;