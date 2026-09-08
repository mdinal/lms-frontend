"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import Link from "next/link";
import Hls from "hls.js";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function CoursePlayer({ params }: { params: { courseId: string } }) {
  const [courseData, setCourseData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeLesson, setActiveLesson] = useState<any>(null);
  const [videoUrl, setVideoUrl] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();

  useEffect(() => {
    // Fetch course details and syllabus
    api.get(`/api/courses/${params.courseId}/details`)
      .then(res => {
        setCourseData(res.data);
        if (res.data.syllabus && res.data.syllabus.length > 0) {
          setActiveLesson(res.data.syllabus[0]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError("Failed to load course. You may not be enrolled.");
        setLoading(false);
      });
  }, [params.courseId]);

  useEffect(() => {
    // When active lesson changes, fetch stream or prep zoom
    if (!activeLesson) return;

    if (activeLesson.type === "VIDEO") {
      api.get(`/api/lessons/${activeLesson.id}/stream`)
        .then(res => {
          setVideoUrl(res.data.streamUrl);
        })
        .catch(err => console.error("Failed to load video stream"));
    } else {
      setVideoUrl("");
    }
  }, [activeLesson]);

  useEffect(() => {
    // Initialize HLS.js if videoUrl is present
    if (videoUrl && videoRef.current) {
      const video = videoRef.current;
      
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(videoUrl);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          // Optional: video.play();
        });
        
        return () => hls.destroy();
      } 
      // Fallback for Safari which supports HLS natively
      else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = videoUrl;
      }
    }
  }, [videoUrl]);

  if (loading) return <div style={{ padding: "4rem", textAlign: "center", color: "#1a365d" }}>Loading Learning Portal...</div>;
  if (error) return <div style={{ padding: "4rem", textAlign: "center", color: "#b91c1c" }}>{error}</div>;
  if (!courseData) return <div style={{ padding: "4rem", textAlign: "center", color: "#1a365d" }}>Course not found.</div>;

  return (
    <ProtectedRoute>
      <div style={{ display: "flex", height: "100vh", backgroundColor: "#f1f5f9" }}>
        
        {/* Main Content Area (Video/Zoom) */}
        <div style={{ flex: "1", display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>
          
          {/* Header */}
          <div style={{ background: "#1a365d", color: "white", padding: "1rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)", zIndex: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <Link href="/dashboard" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "0.875rem" }}>
                &larr; Dashboard
              </Link>
              <h1 style={{ fontSize: "1.25rem", fontWeight: 600, margin: 0 }}>{courseData.title}</h1>
            </div>
          </div>

          {/* Player Container */}
          <div style={{ flex: "1", backgroundColor: "black", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {activeLesson?.type === "VIDEO" ? (
              <video 
                ref={videoRef}
                controls
                style={{ width: "100%", height: "100%", maxHeight: "100%", objectFit: "contain" }}
              />
            ) : activeLesson?.type === "LIVE_CLASS" ? (
              <div style={{ textAlign: "center", color: "white", padding: "4rem" }}>
                <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>📹</div>
                <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Live Session: {activeLesson.title}</h2>
                <p style={{ color: "#94a3b8", marginBottom: "2rem" }}>Join your instructor for the interactive live class.</p>
                <button 
                  onClick={() => alert("Fetching Zoom Join URL... (In a real app, this opens the Zoom link)")}
                  style={{ background: "#2D8CFF", color: "white", border: "none", padding: "1rem 2rem", borderRadius: "8px", fontSize: "1.1rem", fontWeight: 700, cursor: "pointer" }}
                >
                  Join Live Class Now
                </button>
              </div>
            ) : (
              <div style={{ color: "white" }}>Select a lesson to begin.</div>
            )}
          </div>

          {/* Lesson Info Footer */}
          <div style={{ background: "white", padding: "2rem", borderTop: "1px solid #e2e8f0" }}>
            <h2 style={{ fontSize: "1.5rem", color: "#1e293b", fontWeight: 700, margin: "0 0 0.5rem 0" }}>{activeLesson?.title}</h2>
            <p style={{ color: "#64748b", margin: 0 }}>Instructor: {courseData.tutorName}</p>
          </div>
        </div>

        {/* Sidebar Syllabus */}
        <div style={{ width: "350px", background: "white", borderLeft: "1px solid #e2e8f0", display: "flex", flexDirection: "column", height: "100%" }}>
          <div style={{ padding: "1.5rem", borderBottom: "1px solid #e2e8f0", background: "#f8fafc" }}>
            <h2 style={{ fontSize: "1.1rem", color: "#1e293b", fontWeight: 700, margin: 0 }}>Course Content</h2>
            <p style={{ color: "#64748b", fontSize: "0.85rem", marginTop: "0.25rem" }}>{courseData.syllabus?.length || 0} Lessons</p>
          </div>
          
          <div style={{ overflowY: "auto", flex: "1" }}>
            {courseData.syllabus?.map((lesson: any, idx: number) => (
              <div 
                key={lesson.id}
                onClick={() => setActiveLesson(lesson)}
                style={{ 
                  padding: "1.25rem 1.5rem", 
                  borderBottom: "1px solid #f1f5f9", 
                  cursor: "pointer",
                  backgroundColor: activeLesson?.id === lesson.id ? "#eff6ff" : "white",
                  borderLeft: activeLesson?.id === lesson.id ? "4px solid #3b82f6" : "4px solid transparent",
                  transition: "background 0.2s"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.25rem" }}>
                  <span style={{ color: lesson.type === "VIDEO" ? "#64748b" : "#2D8CFF", fontSize: "1.1rem" }}>
                    {lesson.type === "VIDEO" ? "▶️" : "📹"}
                  </span>
                  <h4 style={{ margin: 0, fontSize: "0.95rem", color: activeLesson?.id === lesson.id ? "#1d4ed8" : "#334155", fontWeight: activeLesson?.id === lesson.id ? 700 : 500 }}>
                    {lesson.title}
                  </h4>
                </div>
                <div style={{ paddingLeft: "2.1rem", fontSize: "0.8rem", color: "#94a3b8", display: "flex", justifyContent: "space-between" }}>
                  <span>{lesson.type === "VIDEO" ? "Video" : "Live Session"}</span>
                  <span>{lesson.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </ProtectedRoute>
  );
}
