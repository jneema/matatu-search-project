import { CheckCircle } from "lucide-react";

const ApproveBtn = ({ onClick, approved }) =>
  approved ? (
    <span className="flex items-center gap-1 text-green-600 text-xs font-semibold">
      <CheckCircle className="w-4 h-4" /> Approved
    </span>
  ) : (
    <button
      onClick={onClick}
      className="flex items-center gap-1 px-3 py-1.5 bg-gray-900 text-white text-xs font-semibold rounded-md hover:bg-black"
    >
      <CheckCircle className="w-3.5 h-3.5" /> Approve
    </button>
  );

export default ApproveBtn;
