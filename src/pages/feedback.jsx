import React, { useState } from "react";
import {
  CheckCircle,
  PlusCircle,
  Trash2,
  MapPin,
  Bus,
  X,
  ArrowRight,
  ArrowLeft,
  ClipboardList,
} from "lucide-react";
import { useNavigate } from "react-router";

const STEPS = [
  { id: 1, label: "Route Info", icon: MapPin },
  { id: 2, label: "Matatu Details", icon: Bus },
  { id: 3, label: "Review & Submit", icon: ClipboardList },
];

const EMPTY_MATATU = {
  saccoName: "",
  matatuName: "",
  matatuNumber: "",
  stageLocationDestination: "",
  stageLocationDeparture: "",
  payment: [],
  dropoffs: "",
  peakFare: "",
  offPeakFare: "",
  type: "",
  rating: "",
  contacts: "",
};

const roads = [
  "Thika Road",
  "Waiyaki Way",
  "Jogoo Road",
  "Kiambu Road",
  "Lang'ata Road",
  "Mombasa Road",
];
const matatuTypes = ["Standard", "Express"];
const paymentOptions = ["Cash", "M-pesa", "Card"];

const inputClass = (error) =>
  `w-full px-3 py-2.5 border rounded-md text-sm outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 transition-colors bg-white ${
    error ? "border-red-400" : "border-gray-300"
  }`;

const Field = ({ label, error, children }) => (
  <div>
    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
      {label}
    </label>
    {children}
    {error && <p className="text-red-500 text-xs mt-1">⚠ {error}</p>}
  </div>
);

// ── Step 1 ────────────────────────────────────────────────────────────────────
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

// ── Step 2 ────────────────────────────────────────────────────────────────────
const StepMatatus = ({
  formData,
  handleInputChange,
  addMatatu,
  removeMatatu,
  errors,
}) => (
  <div className="space-y-4">
    <div className="mb-6">
      <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
        Matatu Details
      </h2>
      <p className="text-sm text-gray-500 mt-1">
        Add one or more matatus that operate on this route.
      </p>
    </div>

    {formData.matatus.map((matatu, index) => (
      <div
        key={index}
        className="border border-gray-200 rounded-lg overflow-hidden"
      >
        <div className="flex items-center justify-between px-4 py-3 bg-gray-900">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-white/10 flex items-center justify-center">
              <Bus className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Matatu {index + 1}
            </span>
          </div>
          {formData.matatus.length > 1 && (
            <button
              onClick={() => removeMatatu(index)}
              className="p-1 text-white/50 hover:text-white transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            {
              label: "Sacco Name",
              name: "saccoName",
              placeholder: "e.g., Super Metro",
            },
            {
              label: "Matatu Name",
              name: "matatuName",
              placeholder: "e.g., Thika Express",
            },
            {
              label: "Matatu Number",
              name: "matatuNumber",
              placeholder: "e.g., KCB 123A",
            },
            {
              label: "Stage at Destination",
              name: "stageLocationDestination",
              placeholder: "e.g., TRM",
            },
            {
              label: "Stage at Departure",
              name: "stageLocationDeparture",
              placeholder: "e.g., Railways",
            },
            {
              label: "Contacts",
              name: "contacts",
              placeholder: "e.g., 0700 123 456",
            },
          ].map((f) => (
            <Field key={f.name} label={f.label}>
              <input
                type="text"
                name={`matatu-${index}-${f.name}`}
                value={matatu[f.name]}
                onChange={(e) => handleInputChange(e, index)}
                placeholder={f.placeholder}
                className={inputClass(false)}
              />
            </Field>
          ))}

          <Field label="Peak Fare (KES)">
            <input
              type="number"
              name={`matatu-${index}-peakFare`}
              value={matatu.peakFare}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="e.g., 120"
              className={inputClass(false)}
            />
          </Field>

          <Field label="Off-Peak Fare (KES)">
            <input
              type="number"
              name={`matatu-${index}-offPeakFare`}
              value={matatu.offPeakFare}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="e.g., 100"
              className={inputClass(false)}
            />
          </Field>

          <Field label="Type">
            <select
              name={`matatu-${index}-type`}
              value={matatu.type}
              onChange={(e) => handleInputChange(e, index)}
              className={inputClass(false)}
            >
              <option value="" disabled>
                Select type
              </option>
              {matatuTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Rating (0–5)">
            <input
              type="number"
              name={`matatu-${index}-rating`}
              value={matatu.rating}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="e.g., 4.2"
              step="0.1"
              min="0"
              max="5"
              className={inputClass(false)}
            />
          </Field>

          <div className="md:col-span-2">
            <Field label="Drop Off Points">
              <input
                type="text"
                name={`matatu-${index}-dropoffs`}
                value={matatu.dropoffs}
                onChange={(e) => handleInputChange(e, index)}
                placeholder="e.g., Muthaiga, Allsops, Roasters"
                className={inputClass(false)}
              />
            </Field>
          </div>

          <div className="md:col-span-2">
            <Field label="Payment Methods">
              <div className="grid grid-cols-3 gap-2 mt-0.5">
                {paymentOptions.map((option) => (
                  <label
                    key={option}
                    className="flex items-center gap-2 p-2.5 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      name={`matatu-${index}-payment`}
                      value={option}
                      checked={matatu.payment.includes(option)}
                      onChange={(e) => handleInputChange(e, index)}
                      className="w-4 h-4 text-green-600 rounded focus:ring-green-600"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {option}
                    </span>
                  </label>
                ))}
              </div>
            </Field>
          </div>
        </div>

        {errors[`matatu-${index}`] && (
          <div className="px-4 pb-3">
            <p className="text-red-500 text-xs">
              ⚠ {errors[`matatu-${index}`]}
            </p>
          </div>
        )}
      </div>
    ))}

    <button
      onClick={addMatatu}
      className="w-full flex items-center justify-center gap-2 py-2.5 border border-dashed border-gray-300 rounded-md text-sm font-medium text-gray-500 hover:border-green-600 hover:text-green-700 transition-colors"
    >
      <PlusCircle className="h-4 w-4" /> Add Another Matatu
    </button>

    <Field label="Additional Comments">
      <textarea
        name="comments"
        value={formData.comments}
        onChange={handleInputChange}
        rows={3}
        placeholder="Any other updates, observations, or helpful information..."
        className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 resize-none transition-colors"
      />
    </Field>
  </div>
);

