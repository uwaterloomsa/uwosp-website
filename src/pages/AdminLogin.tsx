import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase";
import {
  ShieldCheck,
  SignOut,
  EnvelopeSimple,
  Lock,
} from "@phosphor-icons/react";
import AnimatedBackground from "../components/AnimatedBackground";
import "./AdminLogin.css";

export function useAuth() {
  const [user, setUser] = useState(auth.currentUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  return { user, loading };
}

export async function logout() {
  await signOut(auth);
}

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin");
    } catch {
      setError("Invalid email or password. Contact your team lead for access.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="admin-login">
      <section className="hero">
        <AnimatedBackground variant="hero" />
        <div className="hero-content">
          <ShieldCheck size={48} weight="duotone" />
          <h1>Admin Portal</h1>
          <p>Sign in with your executive account to manage postings.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <form className="login-form card" onSubmit={handleLogin}>
            <h2>Sign In</h2>
            {error && <div className="login-error">{error}</div>}
            <div className="form-group">
              <label htmlFor="admin-email">
                <EnvelopeSimple size={16} weight="duotone" /> Email
              </label>
              <input
                type="email"
                id="admin-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="exec@uwaterloo.ca"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="admin-password">
                <Lock size={16} weight="duotone" /> Password
              </label>
              <input
                type="password"
                id="admin-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting}
            >
              {submitting ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export { SignOut };
