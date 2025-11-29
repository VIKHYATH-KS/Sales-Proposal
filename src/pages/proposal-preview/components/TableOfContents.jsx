import React from 'react';
import Icon from '../../../components/AppIcon';

const TableOfContents = ({ sections, activeSection, onSectionClick }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <Icon name="List" size={20} className="text-primary" />
        Table of Contents
      </h3>
      <nav className="space-y-2">
        {sections?.map((section) => (
          <button
            key={section?.id}
            onClick={() => onSectionClick(section?.id)}
            className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
              activeSection === section?.id
                ? 'bg-primary/10 text-primary font-medium' :'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-xs">{section?.number}</span>
              <span className="text-sm">{section?.title}</span>
            </div>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default TableOfContents;