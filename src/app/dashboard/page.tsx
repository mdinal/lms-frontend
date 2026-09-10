"use client";

import styles from "./dashboard.module.css";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function StudentDashboard() {
  const [courses, setCourses] = useState<any[]>([]);
  const [progressMap, setProgressMap] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [instituteName, setInstituteName] = useState("The");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const host = window.location.hostname;
      if (host && !host.includes("localhost")) {
        setInstituteName(host.split(".")[0].toUpperCase());
      }
    }

    Promise.all([
      api.get("/api/courses"),
      api.get("/api/progress/all").catch(() => ({ data: [] }))
    ])
      .then(([coursesRes, progressRes]) => {
        const enrolledCourses = coursesRes.data.filter((c: any) => c.enrolled === true);
        setCourses(enrolledCourses);

        const pMap: Record<string, any> = {};
        if (Array.isArray(progressRes.data)) {
          progressRes.data.forEach((p: any) => {
            pMap[p.courseId] = p;
          });
        }
        setProgressMap(pMap);
      })
      .catch((err) => {
        console.error("Failed to load dashboard data:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <ProtectedRoute>
      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <div className={styles.logo} style={{ marginBottom: "2rem" }}>
            <Image src="/logo.jpeg" alt="LMS Logo" width={120} height={32} style={{ objectFit: "contain" }} />
          </div>
          <nav className={styles.nav}>
            <Link href="/dashboard" className={styles.activeLink}>My Courses</Link>
            <Link href="/dashboard/payments" className={styles.navLink}>Payments</Link>
            <Link href="/dashboard/settings" className={styles.navLink}>Settings</Link>
          </nav>
        </aside>
        
        <main className={styles.mainContent}>
          <header className={styles.header}>
            <div>
              <h1 className={styles.pageTitle}>My Learning Portal</h1>
              <p style={{ color: "#64748b", marginTop: "0.25rem", fontSize: "0.9rem" }}>
                Track your active lecture progress, completed modules, and upcoming classes.
              </p>
            </div>
            <div className={styles.userProfile}>Student</div>
          </header>

          <section className={styles.grid}>
            {loading ? (
              <div style={{ color: "#64748b", padding: "2rem" }}>Loading enrolled courses...</div>
            ) : courses.length > 0 ? (
              courses.map((course: any) => {
                const prog = progressMap[course.id];
                const pct = prog?.progressPercentage ?? 0;
                const completed = prog?.completedLessons ?? 0;
                const total = prog?.totalLessons ?? 0;
                const isComplete = pct === 100;

                return (
                  <div key={course.id} className={styles.courseCard}>
                    <div className={styles.courseThumb} style={{
                      background: isComplete 
                        ? "linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(5, 150, 105, 0.25))"
                        : "linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2))",
                      display: "flex",
                      alignItems: "flex-end",
                      padding: "1rem"
                    }}>
                      {isComplete && (
                        <span style={{ background: "#10b981", color: "white", padding: "0.25rem 0.65rem", borderRadius: "99px", fontSize: "0.75rem", fontWeight: 700 }}>
                          ✓ 100% Completed
                        </span>
                      )}
                    </div>
                    <div className={styles.courseInfo}>
                      <h3>{course.title}</h3>
                      <p>{course.description}</p>

                      {/* Progress Bar & Tracking Metrics */}
                      <div style={{ marginBottom: "1.25rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", color: "#64748b", marginBottom: "0.4rem", fontWeight: 600 }}>
                          <span>{pct}% Complete</span>
                          <span>{completed}/{total} Lessons</span>
                        </div>
                        <div style={{ width: "100%", height: "8px", background: "#f1f5f9", borderRadius: "99px", overflow: "hidden" }}>
                          <div style={{
                            width: `${pct}%`,
                            height: "100%",
                            background: isComplete ? "#10b981" : "linear-gradient(90deg, #3b82f6, #6366f1)",
                            transition: "width 0.4s ease",
                            borderRadius: "99px"
                          }}></div>
                        </div>
                      </div>

                      <Link 
                        href={`/dashboard/courses/${course.id}`} 
                        className={styles.watchBtn} 
                        style={{ 
                          textDecoration: "none", 
                          textAlign: "center", 
                          display: "block",
                          background: isComplete ? "rgba(16, 185, 129, 0.1)" : pct > 0 ? "rgba(59, 130, 246, 0.1)" : undefined,
                          borderColor: isComplete ? "#10b981" : pct > 0 ? "#3b82f6" : undefined,
                          color: isComplete ? "#047857" : pct > 0 ? "#1d4ed8" : undefined
                        }}
                      >
                        {isComplete ? "Review Course Materials →" : pct > 0 ? "Continue Learning →" : "Start Course →"}
                      </Link>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className={styles.courseCard}>
                <div className={styles.courseInfo}>
                  <h3>No courses found.</h3>
                  <p>You haven't enrolled in any courses yet.</p>
                  <Link href="/courses" style={{ color: "#2563eb", fontWeight: 600, fontSize: "0.9rem", textDecoration: "none" }}>
                    Explore Available Courses &rarr;
                  </Link>
                </div>
              </div>
            )}
          </section>
        </main>
      </div>
    </ProtectedRoute>
  );
}
