import React from 'react';

import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const FilterBar = ({ 
  searchQuery, 
  onSearchChange, 
  statusFilter, 
  onStatusChange,
  sortBy,
  onSortChange,
  onClearFilters,
  hasActiveFilters
}) => {
  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'draft', label: 'Draft' },
    { value: 'completed', label: 'Completed' },
    { value: 'shared', label: 'Shared' },
    { value: 'archived', label: 'Archived' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'client', label: 'Client Name' },
    { value: 'value', label: 'Proposal Value' },
    { value: 'deadline', label: 'Deadline' }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-4 mb-6">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search proposals by title, client, or ID..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e?.target?.value)}
            className="w-full"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 lg:w-auto">
          <Select
            options={statusOptions}
            value={statusFilter}
            onChange={onStatusChange}
            placeholder="Filter by status"
            className="sm:w-48"
          />

          <Select
            options={sortOptions}
            value={sortBy}
            onChange={onSortChange}
            placeholder="Sort by"
            className="sm:w-48"
          />

          {hasActiveFilters && (
            <Button
              variant="outline"
              size="default"
              iconName="X"
              iconPosition="left"
              onClick={onClearFilters}
              className="sm:w-auto"
            >
              Clear
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;