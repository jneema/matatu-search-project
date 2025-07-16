import React, { useState } from "react";
import {
  Search,
  MapPin,
  DollarSign,
  BookOpen,
  AlertCircle,
  Loader,
  ArrowRight,
} from "lucide-react";

const LandingView = ({
  setCurrentView,
  searchQuery,
  setSearchQuery,
  setSelectedTown,
  setHasSearched,
}) => {
  const [showNoResults, setShowNoResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const towns = [
    {
      id: 1,
      name: "Nairobi",
      description: "Capital city with extensive matatu network",
      routes: 45,
      icon: "🏙️",
    },
    {
      id: 2,
      name: "Mombasa",
      description: "Coastal city transport hub",
      routes: 28,
      icon: "🌊",
    },
    {
      id: 3,
      name: "Kisumu",
      description: "Lake region transport center",
      routes: 22,
      icon: "🏞️",
    },
    {
      id: 4,
      name: "Nakuru",
      description: "Rift Valley transport junction",
      routes: 18,
      icon: "🏔️",
    },
    {
      id: 5,
      name: "Eldoret",
      description: "North Rift transport hub",
      routes: 15,
      icon: "🌾",
    },
    {
      id: 6,
      name: "Thika",
      description: "Industrial town with good connectivity",
      routes: 12,
      icon: "🏭",
    },
  ];

  const handleTownSelect = (town) => {
    setSelectedTown(town);
    setCurrentView("roads");
  };

  const handleSearch = (query) => {
    if (!query.trim()) return;

    setIsSearching(true);
    setHasSearched(true);
    setShowNoResults(false);

    // Simulate search delay
    setTimeout(() => {
      const results = towns.filter((town) =>
        town.name.toLowerCase().includes(query.toLowerCase())
      );

      setIsSearching(false);

      if (results.length > 0) {
        if (results.length === 1) {
          handleTownSelect(results[0]);
        } else {
          setShowNoResults(false);
        }
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

  const popularTowns = ["Nairobi", "Mombasa", "Kisumu", "Nakuru"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Find Your Perfect Matatu Route
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Choose your town to discover routes, compare fares, and get
            real-time directions
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for your town..."
              value={searchQuery}
              onChange={(e) => {
                const value = e.target.value;
                setSearchQuery(value);

                if (value.trim() === "") {
                  setShowNoResults(false);
                  setHasSearched(false);
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
                  No towns found for "{searchQuery}"
                </h3>
              </div>
              <p className="text-red-700 mb-4">
                We couldn't find any towns matching your search. Try:
              </p>
              <ul className="list-disc list-inside text-red-700 mb-4 space-y-1">
                <li>Checking your spelling</li>
                <li>Using a different town name</li>
                <li>Trying one of our available towns below</li>
              </ul>
              <button
                onClick={handleTryAgain}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Popular Towns - Only show when not showing no results */}
          {!showNoResults && (
            <div className="mt-6">
              <p className="text-gray-500 mb-3 text-left">Popular towns:</p>
              <div className="flex flex-wrap gap-2">
                {popularTowns.map((town, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearch(town)}
                    className="bg-green-100 text-green-700 px-4 py-2 rounded-full hover:bg-green-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSearching}
                  >
                    {town}
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
              <span>Search Towns</span>
            )}
          </button>
        </div>

        {/* Town Selection Grid - Only show when not showing no results */}
        {!showNoResults && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Select Your Town
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {towns.map((town) => (
                <div
                  key={town.id}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer group hover:scale-105 border-2 border-transparent hover:border-green-200"
                  onClick={() => handleTownSelect(town)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-3xl">{town.icon}</div>
                    <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-green-600 transition-colors" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-green-600 transition-colors">
                    {town.name}
                  </h4>
                  <p className="text-gray-600 text-sm mb-3 text-left">
                    {town.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {town.routes} routes available
                    </span>
                    <span className="text-xs text-green-600 font-medium">
                      Click to explore
                    </span>
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
