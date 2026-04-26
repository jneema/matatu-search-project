import React, { useState } from "react";
import ContributeFooter from "../../components/contribute/footer";
import ContributeHeader from "../../components/contribute/header";
import ModeSelector from "./mode-selector";
import { useContribute } from "../../hooks/useContribute";
import { ROUTE_STEPS } from "../../constants";
import AddStage from "./add-stage";
import AddSacco from "./add-sacco";
import AddRoute from "./add-route";
import { CheckCircle, PlusCircle, ArrowLeft } from "lucide-react";

const SUCCESS_CONFIG = {
  stage: {
    title: "Stage added!",
    body: (name) => `${name} has been submitted for review.`,
    prompt: "Do you know another stage? Help us grow the map.",
    cta: "Add another stage",
  },
  sacco: {
    title: "Sacco added!",
    body: (name) => `${name} has been submitted for review.`,
    prompt: "Do you know another sacco to add?",
    cta: "Add another sacco",
  },
  route: {
    title: "Route added!",
    body: () => "The route has been submitted for review.",
    prompt: "Do you know another route to add?",
    cta: "Add another route",
  },
};

const Contribute = () => {
  const { mode, submitted, selectMode, reset, onSuccess, addAnother } =
    useContribute();
  const [lastSubmittedName, setLastSubmittedName] = useState(null);

  const handleSuccess = (name = null) => {
    setLastSubmittedName(name);
    onSuccess();
  };

  const config = SUCCESS_CONFIG[mode];

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
          {submitted && config ? (
            <div className="text-center py-16 space-y-6">
              <div className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center">
                  <CheckCircle className="w-7 h-7 text-green-600" />
                </div>
                <h2 className="text-2xl font-extrabold text-gray-900">
                  {config.title}
                </h2>
                <p className="text-gray-500 text-sm">
                  {lastSubmittedName
                    ? config.body(lastSubmittedName)
                    : config.body("")}
                </p>
              </div>

              <p className="text-gray-600 text-sm">{config.prompt}</p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => {
                    addAnother();
                    setLastSubmittedName(null);
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-md text-sm font-semibold hover:bg-black"
                >
                  <PlusCircle className="h-4 w-4" /> {config.cta}
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
              {mode === "stage" && (
                <AddStage onSubmitSuccess={(name) => handleSuccess(name)} />
              )}
              {mode === "sacco" && (
                <AddSacco onSuccess={(name) => handleSuccess(name)} />
              )}
              {mode === "route" && (
                <AddRoute onSuccess={() => handleSuccess()} />
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
