import styles from "../dashboard.module.css";
import Link from "next/link";
import { headers } from "next/headers";

export default async function AdminDashboard() {
  const headersList = await headers();
  const host = headersList.get("host") || "";
  
  let instituteName = "The";
  if (host && !host.includes("localhost")) {
      instituteName = host.split(".")[0].toUpperCase();
  }

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>{instituteName} ADMIN</div>
        <nav className={styles.nav}>
          <Link href="/dashboard/admin" className={styles.activeLink}>Overview</Link>
          <Link href="/dashboard/admin/courses" className={styles.navLink}>Courses & Zoom</Link>
          <Link href="/dashboard/admin/students" className={styles.navLink}>Students</Link>
          <Link href="/dashboard/admin/payments" className={styles.navLink}>Payments Approval</Link>
        </nav>
      </aside>
      
      <main className={styles.mainContent}>
        <header className={styles.header}>
          <h1 className={styles.pageTitle}>Institute Administration</h1>
          <div className={styles.userProfile}>Admin</div>
        </header>

        <section className={styles.statsGrid}>
          <div className={styles.statCard}>
            <h3>Total Students</h3>
            <div className={styles.statNumber}>1,245</div>
          </div>
          <div className={styles.statCard}>
            <h3>Pending Payments</h3>
            <div className={styles.statNumber}>34</div>
          </div>
          <div className={styles.statCard}>
            <h3>Today's Classes</h3>
            <div className={styles.statNumber}>8</div>
          </div>
        </section>
        
        <section className={styles.adminActions}>
          <button className={styles.primaryBtn}>+ Create New Course</button>
          <button className={styles.primaryBtn}>+ Schedule Zoom Meeting</button>
        </section>
      </main>
    </div>
  );
}
