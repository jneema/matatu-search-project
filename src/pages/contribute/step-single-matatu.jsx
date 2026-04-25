import Field from "../../components/field";
import inputClass from "../../components/input-class";

const paymentOptions = ["Cash", "M-pesa", "Card"];

const StepSingleMatatu = ({ formData, onChange, onFileChange, errors }) => (
  <div className="space-y-4">
    <div className="mb-6">
      <h2 className="text-2xl font-extrabold text-gray-900">Single matatu</h2>
      <p className="text-sm text-gray-500 mt-1">
        Add one vehicle with optional images.
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Field label="Sacco name *" error={errors.saccoName}>
        <input
          type="text"
          name="saccoName"
          value={formData.saccoName}
          onChange={onChange}
          placeholder="e.g., Super Metro"
          className={inputClass(errors.saccoName)}
        />
      </Field>
      <Field label="Destination ID *" error={errors.destinationId}>
        <input
          type="number"
          name="destinationId"
          value={formData.destinationId}
          onChange={onChange}
          placeholder="e.g., 3"
          className={inputClass(errors.destinationId)}
        />
      </Field>
      <Field label="Matatu name">
        <input
          type="text"
          name="matatuName"
          value={formData.matatuName}
          onChange={onChange}
          placeholder="e.g., Thika Express"
          className={inputClass(false)}
        />
      </Field>
      <Field label="Matatu number">
        <input
          type="text"
          name="matatuNumber"
          value={formData.matatuNumber}
          onChange={onChange}
          placeholder="e.g., KCB 123A"
          className={inputClass(false)}
        />
      </Field>
      <Field label="CBD stage *" error={errors.cbdStage}>
        <input
          type="text"
          name="cbdStage"
          value={formData.cbdStage}
          onChange={onChange}
          placeholder="e.g., Railways"
          className={inputClass(errors.cbdStage)}
        />
      </Field>
      <Field label="Estate stage *" error={errors.estateStage}>
        <input
          type="text"
          name="estateStage"
          value={formData.estateStage}
          onChange={onChange}
          placeholder="e.g., TRM"
          className={inputClass(errors.estateStage)}
        />
      </Field>
      <Field label="Peak fare inbound *" error={errors.peakFareInbound}>
        <input
          type="number"
          name="peakFareInbound"
          value={formData.peakFareInbound}
          onChange={onChange}
          placeholder="120"
          className={inputClass(errors.peakFareInbound)}
        />
      </Field>
      <Field label="Peak fare outbound *" error={errors.peakFareOutbound}>
        <input
          type="number"
          name="peakFareOutbound"
          value={formData.peakFareOutbound}
          onChange={onChange}
          placeholder="100"
          className={inputClass(errors.peakFareOutbound)}
        />
      </Field>
      <Field label="Off-peak fare *" error={errors.offPeakFare}>
        <input
          type="number"
          name="offPeakFare"
          value={formData.offPeakFare}
          onChange={onChange}
          placeholder="80"
          className={inputClass(errors.offPeakFare)}
        />
      </Field>
      <Field label="Rating (0–5)">
        <input
          type="number"
          name="rating"
          value={formData.rating}
          step="0.1"
          min="0"
          max="5"
          onChange={onChange}
          placeholder="4.2"
          className={inputClass(false)}
        />
      </Field>
      <Field label="Stage image">
        <input
          type="file"
          accept="image/*"
          name="stageImage"
          onChange={onFileChange}
          className="w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-900 file:text-white hover:file:bg-black"
        />
        {formData.stageImage && (
          <p className="text-xs text-green-600 mt-1">
            ✓ {formData.stageImage.name}
          </p>
        )}
      </Field>
      <Field label="Matatu image">
        <input
          type="file"
          accept="image/*"
          name="matatuImage"
          onChange={onFileChange}
          className="w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-900 file:text-white hover:file:bg-black"
        />
        {formData.matatuImage && (
          <p className="text-xs text-green-600 mt-1">
            ✓ {formData.matatuImage.name}
          </p>
        )}
      </Field>
      <div className="md:col-span-2">
        <Field label="Payment methods *" error={errors.payment}>
          <div className="grid grid-cols-3 gap-2 mt-0.5">
            {paymentOptions.map((opt) => (
              <label
                key={opt}
                className={`flex items-center gap-2 p-2.5 border rounded-md cursor-pointer hover:bg-gray-50 ${errors.payment ? "border-red-400" : "border-gray-200"}`}
              >
                <input
                  type="checkbox"
                  value={opt}
                  checked={formData.payment.includes(opt)}
                  onChange={(e) =>
                    onChange({
                      target: {
                        name: "payment",
                        value: opt,
                        checked: e.target.checked,
                        type: "checkbox",
                      },
                    })
                  }
                  className="w-4 h-4 text-green-600 rounded"
                />
                <span className="text-sm font-medium text-gray-700">{opt}</span>
              </label>
            ))}
          </div>
        </Field>
      </div>
    </div>
  </div>
);

export default StepSingleMatatu;
