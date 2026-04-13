import { Check } from "lucide-react";
import type { CoaData } from "@/data/products";

interface CoaCardProps {
  name: string;
  form: string;
  coa: CoaData;
  compact?: boolean;
  coaUrl?: string;
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

export default function CoaCard({ name, coa, compact, coaUrl }: CoaCardProps) {
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
    <div className="bg-card rounded-card border border-border overflow-hidden hover:border-gold/30 hover:shadow-[0_8px_30px_-8px_hsl(38_55%_52%/0.15)] transition-all duration-300">
      {/* Header */}
      <div className="bg-navy p-5">
        <h3 className="font-display text-lg text-primary-foreground">{name}</h3>
        <p className="text-[11px] text-primary-foreground/40 font-body mt-0.5">{coa.form}</p>
      </div>

      {/* Test Results Grid */}
      <div className="p-5">
        <div className="grid grid-cols-3 gap-4 mb-4">
          <CoaField label="Purity" value={coa.purity} pass />
          <CoaField label="Assay" value={coa.assay} pass />
          <CoaField label="Identity" value={coa.identity} pass />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <CoaField label="Heavy Metals" value={coa.heavyMetals} pass />
          <CoaField label="TAMC" value={coa.tamc} pass />
          <CoaField label="TYMC" value={coa.tymc} pass />
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-border px-5 py-3 flex items-center justify-between">
        <span className="text-[10px] text-muted-foreground font-body">Sku: {coa.sku}</span>
        <span className="text-[10px] text-muted-foreground font-body">{coa.date}</span>
      </div>

      <div className="px-5 pb-5">
        <a
          href={coaUrl || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full text-primary-foreground text-xs font-body font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 uppercase tracking-wider ${coaUrl ? "bg-emerald-500 hover:bg-emerald-600" : "bg-muted-foreground/30 cursor-not-allowed pointer-events-none"}`}
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          {coaUrl ? "View COA" : "COA Coming Soon"}
        </a>
      </div>
    </div>
  );
}
