import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Upload,
  Download,
  Trash2,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import StepIndicator from "@/components/StepIndicator";

interface SellerAsset {
  id: string;
  country: string;
  name: string;
}

const initialSellerAssets: SellerAsset[] = [
  { id: "1", country: "伊拉克", name: "B9 区块" },
  { id: "2", country: "埃及", name: "Gulf of Suez 资产包" },
];

const uploadedFiles1 = [
  {
    no: "00001",
    name: "Environmental Survey Document",
    type: "Word",
    uploader: "William",
    time: "2023-12-22 07:17:23",
    status: "success",
  },
  {
    no: "00001",
    name: "Environmental Survey Document",
    type: "Word",
    uploader: "William",
    time: "2023-12-22 07:17:23",
    status: "failed",
  },
  {
    no: "00001",
    name: "Environmental Survey Document",
    type: "Word",
    uploader: "William",
    time: "2023-12-22 07:17:23",
    status: "success",
  },
];

const uploadedFiles2 = [
  {
    no: "00001",
    name: "Environmental Survey Document",
    type: "Word",
    uploader: "William",
    time: "2023-12-22 07:17:23",
    status: "success",
  },
  {
    no: "00001",
    name: "Environmental Survey Document",
    type: "Word",
    uploader: "William",
    time: "2023-12-22 07:17:23",
    status: "failed",
  },
  {
    no: "00001",
    name: "Environmental Survey Document",
    type: "Word",
    uploader: "William",
    time: "2023-12-22 07:17:23",
    status: "success",
  },
];

const internetData = [
  { address: "https://baidu.com", keywords: "United Energy" },
  { address: "https://baidu.com", keywords: "United Energy" },
];

