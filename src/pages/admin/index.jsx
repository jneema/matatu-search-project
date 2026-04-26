import { useState, useEffect, useCallback } from "react";
import {
  CheckCircle,
  XCircle,
  RefreshCw,
  MapPin,
  Bus,
  Route,
} from "lucide-react";
import { get, post } from "../../api/crud";
import Table from "../../components/table";
import ApproveBtn from "../../components/approve-button";
import { Badge } from "../../components/badge";
import StagesTable from "./stages-table";
import SaccosTable from "./sacco-table";
import RoutesTable from "./routes-table";

const TABS = ["pending", "all"];

const SECTIONS = [
  { key: "stages", label: "Stages", icon: MapPin, Component: StagesTable },
  { key: "saccos", label: "Saccos", icon: Bus, Component: SaccosTable },
  { key: "routes", label: "Routes", icon: Route, Component: RoutesTable },
];

const Admin = () => {
  const [section, setSection] = useState("stages");
  const [tab, setTab] = useState("pending");

  const active = SECTIONS.find((s) => s.key === section);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <h1 className="text-lg font-extrabold text-gray-900">Admin</h1>
        <span className="text-xs text-gray-400">Matatu Data Review</span>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        <div className="flex gap-2">
          {SECTIONS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => {
                setSection(key);
                setTab("pending");
              }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
                section === key
                  ? "bg-gray-900 text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Icon className="w-4 h-4" /> {label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4 border-b border-gray-200">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`pb-2 text-sm font-semibold capitalize transition-colors border-b-2 ${
                tab === t
                  ? "border-gray-900 text-gray-900"
                  : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
            >
              {t === "pending" ? "Pending Review" : "All"}
            </button>
          ))}
        </div>

        <active.Component key={`${section}-${tab}`} tab={tab} />
      </div>
    </div>
  );
};

export default Admin;
