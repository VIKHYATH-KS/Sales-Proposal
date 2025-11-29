import React from 'react';
import Icon from '../../../components/AppIcon';

const ValidationMessage = ({ type, message, onDismiss }) => {
  const getConfig = () => {
    switch (type) {
      case 'success':
        return {
          icon: 'CheckCircle2',
          bgColor: 'bg-success/10',
          borderColor: 'border-success/20',
          textColor: 'text-success',
          iconColor: 'var(--color-success)'
        };
      case 'error':
        return {
          icon: 'XCircle',
          bgColor: 'bg-error/10',
          borderColor: 'border-error/20',
          textColor: 'text-error',
          iconColor: 'var(--color-error)'
        };
      case 'warning':
        return {
          icon: 'AlertTriangle',
          bgColor: 'bg-warning/10',
          borderColor: 'border-warning/20',
          textColor: 'text-warning',
          iconColor: 'var(--color-warning)'
        };
      default:
        return {
          icon: 'Info',
          bgColor: 'bg-primary/10',
          borderColor: 'border-primary/20',
          textColor: 'text-primary',
          iconColor: 'var(--color-primary)'
        };
    }
  };

  const config = getConfig();

  if (!message) return null;

  return (
    <div
      className={`flex items-start gap-3 p-4 rounded-lg border ${config?.bgColor} ${config?.borderColor}`}
      role="alert"
    >
      <Icon
        name={config?.icon}
        size={20}
        color={config?.iconColor}
        className="flex-shrink-0 mt-0.5"
      />
      <p className={`flex-1 text-sm ${config?.textColor}`}>{message}</p>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="flex-shrink-0 p-1 rounded-md hover:bg-black/5 transition-colors"
          aria-label="Dismiss message"
        >
          <Icon name="X" size={16} className={config?.textColor} />
        </button>
      )}
    </div>
  );
};

export default ValidationMessage;