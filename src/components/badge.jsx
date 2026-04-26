const STATUS_BADGE = {
  true: "bg-green-50 text-green-700",
  false: "bg-amber-50 text-amber-700",
};

export const Badge = ({ active, label }) => (
  <span
    className={`text-xs font-semibold px-2 py-0.5 rounded-full ${STATUS_BADGE[active]}`}
  >
    {label ?? (active ? "Active" : "Pending")}
  </span>
);
