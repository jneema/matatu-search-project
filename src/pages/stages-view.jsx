import React from "react";
import { MapPin } from "lucide-react";

const StagesView = ({ setCurrentView, selectedRoute, selectedMatatu }) => {
  const stagesData = {
    "Super Metro": [
      { name: "Kencom Stage", distance: "0.2 km", walkTime: "3 mins" },
      { name: "Odeon Stage", distance: "0.5 km", walkTime: "7 mins" },
    ],
    "City Shuttle": [
      { name: "Odeon Stage", distance: "0.5 km", walkTime: "7 mins" },
      { name: "Railways Stage", distance: "0.8 km", walkTime: "12 mins" },
    ],
    "Express Links": [
      { name: "Railways Stage", distance: "0.8 km", walkTime: "12 mins" },
    ],
    "Thika Road Trans": [
      { name: "Kencom Stage", distance: "0.2 km", walkTime: "3 mins" },
    ],
    "Juja Trans": [
      { name: "Odeon Stage", distance: "0.5 km", walkTime: "7 mins" },
    ],
    "Westlands Express": [
      { name: "Ambassadeur Stage", distance: "0.3 km", walkTime: "4 mins" },
    ],
    "City Hopper": [
      { name: "Ambassadeur Stage", distance: "0.3 km", walkTime: "4 mins" },
    ],
    "Buruburu Trans": [
      { name: "Bus Station Stage", distance: "0.6 km", walkTime: "8 mins" },
    ],
    "Embakasi Link": [
      { name: "Bus Station Stage", distance: "0.6 km", walkTime: "8 mins" },
    ],
    "Kiambu Express": [
      { name: "Tea Room Stage", distance: "0.4 km", walkTime: "6 mins" },
    ],
    "Githunguri Trans": [
      { name: "Tea Room Stage", distance: "0.4 km", walkTime: "6 mins" },
    ],
    "Ngong Link": [
      { name: "Railways Stage", distance: "0.8 km", walkTime: "12 mins" },
    ],
    "Karen Express": [
      { name: "Railways Stage", distance: "0.8 km", walkTime: "12 mins" },
    ],
    "Athi Trans": [
      { name: "Machakos Bus Stage", distance: "0.7 km", walkTime: "10 mins" },
    ],
    "Machakos Link": [
      { name: "Machakos Bus Stage", distance: "0.7 km", walkTime: "10 mins" },
    ],
  };

  const nearbyStages = selectedMatatu
    ? stagesData[selectedMatatu.name] || []
    : selectedRoute
    ? selectedRoute.matatus.flatMap((matatu) => stagesData[matatu.name] || [])
    : [];

  const uniqueStages = Array.from(
    new Map(nearbyStages.map((stage) => [stage.name, stage])).values()
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <button
            onClick={() =>
              setCurrentView(selectedMatatu ? "comparison" : "routes")
            }
            className="text-green-600 hover:text-green-700 mb-4"
          >
            ← Back to {selectedMatatu ? "Comparison" : "Routes"}
          </button>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Nearby Stages
          </h2>
          <p className="text-gray-600">
            Walking directions to matatu stages for{" "}
            {selectedMatatu
              ? selectedMatatu.name
              : `${selectedRoute?.name} to ${selectedRoute?.destination}`}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <MapPin className="h-5 w-5 text-green-600" />
            <span className="text-gray-600">
              Your current location: Nairobi CBD
            </span>
          </div>
          <div className="bg-gray-100 h-48 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">
              Interactive map would be displayed here
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {uniqueStages.length > 0 ? (
            uniqueStages.map((stage, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold">{stage.name}</h3>
                    <p className="text-gray-600">
                      {stage.distance} away • {stage.walkTime} walk
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Get Directions
                    </button>
                    <button className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                      Call Stage
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-600">
              No stages found for{" "}
              {selectedMatatu
                ? selectedMatatu.name
                : `${selectedRoute?.name} to ${selectedRoute?.destination}`}
              .
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StagesView;
