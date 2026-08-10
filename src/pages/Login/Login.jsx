import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import "./Auth.css";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const user = await login(email, password);
      const redirectTo = location.state?.from || (user.role === "seller" ? "/seller/dashboard" : "/");
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="hh-auth container">
      <div className="hh-auth-card">
        <span className="eyebrow">Welcome Back</span>
        <h1 className="section-heading">Sign In</h1>

        {error && <p className="hh-auth-error">{error}</p>}

        <form onSubmit={handleSubmit} className="hh-auth-form">
          <label>
            Email
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label>
            Password
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label>
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? "Signing In…" : "Sign In"}
          </button>
        </form>

        <p className="hh-auth-switch">
          Don't have an account? <Link to="/register">Join The Ton</Link>
        </p>
      </div>
    </div>
  );
}
