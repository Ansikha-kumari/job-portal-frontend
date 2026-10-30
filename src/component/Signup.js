import React, { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { SetPopupContext } from "../App";
import apiList from "../lib/apiList";
import "./signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    type: "applicant",
    name: "",
    email: "",
    password: "",
  });

  const [signupSuccess, setSignupSuccess] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSignup = async (event) => {
    event.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.password
    ) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post(apiList.signup, {
        type: formData.type,
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        education: [],
        skills: [],
        resume: "",
        profile: "",
        bio: "",
        contactNumber: "",
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("type", response.data.type);

      setSignupSuccess(true);
    } catch (error) { 
      alert(
        error.response?.data?.message ||
        "Signup failed. Please check that the backend is running."
      );
      console.error("Signup error:", error.response?.data || error);
    }
  };
  if (signupSuccess) {
    return (
      <div className="celebration-screen">
        <div className="fireworks">
          {Array.from({ length: 12 }).map((_, index) => (
            <div
              className={`firework firework-${index + 1}`}
              key={index}
            >
              ✦
            </div>
          ))}
        </div>

        <div className="celebration-content">
          <div className="celebration-emoji">🎆 🎉 🎆</div>
          <h1>CONGRATULATIONS!</h1>
          <h2>Your Account Created Successfully!</h2>
          <p>Welcome to Job Portal!</p>
        </div>
      </div>
    );
  }

 return (
    <div className="signup-page">
      <div className="signup-glow signup-glow-one"></div>
      <div className="signup-glow signup-glow-two"></div>
      <div className="signup-grid"></div>

      <div className="signup-card">
        <div className="signup-info">
          <div className="signup-brand-icon">J</div>
          <div className="signup-mini-title">JOB PORTAL</div>

          <h1>
            Create Your <span>Account.</span>
          </h1>

          <p>
            Join Job Portal and explore new career opportunities.
          </p>

          <div className="signup-feature">
            <div className="signup-feature-item">✓ Resume Upload</div>
            <div className="signup-feature-item">✓ Skills &amp; Education</div>
            <div className="signup-feature-item">✓ Remote Jobs</div>
          </div>
        </div>

        <div className="signup-form-area">
          <div className="signup-form-header">
            <span>CREATE ACCOUNT</span>
            <h2>Join JOB PORTAL</h2>
            <p>Fill in your details to get started.</p>
          </div>

          <form onSubmit={handleSignup} className="signup-form">
            <label htmlFor="signup-type">Account Type</label>
            <select
              id="signup-type"
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="applicant">Applicant</option>
              <option value="recruiter">Recruiter</option>
            </select>

            <label htmlFor="signup-name">Full Name</label>
            <input
              id="signup-name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label htmlFor="signup-email">Email Address</label>
            <input
              id="signup-email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label htmlFor="signup-password">Password</label>
            <input
              id="signup-password"
              name="password"
              type="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <button type="submit" className="signup-primary-button">
              Create Account →
            </button>
          </form>
        </div>
      </div>

      <div className="signup-copyright">
        © 2026 JOB PORTAL • CAREER • OPPORTUNITY • FUTURE
      </div>
    </div>
  );
};

export default Signup;