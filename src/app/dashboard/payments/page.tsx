"use client";

import styles from "../dashboard.module.css";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";

interface PaymentRecord {
  id: string;
  courseTitle: string;
  amount: number;
  currency: string;
  transactionRef: string;
  status: string;
  createdAt: string;
}

export default function StudentPayments() {
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();

  useEffect(() => {
    api.get("/api/payments/my-history")
      .then((res) => {
        setPayments(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch payment history", err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <ProtectedRoute>
      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <div className={styles.logo} style={{ marginBottom: "2rem" }}>
            <Link href="/">
              <Image src="/logo.jpeg" alt="LMS Logo" width={120} height={32} style={{ objectFit: "contain" }} />
            </Link>
          </div>
          <nav className={styles.nav}>
            <Link href="/dashboard" className={styles.navLink}>My Courses</Link>
            <Link href="/dashboard/payments" className={styles.activeLink}>Payments</Link>
            <Link href="/dashboard/settings" className={styles.navLink}>Settings</Link>
          </nav>
          <div style={{ marginTop: "auto", padding: "1rem" }}>
            <button onClick={logout} style={{ width: "100%", padding: "0.5rem", background: "none", border: "1px solid #cbd5e1", borderRadius: "6px", color: "#64748b", cursor: "pointer" }}>
              Sign Out
            </button>
          </div>
        </aside>

        <main className={styles.mainContent}>
          <header className={styles.header}>
            <h1 className={styles.pageTitle}>Billing & Payment History</h1>
            <div className={styles.userProfile}>{user?.username || "Student"}</div>
          </header>

          <div style={{ background: "white", borderRadius: "16px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)", border: "1px solid #e2e8f0", overflow: "hidden", marginTop: "2rem" }}>
            <div style={{ padding: "1.5rem 2rem", borderBottom: "1px solid #e2e8f0" }}>
              <h2 style={{ fontSize: "1.25rem", color: "#1e293b", fontWeight: 700, margin: 0 }}>Transactions & Receipts</h2>
            </div>

            {loading ? (
              <div style={{ padding: "3rem", textAlign: "center", color: "#64748b" }}>Loading transactions...</div>
            ) : payments.length === 0 ? (
              <div style={{ padding: "4rem 2rem", textAlign: "center", color: "#94a3b8" }}>
                <span style={{ fontSize: "3rem", display: "block", marginBottom: "1rem" }}>💳</span>
                <p>No transactions found. Enroll in a course to view your receipts here.</p>
              </div>
            ) : (
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0", textAlign: "left" }}>
                    <th style={{ padding: "1rem 1.5rem", color: "#64748b", fontWeight: 600, fontSize: "0.875rem" }}>Date</th>
                    <th style={{ padding: "1rem 1.5rem", color: "#64748b", fontWeight: 600, fontSize: "0.875rem" }}>Course</th>
                    <th style={{ padding: "1rem 1.5rem", color: "#64748b", fontWeight: 600, fontSize: "0.875rem" }}>Transaction ID</th>
                    <th style={{ padding: "1rem 1.5rem", color: "#64748b", fontWeight: 600, fontSize: "0.875rem" }}>Amount</th>
                    <th style={{ padding: "1rem 1.5rem", color: "#64748b", fontWeight: 600, fontSize: "0.875rem", textAlign: "right" }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map(p => (
                    <tr key={p.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                      <td style={{ padding: "1.25rem 1.5rem", color: "#64748b", fontSize: "0.875rem" }}>
                        {new Date(p.createdAt).toLocaleDateString()}
                      </td>
                      <td style={{ padding: "1.25rem 1.5rem", color: "#1e293b", fontWeight: 600 }}>
                        {p.courseTitle}
                      </td>
                      <td style={{ padding: "1.25rem 1.5rem", color: "#64748b", fontFamily: "monospace", fontSize: "0.85rem" }}>
                        {p.transactionRef}
                      </td>
                      <td style={{ padding: "1.25rem 1.5rem", color: "#1e293b", fontWeight: 700 }}>
                        ${p.amount.toFixed(2)} {p.currency}
                      </td>
                      <td style={{ padding: "1.25rem 1.5rem", textAlign: "right" }}>
                        <span style={{
                          background: "#ecfdf5",
                          color: "#065f46",
                          padding: "0.25rem 0.75rem",
                          borderRadius: "99px",
                          fontSize: "0.75rem",
                          fontWeight: 700
                        }}>
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
