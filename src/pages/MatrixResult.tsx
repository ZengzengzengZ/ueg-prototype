import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  RotateCcw,
  Edit3,
  Check,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import StepIndicator from "@/components/StepIndicator";

const matrixData = [
  {
    name: "Company Business Introduction",
    content: `United Energy (0467.HK) is a leading listed independent comprehensive energy group in Hong Kong, headquartered in Hong Kong, with global business coverage. Its core businesses include upstream oil and gas development, clean energy projects and energy trade. Driven by the "oil & gas + new energy" dual-engine model, it balances traditional energy supply and green energy transformation demands, aiming to build a diversified energy solution provider for global customers and adhere to the commitment of sustainable development.`,
    hasContent: true,
  },
  {
    name: "Company Revenue",
    content: "",
    revenue: [
      { year: "2022", value: "15billion" },
      { year: "2023", value: "18billion" },
      { year: "2024", value: "23billion" },
    ],
    hasContent: true,
  },
  {
    name: "Company Strategy Evolution",
    content: "",
    hasStrategyChart: true,
    hasContent: true,
  },
  {
    name: "Company M&A History",
    content: "",
    hasContent: false,
  },
  {
    name: "Company Equity Structure",
    content: "",
    hasContent: false,
  },
  {
    name: "Shareholder Composition",
    content: "",
    hasContent: false,
  },
  {
    name: "Related Party Transactions",
    content: "",
    hasContent: false,
  },
  {
    name: "Board of Directors & Management",
    content: "",
    hasContent: false,
  },
  {
    name: "Historical Stock Prices (Past 5 Years)",
    content: "",
    hasContent: false,
  },
  {
    name: "Ratings from Three Major Institutions",
    content: "",
    hasContent: false,
  },
];

