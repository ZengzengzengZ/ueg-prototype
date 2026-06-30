import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ChevronLeft, Save, X, Search, AlertTriangle, Trash2, Plus } from "lucide-react";
import StepIndicator from "@/components/StepIndicator";

interface ChartImage {
  id: string;
  src: string;
  alt: string;
  sourceId: number;
}

const matrixList = [
  { id: 1, name: "Company Business Introduction", active: true },
  { id: 2, name: "Company Revenue", active: false },
  { id: 3, name: "Company Strategy Evolution", active: false },
  { id: 4, name: "Company M&A History", active: false },
  { id: 5, name: "Company Equity Structure", active: false },
  { id: 6, name: "Shareholder Compositions", active: false },
  { id: 7, name: "Related Party Transactions", active: false },
  { id: 8, name: "Board of Directors & Management", active: false },
  { id: 9, name: "Historical Stock Prices(Past 5 Years)", active: false },
  { id: 10, name: "Ratings from Three MajorInstitutions", active: false },
];

interface SourceFile {
  id: number;
  name: string;
  type: string;
  summary: string;
  enabled: boolean;
}

const initialSourceFiles: SourceFile[] = [
  {
    id: 1,
    name: "2024 Annual Report",
    type: "PDF File",
    summary: "This is the 2024 annual report released by CNPC in 2024. p12",
    enabled: true,
  },
  {
    id: 2,
    name: "Organizational Chart",
    type: "Image File",
    summary: "This is the organizational chart of CNPC",
    enabled: true,
  },
];

function ToggleSwitch({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200 focus:outline-none ${
        enabled ? "bg-red-500" : "bg-gray-300"
      }`}
    >
      <span
        className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform duration-200 ${
          enabled ? "translate-x-5" : "translate-x-1"
        }`}
      />
    </button>
  );
}

