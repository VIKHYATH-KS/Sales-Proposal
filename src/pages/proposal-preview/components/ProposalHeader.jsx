import React from 'react';
import Icon from '../../../components/AppIcon';

const ProposalHeader = ({ proposal, onEdit }) => {
  return (
    <div className="bg-card border-b border-border px-6 py-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-start justify-between gap-6 mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 bg-success/10 text-success text-xs font-medium rounded-full">
                Generated
              </span>
              <span className="text-sm text-muted-foreground">
                {new Date(proposal.generatedDate)?.toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </span>
            </div>
            <h1 className="text-3xl font-semibold text-foreground mb-2">
              {proposal?.title}
            </h1>
            <p className="text-muted-foreground">
              Proposal ID: {proposal?.id}
            </p>
          </div>
          <button
            onClick={onEdit}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            <Icon name="Edit" size={18} />
            <span>Edit Proposal</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="Building2" size={18} className="text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Client</span>
            </div>
            <p className="text-foreground font-semibold">{proposal?.clientName}</p>
          </div>

          <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="DollarSign" size={18} className="text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Budget Range</span>
            </div>
            <p className="text-foreground font-semibold">{proposal?.budgetRange}</p>
          </div>

          <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="Calendar" size={18} className="text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Timeline</span>
            </div>
            <p className="text-foreground font-semibold">{proposal?.timeline}</p>
          </div>

          <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="Tag" size={18} className="text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Industry</span>
            </div>
            <p className="text-foreground font-semibold">{proposal?.industry}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposalHeader;