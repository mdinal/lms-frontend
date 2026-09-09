"use client";

import { useState, useEffect, use } from "react";
import api from "@/lib/api";
import Link from "next/link";

interface LessonItem {
  id: string;
  title: string;
  videoS3Key?: string;
  zoomJoinUrl?: string;
  zoomMeetingId?: string;
  scheduledAt?: string;
}

export default function CourseDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const courseId = resolvedParams.id;

  const [course, setCourse] = useState<any>(null);
  const [lessons, setLessons] = useState<LessonItem[]>([]);
  const [loading, setLoading] = useState(true);

  // New Lesson form state
  const [newTitle, setNewTitle] = useState("");
  const [lessonType, setLessonType] = useState<"VIDEO" | "LIVE_CLASS">("VIDEO");
  const [scheduledAt, setScheduledAt] = useState("");
  const [zoomDuration, setZoomDuration] = useState("60");
  const [creatingLesson, setCreatingLesson] = useState(false);
  const [uploadingLessonId, setUploadingLessonId] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState("");

  const fetchCourseAndLessons = async () => {
    try {
      const [courseRes, lessonsRes] = await Promise.all([
        api.get(`/api/courses/${courseId}/details`),
        api.get(`/api/lessons/course/${courseId}`)
      ]);
      setCourse(courseRes.data);
      setLessons(lessonsRes.data);
    } catch (err) {
      console.error("Failed to load course details", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourseAndLessons();
  }, [courseId]);

  const handleCreateLesson = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    setCreatingLesson(true);
    setStatusMessage("");

    try {
      // 1. Create base lesson
      const res = await api.post(`/api/lessons/course/${courseId}`, {
        title: newTitle.trim(),
        scheduledAt: scheduledAt || null
      });
      const createdId = res.data.id;

      // 2. If it's a Live Class, automatically schedule Zoom meeting
      if (lessonType === "LIVE_CLASS") {
        await api.post(`/api/lessons/${createdId}/live-class?topic=${encodeURIComponent(newTitle)}&duration=${zoomDuration}`);
      }

      setNewTitle("");
      setScheduledAt("");
      setStatusMessage("Lesson created successfully!");
      fetchCourseAndLessons();
    } catch (err: any) {
      setStatusMessage(err.response?.data?.message || err.response?.data || "Failed to create lesson.");
    } finally {
      setCreatingLesson(false);
    }
  };

  const handleDeleteLesson = async (lessonId: string) => {
    if (!confirm("Are you sure you want to delete this lesson?")) return;
    try {
      await api.delete(`/api/lessons/${lessonId}`);
      fetchCourseAndLessons();
    } catch (err) {
      alert("Failed to delete lesson.");
    }
  };

  const handleUploadVideo = async (lessonId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];

    try {
      setUploadingLessonId(lessonId);
      setStatusMessage(`Getting upload link for ${file.name}...`);

      const urlRes = await api.get(`/api/lessons/${lessonId}/presigned-url?filename=${encodeURIComponent(file.name)}&contentType=${encodeURIComponent(file.type)}`);
      const { presignedUrl, s3Key } = urlRes.data;

      setStatusMessage("Uploading video directly to S3...");
      const uploadRes = await fetch(presignedUrl, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type }
      });

      if (!uploadRes.ok) throw new Error("S3 direct upload failed");

      setStatusMessage("Starting AWS MediaConvert transcoding...");
      await api.post(`/api/lessons/${lessonId}/transcode`, { s3Key });

      setStatusMessage("Upload complete! Transcoding is in progress.");
      fetchCourseAndLessons();
    } catch (err: any) {
      console.error(err);
      setStatusMessage("Video upload failed. Please try again.");
    } finally {
      setUploadingLessonId(null);
    }
  };

  const handleAttachRecordingUrl = async (lessonId: string) => {
    const url = prompt("Enter Zoom Cloud Recording MP4 URL or S3 Key:");
    if (!url || !url.trim()) return;

    try {
      setStatusMessage("Attaching recording...");
      const isS3Key = !url.startsWith("http://") && !url.startsWith("https://");
      const payload = isS3Key ? { videoS3Key: url.trim() } : { recordingUrl: url.trim() };
      await api.post(`/api/lessons/${lessonId}/attach-recording`, payload);
      setStatusMessage("Recording attached successfully!");
      fetchCourseAndLessons();
    } catch (err: any) {
      console.error(err);
      setStatusMessage(err.response?.data?.message || err.response?.data || "Failed to attach recording.");
    }
  };

  if (loading) return <div style={{ padding: "3rem" }}>Loading course curriculum...</div>;

  return (
    <div>
      <div style={{ marginBottom: "2rem" }}>
        <Link href="/admin/courses" style={{ color: "#64748b", textDecoration: "none", fontSize: "0.875rem", display: "inline-block", marginBottom: "1rem" }}>
          &larr; Back to Courses
        </Link>
        <h1 style={{ fontSize: "2rem", color: "#1e293b", fontWeight: 700, margin: "0 0 0.5rem 0" }}>
          {course?.title || "Manage Course"}
        </h1>
        <p style={{ color: "#64748b", margin: 0 }}>Course ID: {courseId}</p>
      </div>

      {statusMessage && (
        <div style={{ padding: "1rem 1.5rem", borderRadius: "10px", backgroundColor: "#eff6ff", color: "#1d4ed8", border: "1px solid #bfdbfe", marginBottom: "2rem" }}>
          {statusMessage}
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginBottom: "3rem" }}>
        
        {/* Add Lesson Form */}
        <div style={{ background: "white", padding: "2rem", borderRadius: "16px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)", border: "1px solid #e2e8f0" }}>
          <h2 style={{ fontSize: "1.25rem", color: "#1e293b", fontWeight: 600, marginBottom: "1.5rem" }}>
            + Add New Lesson
          </h2>

          <form onSubmit={handleCreateLesson} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, color: "#475569", marginBottom: "0.5rem" }}>Lesson Title</label>
              <input 
                type="text" 
                required 
                placeholder="e.g. Chapter 1: Introduction to Mechanics"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid #cbd5e1" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, color: "#475569", marginBottom: "0.5rem" }}>Lesson Type</label>
              <div style={{ display: "flex", gap: "1rem" }}>
                <button
                  type="button"
                  onClick={() => setLessonType("VIDEO")}
                  style={{
                    flex: 1,
                    padding: "0.75rem",
                    borderRadius: "8px",
                    border: lessonType === "VIDEO" ? "2px solid #2D8CFF" : "1px solid #cbd5e1",
                    background: lessonType === "VIDEO" ? "#eff6ff" : "white",
                    fontWeight: 600,
                    cursor: "pointer"
                  }}
                >
                  ▶️ Recorded Video
                </button>
                <button
                  type="button"
                  onClick={() => setLessonType("LIVE_CLASS")}
                  style={{
                    flex: 1,
                    padding: "0.75rem",
                    borderRadius: "8px",
                    border: lessonType === "LIVE_CLASS" ? "2px solid #2D8CFF" : "1px solid #cbd5e1",
                    background: lessonType === "LIVE_CLASS" ? "#eff6ff" : "white",
                    fontWeight: 600,
                    cursor: "pointer"
                  }}
                >
                  📹 Live Zoom Class
                </button>
              </div>
            </div>

            {lessonType === "LIVE_CLASS" && (
              <div>
                <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, color: "#475569", marginBottom: "0.5rem" }}>Duration (Minutes)</label>
                <select 
                  value={zoomDuration}
                  onChange={e => setZoomDuration(e.target.value)}
                  style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid #cbd5e1", background: "white" }}
                >
                  <option value="30">30 minutes</option>
                  <option value="60">60 minutes (1 hour)</option>
                  <option value="90">90 minutes (1.5 hours)</option>
                  <option value="120">120 minutes (2 hours)</option>
                </select>
              </div>
            )}

            <div>
              <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, color: "#475569", marginBottom: "0.5rem" }}>Schedule Date & Time (Optional)</label>
              <input 
                type="datetime-local"
                value={scheduledAt}
                onChange={e => setScheduledAt(e.target.value)}
                style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid #cbd5e1" }}
              />
            </div>

            <button 
              type="submit"
              disabled={creatingLesson}
              style={{
                marginTop: "0.5rem",
                padding: "0.85rem",
                background: "#1a365d",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontWeight: 700,
                cursor: creatingLesson ? "not-allowed" : "pointer"
              }}
            >
              {creatingLesson ? "Creating..." : "Save Lesson"}
            </button>
          </form>
        </div>

        {/* Course Info Card */}
        <div style={{ background: "white", padding: "2rem", borderRadius: "16px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)", border: "1px solid #e2e8f0" }}>
          <h2 style={{ fontSize: "1.25rem", color: "#1e293b", fontWeight: 600, marginBottom: "1rem" }}>
            Course Overview
          </h2>
          <p style={{ color: "#64748b", marginBottom: "1.5rem", lineHeight: 1.6 }}>{course?.description || "No description provided."}</p>
          <div style={{ display: "flex", gap: "2rem", borderTop: "1px solid #f1f5f9", paddingTop: "1.5rem" }}>
            <div>
              <span style={{ fontSize: "0.85rem", color: "#94a3b8" }}>Price</span>
              <p style={{ fontSize: "1.5rem", fontWeight: 700, color: "#1e293b", margin: 0 }}>${course?.price?.toFixed(2) || "0.00"}</p>
            </div>
            <div>
              <span style={{ fontSize: "0.85rem", color: "#94a3b8" }}>Total Lessons</span>
              <p style={{ fontSize: "1.5rem", fontWeight: 700, color: "#1e293b", margin: 0 }}>{lessons.length}</p>
            </div>
          </div>
        </div>

      </div>

      {/* Curriculum Table */}
      <div style={{ background: "white", borderRadius: "16px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)", border: "1px solid #e2e8f0", overflow: "hidden" }}>
        <div style={{ padding: "1.5rem 2rem", borderBottom: "1px solid #e2e8f0" }}>
          <h2 style={{ fontSize: "1.25rem", color: "#1e293b", fontWeight: 700, margin: 0 }}>Curriculum & Materials</h2>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0", textAlign: "left" }}>
              <th style={{ padding: "1rem 1.5rem", color: "#64748b", fontWeight: 600, fontSize: "0.875rem" }}>Lesson</th>
              <th style={{ padding: "1rem 1.5rem", color: "#64748b", fontWeight: 600, fontSize: "0.875rem" }}>Type</th>
              <th style={{ padding: "1rem 1.5rem", color: "#64748b", fontWeight: 600, fontSize: "0.875rem" }}>Media / Link</th>
              <th style={{ padding: "1rem 1.5rem", color: "#64748b", fontWeight: 600, fontSize: "0.875rem", textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {lessons.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ padding: "3rem", textAlign: "center", color: "#94a3b8" }}>
                  No lessons added yet. Use the form above to add your first lecture or live class.
                </td>
              </tr>
            ) : (
              lessons.map(lesson => {
                const isLive = !!lesson.zoomJoinUrl;
                const isUploading = uploadingLessonId === lesson.id;

                return (
                  <tr key={lesson.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={{ padding: "1.25rem 1.5rem", fontWeight: 600, color: "#1e293b" }}>
                      {lesson.title}
                      {lesson.scheduledAt && (
                        <div style={{ fontSize: "0.75rem", color: "#94a3b8", marginTop: "0.25rem" }}>
                          Scheduled: {new Date(lesson.scheduledAt).toLocaleString()}
                        </div>
                      )}
                    </td>
                    <td style={{ padding: "1.25rem 1.5rem" }}>
                      <span style={{
                        padding: "0.25rem 0.75rem",
                        borderRadius: "99px",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        background: isLive ? "rgba(45, 140, 255, 0.1)" : "#f1f5f9",
                        color: isLive ? "#2D8CFF" : "#475569"
                      }}>
                        {isLive ? "Live Zoom" : "Video Lecture"}
                      </span>
                    </td>
                    <td style={{ padding: "1.25rem 1.5rem" }}>
                      {isLive ? (
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                          <a href={lesson.zoomJoinUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#2D8CFF", textDecoration: "none", fontWeight: 600, fontSize: "0.875rem" }}>
                            Join Meeting ({lesson.zoomMeetingId}) &rarr;
                          </a>
                          {lesson.videoS3Key ? (
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                              <span style={{ color: "#10b981", fontSize: "0.8125rem", fontWeight: 600 }}>
                                ✓ Recording Ready
                              </span>
                              <label style={{ cursor: "pointer", color: "#64748b", fontSize: "0.75rem", textDecoration: "underline" }}>
                                {isUploading ? "Replacing..." : "Replace File"}
                                <input 
                                  type="file" 
                                  accept="video/*" 
                                  style={{ display: "none" }} 
                                  onChange={(e) => handleUploadVideo(lesson.id, e)}
                                  disabled={isUploading}
                                />
                              </label>
                            </div>
                          ) : (
                            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                              <label style={{ cursor: "pointer", color: "#0d6efd", fontSize: "0.8125rem", fontWeight: 600 }}>
                                {isUploading ? "Uploading..." : "📹 + Upload Recording"}
                                <input 
                                  type="file" 
                                  accept="video/*" 
                                  style={{ display: "none" }} 
                                  onChange={(e) => handleUploadVideo(lesson.id, e)}
                                  disabled={isUploading}
                                />
                              </label>
                              <span style={{ color: "#cbd5e1" }}>|</span>
                              <button
                                type="button"
                                onClick={() => handleAttachRecordingUrl(lesson.id)}
                                style={{ background: "none", border: "none", padding: 0, color: "#64748b", fontSize: "0.8125rem", cursor: "pointer", textDecoration: "underline" }}
                              >
                                Link URL
                              </button>
                            </div>
                          )}
                        </div>
                      ) : lesson.videoS3Key ? (
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          <span style={{ color: "#10b981", fontSize: "0.875rem", fontWeight: 600 }}>
                            ✓ HLS Ready
                          </span>
                          <label style={{ cursor: "pointer", color: "#64748b", fontSize: "0.75rem", textDecoration: "underline" }}>
                            {isUploading ? "Replacing..." : "Replace"}
                            <input 
                              type="file" 
                              accept="video/*" 
                              style={{ display: "none" }} 
                              onChange={(e) => handleUploadVideo(lesson.id, e)}
                              disabled={isUploading}
                            />
                          </label>
                        </div>
                      ) : (
                        <label style={{ cursor: "pointer", color: "#0d6efd", fontSize: "0.875rem", fontWeight: 600 }}>
                          {isUploading ? "Uploading..." : "+ Upload Video"}
                          <input 
                            type="file" 
                            accept="video/*" 
                            style={{ display: "none" }} 
                            onChange={(e) => handleUploadVideo(lesson.id, e)}
                            disabled={isUploading}
                          />
                        </label>
                      )}
                    </td>
                    <td style={{ padding: "1.25rem 1.5rem", textAlign: "right" }}>
                      <button 
                        onClick={() => handleDeleteLesson(lesson.id)}
                        style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontWeight: 600, fontSize: "0.875rem" }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
