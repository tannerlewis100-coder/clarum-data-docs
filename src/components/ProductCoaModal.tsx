import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle2, ExternalLink, Shield, FlaskConical } from "lucide-react";
import { allProducts, type Product } from "@/data/products";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productSlug: string;
  productName: string;
}

const TEST_FIELDS = [
  { label: "Purity", key: "purity" as const },
  { label: "Assay", key: "assay" as const },
  { label: "Identity", key: "identity" as const },
  { label: "Heavy Metals", key: "heavyMetals" as const },
  { label: "TAMC", key: "tamc" as const },
  { label: "TYMC", key: "tymc" as const },
];

/** Match a WC slug to a local product entry. Tries exact id, then partial. */
export function getLocalCoa(slug: string): Product | undefined {
  if (!slug) return undefined;
  const s = slug.toLowerCase();
  // Exact id match first
  let match = allProducts.find((p) => p.id === s);
  if (match) return match;
  // Strip dosage suffixes for variant grouping
  const base = s.replace(/-\d+mg$|-\d+iu$|-\d+ml$|-01mg$|-r$|-s$/, "");
  match = allProducts.find((p) => p.id === base);
  if (match) return match;
  // Fallback: any product whose id starts with this slug or vice versa
  match = allProducts.find((p) => p.id.startsWith(s) || s.startsWith(p.id));
  return match;
}

export function hasCoa(p?: Product): boolean {
  return !!(p && (p.coaImage || p.coaUrl));
}

function getEmbedUrl(p: Product): string | null {
  if (p.coaEmbed) return p.coaEmbed;
  if (p.coaUrl) {
    const m = p.coaUrl.match(/\/file\/d\/([^/]+)/);
    if (m) return `https://drive.google.com/file/d/${m[1]}/preview`;
  }
  return null;
}

export default function ProductCoaModal({ open, onOpenChange, productSlug, productName }: Props) {
  const local = getLocalCoa(productSlug);
  const embedUrl = local ? getEmbedUrl(local) : null;
  const available = hasCoa(local);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl w-[95vw] max-h-[90vh] overflow-hidden p-0 bg-navy-alt border-gold/20 text-primary-foreground">
        {/* Header */}
        <div className="bg-navy border-b border-white/[0.06] px-6 py-4 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <FlaskConical className="h-3.5 w-3.5 text-gold" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-body font-semibold">
                Certificate of Analysis
              </span>
            </div>
            <DialogTitle className="font-display text-xl text-white leading-tight">
              {local?.name || productName}
              {local?.dosage && (
                <span className="text-white/30 text-base ml-2 font-body">{local.dosage}</span>
              )}
            </DialogTitle>
            {local && (
              <p className="text-[11px] text-white/40 font-body mt-1">
                Batch {local.coaBatch} · Tested {local.coa.date}
              </p>
            )}
          </div>
          {available ? (
            <span className="shrink-0 bg-emerald-500/15 text-emerald-400 text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1.5 font-body mr-8">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Pass
            </span>
          ) : (
            <span className="shrink-0 bg-white/10 text-white/40 text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full font-body mr-8">
              Pending
            </span>
          )}
        </div>

        {/* Body — scrollable */}
        <div className="overflow-y-auto max-h-[calc(90vh-180px)] p-6 space-y-5">
          {/* Image / iframe / placeholder */}
          {local?.coaImage ? (
            <div className="rounded-xl bg-white overflow-hidden border border-white/10">
              <img
                src={local.coaImage}
                alt={`Certificate of Analysis for ${local.name}`}
                className="w-full h-auto block"
                loading="lazy"
              />
            </div>
          ) : embedUrl ? (
            <div className="rounded-xl bg-white overflow-hidden" style={{ height: 600 }}>
              <iframe
                src={embedUrl}
                width="100%"
                height="600"
                style={{ border: "none" }}
                title={`COA for ${productName}`}
              />
            </div>
          ) : (
            <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] flex flex-col items-center justify-center gap-3 py-12 px-6 text-center">
              <Shield className="h-10 w-10 text-gold/60" />
              <p className="text-white/60 font-body text-sm">
                COA available upon batch release
              </p>
              <p className="text-white/30 font-body text-xs max-w-sm">
                This compound is analytically tested for purity, identity, heavy metals, microbial limits, and endotoxins. The certificate will be published here once the next batch clears the lab.
              </p>
            </div>
          )}

          {/* 6-Panel test grid */}
          {local && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {TEST_FIELDS.map((field) => {
                const value = (local.coa as unknown as Record<string, string>)[field.key] || "—";
                return (
                  <div
                    key={field.key}
                    className="bg-white/[0.03] border border-white/[0.06] rounded-lg px-3 py-2 text-center"
                  >
                    <p className="text-[9px] text-white/30 uppercase tracking-wider font-body mb-0.5">
                      {field.label}
                    </p>
                    <div className="flex items-center justify-center gap-1">
                      {available && <CheckCircle2 className="h-3 w-3 text-emerald-400 shrink-0" />}
                      <span className="text-[11px] text-white/70 font-body font-medium">{value}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <p className="text-[10px] text-white/25 font-body uppercase tracking-wider text-center pt-2">
            For in vitro laboratory research use only.
          </p>
        </div>

        {/* Footer actions */}
        {available && local?.coaUrl && (
          <div className="border-t border-white/[0.06] bg-navy px-6 py-4 flex items-center gap-3">
            <a
              href={local.coaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-gold text-navy text-[11px] font-body font-bold uppercase tracking-wider px-4 py-2.5 rounded-lg hover:bg-gold-light transition-colors"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              View Full Report
            </a>
            <a
              href={local.coaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-white/[0.04] hover:bg-white/[0.08] text-gold text-[11px] font-body font-semibold uppercase tracking-wider px-4 py-2.5 rounded-lg border border-white/[0.06] transition-colors"
            >
              Download COA
            </a>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
