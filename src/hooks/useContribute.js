import { useState } from "react";
import { EMPTY_MATATU, EMPTY_ROUTE } from "../constants";
import { EMPTY_DEST } from "../pages/contribute/step-bulk-destinations";
import { EMPTY_SACCO_MATATU } from "../pages/contribute/step-sacco";

const INIT = {
  town: { name: "" },
  "bulk-towns": { towns: [""] },
  road: { town: "", road: "" },
  "bulk-roads": { town: "", roads: [""] },
  destination: {
    town: "Nairobi",
    road: "",
    destination: "",
    departure: "",
    distance: "",
  },
  "bulk-destinations": { destinations: [{ ...EMPTY_DEST }] },
  sacco: { name: "", contacts: "", matatus: [{ ...EMPTY_SACCO_MATATU }] },
  matatu: {
    saccoName: "",
    destinationId: "",
    matatuName: "",
    matatuNumber: "",
    cbdStage: "",
    estateStage: "",
    peakFareInbound: "",
    peakFareOutbound: "",
    offPeakFare: "",
    payment: [],
    rating: "",
    contacts: "",
    notes: "",
    stageImage: null,
    matatuImage: null,
  },
};

export function useContribute() {
  const [mode, setMode] = useState(null);
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({ ...EMPTY_ROUTE });

  const handleModeSelect = (m) => {
    setMode(m);
    setErrors({});
    setStep(1);
    setFormData(
      m === "route"
        ? { ...EMPTY_ROUTE, matatus: [{ ...EMPTY_MATATU }] }
        : { ...INIT[m] },
    );
  };

  const handleInputChange = (e, index = null) => {
    const { name, value, checked, type } = e.target;
    if (index !== null) {
      const [, , prop] = name.split("-");
      const updated = [...formData.matatus];
      updated[index] =
        prop === "payment"
          ? {
              ...updated[index],
              payment: checked
                ? [...updated[index].payment, value]
                : updated[index].payment.filter((p) => p !== value),
            }
          : { ...updated[index], [prop]: value };
      setFormData((prev) => ({ ...prev, matatus: updated }));
    } else {
      if (type === "checkbox" && name === "payment") {
        setFormData((prev) => ({
          ...prev,
          payment: checked
            ? [...prev.payment, value]
            : prev.payment.filter((p) => p !== value),
        }));
      } else {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e, index = null) => {
    const { name, files } = e.target;
    const file = files[0] || null;
    if (index !== null) {
      const prop = name.split("-")[2];
      const updated = [...formData.matatus];
      updated[index] = { ...updated[index], [prop]: file };
      setFormData((prev) => ({ ...prev, matatus: updated }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: file }));
    }
  };

  const handleTownChange = (i, value) => {
    const u = [...formData.towns];
    u[i] = value;
    setFormData((p) => ({ ...p, towns: u }));
  };
  const addTown = () => setFormData((p) => ({ ...p, towns: [...p.towns, ""] }));
  const removeTown = (i) =>
    setFormData((p) => ({
      ...p,
      towns: p.towns.filter((_, idx) => idx !== i),
    }));

  const handleSaccoMatatuChange = (i, field, value) => {
    const u = [...formData.matatus];
    u[i] = { ...u[i], [field]: value };
    setFormData((p) => ({ ...p, matatus: u }));
  };
  const addSaccoMatatu = () =>
    setFormData((p) => ({
      ...p,
      matatus: [...p.matatus, { ...EMPTY_SACCO_MATATU }],
    }));
  const removeSaccoMatatu = (i) =>
    setFormData((p) => ({
      ...p,
      matatus: p.matatus.filter((_, idx) => idx !== i),
    }));

  const handleBulkRoadChange = (i, value) => {
    const u = [...formData.roads];
    u[i] = value;
    setFormData((p) => ({ ...p, roads: u }));
  };
  const addBulkRoad = () =>
    setFormData((p) => ({ ...p, roads: [...p.roads, ""] }));
  const removeBulkRoad = (i) =>
    setFormData((p) => ({
      ...p,
      roads: p.roads.filter((_, idx) => idx !== i),
    }));

  const handleDestChange = (i, field, value) => {
    const u = [...formData.destinations];
    u[i] = { ...u[i], [field]: value };
    setFormData((p) => ({ ...p, destinations: u }));
  };
  const addDest = () =>
    setFormData((p) => ({
      ...p,
      destinations: [...p.destinations, { ...EMPTY_DEST }],
    }));
  const removeDest = (i) =>
    setFormData((p) => ({
      ...p,
      destinations: p.destinations.filter((_, idx) => idx !== i),
    }));

  const addMatatu = () =>
    setFormData((p) => ({
      ...p,
      matatus: [...p.matatus, { ...EMPTY_MATATU }],
    }));
  const removeMatatu = (i) => {
    if (formData.matatus.length === 1) return;
    setFormData((p) => ({
      ...p,
      matatus: p.matatus.filter((_, idx) => idx !== i),
    }));
  };

  const handleAddAnother = () => {
    const currentMode = mode;
    setSubmitted(false);
    setStep(1);
    setErrors({});
    setFormData(
      currentMode === "route"
        ? { ...EMPTY_ROUTE, matatus: [{ ...EMPTY_MATATU }] }
        : { ...INIT[currentMode] },
    );
    setMode(currentMode);
  };

  const resetToSelector = () => {
    setSubmitted(false);
    setMode(null);
    setStep(1);
    setErrors({});
  };

  return {
    mode,
    step,
    submitted,
    errors,
    formData,
    setSubmitted,
    setErrors,
    handleModeSelect,
    handleInputChange,
    handleFileChange,
    handleTownChange,
    addTown,
    removeTown,
    handleSaccoMatatuChange,
    addSaccoMatatu,
    removeSaccoMatatu,
    handleBulkRoadChange,
    addBulkRoad,
    removeBulkRoad,
    handleDestChange,
    addDest,
    removeDest,
    addMatatu,
    removeMatatu,
    handleAddAnother,
    resetToSelector,
    next: () => {
      if (validate()) setStep((s) => s + 1);
    },
    back: () => {
      setErrors({});
      setStep((s) => s - 1);
    },
  };

  function validate() {
  }
}
