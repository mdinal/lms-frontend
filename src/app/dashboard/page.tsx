"use client";

import styles from "./dashboard.module.css";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function StudentDashboard() {
  const [courses, setCourses] = useState<any[]>([]);
  const [instituteName, setInstituteName] = useState("The");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const host = window.location.hostname;
      if (host && !host.includes("localhost")) {
        setInstituteName(host.split(".")[0].toUpperCase());
      }
    }

    // Fetch courses from the backend
    api.get("/api/courses")
      .then((res) => {
        // Only show courses the student is actually enrolled in
        const enrolledCourses = res.data.filter((c: any) => c.enrolled === true);
        setCourses(enrolledCourses);
      })
      .catch((err) => {
        console.error("Failed to fetch courses:", err);
      });
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
            <h1 className={styles.pageTitle}>My Learning Portal</h1>
            <div className={styles.userProfile}>Student</div>
          </header>

          <section className={styles.grid}>
            {courses.length > 0 ? (
              courses.map((course: any) => (
                <div key={course.id} className={styles.courseCard}>
                  <div className={styles.courseThumb}></div>
                  <div className={styles.courseInfo}>
                    <h3>{course.title}</h3>
                    <p>{course.description}</p>
                    <Link href={`/dashboard/courses/${course.id}`} className={styles.watchBtn} style={{ textDecoration: "none", textAlign: "center", display: "inline-block" }}>
                      View Course &rarr;
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.courseCard}>
                <div className={styles.courseInfo}>
                  <h3>No courses found.</h3>
                  <p>You haven't purchased any courses yet.</p>
                </div>
              </div>
            )}
          </section>
        </main>
      </div>
    </ProtectedRoute>
  );
}
