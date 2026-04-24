import React from "react";
import { ArrowRight, ChevronRight } from "lucide-react";

const DirectionView = ({
  setCurrentView,
  setSelectedDirection,
  selectedTown,
}) => {
  const handleSelect = (direction) => {
    setSelectedDirection(direction);
    setCurrentView("starting-point");
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-16">
        <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6">
          <button
            onClick={() => setCurrentView("landing")}
            className="hover:text-green-600 transition-colors"
          >
            Home
          </button>
          <ChevronRight className="h-3 w-3" />
          <span className="text-gray-400">{selectedTown?.name}</span>
          <ChevronRight className="h-3 w-3" />
          <span className="text-green-600">Direction</span>
        </nav>

        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
            Which way are you travelling?
          </h2>
          <p className="text-base md:text-lg text-gray-500">
            This helps us show you the right stages and routes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
          <button
            onClick={() => handleSelect("inbound")}
            className="group p-6 md:p-8 bg-white border-2 border-gray-200 rounded-xl hover:border-green-600 hover:shadow-sm transition-all text-left"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 bg-green-600 group-hover:bg-green-700 rounded-lg flex items-center justify-center transition-colors shrink-0">
                <ArrowRight className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-extrabold text-gray-900">Into CBD</h3>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Travelling from the outskirts towards the city centre.
            </p>
            <div className="mt-4 flex items-center gap-1 text-green-600 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
              Select <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </button>

          <button
            onClick={() => handleSelect("outbound")}
            className="group p-6 md:p-8 bg-white border-2 border-gray-200 rounded-xl hover:border-black hover:shadow-sm transition-all text-left"
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-extrabold text-gray-900">
                Out of CBD
              </h3>
              <div className="w-12 h-12 bg-gray-900 group-hover:bg-black rounded-lg flex items-center justify-center rotate-180 transition-colors shrink-0">
                <ArrowRight className="h-6 w-6 text-white" />
              </div>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Travelling from the city centre back to your neighbourhood.
            </p>
            <div className="mt-4 flex items-center gap-1 text-gray-900 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
              Select <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DirectionView;
