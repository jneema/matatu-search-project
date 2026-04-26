import { Trash2, PlusCircle } from "lucide-react";
import Field from "../../components/field";
import inputClass from "../../components/input-class";

const roads = [
  "Thika Road",
  "Waiyaki Way",
  "Jogoo Road",
  "Kiambu Road",
  "Lang'ata Road",
  "Mombasa Road",
];


const StepBulkDestinations = ({
  formData,
  onDestChange,
  onAddDest,
  onRemoveDest,
  errors,
}) => (
  <div className="space-y-4">
    <div className="mb-6">
      <h2 className="text-2xl font-extrabold text-gray-900">
        Bulk destinations
      </h2>
      <p className="text-sm text-gray-500 mt-1">Add multiple stops at once.</p>
    </div>

    {formData.destinations.map((dest, i) => {
      const e = errors[i] || {};
      return (
        <div
          key={i}
          className="border border-gray-200 rounded-lg overflow-hidden"
        >
          <div className="flex items-center justify-between px-4 py-3 bg-gray-900">
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Destination {i + 1}
            </span>
            {formData.destinations.length > 1 && (
              <button
                onClick={() => onRemoveDest(i)}
                className="text-white/50 hover:text-white"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            <Field label="Road *" error={e.road}>
              <select
                value={dest.road}
                onChange={(e) => onDestChange(i, "road", e.target.value)}
                className={inputClass(errors[i]?.road)}
              >
                <option value="" disabled>
                  Select road
                </option>
                {roads.map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>
            </Field>
            <Field label="Destination name *" error={e.destination}>
              <input
                type="text"
                value={dest.destination}
                onChange={(e) => onDestChange(i, "destination", e.target.value)}
                placeholder="e.g., Zimmerman"
                className={inputClass(errors[i]?.destination)}
              />
            </Field>
            <Field label="Departure *" error={e.departure}>
              <input
                type="text"
                value={dest.departure}
                onChange={(e) => onDestChange(i, "departure", e.target.value)}
                placeholder="e.g., CBD"
                className={inputClass(errors[i]?.departure)}
              />
            </Field>
            <Field label="Distance">
              <input
                type="text"
                value={dest.distance}
                onChange={(e) => onDestChange(i, "distance", e.target.value)}
                placeholder="e.g., 12 km"
                className={inputClass(false)}
              />
            </Field>
          </div>
        </div>
      );
    })}

    <button
      onClick={onAddDest}
      className="w-full flex items-center justify-center gap-2 py-2.5 border border-dashed border-gray-300 rounded-md text-sm font-medium text-gray-500 hover:border-green-600 hover:text-green-700 transition-colors"
    >
      <PlusCircle className="h-4 w-4" /> Add destination
    </button>
  </div>
);

export default StepBulkDestinations;
