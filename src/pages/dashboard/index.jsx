import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Breadcrumbs from '../../components/Breadcrumbs';

import Button from '../../components/ui/Button';
import { Checkbox } from '../../components/ui/Checkbox';
import MetricsCard from './components/MetricsCard';
import ProposalCard from './components/ProposalCard';
import FilterBar from './components/FilterBar';
import EmptyState from './components/EmptyState';
import BulkActionsBar from './components/BulkActionsBar';
import ActivityFeed from './components/ActivityFeed';

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedProposals, setSelectedProposals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const mockProposals = [
  {
    id: 'PROP-2025-001',
    title: 'E-Commerce Platform Development',
    clientName: 'TechRetail Solutions Inc.',
    thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_1ebd44757-1764337950556.png",
    thumbnailAlt: 'Modern e-commerce website dashboard displaying product analytics and sales graphs on multiple screens',
    status: 'completed',
    progress: 100,
    value: '$125,000',
    createdAt: '2025-11-20T10:30:00',
    deadline: '2026-02-15T23:59:59'
  },
  {
    id: 'PROP-2025-002',
    title: 'Mobile Banking Application',
    clientName: 'FinanceFirst Bank',
    thumbnail: "https://images.unsplash.com/photo-1676245437659-2a05627080e4",
    thumbnailAlt: 'Smartphone displaying modern mobile banking app interface with account balance and transaction history',
    status: 'shared',
    progress: 100,
    value: '$89,500',
    createdAt: '2025-11-22T14:15:00',
    deadline: '2026-01-30T23:59:59'
  },
  {
    id: 'PROP-2025-003',
    title: 'Healthcare Management System',
    clientName: 'MediCare Plus',
    thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_1c91d39ec-1764337951625.png",
    thumbnailAlt: 'Medical professional using tablet with healthcare management software in modern hospital setting',
    status: 'draft',
    progress: 65,
    value: '$156,000',
    createdAt: '2025-11-25T09:00:00',
    deadline: '2026-03-01T23:59:59'
  },
  {
    id: 'PROP-2025-004',
    title: 'Real Estate Portal Development',
    clientName: 'PropertyHub Realty',
    thumbnail: "https://images.unsplash.com/photo-1726676012196-d4051372aaf5",
    thumbnailAlt: 'Luxury modern house exterior with large windows and landscaped garden at sunset',
    status: 'completed',
    progress: 100,
    value: '$72,000',
    createdAt: '2025-11-18T16:45:00',
    deadline: '2026-01-15T23:59:59'
  },
  {
    id: 'PROP-2025-005',
    title: 'Educational Learning Platform',
    clientName: 'EduTech Academy',
    thumbnail: "https://images.unsplash.com/photo-1701777508358-833de8c614ec",
    thumbnailAlt: 'Students collaborating on laptops in modern classroom with interactive digital whiteboard',
    status: 'draft',
    progress: 40,
    value: '$94,500',
    createdAt: '2025-11-26T11:20:00',
    deadline: '2026-02-28T23:59:59'
  },
  {
    id: 'PROP-2025-006',
    title: 'Restaurant Management Suite',
    clientName: 'Gourmet Dining Group',
    thumbnail: "https://images.unsplash.com/photo-1672870634122-6ea7b16d2bb4",
    thumbnailAlt: 'Elegant restaurant interior with modern table settings and ambient lighting',
    status: 'shared',
    progress: 100,
    value: '$48,000',
    createdAt: '2025-11-23T13:30:00',
    deadline: '2026-01-20T23:59:59'
  },
  {
    id: 'PROP-2025-007',
    title: 'Logistics Tracking System',
    clientName: 'GlobalShip Logistics',
    thumbnail: "https://images.unsplash.com/photo-1569975423479-0f324bc68e13",
    thumbnailAlt: 'Warehouse with organized shipping containers and forklift operations in progress',
    status: 'completed',
    progress: 100,
    value: '$112,000',
    createdAt: '2025-11-19T08:00:00',
    deadline: '2026-02-10T23:59:59'
  },
  {
    id: 'PROP-2025-008',
    title: 'Social Media Analytics Tool',
    clientName: 'BrandBoost Marketing',
    thumbnail: "https://images.unsplash.com/photo-1660732421009-469aba1c2e81",
    thumbnailAlt: 'Marketing analytics dashboard showing social media metrics and engagement graphs on computer screen',
    status: 'draft',
    progress: 25,
    value: '$67,500',
    createdAt: '2025-11-27T15:10:00',
    deadline: '2026-03-15T23:59:59'
  },
  {
    id: 'PROP-2025-009',
    title: 'Fitness Tracking Application',
    clientName: 'FitLife Wellness',
    thumbnail: "https://images.unsplash.com/photo-1580983693000-5654250f64d1",
    thumbnailAlt: 'Athletic person checking fitness tracking app on smartphone while exercising in modern gym',
    status: 'archived',
    progress: 100,
    value: '$38,000',
    createdAt: '2025-11-10T10:00:00',
    deadline: '2025-12-31T23:59:59'
  }];


  const mockActivities = [
  {
    id: 'ACT-001',
    type: 'created',
    description: 'Created new proposal for Social Media Analytics Tool',
    timestamp: '2025-11-27T15:10:00'
  },
  {
    id: 'ACT-002',
    type: 'shared',
    description: 'Shared Mobile Banking Application proposal with client',
    timestamp: '2025-11-26T09:30:00'
  },
  {
    id: 'ACT-003',
    type: 'edited',
    description: 'Updated Healthcare Management System proposal',
    timestamp: '2025-11-25T14:20:00'
  },
  {
    id: 'ACT-004',
    type: 'downloaded',
    description: 'Downloaded E-Commerce Platform Development proposal as PDF',
    timestamp: '2025-11-24T11:45:00'
  },
  {
    id: 'ACT-005',
    type: 'duplicated',
    description: 'Duplicated Restaurant Management Suite proposal',
    timestamp: '2025-11-23T16:00:00'
  }];


  const filterProposals = () => {
    let filtered = [...mockProposals];

    if (searchQuery) {
      const query = searchQuery?.toLowerCase();
      filtered = filtered?.filter(
        (p) =>
        p?.title?.toLowerCase()?.includes(query) ||
        p?.clientName?.toLowerCase()?.includes(query) ||
        p?.id?.toLowerCase()?.includes(query)
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered?.filter((p) => p?.status === statusFilter);
    }

    filtered?.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'client':
          return a?.clientName?.localeCompare(b?.clientName);
        case 'value':
          return parseInt(b?.value?.replace(/[^0-9]/g, '')) - parseInt(a?.value?.replace(/[^0-9]/g, ''));
        case 'deadline':
          return new Date(a.deadline) - new Date(b.deadline);
        default:
          return 0;
      }
    });

    return filtered;
  };

  const filteredProposals = filterProposals();
  const totalPages = Math.ceil(filteredProposals?.length / itemsPerPage);
  const paginatedProposals = filteredProposals?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const hasActiveFilters = searchQuery || statusFilter !== 'all' || sortBy !== 'newest';

  const handleClearFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setSortBy('newest');
    setCurrentPage(1);
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedProposals(paginatedProposals?.map((p) => p?.id));
    } else {
      setSelectedProposals([]);
    }
  };

  const handleSelectProposal = (proposalId, checked) => {
    if (checked) {
      setSelectedProposals([...selectedProposals, proposalId]);
    } else {
      setSelectedProposals(selectedProposals?.filter((id) => id !== proposalId));
    }
  };

  const handleBulkExport = () => {
    console.log('Exporting proposals:', selectedProposals);
    alert(`Exporting ${selectedProposals?.length} proposal(s)`);
  };

  const handleBulkDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedProposals?.length} proposal(s)?`)) {
      console.log('Deleting proposals:', selectedProposals);
      setSelectedProposals([]);
    }
  };

  const handleEdit = (proposalId) => {
    navigate('/proposal-preview', { state: { proposalId, mode: 'edit' } });
  };

  const handleDownload = (proposalId) => {
    console.log('Downloading proposal:', proposalId);
    alert(`Downloading proposal ${proposalId}`);
  };

  const handleDuplicate = (proposalId) => {
    console.log('Duplicating proposal:', proposalId);
    alert(`Duplicating proposal ${proposalId}`);
  };

  const handleDelete = (proposalId) => {
    if (window.confirm('Are you sure you want to delete this proposal?')) {
      console.log('Deleting proposal:', proposalId);
    }
  };

  const handleShare = (proposalId) => {
    console.log('Sharing proposal:', proposalId);
    alert(`Sharing proposal ${proposalId}`);
  };

  const metrics = {
    totalProposals: mockProposals?.length,
    completedProposals: mockProposals?.filter((p) => p?.status === 'completed')?.length,
    draftProposals: mockProposals?.filter((p) => p?.status === 'draft')?.length,
    totalValue: mockProposals?.reduce((sum, p) => sum + parseInt(p?.value?.replace(/[^0-9]/g, '')), 0)
  };

  const successRate = (metrics?.completedProposals / metrics?.totalProposals * 100)?.toFixed(1);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Breadcrumbs />
      <main className="main-content">
        <div className="max-w-[1920px] mx-auto px-4 lg:px-6 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-semibold text-foreground mb-2">Dashboard</h1>
              <p className="text-muted-foreground">
                Manage your proposals and track your sales pipeline
              </p>
            </div>
            <Button
              variant="default"
              size="lg"
              iconName="Plus"
              iconPosition="left"
              onClick={() => navigate('/upload-document')}>

              Create New Proposal
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricsCard
              title="Total Proposals"
              value={metrics?.totalProposals}
              subtitle="All time"
              icon="FileText"
              iconColor="var(--color-primary)"
              trend="up"
              trendValue="+12%" />

            <MetricsCard
              title="Completed"
              value={metrics?.completedProposals}
              subtitle={`${successRate}% success rate`}
              icon="CheckCircle2"
              iconColor="var(--color-success)"
              trend="up"
              trendValue="+8%" />

            <MetricsCard
              title="In Progress"
              value={metrics?.draftProposals}
              subtitle="Active drafts"
              icon="Clock"
              iconColor="var(--color-warning)"
              trend="neutral"
              trendValue="" />

            <MetricsCard
              title="Total Value"
              value={`$${(metrics?.totalValue / 1000)?.toFixed(0)}K`}
              subtitle="Combined proposal value"
              icon="DollarSign"
              iconColor="var(--color-accent)"
              trend="up"
              trendValue="+15%" />

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <FilterBar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                statusFilter={statusFilter}
                onStatusChange={setStatusFilter}
                sortBy={sortBy}
                onSortChange={setSortBy}
                onClearFilters={handleClearFilters}
                hasActiveFilters={hasActiveFilters} />


              {paginatedProposals?.length > 0 &&
              <div className="bg-card rounded-lg border border-border p-4 mb-4">
                  <Checkbox
                  label={`Select all (${paginatedProposals?.length} on this page)`}
                  checked={selectedProposals?.length === paginatedProposals?.length && paginatedProposals?.length > 0}
                  onChange={(e) => handleSelectAll(e?.target?.checked)} />

                </div>
              }

              {filteredProposals?.length === 0 ?
              <EmptyState
                hasFilters={hasActiveFilters}
                onClearFilters={handleClearFilters} /> :


              <>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
                    {paginatedProposals?.map((proposal) =>
                  <div key={proposal?.id} className="relative">
                        <div className="absolute top-4 left-4 z-10">
                          <Checkbox
                        checked={selectedProposals?.includes(proposal?.id)}
                        onChange={(e) => handleSelectProposal(proposal?.id, e?.target?.checked)} />

                        </div>
                        <ProposalCard
                      proposal={proposal}
                      onEdit={handleEdit}
                      onDownload={handleDownload}
                      onDuplicate={handleDuplicate}
                      onDelete={handleDelete}
                      onShare={handleShare} />

                      </div>
                  )}
                  </div>

                  {totalPages > 1 &&
                <div className="flex items-center justify-center gap-2">
                      <Button
                    variant="outline"
                    size="sm"
                    iconName="ChevronLeft"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)} />

                      <div className="flex items-center gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1)?.map((page) =>
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-md text-sm font-medium transition-colors ${
                      currentPage === page ?
                      'bg-primary text-primary-foreground' :
                      'text-muted-foreground hover:bg-muted'}`
                      }>

                            {page}
                          </button>
                    )}
                      </div>
                      <Button
                    variant="outline"
                    size="sm"
                    iconName="ChevronRight"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)} />

                    </div>
                }
                </>
              }
            </div>

            <div className="lg:col-span-1">
              <ActivityFeed activities={mockActivities} />
            </div>
          </div>
        </div>
      </main>
      <BulkActionsBar
        selectedCount={selectedProposals?.length}
        onExport={handleBulkExport}
        onDelete={handleBulkDelete}
        onClearSelection={() => setSelectedProposals([])} />

    </div>);

};

export default Dashboard;