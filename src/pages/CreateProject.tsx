import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import StepIndicator from "@/components/StepIndicator";

const departments = [
  "Exploration Department",
  "Development Department",
  "Production Department",
];

const categories = ["Exploration", "Development", "Producing"];

const MAX_LENGTH = 255;

export default function CreateProject() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    projectName: "",
    department: "",
    projectCategory: "Exploration",
    targetCompany: "",
    projectDescription: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showLengthModal, setShowLengthModal] = useState(false);

  const handleChange = (field: string, value: string) => {
    if (field === "targetCompany" && value.length > MAX_LENGTH) {
      setShowLengthModal(true);
      return;
    }
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.projectName.trim()) {
      newErrors.projectName = "Please enter project name";
    }
    if (!formData.department) {
      newErrors.department = "Please select department";
    }
    if (!formData.targetCompany.trim()) {
      newErrors.targetCompany = "Please enter target company / asset";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const checkMaxLength = (value: string) => {
    if (value.length > MAX_LENGTH) {
      setShowLengthModal(true);
      return false;
    }
    return true;
  };

  const handleSave = () => {
    if (!checkMaxLength(formData.targetCompany)) return;
    if (validate()) {
      console.log("Saved:", formData);
    }
  };

  const handleNext = () => {
    if (!checkMaxLength(formData.targetCompany)) return;
    if (validate()) {
      navigate("/data-parsing");
    }
  };

  return (
    <div>
      <StepIndicator currentStep={0} />

      <div className="ueg-card p-6">
        <h2 className="ueg-section-title mb-6">Project Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Project Name */}
          <div>
            <label className="block text-xs text-gray-500 mb-1.5">
              <span className="text-red-500 mr-0.5">*</span>Project Name:
            </label>
            <input
              type="text"
              value={formData.projectName}
              onChange={(e) => handleChange("projectName", e.target.value)}
              placeholder="Please enter"
              className={`ueg-input w-full ${errors.projectName ? "border-red-500" : ""}`}
            />
            {errors.projectName && (
              <p className="text-xs text-red-500 mt-1">{errors.projectName}</p>
            )}
          </div>

          {/* Department */}
          <div>
            <label className="block text-xs text-gray-500 mb-1.5">
              Department:
            </label>
            <select
              value={formData.department}
              onChange={(e) => handleChange("department", e.target.value)}
              className="ueg-input w-full"
            >
              <option value="">Please select</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Project Category */}
          <div>
            <label className="block text-xs text-gray-500 mb-1.5">
              <span className="text-red-500 mr-0.5">*</span>Project Category:
            </label>
            <div className="flex gap-3">
              {categories.map((cat) => (
                <label
                  key={cat}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm cursor-pointer border transition-all ${
                    formData.projectCategory === cat
                      ? "border-red-500 text-red-500 bg-red-50"
                      : "border-gray-200 text-gray-600 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="projectCategory"
                    value={cat}
                    checked={formData.projectCategory === cat}
                    onChange={(e) => handleChange("projectCategory", e.target.value)}
                    className="hidden"
                  />
                  {cat}
                </label>
              ))}
            </div>
          </div>

          {/* Target Company/Asset */}
          <div>
            <label className="block text-xs text-gray-500 mb-1.5">
              <span className="text-red-500 mr-0.5">*</span>Target Company/Asset:
            </label>
            <input
              type="text"
              value={formData.targetCompany}
              onChange={(e) => handleChange("targetCompany", e.target.value)}
              placeholder="Please enter"
              className={`ueg-input w-full ${errors.targetCompany ? "border-red-500" : ""}`}
            />
            {errors.targetCompany && (
              <p className="text-xs text-red-500 mt-1">{errors.targetCompany}</p>
            )}
          </div>
        </div>

        {/* Project Description */}
        <div className="mb-6">
          <label className="block text-xs text-gray-500 mb-1.5">
            Project Description:
          </label>
          <textarea
            value={formData.projectDescription}
            onChange={(e) => handleChange("projectDescription", e.target.value)}
            placeholder="Project Description"
            rows={4}
            className="ueg-input w-full resize-none"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-3">
          <button onClick={handleSave} className="ueg-btn-outline px-6">
            Save
          </button>
          <button onClick={handleNext} className="ueg-btn-primary px-6">
            Next
          </button>
        </div>
      </div>

      {/* Length Limit Modal */}
      {showLengthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 p-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="p-2 rounded-full bg-red-50 text-red-500">
                <AlertTriangle size={20} />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-800 mb-1">
                  Length Limit Exceeded
                </h3>
                <p className="text-xs text-gray-500 mb-2">
                  输入内容超出最大长度限制（最多支持 {MAX_LENGTH} 个字符），请精简后重新输入。
                </p>
                <p className="text-xs text-gray-400">
                  Input exceeds the maximum length limit ({MAX_LENGTH} characters maximum). Please shorten and try again.
                </p>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setShowLengthModal(false)}
                className="ueg-btn-primary px-5 py-1.5 text-sm"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
