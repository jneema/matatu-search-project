import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  MapPin,
  AlertCircle,
  ArrowRight,
  X,
  ChevronRight,
  Zap,
} from "lucide-react";
import { getRoadsByTown } from "../data/routesData";

const RoadsView = ({
  setCurrentView,
  searchQuery,
  setSearchQuery,
  setSelectedRoad,
}) => {
  const road = getRoadsByTown(1);
  const [isOpen, setIsOpen] = useState(false);
  const [filteredRoads, setFilteredRoads] = useState(road);
  const [activeIndex, setActiveIndex] = useState(-1);
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
      if (!isOpen) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((p) => Math.min(p + 1, filteredRoads.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((p) => Math.max(p - 1, 0));
      }
      if (e.key === "Enter" && activeIndex >= 0)
        handleRoadSelect(filteredRoads[activeIndex]);
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, activeIndex, filteredRoads]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setActiveIndex(-1);
    setFilteredRoads(
      value.trim()
        ? road.filter((r) => r.name.toLowerCase().includes(value.toLowerCase()))
        : road,
    );
    setIsOpen(true);
  };

  const handleRoadSelect = (road) => {
    setSelectedRoad(road);
    setCurrentView("destination");
    setSearchQuery("");
    setIsOpen(false);
    setActiveIndex(-1);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setFilteredRoads(road);
    setIsOpen(true);
    setActiveIndex(-1);
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6 overflow-x-auto whitespace-nowrap">
          <button
            onClick={() => setCurrentView("landing")}
            className="hover:text-green-600 cursor-pointer transition-colors"
          >
            Home
          </button>
          <ChevronRight className="h-3 w-3 flex-shrink-0" />
          <span className="text-gray-400">Roads</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Nairobi Route Finder
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Select a major road to see available matatu stages and real-time
            fare estimates.
          </p>
        </div>

        {/* Search + Dropdown */}
        <div className="relative max-w-2xl mx-auto mb-5" ref={dropdownRef}>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for a road (e.g., Thika Road)"
              value={searchQuery}
              onChange={handleInputChange}
              onFocus={() => {
                if (!searchQuery.trim()) setFilteredRoads(road);
                setIsOpen(true);
              }}
              className="w-full pl-12 pr-12 py-5 bg-white text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 pr-4 flex items-center"
              >
                <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>

          {/* Dropdown */}
          {isOpen && (
            <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
              {filteredRoads.length > 0 ? (
                <div className="py-1">
                  <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                    Available Roads
                  </div>
                  {filteredRoads.map((road, index) => (
                    <button
                      key={road.id}
                      onClick={() => handleRoadSelect(road)}
                      onMouseEnter={() => setActiveIndex(index)}
                      className={`w-full flex items-center justify-between px-4 py-3.5 transition-colors ${
                        activeIndex === index
                          ? "bg-green-50"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex-shrink-0 w-8 h-8 rounded-md flex items-center justify-center ${
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
                            {road.name}
                          </p>
                          <p className="text-xs text-gray-400 line-clamp-1">
                            {road.description}
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
                  <p className="text-gray-500 text-sm">No roads found</p>
                </div>
              )}
            </div>
          )}

          {/* Popular Roads Pills */}
          <div className="mt-5">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="h-3.5 w-3.5 text-green-600" />
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                Popular Roads
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {road.map((r) => (
                <button
                  key={r.id}
                  onClick={() => handleRoadSelect(r)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-600 hover:border-green-600 hover:text-green-700 transition-colors"
                >
                  <MapPin className="h-3 w-3 text-green-600 flex-shrink-0" />
                  {r.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadsView;
