import { Bus, Trash2, PlusCircle } from "lucide-react";
import Field from "../../components/field";
import inputClass from "../../components/input-class";

const matatuTypes = ["Standard", "Express"];
const paymentOptions = ["Cash", "M-pesa", "Card"];

const StepMatatus = ({
  formData,
  handleInputChange,
  addMatatu,
  removeMatatu,
  errors,
}) => (
  <div className="space-y-4">
    <div className="mb-6">
      <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
        Matatu Details
      </h2>
      <p className="text-sm text-gray-500 mt-1">
        Add one or more matatus that operate on this route.
      </p>
    </div>

    {formData.matatus.map((matatu, index) => {
      const e = errors[index] || {};
      return (
        <div
          key={index}
          className="border border-gray-200 rounded-lg overflow-hidden"
        >
          {/* Card header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gray-900">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-white/10 flex items-center justify-center">
                <Bus className="h-3.5 w-3.5 text-white" />
              </div>
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Matatu {index + 1}
              </span>
            </div>
            {formData.matatus.length > 1 && (
              <button
                onClick={() => removeMatatu(index)}
                className="p-1 text-white/50 hover:text-white transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            <Field label="Sacco Name *" error={e.saccoName}>
              <input
                type="text"
                name={`matatu-${index}-saccoName`}
                value={matatu.saccoName}
                onChange={(e) => handleInputChange(e, index)}
                placeholder="e.g., Super Metro"
                className={inputClass(errors[index]?.saccoName)}
              />
            </Field>

            <Field label="Matatu Name *" error={e.matatuName}>
              <input
                type="text"
                name={`matatu-${index}-matatuName`}
                value={matatu.matatuName}
                onChange={(e) => handleInputChange(e, index)}
                placeholder="e.g., Thika Express"
                className={inputClass(errors[index]?.matatuName)}
              />
            </Field>

            <Field label="Matatu Number">
              <input
                type="text"
                name={`matatu-${index}-matatuNumber`}
                value={matatu.matatuNumber}
                onChange={(e) => handleInputChange(e, index)}
                placeholder="e.g., KCB 123A"
                className={inputClass(false)}
              />
            </Field>

            <Field
              label="Stage at Destination *"
              error={e.stageLocationDestination}
            >
              <input
                type="text"
                name={`matatu-${index}-stageLocationDestination`}
                value={matatu.stageLocationDestination}
                onChange={(e) => handleInputChange(e, index)}
                placeholder="e.g., TRM"
                className={inputClass(errors[index]?.stageLocationDestination)}
              />
            </Field>

            <Field label="Stage at Departure">
              <input
                type="text"
                name={`matatu-${index}-stageLocationDeparture`}
                value={matatu.stageLocationDeparture}
                onChange={(e) => handleInputChange(e, index)}
                placeholder="e.g., Railways"
                className={inputClass(false)}
              />
            </Field>

            <Field label="Contacts">
              <input
                type="text"
                name={`matatu-${index}-contacts`}
                value={matatu.contacts}
                onChange={(e) => handleInputChange(e, index)}
                placeholder="e.g., 0700 123 456"
                className={inputClass(false)}
              />
            </Field>

            <Field label="Peak Fare (KES) *" error={e.peakFare}>
              <input
                type="number"
                name={`matatu-${index}-peakFare`}
                value={matatu.peakFare}
                onChange={(e) => handleInputChange(e, index)}
                placeholder="e.g., 120"
                className={inputClass(errors[index]?.peakFare)}
              />
            </Field>

            <Field label="Off-Peak Fare (KES) *" error={e.offPeakFare}>
              <input
                type="number"
                name={`matatu-${index}-offPeakFare`}
                value={matatu.offPeakFare}
                onChange={(e) => handleInputChange(e, index)}
                placeholder="e.g., 100"
                className={inputClass(errors[index]?.offPeakFare)}
              />
            </Field>

            <Field label="Type *" error={e.type}>
              <select
                name={`matatu-${index}-type`}
                value={matatu.type}
                onChange={(e) => handleInputChange(e, index)}
                className={inputClass(errors[index]?.type)}
              >
                <option value="" disabled>
                  Select type
                </option>
                {matatuTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Rating (0–5)">
              <input
                type="number"
                name={`matatu-${index}-rating`}
                value={matatu.rating}
                onChange={(e) => handleInputChange(e, index)}
                placeholder="e.g., 4.2"
                step="0.1"
                min="0"
                max="5"
                className={inputClass(false)}
              />
            </Field>

            <div className="md:col-span-2">
              <Field label="Drop Off Points *" error={e.dropoffs}>
                <input
                  type="text"
                  name={`matatu-${index}-dropoffs`}
                  value={matatu.dropoffs}
                  onChange={(e) => handleInputChange(e, index)}
                  placeholder="e.g., Muthaiga, Allsops, Roasters"
                  className={inputClass(errors[index]?.dropoffs)}
                />
              </Field>
            </div>

            <div className="md:col-span-2">
              <Field label="Payment Methods *" error={e.payment}>
                <div className="grid grid-cols-3 gap-2 mt-0.5">
                  {paymentOptions.map((option) => (
                    <label
                      key={option}
                      className={`flex items-center gap-2 p-2.5 border rounded-md hover:bg-gray-50 transition-colors cursor-pointer ${
                        errors[index]?.payment
                          ? "border-red-400"
                          : "border-gray-200"
                      }`}
                    >
                      <input
                        type="checkbox"
                        name={`matatu-${index}-payment`}
                        value={option}
                        checked={matatu.payment.includes(option)}
                        onChange={(e) => handleInputChange(e, index)}
                        className="w-4 h-4 text-green-600 rounded focus:ring-green-600"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
              </Field>
            </div>
          </div>
        </div>
      );
    })}

    <button
      onClick={addMatatu}
      className="w-full flex items-center justify-center gap-2 py-2.5 border border-dashed border-gray-300 rounded-md text-sm font-medium text-gray-500 hover:border-green-600 hover:text-green-700 transition-colors"
    >
      <PlusCircle className="h-4 w-4" /> Add Another Matatu
    </button>

    <Field label="Additional Comments">
      <textarea
        name="comments"
        value={formData.comments}
        onChange={handleInputChange}
        rows={3}
        placeholder="Any other updates, observations, or helpful information..."
        className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 resize-none transition-colors"
      />
    </Field>
  </div>
);

export default StepMatatus;
