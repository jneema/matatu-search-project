import Field from "../../components/field";
import inputClass from "../../components/input-class";

const StepTown = ({ formData, onChange, errors }) => (
  <div className="space-y-4">
    <div className="mb-6">
      <h2 className="text-2xl font-extrabold text-gray-900">Add a town</h2>
      <p className="text-sm text-gray-500 mt-1">Add a new town to the system.</p>
    </div>
    <Field label="Town name *" error={errors.name}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={onChange}
        placeholder="e.g., Kisumu"
        className={inputClass(errors.name)}
      />
    </Field>
  </div>
);

export default StepTown;