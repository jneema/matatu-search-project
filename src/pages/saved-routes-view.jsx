import React from "react";
import {
  BookOpen,
  Clock,
  Map,
  TrendingUp,
  Bus,
  ArrowRight,
  Trash2,
  X,
  Route,
  Zap,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { removeRoute } from "../../store/saved-routes";

const SavedRoutesView = ({ setCurrentView, setSelectedRoute }) => {
  const savedRoutes = useSelector((state) => state.savedRoutes.routes);
  const dispatch = useDispatch();

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Route className="h-6 w-6 md:h-8 md:w-8 text-green-600" />
            <div>
              <h1 className="text-lg md:text-xl font-bold text-gray-800 leading-none">
                Matatu Finder
              </h1>
              <p className="text-xs text-gray-400 mt-0.5 hidden sm:block">
                Saved Routes
              </p>
            </div>
          </div>
          <button
            onClick={() => setCurrentView("landing")}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
            title="Back to app"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <header className="mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Saved Routes
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              {savedRoutes.length} route{savedRoutes.length !== 1 ? "s" : ""}{" "}
              saved for offline access
            </p>
          </header>

          {savedRoutes.length === 0 ? (
            <div className="border border-gray-200 rounded-lg p-12 flex flex-col items-center text-center gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-gray-400" />
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-base font-semibold text-gray-800">
                  No saved routes yet
                </p>
                <p className="text-sm text-gray-500">
                  Save routes for offline access when you need them
                </p>
              </div>
              <button
                onClick={() => setCurrentView("landing")}
                className="mt-1 px-5 py-2.5 bg-green-600 text-white text-sm font-semibold rounded-md hover:bg-green-700 transition-colors"
              >
                Find Routes
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {savedRoutes.map((route) => (
                <div
                  key={route.id}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden"
                >
                  <div className="p-5 sm:p-6">
                    {/* Route & Fare Header */}
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-11 h-11 bg-gray-900 text-white rounded-md flex items-center justify-center font-black text-lg">
                          {route.routeNumber}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5 text-green-600 mb-0.5">
                            <TrendingUp className="h-3 w-3" />
                            <span className="text-[9px] font-black uppercase tracking-widest">
                              Est. Fare
                            </span>
                            {route.isExpress && (
                              <>
                                <span className="text-gray-300">·</span>
                                <Zap className="h-3 w-3 text-blue-400 fill-current" />
                                <span className="text-[9px] font-black uppercase tracking-widest text-blue-400">
                                  Express
                                </span>
                              </>
                            )}
                          </div>
                          <span className="text-xl font-black text-gray-900">
                            KSh {route.fare}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => dispatch(removeRoute(route.id))}
                        className="p-2.5 rounded-md border border-gray-200 text-gray-300 hover:border-red-200 hover:text-red-400 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Journey Timeline */}
                    <div className="relative mb-6 px-1">
                      <div className="absolute top-[8px] left-0 right-0 h-px bg-gray-200" />
                      <div className="relative flex justify-between items-center">
                        {route.path.map((stop, index) => (
                          <div
                            key={index}
                            className="flex flex-col items-center gap-2 max-w-[60px]"
                          >
                            <div
                              className={`w-4 h-4 rounded-full border-2 border-white shadow-sm z-10 ${
                                index === 0
                                  ? "bg-green-600"
                                  : index === route.path.length - 1
                                    ? "bg-gray-900"
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

                    {/* SACCO Operators */}
                    <div className="mb-5">
                      <div className="flex justify-between items-center mb-2.5">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                          SACCO Operators
                        </p>
                        <span className="text-[9px] font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded">
                          {route.matatus.length} Total
                        </span>
                      </div>
                      <div className="relative">
                        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar scroll-smooth snap-x">
                          {route.matatus.map((sacco, i) => (
                            <div
                              key={i}
                              className="snap-center flex-shrink-0 flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-md border border-gray-200"
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

                    {/* Stats + CTA */}
                    <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-gray-100 gap-4">
                      <div className="flex justify-around w-full sm:w-auto sm:gap-6">
                        <div className="flex flex-col items-center sm:items-start">
                          <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">
                            Time
                          </span>
                          <div className="flex items-center gap-1 text-xs font-bold text-gray-700">
                            <Clock className="h-3 w-3 text-gray-400" />
                            {route.duration}
                          </div>
                        </div>
                        <div className="flex flex-col items-center sm:items-start">
                          <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">
                            Distance
                          </span>
                          <div className="flex items-center gap-1 text-xs font-bold text-gray-700">
                            <Map className="h-3 w-3 text-gray-400" />
                            {route.distance}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedRoute(route);
                          setCurrentView("stages");
                        }}
                        className="w-full sm:w-auto bg-gray-900 text-white px-6 py-3 rounded-md font-semibold text-sm hover:bg-black flex items-center justify-center gap-2 group transition-colors"
                      >
                        Boarding Stages
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-4 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} Matatu Route Finder
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SavedRoutesView;