function StrategyChart() {
  return (
    <div className="relative w-full py-4">
      <svg viewBox="0 0 600 200" className="w-full" preserveAspectRatio="xMidYMid meet">
        {/* Arrow path */}
        <defs>
          <linearGradient id="arrowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4A90D9" />
            <stop offset="100%" stopColor="#2E6BB5" />
          </linearGradient>
          <filter id="shadow">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.15" />
          </filter>
        </defs>

        {/* Main arrow body */}
        <path
          d="M 40 120 Q 150 60, 300 100 T 560 70"
          fill="none"
          stroke="url(#arrowGrad)"
          strokeWidth="24"
          strokeLinecap="round"
          filter="url(#shadow)"
        />
        <path
          d="M 40 120 Q 150 60, 300 100 T 560 70"
          fill="none"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="12"
          strokeLinecap="round"
        />

        {/* Arrow head */}
        <polygon
          points="560,70 540,55 540,85"
          fill="#2E6BB5"
          filter="url(#shadow)"
        />

        {/* Nodes on the arrow */}
        {[
          { x: 80, y: 105, label: "公司战略", sub: "Corporate Strategy" },
          { x: 180, y: 85, label: "公司愿景", sub: "Corporate Vision" },
          { x: 280, y: 95, label: "专业业务", sub: "Professional Business" },
          { x: 380, y: 90, label: "战略目标", sub: "Strategic Goals" },
          { x: 480, y: 82, label: "实施路径", sub: "Implementation Path" },
        ].map((node, idx) => (
          <g key={idx}>
            <circle
              cx={node.x}
              cy={node.y}
              r="14"
              fill="white"
              stroke="#4A90D9"
              strokeWidth="2.5"
              filter="url(#shadow)"
            />
            <circle cx={node.x} cy={node.y} r="5" fill="#4A90D9" />
            <text
              x={node.x}
              y={node.y - 22}
              textAnchor="middle"
              fill="#2E6BB5"
              fontSize="11"
              fontWeight="600"
            >
              {node.label}
            </text>
            <text
              x={node.x}
              y={node.y - 10}
              textAnchor="middle"
              fill="#7BA3D1"
              fontSize="8"
            >
              {node.sub}
            </text>
          </g>
        ))}

        {/* Bottom nodes */}
        {[
          { x: 130, y: 165, label: "长期目标", sub: "Long-term Goals" },
          { x: 330, y: 165, label: "关键指标", sub: "Key Indicators" },
        ].map((node, idx) => (
          <g key={`b-${idx}`}>
            <circle
              cx={node.x}
              cy={node.y}
              r="14"
              fill="white"
              stroke="#4A90D9"
              strokeWidth="2.5"
              filter="url(#shadow)"
            />
            <circle cx={node.x} cy={node.y} r="5" fill="#4A90D9" />
            <text
              x={node.x}
              y={node.y + 26}
              textAnchor="middle"
              fill="#2E6BB5"
              fontSize="11"
              fontWeight="600"
            >
              {node.label}
            </text>
            <text
              x={node.x}
              y={node.y + 38}
              textAnchor="middle"
              fill="#7BA3D1"
              fontSize="8"
            >
              {node.sub}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">Updating matrix results...</span>
        <span className="text-sm font-medium text-red-600">{Math.round(progress)}%</span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-red-600 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

export default function MatrixResult() {
  const [searchName, setSearchName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isUpdating) return;
    let raf: number;
    let startTime: number | null = null;
    const duration = 3000;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const next = Math.min((elapsed / duration) * 100, 100);
      setProgress(next);
      if (next < 100) {
        raf = requestAnimationFrame(animate);
      } else {
        setTimeout(() => setIsUpdating(false), 300);
      }
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [isUpdating]);

  return (
    <div className="fade-in max-w-6xl mx-auto">
      <StepIndicator currentStep={3} />

      {/* Search Bar */}
      <div className="ueg-card p-4 mb-5">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="flex items-center gap-2 flex-1">
            <span className="text-xs text-gray-500 whitespace-nowrap">
              Matrix Name:
            </span>
            <input
              type="text"
              placeholder="Please Enter Matrix Name"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="ueg-input flex-1"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="ueg-btn-primary flex items-center gap-1.5">
              <Search size={14} />
              Search
            </button>
            <button className="ueg-btn-outline flex items-center gap-1.5">
              <RotateCcw size={14} />
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Matrix Table */}
      <div className="ueg-card overflow-hidden mb-6">
        {isUpdating && (
          <div className="p-6">
            <ProgressBar progress={progress} />
          </div>
        )}
        {!isUpdating && (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr style={{ background: "#FAF7F5" }}>
                <th className="ueg-table-header text-left w-[200px]">
                  Matrix Name
                </th>
                <th className="ueg-table-header text-left">Matrix Content</th>
                <th className="ueg-table-header text-left w-[120px]">
                  Modify
                </th>
              </tr>
            </thead>
            <tbody>
              {matrixData.map((item, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="ueg-table-cell align-top">
                    <span className="text-xs font-medium text-gray-700">
                      {item.name}
                    </span>
                  </td>
                  <td className="ueg-table-cell">
                    {item.content && (
                      <p className="text-xs text-gray-600 leading-relaxed mb-2">
                        {item.content}
                      </p>
                    )}
                    {item.revenue && (
                      <div className="flex gap-6 mb-2">
                        {item.revenue.map((r, ridx) => (
                          <div key={ridx} className="text-center">
                            <div className="text-xs font-semibold text-gray-700">
                              {r.year}
                            </div>
                            <div className="text-xs text-gray-500 mt-0.5">
                              {r.value}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    {item.hasStrategyChart && <StrategyChart />}
                    {!item.hasContent && (
                      <span className="text-xs text-gray-400 italic">
                        No content available
                      </span>
                    )}
                  </td>
                  <td className="ueg-table-cell align-top">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => navigate(`/matrix-edit?id=${idx + 1}`)}
                        className="text-red-500 text-xs flex items-center gap-0.5 hover:underline"
                      >
                        <Edit3 size={11} />
                        Edit
                      </button>
                      {item.hasContent ? (
                        <button className="text-red-500 text-xs flex items-center gap-0.5 hover:underline">
                          <Check size={11} />
                          Confirm
                        </button>
                      ) : (
                        <button className="text-amber-500 text-xs flex items-center gap-0.5 hover:underline">
                          <RotateCcw size={11} />
                          Regenerate
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}

        {!isUpdating && (
          <div className="flex items-center justify-end gap-1.5 p-4 border-t" style={{ borderColor: "var(--ueg-border)" }}>
            <button className="p-1 rounded hover:bg-gray-100">
              <ChevronLeft size={14} className="text-gray-400" />
            </button>
            {[1, 2, 3, 4, 5].map((p) => (
              <button
                key={p}
                className={`w-6 h-6 rounded text-xs flex items-center justify-center ${
                  p === 1
                    ? "bg-red-600 text-white"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                {p}
              </button>
            ))}
            <span className="text-xs text-gray-400">...</span>
            <button className="p-1 rounded hover:bg-gray-100">
              <ChevronRight size={14} className="text-gray-400" />
            </button>
            <span className="text-xs text-gray-400 ml-1">10 / page</span>
            <span className="text-xs text-gray-400 ml-2">Go To</span>
            <input
              type="text"
              className="w-10 h-6 rounded border text-xs text-center outline-none"
              style={{ borderColor: "var(--ueg-border)" }}
            />
            <span className="text-xs text-gray-400">page</span>
          </div>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="flex items-center justify-center gap-3 pb-6">
        <button
          onClick={() => navigate("/")}
          className="ueg-btn-outline px-6"
        >
          Edit Data Source
        </button>
        <button className="ueg-btn-primary px-6">Generate Report</button>
      </div>
    </div>
  );
}
