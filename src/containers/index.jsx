import React, { useState } from "react";
import LandingView from "../pages/index";
import RoutesView from "../pages/routes-view";
import ComparisonView from "../pages/comparison-view";
import StagesView from "../pages/stages-view";
import SavedRoutesView from "../pages/saved-routes-view";
import FeedbackModal from "../components/feedback-modal";
import Header from "../components/index";

const MatatuRouteFinder = () => {
  const [currentView, setCurrentView] = useState("landing");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [savedRoutes, setSavedRoutes] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const renderCurrentView = () => {
    switch (currentView) {
      case "routes":
        return (
          <RoutesView
            setCurrentView={setCurrentView}
            searchQuery={searchQuery}
            setSelectedRoute={setSelectedRoute}
            searchResults={searchResults}
          />
        );
      case "comparison":
        return (
          <ComparisonView
            setCurrentView={setCurrentView}
            selectedRoute={selectedRoute}
          />
        );
      case "stages":
        return <StagesView />;
      case "saved":
        return <SavedRoutesView savedRoutes={savedRoutes} />;
      default:
        return (
          <LandingView
            setCurrentView={setCurrentView}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setSearchResults={setSearchResults}
            setHasSearched={setHasSearched}
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
      ;{renderCurrentView()}
      {showFeedback && <FeedbackModal setShowFeedback={setShowFeedback} />}
    </div>
  );
};

export default MatatuRouteFinder;
