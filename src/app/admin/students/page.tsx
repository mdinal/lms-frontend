"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

interface CourseProgressItem {
  courseId: string;
  courseTitle: string;
  totalLessons: number;
  completedLessons: number;
  progressPercentage: number;
}

interface StudentItem {
  id: string;
  name: string;
  email: string;
  courses: string[];
  enrollmentsCount: number;
  overallProgressPercentage: number;
  courseProgress: CourseProgressItem[];
}

interface LessonDetail {
  lessonId: string;
  title: string;
  isCompleted: boolean;
  lastPositionSeconds: number;
  updatedAt: string | null;
  isLiveClass: boolean;
  hasRecording: boolean;
  scheduledAt: string | null;
}

interface CourseDetailBreakdown {
  courseId: string;
  courseTitle: string;
  enrolledAt: string | null;
  totalLessons: number;
  completedLessons: number;
  progressPercentage: number;
  lessons: LessonDetail[];
}

interface StudentDetailData {
  id: string;
  name: string;
  email: string;
  role: string;
  enrolledCoursesCount: number;
  courses: CourseDetailBreakdown[];
}

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<StudentItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Drilldown modal state
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [studentDetail, setStudentDetail] = useState<StudentDetailData | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);

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

  const handleInspectStudent = async (studentId: string) => {
    setSelectedStudentId(studentId);
    setDetailLoading(true);
    setStudentDetail(null);

    try {
      const res = await api.get(`/api/admin/students/${studentId}/progress`);
      setStudentDetail(res.data);
    } catch (err) {
      console.error("Failed to fetch student progress detail", err);
    } finally {
      setDetailLoading(false);
    }
  };

  const closeModal = () => {
    setSelectedStudentId(null);
    setStudentDetail(null);
  };

  return (
    <div>
      <div style={{ marginBottom: "2.5rem" }}>
        <h1 style={{ fontSize: "2rem", color: "#1e293b", fontWeight: 700, marginBottom: "0.5rem" }}>Student Tracking & Directory</h1>
        <p style={{ color: "#64748b" }}>Monitor enrolled students, track real-time course completions, and inspect lesson-by-lesson progress.</p>
      </div>

      <div style={{ background: "white", borderRadius: "16px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)", border: "1px solid #e2e8f0", overflow: "hidden" }}>
        <div style={{ padding: "1.5rem 2rem", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ fontSize: "1.25rem", color: "#1e293b", fontWeight: 700, margin: 0 }}>Registered Scholars ({students.length})</h2>
        </div>

        {loading ? (
          <div style={{ padding: "3rem", textAlign: "center", color: "#64748b" }}>Loading student records...</div>
        ) : students.length === 0 ? (
          <div style={{ padding: "4rem 2rem", textAlign: "center", color: "#94a3b8" }}>
            <span style={{ fontSize: "3rem", display: "block", marginBottom: "1rem" }}>🎓</span>
            <p>No students enrolled yet. Once students register and purchase courses, their progress metrics will appear here.</p>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0", textAlign: "left" }}>
                  <th style={{ padding: "1rem 1.5rem", color: "#64748b", fontWeight: 600, fontSize: "0.875rem" }}>Student</th>
                  <th style={{ padding: "1rem 1.5rem", color: "#64748b", fontWeight: 600, fontSize: "0.875rem" }}>Email</th>
                  <th style={{ padding: "1rem 1.5rem", color: "#64748b", fontWeight: 600, fontSize: "0.875rem" }}>Overall Progress</th>
                  <th style={{ padding: "1rem 1.5rem", color: "#64748b", fontWeight: 600, fontSize: "0.875rem" }}>Course Breakdown</th>
                  <th style={{ padding: "1rem 1.5rem", color: "#64748b", fontWeight: 600, fontSize: "0.875rem", textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map(s => {
                  const overall = s.overallProgressPercentage || 0;
                  const isFinished = overall === 100;

                  return (
                    <tr key={s.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                      <td style={{ padding: "1.25rem 1.5rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                          <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#e0e7ff", color: "#3730a3", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.85rem" }}>
                            {s.name ? s.name.substring(0, 2).toUpperCase() : "ST"}
                          </div>
                          <div>
                            <div style={{ fontWeight: 600, color: "#1e293b" }}>{s.name}</div>
                            <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>{s.enrollmentsCount} {s.enrollmentsCount === 1 ? "Course" : "Courses"} Enrolled</div>
                          </div>
                        </div>
                      </td>

                      <td style={{ padding: "1.25rem 1.5rem", color: "#64748b", fontSize: "0.875rem" }}>
                        {s.email}
                      </td>

                      <td style={{ padding: "1.25rem 1.5rem", minWidth: "160px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                          <div style={{ flex: 1, height: "8px", background: "#f1f5f9", borderRadius: "99px", overflow: "hidden" }}>
                            <div style={{
                              width: `${overall}%`,
                              height: "100%",
                              background: isFinished ? "#10b981" : "linear-gradient(90deg, #3b82f6, #6366f1)",
                              borderRadius: "99px"
                            }}></div>
                          </div>
                          <span style={{ fontSize: "0.85rem", fontWeight: 700, color: isFinished ? "#059669" : "#1e293b", minWidth: "35px" }}>
                            {overall}%
                          </span>
                        </div>
                      </td>

                      <td style={{ padding: "1.25rem 1.5rem" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                          {s.courseProgress && s.courseProgress.length > 0 ? (
                            s.courseProgress.map((cp, idx) => (
                              <div key={idx} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem" }}>
                                <span style={{ color: "#334155", fontWeight: 500 }}>{cp.courseTitle}:</span>
                                <span style={{
                                  background: cp.progressPercentage === 100 ? "#ecfdf5" : "#eff6ff",
                                  color: cp.progressPercentage === 100 ? "#047857" : "#1d4ed8",
                                  padding: "0.15rem 0.5rem",
                                  borderRadius: "6px",
                                  fontWeight: 600,
                                  fontSize: "0.75rem"
                                }}>
                                  {cp.progressPercentage}% ({cp.completedLessons}/{cp.totalLessons})
                                </span>
                              </div>
                            ))
                          ) : (
                            <span style={{ color: "#94a3b8", fontSize: "0.85rem" }}>No active courses</span>
                          )}
                        </div>
                      </td>

                      <td style={{ padding: "1.25rem 1.5rem", textAlign: "right" }}>
                        <button
                          onClick={() => handleInspectStudent(s.id)}
                          style={{
                            background: "#eff6ff",
                            color: "#2563eb",
                            border: "1px solid #bfdbfe",
                            padding: "0.45rem 0.9rem",
                            borderRadius: "8px",
                            fontSize: "0.825rem",
                            fontWeight: 600,
                            cursor: "pointer",
                            transition: "all 0.2s ease"
                          }}
                        >
                          📊 Inspect Progress
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Student Detailed Progress Modal */}
      {selectedStudentId && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(15, 23, 42, 0.6)",
          backdropFilter: "blur(4px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
          padding: "2rem"
        }}>
          <div style={{
            background: "white",
            borderRadius: "20px",
            width: "100%",
            maxWidth: "900px",
            maxHeight: "85vh",
            overflowY: "auto",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            border: "1px solid #e2e8f0"
          }}>
            {/* Modal Header */}
            <div style={{
              padding: "1.5rem 2rem",
              borderBottom: "1px solid #e2e8f0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              position: "sticky",
              top: 0,
              background: "white",
              zIndex: 10
            }}>
              <div>
                <h3 style={{ fontSize: "1.35rem", color: "#1e293b", fontWeight: 700, margin: 0 }}>
                  {studentDetail?.name || "Student Progress Profile"}
                </h3>
                <p style={{ color: "#64748b", margin: "0.2rem 0 0", fontSize: "0.85rem" }}>
                  {studentDetail?.email} &bull; Role: {studentDetail?.role}
                </p>
              </div>
              <button
                onClick={closeModal}
                style={{
                  background: "#f1f5f9",
                  border: "none",
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  cursor: "pointer",
                  fontSize: "1.1rem",
                  color: "#64748b",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: "2rem" }}>
              {detailLoading ? (
                <div style={{ textAlign: "center", padding: "3rem", color: "#64748b" }}>
                  <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>⏳</div>
                  <p>Loading syllabus completion and video playback telemetry...</p>
                </div>
              ) : !studentDetail || studentDetail.courses.length === 0 ? (
                <div style={{ textAlign: "center", padding: "3rem", color: "#94a3b8" }}>
                  No enrolled courses or lesson progress recorded for this student yet.
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
                  {studentDetail.courses.map((c) => (
                    <div key={c.courseId} style={{
                      border: "1px solid #e2e8f0",
                      borderRadius: "16px",
                      overflow: "hidden",
                      background: "#fafafa"
                    }}>
                      {/* Course Header Banner */}
                      <div style={{
                        padding: "1.25rem 1.5rem",
                        background: "white",
                        borderBottom: "1px solid #e2e8f0",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "1rem"
                      }}>
                        <div>
                          <h4 style={{ fontSize: "1.15rem", color: "#1e293b", fontWeight: 700, margin: 0 }}>
                            {c.courseTitle}
                          </h4>
                          {c.enrolledAt && (
                            <span style={{ fontSize: "0.75rem", color: "#94a3b8" }}>
                              Enrolled: {new Date(c.enrolledAt).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                          <span style={{
                            background: c.progressPercentage === 100 ? "#ecfdf5" : "rgba(59, 130, 246, 0.1)",
                            color: c.progressPercentage === 100 ? "#047857" : "#1d4ed8",
                            padding: "0.3rem 0.75rem",
                            borderRadius: "99px",
                            fontWeight: 700,
                            fontSize: "0.85rem"
                          }}>
                            {c.progressPercentage}% Complete ({c.completedLessons}/{c.totalLessons} Lessons)
                          </span>
                        </div>
                      </div>

                      {/* Lesson Checklist Table */}
                      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
                        <thead>
                          <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0", textAlign: "left", color: "#64748b" }}>
                            <th style={{ padding: "0.75rem 1.5rem" }}>Lesson Title</th>
                            <th style={{ padding: "0.75rem 1.5rem" }}>Type</th>
                            <th style={{ padding: "0.75rem 1.5rem" }}>Status</th>
                            <th style={{ padding: "0.75rem 1.5rem" }}>Watch Position</th>
                            <th style={{ padding: "0.75rem 1.5rem", textAlign: "right" }}>Last Active</th>
                          </tr>
                        </thead>
                        <tbody>
                          {c.lessons.map((lesson) => {
                            const minutes = Math.floor(lesson.lastPositionSeconds / 60);
                            const seconds = lesson.lastPositionSeconds % 60;
                            const formattedPosition = `${minutes}m ${seconds < 10 ? "0" : ""}${seconds}s`;

                            return (
                              <tr key={lesson.lessonId} style={{ borderBottom: "1px solid #f1f5f9", background: "white" }}>
                                <td style={{ padding: "0.85rem 1.5rem", fontWeight: 600, color: "#334155" }}>
                                  {lesson.title}
                                </td>
                                <td style={{ padding: "0.85rem 1.5rem" }}>
                                  <span style={{
                                    fontSize: "0.75rem",
                                    fontWeight: 600,
                                    color: lesson.isLiveClass ? "#2563eb" : "#64748b",
                                    background: lesson.isLiveClass ? "#eff6ff" : "#f1f5f9",
                                    padding: "0.2rem 0.5rem",
                                    borderRadius: "4px"
                                  }}>
                                    {lesson.isLiveClass ? "📹 Live Zoom" : "▶ Video Lecture"}
                                  </span>
                                </td>
                                <td style={{ padding: "0.85rem 1.5rem" }}>
                                  {lesson.isCompleted ? (
                                    <span style={{ color: "#059669", fontWeight: 700, background: "#ecfdf5", padding: "0.2rem 0.6rem", borderRadius: "99px", display: "inline-flex", alignItems: "center", gap: "0.3rem" }}>
                                      ✓ Completed
                                    </span>
                                  ) : lesson.lastPositionSeconds > 0 ? (
                                    <span style={{ color: "#d97706", fontWeight: 600, background: "#fef3c7", padding: "0.2rem 0.6rem", borderRadius: "99px" }}>
                                      ⏳ In Progress
                                    </span>
                                  ) : (
                                    <span style={{ color: "#94a3b8" }}>○ Not Started</span>
                                  )}
                                </td>
                                <td style={{ padding: "0.85rem 1.5rem", color: lesson.lastPositionSeconds > 0 ? "#1e293b" : "#94a3b8" }}>
                                  {lesson.lastPositionSeconds > 0 ? formattedPosition : "—"}
                                </td>
                                <td style={{ padding: "0.85rem 1.5rem", textAlign: "right", color: "#64748b" }}>
                                  {lesson.updatedAt ? new Date(lesson.updatedAt).toLocaleString() : "—"}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div style={{ padding: "1.25rem 2rem", borderTop: "1px solid #e2e8f0", background: "#f8fafc", textAlign: "right" }}>
              <button
                onClick={closeModal}
                style={{
                  background: "#1e293b",
                  color: "white",
                  padding: "0.6rem 1.25rem",
                  borderRadius: "8px",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  cursor: "pointer",
                  border: "none"
                }}
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
