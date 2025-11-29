import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = ({ hasFilters, onClearFilters }) => {
  const navigate = useNavigate();

  if (hasFilters) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mb-6">
          <Icon name="Search" size={40} className="text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">No proposals found</h3>
        <p className="text-muted-foreground text-center max-w-md mb-6">
          We couldn't find any proposals matching your search criteria. Try adjusting your filters or search terms.
        </p>
        <Button
          variant="outline"
          iconName="X"
          iconPosition="left"
          onClick={onClearFilters}
        >
          Clear Filters
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-6">
        <Icon name="FileText" size={48} color="var(--color-primary)" />
      </div>
      <h3 className="text-2xl font-semibold text-foreground mb-2">Create Your First Proposal</h3>
      <p className="text-muted-foreground text-center max-w-md mb-8">
        Get started by uploading a client requirement document. Our AI will analyze it and generate a professional proposal in minutes.
      </p>
      <Button
        variant="default"
        size="lg"
        iconName="Plus"
        iconPosition="left"
        onClick={() => navigate('/upload-document')}
      >
        Create New Proposal
      </Button>
    </div>
  );
};

export default EmptyState;