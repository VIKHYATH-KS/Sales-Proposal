import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const PreparationTips = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const tips = [
    {
      icon: 'FileCheck',
      title: 'Clear Text Format',
      description: 'Ensure your PDF contains selectable text, not scanned images. Text-based PDFs provide better extraction accuracy.'
    },
    {
      icon: 'Layout',
      title: 'Structured Content',
      description: 'Organize requirements with clear headings and sections. Use bullet points for features and numbered lists for priorities.'
    },
    {
      icon: 'DollarSign',
      title: 'Budget Information',
      description: 'Include budget ranges or constraints clearly. Specify currency and any payment terms or milestones.'
    },
    {
      icon: 'Calendar',
      title: 'Timeline Details',
      description: 'Mention project deadlines, launch dates, or development phases. Include any time-sensitive requirements.'
    },
    {
      icon: 'Target',
      title: 'Specific Requirements',
      description: 'Be detailed about features, functionalities, and technical specifications. Include industry-specific terminology.'
    },
    {
      icon: 'Users',
      title: 'Stakeholder Info',
      description: 'Include contact details, company information, and decision-maker names for personalized proposals.'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-muted/30 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
            <Icon name="Lightbulb" size={20} color="var(--color-accent)" />
          </div>
          <div className="text-left">
            <h3 className="text-base font-semibold text-foreground">
              Document Preparation Tips
            </h3>
            <p className="text-sm text-muted-foreground">
              Best practices for optimal results
            </p>
          </div>
        </div>
        <Icon
          name={isExpanded ? 'ChevronUp' : 'ChevronDown'}
          size={20}
          className="text-muted-foreground"
        />
      </button>
      {isExpanded && (
        <div className="border-t border-border p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tips?.map((tip, index) => (
              <div key={index} className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
                  <Icon name={tip?.icon} size={16} color="var(--color-primary)" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-foreground mb-1">
                    {tip?.title}
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {tip?.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-start gap-2 text-xs text-muted-foreground">
              <Icon name="Info" size={14} className="flex-shrink-0 mt-0.5" />
              <p>
                For best results, ensure your PDF is under 10MB and contains clear, structured information about project requirements, budget, and timeline.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreparationTips;