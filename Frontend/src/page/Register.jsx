
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../style/Register.css";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    userType: "user",
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
        "http://localhost:3000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email: formData.email,
            fullName: {
              firstName: formData.firstName,
              lastName: formData.lastName,
            },
            password: formData.password,
            userType: formData.userType,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      console.log("Registration successful:", data);

      navigate("/");
    } catch (error) {
      console.error("Registration error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3000/api/auth/google";
  };

  return (
    <main className="register-page">
      <section className="register-panel" aria-labelledby="register-title">

        <div className="register-heading">
          <span className="eyebrow">Your music, your way</span>

          <h1 id="register-title">Create your account</h1>

          <p>
            Join Spotify and start building your personal soundtrack.
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
          <span>or sign up with email</span>
        </div>

        <form className="register-form" onSubmit={handleSubmit}>

          <label htmlFor="email">
            Email
          </label>

          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
            required
          />

          <div className="name-fields">

            <div>
              <label htmlFor="firstName">
                First name
              </label>

              <input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                autoComplete="given-name"
                required
              />
            </div>

            <div>
              <label htmlFor="lastName">
                Last name
              </label>

              <input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                autoComplete="family-name"
                required
              />
            </div>

          </div>

          <label htmlFor="password">
            Password
          </label>

          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="new-password"
            required
          />

          <fieldset className="user-type">

            <legend>Account type</legend>

            <label htmlFor="user-type-user">
              <input
                id="user-type-user"
                name="userType"
                type="radio"
                value="user"
                checked={formData.userType === "user"}
                onChange={handleChange}
              />
              User
            </label>

            <label htmlFor="user-type-artist">
              <input
                id="user-type-artist"
                name="userType"
                type="radio"
                value="artist"
                checked={formData.userType === "artist"}
                onChange={handleChange}
              />
              Artist
            </label>

          </fieldset>

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
            {loading ? "Creating account..." : "Create account"}
          </button>

        </form>

        <p className="register-footer">
          Already have an account?{" "}
          <Link to="/login">
            Log in
          </Link>
        </p>

      </section>
    </main>
  );
}


