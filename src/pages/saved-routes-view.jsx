import React from "react";
import { BookOpen, CheckCircle } from "lucide-react";

const SavedRoutesView = ({ savedRoutes }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Saved Routes</h2>

        {savedRoutes.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No saved routes yet
            </h3>
            <p className="text-gray-500 mb-6">
              Save routes for offline access when you need them
            </p>
            <button
              onClick={() => setCurrentView("landing")}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              Find Routes
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {savedRoutes.map((route, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{route.name}</h3>
                    <p className="text-gray-600">
                      {route.departure} → {route.destination}
                    </p>
                    <p className="text-green-600 font-bold">KES {route.fare}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Available offline</p>
                    <CheckCircle className="h-5 w-5 text-green-600 ml-auto mt-1" />
                  </div>
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
