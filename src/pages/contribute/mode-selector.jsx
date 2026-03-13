import {
  MapPin,
  Bus,
  Navigation,
  List,
  PlusCircle,
  Layers,
  Building,
  Building2,
} from "lucide-react";

const modes = [
  {
    id: "route",
    label: "Full route",
    sub: "Road + destination + matatus",
    icon: Navigation,
  },
  { id: "town", label: "Add a town", sub: "Single new town", icon: Building2 },
  {
    id: "bulk-towns",
    label: "Bulk towns",
    sub: "Multiple towns at once",
    icon: Building,
  },
  { id: "road", label: "Add a road", sub: "New road to a town", icon: MapPin },
  {
    id: "bulk-roads",
    label: "Bulk roads",
    sub: "Multiple roads at once",
    icon: List,
  },
  {
    id: "destination",
    label: "Destination only",
    sub: "Single stop, no matatus",
    icon: MapPin,
  },
  {
    id: "bulk-destinations",
    label: "Bulk destinations",
    sub: "Multiple stops at once",
    icon: PlusCircle,
  },
  {
    id: "sacco",
    label: "Sacco + fleet",
    sub: "Operator and their matatus",
    icon: Layers,
  },
  {
    id: "matatu",
    label: "Single matatu",
    sub: "One vehicle with images",
    icon: Bus,
  },
];

const ModeSelector = ({ onSelect }) => (
  <div className="space-y-4">
    <div className="mb-6">
      <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
        What do you want to add?
      </h2>
      <p className="text-sm text-gray-500 mt-1">
        Choose the type of data you're submitting.
      </p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {modes.map(({ id, label, sub, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onSelect(id)}
          className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg text-left hover:border-green-600 hover:bg-green-50 transition-colors"
        >
          <div className="w-9 h-9 rounded-md bg-green-600 flex items-center justify-center flex-shrink-0">
            <Icon className="h-4 w-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">{label}</p>
            <p className="text-xs text-gray-500">{sub}</p>
          </div>
        </button>
      ))}
    </div>
  </div>
);

export default ModeSelector;
