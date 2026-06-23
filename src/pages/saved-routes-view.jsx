import React from "react";
import {
  IoBookOutline,
  IoBusOutline,
  IoArrowForwardOutline,
  IoTrashOutline,
  IoCloseOutline,
  IoTimeOutline,
  IoLocationOutline,
  IoStarOutline,
} from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { removeRoute } from "../store/saved-routes";
import { useNavigate } from "react-router";

const SavedRoutesView = ({ setCurrentView, setSelectedRoute }) => {
  const savedRoutes = useSelector((state) => state.savedRoutes.routes);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleStartTrip = (route) => {
    if (setSelectedRoute && setCurrentView) {
      setSelectedRoute(route);
      setCurrentView("trip");
    } else {
      sessionStorage.setItem("pendingTrip", JSON.stringify(route));
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col shadow-lg">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <IoBusOutline className="h-6 w-6 text-green-600" />
            <h1 className="text-lg font-bold text-gray-800 leading-none">
              Matatu Finder
            </h1>
          </div>
          <button
            onClick={() => (setCurrentView ? setCurrentView("landing") : navigate("/"))}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors cursor-pointer"
            title="Back to app"
          >
            <IoCloseOutline className="h-5 w-5 text-gray-500" />
          </button>
        </div>
      </header>

      <main className="flex-grow py-6 md:py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
              Saved Routes
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              {savedRoutes.length} route{savedRoutes.length !== 1 ? "s" : ""} saved
            </p>
          </div>

          {savedRoutes.length === 0 ? (
            <div className="border border-gray-200 rounded-xl p-10 flex flex-col items-center text-center gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                <IoBookOutline className="h-6 w-6 text-gray-400" />
              </div>
              <div>
                <p className="text-base font-semibold text-gray-800">No saved routes yet</p>
                <p className="text-sm text-gray-500 mt-0.5">
                  Bookmark routes from the search results to find them here
                </p>
              </div>
              <button
                onClick={() => (setCurrentView ? setCurrentView("landing") : navigate("/"))}
                className="px-5 py-2.5 bg-green-600 text-white text-sm font-semibold rounded-xl hover:bg-green-700 transition-colors cursor-pointer"
              >
                Find Routes
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {savedRoutes.map((route) => {
                const origin = typeof route.origin_stage === "string"
                  ? { name: route.origin_stage }
                  : route.origin_stage;
                const dest = typeof route.dest_stage === "string"
                  ? { name: route.dest_stage }
                  : route.dest_stage;

                return (
                  <div
                    key={route.id}
                    className="bg-white border border-gray-200 rounded-xl overflow-hidden"
                  >
                    <div className="px-4 py-3.5">
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="w-7 h-7 bg-gray-900 text-white rounded-md flex items-center justify-center shrink-0">
                            <IoBusOutline className="h-3.5 w-3.5" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-extrabold text-gray-900 leading-tight truncate">
                              {route.sacco}
                            </p>
                            <p className="text-sm font-black text-gray-900 leading-tight">
                              KES {route.fare}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => dispatch(removeRoute(route.id))}
                          className="p-1.5 rounded-lg border border-gray-200 text-gray-300 hover:border-red-200 hover:text-red-400 hover:bg-red-50 transition-colors shrink-0 cursor-pointer"
                        >
                          <IoTrashOutline className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      {(origin || dest) && (
                        <div className="flex items-stretch gap-3 mb-3">
                          <div className="flex flex-col items-center py-0.5 gap-0.5 shrink-0">
                            <div className="w-2 h-2 rounded-full bg-green-500" />
                            <div className="w-px flex-1 bg-gray-200" />
                            <div className="w-2 h-2 rounded-full bg-gray-900" />
                          </div>
                          <div className="flex flex-col justify-between gap-2 flex-1 min-w-0">
                            <div>
                              <p className="text-[9px] font-black text-green-600 uppercase tracking-widest leading-none mb-0.5">Board</p>
                              <p className="text-xs font-bold text-gray-800 truncate">{origin?.name ?? "—"}</p>
                            </div>
                            <div>
                              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none mb-0.5">Alight</p>
                              <p className="text-xs font-bold text-gray-800 truncate">{dest?.name ?? "—"}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                        {route.duration_mins && (
                          <span className="flex items-center gap-1">
                            <IoTimeOutline className="h-3 w-3" />
                            <span className="font-semibold text-gray-700">{route.duration_mins} min</span>
                          </span>
                        )}
                        {route.via && (
                          <>
                            <span>·</span>
                            <span className="flex items-center gap-1 truncate">
                              <IoLocationOutline className="h-3 w-3 shrink-0" />
                              <span className="truncate">{route.via}</span>
                            </span>
                          </>
                        )}
                        {route.safety_rating != null && (
                          <>
                            <span>·</span>
                            <span className="flex items-center gap-0.5">
                              <IoStarOutline className="h-3 w-3 text-amber-400" />
                              <span className="font-bold text-gray-700">{route.safety_rating.toFixed(1)}</span>
                            </span>
                          </>
                        )}
                      </div>

                      <button
                        onClick={() => handleStartTrip(route)}
                        className="w-full flex items-center justify-center gap-1.5 px-3 py-2.5 bg-gray-900 text-white text-sm font-bold rounded-xl hover:bg-black active:scale-[0.98] transition-all cursor-pointer"
                      >
                        Start Trip
                        <IoArrowForwardOutline className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <footer className="border-t border-gray-200 py-4 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} Matatu Finder
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SavedRoutesView;
