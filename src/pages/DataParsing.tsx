import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import StepIndicator from "@/components/StepIndicator";

export default function DataParsing() {
  const navigate = useNavigate();
  const [displayProgress, setDisplayProgress] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const duration = 2500;

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const rawProgress = Math.min(elapsed / duration, 1);

      const eased = 1 - Math.pow(1 - rawProgress, 3);
      const current = Math.round(eased * 100);

      setDisplayProgress(current);

      if (rawProgress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          navigate("/asset-confirm");
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
      <StepIndicator currentStep={2} />

      <div className="ueg-card p-6 lg:p-10">
        <div className="flex flex-col items-center justify-center py-10">
          {/* Circular Progress */}
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

          {/* Title */}
          <h2
            className="mt-8 text-xl lg:text-2xl font-semibold"
            style={{ color: "var(--ueg-red)" }}
          >
            资料解析中...
          </h2>

          {/* Status badge */}
          <div
            className="mt-5 px-5 py-2 rounded-full text-white text-sm font-medium flex items-center gap-2"
            style={{
              background: "linear-gradient(90deg, #C41E24, #E8353C)",
              boxShadow: "0 4px 16px rgba(196, 30, 36, 0.35)",
            }}
          >
            <Loader2 size={15} className="animate-spin" />
            正在解析上传的资料文件
          </div>
        </div>
      </div>
    </div>
  );
}
