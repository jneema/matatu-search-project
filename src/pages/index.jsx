import React, { useState } from "react";
import {
  Search,
  MapPin,
  DollarSign,
  BookOpen,
  AlertCircle,
  Loader,
} from "lucide-react";

const LandingView = ({
  setCurrentView,
  searchQuery,
  setSearchQuery,
  setSearchResults,
  setHasSearched,
}) => {
  const [showNoResults, setShowNoResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const allRoutes = [
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
    {
      id: 4,
      name: "Route 12A",
      destination: "Westlands",
      departure: "Kencom",
      fare: 40,
      type: "Regular",
      duration: "25 mins",
      frequency: "Every 8 mins",
      payment: ["Cash", "M-Pesa"],
      dropoffs: ["Westlands Mall", "Sarit Centre", "ABC Place"],
      matatus: [
        { name: "Metro Express", fare: 40, type: "Regular", rating: 4.1 },
        { name: "City Runner", fare: 45, type: "Regular", rating: 3.9 },
      ],
    },
    {
      id: 5,
      name: "Route 8B",
      destination: "Ngong",
      departure: "Kencom",
      fare: 80,
      type: "Regular",
      duration: "60 mins",
      frequency: "Every 12 mins",
      payment: ["Cash", "M-Pesa"],
      dropoffs: ["Ngong Town", "Ngong Hills", "Karen"],
      matatus: [
        { name: "Ngong Express", fare: 80, type: "Regular", rating: 4.0 },
        { name: "Hill Cruiser", fare: 85, type: "Regular", rating: 3.9 },
      ],
    },
  ];

  const handleSearch = (query) => {
    if (!query.trim()) return;

    setIsSearching(true);
    setHasSearched(true);
    setShowNoResults(false);

    // Simulate search delay
    setTimeout(() => {
      const results = allRoutes.filter(
        (route) =>
          route.destination.toLowerCase().includes(query.toLowerCase()) ||
          route.departure.toLowerCase().includes(query.toLowerCase()) ||
          route.name.toLowerCase().includes(query.toLowerCase())
      );

      setSearchResults(results);
      setIsSearching(false);

      if (results.length > 0) {
        setCurrentView("routes");
      } else {
        setShowNoResults(true);
      }
    }, 1000);
  };

  const handleTryAgain = () => {
    setShowNoResults(false);
    setSearchQuery("");
    setHasSearched(false);
  };

  const suggestions = [
    "Kasarani",
    "Westlands",
    "Ngong",
    "Kikuyu",
    "Thika",
    "Kiambu",
  ];

  const popularRoutes = [
    { from: "CBD", to: "Westlands", fare: "KES 40" },
    { from: "Kencom", to: "Kasarani", fare: "KES 60" },
    { from: "Railways", to: "Ngong", fare: "KES 80" },
    { from: "Odeon", to: "Thika", fare: "KES 120" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Find Your Perfect Matatu Route
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Discover routes, compare fares, and get real-time directions in
            Nairobi
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Where to?"
              value={searchQuery}
              onChange={(e) => {
                const value = e.target.value;
                setSearchQuery(value);

                if (value.trim() === "") {
                  setShowNoResults(false);
                  setHasSearched(false);
                  setSearchResults([]);
                }
              }}
              onKeyPress={(e) => e.key === "Enter" && handleSearch(searchQuery)}
              className="w-full pl-12 pr-4 py-4 text-md sm:text-lg border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none disabled:bg-gray-100"
              disabled={isSearching}
            />

            {isSearching && (
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                <Loader className="h-5 w-5 text-gray-400 animate-spin" />
              </div>
            )}
          </div>

          {/* No Results Fallback */}
          {showNoResults && (
            <div className="mt-6 p-4 sm:p-6 bg-red-50 rounded-xl border border-red-200">
              <div className="flex items-center space-x-3 mb-4">
                <AlertCircle className="h-6 w-6 text-red-600" />
                <h3 className="text-lg font-semibold text-red-800">
                  No routes found for "{searchQuery}"
                </h3>
              </div>
              <p className="text-red-700 mb-4">
                We couldn't find any matatu routes to your destination. Try:
              </p>
              <ul className="list-disc list-inside text-red-700 mb-4 space-y-1">
                <li>Checking your spelling</li>
                <li>Using a different destination name</li>
                <li>Searching for a nearby area</li>
                <li>Trying one of our popular destinations below</li>
              </ul>
              <button
                onClick={handleTryAgain}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Popular Destinations - Only show when not showing no results */}
          {!showNoResults && (
            <div className="mt-6">
              <p className="text-gray-500 mb-3 text-left">Popular destinations:</p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearch(suggestion)}
                    className="bg-green-100 text-green-700 px-4 py-2 rounded-full hover:bg-green-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSearching}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={() => handleSearch(searchQuery)}
            disabled={isSearching || !searchQuery.trim()}
            className="w-full mt-6 bg-green-600 text-white py-4 rounded-xl font-semibold hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isSearching ? (
              <>
                <Loader className="h-5 w-5 animate-spin" />
                <span>Searching...</span>
              </>
            ) : (
              <span>Search Routes</span>
            )}
          </button>
        </div>

        {/* Popular Routes Section - Only show when not showing no results */}
        {!showNoResults && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Popular Routes
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {popularRoutes.map((route, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer group"
                  onClick={() => handleSearch(route.to)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-gray-800 group-hover:text-green-600 transition-colors">
                        {route.from} → {route.to}
                      </p>
                      <p className="text-sm text-gray-600 text-left">Click to search</p>
                    </div>
                    <div className="text-green-600 font-bold">{route.fare}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col items-center text-center">
            <MapPin className="h-12 w-12 text-green-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Find Nearby Stages</h3>
            <p className="text-gray-600">
              Get walking directions to the nearest matatu stage
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col items-center text-center">
            <DollarSign className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Compare Fares</h3>
            <p className="text-gray-600">
              View and compare fares across different matatu operators
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col items-center text-center">
            <BookOpen className="h-12 w-12 text-purple-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Offline Access</h3>
            <p className="text-gray-600">
              Save routes for offline use when you need them most
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingView;
