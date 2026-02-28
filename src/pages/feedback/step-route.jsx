import React from "react";
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

const StepRoute = ({ formData, handleInputChange, errors }) => (
  <div className="space-y-4">
    <div className="mb-6">
      <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
        Route Information
      </h2>
      <p className="text-sm text-gray-500 mt-1">
        Tell us about the route you're submitting.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Field label="Town">
        <input
          type="text"
          value="Nairobi"
          disabled
          className="w-full px-3 py-2.5 border border-gray-200 rounded-md text-sm text-gray-400 bg-gray-50 cursor-not-allowed"
        />
      </Field>

      <Field label="Road *" error={errors.road}>
        <select
          name="road"
          value={formData.road}
          onChange={handleInputChange}
          className={inputClass(errors.road)}
        >
          <option value="" disabled>
            Select a road
          </option>
          {roads.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Destination *" error={errors.destination}>
        <input
          type="text"
          name="destination"
          value={formData.destination}
          onChange={handleInputChange}
          placeholder="e.g., Zimmerman"
          className={inputClass(errors.destination)}
        />
      </Field>

      <Field label="Departure Point *" error={errors.departure}>
        <input
          type="text"
          name="departure"
          value={formData.departure}
          onChange={handleInputChange}
          placeholder="e.g., Nairobi CBD"
          className={inputClass(errors.departure)}
        />
      </Field>

      <div className="md:col-span-2">
        <Field label="Distance">
          <input
            type="text"
            name="distance"
            value={formData.distance}
            onChange={handleInputChange}
            placeholder="e.g., 12 km"
            className={inputClass(false)}
          />
        </Field>
      </div>
    </div>
  </div>
);

export default StepRoute;
