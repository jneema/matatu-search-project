export const DetailRow = ({ label, value }) => {
  if (value == null || value === "") return null;
  return (
    <div className="flex justify-between items-center py-1 border-b border-gray-100 last:border-0">
      <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
        {label}
      </span>
      <span className="text-xs font-semibold text-gray-600 text-right max-w-[60%]">
        {value}
      </span>
    </div>
  );
};
