import React from "react";
import { Route, BookOpen, Menu } from "lucide-react";

const Header = ({
  currentView,
  setCurrentView,
  savedRoutes = [],
  showFeedbackModal,
}) => {
  const getCurrentStep = () => {
    switch (currentView) {
      case "landing":
        return 1;
      case "road":
        return 2;
      case "destination":
        return 3;
      case "routes":
        return 4;
      case "comparison":
        return 5;
      case "stages":
        return 6;
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
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative"
              title="Saved Routes"
            >
              <BookOpen className="h-5 w-5 md:h-6 md:w-6 text-gray-600" />
              {savedRoutes.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 md:h-5 md:w-5 flex items-center justify-center">
                  {savedRoutes.length}
                </span>
              )}
            </button>
            <button
              onClick={() => showFeedbackModal()}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              title="Feedback"
            >
              <Menu className="h-5 w-5 md:h-6 md:w-6 text-gray-600" />
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
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                currentView === "landing"
                  ? "bg-green-600 text-white"
                  : currentStep >= 1
                  ? "text-green-600 hover:bg-green-50"
                  : "text-gray-500"
              }`}
            >
              Town
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
              onClick={() => currentStep >= 2 && setCurrentView("road")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                currentView === "road"
                  ? "bg-green-600 text-white"
                  : currentStep >= 2
                  ? "text-green-600 hover:bg-green-50"
                  : "text-gray-500 cursor-not-allowed"
              }`}
              disabled={currentStep < 2}
            >
              Road
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
                  ? "text-green-600 hover:bg-green-50"
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
                  ? "text-green-600 hover:bg-green-50"
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
                  ? "text-green-600 hover:bg-green-50"
                  : "text-gray-500 cursor-not-allowed"
              }`}
              disabled={currentStep < 5}
            >
              Stages
            </button>
          </div>
          <div
            className={`h-px flex-1 ${
              currentStep >= 6 ? "bg-green-600" : "bg-gray-200"
            }`}
          ></div>
          <div className="flex items-center space-x-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                currentStep >= 6
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              6
            </div>
            <button
              onClick={() => currentStep >= 6 && setCurrentView("comparison")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                currentView === "comparison"
                  ? "bg-green-600 text-white"
                  : currentStep >= 6
                  ? "text-green-600 hover:bg-green-50"
                  : "text-gray-500 cursor-not-allowed"
              }`}
              disabled={currentStep < 6}
            >
              Compare
            </button>
          </div>
        </div>

        {/* Progress Tabs - Mobile */}
        <div className="md:hidden">
          <div className="flex items-center justify-center space-x-2">
            {[1, 2, 3, 4, 5, 6].map((step) => {
              const viewMap = {
                1: "landing",
                2: "road",
                3: "destination",
                4: "routes",
                5: "stages",
                6: "comparison",
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
                      ? "bg-gray-200 text-green-700 hover:bg-green-100"
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
