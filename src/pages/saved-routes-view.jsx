import React from "react";
import { BookOpen, CheckCircle, ChevronRight } from "lucide-react";

const SavedRoutesView = ({ savedRoutes, setCurrentView }) => {
  return (
    <div className="min-h-screen bg-white font-sans">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
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
          <div className="space-y-3">
            {savedRoutes.map((route, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-5 flex items-center justify-between"
              >
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-semibold text-gray-900">
                    {route.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {route.departure} → {route.destination}
                  </p>
                  <p className="text-sm font-bold text-green-600">
                    KES {route.fare}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                  <p className="text-xs text-gray-400">Available offline</p>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedRoutesView;
