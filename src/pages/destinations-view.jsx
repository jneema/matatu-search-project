import React, { useState } from "react";
import {
  Search,
  AlertCircle,
  Loader,
  MapPin,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

const DestinationsView = ({
  setCurrentView,
  searchQuery,
  setSearchQuery,
  setSelectedDestination,
  setHasSearched,
  selectedRoad,
  selectedTown,
  setCurrentLocation,
}) => {
  const [isSearching, setIsSearching] = useState(false);
  const [showNoResults, setShowNoResults] = useState(false);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [currentLocation, setLocalCurrentLocation] = useState("");
  const [locationError, setLocationError] = useState("");
  const [isCBDSelected, setIsCBDSelected] = useState(false);

  // Sample destinations data tied to roads
  const destinationsData = {
    "Thika Road": [
      { id: 1, name: "Kasarani", routes: 10, icon: "🏟️" },
      { id: 2, name: "Ruiru", routes: 8, icon: "🏘️" },
      { id: 3, name: "Juja", routes: 6, icon: "🎓" },
      { id: 14, name: "Nairobi CBD", routes: 12, icon: "🏙️" },
    ],
    "Waiyaki Way": [
      { id: 4, name: "Westlands", routes: 12, icon: "🏬" },
      { id: 5, name: "Kangemi", routes: 9, icon: "🏘️" },
      { id: 15, name: "Nairobi CBD", routes: 10, icon: "🏙️" },
    ],
    "Jogoo Road": [
      { id: 6, name: "Buruburu", routes: 7, icon: "🏡" },
      { id: 7, name: "Embakasi", routes: 5, icon: "🏭" },
      { id: 16, name: "Nairobi CBD", routes: 8, icon: "🏙️" },
    ],
    "Kiambu Road": [
      { id: 8, name: "Kiambu", routes: 6, icon: "🌳" },
      { id: 9, name: "Githunguri", routes: 4, icon: "🌄" },
      { id: 17, name: "Nairobi CBD", routes: 7, icon: "🏙️" },
    ],
    "Lang'ata Road": [
      { id: 10, name: "Ngong", routes: 8, icon: "🏞️" },
      { id: 11, name: "Karen", routes: 5, icon: "🏡" },
      { id: 18, name: "Nairobi CBD", routes: 9, icon: "🏙️" },
    ],
    "Mombasa Road": [
      { id: 12, name: "Athi River", routes: 7, icon: "🏭" },
      { id: 13, name: "Machakos", routes: 4, icon: "🏙️" },
      { id: 19, name: "Nairobi CBD", routes: 6, icon: "🏙️" },
    ],
  };

  // Get destinations for the selected road
  const destinations = selectedRoad
    ? destinationsData[selectedRoad.name] || []
    : [];

  const resetSearch = () => {
    setFilteredDestinations([]);
    setShowNoResults(false);
    setHasSearched(false);
    setIsCBDSelected(false);
    setLocalCurrentLocation("");
    setLocationError("");
    setIsSearching(false);
  };

  const handleDestinationSelect = (destination) => {
    if (destination.name.toLowerCase().includes("cbd")) {
      setIsCBDSelected(true);
      setSelectedDestination(destination);
      setHasSearched(true);
      setSearchQuery("");
    } else {
      setSelectedDestination(destination);
      setCurrentLocation("Nairobi CBD");
      setCurrentView("routes");
      resetSearch();
    }
  };

  const handleSearch = (query) => {
    if (!query.trim()) {
      resetSearch();
      return;
    }

    setIsSearching(true);
    setHasSearched(true);
    setShowNoResults(false);

    // Check for CBD in the query
    const normalizedQuery = query.toLowerCase().trim();
    if (normalizedQuery === "cbd" || normalizedQuery.includes("nairobi cbd")) {
      const cbdDestination = destinations.find((d) =>
        d.name.toLowerCase().includes("cbd")
      );
      if (cbdDestination) {
        setIsCBDSelected(true);
        setSelectedDestination(cbdDestination);
        setSearchQuery("");
        setIsSearching(false);
        return;
      }
    }

    // Perform search for non-CBD destinations
    setTimeout(() => {
      const results = destinations.filter((destination) =>
        destination.name.toLowerCase().includes(query.toLowerCase())
      );

      setIsSearching(false);
      setFilteredDestinations(results);

      if (results.length === 0) {
        setShowNoResults(true);
      } else if (results.length === 1) {
        handleDestinationSelect(results[0]);
      }
    }, 1000);
  };

  const handleTryAgain = () => {
    resetSearch();
    setSearchQuery("");
  };

  const handleLocationSubmit = () => {
    if (!currentLocation.trim()) {
      setLocationError("Please enter your current location");
      return;
    }
    const cbdDestination = destinations.find((d) =>
      d.name.toLowerCase().includes("cbd")
    );
    if (cbdDestination) {
      setSelectedDestination(cbdDestination);
      setCurrentLocation(currentLocation);
      setCurrentView("routes");
      resetSearch();
    }
  };

  const handleRevert = () => {
    resetSearch();
  };

  const popularDestinations = destinations.slice(0, 4).map((d) => d.name);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        {/* Breadcrumbs */}
        <div className="bg-white rounded-lg shadow-md p-3 mb-6 sm:p-4">
          <div className="flex items-center space-x-2 text-sm overflow-x-auto whitespace-nowrap">
            <button
              onClick={() => setCurrentView("landing")}
              className="inline text-green-600 hover:text-green-800 font-medium"
              aria-label="Select all towns"
            >
              All Towns
            </button>
            <ArrowRight className="h-4 w-4 text-gray-400 inline" />
            <button
              onClick={() => setCurrentView("roads")}
              className="inline text-green-600 hover:text-green-800 font-medium"
              aria-label={`Select road in ${selectedTown?.name || "Town"}`}
            >
              {selectedTown?.name || "Town"}
            </button>
            <ArrowRight className="h-4 w-4 text-gray-400 inline" />
            <span className="text-gray-600 font-medium">
              {selectedRoad?.name || "Road"}
            </span>
          </div>
        </div>

        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-4">
            Find Destination
          </h2>
          <p className="text-base sm:text-xl text-gray-600 mb-6 sm:mb-8">
            Choose your destination on {selectedRoad?.name} in{" "}
            {selectedTown?.name}
          </p>
        </div>

        {/* Search and Location Input */}
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-8 sm:mb-12">
          {/* Destination Search (Hidden for CBD) */}
          {!isCBDSelected && (
            <div className="relative mb-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for destination..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (e.target.value === "") {
                    resetSearch();
                  }
                }}
                onKeyPress={(e) =>
                  e.key === "Enter" && handleSearch(searchQuery)
                }
                className="w-full pl-10 pr-4 py-3 text-base border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
                disabled={isSearching}
                aria-label="Search for destination"
              />
              {isSearching && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <Loader className="h-5 w-5 text-gray-400 animate-spin" />
                </div>
              )}
            </div>
          )}

          {/* CBD Message and Location Input */}
          {isCBDSelected && (
            <div className="space-y-3">
              <p className="text-base text-gray-600">
                You're traveling to Nairobi CBD. Please enter your current
                location.
              </p>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Enter your current location..."
                  value={currentLocation}
                  onChange={(e) => {
                    setLocalCurrentLocation(e.target.value);
                    setLocationError("");
                  }}
                  onKeyPress={(e) =>
                    e.key === "Enter" && handleLocationSubmit()
                  }
                  className="w-full pl-10 pr-4 py-3 text-base border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                  aria-label="Enter current location"
                />
              </div>
              {locationError && (
                <p className="text-red-600 text-sm">{locationError}</p>
              )}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleRevert}
                  className="w-full sm:w-1/2 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors flex items-center justify-center space-x-2"
                  aria-label="Back to destination selection"
                >
                  <ArrowLeft className="h-5 w-5" />
                  <span>Back to Destinations</span>
                </button>
                <button
                  onClick={handleLocationSubmit}
                  disabled={isSearching}
                  className="w-full sm:w-1/2 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  aria-label="Find routes to Nairobi CBD"
                >
                  <span>Find Routes</span>
                </button>
              </div>
            </div>
          )}

          {/* Search Button and Popular Destinations (Non-CBD) */}
          {!isCBDSelected && (
            <>
              <button
                onClick={() => handleSearch(searchQuery)}
                disabled={isSearching || !searchQuery.trim()}
                className="w-full mt-4 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:bg-gray-400 cursor-pointer disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                aria-label="Search destinations"
              >
                {isSearching ? (
                  <>
                    <Loader className="h-5 w-5 animate-spin" />
                    <span>Searching...</span>
                  </>
                ) : (
                  <span>Search Destinations</span>
                )}
              </button>
              <div className="mt-4">
                <button
                  onClick={() => setFilteredDestinations([])}
                  className="text-sm text-green-600 hover:text-green-800 mb-2 w-full text-left"
                  aria-label="Toggle popular destinations"
                >
                  {filteredDestinations.length === 0
                    ? "Hide Popular Destinations"
                    : "Show Popular Destinations"}
                </button>
                {filteredDestinations.length === 0 && (
                  <div className="flex flex-wrap gap-2">
                    {popularDestinations.map((destination, index) => (
                      <button
                        key={index}
                        onClick={() => handleSearch(destination)}
                        className="bg-green-100 text-green-700 px-3 py-2 rounded-full hover:bg-green-200 transition-colors text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isSearching}
                        aria-label={`Search for ${destination}`}
                      >
                        {destination}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* No Results Fallback */}
        {showNoResults && (
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <AlertCircle className="h-6 w-6 text-red-600" />
              <h3 className="text-lg font-semibold text-red-800">
                No destinations found for "{searchQuery}"
              </h3>
            </div>
            <p className="text-red-700 mb-4 text-base">
              Try checking your spelling or selecting a destination below.
            </p>
            <button
              onClick={handleTryAgain}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm"
              aria-label="Try searching again"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Destination Selection (Hidden for CBD) */}
        {!isCBDSelected && (
          <div className="mb-12">
            <h3 className="text-lg sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">
              Select Your Destination
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {(filteredDestinations.length > 0 && !showNoResults
                ? filteredDestinations
                : destinations
              ).map((destination) => (
                <div
                  key={destination.id}
                  onClick={() => handleDestinationSelect(destination)}
                  className="bg-white p-4 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-all border-2 border-transparent hover:border-green-200 focus:ring-2 focus:ring-green-500 cursor-pointer group hover:scale-105"
                  aria-label={`Select destination ${destination.name}`}
                >
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className="text-2xl sm:text-3xl">
                      {destination.icon}
                    </div>
                    <MapPin className="h-6 w-6 text-gray-400 group-hover:text-green-600 transition-colors" />
                  </div>
                  <h4 className="text-base sm:text-xl font-bold text-gray-800 mb-2 group-hover:text-green-600 transition-colors">
                    {destination.name}
                  </h4>
                  <div className="flex items-center justify-between text-sm sm:text-base">
                    <span className="text-gray-500">
                      {destination.routes} routes available
                    </span>
                    <span className="text-green-600 font-medium">
                      Tap to explore
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DestinationsView;
