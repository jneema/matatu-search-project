import { useCallback, useEffect, useState } from "react";
import ApproveBtn from "../../components/approve-button";
import { Badge } from "../../components/badge";
import Table from "../../components/table";
import { get, post } from "../../api/crud";

const StagesTable = ({ tab }) => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    setLoading(true);
    const qs = tab === "pending" ? "?is_active=false&limit=200" : "?limit=200";
    get(`/stages${qs}`)
      .then(setRows)
      .finally(() => setLoading(false));
  }, [tab]);

  useEffect(() => {
    load();
  }, [load]);

  const approve = async (id) => {
    await post(`/stages/${id}/verify`, { is_active: true });
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, is_active: true } : r)),
    );
  };

  return (
    <Table
      loading={loading}
      empty="No stages found."
      cols={["Name", "Area", "Type", "Direction", "Coords", "Status", ""]}
      rows={rows.map((s) => (
        <tr key={s.id} className="hover:bg-gray-50">
          <td className="px-4 py-3 font-medium text-gray-900">{s.name}</td>
          <td className="px-4 py-3 text-gray-500">{s.area}</td>
          <td className="px-4 py-3 text-gray-500 capitalize">{s.stage_type}</td>
          <td className="px-4 py-3 text-gray-500 capitalize">{s.direction}</td>
          <td className="px-4 py-3 text-gray-400 text-xs">
            {s.latitude && s.longitude ? (
              `${parseFloat(s.latitude).toFixed(4)}, ${parseFloat(s.longitude).toFixed(4)}`
            ) : (
              <span className="text-red-400">No coords</span>
            )}
          </td>
          <td className="px-4 py-3">
            <Badge active={s.is_active} />
          </td>
          <td className="px-4 py-3">
            <ApproveBtn approved={s.is_active} onClick={() => approve(s.id)} />
          </td>
        </tr>
      ))}
    />
  );
};

export default StagesTable;
