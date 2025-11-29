import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const PricingTable = ({ tiers, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTiers, setEditedTiers] = useState(tiers);

  const handleSave = () => {
    onUpdate(editedTiers);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTiers(tiers);
    setIsEditing(false);
  };

  const handlePriceChange = (tierIndex, value) => {
    const updated = [...editedTiers];
    updated[tierIndex] = { ...updated?.[tierIndex], price: value };
    setEditedTiers(updated);
  };

  const handleFeatureToggle = (tierIndex, featureIndex) => {
    const updated = [...editedTiers];
    updated[tierIndex].features[featureIndex].included = !updated?.[tierIndex]?.features?.[featureIndex]?.included;
    setEditedTiers(updated);
  };

  return (
    <div id="pricing" className="bg-card border border-border rounded-lg p-8 scroll-mt-24">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-foreground flex items-center gap-3">
          <Icon name="DollarSign" size={24} className="text-primary" />
          Pricing Options
        </h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-colors"
          >
            <Icon name="Edit" size={16} />
            Edit Pricing
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {(isEditing ? editedTiers : tiers)?.map((tier, tierIndex) => (
          <div
            key={tier?.id}
            className={`border rounded-lg p-6 transition-all ${
              tier?.recommended
                ? 'border-primary bg-primary/5 shadow-lg scale-105'
                : 'border-border bg-background'
            }`}
          >
            {tier?.recommended && (
              <div className="mb-4">
                <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                  Recommended
                </span>
              </div>
            )}

            <h3 className="text-xl font-semibold text-foreground mb-2">
              {tier?.name}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {tier?.description}
            </p>

            <div className="mb-6">
              {isEditing ? (
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-foreground">$</span>
                  <input
                    type="number"
                    value={tier?.price}
                    onChange={(e) => handlePriceChange(tierIndex, e?.target?.value)}
                    className="w-full px-3 py-2 bg-background border border-input rounded-md text-3xl font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              ) : (
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-foreground">
                    ${tier?.price?.toLocaleString()}
                  </span>
                  <span className="text-muted-foreground">/project</span>
                </div>
              )}
            </div>

            <ul className="space-y-3 mb-6">
              {tier?.features?.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-start gap-3">
                  {isEditing ? (
                    <input
                      type="checkbox"
                      checked={feature?.included}
                      onChange={() => handleFeatureToggle(tierIndex, featureIndex)}
                      className="mt-1 w-4 h-4 rounded border-input"
                    />
                  ) : (
                    <Icon
                      name={feature?.included ? 'Check' : 'X'}
                      size={18}
                      className={feature?.included ? 'text-success' : 'text-muted-foreground'}
                    />
                  )}
                  <span className={feature?.included ? 'text-foreground' : 'text-muted-foreground line-through'}>
                    {feature?.name}
                  </span>
                </li>
              ))}
            </ul>

            <button
              className={`w-full py-3 rounded-md font-medium transition-colors ${
                tier?.recommended
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                  : 'bg-muted text-foreground hover:bg-muted/80'
              }`}
            >
              Select {tier?.name}
            </button>
          </div>
        ))}
      </div>
      {isEditing && (
        <div className="flex items-center gap-3 mt-6 pt-6 border-t border-border">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Save Changes
          </button>
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-muted text-foreground rounded-md hover:bg-muted/80 transition-colors"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default PricingTable;