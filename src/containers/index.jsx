import React, { useState } from "react";
import LandingView from "../pages/index";
import RoutesView from "../pages/routes-view";
import ComparisonView from "../pages/comparison-view";
import SavedRoutesView from "../pages/saved-routes-view";
import Header from "../components/index";
import DestinationsView from "../pages/destinations-view";
import StartingPointView from "../pages/starting-point-view";
import DirectionView from "../pages/direction-view";
import TripModeView from "../pages/trip-mode-view";

const MatatuRouteFinder = () => {
  const [currentView, setCurrentView] = useState("landing");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRoad, setSelectedRoad] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedTown, setSelectedTown] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [selectedMatatu, setSelectedMatatu] = useState(null);
  const [currentLocation, setCurrentLocation] = useState("Nairobi CBD");
  const [selectedStartingPoint, setSelectedStartingPoint] = useState(null);
  const [selectedDirection, setSelectedDirection] = useState(null);

  const renderCurrentView = () => {
    switch (currentView) {
      case "starting-point":
        return (
          <StartingPointView
            selectedTown={selectedTown}
            setCurrentView={setCurrentView}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setHasSearched={setHasSearched}
            setSelectedStartingPoint={setSelectedStartingPoint}
            selectedDirection={selectedDirection}
          />
        );
      case "direction":
        return (
          <DirectionView
            setCurrentView={setCurrentView}
            setSelectedDirection={setSelectedDirection}
            selectedTown={selectedTown}
          />
        );
      case "destination":
        return (
          <DestinationsView
            setCurrentView={setCurrentView}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setSelectedDestination={setSelectedDestination}
            selectedTown={selectedTown}
            selectedDirection={selectedDirection}
            selectedStartingPoint={selectedStartingPoint}
          />
        );
      case "routes":
        return (
          <RoutesView
            setCurrentView={setCurrentView}
            selectedDestination={selectedDestination}
            selectedRoad={selectedRoad}
            selectedTown={selectedTown}
            setSelectedRoute={setSelectedRoute}
            currentLocation={currentLocation}
            selectedStartingPoint={selectedStartingPoint}
            selectedDirection={selectedDestination}
          />
        );
      case "comparison":
        return (
          <ComparisonView
            setCurrentView={setCurrentView}
            selectedRoute={selectedRoute}
            setSelectedMatatu={setSelectedMatatu}
          />
        );

      case "trip":
        return (
          <TripModeView
            setCurrentView={setCurrentView}
            selectedRoute={selectedRoute}
            selectedDirection={selectedDirection}
          />
        );
      case "saved":
        return <SavedRoutesView />;
      default:
        return (
          <LandingView
            setCurrentView={setCurrentView}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setHasSearched={setHasSearched}
            setSelectedTown={setSelectedTown}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentView={currentView} setCurrentView={setCurrentView} />
      {renderCurrentView()}
    </div>
  );
};

export default MatatuRouteFinder;
