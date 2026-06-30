import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StepIndicator from "@/components/StepIndicator";

export default function AssetConfirm() {
  const navigate = useNavigate();
  const [assetText, setAssetText] = useState("Block9, Block7, Block3, Block5");

  const handleConfirm = () => {
    const assets = assetText
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
    console.log("用户确认的资产列表:", assets);
    navigate("/generating");
  };

  return (
    <div className="fade-in max-w-6xl mx-auto">
      <StepIndicator currentStep={2} />

      <div className="ueg-card p-6 lg:p-8">
        {/* Page Title */}
        <h2
          className="text-lg lg:text-xl font-semibold mb-6 text-center"
          style={{ color: "var(--ueg-red)" }}
        >
          请确认资产区块
        </h2>

        {/* Asset Input */}
        <div className="mb-8">
          <label
            className="block text-sm font-medium mb-2"
            style={{ color: "var(--ueg-text-secondary)" }}
          >
            资产：
          </label>
          <textarea
            value={assetText}
            onChange={(e) => setAssetText(e.target.value)}
            rows={4}
            className="ueg-input w-full resize-none text-sm"
            placeholder="请输入资产，用逗号分隔"
          />
          <p className="text-xs text-gray-400 mt-1.5">
            多个资产请用逗号（,）分隔
          </p>
        </div>

        {/* Confirm Button */}
        <div className="flex justify-center">
          <button
            onClick={handleConfirm}
            className="ueg-btn-primary px-10 py-2.5 text-base"
          >
            确认
          </button>
        </div>
      </div>
    </div>
  );
}
