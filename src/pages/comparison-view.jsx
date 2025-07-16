import React from "react";
import { Star } from "lucide-react";

const ComparisonView = ({
  setCurrentView,
  selectedRoute,
  setSelectedMatatu,
}) => {
  const handleMatatuSelect = (matatu) => {
    setSelectedMatatu(matatu);
    setCurrentView("stages");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <button
            onClick={() => setCurrentView("routes")}
            className="text-green-600 hover:text-green-700 mb-4"
          >
            ← Back to Routes
          </button>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {selectedRoute?.name} Details
          </h2>
          <p className="text-gray-600">
            Compare matatu operators on this route
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">Route Information</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-600">Departure</p>
              <p className="font-semibold">{selectedRoute?.departure}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Destination</p>
              <p className="font-semibold">{selectedRoute?.destination}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Duration</p>
              <p className="font-semibold">{selectedRoute?.duration}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Distance</p>
              <p className="font-semibold">{selectedRoute?.distance}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Available Matatus</h3>
          {selectedRoute?.matatus.map((matatu, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-lg font-semibold">{matatu.name}</h4>
                  <p className="text-gray-600">{matatu.type}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600">
                    KES {matatu.fare}
                  </p>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm">{matatu.rating}</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  {selectedRoute?.payment.map((method, i) => (
                    <span
                      key={i}
                      className="bg-gray-100 px-2 py-1 rounded text-sm"
                    >
                      {method}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => handleMatatuSelect(matatu)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Select This Matatu
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComparisonView;
