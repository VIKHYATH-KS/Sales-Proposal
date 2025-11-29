import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/Header';
import Breadcrumbs from '../../components/Breadcrumbs';
import RegistrationForm from './components/RegistrationForm';
import PlatformBenefits from './components/PlatformBenefits';
import TrustSignals from './components/TrustSignals';
import Icon from '../../components/AppIcon';

const Register = () => {
  return (
    <>
      <Helmet>
        <title>Create Account - Sales Proposal Generator</title>
        <meta name="description" content="Join thousands of sales professionals using AI-powered proposal generation. Create your free account and start generating professional proposals in minutes." />
      </Helmet>
      <Header />
      <Breadcrumbs />
      <div className="main-content bg-background">
        <div className="min-h-screen py-12 px-4 lg:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div className="lg:sticky lg:top-24">
                <div className="mb-8">
                  <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                    <Icon name="Sparkles" size={16} />
                    Start Your Free Trial
                  </div>
                  <h1 className="text-4xl font-bold text-foreground mb-4">
                    Create Your Account
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    Join our platform and revolutionize your proposal creation process with AI-powered automation.
                  </p>
                </div>

                <div className="hidden lg:block">
                  <PlatformBenefits />
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-card border border-border rounded-lg shadow-soft p-8">
                  <RegistrationForm />
                </div>

                <TrustSignals />

                <div className="lg:hidden">
                  <PlatformBenefits />
                </div>

                <div className="bg-muted/30 border border-border rounded-lg p-6">
                  <div className="flex items-start gap-3">
                    <Icon name="HelpCircle" size={20} color="var(--color-primary)" />
                    <div>
                      <h3 className="font-medium text-foreground mb-2">Need Help?</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Our support team is available 24/7 to assist you with any questions.
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <button className="text-sm text-primary hover:underline flex items-center gap-1">
                          <Icon name="Mail" size={14} />
                          support@salesproposal.com
                        </button>
                        <button className="text-sm text-primary hover:underline flex items-center gap-1">
                          <Icon name="MessageCircle" size={14} />
                          Live Chat
                        </button>
                        <button className="text-sm text-primary hover:underline flex items-center gap-1">
                          <Icon name="Phone" size={14} />
                          +1 (555) 123-4567
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="border-t border-border bg-card mt-12">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                &copy; {new Date()?.getFullYear()} Sales Proposal Generator. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </button>
                <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </button>
                <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Cookie Policy
                </button>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Register;