function ConfirmModal({
  isOpen,
  onConfirm,
  onCancel,
}: {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onCancel}
      />
      <div className="relative bg-white rounded-xl shadow-2xl p-6 max-w-md w-full mx-4">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
            <AlertTriangle size={20} className="text-amber-500" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-1">
              Disable Source File
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              After disabling, this file's content will no longer be recalled for the current metric generation. This does not affect other metrics. Are you sure you want to disable it?
            </p>
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 mt-6">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-colors shadow-sm"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

// Right panel component for source information
function SourceInfoPanel({
  sourceFiles,
  selectedSource,
  setSelectedSource,
  handleToggleRequest,
  highlightedSourceId,
}: {
  sourceFiles: SourceFile[];
  selectedSource: number;
  setSelectedSource: (id: number) => void;
  handleToggleRequest: (id: number) => void;
  highlightedSourceId: number | null;
}) {
  return (
    <div className="w-full lg:w-80 shrink-0 border-l pl-5" style={{ borderColor: "var(--ueg-border)" }}>
      <h3 className="text-sm font-semibold text-gray-700 mb-4">
        Source Information
      </h3>

      <div className="overflow-x-auto mb-6">
        <table className="w-full">
          <thead>
            <tr style={{ background: "#FAF7F5" }}>
              <th className="ueg-table-header text-left text-[10px]">Source File Name</th>
              <th className="ueg-table-header text-left text-[10px]">Source File Type</th>
              <th className="ueg-table-header text-left text-[10px]">Source File Summary</th>
              <th className="ueg-table-header text-left text-[10px]">Status</th>
            </tr>
          </thead>
          <tbody>
            {sourceFiles.map((file) => {
              const isHighlighted = highlightedSourceId === file.id;
              const isDimmed = highlightedSourceId !== null && !isHighlighted;
              return (
                <tr
                  key={file.id}
                  className={`cursor-pointer transition-colors ${
                    selectedSource === file.id ? "bg-red-50" : "hover:bg-gray-50"
                  } ${!file.enabled ? "opacity-50 grayscale" : ""} ${isDimmed ? "opacity-30" : ""}`}
                  onClick={() => setSelectedSource(file.id)}
                >
                  <td className="ueg-table-cell text-[10px]">
                    <span className={`hover:underline ${file.enabled && !isDimmed ? "text-red-500" : "text-gray-400"}`}>
                      {file.name}
                    </span>
                  </td>
                  <td className="ueg-table-cell text-[10px]">{file.type}</td>
                  <td className="ueg-table-cell text-[10px]">{file.summary}</td>
                  <td className="ueg-table-cell text-[10px]">
                    <ToggleSwitch
                      enabled={file.enabled}
                      onToggle={() => handleToggleRequest(file.id)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-3">
        {sourceFiles.map((file) => {
          const isHighlighted = highlightedSourceId === file.id;
          const isDimmed = highlightedSourceId !== null && !isHighlighted;
          return (
            <button
              key={file.id}
              onClick={() => setSelectedSource(file.id)}
              className={`px-2 py-1 rounded text-[10px] font-medium transition-colors ${
                selectedSource === file.id
                  ? "bg-red-600 text-white"
                  : file.enabled && !isDimmed
                  ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              {file.name}
            </button>
          );
        })}
      </div>

      <div className={`border rounded-lg p-3 transition-opacity ${highlightedSourceId !== null && highlightedSourceId !== selectedSource ? "opacity-30" : ""}`} style={{ borderColor: "var(--ueg-border)" }}>
        <div className="flex flex-col gap-1 mb-2 text-[10px] text-gray-500">
          <span>File Name: {sourceFiles.find((f) => f.id === selectedSource)?.name}</span>
          <span>File Type: {sourceFiles.find((f) => f.id === selectedSource)?.type}</span>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-center min-h-[120px]">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-br from-yellow-400 to-red-500 flex items-center justify-center">
              <span className="text-white text-sm font-bold">PDF</span>
            </div>
            <p className="text-xs text-gray-600">2024年度报告</p>
            <p className="text-[10px] text-gray-400 mt-0.5">中国石油天然气集团有限公司</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MatrixEdit() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<"edit" | "source">("edit");
  const [selectedMatrix, setSelectedMatrix] = useState(1);
  const [selectedSource, setSelectedSource] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sourceFiles, setSourceFiles] = useState<SourceFile[]>(initialSourceFiles);
  
  // Handle URL parameter for selected matrix
  useEffect(() => {
    const idParam = searchParams.get("id");
    if (idParam) {
      const id = parseInt(idParam, 10);
      if (!isNaN(id) && id >= 1 && id <= 10) {
        setSelectedMatrix(id);
      }
    }
  }, [searchParams]);
  
  const [editContent, setEditContent] = useState(
    `United Energy (0467.HK) is a leading listed independent comprehensive energy group in Hong Kong, headquartered in Hong Kong, with global business coverage. Its core businesses include upstream oil and gas development, clean energy projects and energy trade. Driven by the "oil & gas + new energy" dual-engine model, it balances traditional energy supply and green energy transformation demands, aiming to build a diversified energy solution provider for global customers and adhere to the commitment of sustainable development.`
  );
  const [chartImages, setChartImages] = useState<ChartImage[]>([
    {
      id: "1",
      src: "https://console.enterprise.trae.cn/api/ide/v1/text_to_image?prompt=A%20professional%20corporate%20strategy%20evolution%20roadmap%20infographic%20with%20a%20large%20blue%20curved%20arrow%20pointing%20upward%20from%20left%20to%20right%2C%20showing%20company%20development%20stages%20with%20circular%20nodes%20along%20the%20arrow%2C%20each%20node%20containing%20a%20business%20icon%20and%20Chinese%20text%20labels%20below%20including%20company%20short-term%2C%20company%20mid-term%2C%20professional%20business%2C%20long-term%20goals%2C%20strategic%20goals%2C%20and%20implementation%20path%2C%20clean%20modern%20business%20presentation%20style%2C%20white%20background%2C%20blue%20and%20navy%20color%20scheme",
      alt: "Company Strategy Evolution",
      sourceId: 1,
    },
    {
      id: "2",
      src: "https://console.enterprise.trae.cn/api/ide/v1/text_to_image?prompt=Corporate%20business%20growth%20timeline%20infographic%20with%20horizontal%20flow%20chart%20showing%20key%20milestones%20and%20achievements%2C%20professional%20business%20presentation%20style%2C%20blue%20gradient%20arrow%20connecting%20circular%20nodes%20with%20icons%2C%20white%20background%2C%20clean%20modern%20design",
      alt: "Business Growth Timeline",
      sourceId: 2,
    },
  ]);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [pendingToggleId, setPendingToggleId] = useState<number | null>(null);

  const filteredMatrixList = matrixList.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleRequest = (id: number) => {
    const file = sourceFiles.find((f) => f.id === id);
    if (!file) return;
    if (file.enabled) {
      setPendingToggleId(id);
      setModalOpen(true);
    } else {
      toggleSourceFile(id);
    }
  };

  const toggleSourceFile = (id: number) => {
    setSourceFiles((prev) =>
      prev.map((file) =>
        file.id === id ? { ...file, enabled: !file.enabled } : file
      )
    );
  };

  const handleConfirmDisable = () => {
    if (pendingToggleId !== null) {
      toggleSourceFile(pendingToggleId);
    }
    setModalOpen(false);
    setPendingToggleId(null);
  };

  const handleCancelDisable = () => {
    setModalOpen(false);
    setPendingToggleId(null);
  };

  return (
    <div className="fade-in max-w-6xl mx-auto">
      <StepIndicator currentStep={3} />

      <ConfirmModal
        isOpen={modalOpen}
        onConfirm={handleConfirmDisable}
        onCancel={handleCancelDisable}
      />

      <div className="ueg-card p-5 mb-5">
        {/* Header with back button */}
        <div className="flex items-center gap-3 mb-5">
          <button
            onClick={() => navigate("/matrix-result")}
            className="flex items-center gap-1 text-sm text-gray-600 hover:text-red-600 transition-colors"
          >
            <ChevronLeft size={16} />
            <span>Matrix List</span>
          </button>
        </div>

        {/* Layout */}
        <div className="flex flex-col lg:flex-row gap-5">
          {/* Left: Matrix List */}
          <div className="w-full lg:w-56 shrink-0">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              Matrix List
            </h3>
            <div className="relative mb-3">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search Matrix"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="ueg-input w-full pl-9 text-xs"
              />
            </div>
            <div className="space-y-1 max-h-[400px] overflow-y-auto">
              {filteredMatrixList.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedMatrix(item.id)}
                  className={`w-full text-left px-3 py-2 rounded-md text-xs transition-colors ${
                    selectedMatrix === item.id
                      ? "bg-red-600 text-white"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          {/* Middle: Matrix Editing / Content Source */}
          <div className="flex-1 min-w-0">
            {/* Tabs */}
            <div className="flex items-center gap-4 mb-4 border-b" style={{ borderColor: "var(--ueg-border)" }}>
              <button
                onClick={() => setActiveTab("edit")}
                className={`pb-2 text-sm font-medium transition-colors relative ${
                  activeTab === "edit"
                    ? "text-red-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Matrix Editing
                {activeTab === "edit" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600" />
                )}
              </button>
              <button
                onClick={() => setActiveTab("source")}
                className={`pb-2 text-sm font-medium transition-colors relative ${
                  activeTab === "source"
                    ? "text-red-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Content Source
                {activeTab === "source" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600" />
                )}
              </button>
            </div>

            {activeTab === "edit" ? (
              <div>
                {selectedMatrix === 3 ? (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-semibold text-gray-700">
                        Company Strategy Evolution
                      </h4>
                      <div className="flex items-center gap-2">
                        <button className="px-3 py-1 text-xs rounded border border-red-300 text-red-600 hover:bg-red-50 transition-colors flex items-center gap-1">
                          <Trash2 size={10} />
                          Delete
                        </button>
                        <button className="px-3 py-1 text-xs rounded bg-red-600 text-white hover:bg-red-700 transition-colors flex items-center gap-1">
                          <Plus size={10} />
                          Add
                        </button>
                      </div>
                    </div>
                    {chartImages.map((img, index) => (
                      <div key={img.id} className="mb-4">
                        <h5 className="text-xs font-semibold text-gray-600 mb-2">资产{index + 1}</h5>
                        <div
                          className="relative border-2 rounded-lg overflow-hidden cursor-pointer group"
                          style={{
                            borderColor: selectedImageId === img.id ? "var(--ueg-red)" : "var(--ueg-border)",
                          }}
                          onMouseEnter={() => setSelectedImageId(img.id)}
                          onMouseLeave={() => setSelectedImageId(null)}
                          onClick={() => setSelectedSource(img.sourceId)}
                        >
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setChartImages((prev) => prev.filter((i) => i.id !== img.id));
                              setSelectedImageId(null);
                            }}
                            className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full bg-red-600 text-white flex items-center justify-center shadow-md hover:bg-red-700 transition-opacity opacity-0 group-hover:opacity-100"
                          >
                            <Trash2 size={14} />
                          </button>
                          <img
                            src={img.src}
                            alt={img.alt}
                            className="w-full h-auto object-contain"
                          />
                        </div>
                      </div>
                    ))}
                    <div className="flex items-center justify-center gap-3 mt-4">
                      <button className="ueg-btn-primary px-6 flex items-center gap-1.5">
                        <Save size={14} />
                        Save
                      </button>
                      <button
                        onClick={() => navigate("/matrix-result")}
                        className="ueg-btn-outline px-6 flex items-center gap-1.5"
                      >
                        <X size={14} />
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">
                      {selectedMatrix === 2 ? "Company Revenue" : "Company Business Introduction"}
                    </h4>
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      rows={12}
                      className="ueg-input w-full resize-none text-sm leading-relaxed"
                    />
                    <div className="flex items-center justify-center gap-3 mt-4">
                      <button className="ueg-btn-primary px-6 flex items-center gap-1.5">
                        <Save size={14} />
                        Save
                      </button>
                      <button
                        onClick={() => navigate("/matrix-result")}
                        className="ueg-btn-outline px-6 flex items-center gap-1.5"
                      >
                        <X size={14} />
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3">
                  Source Information
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr style={{ background: "#FAF7F5" }}>
                        <th className="ueg-table-header text-left">Source File Name</th>
                        <th className="ueg-table-header text-left">Source File Type</th>
                        <th className="ueg-table-header text-left">Source File Summary</th>
                        <th className="ueg-table-header text-left">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sourceFiles.map((file) => (
                        <tr
                          key={file.id}
                          className={`cursor-pointer transition-colors ${
                            selectedSource === file.id ? "bg-red-50" : "hover:bg-gray-50"
                          } ${!file.enabled ? "opacity-50 grayscale" : ""}`}
                          onClick={() => setSelectedSource(file.id)}
                        >
                          <td className="ueg-table-cell">
                            <span className={`hover:underline ${file.enabled ? "text-red-500" : "text-gray-400"}`}>
                              {file.name}
                            </span>
                          </td>
                          <td className="ueg-table-cell">{file.type}</td>
                          <td className="ueg-table-cell">{file.summary}</td>
                          <td className="ueg-table-cell">
                            <ToggleSwitch
                              enabled={file.enabled}
                              onToggle={() => handleToggleRequest(file.id)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex items-center gap-2 mt-4 mb-3">
                  {sourceFiles.map((file) => (
                    <button
                      key={file.id}
                      onClick={() => setSelectedSource(file.id)}
                      className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                        selectedSource === file.id
                          ? "bg-red-600 text-white"
                          : file.enabled
                          ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {file.name}
                    </button>
                  ))}
                </div>

                <div className="border rounded-lg p-4" style={{ borderColor: "var(--ueg-border)" }}>
                  <div className="flex items-center gap-4 mb-3 text-xs text-gray-500">
                    <span>File Name: {sourceFiles.find((f) => f.id === selectedSource)?.name}</span>
                    <span>File Type: {sourceFiles.find((f) => f.id === selectedSource)?.type}</span>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-8 flex items-center justify-center min-h-[200px]">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-yellow-400 to-red-500 flex items-center justify-center">
                        <span className="text-white text-lg font-bold">PDF</span>
                      </div>
                      <p className="text-sm text-gray-600">2024年度报告</p>
                      <p className="text-xs text-gray-400 mt-1">中国石油天然气集团有限公司</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right: Source Info Panel - only show in Matrix Editing tab */}
          {activeTab === "edit" && (
            <SourceInfoPanel
              sourceFiles={sourceFiles}
              selectedSource={selectedSource}
              setSelectedSource={setSelectedSource}
              handleToggleRequest={handleToggleRequest}
              highlightedSourceId={selectedImageId ? chartImages.find((i) => i.id === selectedImageId)?.sourceId ?? null : null}
            />
          )}
        </div>
      </div>
    </div>
  );
}
