import React from 'react';
import Icon from '../../../components/AppIcon';

const AgentCard = ({ agent, isActive, isCompleted }) => {
  const getStatusColor = () => {
    if (isCompleted) return 'text-success';
    if (isActive) return 'text-primary';
    return 'text-muted-foreground';
  };

  const getStatusIcon = () => {
    if (isCompleted) return 'CheckCircle2';
    if (isActive) return 'Loader2';
    return 'Circle';
  };

  const getBgColor = () => {
    if (isCompleted) return 'bg-success/10 border-success/20';
    if (isActive) return 'bg-primary/10 border-primary/20';
    return 'bg-muted/30 border-border';
  };

  return (
    <div className={`relative p-6 rounded-lg border-2 transition-all duration-300 ${getBgColor()}`}>
      <div className="flex items-start gap-4">
        <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${isActive ? 'bg-primary/20' : isCompleted ? 'bg-success/20' : 'bg-muted'}`}>
          <Icon 
            name={getStatusIcon()} 
            size={24} 
            className={`${getStatusColor()} ${isActive ? 'animate-spin' : ''}`}
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-foreground">{agent?.name}</h3>
            {agent?.progress !== undefined && (
              <span className={`text-sm font-medium ${getStatusColor()}`}>
                {agent?.progress}%
              </span>
            )}
          </div>
          
          <p className="text-sm text-muted-foreground mb-3">{agent?.description}</p>
          
          {isActive && agent?.currentActivity && (
            <div className="flex items-start gap-2 p-3 bg-background/50 rounded-md">
              <Icon name="Activity" size={16} className="text-primary mt-0.5 flex-shrink-0" />
              <p className="text-sm text-foreground">{agent?.currentActivity}</p>
            </div>
          )}
          
          {isActive && agent?.progress !== undefined && (
            <div className="mt-3">
              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-500 ease-out"
                  style={{ width: `${agent?.progress}%` }}
                />
              </div>
            </div>
          )}
          
          {isCompleted && agent?.completedAt && (
            <div className="flex items-center gap-2 mt-3 text-sm text-success">
              <Icon name="Clock" size={14} />
              <span>Completed at {agent?.completedAt}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgentCard;