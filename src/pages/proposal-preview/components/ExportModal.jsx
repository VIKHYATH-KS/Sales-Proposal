import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const ExportModal = ({ isOpen, onClose, onExport }) => {
  const [exportFormat, setExportFormat] = useState('pdf');
  const [includeBranding, setIncludeBranding] = useState(true);
  const [includeWatermark, setIncludeWatermark] = useState(false);

  if (!isOpen) return null;

  const handleExport = () => {
    onExport({
      format: exportFormat,
      includeBranding,
      includeWatermark
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[1200] flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg shadow-elevated max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-foreground">Export Proposal</h3>
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
              Export Format
            </label>
            <div className="space-y-2">
              <button
                onClick={() => setExportFormat('pdf')}
                className={`w-full flex items-center gap-3 p-4 rounded-lg border transition-all ${
                  exportFormat === 'pdf' ?'border-primary bg-primary/5' :'border-border bg-background hover:bg-muted/30'
                }`}
              >
                <Icon name="FileText" size={24} className={exportFormat === 'pdf' ? 'text-primary' : 'text-muted-foreground'} />
                <div className="flex-1 text-left">
                  <div className="font-medium text-foreground">PDF Document</div>
                  <div className="text-sm text-muted-foreground">Professional format for sharing</div>
                </div>
                {exportFormat === 'pdf' && <Icon name="Check" size={20} className="text-primary" />}
              </button>

              <button
                onClick={() => setExportFormat('html')}
                className={`w-full flex items-center gap-3 p-4 rounded-lg border transition-all ${
                  exportFormat === 'html' ?'border-primary bg-primary/5' :'border-border bg-background hover:bg-muted/30'
                }`}
              >
                <Icon name="Code" size={24} className={exportFormat === 'html' ? 'text-primary' : 'text-muted-foreground'} />
                <div className="flex-1 text-left">
                  <div className="font-medium text-foreground">HTML Page</div>
                  <div className="text-sm text-muted-foreground">Interactive web format</div>
                </div>
                {exportFormat === 'html' && <Icon name="Check" size={20} className="text-primary" />}
              </button>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-border">
            <Checkbox
              label="Include company branding"
              description="Add logo and brand colors"
              checked={includeBranding}
              onChange={(e) => setIncludeBranding(e?.target?.checked)}
            />
            <Checkbox
              label="Add watermark"
              description="Mark as draft or confidential"
              checked={includeWatermark}
              onChange={(e) => setIncludeWatermark(e?.target?.checked)}
            />
          </div>
        </div>

        <div className="flex items-center gap-3 mt-6 pt-6 border-t border-border">
          <Button
            variant="default"
            iconName="Download"
            iconPosition="left"
            onClick={handleExport}
            fullWidth
          >
            Export Proposal
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

export default ExportModal;