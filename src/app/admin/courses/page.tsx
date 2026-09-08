"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import Link from "next/link";

interface Course {
  id: string;
  title: string;
  description: string;
  tutorName: string;
}

export default function AdminCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newPrice, setNewPrice] = useState("0");

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await api.get("/api/courses");
      setCourses(response.data);
    } catch (error) {
      console.error("Failed to fetch courses", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/api/courses", { title: newTitle, description: newDescription, price: newPrice });
      setShowForm(false);
      setNewTitle("");
      setNewDescription("");
      setNewPrice("0");
      fetchCourses(); // Refresh the list
    } catch (error) {
      console.error("Failed to create course", error);
      alert("Failed to create course.");
    }
  };

  if (loading) return <div>Loading courses...</div>;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "3rem" }}>
        <div>
          <h1 style={{ fontSize: "2rem", color: "#1e293b", fontWeight: 700, marginBottom: "0.5rem" }}>My Courses</h1>
          <p style={{ color: "#64748b" }}>Manage your curriculum and live sessions.</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          style={{ background: "#1a365d", color: "white", border: "none", padding: "0.75rem 1.5rem", borderRadius: "8px", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem" }}
        >
          <span>{showForm ? "Cancel" : "+ Create New Course"}</span>
        </button>
      </div>

      {showForm && (
        <div style={{ background: "white", padding: "2rem", borderRadius: "16px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)", border: "1px solid #e2e8f0", marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "1.25rem", color: "#1e293b", fontWeight: 600, marginBottom: "1.5rem" }}>Create a New Course</h2>
          <form onSubmit={handleCreateCourse} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, color: "#475569", marginBottom: "0.5rem" }}>Course Title</label>
              <input type="text" required value={newTitle} onChange={e => setNewTitle(e.target.value)} style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, color: "#475569", marginBottom: "0.5rem" }}>Description</label>
              <textarea required value={newDescription} onChange={e => setNewDescription(e.target.value)} style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid #cbd5e1", minHeight: "100px" }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, color: "#475569", marginBottom: "0.5rem" }}>Price ($)</label>
              <input type="number" step="0.01" min="0" required value={newPrice} onChange={e => setNewPrice(e.target.value)} style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
            </div>
            <button type="submit" style={{ alignSelf: "flex-start", background: "#2D8CFF", color: "white", border: "none", padding: "0.75rem 2rem", borderRadius: "8px", fontWeight: 600, cursor: "pointer", marginTop: "1rem" }}>Save Course</button>
          </form>
        </div>
      )}

      <div style={{ background: "white", borderRadius: "16px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)", border: "1px solid #e2e8f0", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0", textAlign: "left" }}>
              <th style={{ padding: "1rem 1.5rem", color: "#64748b", fontWeight: 600, fontSize: "0.875rem" }}>Course Name</th>
              <th style={{ padding: "1rem 1.5rem", color: "#64748b", fontWeight: 600, fontSize: "0.875rem" }}>Instructor</th>
              <th style={{ padding: "1rem 1.5rem", color: "#64748b", fontWeight: 600, fontSize: "0.875rem" }}>Status</th>
              <th style={{ padding: "1rem 1.5rem", color: "#64748b", fontWeight: 600, fontSize: "0.875rem", textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ padding: "3rem", textAlign: "center", color: "#94a3b8" }}>
                  No courses found. Create one to get started.
                </td>
              </tr>
            ) : (
              courses.map(course => (
                <tr key={course.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "1.5rem", color: "#1e293b", fontWeight: 500 }}>{course.title}</td>
                  <td style={{ padding: "1.5rem", color: "#64748b" }}>{course.tutorName}</td>
                  <td style={{ padding: "1.5rem" }}>
                    <span style={{ background: "#d1e7dd", color: "#0a3622", padding: "0.25rem 0.75rem", borderRadius: "99px", fontSize: "0.75rem", fontWeight: 600 }}>Active</span>
                  </td>
                  <td style={{ padding: "1.5rem", textAlign: "right" }}>
                    <Link href={`/admin/courses/${course.id}`} style={{ color: "#0d6efd", textDecoration: "none", fontWeight: 600, fontSize: "0.875rem" }}>
                      Manage Course &rarr;
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
