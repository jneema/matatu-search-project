import React from "react";
import {
  Clock,
  ArrowRight,
  Map,
  ChevronRight,
  BookmarkPlus,
  SearchX,
  TrendingUp,
  Bus,
} from "lucide-react";
import {
  getRoutesByDestination,
  getDestinationByName,
  getRoadByName,
  getSaccosByRoute,
} from "../data/routesData";

const RoutesView = ({
  setCurrentView,
  selectedDestination,
  selectedRoad,
  setSelectedRoute,
  savedRoutes,
  setSavedRoutes,
}) => {
  const road = getRoadByName(selectedRoad?.name);
  const dest = road
    ? getDestinationByName(road.id, selectedDestination?.name)
    : null;
  const rawRoutes = dest ? getRoutesByDestination(dest.id) : [];
  const routes = rawRoutes.map((route) => ({
    ...route,
    matatus: getSaccosByRoute(route.id),
  }));

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Mobile-Friendly Breadcrumb */}
        <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6 overflow-x-auto whitespace-nowrap no-scrollbar">
          <button
            onClick={() => setCurrentView("landing")}
            className="hover:text-green-600 cursor-pointer"
          >
            Home
          </button>
          <ChevronRight className="h-3 w-3 flex-shrink-0" />
          <button
            onClick={() => setCurrentView("roads")}
            className="hover:text-green-600 cursor-pointer"
          >
            {selectedRoad?.name}
          </button>
          <ChevronRight className="h-3 w-3 flex-shrink-0" />
          <span className="text-green-600">{selectedDestination?.name}</span>
        </nav>

        <header className="mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Available Routes
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Found {routes.length} paths to {selectedDestination?.name}
          </p>
        </header>

        <div className="space-y-6">
          {routes.length > 0 ? (
            routes.map((route) => (
              <div
                key={route.id}
                className="bg-white rounded-[32px] sm:rounded-[40px] shadow-sm border border-gray-100 overflow-hidden active:scale-[0.98] transition-all"
              >
                <div className="p-5 sm:p-8">
                  {/* Route & Fare Header */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-900 text-white rounded-[18px] sm:rounded-[20px] flex items-center justify-center font-black text-xl sm:text-2xl shadow-lg">
                        {route.routeNumber}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 text-green-600 mb-0.5">
                          <TrendingUp className="h-3 w-3" />
                          <span className="text-[9px] font-black uppercase tracking-widest">
                            Est. Fare
                          </span>
                        </div>
                        <span className="text-xl sm:text-2xl font-black text-gray-900">
                          KSh {route.fare}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        !savedRoutes.some((s) => s.id === route.id) &&
                        setSavedRoutes([...savedRoutes, route])
                      }
                      className={`p-3 sm:p-4 rounded-2xl border transition-all ${
                        savedRoutes.some((s) => s.id === route.id)
                          ? "bg-green-50 border-green-100 text-green-600"
                          : "bg-white border-gray-100 text-gray-300"
                      }`}
                    >
                      <BookmarkPlus className="h-5 w-5 sm:h-6 sm:h-6" />
                    </button>
                  </div>

                  {/* Mobile Journey Timeline */}
                  <div className="relative mb-8 px-1">
                    <div className="absolute top-[8px] left-0 right-0 h-0.5 bg-gray-100 rounded-full" />
                    <div className="relative flex justify-between items-center">
                      {route.path.map((stop, index) => (
                        <div
                          key={index}
                          className="flex flex-col items-center gap-2 max-w-[60px]"
                        >
                          <div
                            className={`w-4 h-4 rounded-full border-2 border-white shadow-sm z-10 ${
                              index === 0
                                ? "bg-green-500"
                                : index === route.path.length - 1
                                  ? "bg-red-500"
                                  : "bg-gray-300"
                            }`}
                          />
                          <span className="text-[8px] sm:text-[9px] font-bold text-gray-500 text-center uppercase tracking-tighter line-clamp-1">
                            {stop}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Sacco Scroll for 10+ Saccos */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-3">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        SACCO Operators
                      </p>
                      <span className="text-[9px] font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-lg">
                        {route.matatus.length} Total
                      </span>
                    </div>

                    <div className="relative">
                      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar scroll-smooth snap-x">
                        {route.matatus.map((sacco, i) => (
                          <div
                            key={i}
                            className="snap-center flex-shrink-0 flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-xl border border-slate-100"
                          >
                            <Bus className="h-3 w-3 text-gray-400" />
                            <span className="text-[11px] font-bold text-gray-700 whitespace-nowrap">
                              {sacco.name}
                            </span>
                            <span className="text-[10px] font-black text-green-600">
                              {sacco.rating}★
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="absolute right-0 top-0 bottom-2 w-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />
                    </div>
                  </div>

                  {/* Desktop/Mobile Stats Bar */}
                  <div className="flex flex-col sm:flex-row items-center justify-between pt-5 border-t border-gray-50 gap-4">
                    <div className="flex justify-around w-full sm:w-auto sm:gap-6">
                      <div className="flex flex-col items-center sm:items-start">
                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">
                          Time
                        </span>
                        <div className="flex items-center gap-1 text-xs font-bold text-gray-700">
                          <Clock className="h-3 w-3 text-gray-300" />{" "}
                          {route.duration}
                        </div>
                      </div>
                      <div className="flex flex-col items-center sm:items-start">
                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">
                          Distance
                        </span>
                        <div className="flex items-center gap-1 text-xs font-bold text-gray-700">
                          <Map className="h-3 w-3 text-gray-300" />{" "}
                          {route.distance}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedRoute(route);
                        setCurrentView("stages");
                      }}
                      className="w-full sm:w-auto bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold text-sm hover:bg-black flex items-center justify-center gap-2 group"
                    >
                      Boarding Stages
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-24 bg-white rounded-[40px] border border-dashed border-gray-200">
              <SearchX className="h-12 w-12 text-gray-200 mx-auto mb-4" />
              <p className="text-gray-400 font-bold italic px-10">
                Searching for available matatus on this route...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoutesView;
