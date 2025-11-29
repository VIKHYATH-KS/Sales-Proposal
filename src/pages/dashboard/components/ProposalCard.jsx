import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import QuickActionMenu from '../../../components/QuickActionMenu';

const ProposalCard = ({ 
  proposal, 
  onEdit, 
  onDownload, 
  onDuplicate, 
  onDelete, 
  onShare 
}) => {
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    const colors = {
      draft: 'bg-warning/10 text-warning border-warning/20',
      completed: 'bg-success/10 text-success border-success/20',
      shared: 'bg-primary/10 text-primary border-primary/20',
      archived: 'bg-muted text-muted-foreground border-border'
    };
    return colors?.[status] || colors?.draft;
  };

  const getStatusIcon = (status) => {
    const icons = {
      draft: 'FileEdit',
      completed: 'CheckCircle2',
      shared: 'Share2',
      archived: 'Archive'
    };
    return icons?.[status] || 'FileText';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const handleCardClick = () => {
    navigate('/proposal-preview', { state: { proposalId: proposal?.id } });
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden shadow-soft transition-smooth hover:shadow-elevated group">
      <div 
        className="relative h-40 bg-muted cursor-pointer overflow-hidden"
        onClick={handleCardClick}
      >
        <Image
          src={proposal?.thumbnail}
          alt={proposal?.thumbnailAlt}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(proposal?.status)}`}>
            <Icon name={getStatusIcon(proposal?.status)} size={12} />
            {proposal?.status?.charAt(0)?.toUpperCase() + proposal?.status?.slice(1)}
          </span>
        </div>
        {proposal?.progress < 100 && proposal?.status === 'draft' && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted/50">
            <div 
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${proposal?.progress}%` }}
            />
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h3 
              className="text-lg font-semibold text-foreground mb-1 truncate cursor-pointer hover:text-primary transition-colors"
              onClick={handleCardClick}
            >
              {proposal?.title}
            </h3>
            <p className="text-sm text-muted-foreground flex items-center gap-1.5">
              <Icon name="Building2" size={14} />
              {proposal?.clientName}
            </p>
          </div>
          <QuickActionMenu
            onEdit={() => onEdit(proposal?.id)}
            onDownload={() => onDownload(proposal?.id)}
            onDuplicate={() => onDuplicate(proposal?.id)}
            onShare={() => onShare(proposal?.id)}
            onDelete={() => onDelete(proposal?.id)}
          />
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name="Calendar" size={14} />
            <span>Created: {formatDate(proposal?.createdAt)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name="DollarSign" size={14} />
            <span>{proposal?.value}</span>
          </div>
          {proposal?.deadline && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon name="Clock" size={14} />
              <span>Deadline: {formatDate(proposal?.deadline)}</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Eye"
            iconPosition="left"
            fullWidth
            onClick={handleCardClick}
          >
            View
          </Button>
          <Button
            variant="default"
            size="sm"
            iconName="Edit"
            iconPosition="left"
            fullWidth
            onClick={() => onEdit(proposal?.id)}
          >
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProposalCard;