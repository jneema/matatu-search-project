import React, { useState } from "react";
import {
  CheckCircle,
  MapPin,
  Bus,
  ArrowRight,
  ArrowLeft,
  ClipboardList,
  PlusCircle,
  Home,
} from "lucide-react";
import { useNavigate } from "react-router";
import Footer from "./footer";
import Header from "./header";
import StepRoute from "./step-route";
import StepMatatus from "./step-matatus";
import StepReview from "./step-review";

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

const EMPTY_FORM = {
  town: "Nairobi",
  road: "",
  destination: "",
  departure: "",
  distance: "",
  matatus: [{ ...EMPTY_MATATU }],
  comments: "",
};

const Feedback = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({ ...EMPTY_FORM });

  const handleInputChange = (e, index = null) => {
    const { name, value, checked } = e.target;

    if (index !== null) {
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

      setErrors((prev) => {
        if (!prev[index]) return prev;
        const updatedMatatuErrors = { ...prev[index] };
        delete updatedMatatuErrors[prop];
        return {
          ...prev,
          [index]: Object.keys(updatedMatatuErrors).length
            ? updatedMatatuErrors
            : undefined,
        };
      });
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
        const mErr = {};
        if (!m.saccoName.trim()) mErr.saccoName = "Required";
        if (!m.matatuName.trim()) mErr.matatuName = "Required";
        if (!m.stageLocationDestination.trim())
          mErr.stageLocationDestination = "Required";
        if (!m.peakFare) mErr.peakFare = "Required";
        if (!m.offPeakFare) mErr.offPeakFare = "Required";
        if (!m.type) mErr.type = "Required";
        if (!m.dropoffs.trim()) mErr.dropoffs = "Required";
        if (m.payment.length === 0) mErr.payment = "Select at least one";
        if (Object.keys(mErr).length > 0) newErrors[i] = mErr;
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
  };

  const handleAddAnother = () => {
    setSubmitted(false);
    setStep(1);
    setErrors({});
    setFormData({ ...EMPTY_FORM, matatus: [{ ...EMPTY_MATATU }] });
  };

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      <Header STEPS={STEPS} submitted={submitted} step={step} />

      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {submitted ? (
            <div className="border border-gray-200 rounded-lg p-12 flex flex-col items-center text-center gap-5">
              <div className="w-14 h-14 bg-green-600 rounded-md flex items-center justify-center">
                <CheckCircle className="h-7 w-7 text-white" />
              </div>
              <div className="flex flex-col gap-1.5">
                <p className="text-xl font-bold text-gray-900">Submitted!</p>
                <p className="text-sm text-gray-500 max-w-xs mx-auto">
                  Your route and matatu information will be reviewed by our
                  team.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
                <button
                  onClick={() => navigate("/")}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-md text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <Home className="h-4 w-4" /> Go Home
                </button>
                <button
                  onClick={handleAddAnother}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-green-600 text-white rounded-md text-sm font-semibold hover:bg-green-700 transition-colors"
                >
                  <PlusCircle className="h-4 w-4" /> Add Another
                </button>
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

      <Footer />
    </div>
  );
};

export default Feedback;
