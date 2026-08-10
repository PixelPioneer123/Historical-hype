import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import "../Login/Auth.css";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState("customer");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const user = await register(email, password, name, role);
      navigate(user.role === "seller" ? "/seller/dashboard" : "/", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="hh-auth container">
      <div className="hh-auth-card">
        <span className="eyebrow">Join The Ton</span>
        <h1 className="section-heading">Create An Account</h1>

        <div className="hh-role-toggle">
          <button
            type="button"
            className={role === "customer" ? "is-active" : ""}
            onClick={() => setRole("customer")}
          >
            I'm A Customer
            <span>Browse and buy drops</span>
          </button>
          <button
            type="button"
            className={role === "seller" ? "is-active" : ""}
            onClick={() => setRole("seller")}
          >
            I'm A Seller
            <span>List and sell your own pieces</span>
          </button>
        </div>

        {error && <p className="hh-auth-error">{error}</p>}

        <form onSubmit={handleSubmit} className="hh-auth-form">
          <label>
            Name
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <label>
            Email
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
              required
            />
            <span className="hh-auth-hint">At least 8 characters</span>
          </label>
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? "Creating Account…" : `Create ${role === "seller" ? "Seller" : "Customer"} Account`}
          </button>
        </form>

        <p className="hh-auth-switch">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
