import React from "react";
import {
  Route,
  BookOpen,
  MapPinPlusIcon,
  BookmarkPlusIcon,
} from "lucide-react";
import { useNavigate } from "react-router";

const Header = ({ currentView, setCurrentView, savedRoutes = [] }) => {
  const navigate = useNavigate();
  const getCurrentStep = () => {
    switch (currentView) {
      case "landing":
        return 1;
      case "roads":
        return 2;
      case "destination":
        return 3;
      case "routes":
        return 4;
      case "stages":
        return 5;
      default:
        return 1;
    }
  };

  const currentStep = getCurrentStep();

  return (
    <header className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Route className="h-6 w-6 md:h-8 md:w-8 text-green-600" />
            <h1 className="text-lg md:text-xl font-bold text-gray-800">
              Matatu Finder
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentView("saved")}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative cursor-pointer"
              title="Saved Routes"
            >
              <BookmarkPlusIcon className="h-5 w-5 md:h-6 md:w-6 text-gray-600" />
              {savedRoutes.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 md:h-5 md:w-5 flex items-center justify-center">
                  {savedRoutes.length}
                </span>
              )}
            </button>
            <button
              onClick={() => navigate("/feedback")}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              title="Feedback"
            >
              <span className="absolute right-full top-1/2 transform -translate-y-1/2 mr-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                Feedback
              </span>
              <MapPinPlusIcon className="h-5 w-5 md:h-6 md:w-6 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Progress Tabs - Desktop */}
        <div className="hidden md:flex items-center space-x-4 overflow-x-auto">
          <div className="flex items-center space-x-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                currentStep >= 1
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              1
            </div>
            <button
              onClick={() => setCurrentView("landing")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
                currentView === "landing"
                  ? "bg-green-600 text-white"
                  : currentStep >= 1
                    ? "text-green-600 hover:bg-green-50"
                    : "text-gray-500"
              }`}
            >
              Towns
            </button>
          </div>

          <div
            className={`h-px flex-1 ${
              currentStep >= 2 ? "bg-green-600" : "bg-gray-200"
            }`}
          ></div>

          <div className="flex items-center space-x-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                currentStep >= 2
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              2
            </div>
            <button
              onClick={() => currentStep >= 2 && setCurrentView("roads")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                currentView === "roads"
                  ? "bg-green-600 text-white"
                  : currentStep >= 2
                    ? "text-green-600 hover:bg-green-50 cursor-pointer"
                    : "text-gray-500 cursor-not-allowed"
              }`}
              disabled={currentStep < 2}
            >
              Roads
            </button>
          </div>

          <div
            className={`h-px flex-1 ${
              currentStep >= 3 ? "bg-green-600" : "bg-gray-200"
            }`}
          ></div>

          <div className="flex items-center space-x-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                currentStep >= 3
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              3
            </div>
            <button
              onClick={() => currentStep >= 3 && setCurrentView("destination")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                currentView === "destination"
                  ? "bg-green-600 text-white"
                  : currentStep >= 3
                    ? "text-green-600 hover:bg-green-50 cursor-pointer"
                    : "text-gray-500 cursor-not-allowed"
              }`}
              disabled={currentStep < 3}
            >
              Destination
            </button>
          </div>

          <div
            className={`h-px flex-1 ${
              currentStep >= 4 ? "bg-green-600" : "bg-gray-200"
            }`}
          ></div>

          <div className="flex items-center space-x-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                currentStep >= 4
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              4
            </div>
            <button
              onClick={() => currentStep >= 4 && setCurrentView("routes")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                currentView === "routes"
                  ? "bg-green-600 text-white"
                  : currentStep >= 4
                    ? "text-green-600 hover:bg-green-50 cursor-pointer"
                    : "text-gray-500 cursor-not-allowed"
              }`}
              disabled={currentStep < 4}
            >
              Routes
            </button>
          </div>
          <div
            className={`h-px flex-1 ${
              currentStep >= 5 ? "bg-green-600" : "bg-gray-200"
            }`}
          ></div>

          <div className="flex items-center space-x-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                currentStep >= 5
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              5
            </div>
            <button
              onClick={() => currentStep >= 5 && setCurrentView("stages")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                currentView === "stages"
                  ? "bg-green-600 text-white"
                  : currentStep >= 5
                    ? "text-green-600 hover:bg-green-50 cursor-pointer"
                    : "text-gray-500 cursor-not-allowed"
              }`}
              disabled={currentStep < 5}
            >
              Stages
            </button>
          </div>
        </div>

        {/* Progress Tabs - Mobile */}
        <div className="md:hidden">
          <div className="flex items-center justify-center space-x-2">
            {[1, 2, 3, 4, 5].map((step) => {
              const viewMap = {
                1: "landing",
                2: "roads",
                3: "destination",
                4: "routes",
                5: "stages",
              };

              const isClickable = currentStep >= step;
              const isActive = currentStep === step;

              return (
                <button
                  key={step}
                  onClick={() => isClickable && setCurrentView(viewMap[step])}
                  disabled={!isClickable}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-green-600 text-white"
                      : isClickable
                        ? "bg-gray-200 text-green-700 hover:bg-green-100 cursor-pointer"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {step}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
