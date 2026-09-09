"use client";

import styles from "../dashboard.module.css";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";

export default function StudentSettings() {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get("/api/auth/me")
      .then((res) => {
        setProfile(res.data);
      })
      .catch((err) => {
        console.error("Failed to load profile", err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <ProtectedRoute>
      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <div className={styles.logo} style={{ marginBottom: "2rem" }}>
            <Link href="/">
              <Image src="/logo.jpeg" alt="LMS Logo" width={120} height={32} style={{ objectFit: "contain" }} />
            </Link>
          </div>
          <nav className={styles.nav}>
            <Link href="/dashboard" className={styles.navLink}>My Courses</Link>
            <Link href="/dashboard/payments" className={styles.navLink}>Payments</Link>
            <Link href="/dashboard/settings" className={styles.activeLink}>Settings</Link>
          </nav>
          <div style={{ marginTop: "auto", padding: "1rem" }}>
            <button onClick={logout} style={{ width: "100%", padding: "0.5rem", background: "none", border: "1px solid #cbd5e1", borderRadius: "6px", color: "#64748b", cursor: "pointer" }}>
              Sign Out
            </button>
          </div>
        </aside>

        <main className={styles.mainContent}>
          <header className={styles.header}>
            <h1 className={styles.pageTitle}>Account Settings</h1>
            <div className={styles.userProfile}>{user?.username || "Student"}</div>
          </header>

          <div style={{ maxWidth: "600px", marginTop: "2rem" }}>
            <div style={{ background: "white", padding: "2rem", borderRadius: "16px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)", border: "1px solid #e2e8f0" }}>
              <h2 style={{ fontSize: "1.25rem", color: "#1e293b", fontWeight: 700, marginBottom: "1.5rem" }}>Profile Information</h2>

              {loading ? (
                <div>Loading profile...</div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, color: "#475569", marginBottom: "0.25rem" }}>Full Name</label>
                    <input 
                      type="text" 
                      readOnly 
                      value={profile?.name || ""} 
                      style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid #cbd5e1", background: "#f8fafc", color: "#334155" }} 
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, color: "#475569", marginBottom: "0.25rem" }}>Email Address</label>
                    <input 
                      type="email" 
                      readOnly 
                      value={profile?.email || ""} 
                      style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid #cbd5e1", background: "#f8fafc", color: "#334155" }} 
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, color: "#475569", marginBottom: "0.25rem" }}>Account Role</label>
                    <input 
                      type="text" 
                      readOnly 
                      value={profile?.role || "STUDENT"} 
                      style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid #cbd5e1", background: "#f8fafc", color: "#334155" }} 
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
