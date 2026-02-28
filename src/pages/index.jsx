import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  MapPin,
  DollarSign,
  AlertCircle,
  ArrowRight,
  X,
  Route,
  Zap,
} from "lucide-react";
import { towns } from "../data/routesData";

const LandingView = ({
  setCurrentView,
  searchQuery,
  setSearchQuery,
  setSelectedTown,
  setSelectedRoad,
  setSelectedDestination,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredTowns, setFilteredTowns] = useState(towns);
  const [nonNairobiTown, setNonNairobiTown] = useState(null);
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
        setActiveIndex((p) => Math.min(p + 1, filteredTowns.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((p) => Math.max(p - 1, 0));
      }
      if (e.key === "Enter" && activeIndex >= 0)
        handleTownSelect(filteredTowns[activeIndex]);
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, activeIndex, filteredTowns]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setNonNairobiTown(null);
    setActiveIndex(-1);
    setFilteredTowns(
      value.trim()
        ? towns.filter((t) =>
            t.name.toLowerCase().includes(value.toLowerCase()),
          )
        : towns,
    );
    setIsOpen(true);
  };

  const handleTownSelect = (town) => {
    if (town.name !== "Nairobi") {
      setNonNairobiTown(town);
      setIsOpen(false);
      return;
    }
    setSelectedTown(town);
    setCurrentView("roads");
    setSearchQuery("");
    setIsOpen(false);
    setActiveIndex(-1);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setFilteredTowns(towns);
    setIsOpen(true);
    setNonNairobiTown(null);
    setActiveIndex(-1);
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Find Your Perfect Matatu Route
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Real-time directions and fare comparisons for Kenya's major urban
            centers.
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
              placeholder="Where are you heading?"
              value={searchQuery}
              onChange={handleInputChange}
              onFocus={() => {
                if (!searchQuery.trim()) setFilteredTowns(towns);
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
              {filteredTowns.length > 0 ? (
                <div className="py-1">
                  <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                    Suggested Locations
                  </div>
                  {filteredTowns.map((town, index) => (
                    <button
                      key={town.id}
                      onClick={() => handleTownSelect(town)}
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
                            {town.name}
                          </p>
                          <p className="text-xs text-gray-400 line-clamp-1">
                            {town.description}
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
                  <p className="text-gray-500 text-sm">No towns found</p>
                </div>
              )}
            </div>
          )}

          {/* Non-Nairobi notice */}
          {nonNairobiTown && (
            <div className="mt-3 border border-amber-300 rounded-md overflow-hidden">
              <div className="w-full h-1 bg-amber-400" />
              <div className="px-4 py-5 bg-amber-50 flex flex-col items-center gap-3 text-center">
                <div className="w-9 h-9 rounded-md bg-amber-100 flex items-center justify-center">
                  <AlertCircle className="h-5 w-5 text-amber-600" />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-semibold text-amber-900">
                    {nonNairobiTown.name} isn't available yet
                  </p>
                  <p className="text-sm text-amber-700">
                    We're still mapping routes here.
                  </p>
                </div>
                <button
                  onClick={() => handleTownSelect(towns[0])}
                  className="text-sm font-semibold text-green-700 hover:underline"
                >
                  View Nairobi instead →
                </button>
              </div>
            </div>
          )}

          {/* Popular Towns Pills */}
          {!nonNairobiTown && (
            <div className="mt-5">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="h-3.5 w-3.5 text-green-600" />
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                  Popular Towns
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {towns.map((town) => (
                  <button
                    key={town.id}
                    onClick={() => handleTownSelect(town)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-600 hover:border-green-600 hover:text-green-700 transition-colors"
                  >
                    <MapPin className="h-3 w-3 text-green-600 flex-shrink-0" />
                    {town.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-5">
          {[
            {
              icon: MapPin,
              title: "Smart Routing",
              desc: "Find the fastest matatu stages based on your current location.",
            },
            {
              icon: DollarSign,
              title: "Fare Estimates",
              desc: "Know the price before you board. Compare peak and off-peak rates.",
            },
            {
              icon: Route,
              title: "Saved Routes",
              desc: "Access your daily commute routes even without an internet connection.",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="p-6 bg-white border border-gray-200 rounded-lg"
            >
              <div className="w-10 h-10 bg-green-600 rounded-md flex items-center justify-center mb-4">
                <feature.icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-1.5">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingView;
