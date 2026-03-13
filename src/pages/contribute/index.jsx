import React from "react";
import { ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import ContributeFooter from "../../components/contribute/footer";
import ContributeHeader from "../../components/contribute/header";
import ContributeSuccess from "../../components/success";
import ModeSelector from "./mode-selector";
import { useContribute } from "../../hooks/useContribute";
import { submitContribution } from "../../hooks/submit";
import { ROUTE_STEPS } from "../../constants";

import StepRoute from "./step-route";
import StepMatatus from "./step-matatus";
import StepReview from "../../components/step-review";
import StepTown from "./step-town";
import StepBulkTowns from "./step-bulk-towns";
import StepRoad from "./step-road";
import StepBulkRoads from "./step-bulk-roads";
import StepDestination from "./step-destination";
import StepBulkDestinations from "./step-bulk-destinations";
import StepSacco from "./step-sacco";
import StepSingleMatatu from "./step-single-matatu";

const Contribute = () => {
  const c = useContribute();
  const isMultiStep = c.mode === "route";
  const isFinalStep = !isMultiStep || c.step === ROUTE_STEPS.length;

  const submit = async () => {
    try {
      await submitContribution(c.mode, c.formData);
      c.setSubmitted(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      <ContributeHeader
        submitted={c.submitted}
        STEPS={isMultiStep ? ROUTE_STEPS : []}
        step={c.step}
        mode={c.mode}
        onBack={c.resetToSelector}
      />
      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {c.submitted ? (
            <ContributeSuccess
              mode={c.mode}
              formData={c.formData}
              onAddAnother={c.handleAddAnother}
              onChangeType={c.resetToSelector}
            />
          ) : !c.mode ? (
            <ModeSelector onSelect={c.handleModeSelect} />
          ) : (
            <>
              {c.mode === "route" && c.step === 1 && (
                <StepRoute
                  formData={c.formData}
                  handleInputChange={c.handleInputChange}
                  errors={c.errors}
                />
              )}
              {c.mode === "route" && c.step === 2 && (
                <StepMatatus
                  formData={c.formData}
                  handleInputChange={c.handleInputChange}
                  handleFileChange={(e, i) => c.handleFileChange(e, i)}
                  addMatatu={c.addMatatu}
                  removeMatatu={c.removeMatatu}
                  errors={c.errors}
                />
              )}
              {c.mode === "route" && c.step === 3 && (
                <StepReview formData={c.formData} />
              )}
              {c.mode === "town" && (
                <StepTown
                  formData={c.formData}
                  onChange={c.handleInputChange}
                  errors={c.errors}
                />
              )}
              {c.mode === "bulk-towns" && (
                <StepBulkTowns
                  formData={c.formData}
                  onTownChange={c.handleTownChange}
                  onAddTown={c.addTown}
                  onRemoveTown={c.removeTown}
                  errors={c.errors}
                />
              )}
              {c.mode === "road" && (
                <StepRoad
                  formData={c.formData}
                  onChange={c.handleInputChange}
                  errors={c.errors}
                />
              )}
              {c.mode === "bulk-roads" && (
                <StepBulkRoads
                  formData={c.formData}
                  onChange={c.handleInputChange}
                  onAddRow={c.handleBulkRoadChange}
                  onRemoveRow={c.removeBulkRoad}
                  onAddRoad={c.addBulkRoad}
                  errors={c.errors}
                />
              )}
              {c.mode === "destination" && (
                <StepDestination
                  formData={c.formData}
                  onChange={c.handleInputChange}
                  errors={c.errors}
                />
              )}
              {c.mode === "bulk-destinations" && (
                <StepBulkDestinations
                  formData={c.formData}
                  onDestChange={c.handleDestChange}
                  onAddDest={c.addDest}
                  onRemoveDest={c.removeDest}
                  errors={c.errors}
                />
              )}
              {c.mode === "sacco" && (
                <StepSacco
                  formData={c.formData}
                  onChange={c.handleInputChange}
                  onMatatuChange={c.handleSaccoMatatuChange}
                  onAddMatatu={c.addSaccoMatatu}
                  onRemoveMatatu={c.removeSaccoMatatu}
                  errors={c.errors}
                />
              )}
              {c.mode === "matatu" && (
                <StepSingleMatatu
                  formData={c.formData}
                  onChange={c.handleInputChange}
                  onFileChange={c.handleFileChange}
                  errors={c.errors}
                />
              )}

              <div className="flex items-center justify-end mt-8 pt-5">
                <div className="flex gap-3">
                  {isMultiStep && c.step > 1 && (
                    <button
                      onClick={c.back}
                      className="flex items-center gap-1.5 px-4 py-2.5 border border-gray-200 rounded-md text-sm font-semibold text-gray-600 hover:bg-gray-50"
                    >
                      <ArrowLeft className="h-4 w-4" /> Back
                    </button>
                  )}
                  {!isFinalStep ? (
                    <button
                      onClick={c.next}
                      className="flex items-center gap-1.5 px-5 py-2.5 bg-green-600 text-white rounded-md text-sm font-semibold hover:bg-green-700"
                    >
                      Next <ArrowRight className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      onClick={submit}
                      className="flex items-center gap-1.5 px-5 py-2.5 bg-gray-900 text-white rounded-md text-sm font-semibold hover:bg-black"
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
      <ContributeFooter />
    </div>
  );
};

export default Contribute;
