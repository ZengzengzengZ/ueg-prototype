import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  PlusSquare,
  LayoutDashboard,
  BookOpen,
  Briefcase,
  FileStack,
  ScrollText,
  ChevronDown,
  Globe,
  Bell,
  Settings,
  HelpCircle,
  User,
  Menu,
  X,
} from "lucide-react";

const sidebarItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: PlusSquare, label: "Create Project", path: "/create" },
  {
    icon: LayoutDashboard,
    label: "Project Dashboard",
    children: [
      { label: "Project List", path: "/", active: true },
      { label: "Key Project Progress", path: "/progress" },
      { label: "Shared Report", path: "/report" },
    ],
  },
  { icon: BookOpen, label: "Knowledge Base", path: "/knowledge" },
  { icon: Briefcase, label: "Portfolio Management", path: "/portfolio" },
  {
    icon: FileStack,
    label: "Template Management",
    children: [
      { label: "Template Configuration", path: "/template-config" },
      { label: "Indicator Set Configuration", path: "/indicator-set-config", active: true },
      { label: "Data Model Configuration", path: "/data-model-config" },
    ],
  },
  { icon: ScrollText, label: "Log Management", path: "/log" },
];

const topBarIcons = [
  { icon: HelpCircle, label: "Help" },
  { icon: Globe, label: "Language" },
  { icon: Bell, label: "Notifications" },
  { icon: Settings, label: "Settings" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-56 shrink-0" style={{ background: "var(--ueg-sidebar-bg)" }}>
        {/* Logo */}
        <div className="flex items-center gap-2 px-5 py-5">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #F5A623 0%, #C41E24 100%)" }}>
            <div className="text-white font-bold text-sm">UEG</div>
          </div>
          <div>
            <div className="text-white font-semibold text-sm leading-tight">UEG</div>
            <div className="text-white/60 text-[10px] leading-tight">联合能源</div>
          </div>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 px-3 py-2 space-y-0.5">
          {sidebarItems.map((item, idx) => {
            if (item.children) {
              return (
                <div key={idx} className="mb-1">
                  <button className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-md text-white/80 hover:text-white hover:bg-white/10 transition-colors text-xs">
                    <item.icon size={16} />
                    <span className="flex-1 text-left">{item.label}</span>
                    <ChevronDown size={14} />
                  </button>
                  <div className="ml-6 mt-0.5 space-y-0.5">
                    {item.children.map((child, cidx) => (
                      <button
                        key={cidx}
                        onClick={() => navigate(child.path)}
                        className={`w-full text-left px-3 py-2 rounded-md text-xs transition-colors ${
                          child.active || isActive(child.path)
                            ? "bg-white/15 text-white font-medium"
                            : "text-white/60 hover:text-white hover:bg-white/10"
                        }`}
                      >
                        {child.label}
                      </button>
                    ))}
                  </div>
                </div>
              );
            }
            return (
              <button
                key={idx}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-md text-xs transition-colors ${
                  isActive(item.path)
                    ? "bg-white/15 text-white font-medium"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                <item.icon size={16} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50" style={{ background: "var(--ueg-sidebar-bg)" }}>
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #F5A623 0%, #C41E24 100%)" }}>
              <div className="text-white font-bold text-xs">UEG</div>
            </div>
            <div className="text-white font-semibold text-sm">UEG</div>
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white p-1"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="px-3 pb-4 space-y-0.5">
            {sidebarItems.map((item, idx) => {
              if (item.children) {
                return (
                  <div key={idx}>
                    <div className="flex items-center gap-2.5 px-3 py-2.5 text-white/80 text-xs">
                      <item.icon size={16} />
                      <span>{item.label}</span>
                    </div>
                    <div className="ml-6 space-y-0.5">
                      {item.children.map((child, cidx) => (
                        <button
                          key={cidx}
                          onClick={() => {
                            navigate(child.path);
                            setMobileMenuOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-md text-xs transition-colors ${
                            child.active || isActive(child.path)
                              ? "bg-white/15 text-white font-medium"
                              : "text-white/60"
                          }`}
                        >
                          {child.label}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              }
              return (
                <button
                  key={idx}
                  onClick={() => {
                    navigate(item.path);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-md text-xs transition-colors ${
                    isActive(item.path)
                      ? "bg-white/15 text-white font-medium"
                      : "text-white/80"
                  }`}
                >
                  <item.icon size={16} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        )}
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="hidden lg:flex items-center justify-end gap-1 px-5 py-3 bg-white border-b" style={{ borderColor: "var(--ueg-border)" }}>
          {topBarIcons.map((item, idx) => (
            <button
              key={idx}
              className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors"
              title={item.label}
            >
              <item.icon size={18} />
            </button>
          ))}
          <div className="flex items-center gap-2 ml-3 pl-3" style={{ borderLeft: "1px solid var(--ueg-border)" }}>
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-medium" style={{ background: "linear-gradient(135deg, #F5A623, #C41E24)" }}>
              <User size={14} />
            </div>
            <span className="text-sm text-gray-700">William</span>
            <ChevronDown size={14} className="text-gray-400" />
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-4 lg:p-6 pt-16 lg:pt-6 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
