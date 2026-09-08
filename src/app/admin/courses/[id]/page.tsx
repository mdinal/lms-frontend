"use client";

import { useState } from "react";
import api from "@/lib/api";
import Link from "next/link";

export default function CourseDetail({ params }: { params: { id: string } }) {
  const [topic, setTopic] = useState("");
  const [duration, setDuration] = useState("60");
  const [meetingUrl, setMeetingUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const scheduleZoom = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMeetingUrl("");

    try {
      // Create live class using the endpoint we built in LessonController
      const response = await api.post(`/api/lessons/${params.id}/live-class?topic=${encodeURIComponent(topic)}&duration=${duration}`);
      setMeetingUrl(response.data.startUrl); // Instructor needs the startUrl to host
    } catch (err: any) {
      setError(err.response?.data || "Failed to schedule Zoom class.");
    } finally {
      setLoading(false);
    }
  };

  const [uploadStatus, setUploadStatus] = useState("");

  const uploadVideo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    
    try {
      setUploadStatus("Getting secure upload link...");
      
      // 1. Get Presigned URL
      const urlResponse = await api.get(`/api/lessons/${params.id}/presigned-url?filename=${encodeURIComponent(file.name)}&contentType=${encodeURIComponent(file.type)}`);
      const { presignedUrl, s3Key } = urlResponse.data;

      // 2. Upload directly to S3
      setUploadStatus("Uploading directly to AWS S3...");
      const uploadResponse = await fetch(presignedUrl, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type
        }
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload to S3");
      }

      // 3. Trigger Transcoding
      setUploadStatus("Triggering MediaConvert transcoding...");
      await api.post(`/api/lessons/${params.id}/transcode`, { s3Key });
      
      setUploadStatus("Success! Video is processing.");
      setTimeout(() => setUploadStatus(""), 5000);
    } catch (err) {
      console.error(err);
      setUploadStatus("Error uploading video. Please try again.");
    }
  };

  return (
    <div>
      <div style={{ marginBottom: "2rem" }}>
        <Link href="/admin/courses" style={{ color: "#64748b", textDecoration: "none", fontSize: "0.875rem", display: "inline-block", marginBottom: "1rem" }}>
          &larr; Back to Courses
        </Link>
        <h1 style={{ fontSize: "2rem", color: "#1e293b", fontWeight: 700, margin: 0 }}>Manage Course</h1>
        <p style={{ color: "#64748b", margin: 0 }}>Course ID: {params.id}</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
        
        {/* Zoom Scheduling Card */}
        <div style={{ background: "white", padding: "2rem", borderRadius: "16px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)", border: "1px solid #e2e8f0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "rgba(45, 140, 255, 0.1)", color: "#2D8CFF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem" }}>📹</div>
            <div>
              <h2 style={{ fontSize: "1.25rem", color: "#1e293b", fontWeight: 600, margin: 0 }}>Schedule Live Class</h2>
              <p style={{ color: "#64748b", fontSize: "0.875rem", margin: 0 }}>Create a new Zoom meeting</p>
            </div>
          </div>

          <form onSubmit={scheduleZoom}>
            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, color: "#475569", marginBottom: "0.5rem" }}>Topic</label>
              <input 
                type="text" 
                required 
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Introduction to React"
                style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "1rem" }}
              />
            </div>
            
            <div style={{ marginBottom: "2rem" }}>
              <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, color: "#475569", marginBottom: "0.5rem" }}>Duration (minutes)</label>
              <select 
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "1rem", backgroundColor: "white" }}
              >
                <option value="30">30 minutes</option>
                <option value="45">45 minutes</option>
                <option value="60">1 hour</option>
                <option value="90">1.5 hours</option>
                <option value="120">2 hours</option>
              </select>
            </div>

            {error && <div style={{ padding: "1rem", backgroundColor: "#fee2e2", color: "#991b1b", borderRadius: "8px", marginBottom: "1.5rem", fontSize: "0.875rem" }}>{error}</div>}

            <button disabled={loading} type="submit" style={{ width: "100%", background: "#2D8CFF", color: "white", border: "none", padding: "1rem", borderRadius: "8px", fontWeight: 600, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1 }}>
              {loading ? "Scheduling..." : "Generate Zoom Link"}
            </button>
          </form>

          {meetingUrl && (
            <div style={{ marginTop: "2rem", padding: "1.5rem", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "12px" }}>
              <h3 style={{ fontSize: "1rem", color: "#166534", margin: "0 0 0.5rem 0" }}>Meeting Created!</h3>
              <p style={{ fontSize: "0.875rem", color: "#15803d", marginBottom: "1rem" }}>Click below to start the meeting as the Host.</p>
              <a href={meetingUrl} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", background: "#16a34a", color: "white", padding: "0.5rem 1rem", borderRadius: "6px", textDecoration: "none", fontSize: "0.875rem", fontWeight: 600 }}>
                Start Meeting Now
              </a>
            </div>
          )}
        </div>

        {/* Video Upload Card */}
        <div style={{ background: "white", padding: "2rem", borderRadius: "16px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)", border: "1px solid #e2e8f0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "rgba(212, 175, 55, 0.1)", color: "#d4af37", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem" }}>☁️</div>
            <div>
              <h2 style={{ fontSize: "1.25rem", color: "#1e293b", fontWeight: 600, margin: 0 }}>Upload Lecture</h2>
              <p style={{ color: "#64748b", fontSize: "0.875rem", margin: 0 }}>Secure HLS Video Streaming</p>
            </div>
          </div>

          <div style={{ border: "2px dashed #cbd5e1", borderRadius: "12px", padding: "3rem 2rem", textAlign: "center", backgroundColor: "#f8fafc" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📁</div>
            <h3 style={{ fontSize: "1.125rem", color: "#1e293b", margin: "0 0 0.5rem 0", fontWeight: 600 }}>Select a video file</h3>
            <p style={{ color: "#64748b", fontSize: "0.875rem", marginBottom: "2rem" }}>MP4, MOV up to 2GB</p>
            
            <label style={{ display: "inline-block", background: "white", color: "#1a365d", border: "1px solid #1a365d", padding: "0.75rem 1.5rem", borderRadius: "8px", fontWeight: 600, cursor: "pointer", marginBottom: "1rem" }}>
              Browse Files
              <input type="file" accept="video/*" style={{ display: "none" }} onChange={uploadVideo} />
            </label>
            
            {uploadStatus && (
              <div style={{ marginTop: "1rem", padding: "1rem", borderRadius: "8px", backgroundColor: uploadStatus.includes("Error") ? "#fee2e2" : uploadStatus.includes("Success") ? "#d1e7dd" : "#e0f2fe", color: uploadStatus.includes("Error") ? "#991b1b" : uploadStatus.includes("Success") ? "#0a3622" : "#0369a1", fontSize: "0.875rem", fontWeight: 500 }}>
                {uploadStatus}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
