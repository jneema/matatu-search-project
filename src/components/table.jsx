const Table = ({ cols, rows, loading, empty }) => {
  if (loading)
    return <p className="text-sm text-gray-400 py-8 text-center">Loading…</p>;
  if (!rows.length)
    return <p className="text-sm text-gray-400 py-8 text-center">{empty}</p>;
  return (
    <div className="overflow-x-auto rounded-md border border-gray-100">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
          <tr>
            {cols.map((c) => (
              <th key={c} className="px-4 py-3 text-left font-semibold">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">{rows}</tbody>
      </table>
    </div>
  );
};

export default Table;
