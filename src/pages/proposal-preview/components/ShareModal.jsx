import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ShareModal = ({ isOpen, onClose, proposalId }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const shareUrl = `https://proposals.example.com/view/${proposalId}`;

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendEmail = () => {
    console.log('Sending email to:', email, 'with message:', message);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[1200] flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg shadow-elevated max-w-lg w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-foreground">Share Proposal</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-muted/50 transition-colors"
            aria-label="Close modal"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Share via Link
            </label>
            <div className="flex items-center gap-2">
              <Input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1"
              />
              <Button
                variant={copied ? 'success' : 'outline'}
                iconName={copied ? 'Check' : 'Copy'}
                onClick={handleCopyLink}
              >
                {copied ? 'Copied' : 'Copy'}
              </Button>
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <label className="block text-sm font-medium text-foreground mb-3">
              Send via Email
            </label>
            <div className="space-y-4">
              <Input
                type="email"
                label="Recipient Email"
                placeholder="client@example.com"
                value={email}
                onChange={(e) => setEmail(e?.target?.value)}
              />
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Message (Optional)
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e?.target?.value)}
                  placeholder="Add a personal message..."
                  className="w-full min-h-[100px] px-4 py-3 bg-background border border-input rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-y"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-6 pt-6 border-t border-border">
          <Button
            variant="default"
            iconName="Send"
            iconPosition="left"
            onClick={handleSendEmail}
            disabled={!email}
            fullWidth
          >
            Send Email
          </Button>
          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;