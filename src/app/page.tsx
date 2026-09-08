"use client";

import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className={styles.main}>
      {/* Background Gradients */}
      <div className={styles.backgroundGlow}></div>
      <div className={styles.backgroundGlowSecondary}></div>

      {/* Navigation */}
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <Image src="/logo.jpeg" alt="Cambridge Success Centre" width={220} height={60} style={{ objectFit: "contain" }} priority />
        </div>
        <div className={styles.navLinks}>
          <Link href="/courses" className={styles.navItem}>Courses</Link>
          <Link href="/about" className={styles.navItem}>About Us</Link>
          <div className={styles.navDivider}></div>
          <Link href="/login" className={styles.loginBtn}>Sign In</Link>
          <Link href="/register" className={styles.registerBtn}>Get Started</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.badge}>✨ Now Enrolling for Fall 2026</div>
        <h1 className={styles.heroTitle}>Unlock Your True Potential at <span className={styles.highlight}>Cambridge Success Centre</span></h1>
        <h2 className={styles.heroSubtitle}>
          Where <span className={styles.goldText}>Academic Excellence</span> meets <span className={styles.goldText}>Personal Growth</span>.
        </h2>
        <p className={styles.heroText}>
          Join thousands of successful students who have transformed their careers through our industry-leading curriculum, live interactive Zoom classes, and expert mentorship.
        </p>
        
        <div className={styles.heroActions}>
          <Link href="/register" className={styles.primaryBtn}>Start Learning Today</Link>
          <Link href="/courses" className={styles.secondaryBtn}>Explore Curriculum</Link>
        </div>
        
        {/* Trust Indicators */}
        <div className={styles.trustIndicators}>
          <div className={styles.trustItem}>
            <strong>10,000+</strong>
            <span>Active Students</span>
          </div>
          <div className={styles.trustDivider}></div>
          <div className={styles.trustItem}>
            <strong>50+</strong>
            <span>Expert Instructors</span>
          </div>
          <div className={styles.trustDivider}></div>
          <div className={styles.trustItem}>
            <strong>98%</strong>
            <span>Success Rate</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <div className={styles.sectionHeader}>
          <h2>Why Choose Us?</h2>
          <p>Everything you need to succeed, all in one state-of-the-art platform.</p>
        </div>
        
        <div className={styles.features}>
          <div className={styles.featureCard}>
            <div className={styles.iconWrapper}>
              <div className={styles.featureIcon}>📹</div>
            </div>
            <h3 className={styles.featureTitle}>Live Zoom Classes</h3>
            <p className={styles.featureDesc}>Engage with expert instructors in real-time. Ask questions, participate in discussions, and learn collaboratively from anywhere in the world.</p>
          </div>
          
          <div className={styles.featureCard}>
            <div className={styles.iconWrapper}>
              <div className={styles.featureIcon}>🔒</div>
            </div>
            <h3 className={styles.featureTitle}>Protected Streaming</h3>
            <p className={styles.featureDesc}>Access high-quality, studio-recorded lectures anytime. Our advanced HLS streaming ensures an uninterrupted, secure, and buffer-free learning experience.</p>
          </div>
          
          <div className={styles.featureCard}>
            <div className={styles.iconWrapper}>
              <div className={styles.featureIcon}>🎓</div>
            </div>
            <h3 className={styles.featureTitle}>Expert Instructors</h3>
            <p className={styles.featureDesc}>Learn directly from industry professionals and seasoned academicians who are dedicated to your personal growth and professional success.</p>
          </div>
          
          <div className={styles.featureCard}>
            <div className={styles.iconWrapper}>
              <div className={styles.featureIcon}>📈</div>
            </div>
            <h3 className={styles.featureTitle}>Career Tracking</h3>
            <p className={styles.featureDesc}>Monitor your progress with our advanced analytics dashboard. Stay on top of your assignments, grades, and upcoming live sessions effortlessly.</p>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerBrand}>
            <Image src="/logo.jpeg" alt="Cambridge Success Centre" width={180} height={50} style={{ objectFit: "contain" }} />
            <p>Empowering the next generation of leaders through accessible, world-class education.</p>
          </div>
          <div className={styles.footerLinks}>
            <h4>Platform</h4>
            <Link href="/courses">All Courses</Link>
            <Link href="/instructors">Our Instructors</Link>
            <Link href="/pricing">Pricing</Link>
          </div>
          <div className={styles.footerLinks}>
            <h4>Support</h4>
            <Link href="/help">Help Center</Link>
            <Link href="/terms">Terms of Service</Link>
            <Link href="/privacy">Privacy Policy</Link>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>&copy; {new Date().getFullYear()} Cambridge Success Centre. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
