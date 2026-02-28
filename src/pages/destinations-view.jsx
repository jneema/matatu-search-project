import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  MapPin,
  ArrowRight,
  AlertCircle,
  X,
  ChevronRight,
  Zap,
} from "lucide-react";
import { getDestinationsByRoad, getRoadByName } from "../data/routesData";

const DestinationsView = ({
  setCurrentView,
  searchQuery,
  setSearchQuery,
  setSelectedDestination,
  selectedRoad,
  selectedTown,
  setCurrentLocation,
}) => {
  const road = getRoadByName(selectedRoad?.name);
  const destinations = road ? getDestinationsByRoad(road.id) : [];

  const nonCBDDestinations = destinations.filter(
    (d) => !d.name.toLowerCase().includes("cbd"),
  );

  const [isOpen, setIsOpen] = useState(false);
  const [filteredDestinations, setFilteredDestinations] =
    useState(destinations);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isCBDSelected, setIsCBDSelected] = useState(false);
  const [localStartLocation, setLocalStartLocation] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen || isCBDSelected) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((p) => Math.min(p + 1, filteredDestinations.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((p) => Math.max(p - 1, 0));
      }
      if (e.key === "Enter" && activeIndex >= 0)
        handleDestinationSelect(filteredDestinations[activeIndex]);
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, activeIndex, filteredDestinations, isCBDSelected]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setActiveIndex(-1);
    setFilteredDestinations(
      value.trim()
        ? destinations.filter((d) =>
            d.name.toLowerCase().includes(value.toLowerCase()),
          )
        : destinations,
    );
    setIsOpen(true);
  };

  const handleDestinationSelect = (dest) => {
    if (dest.name.toLowerCase().includes("cbd")) {
      setIsCBDSelected(true);
      setIsOpen(false);
    } else {
      setSelectedDestination(dest);
      setCurrentLocation("Nairobi CBD");
      setCurrentView("routes");
    }
  };

  const handleCBDTravelSubmit = () => {
    if (!localStartLocation) return;
    setSelectedDestination(destinations.find((d) => d.name.includes("CBD")));
    setCurrentLocation(localStartLocation);
    setCurrentView("routes");
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6 overflow-x-auto whitespace-nowrap no-scrollbar">
          <button
            onClick={() => setCurrentView("landing")}
            className="hover:text-green-600 cursor-pointer transition-colors"
          >
            Home
          </button>
          <ChevronRight className="h-3 w-3 flex-shrink-0" />
          <button
            onClick={() => setCurrentView("roads")}
            className="hover:text-green-600 cursor-pointer transition-colors"
          >
            {selectedRoad?.name}
          </button>
          <ChevronRight className="h-3 w-3 flex-shrink-0" />
          <span className="text-green-600">Destinations</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
            Select Destination
          </h2>
          <p className="text-lg text-gray-500">
            Available stops along{" "}
            <strong className="text-gray-700">{selectedRoad?.name}</strong>
          </p>
        </div>

        <div className="relative max-w-2xl mx-auto mb-5" ref={dropdownRef}>
          {!isCBDSelected ? (
            <>
              {/* Search */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Where on this road are you going?"
                  value={searchQuery}
                  onChange={handleInputChange}
                  onFocus={() => {
                    setFilteredDestinations(destinations);
                    setIsOpen(true);
                  }}
                  className="w-full pl-12 pr-12 py-5 bg-white text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 outline-none transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setFilteredDestinations(destinations);
                    }}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center"
                  >
                    <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </div>

              {/* Dropdown */}
              {isOpen && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                  {filteredDestinations.length > 0 ? (
                    <div className="py-1">
                      <p className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                        Suggested Stops
                      </p>
                      {filteredDestinations.map((dest, index) => (
                        <button
                          key={dest.id}
                          onClick={() => handleDestinationSelect(dest)}
                          onMouseEnter={() => setActiveIndex(index)}
                          className={`w-full flex items-center justify-between px-4 py-3.5 transition-colors ${
                            activeIndex === index
                              ? "bg-green-50"
                              : "hover:bg-gray-50"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-8 h-8 rounded-md flex items-center justify-center ${
                                activeIndex === index
                                  ? "bg-green-100"
                                  : "bg-gray-100"
                              }`}
                            >
                              <MapPin
                                className={`h-4 w-4 ${
                                  activeIndex === index
                                    ? "text-green-700"
                                    : "text-gray-500"
                                }`}
                              />
                            </div>
                            <div className="text-left">
                              <p
                                className={`font-semibold text-sm ${
                                  activeIndex === index
                                    ? "text-green-700"
                                    : "text-gray-800"
                                }`}
                              >
                                {dest.name}
                              </p>
                              <p className="text-xs text-gray-400">
                                {dest.description}
                              </p>
                            </div>
                          </div>
                          <ArrowRight
                            className={`h-4 w-4 transition-transform ${
                              activeIndex === index
                                ? "text-green-600 translate-x-0.5"
                                : "text-gray-300"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center">
                      <AlertCircle className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                      <p className="text-gray-500 text-sm">
                        No destinations found
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Popular Destinations Pills */}
              <div className="mt-5">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="h-3.5 w-3.5 text-green-600" />
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                    Popular Destinations
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {destinations.map((dest) => (
                    <button
                      key={dest.id}
                      onClick={() => handleDestinationSelect(dest)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-600 hover:border-green-600 hover:text-green-700 transition-colors"
                    >
                      <MapPin className="h-3 w-3 text-green-600 flex-shrink-0" />
                      {dest.name}
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            /* CBD Selection */
            <div className="bg-white border border-gray-200 rounded-lg p-8">
              <div className="flex flex-col items-center text-center gap-3 mb-6">
                <div className="w-10 h-10 bg-green-600 rounded-md flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-xl font-bold text-gray-900">
                    Traveling to CBD
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Please select your current stage on {selectedRoad?.name}
                  </p>
                </div>
              </div>

              <select
                value={localStartLocation}
                onChange={(e) => setLocalStartLocation(e.target.value)}
                className="w-full p-4 bg-white border border-gray-300 rounded-lg mb-5 outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 transition-all appearance-none text-gray-700"
              >
                <option value="">Choose starting stage...</option>
                {nonCBDDestinations.map((opt) => (
                  <option key={opt.id} value={opt.name}>
                    {opt.name}
                  </option>
                ))}
              </select>

              <div className="flex gap-3">
                <button
                  onClick={() => setIsCBDSelected(false)}
                  className="flex-1 py-3.5 bg-white border border-gray-200 text-gray-600 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleCBDTravelSubmit}
                  disabled={!localStartLocation}
                  className="flex-[2] py-3.5 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-200 disabled:text-gray-400 transition-colors"
                >
                  Find Routes
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DestinationsView;
