import React from 'react';
import Icon from '../../../components/AppIcon';

const CallToAction = ({ contactInfo }) => {
  return (
    <div id="cta" className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-lg p-8 scroll-mt-24">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-foreground mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-lg text-muted-foreground mb-8">
          Let's transform your vision into reality. Contact us today to discuss your project requirements and begin your journey to success.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <button className="w-full sm:w-auto px-8 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
            <Icon name="Send" size={20} />
            Accept Proposal
          </button>
          <button className="w-full sm:w-auto px-8 py-3 bg-card text-foreground border border-border rounded-md font-medium hover:bg-muted/50 transition-colors flex items-center justify-center gap-2">
            <Icon name="MessageSquare" size={20} />
            Schedule Meeting
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-border">
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="Mail" size={24} className="text-primary" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">Email</span>
            <a href={`mailto:${contactInfo?.email}`} className="text-foreground hover:text-primary transition-colors">
              {contactInfo?.email}
            </a>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="Phone" size={24} className="text-primary" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">Phone</span>
            <a href={`tel:${contactInfo?.phone}`} className="text-foreground hover:text-primary transition-colors">
              {contactInfo?.phone}
            </a>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="Globe" size={24} className="text-primary" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">Website</span>
            <a href={contactInfo?.website} target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">
              {contactInfo?.website}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;