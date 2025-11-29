import React, { useState, useRef, useEffect } from 'react';
import Icon from './AppIcon';

const QuickActionMenu = ({ 
  onDuplicate, 
  onDelete, 
  onShare, 
  onDownload,
  onEdit,
  showDuplicate = true,
  showDelete = true,
  showShare = true,
  showDownload = true,
  showEdit = true
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef?.current && !menuRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleAction = (callback) => {
    if (callback) {
      callback();
    }
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        className="quick-action-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open actions menu"
        aria-expanded={isOpen}
      >
        <Icon name="MoreVertical" size={20} />
      </button>

      {isOpen && (
        <div className="quick-action-menu">
          {showEdit && (
            <button
              className="quick-action-item"
              onClick={() => handleAction(onEdit)}
            >
              <Icon name="Edit" size={16} />
              <span>Edit</span>
            </button>
          )}
          {showDuplicate && (
            <button
              className="quick-action-item"
              onClick={() => handleAction(onDuplicate)}
            >
              <Icon name="Copy" size={16} />
              <span>Duplicate</span>
            </button>
          )}
          {showDownload && (
            <button
              className="quick-action-item"
              onClick={() => handleAction(onDownload)}
            >
              <Icon name="Download" size={16} />
              <span>Download</span>
            </button>
          )}
          {showShare && (
            <button
              className="quick-action-item"
              onClick={() => handleAction(onShare)}
            >
              <Icon name="Share2" size={16} />
              <span>Share</span>
            </button>
          )}
          {showDelete && (
            <>
              <div className="border-t border-border my-1" />
              <button
                className="quick-action-item destructive"
                onClick={() => handleAction(onDelete)}
              >
                <Icon name="Trash2" size={16} />
                <span>Delete</span>
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default QuickActionMenu;