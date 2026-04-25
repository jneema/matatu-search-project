import Field from "../../components/field";
import inputClass from "../../components/input-class";

const towns = ["Nairobi", "Mombasa", "Kisumu", "Nakuru"];

const StepRoad = ({ formData, onChange, errors }) => (
  <div className="space-y-4">
    <div className="mb-6">
      <h2 className="text-2xl font-extrabold text-gray-900">Add a road</h2>
      <p className="text-sm text-gray-500 mt-1">
        Adds a new road to an existing town.
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Field label="Town *" error={errors.town}>
        <select
          name="town"
          value={formData.town}
          onChange={onChange}
          className={inputClass(errors.town)}
        >
          <option value="" disabled>
            Select town
          </option>
          {towns.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </Field>
      <Field label="Road name *" error={errors.road}>
        <input
          type="text"
          name="road"
          value={formData.road}
          onChange={onChange}
          placeholder="e.g., Thika Road"
          className={inputClass(errors.road)}
        />
      </Field>
    </div>
  </div>
);

export default StepRoad;
