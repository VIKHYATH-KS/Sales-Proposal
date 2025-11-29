import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Breadcrumbs from '../../components/Breadcrumbs';
import ContextualActionBar from '../../components/ContextualActionBar';
import QuickActionMenu from '../../components/QuickActionMenu';
import ProposalHeader from './components/ProposalHeader';
import TableOfContents from './components/TableOfContents';
import ExecutiveSummary from './components/ExecutiveSummary';
import ProblemUnderstanding from './components/ProblemUnderstanding';
import FeatureRecommendations from './components/FeatureRecommendations';
import PricingTable from './components/PricingTable';
import Timeline from './components/Timeline';
import TermsAndConditions from './components/TermsAndConditions';
import CallToAction from './components/CallToAction';
import ExportModal from './components/ExportModal';
import ShareModal from './components/ShareModal';

const ProposalPreview = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('executive-summary');
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const [proposalData, setProposalData] = useState({
    id: "PROP-2025-001",
    title: "E-Commerce Platform Development Proposal",
    clientName: "TechRetail Solutions Inc.",
    budgetRange: "$75,000 - $125,000",
    timeline: "16-20 weeks",
    industry: "E-Commerce & Retail",
    generatedDate: "2025-01-15T10:30:00Z",
    executiveSummary: `We are pleased to present this comprehensive proposal for developing a modern, scalable e-commerce platform that will transform TechRetail Solutions' digital presence and drive significant business growth.\n\nOur solution addresses your core requirements for a high-performance online store with advanced inventory management, seamless payment processing, and exceptional user experience across all devices. With over 8 years of experience delivering enterprise e-commerce solutions, our team brings proven expertise in building platforms that handle high transaction volumes while maintaining security and reliability.\n\nThis proposal outlines a phased development approach spanning 16-20 weeks, incorporating industry best practices, modern technologies, and comprehensive testing protocols. We've structured three pricing tiers to provide flexibility based on your specific needs and budget considerations, with our recommended Professional tier offering the optimal balance of features and value.\n\nOur commitment extends beyond launch, with ongoing support, maintenance, and optimization services to ensure your platform continues to evolve with your business needs and market demands.`,
    problems: [
      {
        title: "Outdated Technology Stack",
        description: "Current platform built on legacy technology that limits scalability, performance, and integration capabilities with modern payment gateways and third-party services."
      },
      {
        title: "Poor Mobile Experience",
        description: "Existing mobile interface suffers from slow load times, difficult navigation, and high cart abandonment rates, resulting in lost revenue opportunities."
      },
      {
        title: "Inventory Management Challenges",
        description: "Manual inventory tracking leads to stock discrepancies, overselling issues, and inefficient warehouse operations affecting customer satisfaction."
      },
      {
        title: "Limited Analytics and Reporting",
        description: "Lack of comprehensive data insights prevents informed decision-making regarding product performance, customer behavior, and marketing effectiveness."
      }
    ],
    features: [
      {
        id: "f1",
        name: "Responsive Web Design",
        description: "Mobile-first design approach ensuring optimal viewing experience across all devices with adaptive layouts and touch-optimized interfaces.",
        complexity: "Medium",
        estimatedTime: "3-4 weeks",
        estimatedCost: "$12,000 - $15,000",
        included: true
      },
      {
        id: "f2",
        name: "Advanced Product Catalog",
        description: "Comprehensive product management system with categories, filters, search functionality, and dynamic pricing rules.",
        complexity: "High",
        estimatedTime: "4-5 weeks",
        estimatedCost: "$18,000 - $22,000",
        included: true
      },
      {
        id: "f3",
        name: "Shopping Cart & Checkout",
        description: "Streamlined checkout process with guest checkout option, saved addresses, multiple payment methods, and order tracking.",
        complexity: "High",
        estimatedTime: "3-4 weeks",
        estimatedCost: "$15,000 - $18,000",
        included: true
      },
      {
        id: "f4",
        name: "Payment Gateway Integration",
        description: "Secure integration with major payment processors including Stripe, PayPal, and credit card processing with PCI compliance.",
        complexity: "Medium",
        estimatedTime: "2-3 weeks",
        estimatedCost: "$8,000 - $10,000",
        included: true
      },
      {
        id: "f5",
        name: "Inventory Management System",
        description: "Real-time inventory tracking, automated stock alerts, multi-warehouse support, and supplier management capabilities.",
        complexity: "High",
        estimatedTime: "4-5 weeks",
        estimatedCost: "$20,000 - $25,000",
        included: true
      },
      {
        id: "f6",
        name: "Customer Account Portal",
        description: "User registration, profile management, order history, wishlist functionality, and personalized recommendations.",
        complexity: "Medium",
        estimatedTime: "2-3 weeks",
        estimatedCost: "$10,000 - $12,000",
        included: true
      },
      {
        id: "f7",
        name: "Admin Dashboard",
        description: "Comprehensive backend interface for managing products, orders, customers, and viewing analytics with role-based access control.",
        complexity: "High",
        estimatedTime: "3-4 weeks",
        estimatedCost: "$16,000 - $20,000",
        included: true
      },
      {
        id: "f8",
        name: "Email Marketing Integration",
        description: "Automated email campaigns for abandoned carts, order confirmations, shipping updates, and promotional newsletters.",
        complexity: "Low",
        estimatedTime: "1-2 weeks",
        estimatedCost: "$5,000 - $7,000",
        included: false
      },
      {
        id: "f9",
        name: "Advanced Analytics Dashboard",
        description: "Detailed reporting on sales trends, customer behavior, product performance, and conversion metrics with exportable reports.",
        complexity: "Medium",
        estimatedTime: "2-3 weeks",
        estimatedCost: "$12,000 - $15,000",
        included: false
      },
      {
        id: "f10",
        name: "Multi-language Support",
        description: "Internationalization framework supporting multiple languages and currencies for global market expansion.",
        complexity: "Medium",
        estimatedTime: "2-3 weeks",
        estimatedCost: "$10,000 - $13,000",
        included: false
      }
    ],
    pricingTiers: [
      {
        id: "basic",
        name: "Essential",
        description: "Core e-commerce functionality for small to medium businesses",
        price: 75000,
        recommended: false,
        features: [
          { name: "Responsive Web Design", included: true },
          { name: "Basic Product Catalog (up to 500 products)", included: true },
          { name: "Shopping Cart & Checkout", included: true },
          { name: "Payment Gateway Integration (2 providers)", included: true },
          { name: "Basic Inventory Management", included: true },
          { name: "Customer Account Portal", included: true },
          { name: "Standard Admin Dashboard", included: true },
          { name: "Email Notifications", included: true },
          { name: "3 months post-launch support", included: true },
          { name: "Advanced Analytics Dashboard", included: false },
          { name: "Email Marketing Integration", included: false },
          { name: "Multi-language Support", included: false }
        ]
      },
      {
        id: "professional",
        name: "Professional",
        description: "Comprehensive solution with advanced features and integrations",
        price: 95000,
        recommended: true,
        features: [
          { name: "Responsive Web Design", included: true },
          { name: "Advanced Product Catalog (unlimited products)", included: true },
          { name: "Shopping Cart & Checkout", included: true },
          { name: "Payment Gateway Integration (4 providers)", included: true },
          { name: "Advanced Inventory Management System", included: true },
          { name: "Customer Account Portal with Wishlist", included: true },
          { name: "Comprehensive Admin Dashboard", included: true },
          { name: "Email Marketing Integration", included: true },
          { name: "Advanced Analytics Dashboard", included: true },
          { name: "6 months post-launch support", included: true },
          { name: "Multi-language Support", included: false },
          { name: "Custom API Development", included: false }
        ]
      },
      {
        id: "enterprise",
        name: "Enterprise",
        description: "Full-featured platform with custom integrations and priority support",
        price: 125000,
        recommended: false,
        features: [
          { name: "Responsive Web Design", included: true },
          { name: "Enterprise Product Catalog (unlimited)", included: true },
          { name: "Advanced Shopping Cart & Checkout", included: true },
          { name: "Payment Gateway Integration (unlimited)", included: true },
          { name: "Enterprise Inventory Management", included: true },
          { name: "Advanced Customer Portal", included: true },
          { name: "Enterprise Admin Dashboard", included: true },
          { name: "Email Marketing Integration", included: true },
          { name: "Advanced Analytics Dashboard", included: true },
          { name: "Multi-language Support", included: true },
          { name: "Custom API Development", included: true },
          { name: "12 months priority support", included: true }
        ]
      }
    ],
    timelinePhases: [
      {
        id: "phase1",
        title: "Discovery & Planning",
        duration: "2 weeks",
        description: "Requirements gathering, technical architecture design, and project roadmap creation with stakeholder alignment.",
        deliverables: [
          "Detailed requirements documentation",
          "Technical architecture blueprint",
          "Project timeline and milestones",
          "Design system and style guide"
        ]
      },
      {
        id: "phase2",
        title: "Design & Prototyping",
        duration: "3 weeks",
        description: "UI/UX design creation, interactive prototypes, and user flow optimization based on best practices and user research.",
        deliverables: [
          "High-fidelity mockups for all pages",
          "Interactive clickable prototype",
          "Responsive design specifications",
          "Design approval and sign-off"
        ]
      },
      {
        id: "phase3",
        title: "Core Development",
        duration: "6 weeks",
        description: "Frontend and backend development of core e-commerce features including product catalog, shopping cart, and checkout process.",
        deliverables: [
          "Fully functional product catalog",
          "Shopping cart and checkout system",
          "Payment gateway integration",
          "Customer account functionality"
        ]
      },
      {
        id: "phase4",
        title: "Advanced Features",
        duration: "4 weeks",
        description: "Implementation of inventory management, admin dashboard, analytics, and third-party integrations.",
        deliverables: [
          "Inventory management system",
          "Comprehensive admin dashboard",
          "Analytics and reporting tools",
          "Email marketing integration"
        ]
      },
      {
        id: "phase5",
        title: "Testing & Quality Assurance",
        duration: "2 weeks",
        description: "Comprehensive testing including functional, performance, security, and user acceptance testing across all devices.",
        deliverables: [
          "Test reports and bug fixes",
          "Performance optimization",
          "Security audit completion",
          "Cross-browser compatibility verification"
        ]
      },
      {
        id: "phase6",
        title: "Deployment & Launch",
        duration: "1 week",
        description: "Production deployment, data migration, final testing, and go-live support with monitoring and immediate issue resolution.",
        deliverables: [
          "Production environment setup",
          "Data migration completion",
          "Launch monitoring and support",
          "Documentation and training materials"
        ]
      }
    ],
    terms: [
      {
        title: "Payment Terms",
        content: `Payment will be structured in milestone-based installments:\n• 30% upon contract signing and project kickoff\n• 30% upon completion of design phase and approval\n• 30% upon completion of development and testing\n• 10% upon successful launch and final acceptance\n\nAll payments are due within 15 days of invoice date. Late payments may incur a 1.5% monthly interest charge.`
      },
      {
        title: "Project Timeline",
        content: `The estimated project duration is 16-20 weeks from contract signing to launch. Timeline is contingent upon:\n• Timely client feedback and approvals\n• Availability of required content and assets\n• No major scope changes during development\n\nAny delays caused by client-side factors may extend the timeline accordingly. We will provide weekly progress updates and maintain transparent communication throughout the project.`
      },
      {
        title: "Scope Changes",
        content: `This proposal covers the features and functionality outlined in the Feature Recommendations section. Any additional features or significant changes to requirements will be evaluated and quoted separately through our change request process.\n\nMinor adjustments and refinements within the agreed scope are included. Major scope changes may affect timeline and budget, which will be communicated and approved before implementation.`
      },
      {
        title: "Intellectual Property",
        content: `Upon final payment, all custom code, designs, and deliverables created specifically for this project will become the property of TechRetail Solutions Inc.\n\nWe retain rights to:\n• Reusable code libraries and frameworks\n• Third-party components and licenses\n• General methodologies and approaches\n\nWe may showcase the project in our portfolio unless a non-disclosure agreement specifies otherwise.`
      },
      {
        title: "Support & Maintenance",
        content: `Post-launch support is included as specified in the selected pricing tier:\n• Essential: 3 months of bug fixes and technical support\n• Professional: 6 months of support and minor updates\n• Enterprise: 12 months of priority support and enhancements\n\nOngoing maintenance packages are available separately for continued support, security updates, and feature enhancements beyond the included period.`
      },
      {
        title: "Warranties & Limitations",
        content: `We warrant that all deliverables will be free from defects in workmanship and will function as specified for 90 days post-launch. We will promptly address any issues reported during this period at no additional cost.\n\nWe are not liable for:\n• Third-party service outages or failures\n• Issues caused by unauthorized modifications\n• Data loss due to client infrastructure\n• Indirect or consequential damages\n\nOur total liability is limited to the project contract value.`
      }
    ],
    contactInfo: {
      email: "sales@webdevpro.com",
      phone: "+1 (555) 123-4567",
      website: "www.webdevpro.com"
    }
  });

  const sections = [
    { id: 'executive-summary', number: '1.', title: 'Executive Summary' },
    { id: 'problem-understanding', number: '2.', title: 'Problem Understanding' },
    { id: 'feature-recommendations', number: '3.', title: 'Feature Recommendations' },
    { id: 'pricing', number: '4.', title: 'Pricing Options' },
    { id: 'timeline', number: '5.', title: 'Project Timeline' },
    { id: 'terms', number: '6.', title: 'Terms & Conditions' },
    { id: 'cta', number: '7.', title: 'Next Steps' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections?.map(s => document.getElementById(s?.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sectionElements?.length - 1; i >= 0; i--) {
        const element = sectionElements?.[i];
        if (element && element?.offsetTop <= scrollPosition) {
          setActiveSection(sections?.[i]?.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSectionClick = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element?.offsetTop - offset;
      window.scrollTo({ top: elementPosition, behavior: 'smooth' });
    }
  };

  const handleEdit = () => {
    console.log('Edit proposal');
  };

  const handleExport = (options) => {
    console.log('Exporting proposal with options:', options);
  };

  const handleShare = () => {
    setIsShareModalOpen(true);
  };

  const handleDownload = () => {
    setIsExportModalOpen(true);
  };

  const handleDuplicate = () => {
    console.log('Duplicating proposal');
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this proposal?')) {
      console.log('Deleting proposal');
      navigate('/dashboard');
    }
  };

  const updateExecutiveSummary = (content) => {
    setProposalData(prev => ({ ...prev, executiveSummary: content }));
  };

  const updateProblems = (problems) => {
    setProposalData(prev => ({ ...prev, problems }));
  };

  const updateFeatures = (features) => {
    setProposalData(prev => ({ ...prev, features }));
  };

  const updatePricing = (tiers) => {
    setProposalData(prev => ({ ...prev, pricingTiers: tiers }));
  };

  const updateTerms = (terms) => {
    setProposalData(prev => ({ ...prev, terms }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Breadcrumbs />
      <ProposalHeader proposal={proposalData} onEdit={handleEdit} />
      <main className="main-content pb-32">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <aside className="lg:col-span-3">
              <TableOfContents
                sections={sections}
                activeSection={activeSection}
                onSectionClick={handleSectionClick}
              />
            </aside>

            <div className="lg:col-span-9 space-y-8">
              <div className="flex items-center justify-end">
                <QuickActionMenu
                  onEdit={handleEdit}
                  onDuplicate={handleDuplicate}
                  onDownload={handleDownload}
                  onShare={handleShare}
                  onDelete={handleDelete}
                />
              </div>

              <ExecutiveSummary
                content={proposalData?.executiveSummary}
                onUpdate={updateExecutiveSummary}
              />

              <ProblemUnderstanding
                problems={proposalData?.problems}
                onUpdate={updateProblems}
              />

              <FeatureRecommendations
                features={proposalData?.features}
                onUpdate={updateFeatures}
              />

              <PricingTable
                tiers={proposalData?.pricingTiers}
                onUpdate={updatePricing}
              />

              <Timeline milestones={proposalData?.timelinePhases} />

              <TermsAndConditions
                terms={proposalData?.terms}
                onUpdate={updateTerms}
              />

              <CallToAction contactInfo={proposalData?.contactInfo} />
            </div>
          </div>
        </div>
      </main>
      <ContextualActionBar
        onEdit={handleEdit}
        onExport={handleDownload}
        onShare={handleShare}
        onDownload={handleDownload}
        showEdit={true}
        showExport={true}
        showShare={true}
        showDownload={true}
      />
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        onExport={handleExport}
      />
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        proposalId={proposalData?.id}
      />
    </div>
  );
};

export default ProposalPreview;