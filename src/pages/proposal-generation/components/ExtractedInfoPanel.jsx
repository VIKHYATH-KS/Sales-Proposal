import React from 'react';
import Icon from '../../../components/AppIcon';

const ExtractedInfoPanel = ({ extractedData }) => {
  const infoSections = [
    {
      icon: 'DollarSign',
      label: 'Budget Range',
      value: extractedData?.budgetRange || 'Analyzing...',
      color: 'text-emerald-600'
    },
    {
      icon: 'Calendar',
      label: 'Timeline',
      value: extractedData?.timeline || 'Analyzing...',
      color: 'text-blue-600'
    },
    {
      icon: 'Building2',
      label: 'Industry',
      value: extractedData?.industry || 'Detecting...',
      color: 'text-purple-600'
    },
    {
      icon: 'Layers',
      label: 'Features Detected',
      value: extractedData?.featuresCount ? `${extractedData?.featuresCount} features` : 'Processing...',
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon name="FileSearch" size={20} className="text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Extracted Information</h3>
      </div>
      <div className="space-y-4">
        {infoSections?.map((section, index) => (
          <div key={index} className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
            <div className={`flex-shrink-0 w-8 h-8 rounded-md bg-background flex items-center justify-center ${section?.color}`}>
              <Icon name={section?.icon} size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-muted-foreground mb-1">{section?.label}</p>
              <p className="text-base font-semibold text-foreground break-words">{section?.value}</p>
            </div>
          </div>
        ))}
      </div>
      {extractedData?.keyFeatures && extractedData?.keyFeatures?.length > 0 && (
        <div className="mt-6 pt-6 border-t border-border">
          <h4 className="text-sm font-semibold text-foreground mb-3">Key Features Identified</h4>
          <div className="flex flex-wrap gap-2">
            {extractedData?.keyFeatures?.map((feature, index) => (
              <span 
                key={index}
                className="px-3 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExtractedInfoPanel;