import { useState } from "react";
import { TAG_STYLES } from "../constants";
import {
  AlertTriangle,
  ArrowRight,
  BookmarkCheck,
  BookmarkPlus,
  Bus,
  ChevronDown,
  ChevronUp,
  Clock,
  Dot,
  MapPin,
  Star,
  Users,
} from "lucide-react";
import { FareTypePill } from "./fare-type-pill";
import { DetailRow } from "./detail-row";

export const RouteCard = ({
  option,
  isSaved,
  onToggleSave,
  onStartTrip,
  defaultExpanded,
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);

  const showDataWarning =
    parseFloat(option.data_confidence) < 0.8 ||
    option.tags?.includes("DATA_UNVERIFIED");

  const vehicleLabel = option.vehicle_type?.replace(/_/g, " ") ?? null;

  const locationHint = option.is_transfer
    ? (option.via ?? option.transfer_detail?.transfer_stage ?? null)
    : (option.terminus_area ?? null);

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 transition-colors">
      <div className="px-4 py-3.5">
        <div className="grid grid-cols-[24px_1fr_auto] gap-x-2 items-center mb-2">
          <div className="flex flex-wrap gap-1">
            {option.tags?.map((tag) => (
              <span
                key={tag}
                className={`text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 border rounded ${TAG_STYLES[tag] ?? "bg-gray-50 text-gray-500 border-gray-200"}`}
              >
                {tag.replace(/_/g, " ")}
              </span>
            ))}
          </div>
          <div />

          <button
            onClick={onToggleSave}
            aria-label={isSaved ? "Remove saved route" : "Save route"}
            className={`p-1.5 rounded-lg border transition-colors ${
              isSaved
                ? "bg-green-600 border-green-600 text-white"
                : "bg-white border-gray-200 text-gray-300 hover:border-green-400 hover:text-green-500"
            }`}
          >
            {isSaved ? (
              <BookmarkCheck className="h-3.5 w-3.5" />
            ) : (
              <BookmarkPlus className="h-3.5 w-3.5" />
            )}
          </button>
        </div>

        <div className="grid grid-cols-[auto_1fr] gap-x-2 items-center mb-0.5">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-6 h-6 bg-gray-900 text-white rounded-md flex items-center justify-center shrink-0">
              <Bus className="h-3 w-3" />
            </div>

            <p className="text-sm font-extrabold text-gray-900 truncate leading-tight">
              {option.sacco}
            </p>
          </div>

          <p className="text-sm font-black text-gray-900 leading-tight text-right whitespace-nowrap">
            KES {option.fare}
          </p>
        </div>

        <div className="grid grid-cols-[1fr_auto] items-center mb-0.5">
          <div className="flex items-center gap-1 min-w-0">
            {vehicleLabel && (
              <span className="flex items-center gap-0.5 text-[10px] text-gray-400 leading-tight">
                <Users className="h-2.5 w-2.5 shrink-0" />
                {vehicleLabel}
              </span>
            )}

            {vehicleLabel && locationHint && <Dot />}

            {locationHint && (
              <span className="flex items-center gap-0.5 text-[10px] text-gray-400 truncate leading-tight">
                <MapPin className="h-2.5 w-2.5 shrink-0" />
                <span className="truncate">{locationHint}</span>
              </span>
            )}
          </div>

          <div className="flex justify-end">
            <FareTypePill
              fareTypeNow={option.fare_type_now}
              isOffPeakNow={option.is_off_peak_now}
            />
          </div>
        </div>

        <div className="flex items-center flex-wrap gap-x-1 gap-y-0.5 text-xs text-gray-400">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span className="font-semibold text-gray-700">
              {option.duration_mins} min
            </span>
          </div>

          {option.wait_mins_est != null && (
            <>
              <Dot />
              <span>~{option.wait_mins_est} min wait</span>
            </>
          )}

          {option.safety_rating != null && (
            <>
              <Dot />
              <span className="flex items-center gap-0.5">
                <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                <span className="font-bold text-gray-700">
                  {option.safety_rating.toFixed(1)}
                </span>
              </span>
            </>
          )}

          {option.comfort_rating != null && (
            <>
              <Dot />
              <span>comfort {option.comfort_rating.toFixed(1)}</span>
            </>
          )}
        </div>

        {option.surge_active && (
          <div className="mb-2.5 px-2.5 py-1.5 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-700 font-medium flex items-center gap-1.5">
            <Zap className="h-3 w-3 shrink-0" />
            Surge pricing active
            {option.surge_reason ? ` — ${option.surge_reason}` : ""}
          </div>
        )}
        {option.active_alerts?.map((alert, i) => (
          <div
            key={i}
            className="mb-2.5 px-2.5 py-1.5 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 font-medium flex items-center gap-1.5"
          >
            <AlertTriangle className="h-3 w-3 shrink-0" />
            {alert.message}
          </div>
        ))}
        {showDataWarning && (
          <div className="mb-2.5 px-2.5 py-1.5 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-700 font-medium flex items-center gap-1.5">
            <AlertTriangle className="h-3 w-3 shrink-0" />
            Fare unverified — confirm with conductor
          </div>
        )}

        <div className="flex items-center justify-between pt-2.5 border-t border-gray-100">
          <button
            onClick={() => setExpanded((v) => !v)}
            className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-600 transition-colors"
          >
            {expanded ? (
              <ChevronUp className="h-3 w-3" />
            ) : (
              <ChevronDown className="h-3 w-3" />
            )}
            <span>{expanded ? "Less" : "Details"}</span>
          </button>
          <button
            onClick={onStartTrip}
            className="flex items-center gap-1 px-3 py-1.5 border border-green-600 text-green-700 text-xs font-bold rounded-lg hover:bg-green-600 hover:text-white transition-colors group"
          >
            Start Trip
            <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {expanded && (
          <div className="mt-2.5 bg-gray-50 rounded-lg px-3 py-1">
            <DetailRow label="Vehicle Type" value={vehicleLabel} />
            <DetailRow label="Terminus" value={option.terminus_area} />
            <DetailRow label="Via" value={option.via} />
            {/* <DetailRow
              label="Fare type"
              value={
                option.fare_type_now === "STANDARD"
                  ? "Standard"
                  : option.fare_type_now?.charAt(0) +
                    option.fare_type_now?.slice(1).toLowerCase()
              }
            /> */}
            <DetailRow
              label="Off-peak fare"
              value={
                option.off_peak_fare != null
                  ? `KES ${option.off_peak_fare}`
                  : null
              }
            />
            <DetailRow
              label="Peak fare"
              value={
                option.peak_fare != null ? `KES ${option.peak_fare}` : null
              }
            />
            <DetailRow
              label="Payment Method(s)"
              value={
                option.payment_methods?.length
                  ? option.payment_methods.join(", ")
                  : null
              }
            />
            {option.is_transfer && option.transfer_detail && (
              <>
                <DetailRow
                  label="Change at"
                  value={option.transfer_detail.transfer_stage}
                />
                <DetailRow
                  label="Leg 1"
                  value={option.transfer_detail.leg1_sacco}
                />
                <DetailRow
                  label="Leg 2"
                  value={option.transfer_detail.leg2_sacco}
                />
                <DetailRow
                  label="Avg wait"
                  value={`~${option.transfer_detail.avg_wait_mins} min at stage`}
                />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
