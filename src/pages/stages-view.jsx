import React, { useState } from "react";
import {
  Navigation,
  ArrowLeft,
  Zap,
  MapPin,
  Star,
  Clock,
  Wallet,
  Bus,
  AlertTriangle,
  LayoutList,
} from "lucide-react";
import TripMap from "../components/trip-map";

const StagesView = ({ setCurrentView, selectedRoute, selectedDirection }) => {
  const [showMap, setShowMap] = useState(false);

  if (!selectedRoute) {
    setCurrentView("routes");
    return null;
  }

  const {
    sacco,
    via,
    vehicle_type,
    terminus_area,
    fare,
    fare_type_now,
    tags = [],
    duration_mins,
    wait_mins_est,
    safety_rating,
    payment_methods = [],
    surge_active,
    surge_reason,
    active_alerts = [],
    data_confidence,
    origin_stage,
    dest_stage,
  } = selectedRoute;

  const isExpress = tags.includes("express");
  const boardingStage = origin_stage;
  const alightingStage = dest_stage;

  const handleOpenMaps = () => {
    if (!boardingStage?.latitude || !boardingStage?.longitude) return;
    const dest = `${boardingStage.latitude},${boardingStage.longitude}`;
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${dest}&travelmode=walking`,
      "_blank",
    );
  };

  const StatBox = ({ icon: Icon, label, value }) => (
    <div className="text-center">
      <Icon className="h-4 w-4 mx-auto mb-1 text-gray-400" />
      <p className="text-[9px] font-bold text-gray-400 uppercase mb-0.5">
        {label}
      </p>
      <p className="text-[10px] sm:text-xs font-black text-gray-900 leading-tight">
        {value}
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-10">
      <div className="max-w-2xl mx-auto">
        {/* Sticky Header */}
        <div className="bg-white px-4 pt-6 pb-4 sticky top-0 z-10 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentView("routes")}
              className="p-2 hover:bg-gray-100 rounded-md transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <div className="text-center">
              <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                Boarding Details
              </h2>
              <p className="text-xs font-bold text-green-600">{sacco}</p>
            </div>
            <div className="w-9" />
          </div>
        </div>

        <div className="px-4 py-6 space-y-4">
          {/* Main Card */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="p-4 sm:p-6">
              {/* Tags */}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] font-black uppercase tracking-widest px-2 py-1 bg-green-50 text-green-700 border border-green-200 rounded"
                    >
                      {tag.replace(/_/g, " ")}
                    </span>
                  ))}
                </div>
              )}

              {/* Sacco identity */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center text-white font-black text-lg shrink-0">
                  <Bus className="h-6 w-6" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-black text-gray-900 text-lg leading-tight">
                    {sacco}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-gray-400 flex-wrap mt-0.5">
                    {safety_rating && (
                      <>
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 shrink-0" />
                        <span>{safety_rating}/5</span>
                        <span>·</span>
                      </>
                    )}
                    <span
                      className={`font-bold ${isExpress ? "text-blue-600" : "text-gray-500"}`}
                    >
                      {isExpress ? "Express" : "Standard"}
                    </span>
                    {terminus_area && (
                      <>
                        <span>·</span>
                        <span>Terminus: {terminus_area}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Route badges */}
              <div className="flex flex-wrap gap-2 mb-5">
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-md">
                  {isExpress ? (
                    <Zap className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                  ) : (
                    <LayoutList className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                  )}
                  <span className="text-[10px] font-black uppercase tracking-wider text-gray-600">
                    {via}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-md">
                  <Bus className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                  <span className="text-[10px] font-black uppercase tracking-wider text-gray-600">
                    {vehicle_type?.replace(/_/g, " ")}
                  </span>
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-2 mb-5 p-3 sm:p-4 bg-gray-50 border border-gray-100 rounded-lg">
                <StatBox
                  icon={Clock}
                  label="Journey"
                  value={`${duration_mins} min`}
                />
                <div className="text-center border-x border-gray-200 px-1">
                  <Clock className="h-4 w-4 mx-auto mb-1 text-gray-400" />
                  <p className="text-[9px] font-bold text-gray-400 uppercase mb-0.5">
                    Wait
                  </p>
                  <p className="text-[10px] sm:text-xs font-black text-gray-900">
                    ~{wait_mins_est} min
                  </p>
                </div>
                <StatBox icon={Wallet} label="Fare" value={`KES ${fare}`} />
              </div>

              {/* Payment */}
              <div className="mb-5 px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-lg">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">
                  Accepted Payment
                </p>
                <p className="text-sm font-bold text-gray-800">
                  {payment_methods.join(" · ")}
                </p>
                {fare_type_now && (
                  <p className="text-xs text-gray-400 mt-0.5">
                    {fare_type_now} rate
                  </p>
                )}
              </div>

              {/* Surge */}
              {surge_active && (
                <div className="mb-4 px-3 py-2.5 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-700 font-medium flex items-center gap-2">
                  <Zap className="h-3.5 w-3.5 shrink-0" />
                  Surge pricing active{surge_reason ? ` — ${surge_reason}` : ""}
                </div>
              )}

              {/* Alerts */}
              {active_alerts.map((alert, i) => (
                <div
                  key={i}
                  className="mb-4 px-3 py-2.5 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 font-medium flex items-center gap-2"
                >
                  <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                  {alert.message}
                </div>
              ))}

              {/* Data confidence */}
              {data_confidence === "low" && (
                <div className="mb-4 px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-500">
                  ℹ Fare data unverified — confirm with conductor before
                  boarding
                </div>
              )}
            </div>
          </div>

          {/* Boarding Stage Card */}
          {boardingStage && (
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="p-4 sm:p-6">
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">
                  Your Boarding Stage
                </h4>

                <div className="flex items-start gap-3 mb-4">
                  <div className="w-9 h-9 bg-green-600 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="font-black text-gray-900 text-base">
                      {boardingStage.name}
                    </p>
                    {boardingStage.landmark && (
                      <p className="text-sm text-gray-500 mt-0.5">
                        {boardingStage.landmark}
                      </p>
                    )}
                    <p className="text-xs text-gray-400 mt-1 font-medium">
                      {selectedDirection === "outbound"
                        ? "← Outbound side"
                        : "→ Inbound side"}
                    </p>
                  </div>
                </div>

                {/* Alighting stage */}
                {alightingStage && (
                  <div className="flex items-start gap-3 mb-5 pt-4 border-t border-gray-100">
                    <div className="w-9 h-9 bg-gray-900 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">
                        Alight at
                      </p>
                      <p className="font-black text-gray-900 text-base">
                        {alightingStage.name}
                      </p>
                      {alightingStage.landmark && (
                        <p className="text-sm text-gray-500 mt-0.5">
                          {alightingStage.landmark}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Map toggle */}
                <button
                  onClick={() => setShowMap(!showMap)}
                  className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-semibold text-sm transition-colors mb-3 ${
                    showMap
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <MapPin className="h-4 w-4 shrink-0" />
                  {showMap ? "Hide Map" : "Show on Map"}
                </button>

                {showMap && (
                  <div className="mb-3">
                    <TripMap originStage={boardingStage} height="220px" />
                  </div>
                )}

                <button
                  onClick={handleOpenMaps}
                  className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 hover:bg-black transition-colors"
                >
                  <Navigation className="h-4 w-4 text-green-400 shrink-0" />
                  Get Walking Directions
                </button>
              </div>
            </div>
          )}

          {/* Journey summary */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6">
            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">
              Journey Summary
            </h4>
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-green-600 border-2 border-white shadow-sm" />
                <div className="w-px h-10 bg-gray-200" />
                <div className="w-3 h-3 rounded-full bg-gray-900 border-2 border-white shadow-sm" />
              </div>
              <div className="flex flex-col justify-between gap-6">
                <div>
                  <p className="text-xs text-gray-400">Board at</p>
                  <p className="text-sm font-bold text-gray-900">
                    {boardingStage?.name}
                  </p>
                  {boardingStage?.landmark && (
                    <p className="text-xs text-gray-400">
                      {boardingStage.landmark}
                    </p>
                  )}
                </div>
                <div>
                  <p className="text-xs text-gray-400">Alight at</p>
                  <p className="text-sm font-bold text-gray-900">
                    {alightingStage?.name}
                  </p>
                  {alightingStage?.landmark && (
                    <p className="text-xs text-gray-400">
                      {alightingStage.landmark}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StagesView;
