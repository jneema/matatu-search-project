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
      <div className="max-w-4xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
        {/* Header Section */}
        <div className="mb-6 sm:mb-8">
          <button
            onClick={() => setCurrentView("routes")}
            className="text-green-600 hover:text-green-700 mb-3 sm:mb-4 text-sm sm:text-base"
          >
            ← Back to Routes
          </button>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
            {selectedRoute?.name} Details
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Compare matatu operators on this route
          </p>
        </div>

        {/* Route Information Card */}
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-4 sm:mb-6">
          <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
            Route Information
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            <div>
              <p className="text-xs sm:text-sm text-gray-600 mb-1">Departure</p>
              <p className="font-semibold text-sm sm:text-base">
                {selectedRoute?.departure}
              </p>
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-600 mb-1">
                Destination
              </p>
              <p className="font-semibold text-sm sm:text-base">
                {selectedRoute?.destination}
              </p>
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-600 mb-1">Duration</p>
              <p className="font-semibold text-sm sm:text-base">
                {selectedRoute?.duration}
              </p>
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-600 mb-1">Distance</p>
              <p className="font-semibold text-sm sm:text-base">
                {selectedRoute?.distance}
              </p>
            </div>
          </div>
        </div>

        {/* Available Matatus Section */}
        <div className="space-y-3 sm:space-y-4">
          <h3 className="text-lg sm:text-xl font-semibold">
            Available Matatus
          </h3>
          {selectedRoute?.matatus.map((matatu, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-4 sm:p-6"
            >
              {/* Matatu Header */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 space-y-2 sm:space-y-0">
                <div className="flex-1">
                  <h4 className="text-left sm:text-lg font-semibold mb-1">
                    {matatu.name}
                  </h4>
                  <p className="text-gray-600 text-left sm:text-base">
                    {matatu.type}
                  </p>
                </div>
                <div className="flex sm:flex-col sm:text-right items-center sm:items-end space-x-3 sm:space-x-0">
                  <p className="text-xl sm:text-2xl font-bold text-green-600">
                    KES {matatu.fare}
                  </p>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm">{matatu.rating}</span>
                  </div>
                </div>
              </div>

              {/* Payment Methods and Select Button */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0">
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {selectedRoute?.payment.map((method, i) => (
                    <span
                      key={i}
                      className="bg-gray-100 px-2 py-1 rounded text-xs sm:text-sm"
                    >
                      {method}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => handleMatatuSelect(matatu)}
                  className="bg-green-600 text-white text-xs sm:text-sm px-3 py-2 sm:px-4 rounded-md hover:bg-green-700 transition-colors w-full sm:w-auto"
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
