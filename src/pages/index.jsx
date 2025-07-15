import React from "react";
import { Search, MapPin, DollarSign, BookOpen } from "lucide-react";

const LandingView = ({ setCurrentView, searchQuery, setSearchQuery }) => {
  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentView("routes");
  };

  const suggestions = [
    "Kasarani",
    "Westlands",
    "Ngong",
    "Kikuyu",
    "Thika",
    "Kiambu",
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
            <Search className="absolute left-4 top-4 h-6 w-6 text-gray-400" />
            <input
              type="text"
              placeholder="Where do you want to go?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch(searchQuery)}
              className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
            />
          </div>

          <div className="mt-6">
            <p className="text-gray-500 mb-3">Popular destinations:</p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSearch(suggestion)}
                  className="bg-green-100 text-green-700 px-4 py-2 rounded-full hover:bg-green-200 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => handleSearch(searchQuery)}
            className="w-full mt-6 bg-green-600 text-white py-4 rounded-xl font-semibold hover:bg-green-700 transition-colors"
          >
            Search Routes
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <MapPin className="h-12 w-12 text-green-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Find Nearby Stages</h3>
            <p className="text-gray-600">
              Get walking directions to the nearest matatu stage
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <DollarSign className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Compare Fares</h3>
            <p className="text-gray-600">
              View and compare fares across different matatu operators
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
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
