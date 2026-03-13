import { Trash2, PlusCircle } from "lucide-react";
import Field from "../../components/field";
import inputClass from "../../components/input-class";

const paymentOptions = ["Cash", "M-pesa", "Card"];

export const EMPTY_SACCO_MATATU = {
  matatuName: "", matatuNumber: "", destinationId: "",
  cbdStage: "", estateStage: "", peakFareInbound: "", peakFareOutbound: "",
  offPeakFare: "", payment: [], isExpress: false, isElectric: false,
  rating: "", contacts: "", notes: "",
};

const StepSacco = ({ formData, onChange, onMatatuChange, onAddMatatu, onRemoveMatatu, errors }) => (
  <div className="space-y-4">
    <div className="mb-6">
      <h2 className="text-2xl font-extrabold text-gray-900">Sacco + fleet</h2>
      <p className="text-sm text-gray-500 mt-1">Add a sacco and its matatus.</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Field label="Sacco name *" error={errors.name}>
        <input type="text" name="name" value={formData.name} onChange={onChange}
          placeholder="e.g., Super Metro" className={inputClass(errors.name)} />
      </Field>
      <Field label="Contacts">
        <input type="text" name="contacts" value={formData.contacts} onChange={onChange}
          placeholder="e.g., 0700 123 456" className={inputClass(false)} />
      </Field>
    </div>

    {formData.matatus.map((m, i) => {
      const e = errors.matatus?.[i] || {};
      return (
        <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-gray-900">
            <span className="text-xs font-bold text-white uppercase tracking-wider">Matatu {i + 1}</span>
            {formData.matatus.length > 1 && (
              <button onClick={() => onRemoveMatatu(i)} className="text-white/50 hover:text-white">
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            <Field label="Destination ID *" error={e.destinationId}>
              <input type="number" value={m.destinationId}
                onChange={(ev) => onMatatuChange(i, "destinationId", ev.target.value)}
                placeholder="e.g., 3" className={inputClass(e.destinationId)} />
            </Field>
            <Field label="Matatu name">
              <input type="text" value={m.matatuName}
                onChange={(ev) => onMatatuChange(i, "matatuName", ev.target.value)}
                placeholder="e.g., Thika Express" className={inputClass(false)} />
            </Field>
            <Field label="CBD stage *" error={e.cbdStage}>
              <input type="text" value={m.cbdStage}
                onChange={(ev) => onMatatuChange(i, "cbdStage", ev.target.value)}
                placeholder="e.g., Railways" className={inputClass(e.cbdStage)} />
            </Field>
            <Field label="Estate stage *" error={e.estateStage}>
              <input type="text" value={m.estateStage}
                onChange={(ev) => onMatatuChange(i, "estateStage", ev.target.value)}
                placeholder="e.g., TRM" className={inputClass(e.estateStage)} />
            </Field>
            <Field label="Peak fare inbound *" error={e.peakFareInbound}>
              <input type="number" value={m.peakFareInbound}
                onChange={(ev) => onMatatuChange(i, "peakFareInbound", ev.target.value)}
                placeholder="e.g., 120" className={inputClass(e.peakFareInbound)} />
            </Field>
            <Field label="Peak fare outbound *" error={e.peakFareOutbound}>
              <input type="number" value={m.peakFareOutbound}
                onChange={(ev) => onMatatuChange(i, "peakFareOutbound", ev.target.value)}
                placeholder="e.g., 100" className={inputClass(e.peakFareOutbound)} />
            </Field>
            <Field label="Off-peak fare *" error={e.offPeakFare}>
              <input type="number" value={m.offPeakFare}
                onChange={(ev) => onMatatuChange(i, "offPeakFare", ev.target.value)}
                placeholder="e.g., 80" className={inputClass(e.offPeakFare)} />
            </Field>
            <Field label="Rating (0–5)">
              <input type="number" value={m.rating} step="0.1" min="0" max="5"
                onChange={(ev) => onMatatuChange(i, "rating", ev.target.value)}
                placeholder="e.g., 4.2" className={inputClass(false)} />
            </Field>
            <div className="md:col-span-2">
              <Field label="Payment methods *" error={e.payment}>
                <div className="grid grid-cols-3 gap-2 mt-0.5">
                  {paymentOptions.map(opt => (
                    <label key={opt} className={`flex items-center gap-2 p-2.5 border rounded-md cursor-pointer hover:bg-gray-50 ${e.payment ? "border-red-400" : "border-gray-200"}`}>
                      <input type="checkbox" value={opt}
                        checked={m.payment.includes(opt)}
                        onChange={(ev) => {
                          const updated = ev.target.checked
                            ? [...m.payment, opt]
                            : m.payment.filter(p => p !== opt);
                          onMatatuChange(i, "payment", updated);
                        }}
                        className="w-4 h-4 text-green-600 rounded" />
                      <span className="text-sm font-medium text-gray-700">{opt}</span>
                    </label>
                  ))}
                </div>
              </Field>
            </div>
          </div>
        </div>
      );
    })}

    <button onClick={onAddMatatu}
      className="w-full flex items-center justify-center gap-2 py-2.5 border border-dashed border-gray-300 rounded-md text-sm font-medium text-gray-500 hover:border-green-600 hover:text-green-700 transition-colors">
      <PlusCircle className="h-4 w-4" /> Add matatu
    </button>
  </div>
);

export default StepSacco;