export default function ProjectEdit() {
  const navigate = useNavigate();
  const [projectName] = useState("Energy Project 1");
  const [department] = useState("Dept.A");
  const [category, setCategory] = useState("exploration");
  const [targetCompany] = useState("CNPC");
  const [description] = useState("Energy Project 1 Description");
  const [sellerAssets, setSellerAssets] = useState<SellerAsset[]>(initialSellerAssets);

  const handleAssetChange = (id: string, field: "country" | "name", value: string) => {
    setSellerAssets((prev) =>
      prev.map((asset) =>
        asset.id === id ? { ...asset, [field]: value } : asset
      )
    );
  };

  const addAsset = () => {
    const newId = String(Date.now());
    setSellerAssets((prev) => [...prev, { id: newId, country: "", name: "" }]);
  };

  const removeAsset = (id: string) => {
    setSellerAssets((prev) => prev.filter((asset) => asset.id !== id));
  };

  return (
    <div className="fade-in max-w-6xl mx-auto">
      <StepIndicator currentStep={2} />

      {/* Project Information */}
      <div className="ueg-card p-5 mb-5">
        <h2 className="ueg-section-title mb-4">Project Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs text-gray-500 mb-1.5">
              <span className="text-red-500">*</span>Project Name:
            </label>
            <input
              type="text"
              value={projectName}
              readOnly
              className="ueg-input w-full"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1.5">
              Department:
            </label>
            <div className="ueg-input w-full flex items-center justify-between cursor-pointer">
              <span>{department}</span>
              <ChevronRight size={14} className="text-gray-400 rotate-90" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs text-gray-500 mb-1.5">
              <span className="text-red-500">*</span>Project Category:
            </label>
            <div className="flex items-center gap-5">
              {["exploration", "development", "producing"].map((opt) => (
                <label
                  key={opt}
                  className="flex items-center gap-1.5 cursor-pointer"
                >
                  <div
                    className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                      category === opt
                        ? "bg-red-600 border-red-600"
                        : "border-gray-300"
                    }`}
                    onClick={() => setCategory(opt)}
                  >
                    {category === opt && (
                      <svg
                        width="10"
                        height="8"
                        viewBox="0 0 10 8"
                        fill="none"
                      >
                        <path
                          d="M1 4L3.5 6.5L9 1"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                  <span className="text-xs text-gray-600 capitalize">
                    {opt}
                  </span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1.5">
              <span className="text-red-500">*</span>Target Company / Asset:
            </label>
            <input
              type="text"
              value={targetCompany}
              readOnly
              className="ueg-input w-full"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs text-gray-500 mb-1.5">
            Project Description:
          </label>
          <textarea
            value={description}
            readOnly
            rows={3}
            className="ueg-input w-full resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-xs text-gray-500 mb-1.5">
              stock_code:
            </label>
            <input
              type="text"
              defaultValue="UNKNOWN"
              className="ueg-input w-full"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1.5">
              exchange:
            </label>
            <input
              type="text"
              defaultValue="UNKNOWN"
              className="ueg-input w-full"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-xs text-gray-500 mb-1.5">
            Seller's Assets:
          </label>
          <div className="border rounded-lg overflow-hidden" style={{ borderColor: "var(--ueg-border)" }}>
            <table className="w-full">
              <thead>
                <tr style={{ background: "#FAF7F5" }}>
                  <th className="ueg-table-header text-left">Country</th>
                  <th className="ueg-table-header text-left">Asset Name</th>
                  <th className="ueg-table-header text-left w-[80px]">Modify</th>
                </tr>
              </thead>
              <tbody>
                {sellerAssets.map((asset) => (
                  <tr key={asset.id}>
                    <td className="ueg-table-cell">
                      <input
                        type="text"
                        value={asset.country}
                        onChange={(e) => handleAssetChange(asset.id, "country", e.target.value)}
                        className="ueg-input w-full text-sm py-1"
                        placeholder="请输入国家"
                      />
                    </td>
                    <td className="ueg-table-cell">
                      <input
                        type="text"
                        value={asset.name}
                        onChange={(e) => handleAssetChange(asset.id, "name", e.target.value)}
                        className="ueg-input w-full text-sm py-1"
                        placeholder="请输入资产名称"
                      />
                    </td>
                    <td className="ueg-table-cell">
                      <button
                        onClick={() => removeAsset(asset.id)}
                        className="text-red-500 text-xs hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center mt-3">
            <button
              onClick={addAsset}
              className="flex items-center gap-1 text-red-500 text-xs font-medium hover:opacity-80 transition-opacity"
            >
              <Plus size={14} />
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Uploaded Files Section 1 */}
      <div className="ueg-card p-5 mb-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="ueg-section-title">Uploaded Files</h2>
          <button className="ueg-btn-outline flex items-center gap-1.5 text-xs py-1.5 px-3">
            <Upload size={13} />
            Upload Seller Documents
          </button>
        </div>

        <div className="overflow-x-auto -mx-2">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr>
                {[
                  "Document No.",
                  "Document Name",
                  "Document Type",
                  "Uploader",
                  "Upload Time",
                  "Upload Status",
                  "Modify",
                ].map((h) => (
                  <th key={h} className="ueg-table-header text-left">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {uploadedFiles1.map((file, idx) => (
                <tr key={idx}>
                  <td className="ueg-table-cell">{file.no}</td>
                  <td className="ueg-table-cell">{file.name}</td>
                  <td className="ueg-table-cell">{file.type}</td>
                  <td className="ueg-table-cell">{file.uploader}</td>
                  <td className="ueg-table-cell">{file.time}</td>
                  <td className="ueg-table-cell">
                    <span
                      className={`text-xs ${
                        file.status === "success"
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {file.status === "success"
                        ? "Upload Successful"
                        : "Upload Failed"}
                    </span>
                  </td>
                  <td className="ueg-table-cell">
                    {file.status === "success" ? (
                      <button className="text-red-500 text-xs flex items-center gap-0.5 hover:underline">
                        <Download size={12} />
                        Download
                      </button>
                    ) : (
                      <button className="text-red-500 text-xs flex items-center gap-0.5 hover:underline">
                        <Trash2 size={12} />
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-end gap-1.5 mt-3">
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
      </div>

      {/* Uploaded Files Section 2 */}
      <div className="ueg-card p-5 mb-5">
        <div className="flex items-center justify-end mb-4">
          <button className="ueg-btn-outline flex items-center gap-1.5 text-xs py-1.5 px-3">
            <Upload size={13} />
            Upload WoodMac Data
          </button>
        </div>

        <div className="overflow-x-auto -mx-2">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr>
                {[
                  "Document No.",
                  "Document Name",
                  "Document Type",
                  "Uploader",
                  "Upload Time",
                  "Upload Status",
                  "Modify",
                ].map((h) => (
                  <th key={h} className="ueg-table-header text-left">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {uploadedFiles2.map((file, idx) => (
                <tr key={idx}>
                  <td className="ueg-table-cell">{file.no}</td>
                  <td className="ueg-table-cell">{file.name}</td>
                  <td className="ueg-table-cell">{file.type}</td>
                  <td className="ueg-table-cell">{file.uploader}</td>
                  <td className="ueg-table-cell">{file.time}</td>
                  <td className="ueg-table-cell">
                    <span
                      className={`text-xs ${
                        file.status === "success"
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {file.status === "success"
                        ? "Upload Successful"
                        : "Upload Failed"}
                    </span>
                  </td>
                  <td className="ueg-table-cell">
                    {file.status === "success" ? (
                      <button className="text-red-500 text-xs flex items-center gap-0.5 hover:underline">
                        <Download size={12} />
                        Download
                      </button>
                    ) : (
                      <button className="text-red-500 text-xs flex items-center gap-0.5 hover:underline">
                        <Trash2 size={12} />
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-end gap-1.5 mt-3">
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
      </div>

      {/* Internet Data */}
      <div className="ueg-card p-5 mb-6">
        <h2 className="ueg-section-title mb-4">Internet Data</h2>

        <div className="overflow-x-auto -mx-2">
          <table className="w-full min-w-[500px]">
            <thead>
              <tr>
                {["Website Address", "Specified Keywords", "Modify"].map(
                  (h) => (
                    <th key={h} className="ueg-table-header text-left">
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {internetData.map((item, idx) => (
                <tr key={idx}>
                  <td className="ueg-table-cell text-blue-600">{item.address}</td>
                  <td className="ueg-table-cell">{item.keywords}</td>
                  <td className="ueg-table-cell">
                    <button className="text-red-500 text-xs hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              <tr>
                <td className="ueg-table-cell">
                  <input
                    type="text"
                    placeholder="Please enter website address"
                    className="ueg-input w-full text-xs py-1.5"
                  />
                </td>
                <td className="ueg-table-cell">
                  <input
                    type="text"
                    placeholder="enter keywords"
                    className="ueg-input w-full text-xs py-1.5"
                  />
                </td>
                <td className="ueg-table-cell">
                  <button className="text-red-500 text-xs hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex justify-center mt-3">
          <button className="flex items-center gap-1 text-red-500 text-xs font-medium hover:opacity-80 transition-opacity">
            <Plus size={14} />
            Add
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-center gap-3 pb-6">
        <button className="ueg-btn-outline px-6">Save</button>
        <button
          onClick={() => navigate("/generating")}
          className="ueg-btn-primary px-6"
        >
          Generate Matrices
        </button>
        <button
          onClick={() => navigate("/matrix-result")}
          className="ueg-btn-primary px-6"
        >
          Continue Editing
        </button>
      </div>
    </div>
  );
}
