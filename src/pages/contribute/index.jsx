import React, { useState } from "react";
import ContributeFooter from "../../components/contribute/footer";
import ContributeHeader from "../../components/contribute/header";
import ModeSelector from "./mode-selector";
import { useContribute } from "../../hooks/useContribute";
import { ROUTE_STEPS } from "../../constants";
import StepRoute from "./step-route";
import StepSacco from "./step-sacco";
import AddStage from "./add-stage";
import { CheckCircle, PlusCircle, ArrowLeft } from "lucide-react";
import AddSacco from "./add-sacco";

const Contribute = () => {
  const { mode, submitted, selectMode, reset, onSuccess, addAnother } =
    useContribute();
  const [lastSubmittedName, setLastSubmittedName] = useState(null);

  const handleStageSuccess = (name) => {
    setLastSubmittedName(name);
    onSuccess();
  };

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      <ContributeHeader
        submitted={submitted}
        STEPS={mode === "route" ? ROUTE_STEPS : []}
        mode={mode}
        onBack={reset}
      />
      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {submitted && mode === "stage" ? (
            <div className="text-center py-16 space-y-6">
              <div className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center">
                  <CheckCircle className="w-7 h-7 text-green-600" />
                </div>
                <h2 className="text-2xl font-extrabold text-gray-900">
                  Stage added!
                </h2>
                {lastSubmittedName && (
                  <p className="text-gray-500 text-sm">
                    <span className="font-semibold text-gray-700">
                      {lastSubmittedName}
                    </span>{" "}
                    has been submitted for review.
                  </p>
                )}
              </div>

              <p className="text-gray-600 text-sm">
                Do you know another stage? Help us grow the map.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => {
                    addAnother();
                    setLastSubmittedName(null);
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-md text-sm font-semibold hover:bg-black"
                >
                  <PlusCircle className="h-4 w-4" /> Add another stage
                </button>
                <button
                  onClick={() => {
                    reset();
                    setLastSubmittedName(null);
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 rounded-md text-sm font-semibold text-gray-600 hover:bg-gray-50"
                >
                  <ArrowLeft className="h-4 w-4" /> Back to menu
                </button>
              </div>
            </div>
          ) : !mode ? (
            <ModeSelector onSelect={selectMode} />
          ) : (
            <>
              {mode === "route" && <StepRoute onSuccess={onSuccess} />}
              {mode === "sacco" && <AddSacco onSuccess={onSuccess} />}
              {mode === "stage" && (
                <AddStage onSuccess={handleStageSuccess} />
              )}
            </>
          )}
        </div>
      </main>
      <ContributeFooter />
    </div>
  );
};

export default Contribute;
