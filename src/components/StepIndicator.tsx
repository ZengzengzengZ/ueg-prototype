import { FileText, Database, CheckCircle, BarChart3 } from "lucide-react";

const steps = [
  { icon: FileText, label: "Project Information" },
  { icon: Database, label: "Data Collection" },
  { icon: CheckCircle, label: "Data Confirmation" },
  { icon: BarChart3, label: "Report Matrices Confirmation" },
];

interface StepIndicatorProps {
  currentStep: number;
}

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="ueg-card px-4 py-5 mb-5">
      <div className="flex items-center justify-between relative">
        {/* Connecting lines */}
        <div className="absolute top-4 left-0 right-0 px-10">
          <div className="flex items-center">
            {steps.map((_, idx) => {
              if (idx === steps.length - 1) return null;
              const isCompleted = idx < currentStep;
              return (
                <div key={idx} className="flex-1 flex items-center">
                  <div
                    className="h-0.5 flex-1 transition-colors duration-500"
                    style={{
                      background: isCompleted
                        ? "var(--ueg-red)"
                        : "var(--ueg-border)",
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Steps */}
        {steps.map((step, idx) => {
          const isCompleted = idx < currentStep;
          const isActive = idx === currentStep;

          return (
            <div
              key={idx}
              className={`relative z-10 flex flex-col items-center gap-1.5 ${
                isActive
                  ? "ueg-step-active"
                  : isCompleted
                  ? "ueg-step-completed"
                  : "ueg-step-pending"
              }`}
            >
              <div className="step-icon">
                <step.icon size={14} />
              </div>
              <span className="step-label whitespace-nowrap">{step.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
