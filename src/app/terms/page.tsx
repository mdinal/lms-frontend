"use client";

import mainStyles from "../page.module.css";
import Link from "next/link";
import Image from "next/image";

export default function TermsPage() {
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
        <h1 style={{ fontSize: "2.5rem", color: "#1a365d", marginBottom: "2rem", fontWeight: 800 }}>Terms of Service</h1>
        <p style={{ marginBottom: "1.5rem" }}>Last Updated: September 2026</p>
        
        <h2 style={{ fontSize: "1.5rem", color: "#1a365d", marginTop: "2rem", marginBottom: "1rem" }}>1. Acceptance of Terms</h2>
        <p style={{ marginBottom: "1.5rem" }}>By accessing and using the Cambridge Success Centre platform, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.</p>
        
        <h2 style={{ fontSize: "1.5rem", color: "#1a365d", marginTop: "2rem", marginBottom: "1rem" }}>2. User Accounts</h2>
        <p style={{ marginBottom: "1.5rem" }}>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>

        <h2 style={{ fontSize: "1.5rem", color: "#1a365d", marginTop: "2rem", marginBottom: "1rem" }}>3. Intellectual Property</h2>
        <p style={{ marginBottom: "1.5rem" }}>All course materials, including videos, PDFs, and live session recordings, are the exclusive property of Cambridge Success Centre and may not be distributed or reproduced without written consent.</p>
      </section>
      
      <footer className={mainStyles.footer}>
        <div className={mainStyles.footerBottom} style={{ borderTop: "none" }}>
          <p>&copy; {new Date().getFullYear()} Cambridge Success Centre. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
