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
import { getDestinationStages } from "../services/destinations";
import { useDebouncedCallback } from "use-debounce";

const DIRECTION_COPY = {
  inbound: {
    heading: "Where are you heading?",
    subheading: "Pick your destination in the city centre.",
    placeholder: "e.g. OTC, GPO, River Road...",
    breadcrumb: "Into CBD",
    suggestedLabel: "CBD Stages",
    popularLabel: "Popular destinations",
  },
  outbound: {
    heading: "Where are you headed?",
    subheading: "Pick your destination outside the city centre.",
    placeholder: "e.g. Juja, Githurai, Roysambu...",
    breadcrumb: "Out of CBD",
    suggestedLabel: "Available stages",
    popularLabel: "Popular destinations",
  },
};

const DestinationsView = ({
  setCurrentView,
  searchQuery,
  setSearchQuery,
  setSelectedDestination,
  selectedDirection,
  selectedStartingPoint,
}) => {
  const [destinations, setDestinations] = useState([]);
  const [popularDestinations, setPopularDestinations] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const allDestinationsRef = useRef([]);
  const dropdownRef = useRef(null);

  const copy = DIRECTION_COPY[selectedDirection ?? "inbound"];

const fetchDestinations = async () => {
  try {
    
    const filteredData = await getDestinationStages(
      selectedDirection ?? "inbound",
      selectedStartingPoint?.id 
    );

    setDestinations(filteredData);
    allDestinationsRef.current = filteredData;
    setPopularDestinations(filteredData);
  } catch (error) {
    console.error("Error fetching filtered destinations:", error);
    setDestinations([]);
  } 
};
  

  useEffect(() => {
    fetchDestinations();
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
        handleDestinationSelect(destinations[activeIndex]);
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, activeIndex, destinations]);

  const debouncedSearch = useDebouncedCallback((value) => {
    const term = value.toLowerCase().trim();

    if (!term) {
      setDestinations(allDestinationsRef.current);
      return;
    }

    const filtered = allDestinationsRef.current.filter(
      (dest) =>
        dest.name.toLowerCase().includes(term) ||
        (dest.landmark && dest.landmark.toLowerCase().includes(term)),
    );

    setDestinations(filtered);
  }, 150);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setActiveIndex(-1);
    setIsOpen(true);
    debouncedSearch(value);
  };

  const handleDestinationSelect = (dest) => {
    setSelectedDestination(dest);
    setSearchQuery("");
    setCurrentView("routes");
    setIsOpen(false);
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6 overflow-x-auto whitespace-nowrap no-scrollbar">
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
          <button
            onClick={() => setCurrentView("starting-point")}
            className="hover:text-green-600 cursor-pointer transition-colors"
          >
            {selectedStartingPoint?.name ?? "Start point"}
          </button>
          <ChevronRight className="h-3 w-3 flex-shrink-0" />
          <span className="text-green-600">Destination</span>
        </nav>

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
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
            {selectedStartingPoint
              ? `Heading from ${selectedStartingPoint.name}?`
              : copy.heading}{" "}
          </h2>
          <p className="text-base md:text-lg text-gray-500">
            {selectedStartingPoint
              ? "Select your drop-off point along this route."
              : copy.subheading}
          </p>
        </div>

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
                    fetchDestinations();
                  }
                }
              }}
              className="w-full pl-12 pr-12 py-4 md:py-5 bg-white text-base md:text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveIndex(-1);
                  setDestinations(allDestinationsRef.current);
                }}
                className="absolute inset-y-0 right-0 pr-4 flex items-center"
              >
                <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>

          {isOpen && (
            <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
              {destinations.length > 0 ? (
                <div className="py-1">
                  <p className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                    {copy.suggestedLabel}
                  </p>
                  <div className="max-h-64 overflow-y-auto">
                    {destinations.map((dest, index) => (
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
                              className={`h-4 w-4 ${activeIndex === index ? "text-green-700" : "text-gray-500"}`}
                            />
                          </div>
                          <div className="text-left">
                            <p
                              className={`font-semibold text-sm ${activeIndex === index ? "text-green-700" : "text-gray-800"}`}
                            >
                              {dest.name}
                            </p>
                            {dest.landmark && (
                              <p className="text-xs text-gray-400 line-clamp-1">
                                {dest.landmark}
                              </p>
                            )}
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
                </div>
              ) : (
                <div className="p-8 text-center">
                  <AlertCircle className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-500 text-sm">No destinations found</p>
                </div>
              )}
            </div>
          )}

          {!searchQuery && popularDestinations.length > 0 && (
            <div className="mt-5">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="h-3.5 w-3.5 text-green-600" />
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                  {copy.popularLabel}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {popularDestinations.map((dest) => (
                  <button
                    key={dest.id}
                    onClick={() => handleDestinationSelect(dest)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-600 hover:border-green-600 hover:text-green-700 transition-colors"
                  >
                    <MapPin className="h-3 w-3 text-green-600 flex-shrink-0" />
                    {dest.name}
                    {dest.landmark && (
                      <span className="text-gray-400 font-normal text-xs ml-0.5">
                        · {dest.landmark}
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

export default DestinationsView;
