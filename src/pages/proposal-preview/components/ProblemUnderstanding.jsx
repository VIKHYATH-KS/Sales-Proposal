import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ProblemUnderstanding = ({ problems, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProblems, setEditedProblems] = useState(problems);

  const handleSave = () => {
    onUpdate(editedProblems);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProblems(problems);
    setIsEditing(false);
  };

  const handleProblemChange = (index, field, value) => {
    const updated = [...editedProblems];
    updated[index] = { ...updated?.[index], [field]: value };
    setEditedProblems(updated);
  };

  return (
    <div id="problem-understanding" className="bg-card border border-border rounded-lg p-8 scroll-mt-24">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-foreground flex items-center gap-3">
          <Icon name="Target" size={24} className="text-primary" />
          Problem Understanding
        </h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-colors"
          >
            <Icon name="Edit" size={16} />
            Edit
          </button>
        )}
      </div>
      {isEditing ? (
        <div className="space-y-6">
          {editedProblems?.map((problem, index) => (
            <div key={index} className="space-y-3 pb-6 border-b border-border last:border-0">
              <input
                type="text"
                value={problem?.title}
                onChange={(e) => handleProblemChange(index, 'title', e?.target?.value)}
                className="w-full px-4 py-2 bg-background border border-input rounded-md text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Problem title"
              />
              <textarea
                value={problem?.description}
                onChange={(e) => handleProblemChange(index, 'description', e?.target?.value)}
                className="w-full min-h-[100px] px-4 py-3 bg-background border border-input rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-y"
                placeholder="Problem description"
              />
            </div>
          ))}
          <div className="flex items-center gap-3 pt-4">
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
        </div>
      ) : (
        <div className="space-y-6">
          {problems?.map((problem, index) => (
            <div key={index} className="pb-6 border-b border-border last:border-0">
              <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 bg-primary/10 text-primary text-sm font-medium rounded-full">
                  {index + 1}
                </span>
                {problem?.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {problem?.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProblemUnderstanding;