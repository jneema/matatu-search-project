import React from "react";
import ContributeFooter from "../../components/contribute/footer";
import ContributeHeader from "../../components/contribute/header";
import ContributeSuccess from "../../components/success";
import ModeSelector from "./mode-selector";
import { ROUTE_STEPS } from "../../constants";
import { useContribute } from "../../hooks/useContribute";

import StepRoute from "./step-route";
import StepMatatus from "./step-matatus";
import StepReview from "../../components/step-review";
import StepSacco from "./step-sacco";
import AddStage from "./add-stage";

const Contribute = () => {
  const { mode, submitted, selectMode, reset, onSuccess, addAnother } =
    useContribute();

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
          {submitted ? (
            <ContributeSuccess
              mode={mode}
              onAddAnother={addAnother}
              onChangeType={reset}
            />
          ) : !mode ? (
            <ModeSelector onSelect={selectMode} />
          ) : (
            <>
              {mode === "route" && <StepRoute onSuccess={onSuccess} />}
              {mode === "sacco" && <StepSacco onSuccess={onSuccess} />}
              {mode === "stage" && <AddStage onSuccess={onSuccess} />}
            </>
          )}
        </div>
      </main>
      <ContributeFooter />
    </div>
  );
};

export default Contribute;
