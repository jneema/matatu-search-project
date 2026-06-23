import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  IoArrowBackOutline,
  IoLocationOutline,
  IoTimeOutline,
  IoWalletOutline,
  IoCheckmarkCircleOutline,
  IoWarningOutline,
  IoFlashOutline,
  IoBusOutline,
  IoNavigateOutline,
  IoFlaskOutline,
  IoChevronDownOutline,
  IoSearchOutline,
  IoCloseOutline,
} from "react-icons/io5";
import TripMap from "../components/trip-map";
import LiveTripMap from "../components/live-trip-map";

const CBD_SPOTS = [
  { name: "Kencom",            lat: -1.2856, lng: 36.8250 },
  { name: "Archives",          lat: -1.2850, lng: 36.8259 },
  { name: "Koja",              lat: -1.2811, lng: 36.8228 },
  { name: "OTC / Odeon",       lat: -1.2833, lng: 36.8251 },
  { name: "GPO",               lat: -1.2861, lng: 36.8192 },
  { name: "Aga Khan Walk",     lat: -1.2871, lng: 36.8250 },
  { name: "Luthuli Ave",       lat: -1.2839, lng: 36.8284 },
  { name: "River Road",        lat: -1.2814, lng: 36.8244 },
  { name: "Ronald Ngala St",   lat: -1.2857, lng: 36.8279 },
  { name: "Moi Avenue",        lat: -1.2902, lng: 36.8278 },
  { name: "Mfangano St",       lat: -1.2880, lng: 36.8287 },
  { name: "University Way",    lat: -1.2819, lng: 36.8145 },
  { name: "City Market",       lat: -1.2837, lng: 36.8195 },
  { name: "Jeevanjee Gardens", lat: -1.2813, lng: 36.8197 },
  { name: "Railway Station",   lat: -1.2916, lng: 36.8286 },
];

const STEPS = {
  WAITING: "waiting",
  BOARDED: "boarded",
  ARRIVED: "arrived",
};

