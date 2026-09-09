"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

interface StudentItem {
  id: string;
  name: string;
  email: string;
  courses: string[];
  enrollmentsCount: number;
}

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<StudentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/admin/students")
      .then((res) => {
        setStudents(res.data);
      })
      .catch((err) => {
        console.error("Failed to load students", err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div style={{ marginBottom: "3rem" }}>
        <h1 style={{ fontSize: "2rem", color: "#1e293b", fontWeight: 700, marginBottom: "0.5rem" }}>Student Directory</h1>
        <p style={{ color: "#64748b" }}>View enrolled students and their active course registrations.</p>
      </div>

      <div style={{ background: "white", borderRadius: "16px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)", border: "1px solid #e2e8f0", overflow: "hidden" }}>
        <div style={{ padding: "1.5rem 2rem", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ fontSize: "1.25rem", color: "#1e293b", fontWeight: 700, margin: 0 }}>Registered Students ({students.length})</h2>
        </div>

        {loading ? (
          <div style={{ padding: "3rem", textAlign: "center", color: "#64748b" }}>Loading student records...</div>
        ) : students.length === 0 ? (
          <div style={{ padding: "4rem 2rem", textAlign: "center", color: "#94a3b8" }}>
            <span style={{ fontSize: "3rem", display: "block", marginBottom: "1rem" }}>🎓</span>
            <p>No students enrolled yet. Once students register and purchase courses, they will appear here.</p>
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0", textAlign: "left" }}>
                <th style={{ padding: "1rem 1.5rem", color: "#64748b", fontWeight: 600, fontSize: "0.875rem" }}>Student</th>
                <th style={{ padding: "1rem 1.5rem", color: "#64748b", fontWeight: 600, fontSize: "0.875rem" }}>Email</th>
                <th style={{ padding: "1rem 1.5rem", color: "#64748b", fontWeight: 600, fontSize: "0.875rem" }}>Enrolled Courses</th>
                <th style={{ padding: "1rem 1.5rem", color: "#64748b", fontWeight: 600, fontSize: "0.875rem", textAlign: "right" }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {students.map(s => (
                <tr key={s.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "1.25rem 1.5rem", color: "#1e293b", fontWeight: 600 }}>
                    {s.name}
                  </td>
                  <td style={{ padding: "1.25rem 1.5rem", color: "#64748b", fontSize: "0.875rem" }}>
                    {s.email}
                  </td>
                  <td style={{ padding: "1.25rem 1.5rem" }}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                      {s.courses.length > 0 ? (
                        s.courses.map((title, idx) => (
                          <span key={idx} style={{
                            background: "rgba(26, 54, 93, 0.08)",
                            color: "#1a365d",
                            padding: "0.25rem 0.75rem",
                            borderRadius: "99px",
                            fontSize: "0.75rem",
                            fontWeight: 600
                          }}>
                            {title}
                          </span>
                        ))
                      ) : (
                        <span style={{ color: "#94a3b8", fontSize: "0.85rem" }}>No active courses</span>
                      )}
                    </div>
                  </td>
                  <td style={{ padding: "1.25rem 1.5rem", textAlign: "right", fontWeight: 700, color: "#1e293b" }}>
                    {s.enrollmentsCount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
