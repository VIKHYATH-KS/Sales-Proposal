import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';

const FeatureRecommendations = ({ features, onUpdate }) => {
  const [selectedFeatures, setSelectedFeatures] = useState(
    features?.filter(f => f?.included)?.map(f => f?.id)
  );

  const handleFeatureToggle = (featureId) => {
    const updated = selectedFeatures?.includes(featureId)
      ? selectedFeatures?.filter(id => id !== featureId)
      : [...selectedFeatures, featureId];
    
    setSelectedFeatures(updated);
    
    const updatedFeatures = features?.map(f => ({
      ...f,
      included: updated?.includes(f?.id)
    }));
    onUpdate(updatedFeatures);
  };

  const getComplexityColor = (complexity) => {
    switch (complexity?.toLowerCase()) {
      case 'low':
        return 'text-success bg-success/10';
      case 'medium':
        return 'text-warning bg-warning/10';
      case 'high':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div id="feature-recommendations" className="bg-card border border-border rounded-lg p-8 scroll-mt-24">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-foreground flex items-center gap-3">
          <Icon name="Sparkles" size={24} className="text-primary" />
          Feature Recommendations
        </h2>
        <span className="text-sm text-muted-foreground">
          {selectedFeatures?.length} of {features?.length} selected
        </span>
      </div>
      <div className="space-y-4">
        {features?.map((feature) => (
          <div
            key={feature?.id}
            className={`border rounded-lg p-5 transition-all ${
              selectedFeatures?.includes(feature?.id)
                ? 'border-primary bg-primary/5' :'border-border bg-background'
            }`}
          >
            <div className="flex items-start gap-4">
              <Checkbox
                checked={selectedFeatures?.includes(feature?.id)}
                onChange={() => handleFeatureToggle(feature?.id)}
                className="mt-1"
              />
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="text-lg font-semibold text-foreground">
                    {feature?.name}
                  </h3>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${getComplexityColor(feature?.complexity)}`}>
                    {feature?.complexity} Complexity
                  </span>
                </div>
                <p className="text-muted-foreground mb-3">
                  {feature?.description}
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Icon name="Clock" size={16} />
                    <span>{feature?.estimatedTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Icon name="DollarSign" size={16} />
                    <span>{feature?.estimatedCost}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureRecommendations;