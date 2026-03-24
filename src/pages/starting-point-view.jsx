import React, { useState, useRef, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import {
  Search,
  MapPin,
  AlertCircle,
  ArrowRight,
  X,
  ChevronRight,
  Zap,
} from "lucide-react";
import { getOriginStages } from "../services/destinations";

const DIRECTION_COPY = {
  inbound: {
    heading: "Where are you boarding from?",
    subheading: "Pick the stage closest to where you are right now.",
    placeholder: "e.g. Juja, Githurai, Roysambu...",
    breadcrumb: "Into CBD",
    hubsLabel: "Popular stages",
  },
  outbound: {
    heading: "Which stage are you leaving from?",
    subheading: "Pick your departure point in the city centre.",
    placeholder: "e.g. OTC, GPO, River Road...",
    breadcrumb: "Out of CBD",
    hubsLabel: "CBD stages",
  },
};

const StartingPointView = ({
  setCurrentView,
  searchQuery,
  setSearchQuery,
  setSelectedStartingPoint,
  selectedDirection,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const allDestinationsRef = useRef([]);
  const [destinations, setDestinations] = useState([]);
  const [popularHubs, setPopularHubs] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const dropdownRef = useRef(null);

  const copy = DIRECTION_COPY[selectedDirection ?? "inbound"];

  const fetchPoints = async (search = "") => {
    try {
      const data = await getOriginStages(
        selectedDirection ?? "inbound",
        search,
      );
      setDestinations(data);
      if (!search) {
        allDestinationsRef.current = data;
        setPopularHubs(data.slice(0, 5));
      }
    } catch (error) {
      console.error("Error fetching starting points:", error);
    }
  };

  useEffect(() => {
    fetchPoints();
  }, [selectedDirection]);

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
        setActiveIndex((p) => Math.min(p + 1, destinations.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((p) => Math.max(p - 1, 0));
      }
      if (e.key === "Enter" && activeIndex >= 0)
        handlePointSelect(destinations[activeIndex]);
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, activeIndex, destinations]);

  const debouncedSearch = useDebouncedCallback((value) => {
    fetchPoints(value);
  }, 300);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setActiveIndex(-1);
    setIsOpen(true);
    debouncedSearch(value);
  };

  const handlePointSelect = (point) => {
    setSelectedStartingPoint(point);
    setCurrentView("destination");
    setSearchQuery("");
    setIsOpen(false);
    setActiveIndex(-1);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setActiveIndex(-1);
    setDestinations(allDestinationsRef.current);
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
          <button
            onClick={() => setCurrentView("direction")}
            className="hover:text-green-600 cursor-pointer transition-colors"
          >
            {copy.breadcrumb}
          </button>
          <ChevronRight className="h-3 w-3 flex-shrink-0" />
          <span className="text-green-600">Start Point</span>
        </nav>

        {/* Direction badge */}
        <div className="flex justify-center mb-6">
          <span
            className={`text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full border ${
              selectedDirection === "outbound"
                ? "bg-gray-900 text-white border-gray-900"
                : "bg-green-50 text-green-700 border-green-200"
            }`}
          >
            {selectedDirection === "outbound" ? "← Out of CBD" : "→ Into CBD"}
          </span>
        </div>

        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 mb-3 md:mb-4 tracking-tight">
            {copy.heading}
          </h2>
          <p className="text-base md:text-lg text-gray-500 max-w-xl mx-auto">
            {copy.subheading}
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
              placeholder={copy.placeholder}
              value={searchQuery}
              onChange={handleInputChange}
              onFocus={() => {
                setIsOpen(true);
                if (!searchQuery.trim()) {
                  if (allDestinationsRef.current.length > 0) {
                    setDestinations(allDestinationsRef.current);
                  } else {
                    fetchPoints();
                  }
                }
              }}
              className="w-full pl-12 pr-12 py-4 md:py-5 bg-white text-base md:text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 outline-none transition-all"
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
              {destinations.length > 0 ? (
                <div className="py-1">
                  <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                    {selectedDirection === "outbound"
                      ? "CBD Departure Stages"
                      : "Boarding Stages"}
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {destinations.map((point, index) => (
                      <button
                        key={point.id}
                        onClick={() => handlePointSelect(point)}
                        onMouseEnter={() => setActiveIndex(index)}
                        className={`w-full flex items-center justify-between px-4 py-3.5 transition-colors ${activeIndex === index ? "bg-green-50" : "hover:bg-gray-50"}`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex-shrink-0 w-8 h-8 rounded-md flex items-center justify-center ${activeIndex === index ? "bg-green-100" : "bg-gray-100"}`}
                          >
                            <MapPin
                              className={`h-4 w-4 ${activeIndex === index ? "text-green-700" : "text-gray-500"}`}
                            />
                          </div>
                          <div className="text-left">
                            <p
                              className={`font-semibold text-sm ${activeIndex === index ? "text-green-700" : "text-gray-800"}`}
                            >
                              {point.name}
                            </p>
                            {point.landmark && (
                              <p className="text-xs text-gray-400 line-clamp-1">
                                {point.landmark}
                              </p>
                            )}
                          </div>
                        </div>
                        <ArrowRight
                          className={`h-4 w-4 transition-transform ${activeIndex === index ? "text-green-600 translate-x-0.5" : "text-gray-300"}`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center">
                  <AlertCircle className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-500 text-sm">No stages found</p>
                </div>
              )}
            </div>
          )}

          {/* Popular Hubs Pills */}
          {!searchQuery && popularHubs.length > 0 && (
            <div className="mt-5">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="h-3.5 w-3.5 text-green-600" />
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                  {copy.hubsLabel}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {popularHubs.map((h) => (
                  <button
                    key={h.id}
                    onClick={() => handlePointSelect(h)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-600 hover:border-green-600 hover:text-green-700 transition-colors"
                  >
                    <MapPin className="h-3 w-3 text-green-600 flex-shrink-0" />
                    {h.name}
                    {h.landmark && (
                      <span className="text-gray-400 font-normal text-xs ml-0.5">
                        · {h.landmark}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StartingPointView;
