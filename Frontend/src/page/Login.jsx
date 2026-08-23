
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../style/Login.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:3000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      console.log("Login successful:", data);

      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3000/api/auth/google";
  };

  return (
    <main className="login-page">
      <section className="login-panel" aria-labelledby="login-title">

        <div className="login-heading">
          <span className="eyebrow">Welcome back</span>

          <h1 id="login-title">
            Log in to Spotify
          </h1>

          <p>
            Pick up where your listening journey left off.
          </p>
        </div>

        <button
          className="google-button"
          type="button"
          onClick={handleGoogleLogin}
        >
          <span className="google-mark" aria-hidden="true">
            G
          </span>

          Continue with Google
        </button>

        <div className="form-divider" aria-hidden="true">
          <span>or log in with email</span>
        </div>

        <form
          className="login-form"
          onSubmit={handleSubmit}
        >

          <label htmlFor="login-email">
            Email
          </label>

          <input
            id="login-email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
            required
          />

          <label htmlFor="login-password">
            Password
          </label>

          <input
            id="login-password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="current-password"
            required
          />

          {error && (
            <p className="error-message">
              {error}
            </p>
          )}

          <button
            className="submit-button"
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log in"}
          </button>

        </form>

        <p className="login-footer">
          New to Spotify?{" "}
          <Link to="/register">
            Create an account
          </Link>
        </p>

      </section>
    </main>
  );
}

export default Login;

