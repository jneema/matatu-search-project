export const ROUTE_STEPS = [
  { id: 1, label: "Route Info" },
  { id: 2, label: "Matatu Details" },
  { id: 3, label: "Review & Submit" },
];

export const EMPTY_MATATU = {
  saccoName: "",
  matatuName: "",
  matatuNumber: "",
  stageLocationDestination: "",
  stageLocationDeparture: "",
  payment: [],
  dropoffs: "",
  peakFare: "",
  offPeakFare: "",
  type: "",
  rating: "",
  contacts: "",
  stageImage: null,
  matatuImage: null,
};

export const EMPTY_ROUTE = {
  town: "Nairobi",
  road: "",
  destination: "",
  departure: "",
  distance: "",
  matatus: [{ ...EMPTY_MATATU }],
  comments: "",
};

export const modeLabels = {
  route: "Full route",
  destination: "Destination",
  sacco: "Sacco & fleet",
  matatu: "Matatu",
  road: "Road",
  "bulk-roads": "Bulk roads",
  "bulk-destinations": "Bulk destinations",
  town: "Town",
  "bulk-towns": "Bulk towns",
};

export const modeSuccess = {
  route: {
    title: "Route submitted!",
    message:
      "The route, destination and matatu details will be reviewed and added to the database.",
  },
  destination: {
    title: "Destination submitted!",
    message: "The stop will be reviewed and linked to the road you selected.",
  },
  sacco: {
    title: "Sacco submitted!",
    message: "The sacco and its fleet details will be reviewed shortly.",
  },
  matatu: {
    title: "Matatu submitted!",
    message: "The vehicle details and images will be reviewed and added.",
  },
  road: {
    title: "Road submitted!",
    message: "The road will be reviewed and added to the selected town.",
  },
  "bulk-roads": {
    title: "Roads submitted!",
    message: "The roads have been submitted for review.",
  },
  "bulk-destinations": {
    title: "Destinations submitted!",
    message: "The destinations have been submitted for review.",
  },
  town: {
    title: "Town submitted!",
    message: "The town will be reviewed and added to the system.",
  },
  "bulk-towns": {
    title: "Towns submitted!",
    message: "The towns have been submitted for review.",
  },
};

export const SCENARIO_TABS = [
  { key: "ALL", label: "All" },
  { key: "DIRECT", label: "Direct" },
  { key: "TRANSFER", label: "Transfer" },
];

export const TAG_STYLES = {
  EXPRESS: "bg-blue-50 text-blue-700 border-blue-200",
  TRANSFER: "bg-purple-50 text-purple-700 border-purple-200",
  FASTEST: "bg-orange-50 text-orange-700 border-orange-200",
  CHEAPEST: "bg-green-50 text-green-700 border-green-200",
  COMFORT: "bg-indigo-50 text-indigo-700 border-indigo-200",
  ELECTRIC: "bg-teal-50 text-teal-700 border-teal-200",
  OFF_PEAK: "bg-gray-50 text-gray-500 border-gray-200",
  MPESA: "bg-green-50 text-green-700 border-green-200",
  DATA_UNVERIFIED: "bg-amber-50 text-amber-700 border-amber-200",
  NEARBY_STAGE: "bg-sky-50 text-sky-700 border-sky-200",
};