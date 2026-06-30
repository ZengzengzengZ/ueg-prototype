import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Plus,
  Trash2,
  Download,
  Upload,
  Search,
  ChevronDown,
  ChevronRight,
  GripVertical,
  X,
  TestTube,
} from "lucide-react";

interface TreeItem {
  id: string;
  name: string;
  children?: TreeItem[];
  expanded?: boolean;
  active?: boolean;
}

interface DataSource {
  id: string;
  name: string;
  type: "seller" | "woodmac" | "api" | "crawler" | "public";
  enabled: boolean;
  order: number;
}

const treeData: TreeItem[] = [
  {
    id: "1",
    name: "ppt模板V0.1",
    expanded: true,
    children: [
      { id: "1-1", name: "公司简介" },
      {
        id: "1-2",
        name: "公司治理",
        expanded: true,
        children: [
          { id: "1-2-1", name: "成立与里程碑", active: true },
          { id: "1-2-2", name: "战略演变" },
          { id: "1-2-3", name: "并购历史" },
          { id: "1-2-4", name: "历史包袱" },
          { id: "1-2-5", name: "股权结构图" },
          { id: "1-2-6", name: "股东构成" },
          { id: "1-2-7", name: "核心大股东" },
          { id: "1-2-8", name: "控制性地位评估" },
          { id: "1-2-9", name: "机构投资者" },
          { id: "1-2-10", name: "战略投资者与行业伙伴持股" },
          { id: "1-2-11", name: "股份限制" },
          { id: "1-2-12", name: "关联方交易" },
          { id: "1-2-13", name: "管理层成员" },
        ],
      },
      { id: "1-3", name: "股票信息" },
    ],
  },
];

const initialDataSources: DataSource[] = [
  { id: "1", name: "卖方资料", type: "seller", enabled: true, order: 1 },
  { id: "2", name: "WoodMac", type: "woodmac", enabled: true, order: 2 },
  { id: "3", name: "API", type: "api", enabled: true, order: 3 },
  { id: "4", name: "爬虫", type: "crawler", enabled: true, order: 4 },
  { id: "5", name: "公开数据(已禁用)", type: "public", enabled: false, order: 5 },
];

const defaultKeywords = "历史沿革, 公司成立时间, 重大里程碑, 重大事项, 重要进展, 重大收购, 重大资产出售";

