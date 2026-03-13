import { CheckCircle, PlusCircle, Home, SlidersHorizontal } from "lucide-react";
import { useNavigate } from "react-router";
import { modeLabels, modeSuccess } from "../constants";

const SuccessPill = ({ mode, formData }) => {
  const detail =
    mode === "route" || mode === "destination" || mode === "road"
      ? formData.road
      : mode === "town" || mode === "sacco"
        ? formData.name
        : mode === "matatu"
          ? formData.saccoName
          : mode === "bulk-roads"
            ? `${formData.roads?.length ?? 0} roads`
            : mode === "bulk-destinations"
              ? `${formData.destinations?.length ?? 0} destinations`
              : mode === "bulk-towns"
                ? `${formData.towns?.length ?? 0} towns`
                : null;

  const dest =
    mode === "route" || mode === "destination" ? formData.destination : null;

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full flex-wrap justify-center">
      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        {modeLabels[mode]}
      </span>
      {detail && (
        <>
          <span className="text-gray-300">·</span>
          <span className="text-xs text-gray-600">{detail}</span>
        </>
      )}
      {dest && (
        <>
          <span className="text-gray-300">·</span>
          <span className="text-xs text-gray-600">{dest}</span>
        </>
      )}
    </div>
  );
};

const ContributeSuccess = ({ mode, formData, onAddAnother, onChangeType }) => {
  const navigate = useNavigate();
  const { title, message } = modeSuccess[mode] ?? {
    title: "Submitted!",
    message: "Your data has been received.",
  };

  return (
    <div className="border border-gray-200 rounded-lg p-12 flex flex-col items-center text-center gap-5">
      <div className="w-14 h-14 bg-green-600 rounded-md flex items-center justify-center">
        <CheckCircle className="h-7 w-7 text-white" />
      </div>
      <div className="flex flex-col gap-1.5">
        <p className="text-xl font-bold text-gray-900">{title}</p>
        <p className="text-sm text-gray-500 max-w-xs mx-auto">{message}</p>
      </div>
      <SuccessPill mode={mode} formData={formData} />
      <div className="flex flex-col gap-3 w-full max-w-xs">
        <button
          onClick={onAddAnother}
          className="w-full flex items-center justify-center gap-2 py-2.5 bg-green-600 text-white rounded-md text-sm font-semibold hover:bg-green-700 transition-colors"
        >
          <PlusCircle className="h-4 w-4" /> Add Another {modeLabels[mode]}
        </button>
        <div className="flex gap-2">
          <button
            onClick={onChangeType}
            className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium text-gray-500 hover:text-gray-800 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" /> Change type
          </button>
          <button
            onClick={() => navigate("/")}
            className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium text-gray-500 hover:text-gray-800 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
          >
            <Home className="h-3.5 w-3.5" /> Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContributeSuccess;
