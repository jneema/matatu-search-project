import React, { useState, useEffect } from "react";
import {
  Clock,
  ArrowRight,
  ChevronRight,
  BookmarkPlus,
  BookmarkCheck,
  SearchX,
  TrendingUp,
  Bus,
  Zap,
  AlertTriangle,
  Home,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { removeRoute, saveRoute } from "../store/saved-routes";
import { getRoutes } from "../services/routes";

const SCENARIO_TABS = [
  { key: "all", label: "All" },
  { key: "express", label: "Express" },
  { key: "cheapest", label: "Best Value" },
  { key: "comfort", label: "Comfort" },
  { key: "electric", label: "Electric" },
  { key: "off_peak", label: "Off-Peak" },
];

const TAG_STYLES = {
  express: "bg-blue-50 text-blue-700 border-blue-200",
  cheapest: "bg-green-50 text-green-700 border-green-200",
  comfort: "bg-purple-50 text-purple-700 border-purple-200",
  electric: "bg-teal-50 text-teal-700 border-teal-200",
  off_peak: "bg-gray-50 text-gray-600 border-gray-200",
  mpesa: "bg-green-50 text-green-700 border-green-200",
  data_unverified: "bg-amber-50 text-amber-700 border-amber-200",
  nearby_stage: "bg-sky-50 text-sky-700 border-sky-200",
  fastest: "bg-orange-50 text-orange-700 border-orange-200",
};

const RoutesView = ({
  setCurrentView,
  selectedDestination,
  setSelectedRoute,
  selectedStartingPoint,
  selectedDirection,
}) => {
  const [tripData, setTripData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("all");

  const dispatch = useDispatch();
  const savedRoutes = useSelector((state) => state.savedRoutes.routes);

  const fetchRoutes = () => {
    if (!selectedStartingPoint?.name || !selectedDestination?.name) return;
    setLoading(true);
    setError(null);

    getRoutes(selectedStartingPoint.name, selectedDestination.name)
      .then((data) => {
        const enrichedOptions = data.all_options.map((option) => ({
          ...option,
          origin_stage: selectedStartingPoint,
          dest_stage: selectedDestination,
        }));

        const enrichedScenarios = {};
        Object.keys(data.scenarios).forEach((key) => {
          enrichedScenarios[key] = data.scenarios[key].map((option) => ({
            ...option,
            origin_stage: selectedStartingPoint,
            dest_stage: selectedDestination,
          }));
        });

        setTripData({
          ...data,
          all_options: enrichedOptions,
          scenarios: enrichedScenarios,
        });
        console.log(tripData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchRoutes();
  }, [selectedStartingPoint, selectedDestination]);

  const allOptions = tripData?.all_options ?? [];
  const scenarios = tripData?.scenarios ?? {};

  const availableTabs = SCENARIO_TABS.filter((t) => {
    if (t.key === "all") return true;
    return scenarios[t.key]?.length > 0;
  });

  const visibleOptions =
    activeTab === "all" ? allOptions : (scenarios[activeTab] ?? []);

  const directionLabel =
    selectedDirection === "outbound" ? "Out of CBD →" : "← Into CBD";

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20">
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6 overflow-x-auto whitespace-nowrap no-scrollbar">
          <button
            onClick={() => setCurrentView("landing")}
            className="hover:text-green-600 transition-colors flex items-center gap-1"
          >
            <Home className="h-3 w-3" />
            Home
          </button>
          <ChevronRight className="h-3 w-3 flex-shrink-0" />
          <button
            onClick={() => setCurrentView("direction")}
            className="hover:text-green-600 transition-colors"
          >
            {selectedDirection === "outbound" ? "Out of CBD" : "Into CBD"}
          </button>
          <ChevronRight className="h-3 w-3 flex-shrink-0" />
          <button
            onClick={() => setCurrentView("starting-point")}
            className="hover:text-green-600 transition-colors"
          >
            {selectedStartingPoint?.name ?? "Start"}
          </button>
          <ChevronRight className="h-3 w-3 flex-shrink-0" />
          <button
            onClick={() => setCurrentView("destination")}
            className="hover:text-green-600 transition-colors"
          >
            {selectedDestination?.name ?? "Destination"}
          </button>
          <ChevronRight className="h-3 w-3 flex-shrink-0" />
          <span className="text-green-600">Routes</span>
        </nav>

        <header className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border ${
                selectedDirection === "outbound"
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-green-50 text-green-700 border-green-200"
              }`}
            >
              {directionLabel}
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight leading-tight mt-2">
            {selectedStartingPoint?.name}
            <span className="text-gray-300 mx-2">→</span>
            {selectedDestination?.name}
          </h2>
          {!loading && !error && (
            <p className="text-gray-500 text-sm mt-1">
              {allOptions.length} {allOptions.length === 1 ? "route" : "routes"}{" "}
              found
            </p>
          )}
        </header>

        {!loading && !error && availableTabs.length > 1 && (
          <div className="relative mb-5">
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 pr-6">
              {availableTabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`shrink-0 px-3 py-1.5 rounded-md text-xs font-bold border transition-colors ${
                    activeTab === tab.key
                      ? "bg-gray-900 text-white border-gray-900"
                      : "bg-white text-gray-500 border-gray-200 hover:border-gray-400"
                  }`}
                >
                  {tab.label}
                  {tab.key !== "all" && scenarios[tab.key]?.length > 0 && (
                    <span
                      className={`ml-1.5 text-[10px] ${activeTab === tab.key ? "text-gray-300" : "text-gray-400"}`}
                    >
                      {scenarios[tab.key].length}
                    </span>
                  )}
                </button>
              ))}
            </div>
            <div className="pointer-events-none absolute right-0 top-0 bottom-1 w-8 bg-gradient-to-l from-gray-50 to-transparent" />
          </div>
        )}

        <div className="space-y-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-3 min-h-[320px]">
              <div className="w-8 h-8 border-2 border-gray-200 border-t-green-600 rounded-full animate-spin" />
              <p className="text-gray-400 text-sm">Finding routes…</p>
            </div>
          ) : error ? (
            <div className="text-center py-16 bg-white border border-dashed border-red-200 rounded-2xl px-6">
              <AlertTriangle className="h-10 w-10 text-red-200 mx-auto mb-3" />
              <p className="text-red-500 font-bold mb-1">
                Couldn't load routes
              </p>
              <p className="text-gray-400 text-sm mb-5">
                Check your connection and try again.
              </p>
              <button
                onClick={fetchRoutes}
                className="px-5 py-2.5 bg-gray-900 text-white text-sm font-bold rounded-xl hover:bg-gray-700 transition-colors"
              >
                Try again
              </button>
            </div>
          ) : visibleOptions.length > 0 ? (
            visibleOptions.map((option) => {
              const isSaved = savedRoutes.some((s) => s.id === option.route_id);
              const showDataWarning =
                option.data_confidence === "low" &&
                !option.tags?.includes("data_unverified");

              return (
                <div
                  key={option.route_id}
                  className="bg-white border border-gray-200 rounded-2xl overflow-hidden"
                >
                  <div className="p-4 sm:p-5">
                    {option.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {option.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 border rounded ${TAG_STYLES[tag] ?? "bg-gray-50 text-gray-500 border-gray-200"}`}
                          >
                            {tag.replace(/_/g, " ")}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-900 text-white rounded-xl flex items-center justify-center shrink-0">
                          <Bus className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1 text-green-600 mb-0.5">
                            <TrendingUp className="h-3 w-3" />
                            <span className="text-[9px] font-black uppercase tracking-widest">
                              Est. fare
                            </span>
                          </div>
                          <span className="text-xl font-black text-gray-900">
                            KES {option.fare}
                          </span>
                          {option.fare_type_now && (
                            <span className="ml-2 text-xs text-gray-400">
                              {option.fare_type_now}
                            </span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          isSaved
                            ? dispatch(removeRoute({ id: option.route_id }))
                            : dispatch(
                                saveRoute({ id: option.route_id, ...option }),
                              )
                        }
                        aria-label={
                          isSaved ? "Remove saved route" : "Save route"
                        }
                        className={`p-2 rounded-xl border transition-colors shrink-0 ${
                          isSaved
                            ? "bg-green-50 border-green-200 text-green-600"
                            : "bg-white border-gray-200 text-gray-300 hover:text-gray-500 hover:border-gray-300"
                        }`}
                      >
                        {isSaved ? (
                          <BookmarkCheck className="h-4 w-4" />
                        ) : (
                          <BookmarkPlus className="h-4 w-4" />
                        )}
                      </button>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm font-bold text-gray-800">
                        {option.sacco}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {option.via}
                        {option.vehicle_type &&
                          ` · ${option.vehicle_type.replace(/_/g, " ")}`}
                        {option.terminus_area &&
                          ` · Terminus: ${option.terminus_area}`}
                      </p>
                    </div>

                    {option.surge_active && (
                      <div className="mb-4 px-3 py-2.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-700 font-medium flex items-center gap-2">
                        <Zap className="h-3.5 w-3.5 shrink-0" />
                        Surge pricing active
                        {option.surge_reason ? ` — ${option.surge_reason}` : ""}
                      </div>
                    )}

                    {option.active_alerts?.map((alert, i) => (
                      <div
                        key={i}
                        className="mb-4 px-3 py-2.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-medium flex items-center gap-2"
                      >
                        <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                        {alert.message}
                      </div>
                    ))}

                    {showDataWarning && (
                      <div className="mb-4 px-3 py-2.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-700 font-medium flex items-center gap-2">
                        <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                        Fare unverified — confirm with conductor before boarding
                      </div>
                    )}

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-3 pt-4 border-t border-gray-100 mb-4">
                      <div>
                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">
                          Journey
                        </span>
                        <div className="flex items-center gap-1 text-xs font-bold text-gray-700">
                          <Clock className="h-3 w-3 text-gray-400 shrink-0" />
                          {option.duration_mins} min
                        </div>
                      </div>
                      <div>
                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">
                          Wait
                        </span>
                        <div className="flex items-center gap-1 text-xs font-bold text-gray-700">
                          <Clock className="h-3 w-3 text-gray-400 shrink-0" />~
                          {option.wait_mins_est} min
                        </div>
                      </div>
                      {option.safety_rating && (
                        <div>
                          <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">
                            Safety
                          </span>
                          <div className="text-xs font-bold text-gray-700">
                            {option.safety_rating}/5
                          </div>
                        </div>
                      )}
                      <div>
                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">
                          Payment
                        </span>
                        <div className="text-xs font-bold text-gray-700 truncate">
                          {option.payment_methods?.join(", ") ?? "Cash"}
                        </div>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedRoute(option);
                          setCurrentView("trip");
                        }}
                        className="flex-1 bg-green-600 text-white px-4 py-3 rounded-xl font-bold text-sm hover:bg-green-700 flex items-center justify-center gap-2 group transition-colors"
                      >
                        Start Trip
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-16 bg-white border border-dashed border-gray-200 rounded-2xl px-6">
              <SearchX className="h-10 w-10 text-gray-200 mx-auto mb-3" />
              <p className="text-gray-700 font-bold mb-1">No routes found</p>
              <p className="text-gray-400 text-sm mb-5 max-w-xs mx-auto">
                {activeTab !== "all"
                  ? `No ${activeTab.replace(/_/g, " ")} routes for this journey.`
                  : `No matatu routes found between ${selectedStartingPoint?.name} and ${selectedDestination?.name}.`}
              </p>
              {activeTab !== "all" ? (
                <button
                  onClick={() => setActiveTab("all")}
                  className="px-5 py-2.5 bg-green-600 text-white text-sm font-bold rounded-xl hover:bg-green-700 transition-colors"
                >
                  Show all routes
                </button>
              ) : (
                <button
                  onClick={() => setCurrentView("landing")}
                  className="px-5 py-2.5 bg-gray-100 text-gray-700 text-sm font-bold rounded-xl hover:bg-gray-200 transition-colors flex items-center gap-2 mx-auto"
                >
                  <Home className="h-4 w-4" />
                  Go Home
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoutesView;
