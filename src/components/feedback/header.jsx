import React from "react";
import { Route, CheckCircle, X } from "lucide-react";
import { useNavigate } from "react-router";

function Header({ submitted, STEPS, step }) {
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-4">
        {/* Top row — logo + close */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Route className="h-6 w-6 md:h-8 md:w-8 text-green-600" />
            <div>
              <h1 className="text-lg md:text-xl font-bold text-gray-800 leading-none">
                Matatu Finder
              </h1>
              <p className="text-xs text-gray-400 mt-0.5 hidden sm:block">
                Submit Route Info
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate("/")}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
            title="Back to app"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Step indicator */}
        {!submitted && (
          <>
            {/* Desktop — labeled steps */}
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

            {/* Mobile — dot steps */}
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

export default Header;
