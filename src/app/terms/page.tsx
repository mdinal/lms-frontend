"use client";

import styles from "../page.module.css";
import Link from "next/link";
import Image from "next/image";

export default function TermsPage() {
  return (
    <main className={styles.main}>
      {/* Ambient Lighting Background */}
      <div className={styles.ambientGlowPrimary}></div>
      <div className={styles.ambientGlowSecondary}></div>
      <div className={styles.ambientGlowTertiary}></div>

      {/* Top Announcement Bar */}
      <div className={styles.announcementBar}>
        <span className={styles.announcementBadge}>Compliance</span>
        <span>Official Merchant Policies &amp; Consumer Protection Standards</span>
        <Link href="/help" className={styles.announcementLink}>
          Support Desk &rarr;
        </Link>
      </div>

      {/* Navigation */}
      <nav className={styles.navbar}>
        <Link href="/" className={styles.logoWrapper}>
          <div className={styles.logoImage}>
            <Image
              src="/logo.jpeg"
              alt="Cambridge Success Centre"
              width={180}
              height={48}
              style={{ objectFit: "contain", display: "block" }}
              priority
            />
          </div>
        </Link>

        <div className={styles.navLinks}>
          <Link href="/courses" className={styles.navItem}>Courses</Link>
          <Link href="/live-classes" className={styles.navItem}>Live Masterclasses</Link>
          <Link href="/about" className={styles.navItem}>About Us</Link>
          <Link href="/pricing" className={styles.navItem}>Pricing</Link>
          <Link href="/help" className={styles.navItem}>Help Center</Link>
        </div>

        <div className={styles.navActions}>
          <Link href="/login" className={styles.loginBtn}>Sign In</Link>
          <Link href="/register" className={styles.registerBtn}>Get Started</Link>
        </div>
      </nav>

      {/* Main Content Container */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "3.5rem 1.5rem 6rem", position: "relative", zIndex: 10 }}>
        {/* Breadcrumb & Navigation Tabs */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", color: "#94a3b8", marginBottom: "1.5rem" }}>
          <Link href="/" style={{ color: "#94a3b8", textDecoration: "none" }}>Home</Link>
          <span>/</span>
          <span style={{ color: "#fbbf24" }}>Business Terms &amp; Conditions</span>
        </div>

        {/* Policy Switcher Tabs */}
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
          <span
            style={{
              padding: "0.6rem 1.25rem",
              borderRadius: "99px",
              background: "rgba(212, 175, 55, 0.15)",
              border: "1px solid rgba(212, 175, 55, 0.4)",
              color: "#fbbf24",
              fontSize: "0.875rem",
              fontWeight: 600,
            }}
          >
            Terms &amp; Conditions
          </span>
          <Link
            href="/privacy"
            style={{
              padding: "0.6rem 1.25rem",
              borderRadius: "99px",
              background: "rgba(255, 255, 255, 0.04)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              color: "#cbd5e1",
              fontSize: "0.875rem",
              fontWeight: 500,
              textDecoration: "none",
              transition: "all 0.2s ease",
            }}
          >
            Privacy Policy
          </Link>
          <Link
            href="/return-policy"
            style={{
              padding: "0.6rem 1.25rem",
              borderRadius: "99px",
              background: "rgba(255, 255, 255, 0.04)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              color: "#cbd5e1",
              fontSize: "0.875rem",
              fontWeight: 500,
              textDecoration: "none",
              transition: "all 0.2s ease",
            }}
          >
            Return &amp; Refund Policy
          </Link>
        </div>

        {/* Header Section */}
        <div style={{ marginBottom: "3rem" }}>
          <span
            style={{
              display: "inline-block",
              background: "rgba(212, 175, 55, 0.1)",
              color: "#fbbf24",
              border: "1px solid rgba(212, 175, 55, 0.25)",
              padding: "0.25rem 0.75rem",
              borderRadius: "6px",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              marginBottom: "1rem",
            }}
          >
            Official Merchant Agreement
          </span>
          <h1 style={{ fontSize: "2.75rem", fontWeight: 800, color: "#ffffff", marginBottom: "1rem", letterSpacing: "-0.02em" }}>
            Business Terms &amp; Conditions
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "1rem", lineHeight: 1.6, maxWidth: "800px" }}>
            Effective Date: September 1, 2026 &bull; Last Revised: September 2026
          </p>
          <p style={{ color: "#cbd5e1", fontSize: "1.05rem", lineHeight: 1.7, marginTop: "0.75rem", maxWidth: "850px" }}>
            Welcome to <strong>Cambridge Success Centre</strong>. These Business Terms and Conditions govern your purchase of educational courses, enrollment in live Zoom masterclasses, and general use of our learning management platform hosted at <Link href="https://cambridgesuccesscentre.com" style={{ color: "#60a5fa" }}>https://cambridgesuccesscentre.com</Link>.
          </p>
        </div>

        {/* Key Highlights Cards (For Payment Gateway Reviewers) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.25rem",
            marginBottom: "3.5rem",
          }}
        >
          <div
            style={{
              background: "rgba(15, 23, 42, 0.75)",
              border: "1px solid rgba(212, 175, 55, 0.3)",
              borderRadius: "16px",
              padding: "1.75rem",
              backdropFilter: "blur(12px)",
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>🏛️</div>
            <h3 style={{ color: "#ffffff", fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.5rem" }}>
              Collegiate British Standards
            </h3>
            <p style={{ color: "#94a3b8", fontSize: "0.9rem", lineHeight: 1.6 }}>
              All course content, live masterclasses, and mentorship clinics are structured to Cambridge International A-Levels, STEP, MAT, and prestigious university entrance benchmarks.
            </p>
          </div>

          <div
            style={{
              background: "rgba(15, 23, 42, 0.75)",
              border: "1px solid rgba(59, 130, 246, 0.3)",
              borderRadius: "16px",
              padding: "1.75rem",
              backdropFilter: "blur(12px)",
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>🔒</div>
            <h3 style={{ color: "#ffffff", fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.5rem" }}>
              Single-User License
            </h3>
            <p style={{ color: "#94a3b8", fontSize: "0.9rem", lineHeight: 1.6 }}>
              Course access is granted on a strict single-student license. Account sharing, credential resale, or unauthorized redistribution of course videos is strictly prohibited.
            </p>
          </div>

          <div
            style={{
              background: "rgba(15, 23, 42, 0.75)",
              border: "1px solid rgba(16, 185, 129, 0.3)",
              borderRadius: "16px",
              padding: "1.75rem",
              backdropFilter: "blur(12px)",
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>💳</div>
            <h3 style={{ color: "#ffffff", fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.5rem" }}>
              Transparent Billing &amp; Settlement
            </h3>
            <p style={{ color: "#94a3b8", fontSize: "0.9rem", lineHeight: 1.6 }}>
              Tuition fees are displayed transparently without hidden surcharges. All transactions are securely processed via authorized payment gateway partners (PayHere).
            </p>
          </div>
        </div>

        {/* Detailed Terms Document Card */}
        <div
          style={{
            background: "rgba(15, 23, 42, 0.65)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "20px",
            padding: "3rem",
            backdropFilter: "blur(16px)",
            color: "#cbd5e1",
            lineHeight: 1.8,
            fontSize: "1rem",
          }}
        >
          {/* Section 1 */}
          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontSize: "1.5rem", color: "#ffffff", fontWeight: 700, marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ color: "#fbbf24" }}>1.</span> Agreement to Terms
            </h2>
            <p style={{ marginBottom: "1rem" }}>
              By creating an account, browsing this website, or completing any payment for courses, subscriptions, or live clinic sessions, you agree to comply with and be bound by these Business Terms and Conditions, alongside our <Link href="/privacy" style={{ color: "#60a5fa" }}>Privacy Policy</Link> and <Link href="/return-policy" style={{ color: "#60a5fa" }}>Return &amp; Refund Policy</Link>.
            </p>
            <p>
              If you do not agree with any part of these terms, you must refrain from accessing or using our platform and services.
            </p>
          </section>

          <hr style={{ borderColor: "rgba(255, 255, 255, 0.08)", margin: "2rem 0" }} />

          {/* Section 2 */}
          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontSize: "1.5rem", color: "#ffffff", fontWeight: 700, marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ color: "#fbbf24" }}>2.</span> Description of Services
            </h2>
            <p style={{ marginBottom: "1rem" }}>
              Cambridge Success Centre provides online digital academic curricula, interactive live virtual classes, on-demand high-definition video masterclasses, personal mentorship clinics, and authenticated digital certificates.
            </p>
            <p>
              Access to courses is provided digitally via the Student Portal upon successful authorization and settlement of payment. While we strive for 99.9% platform availability, scheduled server updates and routine maintenance may occasionally occur.
            </p>
          </section>

          <hr style={{ borderColor: "rgba(255, 255, 255, 0.08)", margin: "2rem 0" }} />

          {/* Section 3 */}
          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontSize: "1.5rem", color: "#ffffff", fontWeight: 700, marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ color: "#fbbf24" }}>3.</span> User Registration &amp; Account Obligations
            </h2>
            <ul style={{ paddingLeft: "1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <li>You must provide accurate, complete, and current registration information when creating an account.</li>
              <li>You are solely responsible for maintaining the confidentiality of your login credentials and password.</li>
              <li>Each enrollment is for an individual student. Sharing credentials, delegating account access, or conducting simultaneous logins from disparate geographic locations is strictly prohibited and triggers automatic account suspension.</li>
              <li>You must notify Cambridge Success Centre immediately upon discovering any unauthorized breach of your account.</li>
            </ul>
          </section>

          <hr style={{ borderColor: "rgba(255, 255, 255, 0.08)", margin: "2rem 0" }} />

          {/* Section 4 */}
          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontSize: "1.5rem", color: "#ffffff", fontWeight: 700, marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ color: "#fbbf24" }}>4.</span> Pricing, Payment &amp; Currency Terms
            </h2>
            <ul style={{ paddingLeft: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <li>
                <strong>Currency &amp; Charges:</strong> All prices are displayed clearly on course cards and checkout pages in the designated currency (USD or local equivalents).
              </li>
              <li>
                <strong>Payment Authorization:</strong> By initiating a payment, you warrant that you are the legitimate cardholder or authorized account signatory on the payment method provided.
              </li>
              <li>
                <strong>Gateway Processing:</strong> Payments are processed via authorized payment gateway partners (including PayHere). All credit/debit card details are encrypted under PCI-DSS standards.
              </li>
              <li>
                <strong>Chargebacks &amp; Payment Disputes:</strong> If a chargeback or payment dispute is initiated without prior communication with our student support team, course access will be immediately revoked pending resolution.
              </li>
            </ul>
          </section>

          <hr style={{ borderColor: "rgba(255, 255, 255, 0.08)", margin: "2rem 0" }} />

          {/* Section 5 */}
          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontSize: "1.5rem", color: "#ffffff", fontWeight: 700, marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ color: "#fbbf24" }}>5.</span> Intellectual Property &amp; Anti-Piracy Rights
            </h2>
            <p style={{ marginBottom: "1rem" }}>
              All intellectual property rights in course materials—including recorded video lectures, live Zoom streams, past-paper solutions, worksheets, syllabi, software code, and Cambridge Success Centre logos—remain the exclusive property of Cambridge Success Centre and its accredited faculty.
            </p>
            <div style={{ background: "rgba(239, 68, 68, 0.05)", border: "1px solid rgba(239, 68, 68, 0.2)", borderRadius: "10px", padding: "1.25rem", color: "#fca5a5" }}>
              <strong>Strict Prohibition:</strong> You may not record, stream, copy, republish, distribute, broadcast, reverse-engineer, or sell any course material. Video streams are dynamically watermarked. Violations will be prosecuted to the fullest extent of the law.
            </div>
          </section>

          <hr style={{ borderColor: "rgba(255, 255, 255, 0.08)", margin: "2rem 0" }} />

          {/* Section 6 */}
          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontSize: "1.5rem", color: "#ffffff", fontWeight: 700, marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ color: "#fbbf24" }}>6.</span> Code of Conduct for Students &amp; Scholars
            </h2>
            <p style={{ marginBottom: "1rem" }}>
              All students enrolled in our community are expected to maintain collegiate standards of academic integrity and decorum:
            </p>
            <ul style={{ paddingLeft: "1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <li>Maintain respectful discourse during live Zoom clinics, Q&amp;A sessions, and forums.</li>
              <li>Plagiarism, cheating on examinations, or submitting unauthentic assignments is grounds for immediate expulsion.</li>
              <li>Harassment, hate speech, abusive language, or disruption of classes will result in account termination without refund.</li>
            </ul>
          </section>

          <hr style={{ borderColor: "rgba(255, 255, 255, 0.08)", margin: "2rem 0" }} />

          {/* Section 7 */}
          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontSize: "1.5rem", color: "#ffffff", fontWeight: 700, marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ color: "#fbbf24" }}>7.</span> Return, Refund &amp; Cancellation Terms
            </h2>
            <p style={{ marginBottom: "1rem" }}>
              All return and refund requests are governed explicitly by our <Link href="/return-policy" style={{ color: "#60a5fa" }}>Return &amp; Refund Policy</Link>, which is incorporated into these terms by reference. This includes our 7-day money-back guarantee on eligible self-paced courses and 48-hour pre-batch cancellation terms for live cohorts.
            </p>
          </section>

          <hr style={{ borderColor: "rgba(255, 255, 255, 0.08)", margin: "2rem 0" }} />

          {/* Section 8 */}
          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontSize: "1.5rem", color: "#ffffff", fontWeight: 700, marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ color: "#fbbf24" }}>8.</span> Disclaimers &amp; Limitation of Liability
            </h2>
            <p style={{ marginBottom: "1rem" }}>
              While our curricula and mentorship clinics are modeled after the most rigorous Cambridge standards and university examination benchmarks, academic success and final examination scores depend substantially on the student&apos;s individual effort, dedication, and aptitude.
            </p>
            <p style={{ color: "#94a3b8", fontSize: "0.95rem" }}>
              To the maximum extent permitted by applicable law, Cambridge Success Centre and its tutors shall not be liable for any indirect, incidental, or consequential damages resulting from the use or inability to use the platform. Our total aggregate liability for any claims arising out of these terms shall not exceed the total amount paid by you for the specific course in question.
            </p>
          </section>

          <hr style={{ borderColor: "rgba(255, 255, 255, 0.08)", margin: "2rem 0" }} />

          {/* Section 9 */}
          <section>
            <h2 style={{ fontSize: "1.5rem", color: "#ffffff", fontWeight: 700, marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ color: "#fbbf24" }}>9.</span> Merchant Identity &amp; Contact Information
            </h2>
            <p style={{ marginBottom: "1rem" }}>
              For formal legal inquiries, commercial notices, or billing questions, please contact our administrative team:
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem", marginTop: "1.5rem" }}>
              <div style={{ background: "rgba(255, 255, 255, 0.03)", padding: "1.25rem", borderRadius: "10px" }}>
                <div style={{ fontSize: "0.85rem", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em" }}>Merchant Name</div>
                <div style={{ color: "#ffffff", fontWeight: 600, marginTop: "0.25rem" }}>Cambridge Success Centre</div>
              </div>
              <div style={{ background: "rgba(255, 255, 255, 0.03)", padding: "1.25rem", borderRadius: "10px" }}>
                <div style={{ fontSize: "0.85rem", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em" }}>Customer Support</div>
                <div style={{ color: "#60a5fa", fontWeight: 600, marginTop: "0.25rem" }}>support@cambridgesuccesscentre.com</div>
              </div>
              <div style={{ background: "rgba(255, 255, 255, 0.03)", padding: "1.25rem", borderRadius: "10px" }}>
                <div style={{ fontSize: "0.85rem", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em" }}>General Inquiries</div>
                <div style={{ color: "#60a5fa", fontWeight: 600, marginTop: "0.25rem" }}>info@cambridgesuccesscentre.com</div>
              </div>
              <div style={{ background: "rgba(255, 255, 255, 0.03)", padding: "1.25rem", borderRadius: "10px" }}>
                <div style={{ fontSize: "0.85rem", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em" }}>Website</div>
                <div style={{ color: "#ffffff", fontWeight: 600, marginTop: "0.25rem" }}>cambridgesuccesscentre.com</div>
              </div>
            </div>
          </section>
        </div>

        {/* Back to top / home link */}
        <div style={{ marginTop: "3rem", textAlign: "center" }}>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "#fbbf24",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            &larr; Return to Cambridge Success Centre Home
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerBrand}>
            <div className={styles.footerLogo}>
              <Image
                src="/logo.jpeg"
                alt="Cambridge Success Centre"
                width={200}
                height={55}
                style={{ objectFit: "contain", display: "block" }}
              />
            </div>
            <p>
              The premier digital academy providing rigorous university-standard preparation, Cambridge curriculum masterclasses, and collegiate mentorship.
            </p>
          </div>

          <div className={styles.footerLinksCol}>
            <h5>Academic Programs</h5>
            <Link href="/courses">Advanced Mathematics</Link>
            <Link href="/courses">Theoretical Physics</Link>
            <Link href="/courses">Computer Science &amp; AI</Link>
            <Link href="/courses">English Literature</Link>
            <Link href="/courses">Oxbridge Admissions</Link>
          </div>

          <div className={styles.footerLinksCol}>
            <h5>Learning Portal</h5>
            <Link href="/dashboard">Student Dashboard</Link>
            <Link href="/live-classes">Upcoming Live Classes</Link>
            <Link href="/login">Portal Sign In</Link>
            <Link href="/register">Student Registration</Link>
            <Link href="/pricing">Pricing &amp; Cohorts</Link>
          </div>

          <div className={styles.footerLinksCol}>
            <h5>Institution &amp; Support</h5>
            <Link href="/about">About Cambridge Success</Link>
            <Link href="/instructors">Faculty &amp; Fellows</Link>
            <Link href="/help">Help &amp; Contact</Link>
            <Link href="/terms" style={{ color: "#fbbf24" }}>Terms of Service</Link>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/return-policy">Return &amp; Refund Policy</Link>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>&copy; {new Date().getFullYear()} Cambridge Success Centre. All rights reserved.</p>
          <p>Collegiate Academic Preparation &bull; Cambridge University Standards &bull; Secure HLS Cloud Infrastructure</p>
        </div>
      </footer>
    </main>
  );
}
