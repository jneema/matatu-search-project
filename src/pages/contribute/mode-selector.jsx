import { Bus, Navigation, MapPinIcon } from "lucide-react";

const modes = [
  {
    id: "route",
    label: "Full route",
    sub: "Route",
    icon: Navigation,
  },
  { id: "stage", label: "Stage", sub: "Stage", icon: MapPinIcon },
  {
    id: "sacco",
    label: "Sacco",
    sub: "Sacco Operator",
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
      {modes.map(({ icon: Icon, id, label, sub }) => (
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
