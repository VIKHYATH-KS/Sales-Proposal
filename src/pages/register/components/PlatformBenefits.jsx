import React from 'react';
import Icon from '../../../components/AppIcon';

const PlatformBenefits = () => {
  const benefits = [
    {
      icon: "Zap",
      title: "Lightning Fast Generation",
      description: "Create professional proposals in minutes, not hours. Our AI-powered system processes your requirements instantly."
    },
    {
      icon: "Target",
      title: "Precision Matching",
      description: "Advanced algorithms analyze client needs and match them with optimal solutions and pricing structures."
    },
    {
      icon: "Shield",
      title: "Enterprise Security",
      description: "Bank-level encryption protects your sensitive business data and client information at all times."
    },
    {
      icon: "TrendingUp",
      title: "Higher Win Rates",
      description: "Professional, customized proposals increase your chances of closing deals by up to 40%."
    },
    {
      icon: "Users",
      title: "Team Collaboration",
      description: "Share proposals, gather feedback, and collaborate seamlessly with your entire sales team."
    },
    {
      icon: "BarChart3",
      title: "Analytics & Insights",
      description: "Track proposal performance, conversion rates, and identify winning strategies with detailed analytics."
    }
  ];

  const stats = [
    { value: "10,000+", label: "Proposals Generated" },
    { value: "95%", label: "Customer Satisfaction" },
    { value: "3x", label: "Faster Creation" },
    { value: "24/7", label: "Support Available" }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Join Thousands of Sales Professionals
        </h2>
        <p className="text-muted-foreground">
          Transform your proposal creation process with AI-powered automation and intelligent insights.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {stats?.map((stat, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary mb-1">{stat?.value}</div>
            <div className="text-sm text-muted-foreground">{stat?.label}</div>
          </div>
        ))}
      </div>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Why Choose Our Platform?</h3>
        <div className="space-y-4">
          {benefits?.map((benefit, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon name={benefit?.icon} size={20} color="var(--color-primary)" />
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-1">{benefit?.title}</h4>
                <p className="text-sm text-muted-foreground">{benefit?.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <Icon name="Sparkles" size={24} color="var(--color-primary)" />
          <div>
            <h4 className="font-semibold text-foreground mb-2">Start Your Free Trial</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Get full access to all features for 14 days. No credit card required. Cancel anytime.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Icon name="Check" size={16} color="var(--color-success)" />
                Unlimited proposal generation
              </li>
              <li className="flex items-center gap-2">
                <Icon name="Check" size={16} color="var(--color-success)" />
                Advanced AI features
              </li>
              <li className="flex items-center gap-2">
                <Icon name="Check" size={16} color="var(--color-success)" />
                Priority support
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformBenefits;