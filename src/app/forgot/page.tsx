"use client";

import styles from "../login/login.module.css";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <div className={styles.cardHeader}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
            <Link href="/">
              <Image src="/logo.jpeg" alt="LMS Logo" width={120} height={32} style={{ objectFit: "contain" }} />
            </Link>
          </div>
          <h1 className={styles.title}>Reset Password</h1>
          <p className={styles.subtitle}>Enter your email to receive recovery instructions</p>
        </div>

        {submitted ? (
          <div style={{ textAlign: "center", padding: "2rem 0" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✉️</div>
            <h3 style={{ color: "#1a365d", marginBottom: "0.5rem" }}>Check your inbox</h3>
            <p style={{ color: "#64748b", fontSize: "0.9rem", marginBottom: "2rem" }}>
              If an account exists for <strong>{email}</strong>, we have sent instructions to reset your password.
            </p>
            <Link href="/login" style={{ color: "#1a365d", fontWeight: 700, textDecoration: "none" }}>
              &larr; Return to Sign In
            </Link>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label htmlFor="email">Registered Email</label>
              <input 
                type="email" 
                id="email" 
                required 
                placeholder="student@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button type="submit" className={styles.submitBtn}>
              Send Reset Link
            </button>

            <div className={styles.footer} style={{ marginTop: "1.5rem" }}>
              Remember your password? <Link href="/login" className={styles.registerLink}>Sign In</Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
