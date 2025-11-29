import React from 'react';
import Icon from '../../../components/AppIcon';

const ProcessingStats = ({ stats }) => {
  const statCards = [
    {
      icon: 'FileText',
      label: 'Pages Processed',
      value: stats?.pagesProcessed || '0',
      total: stats?.totalPages || '0',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: 'Zap',
      label: 'Tokens Used',
      value: stats?.tokensUsed || '0',
      total: stats?.estimatedTokens || '0',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      icon: 'Clock',
      label: 'Time Elapsed',
      value: stats?.timeElapsed || '0s',
      total: stats?.estimatedTime || '0s',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      icon: 'Target',
      label: 'Accuracy Score',
      value: stats?.accuracyScore || '0%',
      total: '100%',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards?.map((stat, index) => (
        <div 
          key={index}
          className="bg-card rounded-lg border border-border p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`w-10 h-10 rounded-lg ${stat?.bgColor} flex items-center justify-center`}>
              <Icon name={stat?.icon} size={20} className={stat?.color} />
            </div>
            <span className="text-xs font-medium text-muted-foreground">{stat?.label}</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-foreground">{stat?.value}</span>
            <span className="text-sm text-muted-foreground">/ {stat?.total}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProcessingStats;