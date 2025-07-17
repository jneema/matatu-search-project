import React, { useState } from "react";
import { MapPin, X, Phone } from "lucide-react";

const StagesView = ({
  setCurrentView,
  selectedRoute,
  selectedMatatu,
  currentLocation,
}) => {
  const [selectedStage, setSelectedStage] = useState(null);
  const [selectedContactStage, setSelectedContactStage] = useState(null);

  const stagesData = {
    "Super Metro": [
      {
        name: "Kencom Stage",
        distance: "0.2 km",
        walkTime: "3 mins",
        contacts: ["+254 700 123 456", "+254 712 789 123"],
      },
      {
        name: "Odeon Stage",
        distance: "0.5 km",
        walkTime: "7 mins",
        contacts: ["+254 733 456 789"],
      },
    ],
    "City Shuttle": [
      {
        name: "Odeon Stage",
        distance: "0.5 km",
        walkTime: "7 mins",
        contacts: ["+254 733 456 789"],
      },
      {
        name: "Railways Stage",
        distance: "0.8 km",
        walkTime: "12 mins",
        contacts: [],
      },
    ],
    "Express Links": [
      {
        name: "Railways Stage",
        distance: "0.8 km",
        walkTime: "12 mins",
        contacts: [],
      },
    ],
    "Thika Road Trans": [
      {
        name: "Kencom Stage",
        distance: "0.2 km",
        walkTime: "3 mins",
        contacts: ["+254 700 123 456"],
      },
    ],
    "Juja Trans": [
      {
        name: "Odeon Stage",
        distance: "0.5 km",
        walkTime: "7 mins",
        contacts: ["+254 733 456 789"],
      },
    ],
    "Westlands Express": [
      {
        name: "Ambassadeur Stage",
        distance: "0.3 km",
        walkTime: "4 mins",
        contacts: ["+254 722 987 654"],
      },
    ],
    "City Hopper": [
      {
        name: "Ambassadeur Stage",
        distance: "0.3 km",
        walkTime: "4 mins",
        contacts: ["+254 722 987 654"],
      },
    ],
    "Buruburu Trans": [
      {
        name: "Bus Station Stage",
        distance: "0.6 km",
        walkTime: "8 mins",
        contacts: [],
      },
    ],
    "Embakasi Link": [
      {
        name: "Bus Station Stage",
        distance: "0.6 km",
        walkTime: "8 mins",
        contacts: [],
      },
    ],
    "Kiambu Express": [
      {
        name: "Tea Room Stage",
        distance: "0.4 km",
        walkTime: "6 mins",
        contacts: ["+254 711 234 567"],
      },
    ],
    "Githunguri Trans": [
      {
        name: "Tea Room Stage",
        distance: "0.4 km",
        walkTime: "6 mins",
        contacts: ["+254 711 234 567"],
      },
    ],
    "Ngong Link": [
      {
        name: "Railways Stage",
        distance: "0.8 km",
        walkTime: "12 mins",
        contacts: [],
      },
    ],
    "Karen Express": [
      {
        name: "Railways Stage",
        distance: "0.8 km",
        walkTime: "12 mins",
        contacts: [],
      },
    ],
    "Athi Trans": [
      {
        name: "Machakos Bus Stage",
        distance: "0.7 km",
        walkTime: "10 mins",
        contacts: ["+254 720 345 678"],
      },
    ],
    "Machakos Link": [
      {
        name: "Machakos Bus Stage",
        distance: "0.7 km",
        walkTime: "10 mins",
        contacts: ["+254 720 345 678"],
      },
    ],
  };

  // Determine if Nairobi CBD is the selected destination
  const isCBDSelected = selectedRoute?.destination
    .toLowerCase()
    .includes("cbd");

  // Normalize currentLocation to match routesData keys from RoutesView
  const normalizedCurrentLocation = currentLocation
    ? currentLocation.charAt(0).toUpperCase() +
      currentLocation.slice(1).toLowerCase()
    : "Your location";

  // Fetch nearby stages based on selectedMatatu or selectedRoute
  const nearbyStages = selectedMatatu
    ? stagesData[selectedMatatu.name] || []
    : selectedRoute
    ? selectedRoute.matatus.flatMap((matatu) => stagesData[matatu.name] || [])
    : [];

  // Remove duplicate stages
  const uniqueStages = Array.from(
    new Map(nearbyStages.map((stage) => [stage.name, stage])).values()
  );

  const handleGetDirections = (stage) => {
    setSelectedStage(selectedStage?.name === stage.name ? null : stage);
    setSelectedContactStage(null);
  };

  const handleGetContacts = (stage) => {
    setSelectedContactStage(
      selectedContactStage?.name === stage.name ? null : stage
    );
    setSelectedStage(null);
  };

  const handleCloseMap = () => {
    setSelectedStage(null);
  };

  const handleCloseContacts = () => {
    setSelectedContactStage(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <button
            onClick={() =>
              setCurrentView(selectedMatatu ? "comparison" : "routes")
            }
            className="text-green-600 hover:text-green-700 mb-3 sm:mb-4 text-sm sm:text-base cursor-pointer"
          >
            ← Back to {selectedMatatu ? "Comparison" : "Routes"}
          </button>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
            Nearby Stages
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            {isCBDSelected
              ? `Drop-off points in Nairobi CBD for ${
                  selectedMatatu
                    ? selectedMatatu.name
                    : `${selectedRoute?.name} from ${normalizedCurrentLocation}`
                }`
              : `Stages for ${
                  selectedMatatu
                    ? selectedMatatu.name
                    : `${selectedRoute?.name} to ${selectedRoute?.destination}`
                }`}
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {uniqueStages.length > 0 ? (
            uniqueStages
              .filter(
                (stage) =>
                  (!selectedStage && !selectedContactStage) ||
                  stage.name ===
                    (selectedStage?.name || selectedContactStage?.name)
              )
              .map((stage, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md p-4 sm:p-6"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0">
                    <div className="flex flex-col text-left">
                      <h3 className="text-lg font-semibold mb-1">
                        {stage.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {isCBDSelected
                          ? `Drop-off: ${stage.distance} from Nairobi CBD • ${stage.walkTime} walk`
                          : `${stage.distance} away • ${stage.walkTime} walk`}
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
                      <button
                        onClick={() => handleGetDirections(stage)}
                        className="bg-blue-600 text-white px-4 py-2 sm:px-3 sm:py-1 rounded-lg hover:bg-blue-700 transition-colors text-sm cursor-pointer w-full sm:w-auto"
                      >
                        {selectedStage?.name === stage.name
                          ? "Hide Map"
                          : "Get Directions"}
                      </button>
                      <button
                        onClick={() => handleGetContacts(stage)}
                        className="border border-gray-300 px-4 py-2 sm:px-3 sm:py-1 rounded-lg hover:bg-gray-50 transition-colors text-sm cursor-pointer w-full sm:w-auto"
                      >
                        {selectedContactStage?.name === stage.name
                          ? "Hide Contacts"
                          : "Get Contacts"}
                      </button>
                    </div>
                  </div>
                </div>
              ))
          ) : (
            <div className="text-center text-gray-600 px-4 py-8">
              <p className="text-sm sm:text-base">
                No stages found for{" "}
                {selectedMatatu
                  ? selectedMatatu.name
                  : `${selectedRoute?.name} ${
                      isCBDSelected
                        ? `from ${normalizedCurrentLocation} to Nairobi CBD`
                        : `to ${selectedRoute?.destination}`
                    }`}
                .
              </p>
            </div>
          )}
        </div>

        {selectedStage && (
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mt-4 sm:mt-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-2 sm:space-y-0">
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-600 text-sm sm:text-base">
                  {isCBDSelected
                    ? `Drop-off point: ${selectedStage.name} in Nairobi CBD`
                    : `Your current location: Nairobi CBD`}
                </span>
              </div>
              <button
                onClick={handleCloseMap}
                className="text-gray-600 hover:text-gray-800 self-end sm:self-auto"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="bg-gray-100 h-40 sm:h-48 rounded-lg flex items-center justify-center">
              <p className="text-gray-500 text-center text-sm sm:text-base px-4">
                Interactive map for {selectedStage.name} would be displayed here
              </p>
            </div>
          </div>
        )}

        {selectedContactStage && (
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mt-4 sm:mt-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-2 sm:space-y-0">
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-600 text-sm sm:text-base">
                  Contacts for {selectedContactStage.name}
                </span>
              </div>
              <button
                onClick={handleCloseContacts}
                className="text-gray-600 hover:text-gray-800 self-end sm:self-auto"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="bg-gray-100 rounded-lg p-3 sm:p-4">
              {selectedContactStage.contacts.length > 0 ? (
                <ul className="space-y-2 text-gray-600">
                  {selectedContactStage.contacts.map((contact, index) => (
                    <li
                      key={index}
                      className="flex items-center text-sm sm:text-base"
                    >
                      <Phone className="h-4 w-4 mr-2 text-gray-500 flex-shrink-0" />
                      <span className="break-all">{contact}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-sm sm:text-base">
                  No contact information available for{" "}
                  {selectedContactStage.name}.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StagesView;
