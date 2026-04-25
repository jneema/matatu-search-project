export const FareTypePill = ({ fareTypeNow, isOffPeakNow }) => {
  if (isOffPeakNow)
    return (
      <span className="text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded border bg-green-50 text-green-700 border-green-200">
        Off-peak
      </span>
    );
  if (fareTypeNow === "PEAK")
    return (
      <span className="text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded border bg-amber-50 text-amber-700 border-amber-200">
        Peak
      </span>
    );
  return null;
};
