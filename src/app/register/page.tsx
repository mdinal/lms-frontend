"use client";

import styles from "../login/login.module.css";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import api from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // 1. Register the user
      await api.post("/api/auth/register", {
        name: name,
        email: email,
        password: password,
      });
      
      setSuccess("Account created successfully! Logging you in...");
      
      // 2. Automatically log them in after registration
      setTimeout(async () => {
        try {
          // Backend login expects username (which acts as email in the current setup)
          const response = await api.post("/api/auth/login", {
            email: email,
            password: password,
          });
          login(response.data.token);
          router.push("/dashboard");
        } catch (loginErr) {
          setError("Registration successful, but failed to auto-login. Please sign in manually.");
        }
      }, 1000);
      
    } catch (err: any) {
      setError(err.response?.data || err.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginCard} style={{ marginTop: "2rem", marginBottom: "2rem" }}>
        <div className={styles.cardHeader}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
            <Link href="/">
              <Image src="/logo.jpeg" alt="Cambridge Success Centre" width={160} height={44} style={{ objectFit: "contain" }} priority />
            </Link>
          </div>
          <h1 className={styles.title}>Create an Account</h1>
          <p className={styles.subtitle}>Join Cambridge Success Centre today</p>
        </div>
        
        {error && <div className={styles.errorBanner}>{error}</div>}
        {success && <div className={styles.errorBanner} style={{ backgroundColor: "#d1e7dd", color: "#0a3622", borderLeftColor: "#198754" }}>{success}</div>}
        
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="name">Full Name</label>
            <input 
              type="text" 
              id="name" 
              placeholder="John Doe" 
              required 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email">Email Address</label>
            <input 
              type="email" 
              id="email" 
              placeholder="john@example.com" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              placeholder="••••••••" 
              required 
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input 
              type="password" 
              id="confirmPassword" 
              placeholder="••••••••" 
              required 
              minLength={6}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          
          <button type="submit" className={styles.submitBtn} disabled={!!success}>Register</button>
        </form>
        
        <div className={styles.footer}>
          Already have an account? <Link href="/login" className={styles.registerLink}>Sign In</Link>
        </div>
      </div>
    </div>
  );
}
