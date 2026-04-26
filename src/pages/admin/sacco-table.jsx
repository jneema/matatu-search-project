import { useCallback, useEffect, useState } from "react";
import ApproveBtn from "../../components/approve-button";
import { Badge } from "../../components/badge";
import Table from "../../components/table";
import { get, post } from "../../api/crud";

const SaccosTable = ({ tab }) => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    setLoading(true);
    const qs =
      tab === "pending" ? "?is_verified=false&limit=200" : "?limit=200";
    get(`/saccos${qs}`)
      .then(setRows)
      .finally(() => setLoading(false));
  }, [tab]);

  useEffect(() => {
    load();
  }, [load]);

  const approve = async (id) => {
    await post(`/saccos/${id}/verify`, { is_verified: true });
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, is_verified: true } : r)),
    );
  };

  return (
    <Table
      loading={loading}
      empty="No saccos found."
      cols={[
        "Name",
        "Vehicle",
        "Terminus",
        "Electric",
        "Ratings",
        "Status",
        "",
      ]}
      rows={rows.map((s) => (
        <tr key={s.id} className="hover:bg-gray-50">
          <td className="px-4 py-3 font-medium text-gray-900">{s.name}</td>
          <td className="px-4 py-3 text-gray-500">{s.vehicle_type}</td>
          <td className="px-4 py-3 text-gray-500">{s.terminus_area}</td>
          <td className="px-4 py-3 text-gray-500">
            {s.is_electric ? "Yes" : "No"}
          </td>
          <td className="px-4 py-3 text-gray-500 text-xs">
            Safety {s.safety_rating}/5 · Comfort {s.comfort_rating}/5
          </td>
          <td className="px-4 py-3">
            <Badge
              active={s.is_verified}
              label={s.is_verified ? "Verified" : "Pending"}
            />
          </td>
          <td className="px-4 py-3">
            <ApproveBtn
              approved={s.is_verified}
              onClick={() => approve(s.id)}
            />
          </td>
        </tr>
      ))}
    />
  );
};

export default SaccosTable;
