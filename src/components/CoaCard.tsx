import { useState } from "react";
import { Check, ExternalLink, X } from "lucide-react";
import type { CoaData } from "@/data/products";

interface CoaCardProps {
  name: string;
  form: string;
  coa: CoaData;
  compact?: boolean;
  coaUrl?: string;
  coaImage?: string;
}

function CoaField({ label, value, pass }: { label: string; value: string; pass?: boolean }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-body">{label}</span>
      <span className={`text-sm font-body font-semibold flex items-center gap-1 ${pass ? "text-emerald-400" : "text-foreground"}`}>
        {value}
        {pass && <Check className="h-3 w-3 text-emerald-400" />}
      </span>
    </div>
  );
}

export default function CoaCard({ name, coa, compact, coaUrl, coaImage }: CoaCardProps) {
  const [showModal, setShowModal] = useState(false);

  if (compact) {
    return (
      <div className="h-full flex flex-col bg-navy rounded-t-2xl overflow-hidden">
        <div className="px-4 pt-4 pb-2">
          <p className="font-display text-primary-foreground text-sm leading-tight">{name}</p>
          <p className="text-[9px] text-primary-foreground/40 font-body mt-0.5 truncate">{coa.form}</p>
        </div>
        <div className="grid grid-cols-3 gap-px bg-border/10 px-3 pb-2">
          <CoaField label="Purity" value={coa.purity} pass />
          <CoaField label="Assay" value={coa.assay} pass />
          <CoaField label="Identity" value={coa.identity} pass />
        </div>
        <div className="grid grid-cols-3 gap-px bg-border/10 px-3 pb-3">
          <CoaField label="Heavy Metals" value={coa.heavyMetals} pass />
          <CoaField label="TAMC" value={coa.tamc} pass />
          <CoaField label="TYMC" value={coa.tymc} pass />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-card rounded-2xl border border-border overflow-hidden hover:border-gold/30 hover:shadow-[0_8px_30px_-8px_hsl(38_55%_52%/0.15)] transition-all duration-300 group">
        {/* COA Image Preview */}
        {coaImage && (
          <button
            onClick={() => setShowModal(true)}
            className="w-full aspect-[8.5/11] overflow-hidden bg-white cursor-pointer relative"
          >
            <img
              src={coaImage}
              alt={`Certificate of Analysis for ${name}`}
              className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/10 transition-colors duration-300 flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-navy/80 text-white text-xs font-body font-semibold px-4 py-2 rounded-lg backdrop-blur-sm">
                Click to View
              </span>
            </div>
          </button>
        )}

        {/* Header */}
        <div className="bg-navy p-4">
          <h3 className="font-display text-base text-primary-foreground">{name}</h3>
          <p className="text-[10px] text-primary-foreground/40 font-body mt-0.5">{coa.form}</p>
        </div>

        {/* Compact Test Results */}
        <div className="p-4">
          <div className="grid grid-cols-3 gap-3 mb-3">
            <CoaField label="Purity" value={coa.purity} pass />
            <CoaField label="Assay" value={coa.assay} pass />
            <CoaField label="Identity" value={coa.identity} pass />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <CoaField label="Heavy Metals" value={coa.heavyMetals} pass />
            <CoaField label="TAMC" value={coa.tamc} pass />
            <CoaField label="TYMC" value={coa.tymc} pass />
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-border px-4 py-2.5 flex items-center justify-between">
          <span className="text-[10px] text-muted-foreground font-body">Sku: {coa.sku}</span>
          <span className="text-[10px] text-muted-foreground font-body">{coa.date}</span>
        </div>

        {/* Actions */}
        <div className="px-4 pb-4 flex gap-2">
          {coaImage && (
            <button
              onClick={() => setShowModal(true)}
              className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-primary-foreground text-xs font-body font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 uppercase tracking-wider"
            >
              View COA
            </button>
          )}
          {coaUrl && (
            <a
              href={coaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${coaImage ? 'w-10 flex items-center justify-center' : 'flex-1 flex items-center justify-center gap-2'} border border-border text-muted-foreground hover:text-gold hover:border-gold/30 text-xs font-body font-semibold py-2.5 rounded-lg transition-colors uppercase tracking-wider`}
            >
              <ExternalLink className="h-3.5 w-3.5" />
              {!coaImage && <span>View on Drive</span>}
            </a>
          )}
          {!coaImage && !coaUrl && (
            <span className="flex-1 bg-muted-foreground/20 text-muted-foreground text-xs font-body font-semibold py-2.5 rounded-lg flex items-center justify-center uppercase tracking-wider cursor-not-allowed">
              COA Coming Soon
            </span>
          )}
        </div>
      </div>

      {/* Fullscreen Modal */}
      {showModal && coaImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between bg-navy px-5 py-3">
              <div>
                <h3 className="font-display text-primary-foreground text-lg">{name}</h3>
                <p className="text-[11px] text-primary-foreground/40 font-body">{coa.form}</p>
              </div>
              <div className="flex items-center gap-3">
                {coaUrl && (
                  <a
                    href={coaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-foreground/60 hover:text-gold transition-colors flex items-center gap-1.5 text-xs font-body"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Download
                  </a>
                )}
                <button
                  onClick={() => setShowModal(false)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-primary-foreground transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="overflow-auto max-h-[calc(90vh-60px)]">
              <img
                src={coaImage}
                alt={`Certificate of Analysis for ${name}`}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
