"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ courses: 0, students: 0, revenue: 0 });

  useEffect(() => {
    // Mock fetching stats for now since we don't have a stats endpoint yet
    setStats({
      courses: 12,
      students: 450,
      revenue: 12500
    });
  }, []);

  return (
    <div>
      <div style={{ marginBottom: "3rem" }}>
        <h1 style={{ fontSize: "2rem", color: "#1e293b", fontWeight: 700, marginBottom: "0.5rem" }}>Dashboard Overview</h1>
        <p style={{ color: "#64748b" }}>Welcome back to the Instructor Portal.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem", marginBottom: "3rem" }}>
        {/* Stat Cards */}
        <div style={{ background: "white", padding: "1.5rem", borderRadius: "16px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)", border: "1px solid #e2e8f0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "rgba(212, 175, 55, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem" }}>📚</div>
            <h3 style={{ color: "#64748b", fontSize: "1rem", fontWeight: 600, margin: 0 }}>Active Courses</h3>
          </div>
          <p style={{ fontSize: "2rem", fontWeight: 800, color: "#1e293b", margin: 0 }}>{stats.courses}</p>
        </div>

        <div style={{ background: "white", padding: "1.5rem", borderRadius: "16px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)", border: "1px solid #e2e8f0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "rgba(26, 54, 93, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem" }}>🎓</div>
            <h3 style={{ color: "#64748b", fontSize: "1rem", fontWeight: 600, margin: 0 }}>Total Students</h3>
          </div>
          <p style={{ fontSize: "2rem", fontWeight: 800, color: "#1e293b", margin: 0 }}>{stats.students}</p>
        </div>

        <div style={{ background: "white", padding: "1.5rem", borderRadius: "16px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)", border: "1px solid #e2e8f0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "rgba(25, 135, 84, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem" }}>💰</div>
            <h3 style={{ color: "#64748b", fontSize: "1rem", fontWeight: 600, margin: 0 }}>Revenue (MTD)</h3>
          </div>
          <p style={{ fontSize: "2rem", fontWeight: 800, color: "#1e293b", margin: 0 }}>${stats.revenue.toLocaleString()}</p>
        </div>
      </div>

      <div style={{ background: "white", borderRadius: "16px", padding: "2rem", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)", border: "1px solid #e2e8f0" }}>
        <h2 style={{ fontSize: "1.25rem", color: "#1e293b", fontWeight: 600, marginBottom: "1.5rem" }}>Upcoming Live Classes</h2>
        <div style={{ textAlign: "center", color: "#94a3b8", padding: "3rem 0" }}>
          <span style={{ fontSize: "3rem", display: "block", marginBottom: "1rem" }}>📅</span>
          <p>No upcoming classes scheduled for today.</p>
        </div>
      </div>
    </div>
  );
}
