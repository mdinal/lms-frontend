"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import Link from "next/link";

interface LiveClassItem {
  lessonId: string;
  lessonTitle: string;
  courseTitle: string;
  zoomJoinUrl: string;
  scheduledAt: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({ courses: 0, students: 0, revenue: 0 });
  const [liveClasses, setLiveClasses] = useState<LiveClassItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get("/api/admin/stats"),
      api.get("/api/lessons/live-classes/upcoming")
    ])
      .then(([statsRes, liveRes]) => {
        setStats(statsRes.data);
        setLiveClasses(liveRes.data || []);
      })
      .catch((err) => {
        console.error("Failed to load admin dashboard data", err);
      })
      .finally(() => setLoading(false));
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
          <p style={{ fontSize: "2rem", fontWeight: 800, color: "#1e293b", margin: 0 }}>{loading ? "..." : stats.courses}</p>
        </div>

        <div style={{ background: "white", padding: "1.5rem", borderRadius: "16px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)", border: "1px solid #e2e8f0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "rgba(26, 54, 93, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem" }}>🎓</div>
            <h3 style={{ color: "#64748b", fontSize: "1rem", fontWeight: 600, margin: 0 }}>Total Students</h3>
          </div>
          <p style={{ fontSize: "2rem", fontWeight: 800, color: "#1e293b", margin: 0 }}>{loading ? "..." : stats.students}</p>
        </div>

        <div style={{ background: "white", padding: "1.5rem", borderRadius: "16px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)", border: "1px solid #e2e8f0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "rgba(25, 135, 84, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem" }}>💰</div>
            <h3 style={{ color: "#64748b", fontSize: "1rem", fontWeight: 600, margin: 0 }}>Revenue (Total)</h3>
          </div>
          <p style={{ fontSize: "2rem", fontWeight: 800, color: "#1e293b", margin: 0 }}>{loading ? "..." : `$${stats.revenue.toLocaleString()}`}</p>
        </div>
      </div>

      <div style={{ background: "white", borderRadius: "16px", padding: "2rem", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)", border: "1px solid #e2e8f0" }}>
        <h2 style={{ fontSize: "1.25rem", color: "#1e293b", fontWeight: 600, marginBottom: "1.5rem" }}>Scheduled Live Zoom Classes</h2>
        {liveClasses.length === 0 ? (
          <div style={{ textAlign: "center", color: "#94a3b8", padding: "3rem 0" }}>
            <span style={{ fontSize: "3rem", display: "block", marginBottom: "1rem" }}>📅</span>
            <p>No upcoming live classes scheduled yet.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {liveClasses.map((item, idx) => (
              <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem", borderRadius: "8px", border: "1px solid #f1f5f9", background: "#f8fafc" }}>
                <div>
                  <h4 style={{ margin: "0 0 0.25rem 0", color: "#1e293b", fontSize: "1rem" }}>{item.lessonTitle}</h4>
                  <p style={{ margin: 0, color: "#64748b", fontSize: "0.85rem" }}>
                    Course: <strong>{item.courseTitle}</strong>
                    {item.scheduledAt && ` • Scheduled: ${new Date(item.scheduledAt).toLocaleString()}`}
                  </p>
                </div>
                <a 
                  href={item.zoomJoinUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ background: "#2D8CFF", color: "white", padding: "0.5rem 1rem", borderRadius: "6px", textDecoration: "none", fontSize: "0.85rem", fontWeight: 600 }}
                >
                  Join Meeting &rarr;
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
