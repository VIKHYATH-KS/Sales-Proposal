import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const trustFeatures = [
    {
      icon: 'Shield',
      title: 'Enterprise Security',
      description: 'Bank-level encryption for your data'
    },
    {
      icon: 'Lock',
      title: 'SSL Protected',
      description: '256-bit SSL certificate encryption'
    },
    {
      icon: 'CheckCircle2',
      title: 'GDPR Compliant',
      description: 'Full compliance with data protection'
    }
  ];

  return (
    <div className="mt-8 pt-8 border-t border-border">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {trustFeatures?.map((feature, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
              <Icon name={feature?.icon} size={24} color="var(--color-primary)" />
            </div>
            <h4 className="text-sm font-semibold text-foreground mb-1">
              {feature?.title}
            </h4>
            <p className="text-xs text-muted-foreground">
              {feature?.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustSignals;