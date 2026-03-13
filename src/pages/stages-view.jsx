import React, { useState } from "react";
import {
  Navigation,
  ArrowLeft,
  Zap,
  Phone,
  MapPin,
  ChevronRight,
  Star,
  Clock,
  Wallet,
  Building2,
  MessageSquare,
  LayoutList,
} from "lucide-react";
import { getSaccosByRoute } from "../data/routesData";
import { GoogleMap } from "../components/google-maps";

const StagesView = ({ setCurrentView, selectedRoute }) => {
  const allSaccos = selectedRoute ? getSaccosByRoute(selectedRoute.id) : [];
  const [activeSacco, setActiveSacco] = useState(null);
  const [activeTab, setActiveTab] = useState(null);

  const currentSacco = activeSacco || allSaccos[0];
  const express = currentSacco?.isExpress;

  if (!currentSacco) return null;

  const pitStopsCount = (currentSacco?.servicedStops?.length || 2) - 2;
  const displayFare = selectedRoute?.fare || 100;
  const estTravelTime = express
    ? "25-35 min"
    : `${25 + pitStopsCount * 4}-${35 + pitStopsCount * 4} min`;

  const handleStartNavigation = () => {
    const dest = encodeURIComponent(
      `${currentSacco.stage} ${currentSacco.name} Nairobi`,
    );
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${dest}&travelmode=walking`,
      "_blank",
    );
  };

  return (
    <div className="min-h-screen bg-white font-sans pb-10">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-white px-4 pt-6 pb-2 sticky top-0 z-10 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
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
              <p className="text-xs font-bold text-green-600">
                Route {selectedRoute?.routeNumber}
              </p>
            </div>
            <div className="w-9" />
          </div>

          {/* Sacco Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-3 no-scrollbar touch-pan-x">
            {allSaccos.map((sacco) => {
              const isSaccoExpress = (sacco.servicedStops?.length || 0) <= 2;
              return (
                <button
                  key={sacco.id}
                  onClick={() => {
                    setActiveSacco(sacco);
                    setActiveTab(null);
                  }}
                  className={`flex-shrink-0 px-3 py-2 rounded-md text-xs font-bold transition-colors border flex items-center gap-1.5 ${
                    currentSacco.id === sacco.id
                      ? "bg-gray-900 text-white border-gray-900"
                      : "bg-white border-gray-200 text-gray-500 hover:border-gray-300"
                  }`}
                >
                  {sacco.name}
                  {isSaccoExpress && (
                    <Zap className="h-3 w-3 fill-current text-blue-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="px-4 py-6 space-y-4">
          {/* Main Card */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="p-4 sm:p-6">
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-blue-50 text-blue-700 rounded-md border border-blue-100 min-w-0">
                  <Building2 className="h-3.5 w-3.5 shrink-0" />
                  <span className="text-[10px] font-black uppercase tracking-wider truncate">
                    Near {currentSacco.landmark}
                  </span>
                </div>
                <div
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border text-[10px] font-black uppercase tracking-wider shrink-0 ${
                    express
                      ? "bg-indigo-50 text-indigo-700 border-indigo-100"
                      : "bg-orange-50 text-orange-700 border-orange-100"
                  }`}
                >
                  {express ? (
                    <Zap className="h-3 w-3 fill-current shrink-0" />
                  ) : (
                    <LayoutList className="h-3 w-3 shrink-0" />
                  )}
                  {express ? "Express" : `${pitStopsCount} Stops`}
                </div>
              </div>

              {/* Sacco Identity */}
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-md flex items-center justify-center text-white font-black text-lg sm:text-xl shrink-0"
                  style={{ background: currentSacco.color }}
                >
                  {currentSacco.name?.slice(0, 1)}
                </div>
                <div className="min-w-0">
                  <h3 className="font-black text-gray-900 text-lg sm:text-xl text-left leading-none mb-2.5  ml-1 truncate">
                    {currentSacco.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400 flex-wrap">
                    <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400 shrink-0" />
                    <span>
                      {currentSacco.rating} ({currentSacco.reviews})
                    </span>
                    <span>•</span>
                    <span className="uppercase truncate">
                      {currentSacco.stage}
                    </span>
                  </div>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-2 mb-5 p-3 sm:p-4 bg-gray-50 border border-gray-100 rounded-md">
                <div className="text-center">
                  <Clock className="h-4 w-4 mx-auto mb-1 text-gray-400" />
                  <p className="text-[9px] font-bold text-gray-400 uppercase mb-0.5">
                    Time
                  </p>
                  <p className="text-[10px] sm:text-xs font-black text-gray-900 leading-tight">
                    {estTravelTime}
                  </p>
                </div>
                <div className="text-center border-x border-gray-200 px-1">
                  <Navigation className="h-4 w-4 mx-auto mb-1 text-gray-400" />
                  <p className="text-[9px] font-bold text-gray-400 uppercase mb-0.5">
                    Dist.
                  </p>
                  <p className="text-[10px] sm:text-xs font-black text-gray-900 leading-tight">
                    {selectedRoute?.distance}
                  </p>
                </div>
                <div className="text-center">
                  <Wallet className="h-4 w-4 mx-auto mb-1 text-gray-400" />
                  <p className="text-[9px] font-bold text-gray-400 uppercase mb-0.5">
                    Fare
                  </p>
                  <p className="text-[10px] sm:text-xs font-black text-gray-900 leading-tight">
                    KES {displayFare}
                  </p>
                </div>
              </div>

              {/* Action Tabs */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() =>
                    setActiveTab(activeTab === "map" ? null : "map")
                  }
                  className={`flex items-center justify-center gap-2 py-2.5 sm:py-3 rounded-md font-semibold text-sm transition-colors ${
                    activeTab === "map"
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <MapPin className="h-4 w-4 shrink-0" />
                  <span>View Map</span>
                </button>
                <button
                  onClick={() =>
                    setActiveTab(activeTab === "call" ? null : "call")
                  }
                  className={`flex items-center justify-center gap-2 py-2.5 sm:py-3 rounded-md font-semibold text-sm transition-colors ${
                    activeTab === "call"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <Phone className="h-4 w-4 shrink-0" />
                  <span>Contact</span>
                </button>
              </div>

              {/* Map View */}
              {activeTab === "map" && (
                <div className="mt-4 space-y-3">
                  <div className="rounded-md overflow-hidden border border-gray-200 h-48 w-full">
                    <GoogleMap
                      stage={currentSacco.stage}
                      landmark={currentSacco.landmark}
                    />
                  </div>
                  <button
                    onClick={handleStartNavigation}
                    className="w-full bg-gray-900 text-white py-3 rounded-md font-semibold text-sm flex items-center justify-center gap-3 hover:bg-black transition-colors"
                  >
                    <Navigation className="h-4 w-4 fill-current text-green-400 shrink-0" />
                    Open in Google Maps
                  </button>
                </div>
              )}

              {/* Contact View */}
              {activeTab === "call" && (
                <div className="mt-4 space-y-3">
                  <a
                    href={`tel:${currentSacco.phone}`}
                    className="flex items-center justify-between p-3 sm:p-4 bg-green-50 rounded-md border border-green-100 hover:bg-green-100 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 bg-green-600 rounded-md flex items-center justify-center text-white shrink-0">
                        <Phone className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] font-black text-gray-400 uppercase leading-none mb-1">
                          Call Dispatch
                        </p>
                        <p className="text-sm font-bold text-green-700 truncate">
                          {currentSacco.phone || "N/A"}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-green-400 shrink-0 ml-2" />
                  </a>
                  <a
                    href={`https://wa.me/${currentSacco.whatsapp}`}
                    target="_blank"
                    className="flex items-center justify-between p-3 sm:p-4 bg-blue-50 rounded-md border border-blue-100 hover:bg-blue-100 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 bg-blue-600 rounded-md flex items-center justify-center text-white shrink-0">
                        <MessageSquare className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] font-black text-gray-400 uppercase leading-none mb-1">
                          WhatsApp
                        </p>
                        <p className="text-sm font-bold text-blue-700">
                          Chat with Sacco
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-blue-400 shrink-0 ml-2" />
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Journey Path Card */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 mb-10">
            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-5 text-center">
              Route Journey
            </h4>
            <div className="space-y-1">
              {selectedRoute?.path.map((stop, i, arr) => {
                const isServiced = currentSacco.servicedStops.includes(stop);
                return (
                  <div
                    key={i}
                    className={`flex gap-4 ${!isServiced ? "opacity-30" : ""}`}
                  >
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-3 h-3 rounded-full mt-1.5 border-2 border-white shadow-sm shrink-0 ${
                          !isServiced
                            ? "bg-gray-200"
                            : i === 0
                              ? "bg-green-600"
                              : i === arr.length - 1
                                ? "bg-gray-900"
                                : "bg-blue-400"
                        }`}
                      />
                      {i !== arr.length - 1 && (
                        <div className="w-px h-10 bg-gray-200" />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <p
                        className={`text-sm font-bold ${isServiced ? "text-gray-900" : "text-gray-400"}`}
                      >
                        {stop}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StagesView;
