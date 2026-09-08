"use client";

import mainStyles from "../page.module.css";
import Link from "next/link";
import Image from "next/image";

export default function PrivacyPage() {
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
          <Link href="/about" className={mainStyles.navItem}>About Us</Link>
          <div className={mainStyles.navDivider}></div>
          <Link href="/login" className={mainStyles.loginBtn}>Sign In</Link>
          <Link href="/register" className={mainStyles.registerBtn}>Get Started</Link>
        </div>
      </nav>

      <section style={{ padding: "4rem 5% 8rem", position: "relative", zIndex: 10, maxWidth: "800px", margin: "0 auto", color: "#475569", lineHeight: 1.8 }}>
        <h1 style={{ fontSize: "2.5rem", color: "#1a365d", marginBottom: "2rem", fontWeight: 800 }}>Privacy Policy</h1>
        <p style={{ marginBottom: "1.5rem" }}>Last Updated: September 2026</p>
        
        <h2 style={{ fontSize: "1.5rem", color: "#1a365d", marginTop: "2rem", marginBottom: "1rem" }}>1. Information We Collect</h2>
        <p style={{ marginBottom: "1.5rem" }}>We collect information you provide directly to us, such as when you create an account, enroll in a course, or communicate with us. This may include your name, email address, and payment information.</p>
        
        <h2 style={{ fontSize: "1.5rem", color: "#1a365d", marginTop: "2rem", marginBottom: "1rem" }}>2. How We Use Your Information</h2>
        <p style={{ marginBottom: "1.5rem" }}>We use the information we collect to operate, maintain, and improve our services, process transactions, and communicate with you about your account and courses.</p>

        <h2 style={{ fontSize: "1.5rem", color: "#1a365d", marginTop: "2rem", marginBottom: "1rem" }}>3. Data Security</h2>
        <p style={{ marginBottom: "1.5rem" }}>We implement appropriate technical and organizational measures to protect your personal data against unauthorized or unlawful processing, accidental loss, destruction, or damage.</p>
      </section>
      
      <footer className={mainStyles.footer}>
        <div className={mainStyles.footerBottom} style={{ borderTop: "none" }}>
          <p>&copy; {new Date().getFullYear()} Cambridge Success Centre. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
