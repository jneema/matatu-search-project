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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50 font-sans">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Find Your Perfect Matatu Route
          </h2>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Real-time directions and fare comparisons for Kenya's major urban
            centers.
          </p>
        </div>

        {/* Search + Popular Routes */}
        <div className="relative max-w-2xl mx-auto mb-5" ref={dropdownRef}>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400 group-focus-within:text-green-600 transition-colors" />
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
              className="w-full pl-12 pr-12 py-5 bg-white text-lg border border-gray-200 rounded-2xl shadow-sm focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all"
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
            <div className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-2xl shadow-2xl overflow-hidden">
              {filteredTowns.length > 0 ? (
                <div className="py-2">
                  <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Suggested Locations
                  </div>
                  {filteredTowns.map((town, index) => (
                    <button
                      key={town.id}
                      onClick={() => handleTownSelect(town)}
                      onMouseEnter={() => setActiveIndex(index)}
                      className={`w-full flex items-center justify-between px-4 py-4 transition-colors group ${activeIndex === index ? "bg-green-50" : "hover:bg-green-50"}`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${activeIndex === index ? "bg-green-100" : "bg-gray-100 group-hover:bg-green-100"}`}
                        >
                          <MapPin
                            className={`h-5 w-5 ${activeIndex === index ? "text-green-600" : "text-gray-500 group-hover:text-green-600"}`}
                          />
                        </div>
                        <div className="text-left">
                          <p
                            className={`font-bold leading-tight ${activeIndex === index ? "text-green-700" : "text-gray-800 group-hover:text-green-700"}`}
                          >
                            {town.name}
                          </p>
                          <p className="text-xs text-gray-500 line-clamp-1">
                            {town.description}
                          </p>
                        </div>
                      </div>
                      <ArrowRight
                        className={`h-4 w-4 transition-all ${activeIndex === index ? "text-green-600 translate-x-1" : "text-gray-300 group-hover:text-green-600 group-hover:translate-x-1"}`}
                      />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <AlertCircle className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-900 font-medium">No towns found</p>
                </div>
              )}
            </div>
          )}

          {/* Non-Nairobi notice */}
          {nonNairobiTown && (
            <div className="mt-4 p-5 bg-amber-50 border border-amber-100 rounded-xl flex flex-col items-center text-center gap-3 max-w-xl mx-auto">
              <AlertCircle className="h-8 w-8 text-amber-600" />
              <div>
                <p className="text-sm font-bold text-amber-900 leading-tight">
                  {nonNairobiTown.name} is coming soon!
                </p>
                <p className="text-sm text-amber-700 mt-1">
                  We're mapping routes here. Try exploring Nairobi in the
                  meantime.
                </p>
                <button
                  onClick={() => handleTownSelect(towns[0])}
                  className="text-sm font-bold text-green-700 hover:text-green-800 transition-colors mt-2"
                >
                  View Nairobi Routes instead →
                </button>
              </div>
            </div>
          )}

          {/* Popular Towns Pills */}
          {!nonNairobiTown && (
            <div className="mt-5">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="h-3.5 w-3.5 text-green-500" />
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Popular Towns
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {towns.map((town) => (
                  <button
                    key={town.id}
                    onClick={() => handleTownSelect(town)}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-white border border-gray-200 rounded-full text-sm font-semibold text-gray-600 hover:border-green-400 hover:text-green-700 hover:bg-green-50 transition-all shadow-sm"
                  >
                    <MapPin className="h-3 w-3 text-green-500 flex-shrink-0" />
                    {town.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-3 gap-8">
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
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col items-center text-center"
            >
              <div className="w-14 h-14 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-6">
                <feature.icon className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingView;
