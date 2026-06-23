import { IoCheckmarkCircleOutline } from "react-icons/io5";

const ApproveBtn = ({ onClick, approved }) =>
  approved ? (
    <span className="flex items-center gap-1 text-green-600 text-xs font-semibold">
      <IoCheckmarkCircleOutline className="w-4 h-4" /> Approved
    </span>
  ) : (
    <button
      onClick={onClick}
      className="flex items-center gap-1 px-3 py-1.5 bg-gray-900 text-white text-xs font-semibold rounded-md hover:bg-black cursor-pointer"
    >
      <IoCheckmarkCircleOutline className="w-3.5 h-3.5" /> Approve
    </button>
  );

export default ApproveBtn;
