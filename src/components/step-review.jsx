import { MapPin, Bus } from "lucide-react";

const ReviewRow = ({ label, value }) => (
  <div className="flex justify-between items-start py-2.5 border-b border-gray-100 last:border-0">
    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider w-36 flex-shrink-0">
      {label}
    </span>
    <span className="text-sm font-medium text-gray-800 text-right">
      {value || <span className="text-gray-300 italic">—</span>}
    </span>
  </div>
);

const StepReview = ({ formData }) => (
  <div className="space-y-5">
    <div className="mb-6">
      <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
        Review & Submit
      </h2>
      <p className="text-sm text-gray-500 mt-1">
        Double-check everything before submitting.
      </p>
    </div>

    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 bg-green-600">
        <MapPin className="h-3.5 w-3.5 text-white" />
        <span className="text-xs font-bold text-white uppercase tracking-wider">
          Route
        </span>
      </div>
      <div className="px-4 pt-1 pb-2">
        <ReviewRow label="Town" value={formData.town} />
        <ReviewRow label="Road" value={formData.road} />
        <ReviewRow label="Destination" value={formData.destination} />
        <ReviewRow label="Departure" value={formData.departure} />
        <ReviewRow label="Distance" value={formData.distance} />
      </div>
    </div>

    {formData.matatus.map((m, i) => (
      <div
        key={i}
        className="border border-gray-200 rounded-lg overflow-hidden"
      >
        <div className="flex items-center gap-2 px-4 py-3 bg-gray-900">
          <Bus className="h-3.5 w-3.5 text-white" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            Matatu {i + 1}
          </span>
        </div>
        <div className="px-4 pt-1 pb-2">
          <ReviewRow label="Sacco" value={m.saccoName} />
          <ReviewRow label="Name" value={m.matatuName} />
          <ReviewRow label="Number" value={m.matatuNumber} />
          <ReviewRow label="Stage (dest)" value={m.stageLocationDestination} />
          <ReviewRow label="Stage (dept)" value={m.stageLocationDeparture} />
          <ReviewRow
            label="Peak Fare"
            value={m.peakFare ? `KES ${m.peakFare}` : ""}
          />
          <ReviewRow
            label="Off-Peak Fare"
            value={m.offPeakFare ? `KES ${m.offPeakFare}` : ""}
          />
          <ReviewRow label="Type" value={m.type} />
          <ReviewRow label="Rating" value={m.rating} />
          <ReviewRow label="Drop Offs" value={m.dropoffs} />
          <ReviewRow label="Payment" value={m.payment.join(", ")} />
          <ReviewRow label="Contacts" value={m.contacts} />
        </div>
      </div>
    ))}

    {formData.comments && (
      <div className="border border-gray-200 rounded-lg p-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
          Comments
        </p>
        <p className="text-sm text-gray-700">{formData.comments}</p>
      </div>
    )}
  </div>
);

export default StepReview;
