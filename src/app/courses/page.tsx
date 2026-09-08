"use client";

import mainStyles from "../page.module.css";
import Link from "next/link";
import Image from "next/image";

import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function CoursesPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/courses")
      .then((res) => {
        setCourses(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch courses:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className={mainStyles.main}>
      <div className={mainStyles.backgroundGlow}></div>
      
      {/* Navigation */}
      <nav className={mainStyles.navbar}>
        <div className={mainStyles.logo}>
          <Link href="/">
            <Image src="/logo.jpeg" alt="Cambridge Success Centre" width={220} height={60} style={{ objectFit: "contain" }} priority />
          </Link>
        </div>
        <div className={mainStyles.navLinks}>
          <Link href="/courses" className={mainStyles.navItem} style={{ color: "#1a365d", fontWeight: "bold" }}>Courses</Link>
          <Link href="/about" className={mainStyles.navItem}>About Us</Link>
          <div className={mainStyles.navDivider}></div>
          <Link href="/login" className={mainStyles.loginBtn}>Sign In</Link>
          <Link href="/register" className={mainStyles.registerBtn}>Get Started</Link>
        </div>
      </nav>

      <section style={{ padding: "6rem 5% 8rem", position: "relative", zIndex: 10, maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <h1 style={{ fontSize: "3rem", color: "#1a365d", marginBottom: "1rem", fontWeight: 800 }}>Our Programs</h1>
          <p style={{ fontSize: "1.25rem", color: "#64748b", maxWidth: "600px", margin: "0 auto" }}>
            Explore our world-class curriculum designed to elevate your academic and professional journey.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "2rem" }}>
          {loading ? (
            <div style={{ textAlign: "center", gridColumn: "1 / -1", color: "#1a365d", padding: "4rem" }}>Loading available courses...</div>
          ) : courses.map(course => (
            <div key={course.id} style={{
              background: "rgba(255, 255, 255, 0.7)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.8)",
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "0 10px 30px rgba(0,0,0,0.03)",
              transition: "transform 0.3s ease",
              display: "flex",
              flexDirection: "column"
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-8px)"}
            onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}>
              
              <div style={{ height: "160px", background: "linear-gradient(135deg, #1a365d 0%, #315891 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "4rem" }}>
                📚
              </div>
              
              <div style={{ padding: "2rem", flexGrow: 1, display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#d4af37", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>
                  By {course.tutorName}
                </span>
                <h3 style={{ fontSize: "1.35rem", color: "#1a365d", marginBottom: "1rem", fontWeight: 700, lineHeight: 1.3 }}>
                  {course.title}
                </h3>
                
                <p style={{ display: "flex", gap: "1rem", marginBottom: "2rem", color: "#64748b", fontSize: "0.9rem", flexGrow: 1 }}>
                  {course.description}
                </p>
                
                {course.enrolled ? (
                  <Link href="/dashboard" style={{
                    marginTop: "auto",
                    display: "block",
                    textAlign: "center",
                    padding: "0.75rem",
                    background: "#d1e7dd",
                    color: "#0a3622",
                    fontWeight: 600,
                    borderRadius: "10px",
                    textDecoration: "none",
                    border: "1px solid #198754"
                  }}>Go to Course</Link>
                ) : (
                  <Link href={`/checkout/${course.id}`} style={{
                    marginTop: "auto",
                    display: "block",
                    textAlign: "center",
                    padding: "0.75rem",
                    background: "rgba(212, 175, 55, 0.1)",
                    color: "#b49126",
                    fontWeight: 600,
                    borderRadius: "10px",
                    textDecoration: "none",
                    border: "1px solid rgba(212, 175, 55, 0.2)"
                  }}>Enroll Now - ${course.price}</Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Footer */}
      <footer className={mainStyles.footer}>
        <div className={mainStyles.footerContent}>
          <div className={mainStyles.footerBrand}>
            <Image src="/logo.jpeg" alt="Cambridge Success Centre" width={180} height={50} style={{ objectFit: "contain" }} />
            <p>Empowering the next generation of leaders through accessible, world-class education.</p>
          </div>
          <div className={mainStyles.footerLinks}>
            <h4 style={{ color: "#1a365d", fontWeight: 600, marginBottom: "1.5rem" }}>Platform</h4>
            <Link href="/courses">All Courses</Link>
            <Link href="/instructors">Our Instructors</Link>
            <Link href="/pricing">Pricing</Link>
          </div>
          <div className={mainStyles.footerLinks}>
            <h4 style={{ color: "#1a365d", fontWeight: 600, marginBottom: "1.5rem" }}>Support</h4>
            <Link href="/help">Help Center</Link>
            <Link href="/terms">Terms of Service</Link>
            <Link href="/privacy">Privacy Policy</Link>
          </div>
        </div>
        <div className={mainStyles.footerBottom}>
          <p>&copy; {new Date().getFullYear()} Cambridge Success Centre. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
