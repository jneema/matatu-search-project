import React from "react";
import {
  Clock,
  DollarSign,
  Users,
  MapPin,
  BookOpen,
  Star,
  ArrowRight,
} from "lucide-react";

const RoutesView = ({
  setCurrentView,
  selectedDestination,
  selectedRoad,
  selectedTown,
  setSelectedRoute,
  savedRoutes,
  setSavedRoutes,
}) => {
  const routesData = {
    Nairobi: {
      "Thika Road": {
        Kasarani: [
          {
            id: 1,
            name: "Route 237",
            departure: "Nairobi CBD",
            destination: "Kasarani",
            fare: 100,
            type: "Standard Matatu",
            duration: "45 mins",
            payment: ["Cash", "M-Pesa"],
            matatus: [
              { name: "Super Metro", fare: 100, type: "Standard", rating: 4.2 },
              { name: "City Shuttle", fare: 110, type: "Express", rating: 4.5 },
            ],
            dropoffs: ["Muthaiga", "Allsops", "Survey", "Roasters", "Kasarani"],
          },
          {
            id: 2,
            name: "Route 145",
            departure: "Nairobi CBD",
            destination: "Kasarani",
            fare: 120,
            type: "Express Matatu",
            duration: "35 mins",
            payment: ["Cash", "Card"],
            matatus: [
              {
                name: "Express Links",
                fare: 120,
                type: "Express",
                rating: 4.3,
              },
            ],
            dropoffs: ["Kasarani"],
          },
        ],
        Ruiru: [
          {
            id: 3,
            name: "Route 100",
            departure: "Nairobi CBD",
            destination: "Ruiru",
            fare: 150,
            type: "Standard Matatu",
            duration: "60 mins",
            payment: ["Cash", "M-Pesa"],
            matatus: [
              {
                name: "Thika Road Trans",
                fare: 150,
                type: "Standard",
                rating: 4.0,
              },
            ],
            dropoffs: ["Githurai", "Kahawa"],
          },
        ],
        Juja: [
          {
            id: 4,
            name: "Route 101",
            departure: "Nairobi CBD",
            destination: "Juja",
            fare: 200,
            type: "Standard Matatu",
            duration: "75 mins",
            payment: ["Cash"],
            matatus: [
              { name: "Juja Trans", fare: 200, type: "Standard", rating: 3.8 },
            ],
            dropoffs: ["Githurai", "Ruiru"],
          },
        ],
      },
      "Waiyaki Way": {
        Westlands: [
          {
            id: 5,
            name: "Route 23",
            departure: "Nairobi CBD",
            destination: "Westlands",
            fare: 80,
            type: "Standard Matatu",
            duration: "30 mins",
            payment: ["Cash", "M-Pesa", "Card"],
            matatus: [
              {
                name: "Westlands Express",
                fare: 80,
                type: "Standard",
                rating: 4.4,
              },
            ],
            dropoffs: ["Parklands"],
          },
        ],
        Kangemi: [
          {
            id: 6,
            name: "Route 22",
            departure: "Nairobi CBD",
            destination: "Kangemi",
            fare: 100,
            type: "Standard Matatu",
            duration: "40 mins",
            payment: ["Cash", "M-Pesa"],
            matatus: [
              { name: "City Hopper", fare: 100, type: "Standard", rating: 4.1 },
            ],
            dropoffs: ["Westlands"],
          },
        ],
      },
      "Jogoo Road": {
        Buruburu: [
          {
            id: 7,
            name: "Route 58",
            departure: "Nairobi CBD",
            destination: "Buruburu",
            fare: 90,
            type: "Standard Matatu",
            duration: "35 mins",
            payment: ["Cash", "M-Pesa"],
            matatus: [
              {
                name: "Buruburu Trans",
                fare: 90,
                type: "Standard",
                rating: 4.0,
              },
            ],
            dropoffs: ["Jogoo Estate"],
          },
        ],
        Embakasi: [
          {
            id: 8,
            name: "Route 33",
            departure: "Nairobi CBD",
            destination: "Embakasi",
            fare: 110,
            type: "Standard Matatu",
            duration: "50 mins",
            payment: ["Cash"],
            matatus: [
              {
                name: "Embakasi Link",
                fare: 110,
                type: "Standard",
                rating: 3.9,
              },
            ],
            dropoffs: ["Pipeline"],
          },
        ],
      },
      "Kiambu Road": {
        Kiambu: [
          {
            id: 9,
            name: "Route 120",
            departure: "Nairobi CBD",
            destination: "Kiambu",
            fare: 130,
            type: "Standard Matatu",
            duration: "55 mins",
            payment: ["Cash", "M-Pesa"],
            matatus: [
              {
                name: "Kiambu Express",
                fare: 130,
                type: "Standard",
                rating: 4.2,
              },
            ],
            dropoffs: ["Runda"],
          },
        ],
        Githunguri: [
          {
            id: 10,
            name: "Route 121",
            departure: "Nairobi CBD",
            destination: "Githunguri",
            fare: 180,
            type: "Standard Matatu",
            duration: "70 mins",
            payment: ["Cash"],
            matatus: [
              {
                name: "Githunguri Trans",
                fare: 180,
                type: "Standard",
                rating: 3.7,
              },
            ],
            dropoffs: ["Kiambu"],
          },
        ],
      },
      "Lang'ata Road": {
        Ngong: [
          {
            id: 11,
            name: "Route 111",
            departure: "Nairobi CBD",
            destination: "Ngong",
            fare: 120,
            type: "Standard Matatu",
            duration: "50 mins",
            payment: ["Cash", "M-Pesa"],
            matatus: [
              { name: "Ngong Link", fare: 120, type: "Standard", rating: 4.0 },
            ],
            dropoffs: ["Bomas"],
          },
        ],
        Karen: [
          {
            id: 12,
            name: "Route 24",
            departure: "Nairobi CBD",
            destination: "Karen",
            fare: 100,
            type: "Standard Matatu",
            duration: "40 mins",
            payment: ["Cash", "M-Pesa", "Card"],
            matatus: [
              {
                name: "Karen Express",
                fare: 100,
                type: "Standard",
                rating: 4.3,
              },
            ],
            dropoffs: ["Galleria"],
          },
        ],
      },
      "Mombasa Road": {
        "Athi River": [
          {
            id: 13,
            name: "Route 110",
            departure: "Nairobi CBD",
            destination: "Athi River",
            fare: 140,
            type: "Standard Matatu",
            duration: "60 mins",
            payment: ["Cash", "M-Pesa"],
            matatus: [
              { name: "Athi Trans", fare: 140, type: "Standard", rating: 4.1 },
            ],
            dropoffs: ["Syokimau"],
          },
        ],
        Machakos: [
          {
            id: 14,
            name: "Route 112",
            departure: "Nairobi CBD",
            destination: "Machakos",
            fare: 200,
            type: "Standard Matatu",
            duration: "80 mins",
            payment: ["Cash"],
            matatus: [
              {
                name: "Machakos Link",
                fare: 200,
                type: "Standard",
                rating: 3.8,
              },
            ],
            dropoffs: ["Athi River"],
          },
        ],
      },
    },
  };

  const routes =
    selectedTown && selectedRoad && selectedDestination
      ? routesData[selectedTown.name]?.[selectedRoad.name]?.[
          selectedDestination.name
        ] || []
      : [];

  const handleLocationRequest = (route) => {
    setSelectedRoute(route);
    setCurrentView("stages");
  };

  const handleRouteSelect = (route) => {
    setSelectedRoute(route);
    setCurrentView("comparison");
  };

  const handleSaveRoute = (route) => {
    if (!savedRoutes.some((saved) => saved.id === route.id)) {
      setSavedRoutes([...savedRoutes, route]);
      alert("Route saved for offline access!");
    } else {
      alert("Route already saved!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex items-center space-x-2 text-sm">
            <button
              onClick={() => setCurrentView("landing")}
              className="text-green-600 hover:text-green-800 font-medium"
            >
              All Towns
            </button>
            <ArrowRight className="h-4 w-4 text-gray-400" />
            <button
              onClick={() => setCurrentView("roads")}
              className="text-green-600 hover:text-green-800 font-medium"
            >
              {selectedTown?.name || "Town"}
            </button>
            <ArrowRight className="h-4 w-4 text-gray-400" />
            <button
              onClick={() => setCurrentView("destination")}
              className="text-green-600 hover:text-green-800 font-medium"
            >
              {selectedRoad?.name || "Road"}
            </button>
            <ArrowRight className="h-4 w-4 text-gray-400" />
            <span className="text-gray-600 font-medium">
              {selectedDestination?.name || "Destination"}
            </span>
          </div>
        </div>

        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Routes to {selectedDestination?.name || "Destination"}
          </h3>
          <div className="space-y-6">
            {routes.length > 0 ? (
              routes.map((route) => (
                <div
                  key={route.id}
                  className="bg-white rounded-xl shadow-md p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xl font-semibold text-gray-800">
                      {route.name} to {route.destination}
                    </h4>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {route.departure}
                      </span>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <DollarSign className="h-4 w-4 mr-2 text-gray-500" />
                        <span>Fare: KSh {route.fare}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-2 text-gray-500" />
                        <span>Duration: {route.duration}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="h-4 w-4 mr-2 text-gray-500" />
                        <span>Type: {route.type}</span>
                      </div>
                    </div>
                    <div className="space-y-2 flex justify-end">
                      <div>
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                          <span className="font-medium mr-2">
                            Payment Methods:
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {route.payment.map((method, index) => (
                              <span
                                key={index}
                                className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
                              >
                                {method}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <span className="font-medium mr-2">
                            Drop-off Points:
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {route.dropoffs.map((dropoff, index) => (
                              <span
                                key={index}
                                className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
                              >
                                {dropoff}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border-t pt-4">
                    <h5 className="text-md font-semibold text-gray-700 mb-2">
                      Available Matatus
                    </h5>
                    <div className="grid md:grid-cols-2 gap-4">
                      {route.matatus.map((matatu, index) => (
                        <div
                          key={index}
                          className="bg-gray-50 rounded-lg p-4 flex justify-between items-center"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center">
                              <div /> {/* Placeholder for icon alignment */}
                              <p className="text-sm font-medium text-gray-800">
                                {matatu.name}
                              </p>
                            </div>
                            <div className="flex items-center">
                              <div />
                              <p className="text-xs text-gray-600">
                                {matatu.type} - KSh {matatu.fare}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm text-gray-600 ml-1">
                              {matatu.rating}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex space-x-3 mt-4">
                    <button
                      onClick={() => handleRouteSelect(route)}
                      className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition-colors cursor-pointer text-sm"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleSaveRoute(route)}
                      className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer text-sm"
                      disabled={savedRoutes.some(
                        (saved) => saved.id === route.id
                      )}
                    >
                      Save Route
                    </button>
                    <button
                      onClick={() => handleLocationRequest(route)}
                      className="bg-purple-600 text-white px-3 py-1 rounded-lg hover:bg-purple-700 transition-colors text-sm cursor-pointer"
                    >
                      Find Nearby Stages
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-600">
                No routes found for {selectedDestination?.name} on{" "}
                {selectedRoad?.name} in {selectedTown?.name}.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoutesView;
