"use client";

import mainStyles from "../page.module.css";
import Link from "next/link";
import Image from "next/image";

export default function PricingPage() {
  return (
    <main className={mainStyles.main}>
      <div className={mainStyles.backgroundGlow}></div>
      <div className={mainStyles.backgroundGlowSecondary}></div>
      
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

      <section style={{ padding: "6rem 5% 8rem", position: "relative", zIndex: 10, maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <h1 style={{ fontSize: "3rem", color: "#1a365d", marginBottom: "1rem", fontWeight: 800 }}>Simple, Transparent Pricing</h1>
          <p style={{ fontSize: "1.25rem", color: "#64748b", maxWidth: "600px", margin: "0 auto" }}>
            Invest in your future with our flexible subscription plans. Cancel anytime.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem", alignItems: "center" }}>
          
          {/* Basic Plan */}
          <div style={{
            background: "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.8)",
            borderRadius: "24px",
            padding: "3rem 2rem",
            boxShadow: "0 10px 30px rgba(0,0,0,0.03)",
          }}>
            <h3 style={{ fontSize: "1.5rem", color: "#1a365d", fontWeight: 700, marginBottom: "0.5rem" }}>Basic</h3>
            <div style={{ fontSize: "3rem", color: "#1a365d", fontWeight: 800, marginBottom: "1.5rem" }}>
              $29<span style={{ fontSize: "1.25rem", color: "#64748b", fontWeight: 400 }}>/mo</span>
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2rem", color: "#475569", lineHeight: 2.5 }}>
              <li>✅ Access to 5 active courses</li>
              <li>✅ Recorded video lectures</li>
              <li>❌ Live Zoom sessions</li>
              <li>❌ 1-on-1 Mentorship</li>
            </ul>
            <Link href="/register" style={{ display: "block", textAlign: "center", padding: "1rem", border: "2px solid #1a365d", color: "#1a365d", fontWeight: 600, borderRadius: "99px", textDecoration: "none" }}>Get Started</Link>
          </div>

          {/* Pro Plan */}
          <div style={{
            background: "#1a365d",
            borderRadius: "24px",
            padding: "4rem 2rem",
            boxShadow: "0 20px 40px rgba(26, 54, 93, 0.2)",
            position: "relative",
            transform: "scale(1.05)",
            zIndex: 2
          }}>
            <div style={{ position: "absolute", top: "-15px", left: "50%", transform: "translateX(-50%)", background: "#d4af37", color: "white", padding: "0.25rem 1rem", borderRadius: "99px", fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" }}>Recommended</div>
            <h3 style={{ fontSize: "1.5rem", color: "white", fontWeight: 700, marginBottom: "0.5rem" }}>Pro</h3>
            <div style={{ fontSize: "3rem", color: "white", fontWeight: 800, marginBottom: "1.5rem" }}>
              $49<span style={{ fontSize: "1.25rem", color: "rgba(255,255,255,0.7)", fontWeight: 400 }}>/mo</span>
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2rem", color: "rgba(255,255,255,0.9)", lineHeight: 2.5 }}>
              <li>✅ Unlimited course access</li>
              <li>✅ Recorded video lectures</li>
              <li>✅ Live Zoom sessions</li>
              <li>❌ 1-on-1 Mentorship</li>
            </ul>
            <Link href="/register" style={{ display: "block", textAlign: "center", padding: "1rem", background: "#d4af37", color: "white", fontWeight: 700, borderRadius: "99px", textDecoration: "none", boxShadow: "0 10px 20px rgba(212, 175, 55, 0.3)" }}>Go Pro</Link>
          </div>

          {/* Enterprise Plan */}
          <div style={{
            background: "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.8)",
            borderRadius: "24px",
            padding: "3rem 2rem",
            boxShadow: "0 10px 30px rgba(0,0,0,0.03)",
          }}>
            <h3 style={{ fontSize: "1.5rem", color: "#1a365d", fontWeight: 700, marginBottom: "0.5rem" }}>Elite</h3>
            <div style={{ fontSize: "3rem", color: "#1a365d", fontWeight: 800, marginBottom: "1.5rem" }}>
              $99<span style={{ fontSize: "1.25rem", color: "#64748b", fontWeight: 400 }}>/mo</span>
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2rem", color: "#475569", lineHeight: 2.5 }}>
              <li>✅ Unlimited course access</li>
              <li>✅ Recorded video lectures</li>
              <li>✅ Live Zoom sessions</li>
              <li>✅ Weekly 1-on-1 Mentorship</li>
            </ul>
            <Link href="/register" style={{ display: "block", textAlign: "center", padding: "1rem", border: "2px solid #1a365d", color: "#1a365d", fontWeight: 600, borderRadius: "99px", textDecoration: "none" }}>Get Elite</Link>
          </div>

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
