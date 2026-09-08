"use client";

import mainStyles from "../page.module.css";
import Link from "next/link";
import Image from "next/image";

export default function InstructorsPage() {
  const instructors = [
    { id: 1, name: "Dr. Sarah Jenkins", title: "Head of Data Science", bio: "Former Lead Analyst at Google with 15 years of industry experience.", emoji: "👩‍🔬" },
    { id: 2, name: "Prof. Michael Chen", title: "Senior Mathematics Teacher", bio: "Award-winning educator specializing in advanced calculus and statistics.", emoji: "👨‍🏫" },
    { id: 3, name: "Elena Rodriguez", title: "Lead IT Instructor", bio: "AWS Certified Solutions Architect helping students master cloud computing.", emoji: "👩‍💻" },
    { id: 4, name: "Dr. James Wilson", title: "Language Department Head", bio: "Ph.D. in Linguistics, specializing in rapid language acquisition techniques.", emoji: "👨‍🎓" },
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

      <section style={{ padding: "6rem 5% 8rem", position: "relative", zIndex: 10, maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <h1 style={{ fontSize: "3rem", color: "#1a365d", marginBottom: "1rem", fontWeight: 800 }}>Meet Our Faculty</h1>
          <p style={{ fontSize: "1.25rem", color: "#64748b", maxWidth: "600px", margin: "0 auto" }}>
            Learn directly from industry professionals and seasoned academicians dedicated to your success.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "2rem" }}>
          {instructors.map(instructor => (
            <div key={instructor.id} style={{
              background: "rgba(255, 255, 255, 0.7)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.8)",
              borderRadius: "20px",
              padding: "2.5rem 2rem",
              textAlign: "center",
              boxShadow: "0 10px 30px rgba(0,0,0,0.03)",
              transition: "transform 0.3s ease",
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-8px)"}
            onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}>
              
              <div style={{ 
                width: "120px", height: "120px", 
                borderRadius: "50%", 
                background: "rgba(26, 54, 93, 0.05)", 
                margin: "0 auto 1.5rem",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "4rem", border: "4px solid white",
                boxShadow: "0 10px 20px rgba(0,0,0,0.05)"
              }}>
                {instructor.emoji}
              </div>
              
              <h3 style={{ fontSize: "1.25rem", color: "#1a365d", marginBottom: "0.25rem", fontWeight: 700 }}>{instructor.name}</h3>
              <p style={{ fontSize: "0.9rem", color: "#d4af37", fontWeight: 600, marginBottom: "1rem" }}>{instructor.title}</p>
              <p style={{ color: "#64748b", fontSize: "0.95rem", lineHeight: 1.6 }}>{instructor.bio}</p>
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
