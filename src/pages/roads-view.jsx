import React, { useState } from "react";
import { Search, AlertCircle, Loader, ArrowRight } from "lucide-react";

const RoadsView = ({
  setCurrentView,
  searchQuery,
  setSearchQuery,
  setSelectedRoad,
  setHasSearched,
}) => {
  const [isSearching, setIsSearching] = useState(false);
  const [showNoResults, setShowNoResults] = useState(false);
  const [filteredRoads, setFilteredRoads] = useState([]);

  const roads = [
    {
      id: 1,
      name: "Thika Road",
      routes: 45,
    },
    {
      id: 2,
      name: "Waiyaki Way",
      routes: 28,
    },
    {
      id: 3,
      name: "Jogoo Road",
      routes: 22,
    },
    {
      id: 4,
      name: "Kiambu Road",
      routes: 18,
    },
    {
      id: 5,
      name: "Lang'ata Road",
      routes: 15,
    },
    {
      id: 6,
      name: "Mombasa Road",
      routes: 12,
    },
  ];

  const handleRoadSelect = (road) => {
    setSelectedRoad(road);
    setCurrentView("destination");
    setHasSearched(false);
    setSearchQuery("");
    setFilteredRoads([]);
    setShowNoResults(false);
  };

  const handleSearch = (query) => {
    if (!query.trim()) {
      setFilteredRoads([]);
      setShowNoResults(false);
      setHasSearched(false);
      return;
    }

    setIsSearching(true);
    setHasSearched(true);
    setShowNoResults(false);

    setTimeout(() => {
      const results = roads.filter((road) =>
        road.name.toLowerCase().includes(query.toLowerCase())
      );

      setIsSearching(false);
      setFilteredRoads(results);

      if (results.length === 0) {
        setShowNoResults(true);
      } else if (results.length === 1) {
        handleRoadSelect(results[0]);
      }
    }, 1000);
  };

  const handleTryAgain = () => {
    setShowNoResults(false);
    setSearchQuery("");
    setHasSearched(false);
    setFilteredRoads([]);
  };

  const popularRoads = [
    "Thika Road",
    "Kiambu Road",
    "Waiyaki Way",
    "Jogoo Road",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Find Road</h2>
          <p className="text-xl text-gray-600 mb-8">
            Choose the road you desire to go to to discover routes, compare
            fares, and get real-time directions
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for road..."
              value={searchQuery}
              onChange={(e) => {
                const value = e.target.value;
                setSearchQuery(value);
                if (value.trim() === "") {
                  setShowNoResults(false);
                  setHasSearched(false);
                  setFilteredRoads([]);
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
                  No roads found for "{searchQuery}"
                </h3>
              </div>
              <p className="text-red-700 mb-4">
                We couldn't find any roads matching your search. Try:
              </p>
              <ul className="list-disc list-inside text-red-700 mb-4 space-y-1">
                <li>Checking your spelling</li>
                <li>Using a different road name</li>
                <li>Trying one of our available roads below</li>
              </ul>
              <button
                onClick={handleTryAgain}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Popular Roads */}
          <div className="mt-6">
            <p className="text-gray-500 mb-3 text-left">Popular roads:</p>
            <div className="flex flex-wrap gap-2">
              {popularRoads.map((road, index) => (
                <button
                  key={index}
                  onClick={() => handleSearch(road)}
                  className="bg-green-100 text-green-700 px-4 py-2 rounded-full hover:bg-green-200 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSearching}
                >
                  {road}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => handleSearch(searchQuery)}
            disabled={isSearching || !searchQuery.trim()}
            className="w-full mt-6 bg-green-600 text-white py-4 rounded-xl font-semibold hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2 cursor-pointer"
          >
            {isSearching ? (
              <>
                <Loader className="h-5 w-5 animate-spin" />
                <span>Searching...</span>
              </>
            ) : (
              <span>Search Roads</span>
            )}
          </button>
        </div>

        {/* Road Selection Grid */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Select Your Road
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(filteredRoads.length > 0 && !showNoResults
              ? filteredRoads
              : roads
            ).map((road) => (
              <div
                key={road.id}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer group hover:scale-105 border-2 border-transparent hover:border-green-200"
                onClick={() => handleRoadSelect(road)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="text-3xl">🛣️</div>{" "}
                  {/* Added icon for consistency */}
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-green-600 transition-colors" />
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-green-600 transition-colors">
                  {road.name}
                </h4>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {road.routes} routes available
                  </span>
                  <span className="text-xs text-green-600 font-medium">
                    Click to explore
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadsView;
