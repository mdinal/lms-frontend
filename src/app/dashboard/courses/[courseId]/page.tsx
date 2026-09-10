"use client";

import { useEffect, useState, useRef, use } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import Link from "next/link";
import Hls from "hls.js";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function CoursePlayer({ params }: { params: Promise<{ courseId: string }> }) {
  const resolvedParams = use(params);
  const courseId = resolvedParams.courseId;

  const [courseData, setCourseData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeLesson, setActiveLesson] = useState<any>(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
  const [progressPercentage, setProgressPercentage] = useState<number>(0);
  const [lessonProgressMap, setLessonProgressMap] = useState<Record<string, any>>({});
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastHeartbeatTimeRef = useRef<number>(0);
  const router = useRouter();

  const fetchProgress = () => {
    api.get(`/api/progress/course/${courseId}`)
      .then(res => {
        setCompletedLessonIds(res.data.completedLessonIds || []);
        setProgressPercentage(res.data.progressPercentage || 0);
        setLessonProgressMap(res.data.lessonProgress || {});
      })
      .catch(err => console.error("Could not load progress", err));
  };

  const handleLoadedMetadata = () => {
    if (activeLesson && videoRef.current) {
      const saved = lessonProgressMap[activeLesson.id];
      const savedSeconds = saved?.lastPositionSeconds || 0;
      if (savedSeconds > 5 && videoRef.current.duration && savedSeconds < (videoRef.current.duration - 5)) {
        videoRef.current.currentTime = savedSeconds;
      }
    }
  };

  const handleTimeUpdate = () => {
    if (!activeLesson || !videoRef.current) return;
    const currentTime = Math.floor(videoRef.current.currentTime);
    const now = Date.now();

    // Heartbeat: save video playback position every 10 seconds
    if (now - lastHeartbeatTimeRef.current >= 10000 && currentTime > 0) {
      lastHeartbeatTimeRef.current = now;
      api.post(`/api/progress/lesson/${activeLesson.id}`, {
        lastPositionSeconds: currentTime
      }).then(() => {
        setLessonProgressMap(prev => ({
          ...prev,
          [activeLesson.id]: {
            ...(prev[activeLesson.id] || {}),
            lastPositionSeconds: currentTime
          }
        }));
      }).catch(e => console.error("Failed to save playback progress", e));
    }
  };

  const handleVideoEnded = async () => {
    if (!activeLesson) return;
    try {
      await api.post(`/api/progress/lesson/${activeLesson.id}`, {
        isCompleted: true,
        lastPositionSeconds: Math.floor(videoRef.current?.duration || 0)
      });
      fetchProgress();
    } catch (err) {
      console.error("Failed to auto-complete lesson", err);
    }
  };

  useEffect(() => {
    // Fetch course details and syllabus
    api.get(`/api/courses/${courseId}/details`)
      .then(res => {
        setCourseData(res.data);
        if (res.data.syllabus && res.data.syllabus.length > 0) {
          setActiveLesson(res.data.syllabus[0]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        const msg = err.response?.data?.message || (typeof err.response?.data === 'string' ? err.response?.data : null);
        setError(msg || "Failed to load course. You may not be enrolled.");
        setLoading(false);
      });

    fetchProgress();
  }, [courseId]);

  useEffect(() => {
    if (!activeLesson) return;

    const hasPlayableVideo = !!(activeLesson.videoS3Key || activeLesson.hasRecording);

    if (hasPlayableVideo) {
      api.get(`/api/lessons/${activeLesson.id}/stream`)
        .then(res => {
          setVideoUrl(res.data.streamUrl);
        })
        .catch(err => {
          console.error("Failed to load video stream", err);
          setVideoUrl("");
        });
    } else {
      setVideoUrl("");
    }
  }, [activeLesson]);

  useEffect(() => {
    if (videoUrl && videoRef.current) {
      const video = videoRef.current;
      
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(videoUrl);
        hls.attachMedia(video);
        return () => hls.destroy();
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = videoUrl;
      }
    }
  }, [videoUrl]);

  const toggleLessonCompletion = async () => {
    if (!activeLesson) return;
    const isCompleted = completedLessonIds.includes(activeLesson.id);
    try {
      await api.post(`/api/progress/lesson/${activeLesson.id}`, {
        isCompleted: !isCompleted
      });
      fetchProgress();
    } catch (err) {
      console.error("Failed to update progress", err);
    }
  };

  if (loading) return <div style={{ padding: "4rem", textAlign: "center", color: "#1a365d" }}>Loading Learning Portal...</div>;
  if (error) return <div style={{ padding: "4rem", textAlign: "center", color: "#b91c1c" }}>{error}</div>;
  if (!courseData) return <div style={{ padding: "4rem", textAlign: "center", color: "#1a365d" }}>Course not found.</div>;

  const isCurrentLessonCompleted = activeLesson && completedLessonIds.includes(activeLesson.id);

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
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.875rem" }}>
              <span style={{ color: "#cbd5e1" }}>Course Progress:</span>
              <div style={{ width: "100px", height: "8px", background: "rgba(255,255,255,0.2)", borderRadius: "99px", overflow: "hidden" }}>
                <div style={{ width: `${progressPercentage}%`, height: "100%", background: "#10b981", transition: "width 0.3s" }}></div>
              </div>
              <span style={{ fontWeight: 700, color: "#10b981" }}>{progressPercentage}%</span>
            </div>
          </div>

          {/* Player Container */}
          <div style={{ flex: "1", backgroundColor: "black", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {(activeLesson?.videoS3Key || activeLesson?.hasRecording || activeLesson?.type === "VIDEO") ? (
              videoUrl ? (
                <div style={{ width: "100%", height: "100%", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {activeLesson?.isLiveClass && (
                    <div style={{
                      position: "absolute",
                      top: "1rem",
                      left: "1rem",
                      zIndex: 10,
                      background: "rgba(15, 23, 42, 0.85)",
                      color: "#34d399",
                      padding: "0.4rem 0.85rem",
                      borderRadius: "8px",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      border: "1px solid rgba(52, 211, 153, 0.3)",
                      backdropFilter: "blur(6px)"
                    }}>
                      <span>📹</span> Live Class Recording
                    </div>
                  )}
                  <video 
                    ref={videoRef}
                    controls
                    onLoadedMetadata={handleLoadedMetadata}
                    onTimeUpdate={handleTimeUpdate}
                    onEnded={handleVideoEnded}
                    style={{ width: "100%", height: "100%", maxHeight: "100%", objectFit: "contain" }}
                  />
                </div>
              ) : (
                <div style={{ textAlign: "center", color: "#94a3b8", padding: "2rem" }}>
                  <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>⏳</div>
                  <h3>Video Processing</h3>
                  <p>This lecture video is either currently transcoding or pending upload.</p>
                </div>
              )
            ) : (activeLesson?.type === "LIVE_CLASS" || activeLesson?.isLiveClass) ? (
              (activeLesson?.scheduledAt && new Date(activeLesson.scheduledAt).getTime() + (90 * 60 * 1000) < Date.now()) ? (
                <div style={{ textAlign: "center", color: "white", padding: "4rem", maxWidth: "580px" }}>
                  <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>⏳</div>
                  <h2 style={{ fontSize: "1.75rem", marginBottom: "0.75rem" }}>Live Session Concluded</h2>
                  <p style={{ color: "#94a3b8", marginBottom: "1.5rem", lineHeight: "1.6" }}>
                    This live Zoom class has ended. The session recording is currently being processed and will be available to stream right here once ready.
                  </p>
                  {activeLesson.zoomJoinUrl && (
                    <a 
                      href={activeLesson.zoomJoinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: "inline-block", background: "rgba(255,255,255,0.1)", color: "#cbd5e1", padding: "0.6rem 1.25rem", borderRadius: "6px", fontSize: "0.875rem", textDecoration: "none" }}
                    >
                      Join Meeting Link (Backup)
                    </a>
                  )}
                </div>
              ) : (
                <div style={{ textAlign: "center", color: "white", padding: "4rem" }}>
                  <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>📹</div>
                  <h2 style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>Live Session: {activeLesson.title}</h2>
                  {activeLesson.scheduledAt && (
                    <p style={{ color: "#38bdf8", marginBottom: "1rem", fontWeight: 600 }}>
                      Scheduled: {new Date(activeLesson.scheduledAt).toLocaleString()}
                    </p>
                  )}
                  <p style={{ color: "#94a3b8", marginBottom: "2rem" }}>Join your instructor for the interactive live class.</p>
                  {activeLesson.zoomJoinUrl ? (
                    <a 
                      href={activeLesson.zoomJoinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: "inline-block", background: "#2D8CFF", color: "white", padding: "1rem 2rem", borderRadius: "8px", fontSize: "1.1rem", fontWeight: 700, textDecoration: "none", boxShadow: "0 10px 20px rgba(45, 140, 255, 0.3)" }}
                    >
                      Join Live Class on Zoom &rarr;
                    </a>
                  ) : (
                    <p style={{ color: "#f59e0b" }}>Meeting link has not been generated by the instructor yet.</p>
                  )}
                </div>
              )
            ) : (
              <div style={{ color: "white" }}>Select a lesson to begin.</div>
            )}
          </div>

          {/* Lesson Info Footer */}
          <div style={{ background: "white", padding: "1.5rem 2rem", borderTop: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.25rem" }}>
                <h2 style={{ fontSize: "1.25rem", color: "#1e293b", fontWeight: 700, margin: 0 }}>{activeLesson?.title}</h2>
                {activeLesson?.isLiveClass && (activeLesson?.videoS3Key || activeLesson?.hasRecording) && (
                  <span style={{ padding: "0.2rem 0.6rem", borderRadius: "6px", fontSize: "0.75rem", fontWeight: 600, background: "#ecfdf5", color: "#065f46" }}>
                    Recording Available
                  </span>
                )}
              </div>
              <p style={{ color: "#64748b", margin: 0, fontSize: "0.875rem" }}>Instructor: {courseData.tutorName}</p>
            </div>
            {activeLesson && (
              <button 
                onClick={toggleLessonCompletion}
                style={{
                  padding: "0.75rem 1.5rem",
                  borderRadius: "8px",
                  border: isCurrentLessonCompleted ? "1px solid #10b981" : "1px solid #cbd5e1",
                  background: isCurrentLessonCompleted ? "#ecfdf5" : "white",
                  color: isCurrentLessonCompleted ? "#065f46" : "#475569",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem"
                }}
              >
                <span>{isCurrentLessonCompleted ? "✓ Completed" : "○ Mark as Completed"}</span>
              </button>
            )}
          </div>
        </div>

        {/* Sidebar Syllabus */}
        <div style={{ width: "350px", background: "white", borderLeft: "1px solid #e2e8f0", display: "flex", flexDirection: "column", height: "100%" }}>
          <div style={{ padding: "1.5rem", borderBottom: "1px solid #e2e8f0", background: "#f8fafc" }}>
            <h2 style={{ fontSize: "1.1rem", color: "#1e293b", fontWeight: 700, margin: 0 }}>Course Content</h2>
            <p style={{ color: "#64748b", fontSize: "0.85rem", marginTop: "0.25rem" }}>{courseData.syllabus?.length || 0} Lessons</p>
          </div>
          
          <div style={{ overflowY: "auto", flex: "1" }}>
            {courseData.syllabus?.map((lesson: any) => {
              const isCompleted = completedLessonIds.includes(lesson.id);
              const isActive = activeLesson?.id === lesson.id;
              const hasRec = !!(lesson.videoS3Key || lesson.hasRecording);
              const isLive = !!(lesson.isLiveClass || lesson.type === "LIVE_CLASS" || lesson.zoomJoinUrl);

              return (
                <div 
                  key={lesson.id}
                  onClick={() => setActiveLesson(lesson)}
                  style={{ 
                    padding: "1.25rem 1.5rem", 
                    borderBottom: "1px solid #f1f5f9", 
                    cursor: "pointer",
                    backgroundColor: isActive ? "#eff6ff" : "white",
                    borderLeft: isActive ? "4px solid #3b82f6" : "4px solid transparent",
                    transition: "background 0.2s"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.25rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <span style={{ color: isLive ? "#2D8CFF" : "#64748b", fontSize: "1.1rem" }}>
                        {isLive ? (hasRec ? "🎬" : "📹") : "▶️"}
                      </span>
                      <h4 style={{ margin: 0, fontSize: "0.95rem", color: isActive ? "#1d4ed8" : "#334155", fontWeight: isActive ? 700 : 500 }}>
                        {lesson.title}
                      </h4>
                    </div>
                    {isCompleted ? (
                      <span style={{ color: "#10b981", fontSize: "0.75rem", fontWeight: 700, background: "#ecfdf5", padding: "0.2rem 0.6rem", borderRadius: "99px", border: "1px solid #a7f3d0" }}>
                        ✓ Done
                      </span>
                    ) : (lessonProgressMap[lesson.id]?.lastPositionSeconds > 5) ? (
                      <span style={{ color: "#b45309", fontSize: "0.75rem", fontWeight: 600, background: "#fef3c7", padding: "0.2rem 0.55rem", borderRadius: "99px", border: "1px solid #fde68a" }}>
                        {Math.floor(lessonProgressMap[lesson.id].lastPositionSeconds / 60)}m watched
                      </span>
                    ) : null}
                  </div>
                  <div style={{ paddingLeft: "2.1rem", fontSize: "0.8rem", color: "#94a3b8", display: "flex", justifyContent: "space-between" }}>
                    <span>{isLive ? (hasRec ? "Recorded Live Class" : "Live Class") : "Recorded Lecture"}</span>
                    {lesson.scheduledAt && (
                      <span>{new Date(lesson.scheduledAt).toLocaleDateString()}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </ProtectedRoute>
  );
}
