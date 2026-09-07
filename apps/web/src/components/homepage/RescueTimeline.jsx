import { CheckCircle2, CircleDot, Clock3, PackageCheck } from "lucide-react";

const STEPS = [
  { key: "posted", label: "Donation Posted", icon: CircleDot },
  { key: "requested", label: "Request Received", icon: PackageCheck },
  { key: "confirmed", label: "Pickup Confirmed", icon: Clock3 },
  { key: "rescued", label: "Food Rescued", icon: CheckCircle2 },
];

const STATUS_ICON = {
  complete: <CheckCircle2 size={12} className="text-[#0F9F76]" />,
  current: <CircleDot size={12} className="text-[#0F9F76]" />,
  pending: <Clock3 size={12} className="text-[color:var(--color-rescue-text-muted)]" />,
  expired: <Clock3 size={12} className="text-rose-400" />,
};

export default function RescueTimeline({ status = "available", compact = true }) {
  const stepStatus = stepStates(status);

  return (
    <div className={`w-full ${compact ? "mt-4" : "mt-6"}`}>
      <div className="relative flex items-center justify-between">
        {/* Connecting line */}
        <div
          className="absolute inset-y-0 left-0 right-0 h-0.5 -z-10"
          style={{
            background: `linear-gradient(to right, ${tokenFor(stepStatus[0])}, ${tokenFor(stepStatus[1])}, ${tokenFor(stepStatus[2])}, ${tokenFor(stepStatus[3])})`,
          }}
        />

        {STEPS.map((step, index) => {
          const state = stepStatus[index];
          return (
            <div key={step.key} className="flex flex-col items-center gap-1.5 z-10">
              <div
                className={`
                  flex h-6 w-6 items-center justify-center rounded-full
                  ${circleFor(state)}
                `}
              >
                {STATUS_ICON[state] || STATUS_ICON.pending}
              </div>
              <span
                className={`text-center text-[10px] font-black uppercase tracking-wider
                  ${compact ? "max-w-14" : "max-w-20"}
                  ${textFor(state)}`}
              >
                {step.label.split(" ").join(" ")}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function stepStates(status) {
  switch (status) {
    case "collected":
      return ["complete", "complete", "complete", "complete"];
    case "requested":
      return ["complete", "complete", "current", "pending"];
    case "expired":
      return ["complete", "complete", "expired", "pending"];
    case "available":
    default:
      return ["complete", "current", "pending", "pending"];
  }
}

function tokenFor(state) {
  switch (state) {
    case "complete":
      return "#0F9F76";
    case "current":
      return "#0F9F76";
    case "expired":
      return "#f87171";
    default:
      return "#9ca3af";
  }
}

function circleFor(state) {
  switch (state) {
    case "complete":
      return "bg-[#0F9F76] text-white";
    case "current":
      return "bg-[#0F9F76] text-white ring-2 ring-[#0F9F76]/30";
    case "expired":
      return "bg-rose-500 text-white";
    default:
      return "bg-[color:var(--color-rescue-border)] text-[color:var(--color-rescue-text-muted)]";
  }
}

function textFor(state) {
  switch (state) {
    case "complete":
      return "text-[#0F9F76]";
    case "current":
      return "text-[#0F9F76]";
    case "expired":
      return "text-rose-400";
    default:
      return "text-[color:var(--color-rescue-text-muted)]";
  }
}
