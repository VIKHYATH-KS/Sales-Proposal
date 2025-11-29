import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TrustSignals = () => {
  const securityBadges = [
  {
    icon: "Shield",
    label: "SSL Secured",
    description: "256-bit encryption"
  },
  {
    icon: "Lock",
    label: "GDPR Compliant",
    description: "Data protection"
  },
  {
    icon: "CheckCircle2",
    label: "SOC 2 Certified",
    description: "Security audited"
  }];


  const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Sales Director",
    company: "TechVision Solutions",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1b43e8b7f-1763295504724.png",
    avatarAlt: "Professional headshot of Caucasian woman with shoulder-length brown hair wearing navy blazer and white blouse",
    quote: "This platform reduced our proposal creation time by 70%. The AI-generated content is remarkably accurate and professional."
  },
  {
    name: "Michael Chen",
    role: "Business Development Manager",
    company: "Global Consulting Group",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_132439872-1763300631728.png",
    avatarAlt: "Professional headshot of Asian man with short black hair wearing charcoal suit and light blue shirt",
    quote: "Our win rate increased significantly after implementing this tool. The customization options are excellent."
  }];


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center gap-6 py-4">
        {securityBadges?.map((badge, index) =>
        <div key={index} className="flex flex-col items-center gap-2 text-center">
            <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
              <Icon name={badge?.icon} size={24} color="var(--color-success)" />
            </div>
            <div>
              <div className="text-sm font-medium text-foreground">{badge?.label}</div>
              <div className="text-xs text-muted-foreground">{badge?.description}</div>
            </div>
          </div>
        )}
      </div>
      <div className="space-y-4">
        {testimonials?.map((testimonial, index) =>
        <div key={index} className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-start gap-3 mb-3">
              <Image
              src={testimonial?.avatar}
              alt={testimonial?.avatarAlt}
              className="w-12 h-12 rounded-full object-cover" />

              <div>
                <div className="font-medium text-foreground">{testimonial?.name}</div>
                <div className="text-sm text-muted-foreground">{testimonial?.role}</div>
                <div className="text-xs text-muted-foreground">{testimonial?.company}</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground italic">"{testimonial?.quote}"</p>
            <div className="flex gap-1 mt-2">
              {[...Array(5)]?.map((_, i) =>
            <Icon key={i} name="Star" size={14} color="var(--color-warning)" className="fill-current" />
            )}
            </div>
          </div>
        )}
      </div>
    </div>);

};

export default TrustSignals;