"use client";

import { useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";

interface CoursePreview {
  id: string;
  title: string;
  category: "math" | "cs" | "humanities" | "admissions";
  department: string;
  format: string;
  description: string;
  tutor: string;
  rating: string;
  reviews: number;
  price: string;
  duration: string;
}

const SAMPLE_COURSES: CoursePreview[] = [
  {
    id: "13dbe8c5-0c1f-4f4c-bb19-011f20e06c82",
    title: "Cambridge Advanced Mathematics & Calculus",
    category: "math",
    department: "Cambridge A-Level STEM",
    format: "Live Zoom + HD Stream",
    description: "Master differential equations, multivariable integration, and real-world optimization tailored for Cambridge & STEP examinations.",
    tutor: "Dr. Robert Hayes",
    rating: "4.98",
    reviews: 1420,
    price: "$120.00",
    duration: "12 Lectures · 2 Live Clinics"
  },
  {
    id: "24cba9d6-1d2f-4e5c-ac20-122f30e17d93",
    title: "A-Level Theoretical & Classical Physics",
    category: "math",
    department: "Physical Sciences",
    format: "On-Demand & Live Clinics",
    description: "Comprehensive mastery of Newtonian mechanics, wave-particle duality, thermodynamics, and experimental laboratory problems.",
    tutor: "Dr. Robert Hayes",
    rating: "4.95",
    reviews: 980,
    price: "$110.00",
    duration: "10 Lectures · Weekly Q&A"
  },
  {
    id: "35dcb0e7-2e3f-4f6d-bd31-233f41e28ea4",
    title: "Cambridge English Literature Masterclass",
    category: "humanities",
    department: "Humanities & Arts",
    format: "Interactive Seminar",
    description: "In-depth literary criticism, structural analysis of Shakespeare, Romantic poetry, and high-scoring university essay composition.",
    tutor: "Prof. Sarah Jenkins",
    rating: "4.97",
    reviews: 740,
    price: "$95.00",
    duration: "8 Seminars · Essay Reviews"
  },
  {
    id: "46edc1f8-3f4a-5a7e-ce42-344a52f39fb5",
    title: "Data Structures, Algorithms & Computational Logic",
    category: "cs",
    department: "Computer Science",
    format: "Coding Lab + Live Zoom",
    description: "Graph traversal, dynamic programming, complexity proofs, and AI algorithmic problem solving designed for university Olympiads.",
    tutor: "Dr. Alan Turing",
    rating: "4.99",
    reviews: 1850,
    price: "$135.00",
    duration: "14 Labs · Project Clinics"
  },
  {
    id: "57fee2a9-4a5b-6b8f-df53-455b63a40ac6",
    title: "Oxbridge & Ivy League Admissions Strategy",
    category: "admissions",
    department: "University Admissions",
    format: "Executive Masterclass",
    description: "Personal statement crafting, admissions interview clinics, and past STEP/MAT preparation with former Cambridge collegiate fellows.",
    tutor: "Cambridge Admissions Board",
    rating: "5.00",
    reviews: 620,
    price: "$150.00",
    duration: "6 Intensives · 1-on-1 Mock"
  }
];

const FAQS = [
  {
    q: "How do the live Zoom classes and recordings work?",
    a: "Every scheduled live class is hosted via encrypted interactive Zoom sessions where you can ask real-time questions and collaborate with instructors. Once the session concludes, high-definition recording replays are automatically processed and made available inside your course portal with protected HLS streaming."
  },
  {
    q: "Are the courses tailored to Cambridge and international university standards?",
    a: "Yes. Our curricula are specifically aligned with Cambridge International A-Levels, STEP (Sixth Term Examination Papers), MAT (Mathematics Admissions Test), and rigorous university entrance benchmarks taught by Oxford and Cambridge fellows."
  },
  {
    q: "Can I stream lectures on mobile or tablet devices?",
    a: "Absolutely. Our player is engineered using adaptive HLS video streaming, meaning video quality seamlessly scales across iOS, Android, macOS, and Windows devices without stuttering or lag."
  },
  {
    q: "What credentials and qualifications do instructors possess?",
    a: "All Cambridge Success Centre tutors are distinguished academicians, former Cambridge or Oxford researchers, or accredited subject specialists with exceptional track records in student mentorship."
  },
  {
    q: "Do students receive an official certificate upon course completion?",
    a: "Yes. Upon completing all curriculum modules and required assignments, you will receive an authenticated Cambridge Success Centre Digital Certificate of Academic Achievement."
  }
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(0);

  const filteredCourses = selectedCategory === "all" 
    ? SAMPLE_COURSES 
    : SAMPLE_COURSES.filter(c => c.category === selectedCategory);

  const toggleFaq = (index: number) => {
    setExpandedFaqIndex(expandedFaqIndex === index ? null : index);
  };

  return (
    <main className={styles.main}>
      {/* Dynamic Ambient Glow Mesh */}
      <div className={styles.ambientGlowPrimary}></div>
      <div className={styles.ambientGlowSecondary}></div>
      <div className={styles.ambientGlowTertiary}></div>

      {/* Top Announcement Bar */}
      <div className={styles.announcementBar}>
        <span className={styles.announcementBadge}>Autumn 2026</span>
        <span>Admissions now open for Cambridge & Oxbridge preparation cohorts</span>
        <Link href="/courses" className={styles.announcementLink}>
          Explore Curricula &rarr;
        </Link>
      </div>

      {/* Glassmorphic Navigation */}
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
          <Link href="#features" className={styles.navItem}>The Cambridge Method</Link>
          <Link href="#testimonials" className={styles.navItem}>Success Stories</Link>
          <Link href="#faq" className={styles.navItem}>FAQ</Link>
        </div>

        <div className={styles.navActions}>
          <Link href="/login" className={styles.loginBtn}>Sign In</Link>
          <Link href="/register" className={styles.registerBtn}>
            <span>Get Started</span>
            <span>&rarr;</span>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroGrid}>
          
          {/* Left Hero Column */}
          <div className={styles.heroContent}>
            <div className={styles.badgePill}>
              <span className={styles.pulseDot}></span>
              <span>🏆 #1 Cambridge Academic Excellence Platform</span>
            </div>

            <h1 className={styles.heroTitle}>
              Elevate Your Academic Potential to <span className={styles.goldGradient}>World-Class Heights</span>
            </h1>

            <p className={styles.heroSubtitle}>
              Where collegiate British prestige meets next-generation learning. Master advanced STEM, Humanities, and University Entrance exams through live interactive Zoom clinics, on-demand 4K HLS replays, and Cambridge faculty mentorship.
            </p>

            <div className={styles.heroActions}>
              <Link href="/register" className={styles.primaryCta}>
                <span>Start Learning Today</span>
                <span>&rarr;</span>
              </Link>
              <Link href="/courses" className={styles.secondaryCta}>
                <span>Explore Curriculum</span>
              </Link>
            </div>

            {/* Social Proof Bar */}
            <div className={styles.socialProof}>
              <div className={styles.avatarStack}>
                <div className={styles.avatarCircle} style={{ background: "#1e3a8a" }}>AW</div>
                <div className={styles.avatarCircle} style={{ background: "#b45309" }}>SC</div>
                <div className={styles.avatarCircle} style={{ background: "#065f46" }}>MD</div>
                <div className={styles.avatarCircle} style={{ background: "#4c1d95" }}>+12k</div>
              </div>
              <div className={styles.proofText}>
                <div className={styles.proofStars}>★★★★★</div>
                <div className={styles.proofMeta}>
                  Rated <strong>4.95/5</strong> by <strong>12,000+</strong> scholars worldwide
                </div>
              </div>
            </div>
          </div>

          {/* Right Hero Column: Interactive Visual Stage */}
          <div className={styles.heroVisualStage}>
            
            {/* Top Floating Badge */}
            <div className={styles.floatingBadgeLeft}>
              <span style={{ fontSize: "1.25rem" }}>🎓</span>
              <div>
                <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#fbbf24" }}>98.4% Placement</div>
                <div style={{ fontSize: "0.7rem", color: "#94a3b8" }}>Oxbridge & Top Global Universites</div>
              </div>
            </div>

            {/* Interactive Live Lecture Card */}
            <div className={styles.stageCard}>
              <div className={styles.stageHeader}>
                <div className={styles.liveBadge}>
                  <span className={styles.liveIndicatorRed}></span>
                  <span>LIVE MASTERCLASS</span>
                </div>
                <div className={styles.viewerCount}>
                  <span>👥</span>
                  <span><strong>48</strong> Scholars Connected</span>
                </div>
              </div>

              {/* Lecture Preview Image Container */}
              <div className={styles.imageFrame}>
                <Image 
                  src="/hero-preview.jpg" 
                  alt="Cambridge Interactive Masterclass" 
                  width={640} 
                  height={360} 
                  className={styles.heroImage}
                  priority
                />
                <div className={styles.imageOverlayGradient}></div>
                
                <div className={styles.imageFloatingInfo}>
                  <div className={styles.lectureDetails}>
                    <h4>Cambridge Advanced Mathematics & Calculus</h4>
                    <p>Topic: Multivariable Chain Rule & Field Divergence</p>
                  </div>
                  <span className={styles.streamPill}>4K HLS Protected</span>
                </div>
              </div>

              {/* Stage Footer */}
              <div className={styles.stageFooter}>
                <div className={styles.tutorTag}>
                  <div className={styles.tutorAvatar}>RH</div>
                  <div className={styles.tutorMeta}>
                    <h5>Dr. Robert Hayes</h5>
                    <span>Cambridge Fellow & Lead Tutor</span>
                  </div>
                </div>
                <Link href="/courses/13dbe8c5-0c1f-4f4c-bb19-011f20e06c82" className={styles.stageJoinBtn}>
                  Preview Class &rarr;
                </Link>
              </div>
            </div>

            {/* Bottom Floating Badge */}
            <div className={styles.floatingBadgeRight}>
              <span style={{ fontSize: "1.25rem" }}>🔒</span>
              <div>
                <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#34d399" }}>Protected CloudFront</div>
                <div style={{ fontSize: "0.7rem", color: "#94a3b8" }}>Low Latency Signed Video Streaming</div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* University Trust Bar */}
      <section className={styles.trustBar}>
        <h4 className={styles.trustBarTitle}>
          Our Scholars Advance to the World's Premier Collegiate Institutions
        </h4>
        <div className={styles.institutionList}>
          <span className={styles.institutionItem}>🏛️ University of Cambridge</span>
          <span className={styles.institutionItem}>🎓 University of Oxford</span>
          <span className={styles.institutionItem}>🔬 Imperial College London</span>
          <span className={styles.institutionItem}>📚 UCL London</span>
          <span className={styles.institutionItem}>🏛️ London School of Economics</span>
          <span className={styles.institutionItem}>⚡ MIT</span>
        </div>
      </section>

      {/* Featured Courses Showcase */}
      <section className={styles.coursesSection} id="courses">
        <div className={styles.sectionHeadingWrapper}>
          <span className={styles.sectionPill}>Curriculum Excellence</span>
          <h2 className={styles.sectionTitle}>Featured Academic Disciplines</h2>
          <p className={styles.sectionDesc}>
            Rigorously structured programs combining live problem clinics, worked solution archives, and individual instructor assessments.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className={styles.filterTabs}>
          <button 
            className={`${styles.tabBtn} ${selectedCategory === "all" ? styles.tabBtnActive : ""}`}
            onClick={() => setSelectedCategory("all")}
          >
            All Disciplines
          </button>
          <button 
            className={`${styles.tabBtn} ${selectedCategory === "math" ? styles.tabBtnActive : ""}`}
            onClick={() => setSelectedCategory("math")}
          >
            Mathematics & Physics
          </button>
          <button 
            className={`${styles.tabBtn} ${selectedCategory === "cs" ? styles.tabBtnActive : ""}`}
            onClick={() => setSelectedCategory("cs")}
          >
            Computer Science & AI
          </button>
          <button 
            className={`${styles.tabBtn} ${selectedCategory === "humanities" ? styles.tabBtnActive : ""}`}
            onClick={() => setSelectedCategory("humanities")}
          >
            Humanities & Literature
          </button>
          <button 
            className={`${styles.tabBtn} ${selectedCategory === "admissions" ? styles.tabBtnActive : ""}`}
            onClick={() => setSelectedCategory("admissions")}
          >
            University Admissions
          </button>
        </div>

        {/* Course Cards Grid */}
        <div className={styles.courseGrid}>
          {filteredCourses.map((course) => (
            <div key={course.id} className={styles.courseCard}>
              <div className={styles.cardHeader}>
                <div className={courseTagRowStyle()}>
                  <span className={styles.deptTag}>{course.department}</span>
                  <span className={styles.courseFormatBadge}>
                    <span>📹</span>
                    <span>{course.format}</span>
                  </span>
                </div>

                <h3 className={styles.courseCardTitle}>{course.title}</h3>
                <p className={styles.courseCardDesc}>{course.description}</p>

                <div className={styles.courseCardMeta}>
                  <div className={styles.metaItem}>
                    <span>👨‍🏫</span>
                    <span>{course.tutor}</span>
                  </div>
                  <div className={styles.metaItem}>
                    <span style={{ color: "#fbbf24" }}>★</span>
                    <span><strong>{course.rating}</strong> ({course.reviews})</span>
                  </div>
                </div>
              </div>

              <div className={styles.cardFooter}>
                <div className={styles.priceCol}>
                  <span className={styles.priceLabel}>{course.duration}</span>
                  <span className={styles.priceValue}>{course.price}</span>
                </div>
                <Link href={`/checkout/${course.id}`} className={styles.enrollBtn}>
                  Enroll Now &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bento Grid: The Cambridge Standard */}
      <section className={styles.bentoSection} id="features">
        <div className={styles.sectionHeadingWrapper}>
          <span className={styles.sectionPill}>The Cambridge Method</span>
          <h2 className={styles.sectionTitle}>Engineered for Distinctions & Academic Mastery</h2>
          <p className={styles.sectionDesc}>
            A complete pedagogical ecosystem integrating interactive live classes, secure lecture archives, and personal diagnostics.
          </p>
        </div>

        <div className={styles.bentoGrid}>
          
          {/* Bento Card 1 (Wide): Live Interactive Zoom Classes */}
          <div className={`${styles.bentoCard} ${styles.bentoCardWide}`}>
            <div className={styles.bentoIconWrapper}>📹</div>
            <h3 className={styles.bentoCardTitle}>Synchronous Live Zoom Problem Clinics</h3>
            <p className={styles.bentoCardDesc}>
              Experience interactive, small-group seminars where instructors share live digital whiteboards, dissect complex STEP/A-Level problems in real-time, and answer your questions directly via voice and collaborative chat.
            </p>
            <div className={styles.bentoPills}>
              <span className={styles.pillTag}>Live Digital Whiteboard</span>
              <span className={styles.pillTag}>Interactive Breakout Rooms</span>
              <span className={styles.pillTag}>Instant Audio/Text Q&A</span>
              <span className={styles.pillTag}>Small Cohort Sizing</span>
            </div>
          </div>

          {/* Bento Card 2: Protected CloudFront HLS Replays */}
          <div className={`${styles.bentoCard} ${styles.bentoCardNormal}`}>
            <div className={styles.bentoIconWrapper}>🔒</div>
            <h3 className={styles.bentoCardTitle}>Protected CloudFront HLS Replays</h3>
            <p className={styles.bentoCardDesc}>
              Every live class session is automatically transcoded via AWS MediaConvert and made available for instant on-demand streaming with signed URL protection.
            </p>
            <div className={styles.bentoPills}>
              <span className={styles.pillTag}>Zero Buffering</span>
              <span className={styles.pillTag}>Signed Security</span>
            </div>
          </div>

          {/* Bento Card 3: Personalized Progress Analytics */}
          <div className={`${styles.bentoCard} ${styles.bentoCardHalf}`}>
            <div className={styles.bentoIconWrapper}>📈</div>
            <h3 className={styles.bentoCardTitle}>Precision Progress & Exam Readiness Tracking</h3>
            <p className={styles.bentoCardDesc}>
              Track completed lectures, quiz scores, and past-paper mock diagnostics in real time. Our platform calculates your percentile readiness against historical Cambridge boundaries.
            </p>
            <div className={styles.bentoPills}>
              <span className={styles.pillTag}>Syllabus Heatmaps</span>
              <span className={styles.pillTag}>Readiness Index</span>
              <span className={styles.pillTag}>Assignment Checklists</span>
            </div>
          </div>

          {/* Bento Card 4: Cambridge Past-Paper Archive */}
          <div className={`${styles.bentoCard} ${styles.bentoCardHalf}`}>
            <div className={styles.bentoIconWrapper}>🏛️</div>
            <h3 className={styles.bentoCardTitle}>Curated Cambridge & Oxbridge Paper Archives</h3>
            <p className={styles.bentoCardDesc}>
              Access decades of worked past papers with step-by-step video annotations, examiner commentary, and common marking pitfalls explicitly highlighted.
            </p>
            <div className={styles.bentoPills}>
              <span className={styles.pillTag}>STEP & MAT Worked Papers</span>
              <span className={styles.pillTag}>Examiner Commentary</span>
              <span className={styles.pillTag}>Official Mark Schemes</span>
            </div>
          </div>

        </div>
      </section>

      {/* Upcoming Live Class Spotlight Banner */}
      <section className={styles.spotlightBanner}>
        <div className={styles.spotlightGrid}>
          <div className={styles.spotlightContent}>
            <div className={styles.liveBadge} style={{ marginBottom: "1.25rem", width: "fit-content" }}>
              <span className={styles.liveIndicatorRed}></span>
              <span>NEXT LIVE SEMINAR</span>
            </div>
            <h3>Join the Live Cambridge Mathematics Problem Clinic</h3>
            <p>
              Participate in our upcoming interactive masterclass focusing on Multivariable Calculus and Extremum Optimization. Open to enrolled scholars and prospective applicants.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link href="/live-classes" className={styles.primaryCta}>
                <span>View Live Schedule</span>
                <span>&rarr;</span>
              </Link>
            </div>
          </div>

          <div className={styles.spotlightCard}>
            <div className={styles.spotlightCardHeader}>
              <span style={{ fontSize: "1.5rem" }}>📹</span>
              <span className={styles.spotlightTime}>Upcoming Today</span>
            </div>
            <h4>03. Live Interactive Workshop: Real-World Optimization & Extrema</h4>
            <p>Conducted live on Zoom by Dr. Robert Hayes with live mathematical derivations and attendee Q&A.</p>
            <Link href="/courses/13dbe8c5-0c1f-4f4c-bb19-011f20e06c82" className={styles.joinSpotlightBtn}>
              Go to Session Portal &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Student Hall of Fame / Testimonials */}
      <section className={styles.testimonialsSection} id="testimonials">
        <div className={styles.sectionHeadingWrapper}>
          <span className={styles.sectionPill}>Student Hall of Fame</span>
          <h2 className={styles.sectionTitle}>Words from Our Cambridge Scholars</h2>
          <p className={styles.sectionDesc}>
            Hear how our personalized mentorship, live clinics, and rigorous curricula propelled students to premier university placements.
          </p>
        </div>

        <div className={styles.testimonialGrid}>
          
          <div className={styles.testimonialCard}>
            <div className={styles.ratingStars}>★★★★★</div>
            <p className={styles.quoteText}>
              &ldquo;The live Zoom problem clinics with Dr. Hayes gave me the exact analytical depth I needed for the Cambridge STEP exams. The recording replays were my secret weapon during revision.&rdquo;
            </p>
            <div className={styles.studentInfo}>
              <div className={styles.studentAvatar}>AW</div>
              <div>
                <h5 className={styles.studentName}>Alexander Wright</h5>
                <span className={styles.studentCollege}>A* A* A* Distinction</span>
              </div>
              <span className={styles.acceptanceBadge}>Trinity College, Cambridge</span>
            </div>
          </div>

          <div className={styles.testimonialCard}>
            <div className={styles.ratingStars}>★★★★★</div>
            <p className={styles.quoteText}>
              &ldquo;The balance of synchronous seminars and on-demand streaming is world-class. Professor Jenkins&apos; literature masterclass completely transformed my essay structure and analytical voice.&rdquo;
            </p>
            <div className={styles.studentInfo}>
              <div className={styles.studentAvatar}>SC</div>
              <div>
                <h5 className={styles.studentName}>Sophia Chen</h5>
                <span className={styles.studentCollege}>Oxford Entrance Rank #3</span>
              </div>
              <span className={styles.acceptanceBadge}>St John&apos;s College, Oxford</span>
            </div>
          </div>

          <div className={styles.testimonialCard}>
            <div className={styles.ratingStars}>★★★★★</div>
            <p className={styles.quoteText}>
              &ldquo;The algorithmic problem clinics and past paper archives are unmatched. Being able to watch recorded sessions whenever I needed clarification ensured I never fell behind.&rdquo;
            </p>
            <div className={styles.studentInfo}>
              <div className={styles.studentAvatar}>MD</div>
              <div>
                <h5 className={styles.studentName}>Marcus Davies</h5>
                <span className={styles.studentCollege}>Olympiad Gold Medalist</span>
              </div>
              <span className={styles.acceptanceBadge}>Imperial College London</span>
            </div>
          </div>

        </div>
      </section>

      {/* Interactive FAQ Section */}
      <section className={styles.faqSection} id="faq">
        <div className={styles.sectionHeadingWrapper}>
          <span className={styles.sectionPill}>Got Questions?</span>
          <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
          <p className={styles.sectionDesc}>
            Everything you need to know about our teaching format, video streaming, and admissions.
          </p>
        </div>

        <div className={styles.faqList}>
          {FAQS.map((faq, idx) => {
            const isOpen = expandedFaqIndex === idx;
            return (
              <div key={idx} className={`${styles.faqItem} ${isOpen ? styles.faqItemOpen : ""}`}>
                <button className={styles.faqQuestion} onClick={() => toggleFaq(idx)}>
                  <span>{faq.q}</span>
                  <span className={`${styles.faqChevron} ${isOpen ? styles.faqChevronRotated : ""}`}>
                    ▼
                  </span>
                </button>
                {isOpen && (
                  <div className={styles.faqAnswer}>
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Closing Call to Action Finale */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaCard}>
          <h2 className={styles.ctaTitle}>
            Ready to Transform Your <span className={styles.goldGradient}>Academic Trajectory?</span>
          </h2>
          <p className={styles.ctaDesc}>
            Join thousands of ambitious scholars achieving distinctions in Cambridge, Oxford, and top international university examinations. Enroll today or consult with our academic advisors.
          </p>
          <div className={styles.ctaActions}>
            <Link href="/register" className={styles.primaryCta}>
              <span>Create Free Student Account</span>
              <span>&rarr;</span>
            </Link>
            <Link href="/courses" className={styles.secondaryCta}>
              <span>Browse All Programs</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Comprehensive Academic Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerGrid}>
          
          <div className={styles.footerBrand}>
            <div style={{ background: "white", padding: "4px 8px", borderRadius: "8px", display: "inline-block" }}>
              <Image 
                src="/logo.jpeg" 
                alt="Cambridge Success Centre" 
                width={180} 
                height={48} 
                style={{ objectFit: "contain", display: "block" }} 
              />
            </div>
            <p>
              Dedicated to cultivating academic excellence, rigorous intellectual inquiry, and first-choice university placements through collegiate mentorship and state-of-the-art interactive digital learning.
            </p>
          </div>

          <div className={styles.footerLinksCol}>
            <h5>Academic Programs</h5>
            <Link href="/courses">Advanced Mathematics</Link>
            <Link href="/courses">Theoretical Physics</Link>
            <Link href="/courses">Computer Science & AI</Link>
            <Link href="/courses">English Literature</Link>
            <Link href="/courses">Oxbridge Admissions</Link>
          </div>

          <div className={styles.footerLinksCol}>
            <h5>Learning Portal</h5>
            <Link href="/dashboard">Student Dashboard</Link>
            <Link href="/live-classes">Upcoming Live Classes</Link>
            <Link href="/login">Portal Sign In</Link>
            <Link href="/register">Student Registration</Link>
            <Link href="/checkout/13dbe8c5-0c1f-4f4c-bb19-011f20e06c82">Sample Enrollment</Link>
          </div>

          <div className={styles.footerLinksCol}>
            <h5>Institution & Support</h5>
            <Link href="/about">About Cambridge Success</Link>
            <Link href="/instructors">Faculty & Fellows</Link>
            <Link href="/help">Help & Contact</Link>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
            <Link href="/return-policy">Return & Refund Policy</Link>
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

function courseTagRowStyle(): string {
  return styles.courseTagRow;
}
