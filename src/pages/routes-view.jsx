import React, { useState } from "react";
import { Clock, Zap, DollarSign, Users } from "lucide-react";

const RoutesView = ({ setCurrentView, searchQuery, setSelectedRoute }) => {
  const [savedRoutes, setSavedRoutes] = useState([]);

  const handleLocationRequest = () => {
    setUserLocation({ lat: -1.2921, lng: 36.8219 }); // Nairobi CBD
    setCurrentView("stages");
  };

  const handleRouteSelect = (route) => {
    setSelectedRoute(route);
    setCurrentView("comparison");
  };

  const handleSaveRoute = (route) => {
    setSavedRoutes([...savedRoutes, route]);
    alert("Route saved for offline access!");
  };

  const routes = [
    {
      id: 1,
      name: "Route 17B",
      destination: "Kasarani",
      departure: "Kencom",
      fare: 60,
      type: "Regular",
      duration: "45 mins",
      frequency: "Every 10 mins",
      payment: ["Cash", "M-Pesa"],
      dropoffs: ["Kasarani Stadium", "Kasarani Market", "Kasarani Mall"],
      matatus: [
        { name: "City Hopper", fare: 60, type: "Regular", rating: 4.2 },
        { name: "Quick Shuttle", fare: 80, type: "Express", rating: 4.5 },
        { name: "Comfort Line", fare: 70, type: "Regular", rating: 4.0 },
      ],
    },
    {
      id: 2,
      name: "Route 45A",
      destination: "Kasarani",
      departure: "Odeon",
      fare: 55,
      type: "Regular",
      duration: "40 mins",
      frequency: "Every 15 mins",
      payment: ["Cash", "M-Pesa", "Card"],
      dropoffs: ["Kasarani Sports Complex", "Kasarani Shopping Center"],
      matatus: [
        { name: "Express Metro", fare: 55, type: "Regular", rating: 3.8 },
        { name: "Fast Track", fare: 75, type: "Express", rating: 4.3 },
      ],
    },
    {
      id: 3,
      name: "Route 33C",
      destination: "Kasarani",
      departure: "Railways",
      fare: 65,
      type: "Express",
      duration: "35 mins",
      frequency: "Every 20 mins",
      payment: ["Cash", "M-Pesa"],
      dropoffs: ["Kasarani Junction", "Kasarani Estate"],
      matatus: [
        { name: "Speed Line", fare: 65, type: "Express", rating: 4.4 },
        { name: "City Express", fare: 70, type: "Express", rating: 4.1 },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Routes to {searchQuery}
          </h2>
          <p className="text-gray-600">{routes.length} routes found</p>
        </div>

        <div className="grid gap-6">
          {routes.map((route) => (
            <div
              key={route.id}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {route.name}
                  </h3>
                  <p className="text-gray-600">
                    {route.departure} → {route.destination}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600">
                    KES {route.fare}
                  </p>
                  <p className="text-sm text-gray-500">{route.type}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">{route.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm">{route.frequency}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  <span className="text-sm">{route.payment.join(", ")}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-purple-600" />
                  <span className="text-sm">
                    {route.matatus.length} operators
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Drop-off points:</p>
                <div className="flex flex-wrap gap-2">
                  {route.dropoffs.map((point, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 px-2 py-1 rounded text-sm"
                    >
                      {point}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => handleRouteSelect(route)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  View Details
                </button>
                <button
                  onClick={() => handleSaveRoute(route)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save Route
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={handleLocationRequest}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Find Nearest Stages
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoutesView;
