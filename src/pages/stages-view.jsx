import React, { useState } from "react";
import {
  Navigation,
  Info,
  ArrowLeft,
  Map as MapIcon,
  Zap,
  LayoutList,
} from "lucide-react";
import { getSaccosByRoute } from "../data/routesData";

const StagesView = ({ setCurrentView, selectedRoute }) => {
  const allSaccos = selectedRoute ? getSaccosByRoute(selectedRoute.id) : [];
  const [activeSacco, setActiveSacco] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSaccos = allSaccos.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const currentSacco = activeSacco || allSaccos[0];

  const currentPath = selectedRoute?.path || [
    "CBD",
    "Pangani",
    "Muthaiga",
    "Roysambu",
    "Kasarani",
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-10">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white px-4 pt-6 pb-2 sticky top-0 z-10 border-b border-gray-100 shadow-sm mt-5">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setCurrentView("routes")}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <div className="text-center">
              <h2 className="text-sm font-black uppercase tracking-widest text-gray-400">
                Stage Boarding Details
              </h2>
              <p className="text-xs font-bold text-green-600">
                Route {selectedRoute?.routeNumber || "17B"}
              </p>
            </div>
            <div className="w-9" />
          </div>

          {/* Sacco Chips Scroll */}
          <div className="flex gap-2 overflow-x-auto pb-3 no-scrollbar">
            {filteredSaccos.map((sacco) => (
              <button
                key={sacco.name}
                onClick={() => setActiveSacco(sacco)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all border flex items-center gap-2 ${
                  currentSacco.name === sacco.name
                    ? "bg-gray-900 border-gray-900 text-white shadow-md"
                    : "bg-white border-gray-200 text-gray-500"
                }`}
              >
                {sacco.name}
                {sacco.isExpress && (
                  <Zap className="h-3 w-3 fill-current text-blue-400" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="px-4 py-6">
          <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden mb-6">
            <div className="p-6">
              {/* Header with Express/Pit-stop Badge */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 ${currentSacco.color} text-white rounded-2xl flex items-center justify-center shadow-lg`}
                  >
                    <Navigation className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-gray-900 leading-tight">
                      {currentSacco.name}
                    </h3>
                    <div
                      className={`mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-tighter ${
                        currentSacco.isExpress
                          ? "bg-blue-100 text-blue-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {currentSacco.isExpress ? (
                        <Zap className="h-2 w-2" />
                      ) : (
                        <LayoutList className="h-2 w-2" />
                      )}
                      {currentSacco.isExpress
                        ? "Express (Non-Stop)"
                        : `${currentSacco.servicedStops.length - 2} Pit Stops`}
                    </div>
                  </div>
                </div>
              </div>

              {/* Journey Path Logic */}
              <div className="space-y-6 pl-4 relative">
                <div className="absolute left-[19px] top-2 bottom-2 w-0.5 border-l-2 border-dashed border-gray-200" />

                {currentPath.map((stop, i, arr) => {
                  const isServiced = currentSacco.servicedStops.includes(stop);

                  return (
                    <div
                      key={i}
                      className={`flex items-center gap-4 relative transition-opacity duration-300 ${!isServiced ? "opacity-30" : "opacity-100"}`}
                    >
                      {/* Node circle */}
                      <div
                        className={`w-3 h-3 rounded-full border-2 border-white shadow-sm z-10 transition-colors ${
                          !isServiced
                            ? "bg-gray-200"
                            : i === 0
                              ? "bg-green-500 scale-125"
                              : i === arr.length - 1
                                ? "bg-red-500"
                                : "bg-blue-500"
                        }`}
                      />

                      <div className="flex flex-col">
                        <span
                          className={`text-sm ${isServiced ? "font-bold text-gray-900" : "font-medium text-gray-400 line-through decoration-gray-300"}`}
                        >
                          {stop}
                        </span>
                        {!isServiced && (
                          <span className="text-[9px] text-gray-400 italic">
                            Skipped by {currentSacco.name}
                          </span>
                        )}
                        {isServiced && i === 0 && (
                          <span className="text-[10px] text-green-600 font-bold uppercase tracking-wider">
                            Boarding Point
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action buttons... */}
            <div className="grid grid-cols-2 gap-px bg-gray-100 border-t border-gray-100">
              <button className="bg-white py-5 text-sm font-bold text-gray-900 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
                <MapIcon className="h-4 w-4 text-green-600" /> View Map
              </button>
              <button className="bg-white py-5 text-sm font-bold text-gray-900 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
                <Navigation className="h-4 w-4 text-blue-600" /> Get Directions
              </button>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex gap-3">
            <Info className="h-5 w-5 text-blue-500 flex-shrink-0" />
            <p className="text-xs text-blue-800 leading-relaxed">
              <strong>Travel Tip:</strong>{" "}
              {currentSacco.isExpress
                ? `${currentSacco.name} is faster for long distance, but will not drop you at mid-highway stages.`
                : `${currentSacco.name} is perfect if you need to alight at Pangani or Roysambu.`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StagesView;