export default function IndicatorSetConfig() {
  const navigate = useNavigate();
  const [treeItems, setTreeItems] = useState<TreeItem[]>(treeData);
  const [selectedItem, setSelectedItem] = useState<string>("1-2-1");
  const [searchQuery, setSearchQuery] = useState("");
  const [dataSources, setDataSources] = useState<DataSource[]>(initialDataSources);
  const [generationMethod, setGenerationMethod] = useState("rag");
  const [userQuestion, setUserQuestion] = useState(
    "集团发展历程 重大事件 时间轴 History and Milestones Company Overview Track Record of Growth"
  );
  const [businessRule, setBusinessRule] = useState("");
  const [outputVariable, setOutputVariable] = useState("kb_output");
  const [keywords, setKeywords] = useState(defaultKeywords);
  const [testResult, setTestResult] = useState("");

  const toggleExpand = (id: string) => {
    const updateTree = (items: TreeItem[]): TreeItem[] => {
      return items.map((item) => {
        if (item.id === id) {
          return { ...item, expanded: !item.expanded };
        }
        if (item.children) {
          return { ...item, children: updateTree(item.children) };
        }
        return item;
      });
    };
    setTreeItems(updateTree(treeItems));
  };

  const toggleDataSource = (id: string) => {
    setDataSources((prev) =>
      prev.map((ds) => (ds.id === id ? { ...ds, enabled: !ds.enabled } : ds))
    );
  };

  const moveDataSource = (id: string, direction: "up" | "down") => {
    setDataSources((prev) => {
      const index = prev.findIndex((ds) => ds.id === id);
      if (index === -1) return prev;
      if (direction === "up" && index > 0) {
        const newArr = [...prev];
        [newArr[index], newArr[index - 1]] = [newArr[index - 1], newArr[index]];
        return newArr;
      }
      if (direction === "down" && index < prev.length - 1) {
        const newArr = [...prev];
        [newArr[index], newArr[index + 1]] = [newArr[index + 1], newArr[index]];
        return newArr;
      }
      return prev;
    });
  };

  const renderTree = (items: TreeItem[], level = 0) => {
    return items.map((item) => (
      <div key={item.id}>
        <div
          className={`flex items-center gap-1 px-2 py-1.5 rounded-md cursor-pointer transition-colors text-xs ${
            selectedItem === item.id
              ? "bg-red-600 text-white"
              : "text-gray-600 hover:bg-gray-50"
          }`}
          style={{ paddingLeft: `${level * 12 + 8}px` }}
          onClick={() => setSelectedItem(item.id)}
        >
          {item.children && item.children.length > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleExpand(item.id);
              }}
              className="p-0.5"
            >
              {item.expanded ? (
                <ChevronDown size={12} />
              ) : (
                <ChevronRight size={12} />
              )}
            </button>
          )}
          {!item.children && <span className="w-4" />}
          <span className="flex-1 truncate">{item.name}</span>
        </div>
        {item.children && item.expanded && (
          <div>{renderTree(item.children, level + 1)}</div>
        )}
      </div>
    ));
  };

  return (
    <div className="fade-in max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-sm text-gray-600 hover:text-red-600 transition-colors"
        >
          <ChevronLeft size={16} />
          <span>Back</span>
        </button>
        <h1 className="text-lg font-semibold text-gray-800">
          Indicator Set Configuration
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-5">
        {/* Left: Tree Panel */}
        <div className="w-full lg:w-64 shrink-0 ueg-card p-4">
          {/* Toolbar */}
          <div className="flex items-center gap-1 mb-3">
            <button className="p-1.5 rounded hover:bg-gray-100 text-red-600">
              <Plus size={16} />
            </button>
            <button className="p-1.5 rounded hover:bg-gray-100 text-gray-500">
              <Trash2 size={16} />
            </button>
            <button className="p-1.5 rounded hover:bg-gray-100 text-gray-500">
              <Download size={16} />
            </button>
            <button className="p-1.5 rounded hover:bg-gray-100 text-gray-500">
              <Upload size={16} />
            </button>
          </div>

          {/* Search */}
          <div className="relative mb-3">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="搜索指标"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="ueg-input w-full pl-9 text-xs"
            />
          </div>

          {/* Tree */}
          <div className="space-y-0.5 max-h-[500px] overflow-y-auto">
            {renderTree(treeItems)}
          </div>
        </div>

        {/* Middle: Edit Panel */}
        <div className="flex-1 ueg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-700">EditElement</h2>
            <button className="p-1 text-gray-400 hover:text-gray-600">
              <X size={16} />
            </button>
          </div>

          {/* Properties */}
          <div className="mb-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs text-red-500">▼</span>
              <span className="text-sm font-medium text-gray-700">
                Properties
              </span>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <button className="ueg-btn-primary text-xs py-1.5 px-3 flex items-center gap-1">
                <Plus size={12} />
                Add
              </button>
              <button className="ueg-btn-outline text-xs py-1.5 px-3">
                Move Up
              </button>
              <button className="ueg-btn-outline text-xs py-1.5 px-3">
                Move Down
              </button>
            </div>
          </div>

          {/* Data Generation Method */}
          <div className="mb-5">
            <label className="block text-xs font-medium text-gray-700 mb-2">
              数据生成方式
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    generationMethod === "rag"
                      ? "border-red-600"
                      : "border-gray-300"
                  }`}
                  onClick={() => setGenerationMethod("rag")}
                >
                  {generationMethod === "rag" && (
                    <div className="w-2 h-2 rounded-full bg-red-600" />
                  )}
                </div>
                <span className="text-xs text-gray-600">
                  RAG知识库文档内容检索
                </span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    generationMethod === "chart"
                      ? "border-red-600"
                      : "border-gray-300"
                  }`}
                  onClick={() => setGenerationMethod("chart")}
                >
                  {generationMethod === "chart" && (
                    <div className="w-2 h-2 rounded-full bg-red-600" />
                  )}
                </div>
                <span className="text-xs text-gray-600">RAG图表生成</span>
              </label>
            </div>
          </div>

          {/* Input Items */}
          <div className="mb-5">
            <div className="text-center text-xs text-gray-500 mb-2">
              Input Items
            </div>

            {/* User Question */}
            <div className="mb-3">
              <label className="flex items-center gap-1 text-xs text-gray-700 mb-1">
                <span className="text-red-500">*</span>用户问题
              </label>
              <textarea
                value={userQuestion}
                onChange={(e) => setUserQuestion(e.target.value)}
                rows={3}
                className="ueg-input w-full resize-none text-xs"
              />
            </div>

            {/* Business Rule */}
            <div className="mb-3">
              <label className="flex items-center gap-1 text-xs text-gray-700 mb-1">
                <span className="text-red-500">*</span>业务规则
              </label>
              <textarea
                value={businessRule}
                onChange={(e) => setBusinessRule(e.target.value)}
                rows={2}
                placeholder="请输入业务规则说明"
                className="ueg-input w-full resize-none text-xs"
              />
            </div>
          </div>

          {/* Data Sources */}
          <div className="mb-5">
            <label className="block text-xs font-medium text-gray-700 mb-2">
              数据来源
            </label>
            <div className="border rounded-lg overflow-hidden" style={{ borderColor: "var(--ueg-border)" }}>
              {dataSources.map((ds, index) => (
                <div
                  key={ds.id}
                  className={`flex items-center gap-2 px-3 py-2.5 ${
                    index !== dataSources.length - 1
                      ? "border-b"
                      : ""
                  } ${!ds.enabled ? "bg-gray-50" : ""}`}
                  style={{
                    borderColor: "var(--ueg-border)",
                  }}
                >
                  <GripVertical size={14} className="text-gray-300 cursor-move" />
                  <span
                    className={`flex-1 text-xs ${
                      ds.enabled ? "text-gray-700" : "text-gray-400"
                    }`}
                  >
                    {ds.name}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => moveDataSource(ds.id, "up")}
                      disabled={index === 0}
                      className="p-1 rounded hover:bg-gray-100 disabled:opacity-30"
                    >
                      <ChevronUpIcon size={12} />
                    </button>
                    <button
                      onClick={() => moveDataSource(ds.id, "down")}
                      disabled={index === dataSources.length - 1}
                      className="p-1 rounded hover:bg-gray-100 disabled:opacity-30"
                    >
                      <ChevronDownIcon size={12} />
                    </button>
                    <button
                      onClick={() => toggleDataSource(ds.id)}
                      className={`relative inline-flex h-4 w-7 items-center rounded-full transition-colors ${
                        ds.enabled ? "bg-red-500" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-2.5 w-2.5 transform rounded-full bg-white transition-transform ${
                          ds.enabled ? "translate-x-4" : "translate-x-0.5"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Keywords */}
          <div className="mb-5">
            <label className="block text-xs font-medium text-gray-700 mb-2">
              关键词
            </label>
            <textarea
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              rows={3}
              className="ueg-input w-full resize-none text-xs"
            />
          </div>

          {/* Output Items */}
          <div className="mb-5">
            <div className="text-center text-xs text-gray-500 mb-2">
              Output Items
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs text-gray-700 shrink-0">输出变量</label>
              <input
                type="text"
                value={outputVariable}
                onChange={(e) => setOutputVariable(e.target.value)}
                className="ueg-input flex-1 text-xs"
              />
            </div>
          </div>

          {/* Test Result */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-700">
                Test Result
              </span>
              <span className="text-xs text-gray-500">Operation</span>
            </div>
            <div className="flex justify-end mb-2">
              <button
                onClick={() =>
                  setTestResult("RAG检索结果将在此显示...")
                }
                className="ueg-btn-primary text-xs py-1.5 px-4 flex items-center gap-1"
              >
                <TestTube size={12} />
                Test
              </button>
            </div>
            <div
              className="border rounded-lg p-4 min-h-[100px] text-xs text-gray-500"
              style={{ borderColor: "var(--ueg-border)" }}
            >
              {testResult || "点击Test按钮后将在此显示RAG检索结果..."}
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-center gap-3 mt-6">
              <button
                onClick={() => navigate(-1)}
                className="ueg-btn-outline px-8 py-2"
              >
                Close
              </button>
              <button className="ueg-btn-primary px-8 py-2">Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper icon components
function ChevronUpIcon({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="18 15 12 9 6 15" />
    </svg>
  );
}

function ChevronDownIcon({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
