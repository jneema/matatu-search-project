import React from "react";
import {
  IoBusOutline,
  IoCheckmarkCircleOutline,
  IoArrowBackOutline,
  IoCloseOutline,
} from "react-icons/io5";
import { useNavigate } from "react-router";

function ContributeHeader({ submitted, STEPS, step, mode, onBack }) {
  const navigate = useNavigate();

  const subtitle = {
    route: "Full route",
    sacco: "Sacco",
    stage: "Stage",
  };

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col">
            <button
              onClick={() => navigate("/")}
              className="flex items-start gap-2 hover:opacity-80 transition-opacity cursor-pointer"
            >
              <IoBusOutline className="h-6 w-6 md:h-8 md:w-8 text-green-600 shrink-0" />
              <h1 className="text-lg md:text-xl font-bold text-gray-800 leading-none">
                Contribute
              </h1>
            </button>
            <p className="text-xs text-gray-400 leading-none pl-8 md:pl-10 -mt-1 md:-mt-2.5">
              {mode ? subtitle[mode] : "Choose what to add"}
            </p>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={mode && !submitted ? onBack : () => navigate("/")}
              className="p-2 hover:bg-gray-100 rounded-md transition-colors cursor-pointer"
              title={mode && !submitted ? "Back to mode select" : "Back to app"}
            >
              <IoCloseOutline className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>

        {!submitted && STEPS.length > 0 && (
          <>
            <div className="hidden md:flex items-center">
              {STEPS.map((s, i) => (
                <React.Fragment key={s.id}>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                        step === s.id
                          ? "bg-green-600 text-white"
                          : step > s.id
                            ? "bg-gray-900 text-white"
                            : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {step > s.id ? (
                        <IoCheckmarkCircleOutline className="h-4 w-4" />
                      ) : (
                        s.id
                      )}
                    </div>
                    <span
                      className={`font-medium text-sm transition-colors ${
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
                      className={`flex-1 h-px mx-4 transition-colors ${step > s.id ? "bg-gray-900" : "bg-gray-200"}`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className="md:hidden flex items-center justify-center gap-2">
              {STEPS.map((s, i) => (
                <React.Fragment key={s.id}>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                      step === s.id
                        ? "bg-green-600 text-white"
                        : step > s.id
                          ? "bg-gray-900 text-white"
                          : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {step > s.id ? (
                      <IoCheckmarkCircleOutline className="h-4 w-4" />
                    ) : (
                      s.id
                    )}
                  </div>
                  {i < STEPS.length - 1 && (
                    <div
                      className={`flex-1 h-px transition-colors ${step > s.id ? "bg-gray-900" : "bg-gray-200"}`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </>
        )}
      </div>
    </header>
  );
}

export default ContributeHeader;
