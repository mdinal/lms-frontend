"use client";

import { useState, useEffect, use } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function CheckoutPage({ params }: { params: Promise<{ courseId: string }> }) {
  const resolvedParams = use(params);
  const courseId = resolvedParams.courseId;
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { user } = useAuth();

  // Mock form state
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");

  useEffect(() => {
    // Fetch course details to show the price
    api.get("/api/courses")
      .then(res => {
        const found = res.data.find((c: any) => c.id === courseId);
        setCourse(found);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [courseId]);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      router.push("/login");
      return;
    }

    setProcessing(true);
    setError("");

    try {
      const res = await api.post("/api/payments/checkout", {
        courseId: courseId
      });
      // Redirect to dashboard on success
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.response?.data || "Payment failed. Please try again.");
      setProcessing(false);
    }
  };

  if (loading) return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>Loading secure checkout...</div>;
  if (!course) return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>Course not found.</div>;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8fafc", display: "flex", flexDirection: "column", alignItems: "center", padding: "4rem 1rem" }}>
      <div style={{ marginBottom: "2rem" }}>
        <Link href="/">
          <Image src="/logo.jpeg" alt="Cambridge Success Centre" width={200} height={55} style={{ objectFit: "contain" }} priority />
        </Link>
      </div>

      <div style={{ width: "100%", maxWidth: "900px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", background: "white", borderRadius: "24px", boxShadow: "0 20px 40px rgba(0,0,0,0.08)", overflow: "hidden" }}>
        
        {/* Order Summary */}
        <div style={{ background: "#1a365d", color: "white", padding: "3rem", display: "flex", flexDirection: "column" }}>
          <h2 style={{ fontSize: "1.25rem", color: "#d4af37", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 700, marginBottom: "2rem" }}>Order Summary</h2>
          
          <div style={{ flexGrow: 1 }}>
            <h3 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.5rem", lineHeight: 1.3 }}>{course.title}</h3>
            <p style={{ color: "#cbd5e1", fontSize: "0.9rem", marginBottom: "2rem" }}>Instructor: {course.tutorName}</p>
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "1rem", marginBottom: "1rem" }}>
              <span style={{ color: "#e2e8f0" }}>Subtotal</span>
              <span style={{ fontWeight: 600 }}>${course.price.toFixed(2)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "1.25rem", fontWeight: 600 }}>Total due today</span>
              <span style={{ fontSize: "1.5rem", fontWeight: 700, color: "#d4af37" }}>${course.price.toFixed(2)}</span>
            </div>
          </div>
          
          <div style={{ marginTop: "3rem", fontSize: "0.85rem", color: "#94a3b8", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span>🔒</span> Secure 256-bit SSL encryption
          </div>
        </div>

        {/* Payment Form */}
        <div style={{ padding: "3rem" }}>
          <h2 style={{ fontSize: "1.5rem", color: "#1e293b", fontWeight: 700, marginBottom: "0.5rem" }}>Payment Details</h2>
          <p style={{ color: "#64748b", fontSize: "0.9rem", marginBottom: "2rem" }}>Mock PayHere Gateway Integration</p>

          {!user && (
            <div style={{ padding: "1rem", backgroundColor: "#fffbeb", border: "1px solid #fef3c7", borderRadius: "8px", color: "#b45309", marginBottom: "2rem", fontSize: "0.9rem" }}>
              You must be logged in to purchase. <Link href="/login" style={{ fontWeight: 600, color: "#b45309" }}>Sign in here</Link>.
            </div>
          )}

          {error && (
            <div style={{ padding: "1rem", backgroundColor: "#fee2e2", border: "1px solid #fecaca", borderRadius: "8px", color: "#b91c1c", marginBottom: "2rem", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span>⚠️</span> {error}
            </div>
          )}

          <form onSubmit={handleCheckout}>
            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, color: "#475569", marginBottom: "0.5rem" }}>Card Information</label>
              <div style={{ border: "1px solid #cbd5e1", borderRadius: "8px", overflow: "hidden" }}>
                <input 
                  type="text" 
                  placeholder="Card number" 
                  value={cardNumber}
                  onChange={e => setCardNumber(e.target.value)}
                  style={{ width: "100%", padding: "1rem", border: "none", borderBottom: "1px solid #cbd5e1", fontSize: "1rem", outline: "none" }}
                  required
                />
                <div style={{ display: "flex" }}>
                  <input 
                    type="text" 
                    placeholder="MM / YY" 
                    value={expiry}
                    onChange={e => setExpiry(e.target.value)}
                    style={{ width: "50%", padding: "1rem", border: "none", borderRight: "1px solid #cbd5e1", fontSize: "1rem", outline: "none" }}
                    required
                  />
                  <input 
                    type="text" 
                    placeholder="CVC" 
                    value={cvc}
                    onChange={e => setCvc(e.target.value)}
                    style={{ width: "50%", padding: "1rem", border: "none", fontSize: "1rem", outline: "none" }}
                    required
                  />
                </div>
              </div>
            </div>

            <div style={{ marginBottom: "2rem" }}>
              <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, color: "#475569", marginBottom: "0.5rem" }}>Name on card</label>
              <input 
                type="text" 
                placeholder="Name" 
                style={{ width: "100%", padding: "1rem", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "1rem", outline: "none" }}
                required
              />
            </div>

            <button 
              type="submit" 
              disabled={processing || !user}
              style={{ width: "100%", background: "#d4af37", color: "#1a365d", border: "none", padding: "1.25rem", borderRadius: "8px", fontWeight: 700, fontSize: "1.1rem", cursor: (processing || !user) ? "not-allowed" : "pointer", opacity: (processing || !user) ? 0.7 : 1, transition: "background 0.2s" }}
            >
              {processing ? "Processing..." : `Pay $${course.price.toFixed(2)}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
