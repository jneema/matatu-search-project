import React from "react";
import { Route, CheckCircle, ArrowLeft, X } from "lucide-react";
import { useNavigate } from "react-router";

function ContributeHeader({ submitted, STEPS, step, mode, onBack }) {
  const navigate = useNavigate();

  const subtitle = {
    route: "Full route + matatus",
    destination: "Destination only",
    sacco: "Sacco + fleet",
    matatu: "Single matatu",
    road: "Add a road",
    "bulk-roads": "Bulk roads",
    "bulk-destinations": "Bulk destinations",
    town: "Add a town",
    "bulk-towns": "Bulk towns",
  };

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-4">
        {/* Top row */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Route className="h-6 w-6 md:h-8 md:w-8 text-green-600" />
            <div>
              <h1 className="text-lg md:text-xl font-bold text-gray-800 leading-none">
                Contribute
              </h1>
              <p className="text-xs text-gray-400 mt-0.5 hidden sm:block">
                {mode ? subtitle[mode] : "Choose what to add"}
              </p>
            </div>
          </button>

          <div className="flex items-center gap-1">
            <button
              onClick={mode && !submitted ? onBack : () => navigate("/")}
              className="p-2 hover:bg-gray-100 rounded-md transition-colors"
              title={mode && !submitted ? "Back to mode select" : "Back to app"}
            >
              <X className="h-5 w-5 text-gray-500" />
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
                      {step > s.id ? <CheckCircle className="h-4 w-4" /> : s.id}
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
                    {step > s.id ? <CheckCircle className="h-4 w-4" /> : s.id}
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
