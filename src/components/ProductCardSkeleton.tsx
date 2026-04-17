export default function ProductCardSkeleton() {
  return (
    <div className="relative bg-white/[0.03] rounded-2xl border border-white/[0.06] overflow-hidden animate-pulse">
      <div className="aspect-[4/3] bg-gradient-to-br from-navy-alt via-white/[0.02] to-navy-alt border-b border-white/[0.05]" />
      <div className="p-5 space-y-3">
        <div className="h-5 bg-white/[0.06] rounded w-2/3" />
        <div className="h-3 bg-white/[0.04] rounded w-1/3" />
        <div className="h-3 bg-gold/10 rounded w-1/4" />
        <div className="flex gap-2 pt-1">
          <div className="h-4 bg-white/[0.04] rounded-full w-12" />
          <div className="h-4 bg-white/[0.04] rounded-full w-16" />
          <div className="h-4 bg-white/[0.04] rounded-full w-20" />
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
          <div className="h-7 bg-white/[0.06] rounded w-16" />
          <div className="h-9 bg-gold/20 rounded-lg w-20" />
        </div>
      </div>
    </div>
  );
}
