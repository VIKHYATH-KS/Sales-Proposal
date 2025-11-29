import React, { useState } from 'react';
import Icon from './AppIcon';

const ProgressStatusIndicator = ({ 
  progress = 0, 
  currentStep = '',
  steps = [],
  estimatedTime = '',
  isComplete = false,
  onCancel
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStepStatus = (stepIndex, currentStepName) => {
    const currentIndex = steps?.findIndex(s => s?.name === currentStepName);
    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'active';
    return 'pending';
  };

  return (
    <div className="progress-status">
      <div className="progress-header">
        <div>
          <h3 className="progress-title">
            {isComplete ? 'Proposal Generated Successfully' : 'Generating Proposal'}
          </h3>
          {!isComplete && estimatedTime && (
            <p className="text-sm text-muted-foreground mt-1">
              Estimated time remaining: {estimatedTime}
            </p>
          )}
        </div>
        {!isComplete && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 rounded-md hover:bg-muted/50 transition-colors"
            aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
          >
            <Icon name={isExpanded ? 'ChevronUp' : 'ChevronDown'} size={20} />
          </button>
        )}
      </div>
      <div className="progress-bar-container">
        <div 
          className="progress-bar" 
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin="0"
          aria-valuemax="100"
        />
      </div>
      <div className="flex items-center justify-between mt-3">
        <span className="text-sm font-medium text-foreground">
          {isComplete ? '100%' : `${progress}%`} Complete
        </span>
        {!isComplete && currentStep && (
          <span className="text-sm text-muted-foreground">
            {currentStep}
          </span>
        )}
      </div>
      {isExpanded && !isComplete && steps?.length > 0 && (
        <div className="progress-details">
          {steps?.map((step, index) => {
            const status = getStepStatus(index, currentStep);
            return (
              <div key={step?.name} className="progress-step">
                <div className={`progress-step-icon ${status}`}>
                  {status === 'completed' && <Icon name="Check" size={12} />}
                  {status === 'active' && <Icon name="Loader2" size={12} className="animate-spin" />}
                  {status === 'pending' && <Icon name="Circle" size={12} />}
                </div>
                <span className={status === 'active' ? 'font-medium' : ''}>
                  {step?.label}
                </span>
              </div>
            );
          })}
        </div>
      )}
      {!isComplete && onCancel && (
        <div className="mt-4 pt-4 border-t border-border">
          <button
            onClick={onCancel}
            className="text-sm text-destructive hover:text-destructive/80 transition-colors"
          >
            Cancel Generation
          </button>
        </div>
      )}
    </div>
  );
};

export default ProgressStatusIndicator;