// ── Step 3 ────────────────────────────────────────────────────────────────────
const ReviewRow = ({ label, value }) => (
  <div className="flex justify-between items-start py-2.5 border-b border-gray-100 last:border-0">
    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider w-36 flex-shrink-0">
      {label}
    </span>
    <span className="text-sm font-medium text-gray-800 text-right">
      {value || <span className="text-gray-300 italic">—</span>}
    </span>
  </div>
);

const StepReview = ({ formData }) => (
  <div className="space-y-5">
    <div className="mb-6">
      <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
        Review & Submit
      </h2>
      <p className="text-sm text-gray-500 mt-1">
        Double-check everything before submitting.
      </p>
    </div>

    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 bg-green-600">
        <MapPin className="h-3.5 w-3.5 text-white" />
        <span className="text-xs font-bold text-white uppercase tracking-wider">
          Route
        </span>
      </div>
      <div className="px-4 pt-1 pb-2">
        <ReviewRow label="Town" value={formData.town} />
        <ReviewRow label="Road" value={formData.road} />
        <ReviewRow label="Destination" value={formData.destination} />
        <ReviewRow label="Departure" value={formData.departure} />
        <ReviewRow label="Distance" value={formData.distance} />
      </div>
    </div>

    {formData.matatus.map((m, i) => (
      <div
        key={i}
        className="border border-gray-200 rounded-lg overflow-hidden"
      >
        <div className="flex items-center gap-2 px-4 py-3 bg-gray-900">
          <Bus className="h-3.5 w-3.5 text-white" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            Matatu {i + 1}
          </span>
        </div>
        <div className="px-4 pt-1 pb-2">
          <ReviewRow label="Sacco" value={m.saccoName} />
          <ReviewRow label="Name" value={m.matatuName} />
          <ReviewRow label="Number" value={m.matatuNumber} />
          <ReviewRow label="Stage (dest)" value={m.stageLocationDestination} />
          <ReviewRow label="Stage (dept)" value={m.stageLocationDeparture} />
          <ReviewRow
            label="Peak Fare"
            value={m.peakFare ? `KES ${m.peakFare}` : ""}
          />
          <ReviewRow
            label="Off-Peak Fare"
            value={m.offPeakFare ? `KES ${m.offPeakFare}` : ""}
          />
          <ReviewRow label="Type" value={m.type} />
          <ReviewRow label="Rating" value={m.rating} />
          <ReviewRow label="Drop Offs" value={m.dropoffs} />
          <ReviewRow label="Payment" value={m.payment.join(", ")} />
          <ReviewRow label="Contacts" value={m.contacts} />
        </div>
      </div>
    ))}

    {formData.comments && (
      <div className="border border-gray-200 rounded-lg p-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
          Comments
        </p>
        <p className="text-sm text-gray-700">{formData.comments}</p>
      </div>
    )}
  </div>
);

