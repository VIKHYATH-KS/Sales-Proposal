import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from './AppIcon';

const Breadcrumbs = () => {
  const location = useLocation();

  const breadcrumbMap = {
    '/dashboard': [{ label: 'Dashboard', path: '/dashboard' }],
    '/upload-document': [
      { label: 'Dashboard', path: '/dashboard' },
      { label: 'Upload Document', path: '/upload-document' }
    ],
    '/proposal-generation': [
      { label: 'Dashboard', path: '/dashboard' },
      { label: 'Upload Document', path: '/upload-document' },
      { label: 'Generating Proposal', path: '/proposal-generation' }
    ],
    '/proposal-preview': [
      { label: 'Dashboard', path: '/dashboard' },
      { label: 'Proposals', path: '/proposal-preview' }
    ]
  };

  const breadcrumbs = breadcrumbMap?.[location?.pathname] || [
    { label: 'Dashboard', path: '/dashboard' }
  ];

  if (breadcrumbs?.length <= 1) {
    return null;
  }

  return (
    <nav className="breadcrumb-container" aria-label="Breadcrumb">
      <ol className="breadcrumb-list">
        {breadcrumbs?.map((crumb, index) => {
          const isLast = index === breadcrumbs?.length - 1;
          
          return (
            <li key={crumb?.path} className="breadcrumb-item">
              {!isLast ? (
                <>
                  <Link to={crumb?.path} className="breadcrumb-link">
                    {crumb?.label}
                  </Link>
                  <Icon 
                    name="ChevronRight" 
                    size={16} 
                    className="breadcrumb-separator" 
                  />
                </>
              ) : (
                <span className="breadcrumb-link active" aria-current="page">
                  {crumb?.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;