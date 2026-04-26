import { useCallback, useEffect, useState } from "react";
import ApproveBtn from "../../components/approve-button";
import { Badge } from "../../components/badge";
import Table from "../../components/table";
import { get, post } from "../../api/crud";

const RoutesTable = ({ tab }) => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    setLoading(true);
    const qs =
      tab === "pending" ? "?route_status=inactive&limit=200" : "?limit=200";
    get(`/routes${qs}`)
      .then(setRows)
      .finally(() => setLoading(false));
  }, [tab]);

  useEffect(() => {
    load();
  }, [load]);

  const approve = async (id) => {
    await post(`/routes/${id}/verify`, { route_status: "active" });
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, route_status: "active" } : r)),
    );
  };

  const isActive = (r) => r.route_status === "active";

  return (
    <Table
      loading={loading}
      empty="No routes found."
      cols={[
        "Origin",
        "Destination",
        "Sacco",
        "Via",
        "Express",
        "Distance",
        "Status",
        "",
      ]}
      rows={rows.map((r) => (
        <tr key={r.id} className="hover:bg-gray-50">
          <td className="px-4 py-3 font-medium text-gray-900">
            {r.origin_stage_name ?? r.origin_stage_id}
          </td>
          <td className="px-4 py-3 text-gray-500">
            {r.dest_stage_name ?? r.dest_stage_id}
          </td>
          <td className="px-4 py-3 text-gray-500">
            {r.sacco_name ?? r.sacco_id}
          </td>
          <td className="px-4 py-3 text-gray-500 text-xs">
            {r.via_description || "—"}
          </td>
          <td className="px-4 py-3 text-gray-500">
            {r.is_express ? "Yes" : "No"}
          </td>
          <td className="px-4 py-3 text-gray-500">
            {r.distance_km ? `${r.distance_km} km` : "—"}
          </td>
          <td className="px-4 py-3">
            <Badge
              active={isActive(r)}
              label={isActive(r) ? "Active" : "Pending"}
            />
          </td>
          <td className="px-4 py-3">
            <ApproveBtn approved={isActive(r)} onClick={() => approve(r.id)} />
          </td>
        </tr>
      ))}
    />
  );
};

export default RoutesTable;