const TripModeView = ({
  setCurrentView,
  selectedRoute,
  selectedDirection,
  setSelectedRoute,
}) => {
  const [step, setStep] = useState(STEPS.WAITING);
  const [secondsLeft, setSecondsLeft] = useState(null);
  const [boardedAt, setBoardedAt] = useState(null);
  const [demoMode, setDemoMode] = useState(false);
  const [routeInfoOpen, setRouteInfoOpen] = useState(false);
  const [walkFromOverride, setWalkFromOverride] = useState(null);
  const [showWalkFromSearch, setShowWalkFromSearch] = useState(false);
  const [walkQuery, setWalkQuery] = useState("");
  const [walkSuggestions, setWalkSuggestions] = useState([]);
  const [walkSearching, setWalkSearching] = useState(false);

  const {
    sacco,
    via,
    vehicle_type,
    fare,
    fare_type_now,
    payment_methods = [],
    duration_mins,
    wait_mins_est,
    surge_active,
    surge_reason,
    active_alerts = [],
    tags = [],
  } = selectedRoute || {};

  const handleFarFromStage = useCallback(() => {
    setShowWalkFromSearch(true);
  }, []);

  const searchWalkFrom = useCallback(async (q) => {
    if (!q.trim()) { setWalkSuggestions([]); return; }
    setWalkSearching(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q + " Nairobi")}&format=json&limit=5&countrycodes=ke`
      );
      const data = await res.json();
      setWalkSuggestions(
        data.map((r) => ({ name: r.display_name.split(",").slice(0, 2).join(", "), lat: parseFloat(r.lat), lng: parseFloat(r.lon) }))
      );
    } catch {
      setWalkSuggestions([]);
    } finally {
      setWalkSearching(false);
    }
  }, []);

  const sanitizeCoord = (val) => {
    if (val === undefined || val === null) return null;
    const str = String(val);
    const parts = str.split(".");

    if (parts.length > 2) {
      return parseFloat(`${parts[0]}.${parts[1]}`);
    }
    return parseFloat(str);
  };

  const origin = useMemo(() => {
    const base =
      typeof selectedRoute?.origin_stage === "string"
        ? { name: selectedRoute.origin_stage }
        : selectedRoute?.origin_stage || { name: "Unknown Origin" };

    return {
      ...base,
      latitude: sanitizeCoord(base.latitude),
      longitude: sanitizeCoord(base.longitude),
    };
  }, [selectedRoute]);

  const destination = useMemo(() => {
    const base =
      typeof selectedRoute?.dest_stage === "string"
        ? { name: selectedRoute.dest_stage }
        : selectedRoute?.dest_stage || { name: "Unknown Destination" };

    return {
      ...base,
      latitude: sanitizeCoord(base.latitude),
      longitude: sanitizeCoord(base.longitude),
    };
  }, [selectedRoute]);

  const handleBoard = useCallback(() => {
    const now = new Date();
    setBoardedAt(now);
    setSecondsLeft(duration_mins * 60);
    setStep(STEPS.BOARDED);
  }, [duration_mins]);

  useEffect(() => {
    if (step !== STEPS.BOARDED || secondsLeft === null) return;
    if (secondsLeft <= 0) {
      setStep(STEPS.ARRIVED);
      return;
    }
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [step, secondsLeft]);

  const formatTime = (secs) => {
    if (secs === null || isNaN(secs)) return "--:--";
    const s = Math.max(0, secs);
    const m = Math.floor(s / 60);
    const rem = s % 60;
    return `${m}:${rem.toString().padStart(2, "0")}`;
  };

  const arrivalTimeStr = useMemo(() => {
    if (!boardedAt || !duration_mins) return null;
    const arr = new Date(boardedAt.getTime() + duration_mins * 60000);
    return arr.toLocaleTimeString("en-KE", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }, [boardedAt, duration_mins]);

  const progressPct = useMemo(() => {
    if (secondsLeft === null || !duration_mins) return 0;
    const total = duration_mins * 60;
    return Math.max(0, Math.min(100, ((total - secondsLeft) / total) * 100));
  }, [secondsLeft, duration_mins]);

  const directionHint =
    selectedDirection === "outbound"
      ? "Out of CBD → board on the outbound side"
      : "← Into CBD · board on the inbound side";

  if (step === STEPS.ARRIVED) {
    return (
      <div className="bg-white font-sans flex flex-col" style={{ height: "calc(100vh - 108px)" }}>
        <div className="relative flex-1 min-h-0">
          <TripMap
            originStage={origin}
            destStage={destination}
            height="100%"
            walkingMode="from_stage"
          />
        </div>
        <div className="bg-white px-5 pt-4 pb-6 flex flex-col gap-4">
          <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto" />
          <div className="text-left">
            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Alighted at</p>
            <p className="text-base font-extrabold text-gray-900 leading-tight">{destination?.name}</p>
            {destination?.landmark && (
              <p className="text-xs text-gray-500 mt-0.5">{destination.landmark}</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentView("landing")}
              className="px-4 py-3 text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors rounded-2xl border border-gray-200 hover:border-gray-300 whitespace-nowrap"
            >
              Go Home
            </button>
            <button
              onClick={() => {
                if (setSelectedRoute) setSelectedRoute(null);
                setCurrentView("routes");
              }}
              className="flex-1 bg-gray-900 text-white py-3 rounded-2xl font-extrabold text-sm active:scale-[0.98] transition-all"
            >
              Find Another Route
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === STEPS.BOARDED) {
    return (
      <div className="bg-white font-sans flex flex-col" style={{ height: "calc(100vh - 108px)" }}>
        <div
          className="relative flex-1 min-h-0"
        >
          <LiveTripMap
            originStage={origin}
            destStage={destination}
            demoMode={demoMode}
            simulationPhase="boarded"
          />

          <div className="absolute top-0 left-0 right-0 z-[1000]">
            <div className="bg-white px-4 py-3 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-green-600 rounded-lg flex items-center justify-center shrink-0">
                  <IoBusOutline className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none mb-0.5">
                    On board
                  </p>
                  <p className="text-sm font-extrabold text-gray-900 leading-none">
                    {sacco}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none mb-0.5">
                  Remaining
                </p>
                <p className="text-2xl font-black text-green-600 tabular-nums leading-none">
                  {formatTime(secondsLeft)}
                </p>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 z-[1000]">
            <div className="h-1 bg-white/20">
              <div
                className="h-full bg-green-500 transition-all duration-1000"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>

          {arrivalTimeStr && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[1000]">
              <div className="bg-gray-950/90 backdrop-blur-sm text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg whitespace-nowrap border border-white/10">
                Arriving around {arrivalTimeStr}
              </div>
            </div>
          )}
        </div>

        <div className="bg-white px-5 pt-4 pb-4 shadow-2xl flex flex-col gap-4">
          <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto" />

          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-4 pt-4 text-left">
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-0.5">
                Alight at
              </p>
              <p className="font-extrabold text-gray-900 text-base leading-tight">
                {destination?.name}
              </p>
              {destination?.landmark && (
                <p className="text-xs text-gray-500 mt-0.5">{destination.landmark}</p>
              )}
            </div>
            <div className="border-t border-gray-100 flex items-center gap-4 px-4 py-3">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest shrink-0">Journey</span>
              <span className="text-xs font-black text-gray-900">{duration_mins} min</span>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest shrink-0">Via</span>
              <span className="text-xs font-black text-gray-900 truncate">{via?.split(" ").slice(-1)[0] ?? "—"}</span>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest shrink-0">Fare</span>
              <span className="text-xs font-black text-gray-900">KES {fare}</span>
            </div>
          </div>

          {surge_active && (
            <div className="px-3 py-2.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-700 font-medium flex items-center gap-2">
              <IoFlashOutline className="h-3.5 w-3.5 shrink-0" />
              Surge pricing active{surge_reason ? ` — ${surge_reason}` : ""}
            </div>
          )}
          {active_alerts.map((alert, i) => (
            <div
              key={i}
              className="px-3 py-2.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-medium flex items-center gap-2"
            >
              <IoWarningOutline className="h-3.5 w-3.5 shrink-0" />
              {alert.message}
            </div>
          ))}

          <div className="flex items-center gap-2">
            <button
              onClick={() => setStep(STEPS.WAITING)}
              className="px-4 py-3 text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors rounded-2xl border border-gray-200 hover:border-gray-300 whitespace-nowrap"
            >
              ← Back
            </button>
            <button
              onClick={() => setStep(STEPS.ARRIVED)}
              className="flex-1 bg-green-600 text-white py-3 rounded-2xl font-extrabold text-sm hover:bg-green-700 active:scale-[0.98] transition-all flex items-center justify-center gap-1.5"
            >
              <IoCheckmarkCircleOutline className="h-4 w-4" />
              I've Arrived
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-10">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white px-4 pt-6 pb-4 sticky top-0 z-10 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentView("routes")}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              aria-label="Back to routes"
            >
              <IoArrowBackOutline className="h-5 w-5 text-gray-600" />
            </button>
            <div className="text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                Trip Plan
              </p>
              <p className="text-sm font-extrabold text-gray-900">{sacco}</p>
            </div>
            <div className="w-9" />
          </div>
        </div>

        <div className="px-4 py-5 space-y-3">
          {surge_active && (
            <div className="px-4 py-3 bg-amber-50 border border-amber-200 rounded-2xl text-sm text-amber-700 font-medium flex items-center gap-2">
              <IoFlashOutline className="h-4 w-4 shrink-0" />
              Surge pricing active{surge_reason ? ` — ${surge_reason}` : ""}
            </div>
          )}
          {active_alerts.map((alert, i) => (
            <div
              key={i}
              className="px-4 py-3 bg-red-50 border border-red-200 rounded-2xl text-sm text-red-700 font-medium flex items-center gap-2"
            >
              <IoWarningOutline className="h-4 w-4 shrink-0" />
              {alert.message}
            </div>
          ))}

          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <div className="flex items-stretch gap-4">
              <div className="flex flex-col items-center py-1 gap-1">
                <div className="w-3 h-3 rounded-full bg-green-500 ring-4 ring-green-100 shrink-0" />
                <div
                  className="w-px flex-1 bg-gray-200 my-1"
                  style={{ minHeight: 32 }}
                />
                <div className="w-3 h-3 rounded-full bg-gray-900 ring-4 ring-gray-100 shrink-0" />
              </div>
              <div className="flex flex-col justify-between flex-1 gap-5">
                <div>
                  <p className="text-[10px] font-black text-green-600 uppercase tracking-widest mb-1">
                    Board here
                  </p>
                  <p className="font-extrabold text-gray-900 text-base leading-tight">
                    {origin?.name}
                  </p>
                  {origin?.landmark && (
                    <p className="text-sm text-gray-500 mt-0.5">
                      {origin.landmark}
                    </p>
                  )}
                  <p className="text-xs text-gray-400 mt-1 font-medium">
                    {directionHint}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                    Alight at
                  </p>
                  <p className="font-extrabold text-gray-900 text-base leading-tight">
                    {destination?.name}
                  </p>
                  {destination?.landmark && (
                    <p className="text-sm text-gray-500 mt-0.5">
                      {destination.landmark}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
            <button
              onClick={() => setRouteInfoOpen((o) => !o)}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
            >
              <div className="w-7 h-7 bg-gray-900 rounded-lg flex items-center justify-center shrink-0">
                <IoBusOutline className="h-3.5 w-3.5 text-white" />
              </div>
              <div className="flex flex-1 items-center gap-4 min-w-0">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest shrink-0">Journey</span>
                <span className="text-xs font-black text-gray-900">{duration_mins} min</span>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest shrink-0">Wait</span>
                <span className="text-xs font-black text-gray-900">~{wait_mins_est} min</span>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest shrink-0">Fare</span>
                <span className="text-xs font-black text-gray-900">KES {fare}</span>
              </div>
              <IoChevronDownOutline
                className={`h-4 w-4 text-gray-400 shrink-0 transition-transform duration-200 ${routeInfoOpen ? "rotate-180" : ""}`}
              />
            </button>

            {routeInfoOpen && (
              <div className="px-4 pb-3 border-t border-gray-100">
                <p className="text-xs text-gray-500 mt-2.5">
                  {via}{vehicle_type ? ` · ${vehicle_type.replace(/_/g, " ")}` : ""}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {payment_methods.length > 0 ? payment_methods.join(" · ") : "Cash"}
                  {fare_type_now ? ` · ${fare_type_now} rate` : ""}
                </p>
                {tags.includes("express") && (
                  <span className="inline-block mt-2 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg">
                    Express
                  </span>
                )}
              </div>
            )}
          </div>

          {origin?.latitude && origin?.longitude && (
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
              <div className="px-4 pt-3 flex items-center justify-between gap-2">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  {demoMode ? "Simulating walk to stage" : "Walk to boarding stage"}
                </p>
                <button
                  onClick={() => setDemoMode((d) => !d)}
                  title={demoMode ? "Demo mode on — simulated GPS" : "Enable demo mode with simulated GPS"}
                  className={`flex items-center gap-1 text-[9px] font-black uppercase tracking-widest px-2.5 py-1.5 rounded-lg border transition-colors shrink-0 ${
                    demoMode
                      ? "bg-orange-500 text-white border-orange-500"
                      : "bg-gray-100 text-gray-400 border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <IoFlaskOutline className="h-3 w-3" />
                  {demoMode ? "Demo ON" : "Demo"}
                </button>
              </div>
              <div className="px-4 pb-6 text-left">
                <p className="text-sm font-bold text-gray-700">
                  {origin.name}
                </p>
                {walkFromOverride && (
                  <button
                    onClick={() => { setWalkFromOverride(null); setDemoMode(false); setShowWalkFromSearch(false); setWalkQuery(""); setWalkSuggestions([]); }}
                    className="flex items-center gap-1 text-[10px] text-blue-600 font-bold mt-1"
                  >
                    <IoLocationOutline className="h-3 w-3" />
                    {walkFromOverride.name}
                    <IoCloseOutline className="h-3 w-3 text-gray-400" />
                  </button>
                )}
              </div>

              {showWalkFromSearch && !walkFromOverride && (
                <div className="px-4 pb-3">
                  <p className="text-[10px] text-gray-500 mb-2">
                    You're far from the stage — where will you be walking from?
                  </p>

                  {selectedDirection !== "outbound" && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {CBD_SPOTS.map((spot) => (
                        <button
                          key={spot.name}
                          onClick={() => { setWalkFromOverride(spot); setShowWalkFromSearch(false); setWalkQuery(""); setWalkSuggestions([]); }}
                          className="flex items-center gap-1 px-2.5 py-1 text-[10px] font-semibold bg-white border border-gray-200 rounded-full text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors"
                        >
                          <IoLocationOutline className="h-2.5 w-2.5 text-blue-400 shrink-0" />
                          {spot.name}
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="relative">
                    <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                    <input
                      type="text"
                      value={walkQuery}
                      onChange={(e) => { setWalkQuery(e.target.value); searchWalkFrom(e.target.value); }}
                      placeholder={selectedDirection === "outbound" ? "e.g. Zimmerman, Kasarani…" : "or search another spot…"}
                      className="w-full pl-8 pr-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400"
                    />
                  </div>
                  {walkSearching && (
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-3 h-3 border border-gray-300 border-t-blue-500 rounded-full animate-spin" />
                      <span className="text-[10px] text-gray-400">Searching…</span>
                    </div>
                  )}
                  {walkSuggestions.length > 0 && (
                    <div className="mt-1 border border-gray-100 rounded-lg overflow-hidden">
                      {walkSuggestions.map((s, i) => (
                        <button
                          key={i}
                          onClick={() => { setWalkFromOverride(s); setShowWalkFromSearch(false); setWalkSuggestions([]); }}
                          className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 border-b border-gray-50 last:border-0 flex items-center gap-2"
                        >
                          <IoLocationOutline className="h-3 w-3 text-blue-500 shrink-0" />
                          {s.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className="live-trip-map">
                <LiveTripMap
                  originStage={origin}
                  destStage={destination}
                  demoMode={demoMode}
                  simulationPhase="walking"
                  walkFromOverride={walkFromOverride}
                  onFarFromStage={handleFarFromStage}
                />
              </div>
            </div>
          )}

          <button
            onClick={handleBoard}
            className="w-full bg-green-600 text-white py-3 rounded-2xl font-extrabold text-sm hover:bg-green-700 active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-green-200"
          >
            <IoCheckmarkCircleOutline className="h-5 w-5" />
            I've Boarded
          </button>

          <p className="text-center text-xs text-gray-400 pb-2">
            Tap once you're on the matatu to start your journey timer
          </p>
        </div>
      </div>
    </div>
  );
};

export default TripModeView;
