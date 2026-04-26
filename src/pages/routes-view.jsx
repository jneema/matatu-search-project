import React, { useState, useEffect, useCallback } from "react";
import {
  Clock,
  ArrowRight,
  ChevronRight,
  BookmarkPlus,
  BookmarkCheck,
  SearchX,
  Bus,
  AlertTriangle,
  Home,
  Star,
  Zap,
  ChevronDown,
  ChevronUp,
  Users,
  MapPin,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { removeRoute, saveRoute } from "../store/saved-routes";
import { getRoutes } from "../services/routes";
import { SCENARIO_TABS } from "../constants";
import { RouteCard } from "../components/route-card";

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
  const [activeTab, setActiveTab] = useState("ALL");

  const dispatch = useDispatch();
  const savedRoutes = useSelector((state) => state.savedRoutes.routes);

  const fetchRoutes = useCallback(() => {
    if (!selectedStartingPoint?.name || !selectedDestination?.name) return;
    setLoading(true);
    setError(null);

    getRoutes(selectedStartingPoint.name, selectedDestination.name)
      .then((data) => {
        const enrich = (options = []) =>
          options.map((opt) => ({
            ...opt,
            sacco: opt.sacco_name,
            fare: opt.off_peak_fare_kes,
            duration_mins: opt.avg_duration_mins,
            peak_fare: opt.peak_fare_kes,
            off_peak_fare: opt.off_peak_fare_kes,
            wait_mins_est: opt.departure_frequency_mins,

            vehicle_type: opt.vehicle_type || "14_seater",
            terminus_area: opt.destination,

            origin_stage: selectedStartingPoint,
            dest_stage: selectedDestination,
          }));

        const enrichedOptions = enrich(data.direct_routes || []);

        setTripData({
          ...data,
          all_options: enrichedOptions,
          scenarios: {
            EXPRESS: enrichedOptions.filter((opt) => opt.is_express),
            PANYA: enrichedOptions.filter((opt) => opt.is_panya),
            ALL: enrichedOptions,
          },
        });
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [selectedStartingPoint, selectedDestination]);

  useEffect(() => {
    fetchRoutes();
  }, [selectedStartingPoint, selectedDestination, fetchRoutes]);

  const allOptions = React.useMemo(
    () => tripData?.all_options ?? [],
    [tripData],
  );

  const scenarios = React.useMemo(() => tripData?.scenarios ?? {}, [tripData]);

  const availableTabs = SCENARIO_TABS.filter((t) =>
    t.key === "ALL" ? true : scenarios[t.key]?.length > 0,
  );

  const visibleOptions = React.useMemo(() => {
    const list =
      activeTab === "ALL" ? allOptions : (scenarios[activeTab] ?? []);

    const map = new Map();

    list.forEach((opt) => {
      map.set(opt.route_id, opt);
    });

    return Array.from(map.values());
  }, [activeTab, allOptions, scenarios]);

  const defaultExpanded = visibleOptions.length <= 3;

  const directionLabel =
    selectedDirection === "outbound" ? "Out of CBD →" : "← Into CBD";

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20">
      <div className="max-w-2xl mx-auto px-4 py-6">
        <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 mb-5 overflow-x-auto whitespace-nowrap no-scrollbar">
          <button
            onClick={() => setCurrentView("landing")}
            className="hover:text-green-600 transition-colors flex items-center gap-1"
          >
            <Home className="h-3 w-3" /> Home
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

        <header className="mb-5">
          <div className="flex items-center gap-2 mb-1.5">
            <span
              className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border ${
                selectedDirection === "outbound"
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-green-50 text-green-700 border-green-200"
              }`}
            >
              {directionLabel}
            </span>
            {!loading && !error && (
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                {visibleOptions.length}
                {visibleOptions.length === 1 ? "route" : "routes"}
              </span>
            )}
          </div>
          <h2 className="text-xl font-extrabold text-gray-900 tracking-tight leading-tight">
            {selectedStartingPoint?.name}
            <span className="text-gray-300 mx-2">→</span>
            {selectedDestination?.name}
          </h2>
        </header>

        {!loading && !error && availableTabs.length > 1 && (
          <div className="relative mb-4">
            <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1 pr-6">
              {availableTabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`shrink-0 px-3 py-1 rounded-md text-xs font-bold border transition-colors ${
                    activeTab === tab.key
                      ? "bg-gray-900 text-white border-gray-900"
                      : "bg-white text-gray-500 border-gray-200 hover:border-gray-400"
                  }`}
                >
                  {tab.label}
                  {tab.key !== "ALL" && scenarios[tab.key]?.length > 0 && (
                    <span className="ml-1 text-[10px] text-gray-400">
                      {scenarios[tab.key].length}
                    </span>
                  )}
                </button>
              ))}
            </div>
            <div className="pointer-events-none absolute right-0 top-0 bottom-1 w-8 bg-gradient-to-l from-gray-50 to-transparent" />
          </div>
        )}

        <div className="space-y-2">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-3 min-h-[320px]">
              <div className="w-6 h-6 border-2 border-gray-200 border-t-green-600 rounded-full animate-spin" />
              <p className="text-gray-400 text-xs font-semibold">
                Finding routes…
              </p>
            </div>
          ) : error ? (
            <div className="text-center py-14 bg-white border border-dashed border-red-200 rounded-xl px-6">
              <AlertTriangle className="h-8 w-8 text-red-200 mx-auto mb-3" />
              <p className="text-red-500 font-bold text-sm mb-1">
                Couldn't load routes
              </p>
              <p className="text-gray-400 text-xs mb-5">
                Check your connection and try again.
              </p>
              <button
                onClick={fetchRoutes}
                className="px-4 py-2 bg-gray-900 text-white text-xs font-bold rounded-lg hover:bg-gray-700 transition-colors"
              >
                Try again
              </button>
            </div>
          ) : visibleOptions.length > 0 ? (
            visibleOptions.map((option) => {
              const isSaved = savedRoutes.some((s) => s.id === option.route_id);
              return (
                <RouteCard
                  key={option.route_id}
                  option={option}
                  isSaved={isSaved}
                  defaultExpanded={defaultExpanded}
                  onToggleSave={() =>
                    isSaved
                      ? dispatch(removeRoute({ id: option.route_id }))
                      : dispatch(saveRoute({ id: option.route_id, ...option }))
                  }
                  onStartTrip={() => {
                    setSelectedRoute(option);
                    setCurrentView("trip");
                  }}
                />
              );
            })
          ) : (
            <div className="text-center py-14 bg-white border border-dashed border-gray-200 rounded-xl px-6">
              <SearchX className="h-8 w-8 text-gray-200 mx-auto mb-3" />
              <p className="text-gray-700 font-bold text-sm mb-1">
                No routes found
              </p>
              <p className="text-gray-400 text-xs mb-5 max-w-xs mx-auto">
                {activeTab !== "ALL"
                  ? `No ${activeTab.toLowerCase()} routes for this journey.`
                  : `No matatu routes found between ${selectedStartingPoint?.name} and ${selectedDestination?.name}.`}
              </p>
              {activeTab !== "ALL" ? (
                <button
                  onClick={() => setActiveTab("ALL")}
                  className="px-4 py-2 bg-green-600 text-white text-xs font-bold rounded-lg hover:bg-green-700 transition-colors"
                >
                  Show all routes
                </button>
              ) : (
                <button
                  onClick={() => setCurrentView("landing")}
                  className="px-4 py-2 bg-gray-100 text-gray-700 text-xs font-bold rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2 mx-auto"
                >
                  <Home className="h-3.5 w-3.5" /> Go Home
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
