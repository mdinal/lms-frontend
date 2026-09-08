"use client";

import styles from "./login.module.css";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import api from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [instituteName, setInstituteName] = useState("The");
  const { login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const host = window.location.hostname;
      if (host && !host.includes("localhost")) {
        setInstituteName(host.split(".")[0].toUpperCase());
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const response = await api.post("/api/auth/login", {
        email: email,
        password: password,
      });
      login(response.data.token);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <div className={styles.cardHeader}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
            <Image src="/logo.jpeg" alt="LMS Logo" width={120} height={32} style={{ objectFit: "contain" }} />
          </div>
          <h1 className={styles.title}>Welcome Back</h1>
          <p className={styles.subtitle}>Sign in to your portal</p>
        </div>
        
        {error && <div className={styles.errorBanner}>{error}</div>}
        
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Username / Email</label>
            <input 
              type="text" 
              id="email" 
              placeholder="student" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className={styles.inputGroup}>
            <div className={styles.passwordHeader}>
              <label htmlFor="password">Password</label>
              <Link href="/forgot" className={styles.forgotLink}>Forgot password?</Link>
            </div>
            <input 
              type="password" 
              id="password" 
              placeholder="••••••••" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <button type="submit" className={styles.submitBtn}>Sign In</button>
        </form>
        
        <div className={styles.footer}>
          Don't have an account? <Link href="/register" className={styles.registerLink}>Enroll now</Link>
        </div>
      </div>
    </div>
  );
}
