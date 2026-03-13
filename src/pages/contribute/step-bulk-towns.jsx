import { Trash2, PlusCircle } from "lucide-react";
import Field from "../../components/field";
import inputClass from "../../components/input-class";

const StepBulkTowns = ({ formData, onTownChange, onAddTown, onRemoveTown, errors }) => (
  <div className="space-y-4">
    <div className="mb-6">
      <h2 className="text-2xl font-extrabold text-gray-900">Bulk towns</h2>
      <p className="text-sm text-gray-500 mt-1">Add multiple towns at once.</p>
    </div>

    <div className="space-y-2">
      {formData.towns.map((town, i) => (
        <div key={i} className="flex gap-2 items-center">
          <input
            type="text"
            value={town}
            onChange={(e) => onTownChange(i, e.target.value)}
            placeholder={`Town ${i + 1} name`}
            className={`flex-1 ${inputClass(errors.towns?.[i])}`}
          />
          {errors.towns?.[i] && (
            <p className="text-xs text-red-500 mt-1">{errors.towns[i]}</p>
          )}
          {formData.towns.length > 1 && (
            <button onClick={() => onRemoveTown(i)} className="p-2 text-gray-400 hover:text-red-500">
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>
      ))}
    </div>

    <button
      onClick={onAddTown}
      className="w-full flex items-center justify-center gap-2 py-2.5 border border-dashed border-gray-300 rounded-md text-sm font-medium text-gray-500 hover:border-green-600 hover:text-green-700 transition-colors"
    >
      <PlusCircle className="h-4 w-4" /> Add town
    </button>
  </div>
);

export default StepBulkTowns;