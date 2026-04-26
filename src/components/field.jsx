const Field = ({ label, error, disabled, children }) => (
  <div className={disabled ? "opacity-50" : ""}>
    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
      {label}
    </label>
    {children}
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

export default Field;
