"use client";

import styles from "../page.module.css";
import Link from "next/link";
import Image from "next/image";

export default function ReturnPolicyPage() {
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
          <span style={{ color: "#fbbf24" }}>Return &amp; Refund Policy</span>
        </div>

        {/* Policy Switcher Tabs */}
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
          <Link
            href="/terms"
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
            Terms &amp; Conditions
          </Link>
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
            Return &amp; Refund Policy
          </span>
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
            Official Merchant Policy
          </span>
          <h1 style={{ fontSize: "2.75rem", fontWeight: 800, color: "#ffffff", marginBottom: "1rem", letterSpacing: "-0.02em" }}>
            Return, Refund &amp; Cancellation Policy
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "1rem", lineHeight: 1.6, maxWidth: "800px" }}>
            Effective Date: September 1, 2026 &bull; Last Revised: September 2026
          </p>
          <p style={{ color: "#cbd5e1", fontSize: "1.05rem", lineHeight: 1.7, marginTop: "0.75rem", maxWidth: "850px" }}>
            At <strong>Cambridge Success Centre</strong> (accessible at <Link href="https://cambridgesuccesscentre.com" style={{ color: "#60a5fa" }}>https://cambridgesuccesscentre.com</Link>),
            we strive to provide an outstanding educational experience. We recognize that unforeseen circumstances can arise, and we have established this fair, transparent Return and Refund Policy for all courses, live masterclasses, and digital educational services.
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
            <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>⏱️</div>
            <h3 style={{ color: "#ffffff", fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.5rem" }}>
              7-Day Money-Back Guarantee
            </h3>
            <p style={{ color: "#94a3b8", fontSize: "0.9rem", lineHeight: 1.6 }}>
              Full 100% refund available on self-paced on-demand courses within 7 days of purchase if less than 25% of course lessons have been viewed.
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
            <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>⚡</div>
            <h3 style={{ color: "#ffffff", fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.5rem" }}>
              5-7 Day Fast Processing
            </h3>
            <p style={{ color: "#94a3b8", fontSize: "0.9rem", lineHeight: 1.6 }}>
              Approved refunds are credited directly back to your original payment method (Credit/Debit Card or Bank Transfer via PayHere / payment gateway).
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
            <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>🎓</div>
            <h3 style={{ color: "#ffffff", fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.5rem" }}>
              Pre-Batch Live Class Cancellation
            </h3>
            <p style={{ color: "#94a3b8", fontSize: "0.9rem", lineHeight: 1.6 }}>
              Cancel interactive live Zoom masterclasses up to 48 hours before the cohort begins for a full 100% refund or free transfer to a future cohort.
            </p>
          </div>
        </div>

        {/* Detailed Policy Document Card */}
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
              <span style={{ color: "#fbbf24" }}>1.</span> Scope &amp; Purpose of this Policy
            </h2>
            <p style={{ marginBottom: "1rem" }}>
              This Return, Refund, and Cancellation Policy applies to all purchases made on Cambridge Success Centre platform (<Link href="https://cambridgesuccesscentre.com" style={{ color: "#60a5fa" }}>https://cambridgesuccesscentre.com</Link>), including self-paced courses, live Zoom masterclasses, collegiate admissions clinics, and digital examination study archives.
            </p>
            <p>
              By enrolling in any program or submitting payment through our authorized payment processors (including PayHere), you acknowledge that you have read, understood, and agreed to be bound by the terms outlined below.
            </p>
          </section>

          <hr style={{ borderColor: "rgba(255, 255, 255, 0.08)", margin: "2rem 0" }} />

          {/* Section 2 */}
          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontSize: "1.5rem", color: "#ffffff", fontWeight: 700, marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ color: "#fbbf24" }}>2.</span> Refund Eligibility by Service Type
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginTop: "1.25rem" }}>
              <div style={{ background: "rgba(255, 255, 255, 0.02)", borderLeft: "3px solid #fbbf24", padding: "1.25rem 1.5rem", borderRadius: "0 8px 8px 0" }}>
                <h3 style={{ color: "#ffffff", fontSize: "1.1rem", fontWeight: 600, marginBottom: "0.5rem" }}>
                  A. Self-Paced Video Courses &amp; Modules
                </h3>
                <p style={{ fontSize: "0.95rem", color: "#cbd5e1", marginBottom: "0.5rem" }}>
                  We offer a <strong>7-Day Risk-Free Money-Back Guarantee</strong> from the timestamp of enrollment under the following conditions:
                </p>
                <ul style={{ paddingLeft: "1.5rem", fontSize: "0.9rem", color: "#94a3b8" }}>
                  <li>The refund request is submitted within 7 calendar days of initial course payment.</li>
                  <li>The student has consumed less than 25% of the total video curriculum lessons.</li>
                  <li>No course completion certificate has been generated or issued.</li>
                  <li>Course notes or downloadable materials have not been downloaded in bulk.</li>
                </ul>
              </div>

              <div style={{ background: "rgba(255, 255, 255, 0.02)", borderLeft: "3px solid #3b82f6", padding: "1.25rem 1.5rem", borderRadius: "0 8px 8px 0" }}>
                <h3 style={{ color: "#ffffff", fontSize: "1.1rem", fontWeight: 600, marginBottom: "0.5rem" }}>
                  B. Live Interactive Zoom Classes &amp; Cohort Batches
                </h3>
                <p style={{ fontSize: "0.95rem", color: "#cbd5e1", marginBottom: "0.5rem" }}>
                  Due to limited cohort seat capacity and live tutor scheduling:
                </p>
                <ul style={{ paddingLeft: "1.5rem", fontSize: "0.9rem", color: "#94a3b8" }}>
                  <li><strong>Full Refund (100%):</strong> When cancellation is requested at least 48 hours prior to the official batch start date.</li>
                  <li><strong>Cohort Transfers:</strong> Students may transfer their seat to an upcoming cohort free of charge prior to the commencement of the second live session.</li>
                  <li><strong>Mid-Cohort Withdrawals:</strong> Once live classes have commenced, pro-rated refunds are evaluated exclusively on documented medical grounds or academic emergencies.</li>
                </ul>
              </div>

              <div style={{ background: "rgba(255, 255, 255, 0.02)", borderLeft: "3px solid #a855f7", padding: "1.25rem 1.5rem", borderRadius: "0 8px 8px 0" }}>
                <h3 style={{ color: "#ffffff", fontSize: "1.1rem", fontWeight: 600, marginBottom: "0.5rem" }}>
                  C. 1-on-1 Academic Mentorship &amp; Admissions Clinics
                </h3>
                <p style={{ fontSize: "0.95rem", color: "#cbd5e1", marginBottom: "0.5rem" }}>
                  Individual advisory clinics with faculty members require advance schedule reservation:
                </p>
                <ul style={{ paddingLeft: "1.5rem", fontSize: "0.9rem", color: "#94a3b8" }}>
                  <li>Sessions may be rescheduled without penalty up to 24 hours prior to the scheduled slot.</li>
                  <li>Cancellations requested with less than 24 hours notice or unannounced absences (&quot;no-shows&quot;) are non-refundable.</li>
                </ul>
              </div>

              <div style={{ background: "rgba(255, 255, 255, 0.02)", borderLeft: "3px solid #ef4444", padding: "1.25rem 1.5rem", borderRadius: "0 8px 8px 0" }}>
                <h3 style={{ color: "#ffffff", fontSize: "1.1rem", fontWeight: 600, marginBottom: "0.5rem" }}>
                  D. Standalone Digital Study Notes &amp; Past-Paper Mock Grading
                </h3>
                <p style={{ fontSize: "0.95rem", color: "#cbd5e1" }}>
                  Downloadable examination papers, solution packs, and personalized mock marking submissions that have already undergone faculty review cannot be returned or refunded once downloaded or evaluated.
                </p>
              </div>
            </div>
          </section>

          <hr style={{ borderColor: "rgba(255, 255, 255, 0.08)", margin: "2rem 0" }} />

          {/* Section 3 */}
          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontSize: "1.5rem", color: "#ffffff", fontWeight: 700, marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ color: "#fbbf24" }}>3.</span> Subscription Cancellation Policy
            </h2>
            <p style={{ marginBottom: "1rem" }}>
              If you are enrolled in a recurring subscription plan (e.g., Monthly All-Access Membership):
            </p>
            <ul style={{ paddingLeft: "1.5rem", marginBottom: "1rem" }}>
              <li>You may cancel your recurring subscription at any time by logging into your Student Dashboard at <Link href="/dashboard" style={{ color: "#60a5fa" }}>https://cambridgesuccesscentre.com/dashboard</Link> or emailing our billing support.</li>
              <li>Upon cancellation, your subscription will remain active until the conclusion of your current paid billing period, and no further renewal charges will be applied.</li>
              <li>Past subscription cycles that have already elapsed are non-refundable.</li>
            </ul>
          </section>

          <hr style={{ borderColor: "rgba(255, 255, 255, 0.08)", margin: "2rem 0" }} />

          {/* Section 4 */}
          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontSize: "1.5rem", color: "#ffffff", fontWeight: 700, marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ color: "#fbbf24" }}>4.</span> Refund Processing &amp; Settlement Timeline
            </h2>
            <p style={{ marginBottom: "1rem" }}>
              We ensure all approved refunds are processed expeditiously and transparently:
            </p>
            <div style={{ background: "rgba(255, 255, 255, 0.03)", borderRadius: "12px", padding: "1.5rem", border: "1px solid rgba(255, 255, 255, 0.06)" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                <div>
                  <h4 style={{ color: "#ffffff", fontSize: "0.95rem", fontWeight: 600, marginBottom: "0.5rem" }}>Original Payment Method</h4>
                  <p style={{ color: "#94a3b8", fontSize: "0.875rem" }}>
                    Refunds are credited directly back to the payment method originally used for the purchase (Credit Card, Debit Card, or Bank account via PayHere gateway).
                  </p>
                </div>
                <div>
                  <h4 style={{ color: "#ffffff", fontSize: "0.95rem", fontWeight: 600, marginBottom: "0.5rem" }}>Turnaround Time</h4>
                  <p style={{ color: "#94a3b8", fontSize: "0.875rem" }}>
                    Once our team confirms approval, the refund is initiated within 24 hours. Depending on your issuing bank, the credit appears in your statement within <strong>5 to 7 business days</strong>.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <hr style={{ borderColor: "rgba(255, 255, 255, 0.08)", margin: "2rem 0" }} />

          {/* Section 5 */}
          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontSize: "1.5rem", color: "#ffffff", fontWeight: 700, marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ color: "#fbbf24" }}>5.</span> How to Request a Refund
            </h2>
            <p style={{ marginBottom: "1rem" }}>
              To submit a refund request, please send an email to our student support team with the following details:
            </p>
            <div style={{ background: "rgba(212, 175, 55, 0.05)", border: "1px dashed rgba(212, 175, 55, 0.3)", borderRadius: "12px", padding: "1.5rem", marginBottom: "1rem" }}>
              <p style={{ color: "#fbbf24", fontWeight: 600, marginBottom: "0.75rem" }}>Email Template for Refund Requests:</p>
              <p style={{ fontSize: "0.9rem", color: "#e2e8f0", margin: "0.25rem 0" }}><strong>Send to:</strong> support@cambridgesuccesscentre.com</p>
              <p style={{ fontSize: "0.9rem", color: "#e2e8f0", margin: "0.25rem 0" }}><strong>Subject:</strong> Refund Request - [Your Full Name] - [Course Name]</p>
              <p style={{ fontSize: "0.9rem", color: "#e2e8f0", margin: "0.25rem 0" }}><strong>Registered Email:</strong> [The email address used during purchase]</p>
              <p style={{ fontSize: "0.9rem", color: "#e2e8f0", margin: "0.25rem 0" }}><strong>Transaction ID / Reference:</strong> [PAY_XXXXXXXX or Order ID from your receipt]</p>
              <p style={{ fontSize: "0.9rem", color: "#e2e8f0", margin: "0.25rem 0" }}><strong>Reason for Request:</strong> [Brief explanation to help us improve our curricula]</p>
            </div>
            <p style={{ fontSize: "0.95rem", color: "#94a3b8" }}>
              Our support desk operates Monday through Saturday and will confirm receipt and provide an update within 24 to 48 business hours.
            </p>
          </section>

          <hr style={{ borderColor: "rgba(255, 255, 255, 0.08)", margin: "2rem 0" }} />

          {/* Section 6 */}
          <section>
            <h2 style={{ fontSize: "1.5rem", color: "#ffffff", fontWeight: 700, marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ color: "#fbbf24" }}>6.</span> Merchant Support &amp; Billing Inquiries
            </h2>
            <p style={{ marginBottom: "1rem" }}>
              If you experience any billing discrepancies, double charges, or difficulties accessing course content, please reach out to our dedicated student finance team before initiating a chargeback with your financial institution:
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem", marginTop: "1.5rem" }}>
              <div style={{ background: "rgba(255, 255, 255, 0.03)", padding: "1.25rem", borderRadius: "10px" }}>
                <div style={{ fontSize: "0.85rem", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em" }}>Merchant Name</div>
                <div style={{ color: "#ffffff", fontWeight: 600, marginTop: "0.25rem" }}>Cambridge Success Centre</div>
              </div>
              <div style={{ background: "rgba(255, 255, 255, 0.03)", padding: "1.25rem", borderRadius: "10px" }}>
                <div style={{ fontSize: "0.85rem", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em" }}>Support Email</div>
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
            <Link href="/terms">Terms of Service</Link>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/return-policy" style={{ color: "#fbbf24" }}>Return &amp; Refund Policy</Link>
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
