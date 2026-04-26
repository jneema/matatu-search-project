import { useState } from "react";
import Field from "../../components/field";
import inputClass from "../../components/input-class";
import { addSacco } from "../../services/destinations";
import { uploadFile } from "../../services/upload";
import { CheckCircle, PlusCircle, ArrowLeft } from "lucide-react";

const VEHICLE_TYPE_OPTIONS = ["14-seater", "33-seater", "bus"];
const RATING_OPTIONS = [1, 2, 3, 4, 5];

const EMPTY = {
  name: "",
  vehicle_type: "14-seater",
  is_electric: false,
  terminus_area: "",
  safety_rating: 5,
  comfort_rating: 5,
  image_url: "",
  is_verified: false,
  operating_status: "active",
};

const AddSacco = ({ onSuccess, onAddStages }) => {
  const [formData, setFormData] = useState({ ...EMPTY });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [createdSacco, setCreatedSacco] = useState(null); 

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
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

  function validate() {
    const errs = {};
    if (!formData.name?.trim()) errs.name = "Sacco name is required";
    if (!formData.terminus_area?.trim()) errs.terminus_area = "Terminus area is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    try {
      const created = await addSacco({
        name: formData.name.trim(),
        vehicle_type: formData.vehicle_type,
        is_electric: formData.is_electric,
        terminus_area: formData.terminus_area.trim(),
        safety_rating: parseInt(formData.safety_rating),
        comfort_rating: parseInt(formData.comfort_rating),
        image_url: formData.image_url || "",
        is_verified: false,
        operating_status: "active",
      });
      setCreatedSacco(created); // show prompt instead of navigating away
    } catch (err) {
      console.error("Submission failed", err);
      setErrors((prev) => ({ ...prev, submit: "Submission failed — please try again" }));
    } finally {
      setSubmitting(false);
    }
  };

  if (createdSacco) {
    return (
      <div className="text-center py-16 space-y-6">
        <div className="flex flex-col items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center">
            <CheckCircle className="w-7 h-7 text-green-600" />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900">Sacco added!</h2>
          <p className="text-gray-500 text-sm">
            <span className="font-semibold text-gray-700">{createdSacco.name}</span> has been submitted for review.
          </p>
        </div>

        <p className="text-gray-600 text-sm">
          Do you know any stages for <span className="font-semibold text-gray-800">{createdSacco.name}</span>? Help us map them.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => onAddStages?.(createdSacco)}
            className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-md text-sm font-semibold hover:bg-black"
          >
            <PlusCircle className="h-4 w-4" /> Add stages for {createdSacco.name}
          </button>
          <button
            onClick={onSuccess}
            className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 rounded-md text-sm font-semibold text-gray-600 hover:bg-gray-50"
          >
            <ArrowLeft className="h-4 w-4" /> No, I'm done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold text-gray-900">Add Sacco</h2>
        <p className="text-sm text-gray-500 mt-1">
          Add a matatu sacco and its details.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Sacco Name *" error={errors.name}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={onChange}
            placeholder="e.g., Metro Trans"
            className={inputClass(errors.name)}
          />
        </Field>

        <Field label="Terminus Area *" error={errors.terminus_area}>
          <input
            type="text"
            name="terminus_area"
            value={formData.terminus_area}
            onChange={onChange}
            placeholder="e.g., Westlands"
            className={inputClass(errors.terminus_area)}
          />
        </Field>

        <Field label="Vehicle Type" error={errors.vehicle_type}>
          <select
            name="vehicle_type"
            value={formData.vehicle_type}
            onChange={onChange}
            className={inputClass(errors.vehicle_type)}
          >
            {VEHICLE_TYPE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </Field>

        <Field label="Safety Rating" error={errors.safety_rating}>
          <select
            name="safety_rating"
            value={formData.safety_rating}
            onChange={onChange}
            className={inputClass(errors.safety_rating)}
          >
            {RATING_OPTIONS.map((n) => (
              <option key={n} value={n}>
                {"★".repeat(n)}{"☆".repeat(5 - n)} ({n}/5)
              </option>
            ))}
          </select>
        </Field>

        <Field label="Comfort Rating" error={errors.comfort_rating}>
          <select
            name="comfort_rating"
            value={formData.comfort_rating}
            onChange={onChange}
            className={inputClass(errors.comfort_rating)}
          >
            {RATING_OPTIONS.map((n) => (
              <option key={n} value={n}>
                {"★".repeat(n)}{"☆".repeat(5 - n)} ({n}/5)
              </option>
            ))}
          </select>
        </Field>

        <Field label="Electric Vehicle">
          <label className="flex items-center gap-2 mt-1 cursor-pointer">
            <input
              type="checkbox"
              name="is_electric"
              checked={formData.is_electric}
              onChange={onChange}
              className="w-4 h-4 accent-green-600"
            />
            <span className="text-sm text-gray-600">
              This sacco operates electric vehicles
            </span>
          </label>
        </Field>

        <Field label="Sacco Image" className="md:col-span-2">
          <input
            type="file"
            accept="image/*"
            name="saccoImage"
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
          {submitting ? "Submitting…" : "Submit"} <CheckCircle className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default AddSacco;