import { useState, useEffect } from "react";
import Field from "../../components/field";
import inputClass from "../../components/input-class";
import { getSaccos, getStages, addRoute } from "../../services/destinations";
import { CheckCircle } from "lucide-react";

const EMPTY = {
  sacco_id: "",
  corridor_id: "",
  origin_stage_id: "",
  dest_stage_id: "",
  via_description: "",
  via_description_sw: "",
  distance_km: "",
  is_express: false,
  route_status: "inactive",
  departure_frequency_mins: "",
  avg_duration_mins: "",
  peak_duration_mins: "",
};

const AddRoute = ({ onSuccess }) => {
  const [formData, setFormData] = useState({ ...EMPTY });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const [saccos, setSaccos] = useState([]);
  const [stages, setStages] = useState([]);
  const [loading, setLoading] = useState({ saccos: true, stages: true });

  useEffect(() => {
    getSaccos()
      .then((data) => setSaccos(data))
      .catch(() => setErrors((p) => ({ ...p, _saccos: "Failed to load saccos" })))
      .finally(() => setLoading((p) => ({ ...p, saccos: false })));

    getStages()
      .then((data) => setStages(data))
      .catch(() => setErrors((p) => ({ ...p, _stages: "Failed to load stages" })))
      .finally(() => setLoading((p) => ({ ...p, stages: false })));
  }, []);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  function validate() {
    const errs = {};
    if (!formData.sacco_id) errs.sacco_id = "Sacco is required";
    if (!formData.origin_stage_id) errs.origin_stage_id = "Origin stage is required";
    if (!formData.dest_stage_id) errs.dest_stage_id = "Destination stage is required";
    if (formData.origin_stage_id && formData.origin_stage_id === formData.dest_stage_id)
      errs.dest_stage_id = "Origin and destination cannot be the same";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    try {
      await addRoute({
        sacco_id: formData.sacco_id,
        corridor_id: formData.corridor_id || null,
        origin_stage_id: formData.origin_stage_id,
        dest_stage_id: formData.dest_stage_id,
        via_description: formData.via_description.trim(),
        via_description_sw: formData.via_description_sw.trim(),
        distance_km: formData.distance_km ? parseFloat(formData.distance_km) : null,
        is_express: formData.is_express,
        route_status: "active",
        departure_frequency_mins: formData.departure_frequency_mins
          ? parseInt(formData.departure_frequency_mins)
          : null,
        avg_duration_mins: formData.avg_duration_mins
          ? parseInt(formData.avg_duration_mins)
          : null,
        peak_duration_mins: formData.peak_duration_mins
          ? parseInt(formData.peak_duration_mins)
          : null,
      });
      onSuccess?.();
    } catch (err) {
      console.error("Submission failed", err);
      setErrors((prev) => ({ ...prev, submit: "Submission failed — please try again" }));
    } finally {
      setSubmitting(false);
    }
  };

  const stagesLoading = loading.saccos || loading.stages;

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold text-gray-900">Add Route</h2>
        <p className="text-sm text-gray-500 mt-1">
          Link a sacco to its origin and destination stages.
        </p>
      </div>

      {errors._saccos && (
        <p className="text-red-500 text-sm">{errors._saccos}</p>
      )}
      {errors._stages && (
        <p className="text-red-500 text-sm">{errors._stages}</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Sacco */}
        <Field label="Sacco *" error={errors.sacco_id} className="md:col-span-2">
          <select
            name="sacco_id"
            value={formData.sacco_id}
            onChange={onChange}
            disabled={loading.saccos}
            className={inputClass(errors.sacco_id, loading.saccos)}
          >
            <option value="">
              {loading.saccos ? "Loading saccos…" : "Select a sacco"}
            </option>
            {saccos.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} — {s.vehicle_type}
              </option>
            ))}
          </select>
        </Field>

        {/* Origin stage */}
        <Field label="Origin Stage *" error={errors.origin_stage_id}>
          <select
            name="origin_stage_id"
            value={formData.origin_stage_id}
            onChange={onChange}
            disabled={loading.stages}
            className={inputClass(errors.origin_stage_id, loading.stages)}
          >
            <option value="">
              {loading.stages ? "Loading stages…" : "Select origin"}
            </option>
            {stages.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} — {s.area}
              </option>
            ))}
          </select>
        </Field>

        {/* Destination stage */}
        <Field label="Destination Stage *" error={errors.dest_stage_id}>
          <select
            name="dest_stage_id"
            value={formData.dest_stage_id}
            onChange={onChange}
            disabled={loading.stages}
            className={inputClass(errors.dest_stage_id, loading.stages)}
          >
            <option value="">
              {loading.stages ? "Loading stages…" : "Select destination"}
            </option>
            {stages
              .filter((s) => s.id !== formData.origin_stage_id)
              .map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} — {s.area}
                </option>
              ))}
          </select>
        </Field>

        {/* Via description */}
        <Field label="Via (English)" error={errors.via_description}>
          <input
            type="text"
            name="via_description"
            value={formData.via_description}
            onChange={onChange}
            placeholder="e.g., Via Ngong Road"
            className={inputClass(errors.via_description)}
          />
        </Field>

        <Field label="Via (Swahili)" error={errors.via_description_sw}>
          <input
            type="text"
            name="via_description_sw"
            value={formData.via_description_sw}
            onChange={onChange}
            placeholder="e.g., Kupitia Barabara ya Ngong"
            className={inputClass(errors.via_description_sw)}
          />
        </Field>

        {/* Numeric fields */}
        <Field label="Distance (km)" error={errors.distance_km}>
          <input
            type="number"
            name="distance_km"
            value={formData.distance_km}
            onChange={onChange}
            placeholder="e.g., 12.5"
            min="0"
            step="0.1"
            className={inputClass(errors.distance_km)}
          />
        </Field>

        <Field label="Departure Frequency (mins)" error={errors.departure_frequency_mins}>
          <input
            type="number"
            name="departure_frequency_mins"
            value={formData.departure_frequency_mins}
            onChange={onChange}
            placeholder="e.g., 15"
            min="0"
            className={inputClass(errors.departure_frequency_mins)}
          />
        </Field>

        <Field label="Avg Duration (mins)" error={errors.avg_duration_mins}>
          <input
            type="number"
            name="avg_duration_mins"
            value={formData.avg_duration_mins}
            onChange={onChange}
            placeholder="e.g., 45"
            min="0"
            className={inputClass(errors.avg_duration_mins)}
          />
        </Field>

        <Field label="Peak Duration (mins)" error={errors.peak_duration_mins}>
          <input
            type="number"
            name="peak_duration_mins"
            value={formData.peak_duration_mins}
            onChange={onChange}
            placeholder="e.g., 75"
            min="0"
            className={inputClass(errors.peak_duration_mins)}
          />
        </Field>

        {/* Express toggle */}
        <Field label="Express Route">
          <label className="flex items-center gap-2 mt-1 cursor-pointer">
            <input
              type="checkbox"
              name="is_express"
              checked={formData.is_express}
              onChange={onChange}
              className="w-4 h-4 accent-green-600"
            />
            <span className="text-sm text-gray-600">
              This is an express route (fewer stops)
            </span>
          </label>
        </Field>
      </div>

      {errors.submit && (
        <p className="text-red-500 text-sm text-right">{errors.submit}</p>
      )}

      <div className="flex justify-end pt-5">
        <button
          onClick={handleSubmit}
          disabled={submitting || stagesLoading}
          className="flex items-center gap-1.5 px-5 py-2.5 bg-gray-900 text-white rounded-md text-sm font-semibold hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? "Submitting…" : "Submit"} <CheckCircle className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default AddRoute;