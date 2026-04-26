import { useState, useCallback } from "react";
import Field from "../../components/field";
import inputClass from "../../components/input-class";
import { addStage } from "../../services/destinations";
import { uploadFile } from "../../services/upload";
import { CheckCircle } from "lucide-react";

const STAGE_TYPE_OPTIONS = ["formal", "informal"];
const DIRECTION_OPTIONS = ["inbound", "outbound"];

const EMPTY = {
  name: "",
  area: "",
  landmark: "",
  landmark_sw: "",
  stage_type: "formal",
  direction: "inbound",
  latitude: null,
  longitude: null,
  image_url: "",
  is_active: false,
};

const AddStage = ({ onSuccess }) => {
  const [formData, setFormData] = useState({ ...EMPTY });
  const [errors, setErrors] = useState({});
  const [geoStatus, setGeoStatus] = useState("");
  const [geoLoading, setGeoLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const onFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const res = await uploadFile(file);
      setFormData((prev) => ({ ...prev, image_url: res.url }));
    } catch {
      setErrors((prev) => ({ ...prev, image_url: "Image upload failed" }));
    }
  };

  const geocode = useCallback(async () => {
    const name = formData.name?.trim();
    const area = formData.area?.trim();
    if (!name && !area) return;

    setGeoLoading(true);
    setGeoStatus("Looking up coordinates…");

    try {
      if (name?.length >= 3) {
        const data = await osmSearch(name);
        if (data.length) {
          applyCoords(data[0]);
          return;
        }
      }
      if (area?.length >= 3) {
        setGeoStatus("Stage not found — trying area…");
        const data = await osmSearch(area);
        if (data.length) {
          applyCoords(data[0]);
          return;
        }
      }
      setGeoStatus("No location found — enter coordinates manually");
    } catch {
      setGeoStatus("Geocoding unavailable — enter coordinates manually");
    } finally {
      setGeoLoading(false);
    }

    async function osmSearch(query) {
      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        query + " Kenya",
      )}&format=json&limit=1`;
      const res = await fetch(url, { headers: { "Accept-Language": "en" } });
      return res.json();
    }

    function applyCoords(result) {
      setFormData((prev) => ({
        ...prev,
        latitude: parseFloat(result.lat),
        longitude: parseFloat(result.lon),
      }));
      setGeoStatus(`✓ ${result.display_name.split(",").slice(0, 2).join(",")}`);
    }
  }, [formData.name, formData.area]);

  function validate() {
    const errs = {};
    if (!formData.name?.trim()) errs.name = "Stage name is required";
    if (!formData.area?.trim()) errs.area = "Area is required";
    if (formData.latitude == null) errs.latitude = "Latitude is required";
    if (formData.longitude == null) errs.longitude = "Longitude is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    try {
      await addStage({
        name: formData.name.trim(),
        area: formData.area.trim(),
        landmark: formData.landmark?.trim() || "",
        landmark_sw: formData.landmark_sw?.trim() || "",
        stage_type: formData.stage_type,
        direction: formData.direction,
        latitude: parseFloat(formData.latitude),
        longitude: parseFloat(formData.longitude),
        image_url: formData.image_url || "",
        is_active: false,
      });
      onSuccess?.(formData.name.trim());
    } catch (err) {
      console.error("Submission failed", err);
      setErrors((prev) => ({
        ...prev,
        submit: "Submission failed — please try again",
      }));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold text-gray-900">Add Stage</h2>
        <p className="text-sm text-gray-500 mt-1">
          Add a matatu stage with images if available.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field
          label="Stage Name *"
          error={errors.name}
          className="md:col-span-2"
        >
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={onChange}
            onBlur={geocode}
            placeholder="e.g., Alsops"
            className={inputClass(errors.name)}
          />
          {geoStatus && (
            <p
              className={`text-xs mt-1 ${
                geoLoading
                  ? "text-gray-400"
                  : geoStatus.startsWith("✓")
                    ? "text-green-600"
                    : "text-amber-600"
              }`}
            >
              {geoStatus}
            </p>
          )}
        </Field>

        <Field label="Latitude" error={errors.latitude} disabled>
          <input
            type="number"
            name="latitude"
            value={formData.latitude ?? ""}
            onChange={onChange}
            placeholder="-1.2921"
            disabled
            className={inputClass(errors.latitude, true)}
          />
        </Field>

        <Field label="Longitude" error={errors.longitude} disabled>
          <input
            type="number"
            name="longitude"
            value={formData.longitude ?? ""}
            onChange={onChange}
            placeholder="36.8219"
            disabled
            className={inputClass(errors.longitude, true)}
          />
        </Field>

        <Field label="Area *" error={errors.area}>
          <input
            type="text"
            name="area"
            value={formData.area}
            onChange={onChange}
            onBlur={geocode}
            placeholder="e.g., Westlands"
            className={inputClass(errors.area)}
          />
        </Field>

        <Field label="Landmark" error={errors.landmark}>
          <input
            type="text"
            name="landmark"
            value={formData.landmark}
            onChange={onChange}
            placeholder="e.g., Next to Total Petrol Station"
            className={inputClass(errors.landmark)}
          />
        </Field>

        <Field label="Landmark (Swahili)" error={errors.landmark_sw}>
          <input
            type="text"
            name="landmark_sw"
            value={formData.landmark_sw}
            onChange={onChange}
            placeholder="e.g., Karibu na stendi ya mafuta"
            className={inputClass(errors.landmark_sw)}
          />
        </Field>

        <Field label="Stage Type" error={errors.stage_type}>
          <select
            name="stage_type"
            value={formData.stage_type}
            onChange={onChange}
            className={inputClass(errors.stage_type)}
          >
            {STAGE_TYPE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt.charAt(0).toUpperCase() + opt.slice(1)}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Direction" error={errors.direction}>
          <select
            name="direction"
            value={formData.direction}
            onChange={onChange}
            className={inputClass(errors.direction)}
          >
            {DIRECTION_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt.charAt(0).toUpperCase() + opt.slice(1)}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Stage Image" className="md:col-span-2">
          <input
            type="file"
            accept="image/*"
            name="stageImage"
            onChange={onFileChange}
            className="w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-900 file:text-white hover:file:bg-black"
          />
          {formData.image_url && (
            <p className="text-xs text-green-600 mt-1">✓ Image uploaded</p>
          )}
          {errors.image_url && (
            <p className="text-xs text-red-500 mt-1">{errors.image_url}</p>
          )}
        </Field>
      </div>

      {errors.submit && (
        <p className="text-red-500 text-sm text-right">{errors.submit}</p>
      )}

      <div className="flex justify-end pt-5">
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="flex items-center gap-1.5 px-5 py-2.5 bg-gray-900 text-white rounded-md text-sm font-semibold hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? "Submitting…" : "Submit"}{" "}
          <CheckCircle className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default AddStage;
