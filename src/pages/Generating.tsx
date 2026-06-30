import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Loader2 } from "lucide-react";
import StepIndicator from "@/components/StepIndicator";

const progressSteps = [
  {
    title: "Data Collection & Integration",
    desc: "Completed integration of crawler data, API data, and uploaded files",
    time: "Finished at 07:00 today",
  },
  {
    title: "Data Cleaning",
    desc: "Completed data deduplication and format unification",
    time: "Finished at 07:10 today",
  },
  {
    title: "Data Validation",
    desc: "Completed data validity verification",
    time: "Finished at 07:15 today",
  },
  {
    title: "Model Calculation & Analysis",
    desc: "Currently conducting data calculation and trend prediction via the model",
    time: "10 minutes remaining (estimated)",
    active: true,
  },
  {
    title: "Invoke Analysis Matrices",
    desc: "Pending",
    pending: true,
  },
];

export default function Generating() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [displayProgress, setDisplayProgress] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const duration = 3000;

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const rawProgress = Math.min(elapsed / duration, 1);

      // Easing function for smooth deceleration
      const eased = 1 - Math.pow(1 - rawProgress, 3);
      const current = Math.round(eased * 100);

      setProgress(current);
      setDisplayProgress(current);

      if (rawProgress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          navigate("/matrix-result");
        }, 400);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [navigate]);

  const circumference = 2 * Math.PI * 90;
  const strokeDashoffset = circumference - (displayProgress / 100) * circumference;

  return (
    <div className="fade-in max-w-6xl mx-auto">
      <StepIndicator currentStep={3} />

      <div className="ueg-card p-6 lg:p-10">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12">
          {/* Left: Circular Progress */}
          <div className="flex flex-col items-center">
            <div className="relative w-56 h-56 lg:w-72 lg:h-72">
              {/* Decorative outer ring */}
              <svg
                className="absolute inset-0 w-full h-full animate-spin-slow"
                viewBox="0 0 200 200"
              >
                <circle
                  cx="100"
                  cy="100"
                  r="96"
                  fill="none"
                  stroke="rgba(196, 30, 36, 0.06)"
                  strokeWidth="1"
                  strokeDasharray="8 8"
                />
              </svg>

              {/* Decorative dots */}
              <div
                className="absolute w-2.5 h-2.5 rounded-full"
                style={{
                  background: "linear-gradient(135deg, #F5A623, #C41E24)",
                  top: "8%",
                  right: "15%",
                  opacity: 0.6,
                }}
              />
              <div
                className="absolute w-2 h-2 rounded-full"
                style={{
                  background: "linear-gradient(135deg, #F5A623, #C41E24)",
                  bottom: "12%",
                  left: "10%",
                  opacity: 0.4,
                }}
              />

              {/* Main circular progress */}
              <svg className="w-full h-full" viewBox="0 0 200 200">
                {/* Background track */}
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  fill="none"
                  stroke="var(--ueg-progress-track)"
                  strokeWidth="12"
                />
                {/* Inner glow track */}
                <circle
                  cx="100"
                  cy="100"
                  r="76"
                  fill="none"
                  stroke="rgba(196, 30, 36, 0.05)"
                  strokeWidth="2"
                />
                {/* Progress arc - outer (gold to red gradient) */}
                <defs>
                  <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F5A623" />
                    <stop offset="100%" stopColor="#C41E24" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  fill="none"
                  stroke="url(#progressGradient)"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  className="progress-ring-circle"
                  filter="url(#glow)"
                />
                {/* Secondary inner arc for depth */}
                <circle
                  cx="100"
                  cy="100"
                  r="76"
                  fill="none"
                  stroke="url(#progressGradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 76}
                  strokeDashoffset={circumference - (displayProgress / 100) * circumference * 0.85}
                  className="progress-ring-circle"
                  opacity="0.3"
                />
              </svg>

              {/* Center content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span
                  className="text-4xl lg:text-5xl font-bold"
                  style={{
                    background: "linear-gradient(135deg, #C41E24, #F5A623)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {displayProgress}%
                </span>
              </div>
            </div>

            {/* Status badge */}
            <div
              className="mt-5 px-5 py-2 rounded-full text-white text-sm font-medium flex items-center gap-2"
              style={{
                background: "linear-gradient(90deg, #C41E24, #E8353C)",
                boxShadow: "0 4px 16px rgba(196, 30, 36, 0.35)",
              }}
            >
              <Loader2 size={15} className="animate-spin" />
              Matrices are being generated
            </div>
          </div>

          {/* Right: Progress Steps */}
          <div className="flex-1 w-full lg:w-auto">
            <h3
              className="text-base font-semibold mb-5"
              style={{ color: "var(--ueg-red)" }}
            >
              AI Generating...
            </h3>

            <div className="space-y-4">
              {progressSteps.map((step, idx) => {
                const isCompleted =
                  idx < 3 || (idx === 3 && progress >= 80) || progress === 100;
                const isActive = step.active && progress < 100;
                return (
                  <div
                    key={idx}
                    className={`flex gap-3 transition-all duration-300 ${
                      isActive ? "opacity-100" : step.pending ? "opacity-50" : "opacity-100"
                    }`}
                  >
                    {/* Step indicator */}
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                          isCompleted
                            ? "bg-red-600 text-white"
                            : isActive
                            ? "bg-red-100 text-red-600 ring-2 ring-red-600 ring-offset-1"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {isCompleted ? (
                          <Check size={14} strokeWidth={2.5} />
                        ) : isActive ? (
                          <Loader2 size={13} className="animate-spin" />
                        ) : (
                          <span className="text-xs font-medium">{idx + 1}</span>
                        )}
                      </div>
                      {idx < progressSteps.length - 1 && (
                        <div
                          className="w-0.5 flex-1 min-h-[20px] mt-1"
                          style={{
                            background:
                              isCompleted && idx < 3
                                ? "var(--ueg-red)"
                                : "var(--ueg-border)",
                          }}
                        />
                      )}
                    </div>

                    {/* Step content */}
                    <div className="pb-3">
                      <div
                        className={`text-sm font-medium ${
                          isCompleted || isActive
                            ? "text-gray-800"
                            : "text-gray-400"
                        }`}
                      >
                        {step.title}
                      </div>
                      <div
                        className={`text-xs mt-0.5 ${
                          isCompleted || isActive
                            ? "text-gray-500"
                            : "text-gray-400"
                        }`}
                      >
                        {step.desc}
                      </div>
                      {step.time && (
                        <div className="text-[11px] text-gray-400 mt-1">
                          {step.time}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
