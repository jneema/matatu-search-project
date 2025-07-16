import React, { useState } from "react";
import LandingView from "../pages/index";
import RoutesView from "../pages/routes-view";
import ComparisonView from "../pages/comparison-view";
import StagesView from "../pages/stages-view";
import SavedRoutesView from "../pages/saved-routes-view";
import FeedbackModal from "../components/feedback-modal";
import Header from "../components/index";
import RoadsView from "../pages/roads-view";
import DestinationsView from "../pages/destinations-view";

const MatatuRouteFinder = () => {
  const [currentView, setCurrentView] = useState("landing");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRoad, setSelectedRoad] = useState(null);
  const [savedRoutes, setSavedRoutes] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedTown, setSelectedTown] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [selectedMatatu, setSelectedMatatu] = useState(null);

  const renderCurrentView = () => {
    switch (currentView) {
      case "roads":
        return (
          <RoadsView
            setCurrentView={setCurrentView}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setSelectedRoad={setSelectedRoad}
            setHasSearched={setHasSearched}
          />
        );
      case "destination":
        return (
          <DestinationsView
            setCurrentView={setCurrentView}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setSelectedDestination={setSelectedDestination}
            setHasSearched={setHasSearched}
            selectedRoad={selectedRoad}
            selectedTown={selectedTown}
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
            savedRoutes={savedRoutes}
            setSavedRoutes={setSavedRoutes}
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
      case "stages":
        return (
          <StagesView
            setCurrentView={setCurrentView}
            selectedRoute={selectedRoute}
            selectedMatatu={selectedMatatu}
          />
        );
      case "saved":
        return <SavedRoutesView savedRoutes={savedRoutes} />;
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
      <Header
        currentView={currentView}
        setCurrentView={setCurrentView}
        savedRoutes={savedRoutes}
        showFeedbackModal={() => setShowFeedback(true)}
      />
      {renderCurrentView()}
      {showFeedback && <FeedbackModal setShowFeedback={setShowFeedback} />}
    </div>
  );
};

export default MatatuRouteFinder;