// ── Main ──────────────────────────────────────────────────────────────────────
const Feedback = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    town: "Nairobi",
    road: "",
    destination: "",
    departure: "",
    distance: "",
    matatus: [{ ...EMPTY_MATATU }],
    comments: "",
  });

  const handleInputChange = (e, index = null) => {
    const { name, value, checked } = e.target;
    if (name.startsWith("matatu")) {
      const [, , prop] = name.split("-");
      const updated = [...formData.matatus];
      if (prop === "payment") {
        updated[index] = {
          ...updated[index],
          payment: checked
            ? [...updated[index].payment, value]
            : updated[index].payment.filter((p) => p !== value),
        };
      } else {
        updated[index] = { ...updated[index], [prop]: value };
      }
      setFormData((prev) => ({ ...prev, matatus: updated }));
      setErrors((prev) => ({ ...prev, [`matatu-${index}`]: "" }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const addMatatu = () =>
    setFormData((prev) => ({
      ...prev,
      matatus: [...prev.matatus, { ...EMPTY_MATATU }],
    }));

  const removeMatatu = (index) => {
    if (formData.matatus.length === 1) return;
    setFormData((prev) => ({
      ...prev,
      matatus: prev.matatus.filter((_, i) => i !== index),
    }));
  };

  const validateStep = () => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.road) newErrors.road = "Please select a road";
      if (!formData.destination.trim()) newErrors.destination = "Required";
      if (!formData.departure.trim()) newErrors.departure = "Required";
    }
    if (step === 2) {
      formData.matatus.forEach((m, i) => {
        if (
          !m.saccoName.trim() ||
          !m.matatuName.trim() ||
          !m.stageLocationDestination.trim() ||
          !m.peakFare ||
          !m.offPeakFare ||
          !m.type ||
          !m.dropoffs.trim() ||
          m.payment.length === 0
        ) {
          newErrors[`matatu-${i}`] = "Please fill all required fields";
        }
      });
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const next = () => {
    if (validateStep()) setStep((s) => s + 1);
  };
  const back = () => {
    setErrors({});
    setStep((s) => s - 1);
  };

  const submit = () => {
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setStep(1);
      setFormData({
        town: "Nairobi",
        road: "",
        destination: "",
        departure: "",
        distance: "",
        matatus: [{ ...EMPTY_MATATU }],
        comments: "",
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-200 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto flex items-center justify-between py-5">
          <div>
            <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">
              Submit Route Info
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">
              Help improve matatu data for Nairobi commuters
            </p>
          </div>
          <button
            onClick={() => navigate("/")}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Step indicator */}
        {!submitted && (
          <div className="max-w-3xl mx-auto pb-4">
            <div className="flex items-center gap-1">
              {STEPS.map((s, i) => (
                <React.Fragment key={s.id}>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold transition-colors ${
                        step === s.id
                          ? "bg-green-600 text-white"
                          : step > s.id
                            ? "bg-gray-900 text-white"
                            : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {step > s.id ? (
                        <CheckCircle className="h-3.5 w-3.5" />
                      ) : (
                        s.id
                      )}
                    </div>
                    <span
                      className={`text-xs font-semibold hidden sm:block transition-colors ${
                        step === s.id
                          ? "text-green-600"
                          : step > s.id
                            ? "text-gray-700"
                            : "text-gray-400"
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div
                      className={`flex-1 h-px mx-2 transition-colors ${step > s.id ? "bg-gray-900" : "bg-gray-200"}`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Content */}
      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {submitted ? (
            <div className="border border-gray-200 rounded-lg p-16 flex flex-col items-center text-center gap-4">
              <div className="w-14 h-14 bg-green-600 rounded-md flex items-center justify-center">
                <CheckCircle className="h-7 w-7 text-white" />
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-xl font-bold text-gray-900">Submitted!</p>
                <p className="text-sm text-gray-500 max-w-xs">
                  Your route and matatu information will be reviewed by our
                  team.
                </p>
              </div>
            </div>
          ) : (
            <>
              {step === 1 && (
                <StepRoute
                  formData={formData}
                  handleInputChange={handleInputChange}
                  errors={errors}
                />
              )}
              {step === 2 && (
                <StepMatatus
                  formData={formData}
                  handleInputChange={handleInputChange}
                  addMatatu={addMatatu}
                  removeMatatu={removeMatatu}
                  errors={errors}
                />
              )}
              {step === 3 && <StepReview formData={formData} />}

              {/* Nav */}
              <div className="flex items-center justify-between mt-8 pt-5 border-t border-gray-200">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Step {step} of {STEPS.length}
                </span>
                <div className="flex gap-3">
                  {step > 1 && (
                    <button
                      onClick={back}
                      className="flex items-center gap-1.5 px-4 py-2.5 border border-gray-200 rounded-md text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                      <ArrowLeft className="h-4 w-4" /> Back
                    </button>
                  )}
                  {step < STEPS.length ? (
                    <button
                      onClick={next}
                      className="flex items-center gap-1.5 px-5 py-2.5 bg-green-600 text-white rounded-md text-sm font-semibold hover:bg-green-700 transition-colors"
                    >
                      Next <ArrowRight className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      onClick={submit}
                      className="flex items-center gap-1.5 px-5 py-2.5 bg-gray-900 text-white rounded-md text-sm font-semibold hover:bg-black transition-colors"
                    >
                      Submit <CheckCircle className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      <footer className="border-t border-gray-200 py-4 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} Matatu Route Finder
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Feedback;
