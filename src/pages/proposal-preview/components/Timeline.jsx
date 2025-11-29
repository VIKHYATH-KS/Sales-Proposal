import React from 'react';
import Icon from '../../../components/AppIcon';

const Timeline = ({ milestones }) => {
  return (
    <div id="timeline" className="bg-card border border-border rounded-lg p-8 scroll-mt-24">
      <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-3">
        <Icon name="Calendar" size={24} className="text-primary" />
        Project Timeline
      </h2>
      <div className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />

        <div className="space-y-8">
          {milestones?.map((milestone, index) => (
            <div key={milestone?.id} className="relative pl-16">
              <div className="absolute left-0 top-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-semibold">{index + 1}</span>
              </div>

              <div className="bg-background border border-border rounded-lg p-5">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="text-lg font-semibold text-foreground">
                    {milestone?.title}
                  </h3>
                  <span className="px-3 py-1 bg-muted text-muted-foreground text-xs font-medium rounded-full whitespace-nowrap">
                    {milestone?.duration}
                  </span>
                </div>

                <p className="text-muted-foreground mb-4">
                  {milestone?.description}
                </p>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-foreground">Deliverables:</h4>
                  <ul className="space-y-1.5">
                    {milestone?.deliverables?.map((deliverable, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Icon name="CheckCircle2" size={16} className="text-success mt-0.5 flex-shrink-0" />
                        <span>{deliverable}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8 p-5 bg-muted/30 rounded-lg">
        <div className="flex items-center gap-3 mb-2">
          <Icon name="Clock" size={20} className="text-primary" />
          <h4 className="font-semibold text-foreground">Total Project Duration</h4>
        </div>
        <p className="text-2xl font-bold text-primary">
          {milestones?.reduce((total, m) => {
            const weeks = parseInt(m?.duration?.match(/\d+/)?.[0]);
            return total + weeks;
          }, 0)} weeks
        </p>
      </div>
    </div>
  );
};

export default Timeline;