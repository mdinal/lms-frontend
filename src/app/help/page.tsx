"use client";

import mainStyles from "../page.module.css";
import Link from "next/link";
import Image from "next/image";

export default function HelpPage() {
  const faqs = [
    { q: "How do I join a live Zoom class?", a: "Once enrolled in a course, navigate to your Student Dashboard. Click on the specific course, and you will see a 'Join Live Class' button for active sessions." },
    { q: "Are the video lectures downloadable?", a: "To protect our intellectual property and ensure the best streaming quality via HLS, videos are not downloadable but can be watched on-demand anytime from any device." },
    { q: "How do I cancel my subscription?", a: "You can cancel your subscription at any time by navigating to Settings > Billing in your Student Portal." }
  ];

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

      <section style={{ padding: "6rem 5% 8rem", position: "relative", zIndex: 10, maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "3rem", color: "#1a365d", marginBottom: "2rem", fontWeight: 800, textAlign: "center" }}>Help Center</h1>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{
              background: "white",
              border: "1px solid #e2e8f0",
              borderRadius: "16px",
              padding: "2rem",
              boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)"
            }}>
              <h3 style={{ fontSize: "1.25rem", color: "#1a365d", marginBottom: "1rem", fontWeight: 700 }}>{faq.q}</h3>
              <p style={{ color: "#64748b", lineHeight: 1.6 }}>{faq.a}</p>
            </div>
          ))}
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
