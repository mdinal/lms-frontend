"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: "📊" },
    { name: "My Courses", path: "/admin/courses", icon: "📚" },
    { name: "Students", path: "/admin/students", icon: "🎓" },
  ];

  return (
    <ProtectedRoute allowedRoles={["ADMIN", "TUTOR"]}>
      <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f8fafc" }}>
        
        {/* Sidebar */}
        <aside style={{ width: "260px", backgroundColor: "#1a365d", color: "white", padding: "2rem 0", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "0 2rem", marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#d4af37", marginBottom: "0.25rem" }}>Instructor Portal</h2>
            <p style={{ fontSize: "0.85rem", color: "#94a3b8" }}>Cambridge Success</p>
          </div>
          
          <nav style={{ flexGrow: 1 }}>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link href={item.path} style={{
                    display: "flex", alignItems: "center", gap: "1rem",
                    padding: "1rem 2rem",
                    color: pathname.startsWith(item.path) ? "white" : "#cbd5e1",
                    backgroundColor: pathname.startsWith(item.path) ? "rgba(255,255,255,0.1)" : "transparent",
                    textDecoration: "none",
                    borderLeft: pathname.startsWith(item.path) ? "4px solid #d4af37" : "4px solid transparent",
                    transition: "all 0.2s ease"
                  }}>
                    <span>{item.icon}</span>
                    <span style={{ fontWeight: pathname.startsWith(item.path) ? 600 : 400 }}>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          <div style={{ padding: "2rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "#d4af37", display: "flex", alignItems: "center", justifyContent: "center", color: "#1a365d", fontWeight: "bold" }}>
                {user?.username.charAt(0).toUpperCase()}
              </div>
              <div>
                <p style={{ fontSize: "0.9rem", fontWeight: 600, margin: 0 }}>{user?.username.split("@")[0]}</p>
                <p style={{ fontSize: "0.75rem", color: "#94a3b8", margin: 0 }}>{user?.role}</p>
              </div>
            </div>
            <button onClick={logout} style={{ width: "100%", padding: "0.75rem", background: "rgba(255,255,255,0.1)", border: "none", color: "white", borderRadius: "8px", cursor: "pointer", transition: "background 0.2s" }} onMouseOver={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.2)"} onMouseOut={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}>
              Sign Out
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main style={{ flexGrow: 1, padding: "3rem", overflowY: "auto" }}>
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}
