"use client";

import mainStyles from "../page.module.css";
import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
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
          <Link href="/courses" className={mainStyles.navItem}>Courses</Link>
          <Link href="/about" className={mainStyles.navItem} style={{ color: "#1a365d", fontWeight: "bold" }}>About Us</Link>
          <div className={mainStyles.navDivider}></div>
          <Link href="/login" className={mainStyles.loginBtn}>Sign In</Link>
          <Link href="/register" className={mainStyles.registerBtn}>Get Started</Link>
        </div>
      </nav>

      <section style={{ padding: "6rem 5% 8rem", position: "relative", zIndex: 10, maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "3.5rem", color: "#1a365d", marginBottom: "2rem", fontWeight: 800, textAlign: "center" }}>Our Story</h1>
        
        <div style={{
          background: "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.8)",
          borderRadius: "24px",
          padding: "4rem",
          boxShadow: "0 10px 30px rgba(0,0,0,0.03)",
          color: "#475569",
          fontSize: "1.125rem",
          lineHeight: 1.8
        }}>
          <p style={{ marginBottom: "1.5rem" }}>
            Founded on the principle that elite education should be accessible to everyone, <strong>Cambridge Success Centre</strong> was built to bridge the gap between traditional academia and the modern, fast-paced digital world.
          </p>
          <p style={{ marginBottom: "1.5rem" }}>
            We understand that <span style={{ color: "#d4af37", fontWeight: 600 }}>Academic Excellence</span> is only half the equation. Our holistic approach ensures that students also focus on <span style={{ color: "#d4af37", fontWeight: 600 }}>Personal Growth</span>—developing the soft skills, leadership traits, and resilience needed to succeed in any career.
          </p>
          <h2 style={{ fontSize: "2rem", color: "#1a365d", marginTop: "3rem", marginBottom: "1rem" }}>Our Mission</h2>
          <p>
            To empower the next generation of leaders by providing world-class, interactive, and flexible education that adapts to the needs of the modern learner. Through our state-of-the-art Learning Management System, we deliver unparalleled live interactions and high-quality on-demand content.
          </p>
        </div>
      </section>
      
      <footer className={mainStyles.footer}>
        <div className={mainStyles.footerBottom} style={{ borderTop: "none" }}>
          <p>&copy; {new Date().getFullYear()} Cambridge Success Centre. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
