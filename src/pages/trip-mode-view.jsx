import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Wallet,
  CheckCircle,
  AlertTriangle,
  Zap,
  Bus,
  CreditCard,
  Navigation,
  FlaskConical,
} from "lucide-react";
import TripMap from "../components/trip-map";
import LiveTripMap from "../components/live-trip-map";

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
    origin_stage,
    dest_stage,
    tags = [],
  } = selectedRoute || {};
  console.log(selectedRoute);

  const origin = useMemo(() => {
    if (typeof selectedRoute?.origin_stage === "string") {
      return { name: selectedRoute.origin_stage };
    }
    return selectedRoute?.origin_stage || { name: "Unknown Origin" };
  }, [selectedRoute]);

  const destination = useMemo(() => {
    if (typeof selectedRoute?.dest_stage === "string") {
      return { name: selectedRoute.dest_stage };
    }
    return selectedRoute?.dest_stage || { name: "Unknown Destination" };
  }, [selectedRoute]);
  console.log(origin.name, destination.name);

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
      <div className="min-h-screen bg-white font-sans pb-10">
        <div className="max-w-2xl mx-auto">
          <div className="px-6 pt-12 pb-6 text-center">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mb-5 mx-auto"
              style={{
                background: "linear-gradient(135deg, #16a34a, #4ade80)",
              }}
            >
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-1 tracking-tight">
              You've arrived!
            </h2>
            <p className="text-gray-500">
              at{" "}
              <span className="font-bold text-gray-800">
                {destination?.name}
              </span>
            </p>
            {destination?.landmark && (
              <p className="text-sm text-gray-400 mt-1">
                {destination.landmark}
              </p>
            )}
          </div>

          <div className="px-4 space-y-3">
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
              <div className="px-4 pt-4 pb-2">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  You are here
                </p>
                <p className="text-sm font-bold text-gray-700 mt-0.5">
                  {destination.name}
                </p>
              </div>
              <TripMap
                originStage={origin.name}
                destStage={destination.name}
                height="260px"
                walkingMode="from_stage"
              />
            </div>

            <button
              onClick={() => {
                if (setSelectedRoute) setSelectedRoute(null);
                setCurrentView("routes");
              }}
              className="w-full bg-green-600 text-white py-4 rounded-2xl font-extrabold text-base hover:bg-green-700 active:scale-[0.98] transition-all shadow-lg shadow-green-200"
            >
              Find Another Route
            </button>

            <button
              onClick={() => setCurrentView("landing")}
              className="w-full bg-gray-100 text-gray-600 py-3.5 rounded-2xl font-bold hover:bg-gray-200 transition-colors text-center"
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === STEPS.BOARDED) {
    return (
      <div className="min-h-screen bg-gray-950 font-sans flex flex-col">
        <div
          className="live-trip-map relative flex-shrink-0"
          style={{ minHeight: 320 }}
        >
          <LiveTripMap
            originStage={origin}
            destStage={destination}
            demoMode={demoMode}
            simulationPhase="boarded"
          />

          <div className="absolute top-0 left-0 right-0 z-[1000] px-4 pt-4">
            <div className="bg-white rounded-2xl px-4 py-3 shadow-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-green-600 rounded-lg flex items-center justify-center shrink-0">
                  <Bus className="h-4 w-4 text-white" />
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

        <div className="bg-white px-5 pt-4 pb-8 shadow-2xl flex-1 flex flex-col gap-4 min-h-[280px]">
          <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto" />

          <div className="flex items-start gap-3 bg-gray-50 rounded-2xl p-4">
            <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center shrink-0">
              <MapPin className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-0.5">
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

          <div className="grid grid-cols-3 gap-2">
            {[
              { icon: Clock, label: "Journey", value: `${duration_mins} min` },
              {
                icon: Navigation,
                label: "Via",
                value: via?.split(" ").slice(-1)[0] ?? "—",
              },
              { icon: Wallet, label: "Fare", value: `KES ${fare}` },
            ].map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="bg-gray-50 rounded-xl p-3 text-center"
              >
                <Icon className="h-4 w-4 mx-auto mb-1.5 text-gray-400" />
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-0.5">
                  {label}
                </p>
                <p className="text-xs font-black text-gray-900 truncate">
                  {value}
                </p>
              </div>
            ))}
          </div>

          {surge_active && (
            <div className="px-3 py-2.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-700 font-medium flex items-center gap-2">
              <Zap className="h-3.5 w-3.5 shrink-0" />
              Surge pricing active{surge_reason ? ` — ${surge_reason}` : ""}
            </div>
          )}
          {active_alerts.map((alert, i) => (
            <div
              key={i}
              className="px-3 py-2.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-medium flex items-center gap-2"
            >
              <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
              {alert.message}
            </div>
          ))}

          <div className="flex-1" />

          <button
            onClick={() => setStep(STEPS.ARRIVED)}
            className="w-full bg-green-600 text-white py-4 rounded-2xl font-extrabold text-base hover:bg-green-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <CheckCircle className="h-5 w-5" />
            I've Arrived
          </button>

          <button
            onClick={() => setStep(STEPS.WAITING)}
            className="w-full text-sm text-gray-400 hover:text-gray-600 transition-colors text-center py-1"
          >
            ← Back to trip plan
          </button>
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
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <div className="text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                Trip Plan
              </p>
              <p className="text-sm font-extrabold text-gray-900">{sacco}</p>
            </div>
            {/* Demo mode toggle */}
            <button
              onClick={() => setDemoMode((d) => !d)}
              title={
                demoMode
                  ? "Demo mode on — simulated GPS"
                  : "Enable demo mode with simulated GPS"
              }
              className={`flex items-center gap-1 text-[9px] font-black uppercase tracking-widest px-2.5 py-1.5 rounded-lg border transition-colors ${
                demoMode
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-gray-100 text-gray-400 border-gray-200 hover:border-gray-300"
              }`}
            >
              <FlaskConical className="h-3 w-3" />
              {demoMode ? "Demo ON" : "Demo"}
            </button>
          </div>
        </div>

        <div className="px-4 py-5 space-y-3">
          {surge_active && (
            <div className="px-4 py-3 bg-amber-50 border border-amber-200 rounded-2xl text-sm text-amber-700 font-medium flex items-center gap-2">
              <Zap className="h-4 w-4 shrink-0" />
              Surge pricing active{surge_reason ? ` — ${surge_reason}` : ""}
            </div>
          )}
          {active_alerts.map((alert, i) => (
            <div
              key={i}
              className="px-4 py-3 bg-red-50 border border-red-200 rounded-2xl text-sm text-red-700 font-medium flex items-center gap-2"
            >
              <AlertTriangle className="h-4 w-4 shrink-0" />
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

          <div className="grid grid-cols-3 gap-2">
            {[
              { icon: Clock, label: "Journey", value: `${duration_mins} min` },
              { icon: Clock, label: "Wait", value: `~${wait_mins_est} min` },
              { icon: Wallet, label: "Fare", value: `KES ${fare}` },
            ].map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="bg-white border border-gray-100 rounded-2xl p-3 text-center shadow-sm"
              >
                <Icon className="h-4 w-4 mx-auto mb-1.5 text-gray-400" />
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-0.5">
                  {label}
                </p>
                <p className="text-xs font-black text-gray-900">{value}</p>
              </div>
            ))}
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex items-center gap-3">
            <div className="w-11 h-11 bg-gray-900 rounded-xl flex items-center justify-center shrink-0">
              <Bus className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-extrabold text-gray-900">{sacco}</p>
              <p className="text-xs text-gray-400 mt-0.5">
                {via}
                {vehicle_type ? ` · ${vehicle_type.replace(/_/g, " ")}` : ""}
              </p>
            </div>
            {tags.includes("express") && (
              <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg shrink-0">
                Express
              </span>
            )}
          </div>

          {/* Payment */}
          <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex items-center gap-3">
            <div className="w-11 h-11 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center shrink-0">
              <CreditCard className="h-5 w-5 text-gray-500" />
            </div>
            <div>
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-0.5">
                Payment accepted
              </p>
              <p className="text-sm font-bold text-gray-900">
                {payment_methods.length > 0
                  ? payment_methods.join(" · ")
                  : "Cash"}
              </p>
              {fare_type_now && (
                <p className="text-xs text-gray-400 mt-0.5">
                  {fare_type_now} rate
                </p>
              )}
            </div>
          </div>

          {origin?.latitude && origin?.longitude && (
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
              <div className="px-4 pt-4 pb-2">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Walk to boarding stage
                </p>
                <p className="text-sm font-bold text-gray-700 mt-0.5">
                  {origin.name}
                </p>
                {demoMode && (
                  <p className="text-[10px] text-orange-500 font-bold mt-0.5">
                    ● Simulating walk to stage
                  </p>
                )}
              </div>
              <div className="live-trip-map">
                <LiveTripMap
                  originStage={origin}
                  destStage={destination}
                  demoMode={demoMode}
                  simulationPhase="walking"
                />
              </div>
            </div>
          )}

          <button
            onClick={handleBoard}
            className="w-full bg-green-600 text-white py-4 rounded-2xl font-extrabold text-base hover:bg-green-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-200"
          >
            <CheckCircle className="h-5 w-5" />
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
